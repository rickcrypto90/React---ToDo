import React, { useState } from "react";

import CreateTaskTitle from "./components/CreateTaskTitle";
import Columns from "./components/Columns";
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
        <Columns>
          <Column
            title="Todo"
            tasks={tasks.filter((task) => task.Status === "todo")}
            setTasks={setTasks}
          />
          <Column
            title="Done"
            tasks={tasks.filter((task) => task.Status === "done")}
          />
        </Columns>
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
