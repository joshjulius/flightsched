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
  
  const [slots, setSlots] = useState([]);
  const slotsURL = "http://localhost:5000/api/slots";

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

  const regs = [];
  for (let i = 0; i < slots.length; i++) {
    regs.push(slots[i].aircraft);
  }
  console.log(regs);

  return (
    <table className="schedule">
      <thead className="schedule__time-heading">
        <th className="schedule__placeholder"></th>
        {timeHead}
      </thead>
      <tbody className="schedule__plane-time-slot">
        {
          planes && planes.map((info) => {
            return (
              <>
                <td
                  key={info._id}
                  className={`schedule__plane-name schedule__placeholder ${info.reg}`}
                >
                  {`${info.reg} ${info.type}`}
                  {(info.reg === regs[0] || info.reg === regs[1]) ? <Slot date={date} /> : null}
                </td>
                {planeSlot}
              </>
            );
          })
        }
      </tbody>
    </table>
  );
}
