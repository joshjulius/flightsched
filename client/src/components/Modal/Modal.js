import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";

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

const Modal = ({ visibility, hideModal, planes }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    let domNode = useClickOutside(() => {
        hideModal()
    });

    if (!visibility) {
        return null;
    } else if (visibility) {
        return (
            <div className="modal">
                <form action="/api/slots" method="POST"  ref={domNode}>
                    <div className="form-container">
                        <div className="form-header">
                            <h2>New Reservation</h2>
                            <button onClick={hideModal} className="close">Close</button>
                        </div>
                        <div className="item">
                            <label htmlFor="location">Location</label>
                            <select id="location" name="location" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select</option>
                                <option value="Kitchener">Kitchener</option>
                                <option value="Waterloo">Waterloo</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="activity-type">Activity Type</label>
                            <select id="activity-type" name="activityType" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select</option>
                                <option value="Dual">Dual</option>
                                <option value="Solo">Solo</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="start-time">Start</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                name="startTime"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="end-time">End</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                name="endTime"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="customer">Customer</label>
                            <input
                                type="text"
                                id="customer"
                                name="customer"
                                placeholder="Search by name"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="display-name">Display Name</label>
                            <input
                                type="text"
                                id="display-name"
                                name="displayName"
                                placeholder="None"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="aircraft">Aircraft</label>
                            <select id="aircraft" name="aircraft" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select</option>
                                {planes && planes.map((info) => {
                                    return (
                                    <option key={info._id} value={`${info.reg} ${info.type}`}>
                                        {info.reg} {info.type}
                                    </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="instructor">Instructor</label>
                            <select id="instructor" name="instructor" defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select</option>
                                <option value="Josh">Josh</option>
                                <option value="Jensen">Jensen</option>
                            </select>
                        </div>
                        <div className="item">
                            <label>Flight Type</label>
                            <div className="flight-type">
                                <input
                                    type="radio"
                                    id="local"
                                    value="Local"
                                    name="flightType"
                                />
                                <label htmlFor="local">Local</label>
                                <input
                                    type="radio"
                                    id="cross-country"
                                    value="Csross-country"
                                    name="flightType"
                                />
                                <label htmlFor="cross-country">Cross Country</label>
                            </div>
                        </div>
                        <div className="item">
                            <label htmlFor="flight-route-legs">Flight Route/Legs</label>
                            <textarea id="flight-route-legs" name="flightRoute" />
                        </div>
                        <div className="item">
                            <label htmlFor="comments">Comments</label>
                            <textarea id="comments" name="comments" />
                        </div>
                        <button type="submit" className="submit">Create Reservation</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Modal;