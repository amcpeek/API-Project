import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import UpdateSpotForm from './Index';

function UpdateSpotModal({showModal, setShowModal}) {
//   const [showModal, setShowModal] = useState(false);
{/* <Modal onClose={() => setShowModal(false)}> */}

  return (
    <>
      <button className='deleteButton' onClick={() => setShowModal(true)}>Update Home</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSpotForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateSpotModal;
