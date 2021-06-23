import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import "./Navbar.scss";

const Navbar = ({ toggle, handleToggle, showUserInfoModal, name, props }) => {
  //   const [toggle, setToggle] = useState(true);

  //   const handleToggle = () => {
  //     setToggle(!toggle);
  //     // console.log(toggle);
  //   };

  const handleUserMenu = () => {
    document.querySelector(".secondary-ul").classList.toggle("hide");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    alert("You have logged out");
    props.history.push("/");
  };

  return (
    <div className="navbar">
      <nav>
        <ul className="main-ul">
          <li>
            <Hamburger
              rounded
              size={24}
              onToggle={() => handleToggle(toggle)}
            />
          </li>
          <li>
            <p>Waterloo Flight School</p>
          </li>
          <li>
            <a href="/" target="_blank">
              Help
            </a>
          </li>
          <li>
            <button className="user" onClick={handleUserMenu}>
              {name && name}
            </button>
            <ul className="secondary-ul hide">
              <li>
                <h5
                  onClick={() => {
                    showUserInfoModal();
                    handleUserMenu();
                  }}
                >
                  My Account
                </h5>
              </li>
              <li>
                <h5 onClick={handleUserMenu}>My Companies</h5>
              </li>
              <li>
                <h5 onClick={handleUserMenu}>My Apps</h5>
              </li>
              <li>
                <h5 onClick={logoutHandler}>Logout</h5>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
