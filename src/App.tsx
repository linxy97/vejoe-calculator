import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DropDownPicker } from './components/drop-down-picker';
import { Box } from '@mui/system';
import { PMCJ_API } from './api/web3-api';
import { calculatorSlice } from './redux/calculatorSlice';
function App() {
  const dispatch = useDispatch();
  const joePerSec = useSelector((state: RootState) => state.calculator.joePerSec);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      PMCJ_API.fetchJoePerSec().then(
        value => {dispatch(calculatorSlice.actions.setJoePerSec(value))}
      );
      PMCJ_API.fetchTotalAllocPoint().then(
        value => {dispatch(calculatorSlice.actions.setTotalAllocPoint(value))}
      );
      // for (let i = 0; i<13; i++) {
      //   PMCJ_API.fetchPoolInfo(i).then(
      //     value => {dispatch(calculatorSlice.actions.setSelectedPool({key: i, value: JSON.stringify(value)}))}
      //   );
      // }
    }
    fetchData();
  }, [])

  return (
    <Container className="App" maxWidth='sm'>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5vh', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
        <Typography variant="h3" component="h2"> veJoe Calculator </Typography>
        <DropDownPicker />
      </Box>
    </Container>
  );
}

export default App;
