import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import ErrorBooking from "../ErrorBooking/ErrorBooking";

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

    const [location, setLocation] = useState('');
    const [activityType, setActivityType] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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

        console.log(location);
        console.log(activityType);
        
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
            // if (activityType === "") {
            //     document.querySelector(".label-activity-type").classList.add("errortext");
            //     document.getElementById("activity-type").classList.add("errorbox");
            // }
            // if (customer === "") {
            //     document.querySelector(".label-customer").classList.add("errortext");
            //     document.getElementById("customer").classList.add("errorbox");
            // }
        } else {
            try {
                await axios.post("/api/slots", postData);
                setCustomer('');
                setDisplayName('');
                setFlightRoute('');
                setComments('');
                setStartDate(new Date());
                setEndDate(new Date());
                setErrorBooking(false);
                hideModal();
                const slotsURL = `http://localhost:5000/api/slots/${date}`;
                slotCall();
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
        } else {
            document.getElementById("instructor").value = "DEFAULT";
            document.getElementById("instructor").disabled = false;
        }
    }

    const handleSelectAircraft = e => {
        setAircraft(e.target.value)
    }

    const handleSelectInstructor = e => {
        setInstructor(e.target.value)
    }

    const reset = () => {
        setLocation("");
        setActivityType("");
        setAircraft("");
        setInstructor("");
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
                            <label htmlFor="start-time">Start *</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                name="startDate"
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
                                onChange={e => {setCustomer(e.target.value)}}
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
                            <label htmlFor="aircraft">Aircraft *</label>
                            <select onClick={handleSelectAircraft} id="aircraft" name="aircraft" defaultValue={"DEFAULT"}>
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
                            <label htmlFor="instructor">Instructor *</label>
                            <select onClick={handleSelectInstructor} id="instructor" name="instructor" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled hidden>Select</option>
                                <option value="None" disabled hidden>None</option>
                                <option value="Josh">Josh</option>
                                <option value="Jensen">Jensen</option>
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
                                />
                                <label htmlFor="local">Local</label>
                                <input
                                    type="radio"
                                    id="cross-country"
                                    onClick={() => setFlightType("Cross-country")}
                                    value={flightType}
                                    name="flightType"
                                />
                                <label htmlFor="cross-country">Cross Country</label>
                            </div>
                        </div>
                        <div className="item">
                            <label htmlFor="flight-route-legs">Flight Route/Legs *</label>
                            <textarea
                                id="flight-route-legs"
                                name="flightRoute"
                                value={flightRoute}
                                onChange={e => setFlightRoute(e.target.value)}
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