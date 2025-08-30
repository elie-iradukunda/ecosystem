import { useState } from 'react';
import { LandingPage } from './components/LandingPage.jsx';
import { UserDashboard } from './user-dashboard/UserDashboard.jsx';
import { CompanyDashboard } from './company-dashboard/CompanyDashboard.jsx';
import { TVETDashboard } from './components/TVETDashboard.jsx';
import { Toaster } from './components/ui/sonner.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'user-dashboard':
        return <UserDashboard onNavigate={setCurrentView} />;
      case 'company-dashboard':
        return <CompanyDashboard onNavigate={setCurrentView} />;
      case 'tvet-dashboard':
        return <TVETDashboard onNavigate={setCurrentView} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <>
      {renderView()}
      <Toaster />
    </>
  );
}