import React from "react";
import "../App.css";

const ThemedInput = ({ ...props }) => (
  <input {...props} className="themedInput" />
);

export default ThemedInput;
