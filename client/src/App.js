import React, { useState } from "react";
import "./App.scss";
import "./normalize.css";
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Optionbar from "./components/Optionbar/Optionbar";
import Schedule2 from "./components/Schedule2/Schedule2";
// import Schedule from "./components/Schedule/Schedule";

function App() {
  const [visibility, setVisibility] = useState(false);
  const [toggle, setToggle] = useState(false);

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
        <Optionbar />
        <Modal visibility={visibility} hideModal={hideModal} />
        {/* <Schedule /> */}
        <Schedule2 />
      </div>
    </div>
  );
}

export default App;
