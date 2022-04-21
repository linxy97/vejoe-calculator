import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FARMS } from '../constants/constants';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { calculatorSlice } from '../redux/calculatorSlice';
import { TokenOracleApi } from '../api/price-oracle-api';
import { CoinApi as TokenApi } from "../api/coin-api";
import { PairApi } from "../api/pair-api";
import { PmcjApi } from "../api/pmcj-api";
import { Style } from './Style';

export const DropDownPicker = () => {
    const dispatch = useDispatch();
    const [farm, setFarm] = React.useState('-1');
    const setFarmAction = calculatorSlice.actions.setFarm;
    const handleChange = (event: SelectChangeEvent) => {
        setFarm(event.target.value);
        dispatch(setFarmAction(Number(event.target.value)));
        if (!event.target || Number(event.target.value) === -1) {
            dispatch(calculatorSlice.actions.setSelectedPool(null as any));
        }
        else {
            // fetch pool contract
            PmcjApi.fetchPoolInfo(Number(event.target.value)).then(value => {
                    dispatch(calculatorSlice.actions.setSelectedPool(JSON.stringify(value)))
                    const lpToken = value.lpToken;
                    // fetch and save pair contract
                    PairApi.fetchAll(value.lpToken).then(value => {
                        dispatch(calculatorSlice.actions.setPair(JSON.stringify(value)));
                        // fetch and save token contracts
                        TokenApi.getTokenInfo(lpToken, value.token0, value.token1).then( value => {
                            dispatch(calculatorSlice.actions.setTokens(value));
                        });
                        const [farm0, farm1] = FARMS[event.target.value];
                        // fetch and save price for token
                        TokenOracleApi.getTokenPriceInUSD(farm0).then(value => {dispatch(calculatorSlice.actions.setOracleToken0(Number(value)))});
                        TokenOracleApi.getTokenPriceInUSD(farm1).then(value => {dispatch(calculatorSlice.actions.setOracleToken1(Number(value)))});
                    });
                  }
              );
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <Typography variant="h6" align='left' component="h4" sx={{ marginTop: '1vh' }}> Farm </Typography>
            <FormControl fullWidth>
                <Select
                    displayEmpty
                    labelId="simple-select-label"
                    id="simple-select"
                    value={farm}
                    onChange={handleChange}
                    sx={Style.input}
                >
                    {renderMenuItems().map((element => element))}
                </Select>
            </FormControl>
        </Box>
    );
}

const renderMenuItems = () => {
    const options = [<MenuItem disabled value={-1}> Select a farm </MenuItem>];
    for (let i = 0; i < FARMS.length; i++) {
        const [farm1, farm2] = FARMS[i];
        options.push(<MenuItem value={i.toString()}> {farm1} - {farm2} </MenuItem>)
    }
    return options;
}