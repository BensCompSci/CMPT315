
import React from 'react';
import Sidebar from './Sidebar';
import HomePage from './HomePage';
import Calendar from './Calendar';
import StatsComponent from './Stats';
import Timer from './Timer';
import { User } from '../models/User';
import './styles/dashboard.css';

const Dashboard: React.FC = () => {
    const updateLoggedInUser = (user: User) => {
        console.log('User logged in:', user);
    };

    const signUpNewUser = (user: User) => {
        console.log('New user signed up:', user);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-left">
                <Sidebar />
            </div>
            <div className="dashboard-right">
                <h1 className="dashboard-header">Task Manager</h1>
                <div className="dashboard-content">
                    <div className="dashboard-calendar">
                        <Calendar />
                    </div>
                    <div className="dashboard-timer">
                        <Timer />
                    </div>
                    <div className="dashboard-stats">
                        <StatsComponent />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;