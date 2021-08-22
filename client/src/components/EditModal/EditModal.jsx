import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import ErrorBooking from "../ErrorBooking/ErrorBooking";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "./EditModal.scss";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const EditModal = ({
  id,
  setSlotID,
  setIsEditing,
  slotCall,
  isEditing,
  planes,
  currentLocation,
  currentActivityType,
  currentStartTime,
  currentEndTime,
  currentCustomer,
  currentDisplayName,
  currentAircraft,
  currentInstructor,
  currentFlightRoute,
  currentFlightType,
  currentComments,
  instructorArr,
  startHour,
  startMinute,
  endHour,
  endMinute,
}) => {
  const [location, setLocation] = useState(currentLocation);
  const [activityType, setActivityType] = useState(currentActivityType);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(currentStartTime), startMinute), startHour)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(currentEndTime), endMinute), endHour)
  );
  const [customer, setCustomer] = useState(currentCustomer);
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [aircraft, setAircraft] = useState(currentAircraft);
  const [instructor, setInstructor] = useState(currentInstructor);
  const [flightType, setFlightType] = useState(currentFlightType);
  const [flightRoute, setFlightRoute] = useState(currentFlightRoute);
  const [comments, setComments] = useState(currentComments);

  const [errorBooking, setErrorBooking] = useState(false);

  const handleErrorBooking = (boolean) => {
    setErrorBooking(boolean);
    console.log(errorBooking);
  };

  const updateBooking = async (e) => {
    e.preventDefault();
    const postData = {
      location,
      activityType,
      startDate,
      endDate,
      customer,
      displayName,
      aircraft,
      instructor,
      flightType,
      flightRoute,
      comments,
    };

    if (customer === "" || flightRoute === "") {
      if (customer === "") {
        document.querySelector(".label-customer").classList.add("errortext");
        document.getElementById("customer").classList.add("errorbox");
      }
      if (flightRoute === "") {
        document
          .querySelector(".label-flight-route-legs")
          .classList.add("errortext");
        document.getElementById("flight-route-legs").classList.add("errorbox");
      }
    } else {
      try {
        await axios.put(`http://localhost:5000/api/slots/${id}`, postData);
        setIsEditing(false);
        slotCall();
      } catch {
        setErrorBooking(true);
      }
    }
  };

  const removeError = (e) => {
    e.currentTarget.previousSibling.classList.remove("errortext");
    e.currentTarget.classList.remove("errorbox");
  };

  const handleSelectLocation = (e) => setLocation(e.target.value);

  const handleSelectActivityType = (e) => {
    setActivityType(e.target.value);
    const activityType = document.getElementById("activity-type").value;
    if (activityType === "Solo") {
      setInstructor("None");
      document.getElementById("instructor").value = "None";
      document.getElementById("instructor").disabled = true;
    } else {
      document.getElementById("instructor").value = "DEFAULT";
      document.getElementById("instructor").disabled = false;
    }
  };

  const handleSelectAircraft = (e) => {
    setAircraft(e.target.value);
  };

  const handleSelectInstructor = (e) => {
    setInstructor(e.target.value);
  };

  const currentDate = new Date();

  const reset = () => {
    setIsEditing(false);
    setErrorBooking(false);
    setLocation(currentLocation);
    setActivityType(currentActivityType);
    setStartDate(new Date(currentStartTime));
    setEndDate(new Date(currentEndTime));
    setCustomer(currentCustomer);
    setDisplayName(currentDisplayName);
    setAircraft(currentAircraft);
    setInstructor(currentInstructor);
    setFlightType(currentFlightType);
    setFlightRoute(currentFlightRoute);
    setComments(currentComments);
  };

  let domNode = useClickOutside(() => {
    reset();
  });

  if (!isEditing) {
    return null;
  } else if (isEditing) {
    return (
      <div className="modal">
        <form onSubmit={updateBooking} ref={domNode}>
          <div className="form-container">
            <div className="edit-form-header">
              <button
                onClick={() => {
                  setSlotID(id);
                  reset();
                }}
                className="close"
              >
                &lt;Back
              </button>
              <h2>Edit Reservation</h2>
              <button
                onClick={() => {
                  reset();
                }}
                className="close"
              >
                Close
              </button>
            </div>
            <ErrorBooking
              errorBooking={errorBooking}
              setErrorBooking={handleErrorBooking}
            />
            <p class="edit-reservation">
              All fields marked with * are required
            </p>
            <div className="item">
              <label htmlFor="location">Location *</label>
              <select
                onClick={handleSelectLocation}
                id="location"
                name="location"
                defaultValue={currentLocation}
              >
                <option value="DEFAULT" disabled hidden>
                  Select
                </option>
                <option value="Kitchener">Kitchener</option>
                <option value="Waterloo">Waterloo</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="activity-type">Activity Type *</label>
              <select
                onChange={handleSelectActivityType}
                id="activity-type"
                name="activityType"
                defaultValue={currentActivityType}
              >
                <option value="DEFAULT" disabled hidden>
                  Select
                </option>
                <option value="Dual">Dual</option>
                <option value="Solo">Solo</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="start-time">Start *</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                name="startDate"
                minDate={currentDate}
                minTime={
                  startDate.getDate() === currentDate.getDate()
                    ? setHours(
                        setMinutes(currentDate, currentDate.getMinutes()),
                        currentDate.getHours()
                      )
                    : setHours(setMinutes(currentDate, 0), 8)
                }
                maxTime={setHours(setMinutes(currentDate, 30), 21)}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
            <div className="item">
              <label htmlFor="end-time">End *</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                name="endDate"
                minDate={new Date(startDate)}
                onKeyDown={(e) => e.preventDefault()}
                minDate={startDate}
                maxDate={startDate}
                minTime={setHours(
                  setMinutes(currentDate, `${startDate.getMinutes()}`),
                  `${startDate.getHours()}`
                )}
                maxTime={setHours(setMinutes(currentDate, 0), 22)}
              />
            </div>
            <div className="item">
              <label className="label-customer" htmlFor="customer">
                Customer *
              </label>
              <input
                type="text"
                id="customer"
                name="customer"
                placeholder="Search by name"
                value={customer}
                onChange={(e) => {
                  setCustomer(e.target.value);
                  removeError(e);
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="display-name">Display Name</label>
              <input
                type="text"
                id="display-name"
                name="displayName"
                placeholder="None"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="item">
              <label htmlFor="aircraft">Aircraft *</label>
              <select
                onClick={handleSelectAircraft}
                id="aircraft"
                name="aircraft"
                defaultValue={`${currentAircraft}`}
              >
                <option value="DEFAULT" disabled hidden>
                  Select
                </option>
                {planes &&
                  planes.map((info) => {
                    return (
                      <option key={info._id} value={`${info.reg} ${info.type}`}>
                        {info.reg} {info.type}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="item">
              <label htmlFor="instructor">Instructor *</label>
              <select
                disabled={activityType === "Solo" ? true : false}
                onClick={handleSelectInstructor}
                id="instructor"
                name="instructor"
                defaultValue={currentInstructor}
              >
                <option value="DEFAULT" disabled hidden>
                  Select
                </option>
                <option value="None" disabled hidden>
                  None
                </option>
                {instructorArr &&
                  instructorArr.map((user) => {
                    return (
                      <>
                        <option key={user._id} value={user.name}>
                          {user.name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="item">
              <label>Flight Type *</label>
              <div className="flight-type">
                <input
                  type="radio"
                  id="local"
                  onClick={() => setFlightType("Local")}
                  value={flightType}
                  name="flightType"
                  checked={flightType === "Local" ? true : false}
                />
                <label htmlFor="local">Local</label>
                <input
                  type="radio"
                  id="cross-country"
                  onClick={() => setFlightType("Cross-country")}
                  value={flightType}
                  name="flightType"
                  checked={flightType === "Cross-country" ? true : false}
                />
                <label htmlFor="cross-country">Cross Country</label>
              </div>
            </div>
            <div className="item">
              <label
                className="label-flight-route-legs"
                htmlFor="flight-route-legs"
              >
                Flight Route/Legs *
              </label>
              <textarea
                id="flight-route-legs"
                name="flightRoute"
                value={flightRoute}
                onChange={(e) => {
                  setFlightRoute(e.target.value);
                  removeError(e);
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <button type="submit" className="submit">
              Edit Reservation
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default EditModal;
