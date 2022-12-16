// frontend/src/components/Navigation/index.js
import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotModal from '../Spots/AddSpot/CreateSpotModal'
import SearchModal from '../Search/SearchModal';
import './Navigation.css';
import { getSpots } from '../../store/spot'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchContent, setSearchContent] = useState('')
  const dispatch = useDispatch()
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

  return (
    <div className="wholeNav">
      <div id="HomeNavId">
      <NavLink exact to="/">
        <button onClick={() => {dispatch(getSpots())}} id="HomeButton" className='noBorder'>
         <img src={'/FamilyLogo32x32.png'} alt={'HomeButton'}/>
        bnb
        </button>
        </NavLink>
      </div>

      <div className='AroundCenterButton'>
        <div className='CenterButton'>
      <SearchModal  showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} searchContent={searchContent} setSearchContent={setSearchContent}/>
        <button onClick={() => {setShowSearchModal(true); setSearchContent('states') }}>Anywhere</button>
        <>|</>
        <button onClick={() => {setShowSearchModal(true); setSearchContent('price') }}> Any price</button>
        <>|</>
        <button onClick={() => {setShowSearchModal(true); setSearchContent('guests') }}>Add guests</button>
        <button onClick={nonFunctional}><i className="material-symbols-outlined">search</i></button>
        </div>
         {/* <button className="CenterButton" onClick={nonFunctional}>Anywhere | Any week | Add guest   <i className="material-symbols-outlined">search</i></button> */}
      </div>

      <div  className="dropdownNav">
        <div className='insideRightNav'>
      {sessionUser &&<div className={'cursor'} onClick={() => {setShowModal(true)}}>Abnb your home</div> }
      <CreateSpotModal showModal={showModal} setShowModal={setShowModal}/>
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
