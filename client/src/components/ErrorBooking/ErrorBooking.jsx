import React from "react";
import "./ErrorBooking.scss";

const ErrorBooking = ({ errorBooking, message }) => {
  if (errorBooking) {
    return <p className="error-booking">{message}</p>;
  } else {
    return null;
  }
};

export default ErrorBooking;
