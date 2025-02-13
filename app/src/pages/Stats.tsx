import React, { useState } from "react";
import "./styles/stats.css";

const StatsComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", details: "Details of task 1", dueDate: "2024-02-12" },
    { id: 2, title: "Task 2", details: "Details of task 2", dueDate: "2024-02-15" },
  ]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", details: "", dueDate: "" });
  const [error, setError] = useState("");

  const sessions = [
    { id: 1, title: "Session 1", details: "Details of session 1" },
    { id: 2, title: "Session 2", details: "Details of session 2" },
  ];

  const handleSaveTask = () => {
    if (!newTask.title.trim()) {
      setError("Task Name cannot be empty");
      return;
    }
    if (newTask.title.length > 20) {
      setError("Task Name cannot exceed 20 characters");
      return;
    }
    if (!newTask.details.trim()) {
      setError("Task Description cannot be empty");
      return;
    }

    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    setNewTask({ title: "", details: "", dueDate: "" });
    setShowTaskForm(false);
    setError("");
  };

  return (
    <div className="stats-container">
      {selectedItem ? (
        <div className="task-popup">
          <h2>{selectedItem.title}</h2>
          <p>{selectedItem.details}</p>
          {selectedItem.dueDate && <p><strong>Due Date:</strong> {selectedItem.dueDate}</p>}
          <button onClick={() => setSelectedItem(null)}>Back</button>
        </div>
      ) : showTaskForm ? (
        <div className="popup">
          <h2>New Task</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Task Name"
            value={newTask.title}
            maxLength={20}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Task Description"
            value={newTask.details}
            onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button onClick={handleSaveTask}>Save</button>
          <button onClick={() => setShowTaskForm(false)}>Back</button>
        </div>
      ) : (
        <>
          <h1>Statistics & Tasks</h1>
          <nav>
            <a href="index.html">Timer</a>
            <a href="login.html">Login</a>
          </nav>
          <div className="content">
            <section className="previous-sessions expanded" style={{ height: "450px" }}>
              <h2>Previous Sessions</h2>
              <ul className="scrollable-list">
                {sessions.map((session) => (
                  <li key={session.id} onClick={() => setSelectedItem(session)}>
                    {session.title}
                  </li>
                ))}
              </ul>
            </section>
            <section className="tasks expanded" style={{ height: "450px" }}>
              <h2>Tasks</h2>
              <ul className="scrollable-list">
                {tasks.map((task) => (
                  <li key={task.id} onClick={() => setSelectedItem(task)}>
                    {task.title}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowTaskForm(true)}>New Task</button>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsComponent;
