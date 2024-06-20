import React, { useState } from "react";

import CreateTaskTitle from "./components/CreateTaskTitle";

import Column from "./components/Column";
import Modal from "./components/Modal";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <CreateTaskTitle setShowModal={setShowModal} />
        <div className="columns">
          <Column
            title="Todo"
            tasks={tasks.filter((task) => task.Status === "todo")}
            setTasks={setTasks}
          />
          <Column
            title="Done"
            tasks={tasks.filter((task) => task.Status === "done")}
          />
        </div>
        {showModal && (
          <Modal
            tasks={tasks}
            setTasks={setTasks}
            closeModal={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
