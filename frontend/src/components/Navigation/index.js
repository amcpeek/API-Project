// frontend/src/components/Navigation/index.js
import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  //const dispatch = useDispatch()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />

    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>

      </>
    );
  }

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div id="wholeNav">
      <div>
      <NavLink exact to="/">
        <button id="HomeButton" className='noBorder'>
        <i className="material-symbols-outlined"> home</i>
        aibnb
        </button>
        </NavLink>

      </div>
      <div>
        {/* <button>Anywhere</button>
        <button> Any week</button>
        <button>
        Add guest   <i className="material-symbols-outlined">search</i>
          </button> */}
          <button id="CenterButton">Anywhere | Any week | Add guest   <i className="material-symbols-outlined">search</i></button>

      </div>
      <div id='rightNav'>
        <button className='noBorder' onClick={openMenu}>Switch to hosting</button>
        {showMenu && (
          <ul className='profile-dropdown' id='hostDropdown'>
            <li>
            <NavLink exact to="/spots/current">Your Homes</NavLink>
            </li>
            <li>
            <NavLink exact to="/spots/create" id="navBar">List Your Home</NavLink>
            </li>
          </ul>
        )}
        <button className='noBorder'>
        <i className="material-symbols-outlined">language</i>
        </button>
         {isLoaded && sessionLinks}
      </div>

    </div>
  );
}

export default Navigation;
