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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMouseInsideSidebar, setIsMouseInsideSidebar] = useState(false);
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

  // Handle mouse hover to show/hide sidebar
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is near the left edge or inside the sidebar
      if (e.clientX <= 10) {
        setIsSidebarVisible(true);
      } else if (!isMouseInsideSidebar) {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseInsideSidebar]);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <header className="bg-orange-500 text-white text-3xl font-bold p-4 shadow flex justify-between items-center">
        Task Manager
      </header>

      <div className="flex flex-1 w-full h-full">
        <aside
          onMouseEnter={() => setIsMouseInsideSidebar(true)}
          onMouseLeave={() => {
            setIsMouseInsideSidebar(false);
            setIsSidebarVisible(false);
          }}
          className={`bg-white shadow-lg fixed left-0 top-0 h-full transition-transform duration-500 ease-in-out ${
            isSidebarVisible ? "translate-x-0 w-64" : "-translate-x-full w-0"
          }`}
        >
          {isSidebarVisible && (
            <Sidebar onLogout={onLogout} onShowStats={() => setIsStatsPopupVisible(true)} />
          )}
        </aside>

        <main className="flex-1 flex flex-col h-full w-full ml-0">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-0 h-full">
            <div className="col-span-3 bg-white h-full w-full p-2">
              <Calendar user={user} tasks={tasks} fetchTasks={fetchTasks} />
            </div>
            <div className="col-span-1 bg-white h-full w-full p-2">
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
