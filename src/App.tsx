import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DropDownPicker } from './components/drop-down-picker';
import { Box } from '@mui/system';
import { PMCJ_API, TOKEN_ORACLE_API } from './api/web3-api';
import { calculatorSlice } from './redux/calculatorSlice';
import { DECIMALS_POW } from './constants/constants';
function App() {
  const dispatch = useDispatch();
  let oracleJoe = useSelector((state: RootState) => state.calculator.oracleTokenJoe)

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      PMCJ_API.fetchJoePerSec().then(value => {dispatch(calculatorSlice.actions.setJoePerSec(value))});
      PMCJ_API.fetchTotalAllocPoint().then(value => {dispatch(calculatorSlice.actions.setTotalAllocPoint(value))});
      TOKEN_ORACLE_API.getTokenPriceInUSD('JOE').then(value => {dispatch(calculatorSlice.actions.setOracleTokenJoe(Number(value)))});
    }
    fetchData();
  }, [])

  return (
    <Container className="App" maxWidth='sm'>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5vh', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
        <Typography variant="h3" component="h2"> veJoe Calculator </Typography>
        <Typography variant="body1" component="body"> JOE Token: ${oracleJoe ? (oracleJoe).toFixed(4): 'fetching from Oracle'} </Typography>
        <DropDownPicker />
      </Box>
    </Container>
  );
}

export default App;
