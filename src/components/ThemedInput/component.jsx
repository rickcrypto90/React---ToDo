import React from "react";
import "./index.css";

const ThemedInput = ({ ...props }) => (
  <input {...props} className="themedInput" />
);

export default ThemedInput;
