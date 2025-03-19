import React, { useState } from "react";
import { Task } from "../models/Task";
import { User } from "../models/User";

interface StatsComponentProps {
  user: User;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchTasks: () => Promise<void>;
}

const API_URL = "http://localhost:8000/task";

const StatsComponent: React.FC<StatsComponentProps> = ({ user, tasks, setTasks, fetchTasks }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "", date: "" });
  const [error, setError] = useState("");

  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      setError("Task Name cannot be empty");
      return;
    }

    const taskToSave = { ...newTask, owner: user._id };

    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToSave),
      });

      if (!response.ok) throw new Error("Failed to add task");

      await fetchTasks(); // Fetch updated tasks for both Stats and Calendar
      setNewTask({ title: "", description: "", date: "" });
      setError("");
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`${API_URL}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId }),
      });

      if (!response.ok) throw new Error("Failed to delete task");

      await fetchTasks(); // Fetch updated tasks for both Stats and Calendar
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-4">My Tasks</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between p-2 bg-gray-100 rounded shadow">
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">Due: {task.date}</p>
            </div>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.title}
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.date}
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default StatsComponent;



// import React, { useState } from "react";

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
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//       {selectedItem ? (
//         <div className="p-6 bg-gray-100 rounded-lg text-center">
//           <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
//           <p className="text-gray-700">{selectedItem.details}</p>
//           {selectedItem.dueDate && (
//             <p className="text-gray-500 font-semibold mt-2">Due: {selectedItem.dueDate}</p>
//           )}
//           <button 
//             className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//             onClick={() => setSelectedItem(null)}
//           >
//             Back
//           </button>
//         </div>
//       ) : showTaskForm ? (
//         <div className="p-6 bg-gray-100 rounded-lg">
//           <h2 className="text-xl font-bold mb-4">New Task</h2>
//           {error && <p className="text-red-500">{error}</p>}
//           <input
//             type="text"
//             placeholder="Task Name"
//             value={newTask.title}
//             maxLength={20}
//             className="w-full p-2 border rounded mb-2"
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           />
//           <textarea
//             placeholder="Task Description"
//             value={newTask.details}
//             className="w-full p-2 border rounded mb-2"
//             onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
//           />
//           <input
//             type="date"
//             value={newTask.dueDate}
//             className="w-full p-2 border rounded mb-2"
//             onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
//           />
//           <div className="flex justify-between">
//             <button 
//               className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//               onClick={handleSaveTask}
//             >
//               Save
//             </button>
//             <button 
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//               onClick={() => setShowTaskForm(false)}
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <h1 className="text-2xl font-bold text-center mb-4">Statistics & Tasks</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Previous Sessions */}
//             <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-2">Previous Sessions</h2>
//               <ul className="max-h-40 overflow-y-auto space-y-2">
//                 {sessions.map((session) => (
//                   <li 
//                     key={session.id} 
//                     className="p-2 bg-white rounded shadow cursor-pointer hover:bg-orange-500 hover:text-white"
//                     onClick={() => setSelectedItem(session)}
//                   >
//                     {session.title}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Tasks */}
//             <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-2">Tasks</h2>
//               <ul className="max-h-40 overflow-y-auto space-y-2">
//                 {tasks.map((task) => (
//                   <li 
//                     key={task.id} 
//                     className="p-2 bg-white rounded shadow cursor-pointer hover:bg-orange-500 hover:text-white"
//                     onClick={() => setSelectedItem(task)}
//                   >
//                     {task.title}
//                   </li>
//                 ))}
//               </ul>
//               <button 
//                 className="w-full mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//                 onClick={() => setShowTaskForm(true)}
//               >
//                 New Task
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StatsComponent;