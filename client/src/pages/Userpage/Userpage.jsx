import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Userpage.scss";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Optionbar from "../../components/Optionbar/Optionbar";
import UserInfoModal from "../../components/UserInfoModal/UserInfoModal";
// import LoginModal from "../../components/LoginModal/LoginModal";
// import CreateAccModal from "../../components/CreateAccModal/CreateAccModal";

export default function Userpage(props) {
  const [visibility, setVisibility] = useState(false);
  const [userInfoModalVisibility, setUserInfoModalVisibility] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [planes, setPlanes] = useState();
  const [user, setUser] = useState();

  const planeURL = "http://localhost:5000/api/planes";
  const userInfo__URL = "http://localhost:5000/api/users";
  const userId = props[0].match.params.id;

  const handleToggle = (toggleValue) => {
    setToggle(!toggleValue);
    console.log(toggle);
  };

  const showModal = () => {
    setVisibility(true);
  };

  const hideModal = () => {
    setVisibility(false);
  };

  const showUserInfoModal = () => {
    setUserInfoModalVisibility(true);
  };

  const hideUserInfoModal = () => {
    setUserInfoModalVisibility(false);
  };

  const axiosPlaneCall = () => {
    axios
      .get(planeURL)
      .then((res) => {
        setPlanes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const axiosUserCall = () => {
    axios
      .get(`${userInfo__URL}/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Fetch User ID info error");
      });
  };

  useEffect(() => {
    axiosPlaneCall();
    axiosUserCall();
  }, [`${userInfo__URL}/${userId}`]);

  if (!localStorage.getItem("token")) {
    alert("Your token has expired");
    return <Redirect to={`/`} />;
  }
  return (
    <div className="userpage">
      <div class={toggle ? "app__sidebar--open" : "app__sidebar--close"}>
        <Sidebar handleToggle={handleToggle} toggle={toggle} />
      </div>
      <div
        class={
          toggle
            ? "app__content app__content--open "
            : "app__content app__content--close"
        }
      >
        <Navbar
          handleToggle={handleToggle}
          toggle={toggle}
          props={props}
          // showLoginModal={showLoginModal}
          showUserInfoModal={showUserInfoModal}
        />
        <button onClick={showModal} className="main">
          Create a Reservation
        </button>
        <Optionbar planes={planes} />
        <Modal visibility={visibility} hideModal={hideModal} />
        <UserInfoModal
          visibility={userInfoModalVisibility}
          hideModal={hideUserInfoModal}
          user={user}
        />
      </div>
    </div>
  );
}
