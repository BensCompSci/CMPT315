import React from 'react';
import './styles/Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="button-container">
        <ul>
          <li><button className="sidebar-button">Dashboard</button></li>
          <li className="settings"><button className="sidebar-button">Settings</button></li>
          <li className="logout"><button className="sidebar-button">Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;