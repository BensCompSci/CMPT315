
// import React from 'react';
// import Sidebar from './Sidebar';
// import HomePage from './HomePage';
// import Calendar from './Calendar';
// import StatsComponent from './Stats';
// import Timer from './Timer';
// import { User } from '../models/User';
// import './styles/dashboard.css';

// const Dashboard: React.FC = () => {
//     const updateLoggedInUser = (user: User) => {
//         console.log('User logged in:', user);
//     };

//     const signUpNewUser = (user: User) => {
//         console.log('New user signed up:', user);
//     };

//     return (
//         <div className="dashboard-container">
//             <div className="dashboard-left">
//                 <Sidebar />
//             </div>
//             <div className="dashboard-right">
//                 <h1 className="dashboard-header">Task Manager</h1>
//                 <div className="dashboard-content">
//                     <div className="dashboard-calendar">
//                         <Calendar />
//                     </div>
//                     <div className="dashboard-timer">
//                         <Timer />
//                     </div>
//                     <div className="dashboard-stats">
//                         <StatsComponent />
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// import React from 'react';
// import Sidebar from './Sidebar';
// import Calendar from './Calendar';
// import StatsComponent from './Stats';
// import Timer from './Timer';

// const Dashboard: React.FC = () => {
//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar */}
//             <aside className="w-64 bg-white shadow-lg hidden lg:block">
//                 <Sidebar />
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 flex flex-col p-6 space-y-6">
//                 {/* Header */}
//                 <header className="bg-orange-500 text-white text-3xl font-bold p-4 rounded-lg shadow">
//                     Task Manager
//                 </header>

//                 {/* Dashboard Content Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {/* Calendar */}
//                     <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
//                         <Calendar />
//                     </div>

//                     {/* Timer */}
//                     <div className="bg-white p-6 rounded-lg shadow-lg">
//                         <Timer />
//                     </div>

//                     {/* Stats */}
//                     <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-3">
//                         <StatsComponent />
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;



import React from "react";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import StatsComponent from "./Stats";
import Timer from "./Timer";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with Logout */}
      <aside className="w-64 bg-white shadow-lg hidden lg:block">
        <Sidebar onLogout={onLogout} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 space-y-6">
        {/* Header */}
        <header className="bg-orange-500 text-white text-3xl font-bold p-4 rounded-lg shadow flex justify-between items-center">
          Task Manager
          <button 
            onClick={onLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </header>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
            <Calendar />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Timer />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-3">
            <StatsComponent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;