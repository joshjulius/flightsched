import React, { useState } from "react";
import Hamburger from 'hamburger-react';
import "./Navbar.scss";

const Navbar = () => {

    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
        console.log(toggle);
    }

    const handleUserMenu = () => {
        document.querySelector('.secondary-ul').classList.toggle('hide');
    }

    return(
        <div className="navbar">
            <nav>
                <ul className="main-ul">
                    <li><Hamburger
                        rounded
                        size={24}
                        onToggle={handleToggle}
                    /></li>
                    <li><p>Waterloo Flight School</p></li>
                    <li><a href="#" target="_blank">Help</a></li>
                    <li>
                        <button className="user" onClick={handleUserMenu}>Bob</button>
                        <ul className="secondary-ul hide">
                            <li><a href="#">My Account</a></li>
                            <li><a href="#">My Companies</a></li>
                            <li><a href="#">My Apps</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );

}

export default Navbar;