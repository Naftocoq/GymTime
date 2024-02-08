import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeleteModal = ({
  showDelete,
  HideDelete,
  ConfirmDelete,
  workoutTitle,
}) => {
  return (
    <Modal show={showDelete} onHide={HideDelete} centered>
      <Modal.Body>
        Are you sure you want to delete "<b>{workoutTitle}</b>"" ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={HideDelete}>
          Cancel
        </Button>
        <Button variant="danger" onClick={ConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
