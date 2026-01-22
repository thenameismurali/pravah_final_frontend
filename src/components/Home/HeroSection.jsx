import { motion } from "framer-motion";
import { MapPin, Calendar, Users, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-[85vh] bg-cover bg-center rounded-b-3xl"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-green-900/40 rounded-b-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          PRAVAH
        </h1>

        <p className="mt-3 text-white/90 text-lg">
          Where Seva Meets Flow
        </p>

        <p className="mt-2 text-white/80 max-w-xl">
          A student-led movement for sustainability, service & real impact
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionBtn
            icon={<MapPin />}
            text="Explore Map"
            onClick={() => navigate("/map")}
          />

          <ActionBtn
            icon={<Calendar />}
            text="Open Calendar"
            onClick={() => navigate("/calendar")}
          />

          <ActionBtn
            icon={<Users />}
            text="Join Groups"
            onClick={() => navigate("/groups")}
          />

          <ActionBtn
            icon={<LayoutDashboard />}
            text="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ActionBtn = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur rounded-xl shadow hover:scale-105 transition"
  >
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </button>
);

export default HeroSection;
