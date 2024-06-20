import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState([]);

  return (
    <div className="App">
      <div
        style={{
          margin: "0 auto",
          width: "80%",
        }}>
        <CreateTaskTitle setShowModal={setShowModal} />
        <Columns>
          <Column
            title="Todo"
            tasks={formData.filter((task) => task.Status === "todo")}
            setFormData={setFormData}
          />
          <Column
            title="Done"
            tasks={formData.filter((task) => task.Status === "done")}
          />
        </Columns>
        {showModal && (
          <Modal
            formData={formData}
            setFormData={setFormData}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
}

const CreateTaskTitle = ({ setShowModal }) => (
  <div style={styles.createTaskWrapper}>
    <h1 style={styles.createTaskTitle}>Create Task</h1>
    <div style={styles.createTaskPlus} onClick={() => setShowModal(true)}>
      +
    </div>
  </div>
);

const Columns = ({ children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      width: "100%",
      marginTop: "80px",
    }}>
    {children}
  </div>
);

const Column = ({ ...props }) => {
  const { title, tasks } = props;
  return (
    <div>
      <h1>{title}</h1>
      {Array.isArray(tasks) && tasks.length === 0 && <h2>No tasks</h2>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}>
        {tasks.map((task, index) => (
          <TodoCard key={index} {...task} {...props} />
        ))}
      </div>
    </div>
  );
};

const TodoCard = ({
  Title,
  Description,
  Priority,
  Author,
  Status,
  id,
  setFormData,
}) => {
  const backgroundColor = {
    Low: "green",
    Medium: "yellow",
    High: "red",
  }[Priority];

  const handleTodo = useCallback(() => {
    setFormData((prev) =>
      prev.map((task) => (task.id === id ? { ...task, Status: "done" } : task))
    );
  }, [id, setFormData]);

  return (
    <div style={styles.todoCard}>
      <div style={styles.todoCardHeader}>
        <h2>{Title}</h2>
        <div style={{ flex: 1, height: "4px", backgroundColor }} />
      </div>
      <p>{Description}</p>
      <div style={styles.todoCardFooter}>
        <p>di {Author}</p>
        {Status === "todo" && (
          <button
            onClick={handleTodo}
            style={{
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              width: "80px",
              height: "30px",
              padding: "0 10px",
            }}>
            Done
          </button>
        )}
      </div>
    </div>
  );
};

const Modal = ({ formData, setFormData, setShowModal }) => {
  const [task, setTask] = useState({
    Title: "",
    Description: "",
    Author: "",
    Priority: "",
    Status: "todo",
    id: formData.length + 1,
  });

  const handleSetTask = (e) => {
    setTask({
      ...task,
      [e.target.placeholder]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData([...formData, task]);
    setShowModal(false);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={{ position: "relative" }}>
          <h1>Create New Task</h1>
          <button
            onClick={() => setShowModal(false)}
            style={{
              position: "absolute",
              top: "0",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "30px",
            }}>
            x
          </button>
        </div>
        {Object.keys(task).map((key) => {
          if (["id", "Status"].includes(key)) return null;
          if (key === "Priority") {
            return (
              <select
                key={key}
                onChange={handleSetTask}
                placeholder={key}
                value={task[key]}
                style={styles.themedSelect}>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            );
          }
          return (
            <ThemedInput
              key={key}
              type="text"
              placeholder={key}
              onChange={handleSetTask}
              value={task[key]}
            />
          );
        })}
        <button
          disabled={Object.keys(task).some((key) => !task[key])}
          onClick={handleSubmit}
          style={styles.disableButton}>
          Create
        </button>
      </div>
    </div>
  );
};

const ThemedInput = ({ ...props }) => (
  <input {...props} style={styles.themedInput} />
);

export default App;

const styles = {
  columns: {
    marginTop: "100px",
  },
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100vw",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: "500px",
    width: "500px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  createTaskWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
  },
  createTaskPlus: {
    height: "40px",
    width: "40px",
    display: "table-cell",
    textAlign: "center",
    verticalAlign: "bottom",
    borderRadius: "50%",
    background: "black",
    fontSize: "30px",
    color: "white",
    cursor: "pointer",
  },
  createTaskTitle: {
    fontSize: "40px",
    fontWeight: "bolder",
  },
  todoCard: {
    width: "600px",
    minHeight: "200px",
    height: "fit-content",
    padding: "10px",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "1px",
  },
  todoCardHeader: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
  },
  todoCardFooter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "10px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    alignSelf: "end",
  },
  themedInput: {
    backgroundColor: "rgb(247, 247, 247)",
    height: "30px",
    width: "95%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
  },
  themedSelect: {
    backgroundColor: "rgb(247, 247, 247)",
    height: "50px",
    width: "99%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
  },
  disableButton: {
    padding: "10px",
    background: "black",
    alignSelf: "flex-end",
    marginTop: "auto",
    color: "white",
    border: "none",
    width: "100px",
    borderRadius: "5px",
  },
};
