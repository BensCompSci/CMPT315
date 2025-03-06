import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import "./styles/timer.css";

const Timer: React.FC = () => {
    const [time, setTime] = useState(1500); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [shortBreak, setShortBreak] = useState(300); // 5 minutes in seconds
    const [workTime, setWorkTime] = useState(1500); // 25 minutes in seconds
    const [longBreak, setLongBreak] = useState(900); // 15 minutes in seconds
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [selectedItem, setSelectedItem] = useState(null);
    const [timers, setTimers] = useState([
        { id: 1, title: "Timer 1", details: "Details of timer 1", duration: "25:00" },
        { id: 2, title: "Timer 2", details: "Details of timer 2", duration: "15:00" },
    ]);
    const [showTimerForm, setShowTimerForm] = useState(false);
    const [newTimer, setNewTimer] = useState({ title: "", details: "", duration: "" });
    const [error, setError] = useState("");

    const [tasks, setTasks] = useState([
        { id: 1, name: "Study for CMPT 315" },
        { id: 2, name: "Create Database" },
        { id: 3, name: "Build Lego Set" },
    ]);
    const [selectedTask, setSelectedTask] = useState(tasks[0].id);

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

    const handleSaveTimer = () => {
        if (!newTimer.title.trim()) {
            setError("Timer Name cannot be empty");
            return;
        }
        if (newTimer.title.length > 20) {
            setError("Timer Name cannot exceed 20 characters");
            return;
        }
        if (!newTimer.details.trim()) {
            setError("Timer Description cannot be empty");
            return;
        }

        setTimers([...timers, { id: timers.length + 1, ...newTimer }]);
        setNewTimer({ title: "", details: "", duration: "" });
        setShowTimerForm(false);
        setError("");
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleCompleteTask = () => {
        setTasks(tasks.filter(task => task.id !== selectedTask));
    };

    return (
        <div className="container">
            <header>
                <h1>Pomodoro Timer</h1>
            </header>
            {selectedItem ? (
                <div className="timer-popup">
                    <h2>{selectedItem.title}</h2>
                    <p>{selectedItem.details}</p>
                    {selectedItem.duration && <p><strong>Duration:</strong> {selectedItem.duration}</p>}
                    <button onClick={() => setSelectedItem(null)}>Back</button>
                </div>
            ) : showTimerForm ? (
                <div className="new-timer-popup">
                    <h2>New Timer</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="text"
                        placeholder="Timer Name"
                        value={newTimer.title}
                        maxLength={20}
                        onChange={(e) => setNewTimer({ ...newTimer, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Timer Description"
                        value={newTimer.details}
                        onChange={(e) => setNewTimer({ ...newTimer, details: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Duration (e.g., 25:00)"
                        value={newTimer.duration}
                        onChange={(e) => setNewTimer({ ...newTimer, duration: e.target.value })}
                    />
                    <button onClick={handleSaveTimer}>Save</button>
                    <button onClick={() => setShowTimerForm(false)}>Back</button>
                </div>
            ) : (
                <>
                    <div className="timer-container">
                        <div className={`timer-bar ${isActive ? 'active' : ''} ${isPaused ? 'paused' : ''}`}>
                            <span>{formatTime(time)}</span>
                        </div>
                    </div>
                    <div className="timer-buttons">
                        <button onClick={handleStart}>Start</button>
                        <button onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                    <div className="timer-settings">
                        <label>Short Break: <input type="text" className="w-20 border-2 text-center rounded-lg p-1.5" placeholder="5 min" value={shortBreak / 60}
                                            onChange={(e) => setShortBreak(Number(e.target.value) * 60)} /></label>
                        <label>Work Time: <input type="text" className="w-20 border-2 text-center rounded-lg p-1.5" placeholder="25 min" value={workTime / 60}
                                            onChange={(e) => setWorkTime(Number(e.target.value) * 60)} /></label>
                        <label>Long Break: <input type="text" className="w-20 border-2 text-center rounded-lg p-1.5" placeholder="15 min" value={longBreak / 60}
                                            onChange={(e) => setLongBreak(Number(e.target.value) * 60)} /></label>
                    </div>
                    <div className="task-container">
                        <label>Task chosen:</label>
                        <select value={selectedTask} onChange={(e) => setSelectedTask(Number(e.target.value))}>
                            {tasks.map((task) => (
                                <option key={task.id} value={task.id}>{task.name}</option>
                            ))}
                        </select>
                        <button onClick={handleCompleteTask} style={{ marginLeft: '10px' }}>Complete Task</button>
                    </div>
                    <div className="content">
                        <section className="timers expanded" style={{ height: "450px" }}>
                            <h2>Timers</h2>
                            <ul className="scrollable-list">
                                {timers.map((timer) => (
                                    <li key={timer.id} onClick={() => setSelectedItem(timer)}>
                                        {timer.title}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setShowTimerForm(true)}>New Timer</button>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};

export default Timer;