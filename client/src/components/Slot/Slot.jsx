import React from "react";
import "./Slot.scss";

const Slot = ({ id, startTime, endTime }) => {

    const startHour = startTime.slice(11,13);
    const startMinute = startTime.slice(14,16);
    const endHour = endTime.slice(11,13);
    const endMinute = endTime.slice(14,16);
            
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

    return(
        <div className={`${id} slot`} style={style}></div>
    );

}

export default Slot;