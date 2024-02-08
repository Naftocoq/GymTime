import { configureStore } from '@reduxjs/toolkit'
import workoutsReducer from './workoutsSlice'

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
  },
})
