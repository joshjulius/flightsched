import React from "react";
import "./Sidebar.scss";
import logoPlaceholder from "../../assets/logos/logo-placeholder.png";

export default function Sidebar({ toggle, handleToggle }) {
  return (
    <div className="sidebar">
      <img src={logoPlaceholder} alt="Logo" className="sidebar__logo" />
      <ul className="sidebar__list">
        <li className="sidebar__item">Home</li>
        <li className="sidebar__item">Students</li>
        <li className="sidebar__item">Schedule</li>
        <li className="sidebar__item">Reservations</li>
        <li className="sidebar__item">Billing</li>
        <li className="sidebar__item">Instructions</li>
        <li className="sidebar__item">Aircraft</li>
        <li className="sidebar__item">People</li>
        <li className="sidebar__item">Reports</li>
      </ul>
    </div>
  );
}
