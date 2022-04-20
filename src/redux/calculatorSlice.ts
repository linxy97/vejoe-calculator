import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
    farm: any;
    userLiquidity: any;
    joePerSec: any;
    veJoeShare: any;
    totalLiquidity: any;
    selectedPool: any;
    totalAllocPoint: any;
    pair: any,
    token0: any,
    token1: any,
    oracleToken0: any,
    oracleToken1: any,
    oracleTokenJoe: any,
} 
const initialState: stateType = {
    farm: -1,
    userLiquidity: null,
    joePerSec: null,
    veJoeShare: null,
    totalLiquidity: null,
    selectedPool: null,
    totalAllocPoint: null,
    pair: null,
    token0: null,
    token1: null,
    oracleToken0: null,
    oracleToken1: null,
    oracleTokenJoe: null,
}
export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: initialState,
    reducers: {
        setUserLiquidity: (state, action: PayloadAction<number>) => {
            state.userLiquidity = action.payload;
        },
        setFarm: (state, action: PayloadAction<number>) => {
            state.farm = action.payload;
        },
        setJoePerSec: (state, action: PayloadAction<number>) => {
            state.joePerSec = action.payload;
        },
        setSelectedPool: (state, action: PayloadAction<any>) => {
            if (!action.payload) state.selectedPool = null;
            else state.selectedPool = action.payload;
        },
        setTotalAllocPoint: (state, action: PayloadAction<any>) => {
            state.totalAllocPoint = action.payload;
        },
        setPair: (state, action: PayloadAction<any>) => {
            if (!action.payload) state.pair = null;
            else state.pair = action.payload;
        },
        setTokens: (state, action: PayloadAction<any>) => {
            console.log(action);
            if (!action.payload) {state.token0 = null; state.token1 = null;}
            else {state.token0 = action.payload.token0; state.token1 = action.payload.token1;}
        },
        setOracleToken0: (state, action: PayloadAction<any>) => {
            state.oracleToken0 = action.payload;
        },
        setOracleToken1: (state, action: PayloadAction<any>) => {
            state.oracleToken1 = action.payload;
        },
        setOracleTokenJoe: (state, action: PayloadAction<any>) => {
            state.oracleTokenJoe = action.payload;
        },
    }
})

export default calculatorSlice.reducer;