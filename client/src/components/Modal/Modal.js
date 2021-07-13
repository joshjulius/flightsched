import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import ErrorBooking from "../ErrorBooking/ErrorBooking";
import {setMinutes, setHours} from "date-fns";

import "./Modal.scss";
import "react-datepicker/dist/react-datepicker.css";

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

const Modal = ({ visibility, hideModal, planes, date, slotCall }) => {

    const currentDate = new Date();
    const tomorrow = new Date();
    const interval30 = 30 * 60 * 1000; // 30 minutes in milliseconds
    const next30min = new Date(Math.ceil(currentDate.getTime()/interval30)*interval30);
    const next90min = new Date(Math.ceil(currentDate.getTime()/interval30)*interval30).setMinutes(next30min.getMinutes() + 90);

    const [location, setLocation] = useState('');
    const [activityType, setActivityType] = useState('');
    const [startDate, setStartDate] = useState(((next30min.getHours() < 21) && (next30min.getHours() >= 8)) ? next30min : setHours(setMinutes(tomorrow.setDate(tomorrow.getDate() + 1), 0), 8)); 
    const [endDate, setEndDate] = useState(((next30min.getHours() < 21) && (next30min.getHours() >= 8)) ? next90min : setHours(setMinutes(tomorrow, 30), 9));
    const [customer, setCustomer] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [aircraft, setAircraft] = useState('');
    const [instructor, setInstructor] = useState('');
    const [flightType, setFlightType] = useState('');
    const [flightRoute, setFlightRoute] = useState('');
    const [comments, setComments] = useState('');
    
    const [errorBooking, setErrorBooking] = useState(false);

    const handleErrorBooking = (boolean) => {
      setErrorBooking(boolean);
    }

    const reset = () => {
        setLocation("");
        setActivityType("");
        setStartDate(((next30min.getHours() < 21) && (next30min.getHours() >= 8)) ? next30min : setHours(setMinutes(tomorrow, 0), 8));
        setEndDate(((next30min.getHours() < 21) && (next30min.getHours() >= 8)) ? next90min : setHours(setMinutes(tomorrow, 30), 9));
        setCustomer("");
        setDisplayName("");
        setAircraft("");
        setInstructor("");
        setFlightType("");
        setFlightRoute("");
        setComments("");
    }

    const makeBooking = async (e) => {
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
            comments
        }
        
        if (location === "" ||
            location === "DEFAULT" ||
            activityType === "" ||
            activityType === "DEFAULT" ||
            startDate === "" ||
            endDate === "" ||
            customer === "" ||
            aircraft === "" ||
            aircraft === "DEFAULT" ||
            instructor === "" ||
            instructor === "DEFAULT" ||
            flightType === "" ||
            flightRoute ==="" ) {
                if (location === "" || location === "DEFAULT") {
                    document.querySelector(".label-location").classList.add("errortext");
                    document.getElementById("location").classList.add("errorbox");
                }
                if (activityType === "" || activityType === "DEFAULT") {
                    document.querySelector(".label-activity-type").classList.add("errortext");
                    document.getElementById("activity-type").classList.add("errorbox");
                }
                if (customer === "") {
                    document.querySelector(".label-customer").classList.add("errortext");
                    document.getElementById("customer").classList.add("errorbox");
                }
                if (startDate === "") {
                    document.querySelector(".label-start-date").classList.add("errortext");
                    document.getElementById("start-date").classList.add("errorbox");
                }
                if (endDate === "") {
                    document.querySelector(".label-end-date").classList.add("errortext");
                    document.getElementById("end-date").classList.add("errorbox");
                }
                if (aircraft === "" || aircraft === "DEFAULT") {
                    document.querySelector(".label-aircraft").classList.add("errortext");
                    document.getElementById("aircraft").classList.add("errorbox");
                }
                if (instructor === "" || instructor === "DEFAULT") {
                    document.querySelector(".label-instructor").classList.add("errortext");
                    document.getElementById("instructor").classList.add("errorbox");
                }
                if (flightType === "") {
                    const labelFlightType = document.querySelectorAll(".label-flight-type");
                    for (let i = 0; i < labelFlightType.length; i++) {
                        labelFlightType[i].classList.add("errortext");
                    }
                }
                if (flightRoute === "") {
                    document.querySelector(".label-flight-route-legs").classList.add("errortext");
                    document.getElementById("flight-route-legs").classList.add("errorbox");
                }
        } else {
            try {
                await axios.post("/api/slots", postData);
                setCustomer('');
                setDisplayName('');
                setFlightRoute('');
                setComments('');
                setStartDate(((next30min.getHours() < 21) && (next30min.getHours() >= 8)) ? next30min : setHours(setMinutes(tomorrow, 0), 8));
                setEndDate(((next30min.getHours() < 21) && (next30min.getHours() >= 8)) ? next90min : setHours(setMinutes(tomorrow, 30), 9));
                setErrorBooking(false);
                hideModal();
                const slotsURL = `http://localhost:5000/api/slots/${date}`;
                slotCall();
                reset();
            } catch {
                setErrorBooking(true);
            }
        }
    }

    const removeError = (e) => {
        e.currentTarget.previousSibling.classList.remove("errortext");
        e.currentTarget.classList.remove("errorbox");
    }

    const handleSelectLocation = e => (
        setLocation(e.target.value)
    )

    const handleSelectActivityType = e => {
        setActivityType(e.target.value);
        const activityType = document.getElementById("activity-type").value;
        if (activityType === "Solo") {
            setInstructor("None");
            document.getElementById("instructor").value = "None";
            document.getElementById("instructor").disabled = true;
            document.querySelector(".label-instructor").classList.remove("errortext");
            document.getElementById("instructor").classList.remove("errorbox");
        } else {
            document.getElementById("instructor").value = "DEFAULT";
            document.getElementById("instructor").disabled = false;
            setInstructor("");
        }
        removeError(e);
    }

    const handleSelectAircraft = e => {
        setAircraft(e.target.value)
    }

    const handleSelectInstructor = e => {
        setInstructor(e.target.value)
    }

    let domNode = useClickOutside(() => {
        hideModal();
        setErrorBooking(false);
        reset();
    });

    if (!visibility) {
        return null;
    } else if (visibility) {
        return (
            <div className="modal">
                <form onSubmit={makeBooking}  ref={domNode}>
                    <div className="form-container">
                        <div className="form-header">
                            <h2>New Reservation</h2>
                            <button
                                onClick={() => {
                                    hideModal();
                                    setErrorBooking(false);
                                    reset();
                                }}
                                className="close"
                            >
                                Close
                            </button>
                        </div>
                        <ErrorBooking errorBooking={errorBooking} setErrorBooking={handleErrorBooking} />
                        <p>All fields marked with * are required</p>
                        <div className="item">
                            <label className="label-location" htmlFor="location">Location *</label>
                            <select onClick={handleSelectLocation} onChange={removeError} id="location" name="location" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled hidden>Select</option>
                                <option value="Kitchener">Kitchener</option>
                                <option value="Waterloo">Waterloo</option>
                            </select>
                        </div>
                        <div className="item">
                            <label className="label-activity-type" htmlFor="activity-type">Activity Type *</label>
                            <select onChange={handleSelectActivityType} id="activity-type" name="activityType" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled hidden>Select</option>
                                <option value="Dual">Dual</option>
                                <option value="Solo">Solo</option>
                            </select>
                        </div>
                        <div className="item">
                            <label className="label-start-date" htmlFor="start-time">Start *</label>
                            <DatePicker
                                placeholderText="Select"
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    document.querySelector(".label-start-date").classList.remove("errortext");
                                    document.getElementById("start-date").classList.remove("errorbox");
                                    }}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                name="startDate"
                                id="start-date"
                                minDate={currentDate}
                                minTime={(startDate.getDate() === currentDate.getDate()) ? setHours(setMinutes(currentDate, currentDate.getMinutes()), currentDate.getHours()) : setHours(setMinutes(currentDate, 0), 8)}
                                maxTime={setHours(setMinutes(currentDate, 30), 21)}
                                onKeyDown={e => e.preventDefault()}
                            />
                        </div>
                        <div className="item">
                            <label className="label-end-date" htmlFor="end-time">End *</label>
                            <DatePicker
                                placeholderText="Select"
                                selected={endDate}
                                onChange={(date) => {
                                    setEndDate(date);
                                    document.querySelector(".label-end-date").classList.remove("errortext");
                                    document.getElementById("end-date").classList.remove("errorbox");
                                    }}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                name="endDate"
                                id="end-date"
                                onKeyDown={e => e.preventDefault()}
                                minDate={startDate}
                                maxDate={startDate}
                                minTime={setHours(setMinutes(currentDate, `${startDate.getMinutes()}`), `${startDate.getHours()}`)}
                                maxTime={setHours(setMinutes(currentDate, 0), 23)}
                            />
                        </div>
                        <div className="item">
                            <label className="label-customer" htmlFor="customer">Customer *</label>
                            <input
                                type="text"
                                id="customer"
                                name="customer"
                                placeholder="Search by name"
                                value={customer}
                                onChange={e => {setCustomer(e.target.value); removeError(e);}}
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
                                onChange={e => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label className="label-aircraft" htmlFor="aircraft">Aircraft *</label>
                            <select onClick={handleSelectAircraft} onChange={removeError} id="aircraft" name="aircraft" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled hidden>Select</option>
                                {planes && planes.map((info) => {
                                    return (
                                    <option
                                        key={info._id}
                                        value={`${info.reg} ${info.type}`}
                                    >
                                        {info.reg} {info.type}
                                    </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="item" id="div-instructor">
                            <label className="label-instructor" htmlFor="instructor">Instructor *</label>
                            <select onClick={handleSelectInstructor} onChange={removeError} id="instructor" name="instructor" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled hidden>Select</option>
                                <option value="None" disabled hidden>None</option>
                                <option value="Josh">Josh</option>
                                <option value="Jensen">Jensen</option>
                            </select>
                        </div>
                        <div className="item">
                            <label className="label-flight-type">Flight Type *</label>
                            <div className="flight-type">
                                <input
                                    type="radio"
                                    id="local"
                                    onClick={() => {
                                        setFlightType("Local");
                                        const labelFlightType = document.querySelectorAll(".label-flight-type");
                                        for (let i = 0; i < labelFlightType.length; i++) {
                                            labelFlightType[i].classList.remove("errortext");
                                            }
                                        }}
                                    value={flightType}
                                    name="flightType"
                                />
                                <label className="label-flight-type" htmlFor="local">Local</label>
                                <input
                                    type="radio"
                                    id="cross-country"
                                    onClick={() => {
                                        setFlightType("Cross-country");
                                        const labelFlightType = document.querySelectorAll(".label-flight-type");
                                        for (let i = 0; i < labelFlightType.length; i++) {
                                            labelFlightType[i].classList.remove("errortext");
                                            }
                                        }}
                                    value={flightType}
                                    name="flightType"
                                />
                                <label className="label-flight-type" htmlFor="cross-country">Cross Country</label>
                            </div>
                        </div>
                        <div className="item">
                            <label className="label-flight-route-legs" htmlFor="flight-route-legs">Flight Route/Legs *</label>
                            <textarea
                                id="flight-route-legs"
                                name="flightRoute"
                                value={flightRoute}
                                onChange={e => {setFlightRoute(e.target.value); removeError(e);}}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="comments">Comments</label>
                            <textarea
                                id="comments"
                                name="comments" 
                                value={comments}
                                onChange={e => setComments(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="submit">Create Reservation</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Modal;