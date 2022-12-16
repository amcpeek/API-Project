// frontend/src/components/Navigation/index.js
import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotModal from '../Spots/AddSpot/CreateSpotModal'
import SearchModal from '../Search/SearchModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchContent, setSearchContent] = useState('')
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const nonFunctional = async (e) => {
    e.preventDefault()
    alert('This feature is not yet developed')
  }

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <>
  //     <ProfileButton user={sessionUser} />
  //     </>
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignUpFormModal />
  //     </>
  //   );
  //}

  // const dispatch = useDispatch();


  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };



  return (
    <div className="wholeNav">
      <div id="HomeNavId">
      <NavLink exact to="/">
        <button id="HomeButton" className='noBorder'>
         <img src={'/FamilyLogo32x32.png'} alt={'HomeButton'}/>
        bnb
        </button>
        </NavLink>
      </div>

      <div className='AroundCenterButton'>
        {/* <div className='CenterButton'>
      <SearchModal  showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} searchContent={searchContent} setSearchContent={setSearchContent}/>
        <button onClick={() => {setShowSearchModal(true); setSearchContent('states') }}>Anywhere</button>
        <button onClick={() => {setShowSearchModal(true); setSearchContent('price') }}> Any price</button>
        <button onClick={() => {setShowSearchModal(true); setSearchContent('guests') }}>Add guests</button>
        <button onClick={nonFunctional}><i className="material-symbols-outlined">search</i></button>
        </div> */}
         <button className="CenterButton" onClick={nonFunctional}>Anywhere | Any week | Add guest   <i className="material-symbols-outlined">search</i></button>
      </div>


      <div  className="dropdownNav">
        <div className='insideRightNav'>
      {/* id='rightNav' */}
      {sessionUser &&<div className={'cursor'} onClick={() => {setShowModal(true)}}>Abnb your home</div> }
      <CreateSpotModal showModal={showModal} setShowModal={setShowModal}/>
      {/* {sessionUser && <button className='dropButtonNav' onClick={openMenu}>Abnb your home</button>} */}

        {/* noBorder */}
        {/* {showMenu && (
          <div className='dropdownContentNav2'>
          {/* <ul className='profile-dropdown' id='hostDropdown'> */}
            {/* <div>
            <NavLink exact to="/spots/current">Your Homes</NavLink>
            </div>
            {/* <div>
            <NavLink exact to="/spots/create" id="navBar">List Your Home</NavLink>
            </div> */}
            {/* <div className={'cursor'} onClick={() => {setShowModal(true)}}>List Your Home</div> */}
          {/* </div> */}

        <button className='noBorder'onClick={nonFunctional}>
        <i className="material-symbols-outlined globe">language</i>
        </button>

         {isLoaded && (
           <ProfileButton user={sessionUser} />
         )}
         </div>
      </div>

    </div>
  );
}

export default Navigation;
