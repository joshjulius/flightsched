import React, { useState, useEffect } from "react";
import "./Schedule.scss";
import Slot from "../Slot/Slot";
import axios from "axios";

export default function Schedule({ planes, date, showBookingModal }) {
  
  // check if displayDate date is less than 10, if true, add 0
  let dateDigit = date.slice(5,date.length).split(" ")[1].replace(',','');
  if (dateDigit.length === 1) {
    dateDigit = `0${dateDigit}`;
  }

  //Replace with refactored date digit
  let dateArray = date.slice(5,date.length).split(" ");
  dateArray[1] = dateDigit;

  //Shorten month to 3 letters
  dateArray[0] = dateArray[0].slice(0,3);

  //Convert to string
  const currentDate = dateArray.join('_');

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const slotsURL = `http://localhost:5000/api/slots/${currentDate}`;

  const axiosSlotsCall = () => {
    axios
      .get(slotsURL)
      .then((res) => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosSlotsCall();
    setLoading(true);
  }, [slotsURL]);
  
  const timeHead = [];
  const planeSlot = [];

  const timeSlot = (totalTime) => {
    for (let i = totalTime; i < totalTime + 15; i++) {
      timeHead.push(
        <th key={i} className="schedule__time-heading">{`${i}:00`}</th>
      );
    }
  };
  timeSlot(8);

  const planeTimeSlot = (totalTime, content) => {
    for (let i = totalTime; i < totalTime + 15; i++) {
      planeSlot.push(
        <td key={i} className="schedule__plane-slot" onClick={showBookingModal}>
          {content}
        </td>
      );
    }
  };
  planeTimeSlot(8, "");

  const timeBlock = (slot) => {
    return(
      <Slot
        id={slot._id}
        startTime={slot.startTime}
        endTime={slot.endTime}
        activityType={slot.activityType}
        aircraft={slot.aircraft}
        instructor={slot.instructor} 
        customer={slot.customer}
        type={slot.type}
        loading={loading}
      />
    );
  }

  return (
    <table className="schedule">
      <thead>
        <tr className="schedule__row">
          <th className="schedule__placeholder schedule__time-heading"></th>
          {timeHead}
        </tr>
      </thead>
      <tbody>
        {
          planes && planes.map((info) => {
            const checkReg = (slot) => {
              return slot.aircraft === info.reg;
            }
            return (
              <tr className="schedule__row">
                <th
                  key={info._id}
                  className={`schedule__placeholder ${info.reg}`}
                >
                  {`${info.reg} ${info.type}`}
                  {slots.filter(checkReg).map(timeBlock)}
                </th>
                {planeSlot}
              </tr>
            );
          })
        }
        <tr className="schedule__row">
          <th className="schedule__placeholder">
            Jensen
            {slots.filter(slot => slot.instructor === "Jensen").map(timeBlock)}
          </th>
          {planeSlot}
        </tr>
        <tr className="schedule__row">
          <th className="schedule__placeholder">
            Josh
            {slots.filter(slot => slot.instructor === "Josh").map(timeBlock)}
          </th>
          {planeSlot}
        </tr>
      </tbody>
    </table>
  );
}