import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPagePlayer from './components/SignupPagePlayer';
import SignupPageOrganizer from './components/SignupPageOrganizer';
import PlayerDashboard from './components/PlayerDashboard';
import OrganizerDashboard from './components/OrganizerDashboard';
import SportEventForm from './components/SportEventForm';
import TurfPortal from './components/TurfPortal';
import PlayerProfile from './components/PlayerProfile';
import TeamChat from './components/TeamChat';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup/player" element={<SignupPagePlayer />} />
      <Route path="/signup/organizer" element={<SignupPageOrganizer />} />
      <Route path="/player/dashboard" element={<PlayerDashboard />} />
      <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
      <Route path="/sport-event" element={<SportEventForm />} />
      <Route path="/turf-portal" element={<TurfPortal />} />
      <Route path="/player/profile" element={<PlayerProfile />} />
      <Route path="/team-chat" element={<TeamChat />} />
    </Routes>
  );
}
