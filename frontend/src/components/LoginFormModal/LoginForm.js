// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };



  const logInDemoUser = (e) => {
    const credential = 'Demo-lition'
    // const demoEmail = 'demo@user.io'
    const password = 'password'
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="LogInForm" >


      <label >
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div>
        <button type="submit">Log In</button>
      </div>
      <div>
        <button onClick={logInDemoUser}>Login as Demo User</button>
      </div>
      <div>
      <button onClick={() => setShowModal(false)}>Not Working - Cancel</button>
      </div>
      <div className='LogInErrors'>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
    </form>
  );
}

export default LoginForm;
