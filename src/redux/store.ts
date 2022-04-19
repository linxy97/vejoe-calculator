import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from './calculatorSlice'

const store = configureStore({
  reducer: {
    calculator: calculatorReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store