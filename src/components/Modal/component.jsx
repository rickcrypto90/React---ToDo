import React, { useState } from "react";
import { ThemedInput } from "../index.js";
import "./index.css";

const Modal = ({ tasks, setTasks, closeModal }) => {
  const [task, setTask] = useState({
    Title: "",
    Description: "",
    Author: "",
    Priority: "",
    Status: "todo",
    id: tasks.length + 1,
  });

  const handleSetTask = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, task]);
    closeModal();
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div style={{ position: "relative" }}>
          <h1>Create New Task</h1>
          <button onClick={closeModal} style={closeButtonStyles}>
            x
          </button>
        </div>
        <ThemedInput
          name="Title"
          onChange={handleSetTask}
          value={task.Title}
          placeholder="Title"
        />
        <ThemedInput
          name="Description"
          onChange={handleSetTask}
          value={task.Description}
          placeholder="Description"
        />
        <ThemedInput
          name="Author"
          onChange={handleSetTask}
          value={task.Author}
          placeholder="Author"
        />
        <select
          value={task.Priority}
          name="Priority"
          onChange={handleSetTask}
          className="themedSelect">
          <option value="">Select Priority</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          disabled={Object.keys(task).some((key) => !task[key])}
          onClick={handleSubmit}
          className="disableButton">
          Create
        </button>
      </div>
    </div>
  );
};

const closeButtonStyles = {
  position: "absolute",
  top: "0",
  right: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "30px",
};

export default Modal;
