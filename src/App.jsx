import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import EventsPage from "./pages/EventsPage";
import MapPage from "./pages/MapPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./pages/Calendar";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import Groups from "./pages/Groups";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout />}>
         
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
       <Route path="/calendar" element={<Calendar />} />
<Route path="/events/:id" element={<EventDetails />} />
<Route path="/dashboard" element={<Dashboard/>} />
<Route path="/groups" element={<Groups/>} />
        
<Route path="/map" element={<MapPage />} /></Route>
 <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

<Route path="/chat/:chatId" element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
