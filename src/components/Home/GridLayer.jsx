import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const GridLayer = () => {
  const map = useMap();

  useEffect(() => {
    const grid = L.gridLayer({
      tileSize: 100,           // 🔥 smaller = denser grid
      pane: "overlayPane",     // 🔥 draw ABOVE map tiles
      zIndex: 1000,            // 🔥 force on top
    });

    grid.createTile = function () {
      const tile = document.createElement("div");

      tile.style.outline = "1px solid rgba(34, 197, 94, 0.25)"; // green grid
      tile.style.background = "transparent";

      return tile;
    };

    grid.addTo(map);

    return () => {
      map.removeLayer(grid);
    };
  }, [map]);

  return null;
};

export default GridLayer;
