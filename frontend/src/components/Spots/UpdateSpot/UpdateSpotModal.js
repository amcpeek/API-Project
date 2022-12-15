import React from 'react';
import { Modal } from '../../../context/Modal'
import UpdateSpotForm from './Index';

function UpdateSpotModal({showModal, setShowModal}) {

  return (
    <>
      <button onClick={() => setShowModal(true)}>Update Home</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSpotForm  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateSpotModal;
