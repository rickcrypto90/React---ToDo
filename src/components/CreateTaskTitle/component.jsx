import React from "react";
import "./index.css";

const CreateTaskTitle = ({ setShowModal }) => (
  <div className="createTaskWrapper">
    <h1 className="createTaskTitle">Create Task</h1>
    <div className="createTaskPlus" onClick={() => setShowModal(true)}>
      +
    </div>
  </div>
);

export default CreateTaskTitle;
