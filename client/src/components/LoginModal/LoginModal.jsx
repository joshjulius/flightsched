import React, { useState, useRef, useEffect } from "react";
import "../Modal/Modal.scss";
import axios from "axios";
import ErrorBooking from "../ErrorBooking/ErrorBooking";

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

  let [validation, setValidation] = useState(true);

  //Check if the input value is correct or not, if it is, return true, return false when it is not
  let validate = () => {
    if (!state.password) {
      setValidation(false);
      return false;
    }
    return true;
  };

  //resetting the state back to empty string
  let resetModal = () => {
    setState({
      email: "",
      password: "",
    });
    // setValidation({
    //   emailError: "",
    //   passwordError: "",
    // });
  };

  //Changing the value in the input box
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //Submit button function
  const submitHandler = (e) => {
    e.preventDefault();
    // if validate() return true, runs the axios call
    const valid = validate();
    if (valid) {
      axios
        .post("http://localhost:5000/api/users/login", {
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          console.log(res);
          resetModal();
          hideModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!visibility) {
    return null;
  } else if (visibility) {
    return (
      <div className="modal">
        <form onSubmit={submitHandler} ref={domNode}>
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
              <div>{validation.emailError}</div>
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
              <div>{validation.passwordError}</div>
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
