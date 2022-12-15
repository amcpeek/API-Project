import React from 'react';
import { Modal } from '../../context/Modal';
import SearchForm from './Index';

function SearchModal({showSearchModal, setShowSearchModal}) {


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowLogInModal(true)}>Log In</button> */}
      {showSearchModal && (
        <Modal onClose={() => setShowSearchModal(false)}>
          <SearchForm  showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal}/>
        </Modal>
      )}
    </>
  );
}

export default SearchModal;
