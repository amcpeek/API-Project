// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import "./LoginForm.css";

function LoginForm({ showLogInModal, setShowLogInModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowLogInModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const logInDemoUser = (e) => {
    const credential = "Annika";
    // const demoEmail = 'demo@user.io'
    const password = "password";
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        setShowLogInModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  //className was LogInForm
  return (
    <div className="realModalOutside">
      <div className="realModalContent">
        <div className="outerFormTop">
          <div className="formTop">
            <button
              className="cancelButton"
              onClick={() => setShowLogInModal(false)}
            >
              X
            </button>
            <h4>Login Form</h4>
            <div className="LogInErrors">
              {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="CreateSpotForm">
          <div>
            <label>
              <input
                className="roundTopFields"
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
                className="roundBottomFields"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <button className="createButton" type="submit">
              Log In
            </button>
          </div>
          <div>
            <button className="createButton" onClick={logInDemoUser}>
              Login as Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
