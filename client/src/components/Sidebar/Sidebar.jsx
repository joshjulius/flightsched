import React from "react";
import "./Sidebar.scss";
import logoPlaceholder from "../../assets/logos/logo-placeholder.png";

export default function Sidebar({ toggle, handleToggle }) {
  return (
    <div className="sidebar">
      <img src={logoPlaceholder} alt="Logo" className="sidebar__logo" />
      <ul className="sidebar__list">
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Home
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Students
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Schedule
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Reservations
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Billing
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Instructions
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Aircraft
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          People
        </li>
        <li className="sidebar__item" onClick={() => handleToggle(toggle)}>
          Reports
        </li>
      </ul>
    </div>
  );
}
