import { useDispatch } from 'react-redux'
import { useAuthContext } from '../hooks/useAuthContext'

import {
  deleteWorkout,
  updateWorkout,
  setWorkouts,
} from '../store/workoutsSlice'
import DeleteModal from './DeleteModal'

import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const WorkoutDetails = ({ workout }) => {
  const dispatch = useDispatch()
  const { user } = useAuthContext()

  const [newWorkout, setNewWorkout] = useState({})
  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleCloseEdit = () => {
    setShowEdit(false)
    setNewWorkout({}) // Reset newWorkout state to an empty object
  }
  const handleShowEdit = () => setShowEdit(true)
  //
  const handleChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value })
  }
  //
  const confirmEdit = async () => {
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newWorkout),
      })

      if (!response.ok) {
        throw new Error('Failed to update workout')
      }

      const updatedWorkout = await response.json()
      dispatch(updateWorkout(updatedWorkout))
      handleCloseEdit()

      const workoutsResponse = await fetch('/api/workouts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })

      const updatedWorkouts = await workoutsResponse.json()
      dispatch(setWorkouts(updatedWorkouts))
    } catch (error) {
      console.error('Error updating workout:', error.message)
    }
  }
  
  //
  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch(deleteWorkout(json))
      setShowDeleteModal(false)
    }
  }
  //
  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  return (
    <div className="workout-details">
      <h4>
        <b>{workout.title}</b>
      </h4>
      <p>
        <strong>Load (kg) : </strong>
        {workout.load}
      </p>
      <p>
        <strong>Sets : </strong>
        {workout.sets}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      <div>
        <span
          style={{ marginRight: '50px' }}
          className="material-symbols-outlined"
          onClick={handleShowEdit}
        >
          edit
        </span>
        <span className="material-symbols-outlined" onClick={handleDelete}>
          delete
        </span>

        <Modal show={showEdit} onHide={handleCloseEdit}>
          <div style={{ margin: '15px' }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Exercise :</b>
              </Form.Label>
              <Form.Control
                name="title"
                value={newWorkout.title || ''}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder={workout.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Load (in kg) :</b>
              </Form.Label>
              <Form.Control
                name="load"
                value={newWorkout.load || ''}
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder={workout.load}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Number of Sets :</b>
              </Form.Label>
              <Form.Control
                name="sets"
                value={newWorkout.sets || ''}
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder={workout.sets}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Number of Reps :</b>
              </Form.Label>
              <Form.Control
                name="reps"
                value={newWorkout.reps || ''}
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder={workout.reps}
              />
            </Form.Group>
          </div>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="warning" onClick={confirmEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <DeleteModal
          workoutTitle={workout.title}
          showDelete={showDeleteModal}
          HideDelete={closeDeleteModal}
          ConfirmDelete={confirmDelete}
        />
      </div>
    </div>
  )
}

export default WorkoutDetails
