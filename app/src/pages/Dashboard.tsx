import { User } from "../models/User";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import StatsComponent from "./Stats";
import Timer from "./Timer";
import { Task } from "../models/Task";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const API_URL = "http://localhost:8000/task";

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!user || !user._id) return;

    try {
      const response = await fetch(`${API_URL}/getAll?owner=${user._id}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg hidden lg:block">
        <Sidebar onLogout={onLogout} />
      </aside>

      <main className="flex-1 flex flex-col p-6 space-y-6">
        <header className="bg-orange-500 text-white text-3xl font-bold p-4 rounded-lg shadow flex justify-between items-center">
          Task Manager
          <button 
            onClick={onLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
            <Calendar user={user} tasks={tasks} fetchTasks={fetchTasks} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Timer />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-3">
            <StatsComponent user={user} tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


