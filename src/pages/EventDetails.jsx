import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./eventdetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <div className="loading">Loading...</div>;

  return (
    <div className="event-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="event-card">
        <h1>{event.title}</h1>

        <p className="meta">
          {event.date} • {event.time}
        </p>

        <p className="venue">{event.venue}</p>

        <p className="desc">{event.description}</p>

        <a
          href={event.location}
          target="_blank"
          rel="noreferrer"
          className="directions-btn"
        >
          Directions
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
