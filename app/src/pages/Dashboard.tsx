import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import StatsComponent from "./Stats";
import Timer from "./Timer";
import { User } from "../models/User";
import { Task } from "../models/Task";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const API_URL = "http://localhost:8000/task";

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isStatsPopupVisible, setIsStatsPopupVisible] = useState(false);

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
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-orange-500 text-white text-3xl font-bold p-4 rounded-lg shadow flex justify-between items-center">
          Task Manager
          <button
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg shadow transition self-start"
          >
            {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
        </header>

        <div className="flex flex-1">
          <aside className={`bg-white shadow-lg transition-width duration-300 ${isSidebarVisible ? 'w-64' : 'w-0'}`}>
            {isSidebarVisible && (
                <Sidebar onLogout={onLogout} onShowStats={() => setIsStatsPopupVisible(true)} />
            )}
          </aside>

          <main className="flex-1 flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-lg col-span-1 lg:col-span-2">
                <Calendar user={user} tasks={tasks} fetchTasks={fetchTasks} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Timer />
              </div>
            </div>
          </main>
        </div>

        {isStatsPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <button onClick={() => setIsStatsPopupVisible(false)} className="text-red-500">Close</button>
                <StatsComponent user={user} tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks} />
              </div>
            </div>
        )}
      </div>
  );
};

export default Dashboard;


