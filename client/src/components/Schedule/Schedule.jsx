import React, { useState, useEffect } from "react";
import "./Schedule.scss";
import Modal from "../../components/Modal/Modal";
import Slot from "../Slot/Slot";
import axios from "axios";

export default function Schedule({
  planes,
  date,
  showBookingModal,
  visibility,
  hideModal,
  filterValue,
}) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const slotsURL = `http://localhost:5000/api/slots/${date}`;

  const axiosSlotsCall = async () => {
    try {
      const res = await axios.get(slotsURL);
      let slotsData = res.data;
      if (!filterValue || filterValue.instructor === "allInstructor") {
        setSlots(res.data);
      } else if (filterValue && filterValue.instructor) {
        setSlots(
          slotsData.filter((data) => data.instructor === filterValue.instructor)
        );
      } else if (filterValue && filterValue.aircraft) {
        setSlots(
          slotsData.filter((data) => data.aircraft === filterValue.aircraft)
        );
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axiosSlotsCall();
    setLoading(true);
  }, [slotsURL, filterValue]);

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
    return (
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
        slotCall={axiosSlotsCall}
      />
    );
  };

  // const test = () => {
  //   if (filterValue && filterValue.instructor === "Josh") {
  //     return (
  //       <>
  //         <h2>Josh</h2>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <h2>Jensen</h2>
  //       </>
  //     );
  //   }
  // };
  const planesBlock = () => {
    if (
      !filterValue ||
      (filterValue && filterValue.aircraft === "allAircraft") ||
      !filterValue.aircraft
    ) {
      return (
        <>
          {planes.map((info) => {
            return (
              <tr className="schedule__row">
                <th
                  key={info._id}
                  className={`schedule__placeholder ${info.reg}`}
                >
                  {`${info.reg} ${info.type}`}
                  {slots
                    .filter((slot) => slot.aircraft === info.reg)
                    .map(timeBlock)}
                </th>
                {planeSlot}
              </tr>
            );
          })}
        </>
      );
    }
    if (filterValue && filterValue !== "allAircraft") {
      let plane = slots.filter(
        (slot) => slot.aircraft === filterValue.aircraft
      );
      return (
        <tr className="schedule__row">
          <th
            key={plane && plane[0]._id}
            className={`schedule__placeholder ${plane && plane[0].aircraft}`}
          >
            {`${plane && plane[0].aircraft} ${plane && plane[0].type}`}
            {slots
              .filter((slot) => slot.aircraft === plane && plane[0].aircraft)
              .map(timeBlock)}
          </th>
          {planeSlot}
        </tr>
      );
    }
  };

  return (
    <>
      <Modal
        visibility={visibility}
        hideModal={hideModal}
        planes={planes}
        date={date}
        slotCall={axiosSlotsCall}
      />
      <table className="schedule">
        <thead>
          <tr className="schedule__row">
            <th className="schedule__placeholder schedule__time-heading"></th>
            {timeHead}
          </tr>
        </thead>
        <tbody>
          {planes && planesBlock()}
          {/* {planes &&
            planes.map((info) => {
              // const checkReg = (slot) => {
              //   if (
              //     !filterValue ||
              //     (filterValue && filterValue.aircraft === "allAircraft") ||
              //     !filterValue.aircraft
              //   ) {
              //     return slot.aircraft === info.reg;
              //   }
              // };
              if (
                !filterValue ||
                (filterValue && filterValue.aircraft === "allAircraft") ||
                !filterValue.aircraft
              ) {
                return (
                  <tr className="schedule__row">
                    <th
                      key={info._id}
                      className={`schedule__placeholder ${info.reg}`}
                    >
                      {`${info.reg} ${info.type}`}
                      {slots
                        .filter((slot) => slot.aircraft === info.reg)
                        .map(timeBlock)}
                    </th>
                    {planeSlot}
                  </tr>
                );
              }
              if (filterValue && filterValue.aircraft) {
                return (
                  <tr className="schedule__row">
                    <th
                      key={info._id}
                      className={`schedule__placeholder ${info.reg}`}
                    >
                      {`${info.reg} ${info.type}`}
                      {slots
                        .filter(
                          (slot) => slot.aircraft === filterValue.aircraft
                        )
                        .map(timeBlock)}
                    </th>
                    {planeSlot}
                  </tr>
                );
              }
            })} */}
          <tr className="schedule__row">
            <th className="schedule__placeholder">
              Jensen
              {slots
                .filter((slot) => slot.instructor === "Jensen")
                .map(timeBlock)}
            </th>
            {planeSlot}
          </tr>
          <tr className="schedule__row">
            <th className="schedule__placeholder">
              Josh
              {slots
                .filter((slot) => slot.instructor === "Josh")
                .map(timeBlock)}
            </th>
            {planeSlot}
          </tr>
        </tbody>
      </table>
    </>
  );
}
