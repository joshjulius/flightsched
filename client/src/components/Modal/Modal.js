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

const Modal = ({ visibility, hideModal }) => {

    const [startDate, setStartDate] = useState(new Date());

    let domNode = useClickOutside(() => {
        {hideModal()}
    });

    if (!visibility) {
        return null;
    } else if (visibility) {
        return (
            <div className="modal">
                <form action="" method="POST"  ref={domNode}>
                    <div className="form-container">
                        <div className="form-header">
                            <h2>New Reservation</h2>
                            <button onClick={hideModal} className="close">Close</button>
                        </div>
                        <div className="item">
                            <label for="location">Location</label>
                            <select id="location" name="location">
                                <option value="" disabled selected>Select</option>
                                <option value="Kitchener">Kitchener</option>
                                <option value="Waterloo">Waterloo</option>
                            </select>
                        </div>
                        <div className="item">
                            <label for="activity-type">Activity Type</label>
                            <select id="activity-type" name="activity-type">
                                <option value="" disabled selected>Select</option>
                                <option value="dual">Dual</option>
                                <option value="solo">Solo</option>
                            </select>
                        </div>
                        <div className="item">
                            <label for="start-time">Start</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </div>
                        <div className="item">
                            <label for="end-time">End</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </div>
                        <div className="item">
                            <label for="customer">Customer</label>
                            <input
                                type="text"
                                id="customer"
                                name="customer"
                                placeholder="Search by name"
                            />
                        </div>
                        <div className="item">
                            <label for="display-name">Display Name</label>
                            <input
                                type="text"
                                id="display-name"
                                name="display-name"
                                placeholder="None"
                            />
                        </div>
                        <div className="item">
                            <label for="aircraft">Aircraft</label>
                            <select id="aircraft" name="aircraft">
                                <option value="" disabled selected>Select</option>
                                <option value="GUBI">Cessna 172S C-GUBI</option>
                                <option value="GUZZ">Cessna 172S C-GUZZ</option>
                            </select>
                        </div>
                        <div className="item">
                            <label for="instructor">Instructor</label>
                            <select id="instructor" name="instructor">
                                <option value="" disabled selected>Select</option>
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
                                    value="local"
                                    name="flight-type"
                                />
                                <label for="local">Local</label>
                                <input
                                    type="radio"
                                    id="cross-country"
                                    value="cross-country"
                                    name="flight-type"
                                />
                                <label for="cross-country">Cross Country</label>
                            </div>
                        </div>
                        <div className="item">
                            <label for="flight-route-legs">Flight Route/Legs</label>
                            <textarea id="flight-route-legs" name="flight-route-legs" />
                        </div>
                        <div className="item">
                            <label for="comments">Comments</label>
                            <textarea id="comments" name="comments" />
                        </div>
                        <button type="submit" class="submit">Create Reservation</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Modal;