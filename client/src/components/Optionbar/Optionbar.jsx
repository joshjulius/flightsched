import React, { useState } from "react";
import "./Optionbar.scss";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";
import Schedule from "../Schedule/Schedule";

export default function Optionbar({
  planes,
  user,
  showBookingModal,
  axiosSaveFilterCall,
  visibility,
  userInfo,
  hideModal,
}) {
  let dateOption = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [filterValue, setFilterValue] = useState({
    aircraft: "allAircraft",
    instructor: "allInstructor",
  });

  const dateToday = new Date();
  const [chosenDate, setChosenDate] = useState(
    window.localStorage.getItem("currentDateShown")
      ? window.localStorage.getItem("currentDateShown")
      : dateToday.toLocaleString("en-US", dateOption)
  );

  const dateIncrement = () => {
    let dateConvert = new Date(chosenDate);
    dateConvert.setDate(dateConvert.getDate() + 1);
    setChosenDate(dateConvert.toLocaleString("en-US", dateOption));
  };

  const dateDecrement = () => {
    let dateConvert = new Date(chosenDate);
    dateConvert.setDate(dateConvert.getDate() - 1);
    setChosenDate(dateConvert.toLocaleString("en-US", dateOption));
  };

  window.localStorage.setItem("currentDateShown", chosenDate);

  const jumpToToday = () => {
    setChosenDate(dateToday.toLocaleString("en-US", dateOption));
  };

  const optionBoxvalue = (e) => {
    setFilterValue({
      ...filterValue,
      [e.target.name]: e.target.value,
    });
    console.log(filterValue);
  };

  //Mapping Instructor Names into the Optionbox
  const optionBoxInstructorName = () => {
    user.map((user) => {
      return (
        <option key={user._id} value={user.name}>
          {user.name}
        </option>
      );
    });
  };

  //Clear All button Handler
  const clearAllClickHandler = () => {
    alert("Filter Has Been Successfully Reset");
    setFilterValue({
      aircraft: "allAircraft",
      instructor: "allInstructor",
    });
  };
  // check if displayDate date is less than 10, if true, add 0
  let dateDigit = chosenDate
    .slice(5, chosenDate.length)
    .split(" ")[1]
    .replace(",", "");
  if (dateDigit.length === 1) {
    dateDigit = `0${dateDigit}`;
  }

  //Replace with refactored date digit
  let dateArray = chosenDate.slice(5, chosenDate.length).split(" ");
  dateArray[1] = dateDigit;

  //Shorten month to 3 letters
  dateArray[0] = dateArray[0].slice(0, 3);

  //Convert to string
  const currentDate = dateArray.join("_");

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
          <div className="optionbar__date">{chosenDate}</div>
          <button className="optionbar__btn">
            <img
              src={arrowRight}
              alt="arrow pointing right"
              className="optionbar__arrow"
              onClick={dateIncrement}
            />
          </button>
          <button
            className="optionbar__top-date optionbar__top-option"
            onClick={jumpToToday}
          >
            Today
          </button>
          <select className="optionbar__direction-option optionbar__top-option">
            <option value="horizontal">Day Horizontal</option>
            <option value="vertical">Day Vertical</option>
          </select>
        </div>
      </div>
      <div className="optionbar__bottom">
        <div className="optionbar__content-container">
          <select className="optionbar__bottom-option">
            <option value="Harv's Air">Harv's Air</option>
            <option value="Wwfc">Wwfc</option>
          </select>
          <select
            className="optionbar__bottom-option"
            name="aircraft"
            onChange={optionBoxvalue}
          >
            <option value="allAircraft">
              {`Aircraft (${planes && planes.length})`}
            </option>
            {planes &&
              planes.map((info) => {
                return (
                  <option key={info._id} value={info.reg}>
                    {info.reg}
                  </option>
                );
              })}
          </select>
          <select
            className="optionbar__bottom-option"
            name="instructor"
            onChange={optionBoxvalue}
          >
            <option value="allInstructor">All instructors</option>
            {user &&
              user.map((user) => {
                return (
                  <option key={user._id} value={user.name}>
                    {user.name}
                  </option>
                );
              })}
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
          <div onClick={clearAllClickHandler} className="optionbar__clear-all">
            Clear All
          </div>
        </div>
        <div className="optionbar__extra-info">
          <div
            className="optionbar__save-filter"
            onClick={() => axiosSaveFilterCall(filterValue)}
          >
            + save filter
          </div>
          <select>
            <option value="" disabled selected>
              - saved filters -
            </option>
            <option value="placeholder">Placeholder</option>
            {}
          </select>
        </div>
      </div>
      <Schedule
        planes={planes}
        user={user}
        date={currentDate}
        showBookingModal={showBookingModal}
        visibility={visibility}
        hideModal={hideModal}
        filterValue={filterValue}
      />
    </div>
  );
}
