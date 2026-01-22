import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import GridLayer from "../components/Home/GridLayer";
import { api } from "../api/events";
import { extractLatLng, getDistanceKm } from "../utils/geo";
import { userIcon, eventIcon } from "../utils/mapIcons";

const MapPage = () => {
  const mapRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  /* 1️⃣ Get location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => alert("Please allow location access")
    );
  }, []);

  /* 2️⃣ Fetch events */
  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  /* 3️⃣ Fit bounds ONLY when everything is ready */
  useEffect(() => {
    if (!mapRef.current) return;
    if (!userLocation) return;

    const coords = events
      .map((e) => extractLatLng(e.location))
      .filter(Boolean);

    if (coords.length === 0) return;

    const bounds = [
      [userLocation.lat, userLocation.lng],
      ...coords.map((c) => [c.lat, c.lng]),
    ];

    setTimeout(() => {
      mapRef.current.invalidateSize();
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: [40, 120],
        paddingBottomRight: [40, 160],
      });
    }, 800); // 🔥 mobile-safe delay
  }, [userLocation, events]);

  if (!userLocation) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading map…
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <MapContainer
        center={userLocation}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={false}
        tap={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
          setMapReady(true);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <GridLayer />

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
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]
                        bg-white rounded-2xl shadow-xl p-4 w-[90%] max-w-sm">
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

      {/* 📍 RECENTER (mobile fallback) */}
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
