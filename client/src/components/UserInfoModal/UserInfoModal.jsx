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

const UserInfoModal = ({ visibility, hideModal, user }) => {
  let domNode = useClickOutside(() => {
    hideModal();
  });

  let [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  let [editToggle, setEditToggle] = useState(false);

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
    axios
      .put(`http://localhost:5000/api/users/${user._id}`, {
        name: state.name,
        email: state.email,
        phone: state.phone,
        dateOfBirth: state.dateOfBirth,
      })
      .then((res) => {
        console.log(res);
        hideModal();
        setEditToggle(!editToggle);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(editToggle);

  if (!visibility) {
    return null;
  } else if (visibility && !editToggle) {
    return (
      <div className="modal">
        <form ref={domNode}>
          <div className="form-container">
            <div className="form-header">
              <h2>{user.name ? user.name : "User"}</h2>
              <button onClick={hideModal} className="close">
                Close
              </button>
              <button onClick={() => setEditToggle(!editToggle)}>Edit</button>
            </div>
            <div className="userInfoForm__container">
              <div className="item">
                <h4>Name</h4>
                <h4>{user && user.name}</h4>
              </div>
              <div className="item">
                <h4>Email</h4>
                <h4>{user && user.email}</h4>
              </div>
              <div className="item">
                <h4>Phone Number</h4>
                <h4>{user && user.phone}</h4>
              </div>
              <div className="item">
                <h4>Date of Birth</h4>
                <h4>{user.dateOfBirth ? user.dateOfBirth : "Not Available"}</h4>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (visibility && editToggle) {
    return (
      <div className="modal">
        <form onSubmit={submitHandler} ref={domNode}>
          <div className="form-container">
            <div className="form-header">
              <h2>{user && user.name}</h2>
              <button onClick={hideModal} className="close">
                Close
              </button>
            </div>
            <div className="item">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                name="name"
                value={user && state.name}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user && state.email}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={user && state.phone}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="dateOfBirth"
                id="dateOfBirth"
                name="dateOfBirth"
                value={user && state.dateOfBirth}
                onChange={changeHandler}
              />
            </div>
            <button type="submit" className="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default UserInfoModal;
