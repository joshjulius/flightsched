import React, { useState } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import "./Loginpage.scss";
import ErrorBooking from "../../components/ErrorBooking/ErrorBooking";

function Loginpage() {
  const clearDateStorage = () => {
    let session = window.sessionStorage.getItem("ref");
    if (session === null) {
      window.localStorage.removeItem("currentDateShown");
    }
    window.sessionStorage.setItem("ref", 1);
  };
  window.addEventListener("load", () => {
    clearDateStorage();
  });

  let [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  let [loginValidation, setloginValidation] = useState(true);
  let [validation, setValidation] = useState(true);

  let [user, setUser] = useState();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [createToggle, setCreateToggle] = useState(false);

  //Check if the input value is correct or not, if it is, return true, return false when it is not
  let loginValidate = () => {
    if (!state.password) {
      setloginValidation(false);
      return false;
    }
    return true;
  };

  let createAccValidation = () => {
    if (!state.name) {
      setValidation(false);
      return false;
    }
    if (Number.isNaN(parseInt(state.phone))) {
      setValidation(false);
      return false;
    }
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

  //Function to check if the JWT is valid or not from the localStorage
  const checkAuthenticated = () => {
    axios
      .get("http://localhost:5000/api/jwtValid", {
        headers: { "auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("Ur JWT is valid");
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log("ur JWT is invalid");
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
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);
          if (res.data.auth) {
            checkAuthenticated();
          }
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

  // Navigate to Userpage when isLoggedIn is true
  if (isLoggedIn) {
    return <Redirect to={`/user/${user._id}`} />;
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
                onClick={() => {
                  setCreateToggle(false);
                  setValidation(true);
                }}
                type="button"
              >
                Login
              </button>
              {validation ? (
                ""
              ) : (
                <ErrorBooking
                  errorBooking={true}
                  message={"Please Fill in all the boxes"}
                />
              )}
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
                onClick={() => {
                  setCreateToggle(true);
                  setloginValidation(true);
                }}
                type="button"
              >
                Create Account
              </button>
              {loginValidation ? (
                ""
              ) : (
                <ErrorBooking
                  errorBooking={true}
                  message={"Please Fill in all the boxes"}
                />
              )}
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

export default withRouter(Loginpage);
