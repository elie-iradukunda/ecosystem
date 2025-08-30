import { useState } from 'react';
import { CompanyDashboardLayout } from './components/CompanyDashboardLayout.jsx';
import { CompanyProfile } from './components/CompanyProfile.jsx';
import { JobBoard } from './components/JobBoard.jsx';
import { Internships } from './components/Internships.jsx';
import { IndustryInsights } from './components/IndustryInsights.jsx';
import { Contributions } from './components/Contributions.jsx';

export function CompanyDashboard({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('profile');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <CompanyProfile />;
      case 'jobs':
        return <JobBoard />;
      case 'internships':
        return <Internships />;
      case 'insights':
        return <IndustryInsights />;
      case 'contributions':
        return <Contributions />;
      default:
        return <CompanyProfile />;
    }
  };

  return (
    <CompanyDashboardLayout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
      onNavigate={onNavigate}
    >
      {renderActiveSection()}
    </CompanyDashboardLayout>
  );
}