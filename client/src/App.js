import React, { useState } from "react";
import "./App.scss";
import "./normalize.css";
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
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
      <div class="app__content ">
        <Navbar handleToggle={handleToggle} toggle={toggle} />
        <button onClick={showModal} className="main">
          Create a Reservation
        </button>
        <Modal visibility={visibility} hideModal={hideModal} />
        {/* <Schedule /> */}
      </div>
    </div>
  );
}

export default App;
