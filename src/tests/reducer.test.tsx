import reducer, { initialState, calculatorSlice } from '../redux/calculatorSlice';

test('should return the initial state', () => {
  return expect(reducer(undefined, {} as any)).toEqual(
    initialState
  );
});
test('should handle setFarm', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setFarm(0))).toEqual(
    {
      ...initialState,
      farm: 0
    }
  );
});
test('should handle set JoePerSec', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setJoePerSec(0))).toEqual(
    {
      ...initialState,
      joePerSec: 0
    }
  );
});
test('should handle set oracleToken0', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setOracleToken0(10))).toEqual(
    {
      ...initialState,
      oracleToken0: 10
    }
  );
});
test('should handle set oracleToken1', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setOracleToken1(10))).toEqual(
    {
      ...initialState,
      oracleToken1: 10
    }
  );
});
test('should handle set oracleTokenJoe', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setOracleTokenJoe(10))).toEqual(
    {
      ...initialState,
      oracleTokenJoe: 10
    }
  );
});
test('should handle set pair', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setPair({ token1: 10 }))).toEqual(
    {
      ...initialState,
      pair: { token1: 10 }
    }
  );
});
test('should handle set SelectedPool', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setSelectedPool({ token1: 10 }))).toEqual(
    {
      ...initialState,
      selectedPool: { token1: 10 }
    }
  );
});
test('should handle set tokens', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setTokens({ token1: 10, token0: 0 }))).toEqual(
    {
      ...initialState,
      token0: 0,
      token1: 10
    }
  );
});
test('should handle set SelectedPool', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setTotalAllocPoint(10))).toEqual(
    {
      ...initialState,
      totalAllocPoint: 10
    }
  );
});
test('should handle set allocPoints', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setTotalAllocPoint(10))).toEqual(
    {
      ...initialState,
      totalAllocPoint: 10
    }
  );
});
test('should handle set SelectedPool', () => {
  const previousState = initialState;
  expect(reducer(previousState, calculatorSlice.actions.setUserLiquidity(10))).toEqual(
    {
      ...initialState,
      userLiquidity: 10
    }
  );
});
