import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice
  }
})

