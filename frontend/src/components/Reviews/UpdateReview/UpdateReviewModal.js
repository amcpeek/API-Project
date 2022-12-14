import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import UpdateReviewForm from './Index'

function UpdateReviewModal() {
  const [showModal, setShowModal] = useState(false);
{/* <Modal onClose={() => setShowModal(false)}> */}

  return (
    <>
      <button onClick={() => setShowModal(true)}>
      <i className="material-symbols-outlined">
           edit_note
        </i>

      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReviewForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewModal;
