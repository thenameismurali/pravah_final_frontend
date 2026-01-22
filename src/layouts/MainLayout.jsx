import BottomNav from "../components/Home/BottomNav";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // OPTIONAL: hide bottom nav on chat page
  const hideBottomNav = location.pathname.startsWith("/chat");

  return (
    <div className="min-h-screen relative pb-28">
      {/* PAGE CONTENT */}
      <Outlet />

      {/* BOTTOM NAV */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default MainLayout;
