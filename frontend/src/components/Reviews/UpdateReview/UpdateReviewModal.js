import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import UpdateReviewForm from './Index'

function UpdateReviewModal() {
  const [showModal, setShowModal] = useState(false);
{/* <Modal onClose={() => setShowModal(false)}> */}

  return (
    <>
      <button className='deleteButton' onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReviewForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewModal;
