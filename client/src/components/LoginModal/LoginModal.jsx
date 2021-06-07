import React, { useState, useRef, useEffect } from "react";
import "../Modal/Modal.scss";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const LoginModal = ({ visibility, hideModal }) => {
  let domNode = useClickOutside(() => {
    hideModal();
  });

  let [state, setState] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  if (!visibility) {
    return null;
  } else if (visibility) {
    return (
      <div className="modal">
        <form action="" method="POST" ref={domNode}>
          <div className="form-container">
            <div className="form-header">
              <h2>Login</h2>
              <button onClick={hideModal} className="close">
                Close
              </button>
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={state.email}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={state.password}
                onChange={changeHandler}
              />
            </div>
            <button type="submit" className="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default LoginModal;
