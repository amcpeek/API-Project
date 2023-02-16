import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import UpdateBookingForm from './index'

function UpdateBookingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='whiteButton' onClick={() => setShowModal(true)}>
      <i className="material-symbols-outlined">
           edit_note
        </i>

      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBookingForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateBookingModal;
