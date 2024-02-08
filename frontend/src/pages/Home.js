import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setWorkouts } from '../store/workoutsSlice'
import { clearWorkouts } from '../store/workoutsSlice'

import { useAuthContext } from '../hooks/useAuthContext'
// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const workouts = useSelector((state) => state.workouts.workouts)
  const dispatch = useDispatch()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        })
        const json = await response.json()

        if (response.ok) {
          dispatch(setWorkouts(json))
        }
      } catch (error) {
        console.error('Error fetching workouts:', error)
      }
    }

    if (user) {
      fetchWorkouts()
    } else {
      // Clear workouts state if the user becomes null
      dispatch(clearWorkouts([]))
    }

  }, [dispatch, user])
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
