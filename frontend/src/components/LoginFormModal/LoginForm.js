// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './LoginForm.css'

function LoginForm({showLogInModal, setShowLogInModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    ).then(() => {setShowLogInModal(false)})
  };



  const logInDemoUser = (e) => {
    const credential = 'Annika'
    // const demoEmail = 'demo@user.io'
    const password = 'password'
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    ).then(() => {setShowLogInModal(false)})
  }
 //className was LogInForm
  return (
    <div className="realModalOutside">
    <div className="realModalContent">
    <form onSubmit={handleSubmit} className="CreateSpotForm" >
      <button className="cancelButton" onClick={() => setShowLogInModal(false)}>X</button>

      <div>
      <label >
        <input
          placeholder="Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
        <button className='createButton' type="submit">Log In</button>
      </div>
      <div>
        <button className='createButton' onClick={logInDemoUser}>Login as Demo User</button>
      </div>
      <div className='LogInErrors'>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
    </form>
    </div>
    </div>
  );
}

export default LoginForm;
