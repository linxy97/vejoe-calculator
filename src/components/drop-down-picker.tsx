import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FARMS } from '../constants/constants';
import { TextField, Typography } from '@mui/material';
import LiquidityAddInput from './liquidity-add-input';
import { useDispatch } from 'react-redux';
import { calculatorSlice } from '../redux/calculatorSlice';
import { COIN_API, PAIR_API, PMCJ_API } from '../api/web3-api';

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
            PMCJ_API.fetchPoolInfo(Number(event.target.value)).then(value => {
                    dispatch(calculatorSlice.actions.setSelectedPool(JSON.stringify(value)))
                    const lpToken = value.lpToken;
                    PAIR_API.fetchAll(value.lpToken).then(value => {
                        dispatch(calculatorSlice.actions.setPair(JSON.stringify(value)));
                        console.log(value.token0)
                        COIN_API.getCoinInfos(lpToken, value.token0, value.token1).then( value => {
                            dispatch(calculatorSlice.actions.setTokens(value));
                        });
                    });
                  }
              );
        }
    };

    const renderMenuItems = () => {
        const options = [<MenuItem value={-1}> Select a farm </MenuItem>];
        for (let i = 0; i < FARMS.length; i++) {
            const [farm1, farm2] = FARMS[i];
            options.push(<MenuItem value={i.toString()}> {farm1} - {farm2} </MenuItem>)
        }
        return options;
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <Typography variant="h6" align='left' component="h4" sx={{ marginTop: '1vh' }}> Farm </Typography>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">farm</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={farm}
                    label="farm"
                    onChange={handleChange}
                >
                    {renderMenuItems().map((element => element))}
                </Select>
            </FormControl>
            <LiquidityAddInput />
        </Box>
    );
}
