import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./calendar.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  // 🔹 admin check (simple)
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const formatDate = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(
      2,
      "0"
    )}`;

  const eventsByDate = (date) =>
    events.filter((e) => e.date === date);

  // next 3 upcoming events from today
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div className="calendar-page">
      {/* ✅ ADMIN CREATE EVENT BUTTON */}
      {isAdmin && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "12px",
          }}
        >
          <button
            onClick={() => navigate("/events")}
            style={{
              background: "#166534",
              color: "white",
              padding: "10px 16px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            + Create Event
          </button>
        </div>
      )}

      {/* MONTH HEADER */}
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1))}>
          ‹
        </button>

        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button onClick={() => setCurrentDate(new Date(year, month + 1))}>
          ›
        </button>
      </div>

      {/* CALENDAR GRID */}
      <div className="calendar-grid">
        {days.map((d) => (
          <div key={d} className="day-name">
            {d}
          </div>
        ))}

        {/* empty slots before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* days */}
        {Array.from({ length: totalDays }, (_, i) => {
          const date = formatDate(i + 1);
          const dayEvents = eventsByDate(date);
          const hasEvent = dayEvents.length > 0;

          return (
            <div
              key={i}
              className="day"
              onClick={() => {
                if (hasEvent) {
                  navigate(`/events/${dayEvents[0]._id}`);
                }
              }}
            >
              {i + 1}
              {hasEvent && <span className="dot" />}
            </div>
          );
        })}
      </div>

      {/* UPCOMING EVENTS */}
      <div className="upcoming">
        <h3>Upcoming Events</h3>

        {upcomingEvents.map((e) => (
          <div
            key={e._id}
            className="upcoming-card"
            onClick={() => navigate(`/events/${e._id}`)}
          >
            <div className="date">
              <span>{new Date(e.date).getDate()}</span>
              <small>
                {new Date(e.date).toLocaleString("default", {
                  month: "short",
                })}
              </small>
            </div>

            <div>
              <h4>{e.title}</h4>
              <p>
                {e.time} • {e.venue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
