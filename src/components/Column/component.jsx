import React from "react";
import { TodoCard } from "../index.js";

const Column = ({ title, tasks, setTasks }) => (
  <div>
    <h1>{title}</h1>
    {tasks.length === 0 && <h2>No tasks</h2>}
    <div className="column">
      {tasks.map((task, index) => (
        <TodoCard key={index} task={task} setTasks={setTasks} />
      ))}
    </div>
  </div>
);

export default Column;
