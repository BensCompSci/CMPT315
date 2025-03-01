import React from 'react';
import HomePage from './HomePage';
import Calendar from './Calendar';
import StatsComponent from './Stats';
import Timer from './Timer';
import { User } from '../models/User';
import './styles/Dashboard.css';

const Dashboard: React.FC = () => {
    const updateLoggedInUser = (user: User) => {
        console.log('User logged in:', user);
    };

    const signUpNewUser = (user: User) => {
        console.log('New user signed up:', user);
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Dashboard</h1>
            <div className="dashboard-content">
                <div className="dashboard-left">
                    <Timer />
                </div>
                <div className="dashboard-right">
                    <Calendar />
                    <StatsComponent />
                </div>
                <div className="dashboard-main">
                    <HomePage displayLogin={false} displaySignUp={false} updateLoggedInUser={updateLoggedInUser} signUpNewUser={signUpNewUser} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;