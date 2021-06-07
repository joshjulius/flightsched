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

const CreateAccModal = ({ visibility, hideModal }) => {
  let domNode = useClickOutside(() => {
    hideModal();
  });

  let [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  let changeHandler = (e) => {
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
              <h2>Create Account</h2>
              <button onClick={hideModal} className="close">
                Close
              </button>
            </div>
            <div className="item">
              <label htmlFor="firstName">First Name</label>
              <input
                onChange={changeHandler}
                type="text"
                id="firstName"
                name="firstName"
                value={state.firstName}
              />
            </div>
            <div className="item">
              <label htmlFor="lastName">Last Name</label>
              <input
                onChange={changeHandler}
                type="text"
                id="lastName"
                name="lastName"
                value={state.lastName}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                onChange={changeHandler}
                type="email"
                id="email"
                name="email"
                value={state.email}
              />
            </div>
            <div className="item">
              <label htmlFor="phone">Phone Number</label>
              <input
                onChange={changeHandler}
                type="text"
                id="phone"
                name="phone"
                value={state.phone}
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input
                onChange={changeHandler}
                type="password"
                id="password"
                name="password"
                value={state.password}
              />
            </div>
            <button type="submit" className="submit">
              Create Account
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default CreateAccModal;
