import React from "react";
import "./Slot.scss";

const Slot = ({ date }) => {


    if (date === "Sun, June 6, 2021") {
        return(
            <div className="slot"></div>
        );
    } else {
        return null;
    }
    

}

export default Slot;