import React from "react";
import "./ErrorBooking.scss";

const ErrorBooking = ({ errorBooking }) => {
    
    if (errorBooking) {
        return (
            <p className="error-booking">Booking cannot be made, aircraft or instructor unavailable.</p>
        );
    } else {
        return null;
    }
    
}

export default ErrorBooking;