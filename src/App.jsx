import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage.jsx';
import { UserDashboard } from './user-dashboard/UserDashboard.jsx';
import { CompanyDashboard } from './company-dashboard/CompanyDashboard.jsx';
import { TVETDashboard } from './components/TVETDashboard.jsx';
import { Toaster } from './components/ui/sonner.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-dashboard/*" element={<UserDashboard />} />
        <Route path="/company-dashboard/*" element={<CompanyDashboard />} />
        <Route path="/tvet-dashboard/*" element={<TVETDashboard />} />
      </Routes>
      <Toaster />
    </Router>
  );
}