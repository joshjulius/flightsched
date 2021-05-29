import React from "react";
import './App.css';

import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import Schedule from "./components/Schedule/Schedule";

function App() {
  return (
    <div className="App">
      <Modal />
      <Navbar />
      <Schedule />
    </div>
  );
}

export default App;
