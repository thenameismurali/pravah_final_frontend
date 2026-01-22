import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import GridLayer from "../components/Home/GridLayer";
import { api } from "../api/events";
import { extractLatLng, getDistanceKm } from "../utils/geo";
import { userIcon, eventIcon } from "../utils/mapIcons";

/* 🔥 FIT BOUNDS — EVENTS ONLY (FIXES MOBILE ISSUE) */
const FitBounds = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const timeout = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(points, {
        paddingTopLeft: [40, 140],
        paddingBottomRight: [40, 140],
        maxZoom: 16, // 🔥 prevents crazy zoom-out on mobile
      });
    }, 600);

    return () => clearTimeout(timeout);
  }, [points, map]);

  return null;
};

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  /* GET USER LOCATION + EVENTS */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => alert("Please allow location access")
    );

    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  if (!userLocation) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading map…
      </div>
    );
  }

  /* 🔥 EVENT POINTS ONLY (NO USER LOCATION HERE) */
  const eventPoints = events
    .map((e) => extractLatLng(e.location))
    .filter(Boolean)
    .map((c) => [c.lat, c.lng]);

  return (
    <div className="relative h-screen">
      <MapContainer
        center={userLocation}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={false}
        tap={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* BASE MAP */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* GRID OVERLAY */}
        <GridLayer />

        {/* AUTO FIT — EVENTS ONLY */}
        {eventPoints.length > 0 && (
          <FitBounds points={eventPoints} />
        )}

        {/* USER PIN */}
        <Marker
          position={userLocation}
          icon={userIcon}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              setSelected({ type: "user" });
            },
          }}
        />

        {/* EVENT PINS */}
        {events.map((event) => {
          const coords = extractLatLng(event.location);
          if (!coords) return null;

          const distance = getDistanceKm(
            userLocation.lat,
            userLocation.lng,
            coords.lat,
            coords.lng
          );

          return (
            <Marker
              key={event._id}
              position={coords}
              icon={eventIcon}
              eventHandlers={{
                click: (e) => {
                  e.originalEvent.stopPropagation();
                  setSelected({
                    ...event,
                    distance,
                    type: "event",
                  });
                },
              }}
            />
          );
        })}
      </MapContainer>

      {/* INFO CARD */}
      {selected && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]
                     bg-white rounded-2xl shadow-xl p-4 w-[90%] max-w-sm"
        >
          {selected.type === "user" ? (
            <>
              <h3 className="font-semibold text-lg">
                Your Location
              </h3>
              <p className="text-sm text-gray-600">
                You are here
              </p>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-lg">
                {selected.title}
              </h3>
              <p className="text-sm text-gray-600">
                {selected.venue}
              </p>
              <p className="text-sm mt-1">
                {selected.description}
              </p>
              <p className="text-sm mt-1">
                {selected.distance.toFixed(2)} km away
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 bg-green-700 text-white py-2 rounded-xl"
                  onClick={() =>
                    (window.location.href = `/chat/${selected.chatId}`)
                  }
                >
                  Join Event
                </button>

                <a
                  href={selected.location}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 border border-green-700 text-green-700
                             py-2 rounded-xl text-center"
                >
                  Directions
                </a>
              </div>
            </>
          )}
        </div>
      )}

      {/* 📍 MANUAL RECENTER (SAFE FALLBACK) */}
      <button
        className="absolute bottom-24 right-4 z-[1000]
                   bg-white shadow-lg rounded-full p-3"
        onClick={() => window.location.reload()}
      >
        📍
      </button>
    </div>
  );
};

export default MapPage;
