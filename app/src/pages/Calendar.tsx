import React, { useState } from "react";
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
        <button onClick={() => setView("daily")}>Daily</button>
        <button onClick={() => setView("weekly")}>Weekly</button>
        <button onClick={() => setView("monthly")}>Monthly</button>
      </div>
    );
  };

  const renderDays = () => {
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
    const dayStart = startOfWeek(selectedDate);
    const dayEnd = endOfWeek(selectedDate);
    const rows = [];
    let days = [];
    let day = dayStart;
    let formattedDate = "";

    while (day <= dayEnd) {
      formattedDate = format(day, "d");
      const cloneDay = day;
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
            {/* Example tasks, replace with your dynamic tasks */}
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
    return <div className="body daily-view">{rows}</div>;
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
            {/* Example tasks, replace with your dynamic tasks */}
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
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
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
              {/* Example tasks, replace with your dynamic tasks */}
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
