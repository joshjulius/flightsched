import React, { useState } from "react";
import Hamburger from "hamburger-react";
import "./Navbar.scss";

const Navbar = ({
  toggle,
  handleToggle,
  showLoginModal,
  showCreateAccModal,
}) => {
  //   const [toggle, setToggle] = useState(true);

  //   const handleToggle = () => {
  //     setToggle(!toggle);
  //     // console.log(toggle);
  //   };

  const [login, setLogin] = useState(false);

  const handleUserMenu = () => {
    document.querySelector(".secondary-ul").classList.toggle("hide");
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
            <a href="#" target="_blank">
              Help
            </a>
          </li>
          {login ? (
            <li>
              <button className="user" onClick={handleUserMenu}>
                Bob
              </button>
              <ul className="secondary-ul hide">
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">My Companies</a>
                </li>
                <li>
                  <a href="#">My Apps</a>
                </li>
                <li>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="login-btn" onClick={showLoginModal}>
                Login
              </li>
              <li className="login-btn" onClick={showCreateAccModal}>
                Create Account
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
