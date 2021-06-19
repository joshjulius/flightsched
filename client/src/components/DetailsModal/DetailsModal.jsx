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

const DetailsModal = ({ setSlotID, id, slotID, startHour, startMinute, endHour, endMinute, activityType, aircraft, instructor, customer, type }) => {

    let domNode = useClickOutside(() => {
        setSlotID(0);
    });

    const hideDetails = () => {
        setSlotID(0);
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
                </div>
            </div>
        );
    } else {
        return null;
    }
    
}

export default DetailsModal;