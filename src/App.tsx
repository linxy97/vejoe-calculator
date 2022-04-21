import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Avatar, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DropDownPicker } from './components/drop-down-picker';
import { Box } from '@mui/system';
import { TokenOracleApi } from './api/price-oracle-api';
import { PmcjApi } from "./api/pmcj-api";
import { calculatorSlice } from './redux/calculatorSlice';
import { JOE_IMAGE_URL } from './constants/constants';
import CalculateIcon from '@mui/icons-material/Calculate';
import LiquidityAddInput from './components/liquidity-add-input';

function App() {
  const dispatch = useDispatch();
  let oracleJoe = useSelector((state: RootState) => state.calculator.oracleTokenJoe);
  useEffect(() => {
    const fetchData = async () => {
      PmcjApi.fetchJoePerSec().then(value => {dispatch(calculatorSlice.actions.setJoePerSec(value))});
      PmcjApi.fetchTotalAllocPoint().then(value => {dispatch(calculatorSlice.actions.setTotalAllocPoint(value))});
      TokenOracleApi.getTokenPriceInUSD('JOE').then(value => {dispatch(calculatorSlice.actions.setOracleTokenJoe(Number(value)))});
    }
    fetchData();
  }, [])

  return (
    <Container className="App" maxWidth='sm'>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5vh', justifyContent: 'center', gap: '1rem' }}>
        <img style={{ width: '20vw' }} alt="..." src={JOE_IMAGE_URL}/>
        <div style={{flexDirection:'row'}}>
          <Typography variant="h5" component="h2"> VeJoe Calculator </Typography>
          <CalculateIcon />
        </div>
        <Typography variant="body1" component="body"> JOE Token Price : ${oracleJoe ? (oracleJoe).toFixed(4): 'fetching from Oracle'} </Typography>
        <DropDownPicker />
        <LiquidityAddInput />
      </Box>
    </Container>
  );
}

export default App;
