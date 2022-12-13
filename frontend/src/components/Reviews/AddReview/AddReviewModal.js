import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import AddReviewForm from './Index'

function AddReviewModal() {
  const [showModal, setShowModal] = useState(false);
{/* <Modal onClose={() => setShowModal(false)}> */}

  return (
    <>
      <button className='deleteButton' onClick={() => setShowModal(true)}>Create Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReviewForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddReviewModal;
