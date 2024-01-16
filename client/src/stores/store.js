import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userSlice from './userSlice'

//Store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice
  }
})

