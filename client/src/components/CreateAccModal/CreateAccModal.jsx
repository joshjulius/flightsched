import React, { useState, useRef, useEffect } from "react";
import "../Modal/Modal.scss";
import axios from "axios";

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
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  let [validation, setValidation] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
  });

  let changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  let validate = () => {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let passwordError = "";

    if (!state.name) {
      nameError = "Name cannot be blank";
    }

    if (!Number.isInteger(state.phone)) {
      phoneError = "Phone Number cannot be blank and has to be numbers";
    }

    if (!state.password) {
      passwordError = "Password cannot be blank";
    }

    if (!state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (emailError || nameError || passwordError || phoneError) {
      setValidation({ emailError, nameError, phoneError, passwordError });
      return false;
    }

    return true;
  };

  let submitHandler = (e) => {
    e.preventDefault();
    const valid = validate();
    if (valid) {
      axios
        .post("http://localhost:5000/api/users", {
          name: state.name,
          phone: state.phone,
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          console.log(res);
          setState({
            name: "",
            email: "",
            phone: "",
            password: "",
          });
          setValidation({
            nameError: "",
            emailError: "",
            phoneError: "",
            passwordError: "",
          });
          hideModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let resetModal = () => {
    setState({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
    setValidation({
      nameError: "",
      emailError: "",
      phoneError: "",
      passwordError: "",
    });
  };

  if (!visibility) {
    return null;
  } else if (visibility) {
    return (
      <div className="modal">
        <form onSubmit={submitHandler} ref={domNode}>
          <div className="form-container">
            <div className="form-header">
              <h2>Create Account</h2>
              <button
                onClick={() => {
                  hideModal();
                  resetModal();
                }}
                className="close"
              >
                Close
              </button>
            </div>
            <div className="item">
              <label htmlFor="name">Name</label>
              <input
                onChange={changeHandler}
                type="text"
                id="name"
                name="name"
                value={state.name}
              />
              <div>{validation.nameError}</div>
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
              <div>{validation.emailError}</div>
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
              <div>{validation.phoneError}</div>
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
              <div>{validation.passwordError}</div>
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
