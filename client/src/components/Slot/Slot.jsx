import React, { useState } from "react";
import DetailsModal from "../DetailsModal/DetailsModal";
import "./Slot.scss";
import EditModal from "../EditModal/EditModal";

const Slot = ({ hideModal,
    planes,
    date,
    id,
    startTime,
    endTime,
    activityType,
    aircraft,
    instructor,
    customer,
    loading,
    slotCall,
    location,
    displayName,
    flightRoute,
    flightType,
    comments }) => {

    const startHour = startTime.slice(16,18);
    const startMinute = startTime.slice(19,21);
    const endHour = endTime.slice(16,18);
    const endMinute = endTime.slice(19,21);
            
    // 8am = 0
    // 1 hour = 50px
    // datum = left 150px

    //leftPixels = startTime  startTimeZeroed
    //150        =  08:00          0
    //200        =  09:00          60
    //225        =  09:30          90
    //237.5      =  09:45          105    
    //250        =  10:00          120

    const startTimeZeroed = ((parseInt(startHour) - 8) * 60) + parseInt(startMinute);
    const leftPixels = (50 / 60 * startTimeZeroed)+ 150;
    
    // 60 min = 50px

    const endTimeZeroed = ((parseInt(endHour) - 8) * 60) + parseInt(endMinute);
    const width = (endTimeZeroed - startTimeZeroed) * 50 / 60;

    const style = {
        left: leftPixels,
        width: width
    }

    if (!loading) {
        const tooltipDiv = document.querySelectorAll('.tooltip-div');
        // console.log(tooltipDiv);
        window.onmousemove = function (e) {
            const x = e.clientX,
                  y = e.clientY;
            for (let i = 0; i < tooltipDiv.length; i++) {
                tooltipDiv[i].style.top = (y + 20) + 'px';
                tooltipDiv[i].style.left = (x + 20) + 'px';
            }
        };
    }
    

    const [slotID, setSlotID] = useState(0);

    const getId = e => {
        setSlotID(e.currentTarget.id);
    }

    const [isEditing, setIsEditing] = useState(false);

    return(
        <>
            <div onClick={getId} id={`${id}`} className={`slot tooltip`} style={style}>
                <div className="customer-name">
                    <p>{startHour}:{startMinute} {customer}</p>
                </div>
                <div className="tooltip-div">
                    <p>{aircraft}</p>
                    <p>Activity Type: {activityType}</p>
                    <p>Customer: {customer}</p>
                    <p>Instructor: {instructor}</p>
                    <p>Start Time: {startHour}:{startMinute}</p>
                    <p>End Time: {endHour}:{endMinute}</p>
                    <p>Duration: {Math.floor((endTimeZeroed - startTimeZeroed) / 60)} hours {(endTimeZeroed - startTimeZeroed) % 60} minutes</p>
                </div>
            </div>
            <DetailsModal
                id={`${id}`}
                slotID={slotID}
                startHour={startHour}
                startMinute={startMinute}
                endHour={endHour}
                endMinute={endMinute}
                startTime={startTime}
                endTime={endTime}
                activityType={activityType}
                aircraft={aircraft}
                instructor={instructor} 
                customer={customer}
                setSlotID={setSlotID}
                slotCall={slotCall}
                setIsEditing={setIsEditing}
            />
            <EditModal
                id={`${id}`}
                setSlotID={setSlotID}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                hideModal={hideModal}
                planes={planes}
                date={date}
                slotCall={slotCall}
                currentLocation={location}
                currentActivityType={activityType}
                currentStartTime={startTime}
                currentEndTime={endTime}
                currentCustomer={customer}
                currentDisplayName={displayName}
                currentAircraft={aircraft}
                currentInstructor={instructor}
                currentFlightRoute={flightRoute}
                currentFlightType={flightType}
                currentComments={comments}
                startHour={startHour}
                startMinute={startMinute}
                endHour={endHour}
                endMinute={endMinute}
            />
        </>
    );

}

export default Slot;