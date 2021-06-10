import React, { useState, useEffect } from "react";
import "./Schedule.scss";
import Slot from "../Slot/Slot";
import axios from "axios";

export default function Schedule({ planes, date }) {
  const timeHead = [];
  const planeSlot = [];

  const timeSlot = (totalTime) => {
    for (let i = totalTime; i < totalTime + 15; i++) {
      timeHead.push(
        <th key={i} className="schedule__time-slot">{`${i}:00`}</th>
      );
    }
  };
  timeSlot(8);

  const planeTimeSlot = (totalTime, content) => {
    for (let i = totalTime; i < totalTime + 15; i++) {
      planeSlot.push(
        <th key={i} className="schedule__plane-slot">
          {content}
        </th>
      );
    }
  };
  planeTimeSlot(8, "");
  
 
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
  const slotsURL = `http://localhost:5000/api/slots/${currentDate}`;

  const axiosSlotsCall = () => {
    axios
      .get(slotsURL)
      .then((res) => {
        setSlots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosSlotsCall();
  }, [slotsURL]);

  return (
    <>
    <table className="schedule">
      <thead className="schedule__time-heading">
        <th className="schedule__placeholder"></th>
        {timeHead}
      </thead>
      <tbody className="schedule__plane-time-slot">
        
        {
          planes && planes.map((info) => {

            const checkReg = (slot) => {
              return slot.aircraft === info.reg;
            }

            const timeBlock = (slot) => {
              return(<Slot id={slot._id} startTime={slot.startTime} endTime={slot.endTime} />);
            }

            return (
              <>
                <td
                  key={info._id}
                  className={`schedule__plane-name schedule__placeholder ${info.reg}`}
                >
                  {`${info.reg} ${info.type}`}
                  {slots.filter(checkReg).map(timeBlock)}
                </td>
                {planeSlot}
              </>
            );
          })

        }

      </tbody>
    </table>
    </>
  );
}