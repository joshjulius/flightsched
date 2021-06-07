import { React, useState } from "react";
import "./Optionbar.scss";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";
import Schedule from "../Schedule/Schedule";

export default function Optionbar({ planes }) {
  let dateOption = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date();
  const [dateDisplay, setDateDisplay] = useState(
    date.toLocaleString("en-US", dateOption)
  );

  const dateIncrement = () => {
    let dateConvert = new Date(dateDisplay);
    dateConvert.setDate(dateConvert.getDate() + 1);
    setDateDisplay(dateConvert.toLocaleString("en-US", dateOption));
  };

  const dateDecrement = () => {
    let dateConvert = new Date(dateDisplay);
    dateConvert.setDate(dateConvert.getDate() - 1);
    setDateDisplay(dateConvert.toLocaleString("en-US", dateOption));
  };

  return (
    <div className="optionbar">
      <div className="optionbar__top">
        <div className="optionbar__content-container">
          <button className="optionbar__btn">
            <img
              src={arrowLeft}
              alt="arrow pointing left"
              className="optionbar__arrow"
              onClick={dateDecrement}
            />
          </button>
          <div className="optionbar__date">{dateDisplay}</div>
          <button className="optionbar__btn">
            <img
              src={arrowRight}
              alt="arrow pointing right"
              className="optionbar__arrow"
              onClick={dateIncrement}
            />
          </button>
          <div className="optionbar__top-date optionbar__top-option">Today</div>
          <select className="optionbar__direction-option optionbar__top-option">
            <option value="horizontal">Day Horizontal</option>
            <option value="vertical">Day Vertical</option>
          </select>
        </div>
        <div className="optionbar__extra-info">
          <div>Key</div>
          <div>Paint</div>
        </div>
      </div>
      <div className="optionbar__bottom">
        <div className="optionbar__content-container">
          <select className="optionbar__bottom-option">
            <option value="Harv's Air">Harv's Air</option>
            <option value="Wwfc">Wwfc</option>
          </select>
          <select className="optionbar__bottom-option">
            <option value="allAircraft">{`Aircraft(${
              planes && planes.length
            })`}</option>
            {planes &&
              planes.map((info) => {
                return (
                  <option key={info._id} value={info.reg}>
                    {info.reg}
                  </option>
                );
              })}
          </select>
          <select className="optionbar__bottom-option">
            <option value="allInstructor">All instructors</option>
            <option value="josh">Josh</option>
            <option value="Jensen">Jensen</option>
          </select>
          <select className="optionbar__bottom-option">
            <option value="noEquip">No Equipment</option>
            <option value="placeholder">Placeholder</option>
          </select>
          <select className="optionbar__bottom-option">
            <option value="allActivities">All Activity Types</option>
            <option value="placeholder">Placeholder</option>
          </select>
          <select className="optionbar__bottom-option">
            <option value="allReservations">All Reservations</option>
            <option value="placeholder">Placeholder</option>
          </select>
          <div className="optionbar__clear-all">Clear All</div>
        </div>
        <div className="optionbar__extra-info">
          <div className="optionbar__save-filter">+ save filter</div>
          <select>
            <option value="" disabled selected>
              - saved filters -
            </option>
            <option value="placeholder">Placeholder</option>
          </select>
        </div>
      </div>
      <Schedule planes={planes} date={dateDisplay}/>
    </div>
  );
}
