import React from "react"
import HeroSection from "./HeroSection";
import MissionSection from "./MissionSection";
import StatsSection from "./StatsSection";
import BottomNav from "./BottomNav";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F6FBF7] text-green-900">
      <HeroSection />
      <MissionSection />
      <StatsSection />
      {/* <BottomNav /> */}
    </div>
  );
};

export default Home;
