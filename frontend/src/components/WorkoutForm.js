import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createWorkout } from '../store/workoutsSlice'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const dispatch = useDispatch()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = { title, load, sets, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setSets('')
      setReps('')
      dispatch(createWorkout(json))
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>
        <b>Add a New Workout</b>
      </h3>

      <label>
        <b>Exercise :</b>
      </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>
        <b>Load (in kg) :</b>
      </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>
        <b>Number of Sets :</b>
      </label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields.includes('sets') ? 'error' : ''}
      />

      <label>
        <b>Number of Reps :</b>
      </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>
        <b>Add Workout</b>
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
