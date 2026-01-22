import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import GridLayer from "../components/Home/GridLayer";
import { api } from "../api/events";
import { extractLatLng, getDistanceKm } from "../utils/geo";
import { userIcon, eventIcon } from "../utils/mapIcons";

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => alert("Allow location access")
    );

    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  if (!userLocation) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        Loading map…
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MapContainer
        center={userLocation}
        zoom={13}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* BASE MAP */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* GRID */}
        <GridLayer />

        {/* USER LOCATION */}
        <Marker
          position={userLocation}
          icon={userIcon}
          eventHandlers={{
            click: (e) => {
              e?.originalEvent?.stopPropagation();
              setSelected({ type: "user" });
            },
          }}
        />

        {/* EVENTS */}
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
                  e?.originalEvent?.stopPropagation(); // ✅ SAFE
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

      {/* CARD ABOVE MAP */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#fff",
            padding: 16,
            borderRadius: 16,
            width: "90%",
            maxWidth: 380,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          {selected.type === "user" ? (
            <>
              <h3>Your Location</h3>
              <p>You are here</p>
            </>
          ) : (
            <>
              <h3>{selected.title}</h3>
              <p>{selected.venue}</p>
              <p>{selected.description}</p>

              {typeof selected.distance === "number" && (
                <p>{selected.distance.toFixed(2)} km away</p>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  style={{
                    flex: 1,
                    background: "#166534",
                    color: "#fff",
                    padding: 8,
                    borderRadius: 8,
                    border: "none",
                  }}
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
                  style={{
                    flex: 1,
                    border: "1px solid #166534",
                    color: "#166534",
                    padding: 8,
                    borderRadius: 8,
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Directions
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPage;
