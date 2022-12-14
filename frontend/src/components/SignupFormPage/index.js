// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import './SignupForm.css';

function SignupFormPage({showSignUpModal, setShowSignUpModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }).then(() => {setShowSignUpModal(false)})
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    // <div className ="SignUpPage">
    <div className="realModalOutside">
    <div className="realModalContent">
    <form onSubmit={handleSubmit} className="CreateSpotForm" >
    <button className="cancelButton" onClick={() => setShowSignUpModal(false)}>X</button>
      <div className='LogInErrors'>
        <ul className='ulNoBullets'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>  )}
        </ul>
      </div>
      <div>
      <label>
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <input
        placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <button className='createButton' type="submit">Sign Up</button>
      {/* <button><NavLink to='/'>Cancel</NavLink></button> */}
      </div>
    </form>
    </div>
    </div>

  );
}

export default SignupFormPage;
