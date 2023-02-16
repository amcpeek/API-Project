import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import AddBookingForm from './index'

function AddBookingModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <div className='checkButton' onClick={() => setShowModal(true)}>
      {/* <i className="material-symbols-outlined">
      edit
      </i> */}
      Check availability
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddBookingForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddBookingModal;
