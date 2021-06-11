import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Loginpage.scss";

export default function Loginpage() {
  let [state, setState] = useState({
    email: "",
    password: "",
  });

  let [validation, setValidation] = useState({
    emailError: "",
    passwordError: "",
  });

  let [userId, setUserId] = useState();

  //Check if the input value is correct or not, if it is, return true, return false when it is not
  let validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!state.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (!state.password) {
      passwordError = "Password cannot be empty";
    }

    if (emailError || passwordError) {
      setValidation({ emailError, passwordError });
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
    setValidation({
      emailError: "",
      passwordError: "",
    });
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="modal">
      <form onSubmit={submitHandler}>
        <div className="form-container">
          <div className="form-header">
            <h2>Login</h2>
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
