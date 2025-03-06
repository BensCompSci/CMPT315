// import React, { useState } from "react";
// import "./styles/stats.css";

// const StatsComponent: React.FC = () => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Task 1", details: "Details of task 1", dueDate: "2024-02-12" },
//     { id: 2, title: "Task 2", details: "Details of task 2", dueDate: "2024-02-15" },
//   ]);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [newTask, setNewTask] = useState({ title: "", details: "", dueDate: "" });
//   const [error, setError] = useState("");

//   const sessions = [
//     { id: 1, title: "Session 1", details: "Details of session 1" },
//     { id: 2, title: "Session 2", details: "Details of session 2" },
//   ];

//   const handleSaveTask = () => {
//     if (!newTask.title.trim()) {
//       setError("Task Name cannot be empty");
//       return;
//     }
//     if (newTask.title.length > 20) {
//       setError("Task Name cannot exceed 20 characters");
//       return;
//     }
//     if (!newTask.details.trim()) {
//       setError("Task Description cannot be empty");
//       return;
//     }

//     setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
//     setNewTask({ title: "", details: "", dueDate: "" });
//     setShowTaskForm(false);
//     setError("");
//   };

//   return (
//     <div className="stats-container">
//       {selectedItem ? (
//         <div className="task-popup">
//           <h2>{selectedItem.title}</h2>
//           <p>{selectedItem.details}</p>
//           {selectedItem.dueDate && <p><strong>Due Date:</strong> {selectedItem.dueDate}</p>}
//           <button onClick={() => setSelectedItem(null)}>Back</button>
//         </div>
//       ) : showTaskForm ? (
//         <div className="popup">
//           <h2>New Task</h2>
//           {error && <p className="error-message">{error}</p>}
//           <input
//             type="text"
//             placeholder="Task Name"
//             value={newTask.title}
//             maxLength={20}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           />
//           <textarea
//             placeholder="Task Description"
//             value={newTask.details}
//             onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
//           />
//           <input
//             type="date"
//             value={newTask.dueDate}
//             onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
//           />
//           <button onClick={handleSaveTask}>Save</button>
//           <button onClick={() => setShowTaskForm(false)}>Back</button>
//         </div>
//       ) : (
//         <>
//           <h1>Statistics & Tasks</h1>
//           <div className="content">
//             <section className="previous-sessions expanded" style={{ height: "450px" }}>
//               <h2>Previous Sessions</h2>
//               <ul className="scrollable-list">
//                 {sessions.map((session) => (
//                   <li key={session.id} onClick={() => setSelectedItem(session)}>
//                     {session.title}
//                   </li>
//                 ))}
//               </ul>
//             </section>
//             <section className="tasks expanded" style={{ height: "450px" }}>
//               <h2>Tasks</h2>
//               <ul className="scrollable-list">
//                 {tasks.map((task) => (
//                   <li key={task.id} onClick={() => setSelectedItem(task)}>
//                     {task.title}
//                   </li>
//                 ))}
//               </ul>
//               <button onClick={() => setShowTaskForm(true)}>New Task</button>
//             </section>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StatsComponent;


import React, { useState } from "react";

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
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {selectedItem ? (
        <div className="p-6 bg-gray-100 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
          <p className="text-gray-700">{selectedItem.details}</p>
          {selectedItem.dueDate && (
            <p className="text-gray-500 font-semibold mt-2">Due: {selectedItem.dueDate}</p>
          )}
          <button 
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => setSelectedItem(null)}
          >
            Back
          </button>
        </div>
      ) : showTaskForm ? (
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">New Task</h2>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Task Name"
            value={newTask.title}
            maxLength={20}
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Task Description"
            value={newTask.details}
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <div className="flex justify-between">
            <button 
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              onClick={handleSaveTask}
            >
              Save
            </button>
            <button 
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowTaskForm(false)}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-4">Statistics & Tasks</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Sessions */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Previous Sessions</h2>
              <ul className="max-h-40 overflow-y-auto space-y-2">
                {sessions.map((session) => (
                  <li 
                    key={session.id} 
                    className="p-2 bg-white rounded shadow cursor-pointer hover:bg-orange-500 hover:text-white"
                    onClick={() => setSelectedItem(session)}
                  >
                    {session.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tasks */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Tasks</h2>
              <ul className="max-h-40 overflow-y-auto space-y-2">
                {tasks.map((task) => (
                  <li 
                    key={task.id} 
                    className="p-2 bg-white rounded shadow cursor-pointer hover:bg-orange-500 hover:text-white"
                    onClick={() => setSelectedItem(task)}
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
              <button 
                className="w-full mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                onClick={() => setShowTaskForm(true)}
              >
                New Task
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsComponent;