// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Route } from "react-router-dom";
import "./App.scss";
import "./normalize.css";
// import Modal from "./components/Modal/Modal";
// import Navbar from "./components/Navbar/Navbar";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Optionbar from "./components/Optionbar/Optionbar";
// import Schedule from "./components/Schedule/Schedule";
// import LoginModal from "./components/LoginModal/LoginModal";
// import CreateAccModal from "./components/CreateAccModal/CreateAccModal";
import Userpage from "./pages/Userpage/Userpage";
import Loginpage from "./pages/Loginpage/Loginpage";
// import Schedule from "./components/Schedule/Schedule";

function App() {
  // const [visibility, setVisibility] = useState(false);
  // const [loginVisibility, setLoginVisibility] = useState(false);
  // const [createAccVisibility, setCreateAccVisibility] = useState(false);
  // const [toggle, setToggle] = useState(false);
  // const [planes, setPlanes] = useState();

  // const planeURL = "http://localhost:5000/api/planes";

  // const handleToggle = (toggleValue) => {
  //   setToggle(!toggleValue);
  //   console.log(toggle);
  // };

  // const showModal = () => {
  //   setVisibility(true);
  // };

  // const hideModal = () => {
  //   setVisibility(false);
  // };

  // const showLoginModal = () => {
  //   setLoginVisibility(true);
  // };

  // const hideLoginModal = () => {
  //   setLoginVisibility(false);
  // };

  // const showCreateAccModal = () => {
  //   setCreateAccVisibility(true);
  // };

  // const hideCreateAccModal = () => {
  //   setCreateAccVisibility(false);
  // };

  // const axiosPlaneCall = () => {
  //   axios
  //     .get(planeURL)
  //     .then((res) => {
  //       setPlanes(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   axiosPlaneCall();
  // }, [planeURL]);

  return (
    <div className="app">
      <Route path="/" render={(...props) => <Loginpage {...props} />} />
      <Route path="/user/:id" render={(...props) => <Userpage {...props} />} />
      {/* <div class={toggle ? "app__sidebar--open" : "app__sidebar--close"}>
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
          showLoginModal={showLoginModal}
          showCreateAccModal={showCreateAccModal}
        />
        <button onClick={showModal} className="main">
          Create a Reservation
        </button>
        <Optionbar planes={planes} showBookingModal={showModal}/>
        <Modal visibility={visibility} hideModal={hideModal} planes={planes}/>
        <LoginModal visibility={loginVisibility} hideModal={hideLoginModal} />
        <CreateAccModal
          visibility={createAccVisibility}
          hideModal={hideCreateAccModal}
        />
      </div> */}
    </div>
  );
}

export default App;
