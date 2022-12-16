import React from 'react';
import { Modal } from '../../context/Modal';
import SearchForm from './Index';

function SearchModal({showSearchModal, setShowSearchModal, searchContent, setSearchContent }) {


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowLogInModal(true)}>Log In</button> */}
      {showSearchModal && (
        <Modal onClose={() => setShowSearchModal(false)}>
          <SearchForm  showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} searchContent={searchContent} setSearchContent={setSearchContent}/>
        </Modal>
      )}
    </>
  );
}

export default SearchModal;
