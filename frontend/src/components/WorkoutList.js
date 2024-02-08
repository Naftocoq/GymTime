import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setWorkouts } from '../workoutsSlice'
import WorkoutDetails from './WorkoutDetails'

const WorkoutsList = () => {
  const dispatch = useDispatch()
  const workouts = useSelector((state) => state.workouts.workouts)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const data = await response.json()
      dispatch(setWorkouts(data))
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="workouts-list">
      <h2>Workouts</h2>
      {workouts.map((workout) => (
        <WorkoutDetails key={workout.id} workout={workout} />
      ))}
    </div>
  )
}

export default WorkoutsList


