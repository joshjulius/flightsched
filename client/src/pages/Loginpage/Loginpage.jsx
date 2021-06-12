import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Loginpage.scss";

export default function Loginpage() {
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

  let [userId, setUserId] = useState();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [createToggle, setCreateToggle] = useState(false);

  //Check if the input value is correct or not, if it is, return true, return false when it is not
  let loginValidate = () => {
    let emailError = "";
    let passwordError = "";

    if (!state.password) {
      passwordError = "Password cannot be blank";
    }

    if (!state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (emailError || passwordError) {
      setValidation({ emailError, passwordError });
      return false;
    }

    return true;
  };

  let createAccValidation = () => {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let passwordError = "";

    if (!state.name) {
      nameError = "Name cannot be blank";
    }

    if (Number.isNaN(parseInt(state.phone))) {
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
  const loginHandler = (e) => {
    e.preventDefault();
    console.log("Login handler");
    // if loginValidate() return true, runs the axios call
    const valid = loginValidate();
    if (valid) {
      axios
        .post("http://localhost:5000/api/users/login", {
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          console.log(res.data);
          setUserId(res.data.id);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          alert("Invalid Email or Password ");
          console.log(err);
        });
    }
  };

  let createAccHandler = (e) => {
    e.preventDefault();
    const valid = createAccValidation();
    if (valid) {
      axios
        .post("http://localhost:5000/api/users/register", {
          name: state.name,
          phone: state.phone,
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          console.log(res);
          resetModal();
          setCreateToggle(false);
          alert("Account Created");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Create Account button
  if (isLoggedIn) {
    return <Redirect to={`/user/${userId}`} />;
  }
  return (
    <div className="modal">
      {createToggle ? (
        <form onSubmit={createAccHandler}>
          <div className="form-container">
            <div className="form-header">
              <h2>Create Account</h2>
              <button
                className="form-login"
                onClick={() => setCreateToggle(false)}
              >
                Login
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
      ) : (
        <form onSubmit={loginHandler}>
          <div className="form-container">
            <div className="form-header">
              <h2>Login</h2>
              <button
                className="form-create-btn"
                onClick={() => setCreateToggle(true)}
              >
                Create Account
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
      )}
    </div>
  );
}
