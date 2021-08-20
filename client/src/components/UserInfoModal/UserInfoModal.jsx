import React, { useState, useRef, useEffect } from "react";
import "../Modal/Modal.scss";
import "./UserInfoModal.scss";
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

const UserInfoModal = ({
  visibility,
  user,
  submitHandler,
  hideModal,
  axiosUserIdCall,
  editToggle,
  setEditToggle,
}) => {
  let domNode = useClickOutside(() => {
    hideModal();
  });

  //state for the input values
  let [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    role: "",
  });

  //Edit value for switching from User info to Edit User Form
  // let [editToggle, setEditToggle] = useState(false);
  let [validation, setValidation] = useState(true);

  //Changing the value in the input box
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //Reset the State value after submitting the Edit Form
  const resetInputValues = () => {
    setState({
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      role: "",
    });
  };

  //function to check validation
  const formValidation = (name, phone, dateOfBirth, role) => {
    console.log(!name, !phone, !dateOfBirth, !role);
    if (!name || !phone || !dateOfBirth || !role) {
      // setValidation(false);
      // console.log("not valid");
      // console.log(validation);
      return false;
    } else {
      // setValidation(true);
      return true;
    }
  };

  useEffect(() => {
    setState({
      name: user && user.name,
      email: user && user.email,
      phone: user && user.phone,
      dateOfBirth: user && user.dateOfBirth,
      role: user && user.role,
    });
    console.log("use Effect in the user info");
  }, [editToggle]);

  if (!visibility) {
    return null;
    //If editToggle is false, displace the User Information
  } else if (visibility && !editToggle) {
    return (
      <div className="modal">
        <form ref={domNode}>
          <div className="form-container">
            <div className="userInfoModal">
              <button
                type="button"
                onClick={() => {
                  setEditToggle(!editToggle);
                  return false;
                }}
              >
                Edit
              </button>
              <h2>{user.name ? user.name : "User"}</h2>
              <button
                onClick={() => {
                  hideModal();
                  setEditToggle(false);
                }}
                className="close"
              >
                Close
              </button>
            </div>
            <div className="userInfoForm__container">
              <div className="item">
                <h4>Name:</h4>
                <h4>{user && user.name}</h4>
              </div>
              <div className="item">
                <h4>Email:</h4>
                <h4>{user && user.email}</h4>
              </div>
              <div className="item">
                <h4>Phone Number:</h4>
                <h4>{user && user.phone}</h4>
              </div>
              <div className="item">
                <h4>Date of Birth:</h4>
                <h4>{user.dateOfBirth ? user.dateOfBirth : "Not Available"}</h4>
              </div>
              <div className="item">
                <h4>Role:</h4>
                <h4>{user.role ? user.role : "Not Available"}</h4>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
    //If editToggle is true, display the User Edit Form
  } else if (visibility && editToggle) {
    return (
      <div className="modal">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let valid = formValidation(
              state.name,
              state.phone,
              state.dateOfBirth,
              state.role
            );
            console.log(valid);
            if (valid) {
              submitHandler(
                state,
                state.name,
                state.phone,
                state.dateOfBirth,
                state.role
              );
              setValidation(true);
              setEditToggle((editToggle) => false);
              resetInputValues();
            } else {
              setValidation(false);
            }
          }}
          ref={domNode}
        >
          <div className="form-container">
            <div className="userInfoModal">
              <button type="button" onClick={() => setEditToggle(!editToggle)}>
                Detail
              </button>
              <h2 className="userInfoModal__name">{user && user.name}</h2>
              <button onClick={hideModal} className="close" type="button">
                Close
              </button>
              {validation ? (
                ""
              ) : (
                <div className="userInfoModal__error">
                  <ErrorBooking
                    errorBooking={true}
                    message={"Please Fill in all the boxes"}
                  />
                </div>
              )}
            </div>
            <div className="item">
              <label htmlFor="name">Name:</label>
              <input
                type="name"
                id="name"
                name="name"
                value={user && state.name}
                placeholder={user && user.name}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user && state.email}
                placeholder={user && user.email}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={user && state.phone}
                placeholder={user && user.phone}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="dateOfBirth"
                id="dateOfBirth"
                name="dateOfBirth"
                value={user && state.dateOfBirth}
                placeholder={user && user.dateOfBirth}
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label htmlFor="role">Role:</label>
              <input
                type="role"
                id="role"
                name="role"
                value={user && state.role}
                placeholder={user && user.role}
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
