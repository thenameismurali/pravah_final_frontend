import L from "leaflet";

export const userIcon = new L.DivIcon({
  className: "z-50",
  html: `
    <div style="
      width:18px;
      height:18px;
      background:#2563EB;
      border:4px solid rgba(37,99,235,0.35);
      border-radius:50%;
    "></div>
  `,
});

export const eventIcon = new L.DivIcon({
  className: "z-50",
  html: `
    <div style="
      width:22px;
      height:22px;
      background:#166534;
      border-radius:50% 50% 50% 0;
      transform: rotate(-45deg);
    "></div>
  `,
});
