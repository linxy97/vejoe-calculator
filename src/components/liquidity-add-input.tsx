import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Divider, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { exponent } from "./helpers";
import { PairResponseType, TokenType } from "../api/api-type";
import { ResultSection, vejoeProps } from './vejoe-result';
import { Style } from './Style';

export default function LiquidityAddInput() {
    // selectors
    const farmSelected = useSelector((state: RootState) => state.calculator.farm);
    const pool = useSelector((state: RootState) => state.calculator.selectedPool);
    const pair = useSelector((state: RootState) => state.calculator.pair);
    const token0: TokenType | null = useSelector((state: RootState) => state.calculator.token0);
    const token1: TokenType | null = useSelector((state: RootState) => state.calculator.token1);
    const oracleToken0: TokenType | null = useSelector((state: RootState) => state.calculator.oracleToken0);
    const oracleToken1: TokenType | null = useSelector((state: RootState) => state.calculator.oracleToken1);
    // variables needed for calculations
    const farm_crypto_exchange_ratio = get_crypto_exchange_ratio(token0, token1);
    const farm0 = farmSelected !== -1 ? get_crypto_name(token0, 'Pulling Data') : '';
    const farm1 = farmSelected !== -1 ? get_crypto_name(token1, 'Pulling Data') : '';
    // local states and handlers - userInput quantity
    const [quantity0, setQuantity0] = React.useState('');
    const [quantity1, setQuantity1] = React.useState('');
    const [quantityVeJoe, setVeJoe] = React.useState('');
    const onQuantity1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = ((Number(event.target.value) ?? 0) * farm_crypto_exchange_ratio);
        setQuantity0(event.target.value);
        setQuantity1(value !== 0 ? value.toFixed(4) : '');
    };
    const onQuantity2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (Number(event.target.value) ?? 0) / farm_crypto_exchange_ratio;
        setQuantity0(value !== 0 ? value.toFixed(4) : '');
        setQuantity1(event.target.value);
    };
    const onQuantityVejoeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVeJoe(event.target.value);
    };

    const formater = Intl.NumberFormat('en-US');
    const hasIncompleteField = (!quantity0 || !quantity1 || !quantityVeJoe || !pool || !pair || !token0 || !token1);
    
    // props for result section
    const getResultProp = (): vejoeProps => {
        const quantity1_result = Number(quantity0) ?? 0;
        const quantity2_result = Number(quantity1) ?? 0;
        const veJoe_result = Number(quantityVeJoe) ?? 0;
        return {
            quantity1: quantity1_result,
            quantity2: quantity2_result,
            veJoe: veJoe_result,
            pool: JSON.parse(pool),
            pair: JSON.parse(pair) as PairResponseType,
            token0: token0 as TokenType,
            token1: token1 as TokenType
        } as vejoeProps
    }
    
    return (
        <Box
            key='liquidity'
            component="form"
            sx={{ display: 'flex', flexDirection: 'column' }}
        >
            <Divider />
            <Typography variant="h6" align='left' component="h4" sx={{ marginTop: '1vh' }}> Add Liquidity </Typography>
            <FormControl key='11' sx={{ marginTop: '1vh' }} disabled={pool === null}>
                <InputLabel htmlFor="component-outlined">{pool === null ? 'Please select a farm first' : farm0}</InputLabel>
                <OutlinedInput
                    id="component-outlined-1"
                    key='1'
                    value={quantity0}
                    type="number"
                    onChange={onQuantity1Change}
                    sx={Style.input}
                />
                <FormHelperText id="component-helper-text">
                    {oracleToken0 && farm0 ? `$${oracleToken0}/${farm0}` : null}
                </FormHelperText>
            </FormControl>
            <FormControl key='88' sx={{ marginTop: '1vh' }} disabled={pool === null}>
                <InputLabel htmlFor="component-outlined">{pool === null ? 'Please select a farm first' : farm1}</InputLabel>
                <OutlinedInput
                    id="component-outlined-2"
                    key='2'
                    value={quantity1}
                    type="number"
                    onChange={onQuantity2Change}
                    sx={Style.input}
                />
                <FormHelperText id="component-helper-text">
                    {oracleToken1 && farm1 ? `$${oracleToken1}/${farm1}` : null}
                </FormHelperText>
                {
                oracleToken0 && token0 && oracleToken1 && token1 ?
                    (<List><ListItem>
                        <Tooltip title="This refers is the total worth of asset in this liquidity pool">
                            <ListItemText
                                primary={`$${formater.format(Number(oracleToken1) * token1?.balance * 2 / exponent(token1?.decimals))}`}
                                secondary='Current Pool Liquidity'
                            />
                        </Tooltip>
                    </ListItem></List>)
                    : null
            }
            </FormControl>
            {
                oracleToken0 && quantity0 !== '' ?
                    (<List><ListItem>
                        <ListItemText
                            primary={`$${Number(oracleToken0) * Number(quantity0) * 2}`}
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
                    onChange={onQuantityVejoeChange}
                    label={'veJoe'}
                    sx={Style.input}
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

const get_crypto_exchange_ratio = (token0: TokenType | null, token1: TokenType | null): number => {
    if (!token0 || !token1) return 0;
    const token0_quantity = token0?.balance / Math.pow(10, token0?.decimals);
    const token1_quantity = token1?.balance / Math.pow(10, token1?.decimals);
    const farm_crypto_exchange_ratio = token0_quantity / token1_quantity;
    return 1 / farm_crypto_exchange_ratio;
}

const get_crypto_name = (token: TokenType | null, fallback: string): string => token ? token.symbol : fallback
