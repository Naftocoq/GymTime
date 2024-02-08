import { createSlice } from '@reduxjs/toolkit'

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: [],
  },
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
      )
    },
    //creatWorkout alphabetically
    createWorkout: (state, action) => {
      const newWorkout = action.payload
      const index = state.workouts.findIndex(
        (workout) =>
          newWorkout.title.toLowerCase() < workout.title.toLowerCase()
      )
      if (index >= 0) {
        state.workouts.splice(index, 0, newWorkout)
      } else {
        state.workouts.push(newWorkout)
      }
    },

    //sort by last added
    // createWorkout: (state, action) => {
    //   state.workouts.unshift(action.payload)
    // },

    deleteWorkout: (state, action) => {
      const index = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      )
      state.workouts.splice(index, 1) // Remove the matching workout
    },

    updateWorkout: (state, action) => {
      const index = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      )

      if (index >= 0) {
        // Update the existing workout with the new data
        state.workouts[index] = action.payload
      } else {
        // Handle cases where the workout to update doesn't exist (e.g., log a warning or throw an error)
        console.warn('Workout with ID not found:', action.payload._id)
      }
    },
    // New action to clear workouts state
    clearWorkouts: (state) => {
      state.workouts = []
    },
  },
})

export const {
  setWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  clearWorkouts,
} = workoutsSlice.actions

export default workoutsSlice.reducer
