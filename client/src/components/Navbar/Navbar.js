import React, { useState, useEffect } from "react";
import axios from "axios";
import Hamburger from "hamburger-react";
import "./Navbar.scss";

const Navbar = ({
  toggle,
  handleToggle,
  showLoginModal,
  showCreateAccModal,
  props,
}) => {
  //   const [toggle, setToggle] = useState(true);

  //   const handleToggle = () => {
  //     setToggle(!toggle);
  //     // console.log(toggle);
  //   };

  const userInfo__URL = "http://localhost:5000/api/users";
  const userId = props[0].match.params.id;

  const handleUserMenu = () => {
    document.querySelector(".secondary-ul").classList.toggle("hide");
  };

  const [user, setUser] = useState();

  const axiosCall = () => {
    axios
      .get(`${userInfo__URL}/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Fetch User ID info error");
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    axiosCall();
  }, [`${userInfo__URL}/${userId}`]);

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
          <li>
            <button className="user" onClick={handleUserMenu}>
              {user && user.name}
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
                <a href="#" onClick={logoutHandler}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
