import React, { useState, useEffect } from "react";
import { User } from "../models/User";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  addWeeks,
  subWeeks,
} from "date-fns";
import "./styles/calendar.css";
import { Task } from "../models/Task";

interface calendarProps {
   user: User;
}

const Calendar: React.FC<calendarProps> = ({ user }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("monthly");
  // interface Task {
  //   id: string;
  //   title: string;
  //   date: string;
  // }
  
  const [tasks, setTasks] = useState<Task[]>([]);

  console.log(user.email);
  useEffect(() => {
    // Fetch the current user from the session or authentication context
    // fetchCurrentUser();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    if (!user) return; // Ensure user is loaded before fetching tasks
    try {
      const response = await fetch(
        `http://localhost:8000/task/getAll?owner=${user.email}` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            owner: user.email,
          }),
        }
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  console.log(tasks);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div>
        <div className="date-text">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="header row flex-middle">
          <div className="col col-start">
            <div className="button-group">
              <button className="icon" onClick={prev}>
                &lt;
              </button>
              <button className="icon" onClick={goToToday}>
                Today
              </button>
            </div>
          </div>
          <div className="col col-center"></div>
          <div className="col col-end">
            <div className="button-group">
              <select onChange={(e) => setView(e.target.value)} value={view}>
                <option value="daily">Day</option>
                <option value="weekly">Week</option>
                <option value="monthly">Month</option>
              </select>
              <button className="icon" onClick={next}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    if (view === "daily") {
      return (
        <div className="days row">
          <div className="col col-center">{format(selectedDate, "EEEE")}</div>
        </div>
      );
    }

    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    if (view === "daily") {
      return renderDailyCells();
    } else if (view === "weekly") {
      return renderWeeklyCells();
    } else {
      return renderMonthlyCells();
    }
  };

  const renderDailyCells = () => {
    const formattedDate = format(selectedDate, "d");
    const dayTasks = tasks.filter((task) =>
      isSameDay(new Date(task.date), selectedDate)
    );
    return (
      <div className="body daily-view">
        <div className="row">
          <div className="col cell">
            <span className="number">{formattedDate}</span>
            <div className="task-list">
              {dayTasks.map((task) => (
                <div key={task._id}>{task.title}</div>
              ))}
            </div>
            <span className="bg">{formattedDate}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderWeeklyCells = () => {
    const startDate = startOfWeek(selectedDate);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const dayTasks = tasks.filter((task) =>
        isSameDay(new Date(task.date), day)
      );
      days.push(
        <div
          className={`col cell ${
            isSameDay(day, selectedDate) ? "selected" : ""
          }`}
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="number">{formattedDate}</span>
          <div className="task-list">
            {dayTasks.map((task) => (
              <div key={task._id}>{task.title}</div>
            ))}
          </div>
          <span className="bg">{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day.toString()}>
        {days}
      </div>
    );
    return <div className="body weekly-view">{rows}</div>;
  };

  const renderMonthlyCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    for (let week = 0; week < 6; week++) {
      // Ensure 6 rows
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const dayTasks = tasks.filter((task) =>
          isSameDay(new Date(task.date), day)
        );
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="task-list">
              {dayTasks.map((task) => (
                <div key={task._id}>{task.title}</div>
              ))}
            </span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body monthly-view">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const next = () => {
    if (view === "monthly") {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else if (view === "weekly") {
      setSelectedDate(addWeeks(selectedDate, 1));
    } else if (view === "daily") {
      setSelectedDate(addDays(selectedDate, 1));
    }
  };

  const prev = () => {
    if (view === "monthly") {
      setCurrentMonth(addMonths(currentMonth, -1));
    } else if (view === "weekly") {
      setSelectedDate(subWeeks(selectedDate, 1));
    } else if (view === "daily") {
      setSelectedDate(addDays(selectedDate, -1));
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
