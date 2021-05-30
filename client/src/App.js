import React, { useState } from "react";
import './App.scss';
import "./normalize.css";

import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
// import Schedule from "./components/Schedule/Schedule";

function App() {

  const [visibility, setVisibility] = useState(false);

  const showModal = () => {
    setVisibility(true);
  }

  const hideModal = () => {
    setVisibility(false);
  }

  return (
    <div className="App">
      <Navbar />
      <button onClick={showModal}>Create a Reservation</button>
      <Modal visibility={visibility} hideModal={hideModal} />
      {/* <Schedule /> */}
    </div>
  );

}

export default App;
