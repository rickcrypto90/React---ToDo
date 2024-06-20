import React, { useCallback } from "react";
import "../App.css";

const TodoCard = ({ task, setTasks }) => {
  const { Title, Description, Priority, Author, Status, id } = task;
  const backgroundColor = {
    Low: "green",
    Medium: "yellow",
    High: "red",
  }[Priority];

  const handleComplete = useCallback(() => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, Status: "done" } : t))
    );
  }, [id, setTasks]);

  return (
    <div className="todoCard">
      <div className="todoCardHeader">
        <h2>{Title}</h2>
        <div
          style={{ flex: 1, height: "4px", backgroundColor: backgroundColor }}
        />
      </div>
      <p>{Description}</p>
      <div className="todoCardFooter">
        <p>di {Author}</p>
        {Status === "todo" && (
          <button onClick={handleComplete} className="disableButton">
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
