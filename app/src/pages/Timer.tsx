import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';

const Timer: React.FC = () => {
    const [time, setTime] = useState(1500); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [shortBreak, setShortBreak] = useState(300); // 5 minutes in seconds
    const [workTime, setWorkTime] = useState(1500); // 25 minutes in seconds
    const [longBreak, setLongBreak] = useState(900); // 15 minutes in seconds
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && !isPaused) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (isPaused) {
            clearInterval(intervalRef.current!);
        }

        if (time === 0) {
            clearInterval(intervalRef.current!);
            setIsActive(false);
        }

        return () => clearInterval(intervalRef.current!);
    }, [isActive, isPaused, time]);

    useEffect(() => {
        if (!isActive) {
            setTime(workTime);
        }
    }, [workTime]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        clearInterval(intervalRef.current!);
        setIsActive(false);
        setIsPaused(false);
        setTime(workTime);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="container">
            <h1>Pomodoro Timer</h1>
            <nav className="nav-links">
                <a href="login.html">Login</a>
                <a href="stats.html">Statistics & Tasks</a>
            </nav>
            <div className="timer-container">
                <div className="timer-bar">
                    <span>{formatTime(time)}</span>
                </div>
            </div>
            <div className="timer-buttons">
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="timer-settings">
                <label>Short Break: <input type="text" placeholder="5 min" value={shortBreak / 60} 
                                    onChange={(e) => setShortBreak(Number(e.target.value) * 60)} /></label>
                <label>Work Time: <input type="text" placeholder="25 min" value={workTime / 60} 
                                    onChange={(e) => setWorkTime(Number(e.target.value) * 60)} /></label>
                <label>Long Break: <input type="text" placeholder="15 min" value={longBreak / 60} 
                                    onChange={(e) => setLongBreak(Number(e.target.value) * 60)} /></label>
            </div>
            <div className="task-container">
                <label>Task chosen:</label>
                <input type="text" placeholder="Selected task" disabled />
            </div>
            <div className="checkbox-container">
                <label>Mark as completed task:</label>
                <input type="checkbox" />
            </div>
        </div>
    );
};

export default Timer;