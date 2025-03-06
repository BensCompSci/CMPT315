import React, { useState, useEffect } from "react";
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

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("monthly");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the database
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <button className="icon" onClick={prev}>
            &lt;
          </button>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <button className="icon" onClick={next}>
            &gt;
          </button>
        </div>
      </div>
    );
  };

  const renderViewToggle = () => {
    return (
      <div className="view-toggle">
        <button className="icon" onClick={goToToday}>
          Today
        </button>
        <select onChange={(e) => setView(e.target.value)} value={view}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
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
      isSameDay(new Date(task.dueDate), selectedDate)
    );
    return (
      <div className="body daily-view">
        <div className="row">
          <div className="col cell">
            <span className="number">{formattedDate}</span>
            <div className="task-list">
              {dayTasks.map((task) => (
                <div key={task.id}>{task.title}</div>
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
        isSameDay(new Date(task.dueDate), day)
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
              <div key={task.id}>{task.title}</div>
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
          isSameDay(new Date(task.dueDate), day)
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
            <div className="task-list">
              {dayTasks.map((task) => (
                <div key={task.id}>{task.title}</div>
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
        {renderViewToggle()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
