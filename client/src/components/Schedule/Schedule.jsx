import React from "react";
import "./Schedule.scss";
import Slot from "../Slot/Slot";

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
                  {(info.reg === "C-GUBI") ? <Slot date={date} /> : null}
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
