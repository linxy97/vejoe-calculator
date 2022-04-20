import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Divider, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { DECIMALS_POW, FARMS } from '../constants/constants';
import { pair_api_type, token_type } from '../api/web3-api';
import { ResultSection, vejoeProps } from './vejoe-result';

export default function LiquidityAddInput() {
    // selectors
    const farmSelected = useSelector((state: RootState) => state.calculator.farm);
    const pool = useSelector((state: RootState) => state.calculator.selectedPool);
    const pair = useSelector((state: RootState) => state.calculator.pair);
    const token0: token_type | null = useSelector((state: RootState) => state.calculator.token0);
    const token1: token_type | null = useSelector((state: RootState) => state.calculator.token1);
    const oracleToken0: token_type | null = useSelector((state: RootState) => state.calculator.oracleToken0);
    const oracleToken1: token_type | null = useSelector((state: RootState) => state.calculator.oracleToken1);
    const oracleTokenJoe: token_type | null = useSelector((state: RootState) => state.calculator.oracleTokenJoe);
    // variables needed for calculations
    const farm_crypto_exchange_ratio = get_crypto_exchange_ratio(token0, token1);
    const farm1 = farmSelected !== -1 ? get_crypto_name(token0, 'Pulling Data') : '';
    const farm2 = farmSelected !== -1 ? get_crypto_name(token1, 'Pulling Data') : '';
    // local states and handlers - userInput quantity
    const [quantity1, setQuantity1] = React.useState('');
    const [quantity2, setQuantity2] = React.useState('');
    const [quantityVeJoe, setVeJoe] = React.useState('');
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (Number(event.target.value) ?? 0) * farm_crypto_exchange_ratio;
        setQuantity1(event.target.value);
        setQuantity2(value !== 0 ? value.toString() : '');
    };
    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (Number(event.target.value) ?? 0) / farm_crypto_exchange_ratio;
        setQuantity1(value !== 0 ? value.toString() : '');
        setQuantity2(event.target.value);
    };
    const handleOnChangeVeJoe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVeJoe(event.target.value);
    };

    const formater = Intl.NumberFormat('en-US');
    const hasIncompleteField = (!quantity1 || !quantity2 || !quantityVeJoe || !pool || !pair || !token0 || !token1);
    const getResultProp = () => {
        const quantity1_result = Number(quantity1) ?? 0;
        const quantity2_result = Number(quantity2) ?? 0;
        const veJoe_result = Number(quantityVeJoe) ?? 0;
        return {
            quantity1: quantity1_result,
            quantity2: quantity2_result,
            veJoe: veJoe_result,
            pool: JSON.parse(pool),
            pair: JSON.parse(pair) as pair_api_type,
            token0: token0 as token_type,
            token1: token1 as token_type
        } as vejoeProps
    }
    // component
    return (
        <Box
            key='liquidity'
            component="form"
            sx={{ display: 'flex', flexDirection: 'column' }}
        >
            <Typography variant="h6" align='left' component="h4" sx={{ marginTop: '1vh' }}> Add Liquidity </Typography>
            {
                oracleToken0 && token0 && oracleToken1 && token1 ?
                    (<List><ListItem>
                        <ListItemText
                            primary={`$${formater.format(Number(oracleToken1) * token1?.balance / DECIMALS_POW(token1?.decimals))}`}
                            secondary='Current Pool Liquidity'
                        />
                    </ListItem></List>)
                    : null
            }
            <FormControl key='11' sx={{ marginTop: '1vh' }} disabled={pool === null}>
                <InputLabel htmlFor="component-outlined">{pool === null ? 'Please select a farm first' : farm1}</InputLabel>
                <OutlinedInput
                    id="component-outlined-1"
                    key='1'
                    value={quantity1}
                    type="number"
                    onChange={handleChange1}
                />
                <FormHelperText id="component-helper-text">
                    {oracleToken0 && farm1 ? `$${oracleToken0}/${farm1}` : null}
                </FormHelperText>
            </FormControl>
            <FormControl key='88' sx={{ marginTop: '1vh' }} disabled={pool === null}>
                <InputLabel htmlFor="component-outlined">{pool === null ? 'Please select a farm first' : farm2}</InputLabel>
                <OutlinedInput
                    id="component-outlined-2"
                    key='2'
                    value={quantity2}
                    type="number"
                    onChange={handleChange2}
                />
                <FormHelperText id="component-helper-text">
                    {oracleToken1 && farm2 ? `$${oracleToken1}/${farm2}` : null}
                </FormHelperText>
            </FormControl>
            {
                oracleToken0 && quantity1 !== '' ?
                    (<List><ListItem>
                        <ListItemText
                            primary={`$${Number(oracleToken0) * Number(quantity1) * 2}`}
                            secondary='Estimated Token Cost in USD.'
                        />
                    </ListItem></List>)
                    : null
            }
            <Typography variant="h6" align='left' component="h4" sx={{ marginTop: '1vh' }}> veJoe Token </Typography>
            <FormControl key='2883' sx={{ marginTop: '1vh' }}>
                <InputLabel htmlFor="component-outlined">{'veJoe'}</InputLabel>
                <OutlinedInput
                    id="component-outlined-2"
                    value={quantityVeJoe}
                    type="number"
                    onChange={handleOnChangeVeJoe}
                    label={'veJoe'}
                />
            </FormControl>
            <Divider variant="middle" sx={{ marginTop: '3vh' }} />
            {
                hasIncompleteField ? null :
                    <ResultSection {...getResultProp()} />
            }
        </Box>
    );
}

const get_crypto_exchange_ratio = (token0: token_type | null, token1: token_type | null): number => {
    if (!token0 || !token1) return 0;
    const token0_quantity = token0?.balance / Math.pow(10, token0?.decimals);
    const token1_quantity = token1?.balance / Math.pow(10, token1?.decimals);
    const farm_crypto_exchange_ratio = token0_quantity / token1_quantity;
    return 1 / farm_crypto_exchange_ratio;
}

const get_crypto_name = (token: token_type | null, fallback: string): string => token ? token.symbol : fallback