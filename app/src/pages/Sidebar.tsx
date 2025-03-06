// import React from 'react';
// import './styles/Sidebar.css';

// const Sidebar: React.FC = () => {
//   return (
//     <div className="sidebar">
//       <div className="button-container">
//         <ul>
//           <li><button className="sidebar-button">Dashboard</button></li>
//           <li className="settings"><button className="sidebar-button">Settings</button></li>
//           <li className="logout"><button className="sidebar-button">Logout</button></li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React from 'react';

// const Sidebar: React.FC = () => {
//   return (
//     <aside className="w-full lg:w-64 bg-white shadow-lg h-full flex flex-col p-6">
//       <nav>
//         <ul className="space-y-4">
//           <li>
//             <button className="w-full text-left text-lg font-semibold p-3 rounded-lg bg-gray-100 hover:bg-orange-500 hover:text-white transition">
//               Dashboard
//             </button>
//           </li>
//           <li>
//             <button className="w-full text-left text-lg font-semibold p-3 rounded-lg bg-gray-100 hover:bg-orange-500 hover:text-white transition">
//               Settings
//             </button>
//           </li>
//           <li>
//             <button className="w-full text-left text-lg font-semibold p-3 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white transition">
//               Logout
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-64 bg-white shadow-lg flex flex-col p-4 lg:fixed">
      <nav className="flex flex-col space-y-4">
        <button className="w-full text-left px-4 py-3 text-lg font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-orange-500 hover:text-white transition">
          Dashboard
        </button>
        <button className="w-full text-left px-4 py-3 text-lg font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-orange-500 hover:text-white transition">
          Settings
        </button>
        <button className="w-full text-left px-4 py-3 text-lg font-semibold text-red-600 bg-gray-100 rounded-lg hover:bg-red-500 hover:text-white transition">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;