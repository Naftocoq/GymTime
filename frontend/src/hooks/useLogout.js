import { useDispatch } from 'react-redux'
import { clearWorkouts } from '../store/workoutsSlice'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch: dispatchWorkouts } = useAuthContext()
  const dispatch = useDispatch()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    localStorage.removeItem('workouts')
    // Dispatch the action to clear workouts state
    dispatch(clearWorkouts())

    // dispatch logout action
    dispatchWorkouts({ type: 'LOGOUT' })
  }

  return { logout }
}
