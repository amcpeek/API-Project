import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import AddSpotForm from './Index';

function CreateSpotModal({showModal, setShowModal}) {
//   const [showModal, setShowModal] = useState(false);
{/* <Modal onClose={() => setShowModal(false)}> */}

  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowModal(true)}>Create New Spot</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSpotForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotModal;
