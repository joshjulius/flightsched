import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import "./normalize.css";
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Optionbar from "./components/Optionbar/Optionbar";
import Schedule from "./components/Schedule/Schedule";
// import Schedule from "./components/Schedule/Schedule";

function App() {
  const [visibility, setVisibility] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [planes, setPlanes] = useState();

  const planeURL = "http://localhost:5000/api/planes";

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

  useEffect(() => {
    axiosPlaneCall();
  }, [planeURL]);

  return (
    <div className="app">
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
        <Navbar handleToggle={handleToggle} toggle={toggle} />
        <button onClick={showModal} className="main">
          Create a Reservation
        </button>
        <Optionbar planes={planes} />
        <Modal visibility={visibility} hideModal={hideModal} planes={planes} />
        {/* <Schedule planes={planes} /> */}
      </div>
    </div>
  );
}

export default App;
