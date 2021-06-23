import axios from "axios";
import React, { useRef, useEffect } from "react";
import "./DetailsModal.scss";

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

const DetailsModal = ({ slotCall, setSlotID, id, slotID, startHour, startMinute, endHour, endMinute, activityType, aircraft, instructor, customer, type }) => {

    let domNode = useClickOutside(() => {
        setSlotID(0);
    });

    const hideDetails = () => {
        setSlotID(0);
    }

    const deleteBooking = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/slots/${id}`);
            console.log(res.data);
            hideDetails();
            slotCall();
        } catch (err) {
            console.log(err);
        }
    }

    if (slotID === id) {
        return(
            <div className="details-modal" id={id}>
                <div className="details-container" ref={domNode}>
                    <p>{aircraft} {type}</p>
                    <p>Activity Type: {activityType}</p>
                    <p>Customer: {customer}</p>
                    <p>Instructor: {instructor}</p>
                    <p>Start Time: {startHour}:{startMinute}</p>
                    <p>End Time: {endHour}:{endMinute}</p>
                    <button onClick={hideDetails}>Close</button>
                    <button onClick={() => deleteBooking(id)}>Delete Reservation</button>
                    <button>Edit Reservation</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
    
}

export default DetailsModal;