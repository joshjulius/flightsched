import React, { useState, useEffect } from "react";
import "./Schedule.scss";
import Modal from "../../components/Modal/Modal";
import Slot from "../Slot/Slot";
import axios from "axios";

export default function Schedule({
  planes,
  date,
  filterValue,
  user,
  showBookingModal,
  visibility,
  hideModal,
}) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const slotsURL = `http://localhost:5000/api/slots/${date}`;

  const axiosSlotsCall = async () => {
    try {
      const res = await axios.get(slotsURL);
      setSlots(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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
    return (
      <Slot
        location={slot.location}
        id={slot._id}
        startTime={slot.startTime}
        endTime={slot.endTime}
        activityType={slot.activityType}
        aircraft={slot.aircraft}
        instructor={slot.instructor}
        customer={slot.customer}
        loading={loading}
        slotCall={axiosSlotsCall}
        hideModal={hideModal}
        planes={planes}
        date={date}
        displayName={slot.displayName}
        flightRoute={slot.flightRoute}
        flightType={slot.flightType}
        comments={slot.comments}
      />
    );
  };

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
                    .filter(
                      (slot) => slot.aircraft === `${info.reg} ${info.type}`
                    )
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
        (slot) => slot.aircraft === `${filterValue.aircraft} C172S`
      );
      return (
        <tr className="schedule__row">
          <th
            key={plane && plane[0]._id}
            className={`schedule__placeholder ${plane && plane[0].aircraft}`}
          >
            {`${plane && plane[0].aircraft}`}
            {slots
              .filter((slot) => slot.aircraft === plane[0].aircraft)
              .map(timeBlock)}
          </th>
          {planeSlot}
        </tr>
      );
    }
  };

  const insturctorBlock = () => {
    if (
      !filterValue ||
      (filterValue && filterValue.instructor === "allInstructor") ||
      !filterValue.instructor
    ) {
      return (
        <>
          {user.map((info) => {
            return (
              <tr className="schedule__row">
                <th
                  key={info._id}
                  className={`schedule__placeholder ${info && info.name}`}
                >
                  {info && info.name}
                  {slots
                    .filter((slot) => slot.instructor === info.name)
                    .map(timeBlock)}
                </th>
                {planeSlot}
              </tr>
            );
          })}
        </>
      );
    }
    //Selecting the specific instructor
    if (
      filterValue &&
      filterValue !== "allInstructor" &&
      slots.filter((slot) => slot.instructor === filterValue.instructor)
        .length >= 1
    ) {
      let user = slots.filter(
        (slot) => slot.instructor === filterValue.instructor
      );
      return (
        <tr className="schedule__row">
          <th
            key={user && user[0]._id}
            className={`schedule__placeholder ${user && user[0].instructor}`}
          >
            {user && user[0].instructor}
            {user
              .filter((slot) => slot.instructor === user[0].instructor)
              .map(timeBlock)}
          </th>
          {planeSlot}
        </tr>
      );
    }
    //When an Instructor has no bookings
    if (
      filterValue &&
      slots.filter((slot) => slot.instructor === filterValue.instructor)
        .length === 0
    ) {
      <tr className="schedule__row">
        <th
          key={user && user[0]._id}
          className={`schedule__placeholder ${user && user[0].instructor}`}
        >
          {user && user[0].instructor}
        </th>
        {planeSlot}
      </tr>;
      console.log("No booking");
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
          {user && insturctorBlock()}
        </tbody>
      </table>
    </>
  );
}
