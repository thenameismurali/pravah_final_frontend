import { Home, MapPin, Users, LayoutDashboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-3 flex gap-6 z-50">
      <NavIcon
        icon={<Home />}
        active={location.pathname === "/"}
        onClick={() => navigate("/")}
      />

      <NavIcon
        icon={<MapPin />}
        active={location.pathname === "/map"}
        onClick={() => navigate("/map")}
      />

      <NavIcon
        icon={<Users />}
        active={location.pathname === "/groups"}
        onClick={() => navigate("/groups")}
      />

      <NavIcon
        icon={<LayoutDashboard />}
        active={location.pathname === "/dashboard"}
        onClick={() => navigate("/dashboard")}
      />
    </nav>
  );
};

const NavIcon = ({ icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full transition ${
      active
        ? "bg-green-700 text-white"
        : "text-green-700 hover:bg-green-100"
    }`}
  >
    {icon}
  </button>
);

export default BottomNav;
