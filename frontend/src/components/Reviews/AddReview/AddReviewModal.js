import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import AddReviewForm from './Index'

function AddReviewModal() {
  const [showModal, setShowModal] = useState(false);
{/* <Modal onClose={() => setShowModal(false)}> */}

  return (
    <>
      <div className='underlined' onClick={() => setShowModal(true)}>
      <i className="material-symbols-outlined">
      edit
      </i>
      Create
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReviewForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddReviewModal;
