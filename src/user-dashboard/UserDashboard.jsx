import { useState } from 'react';
import { UserDashboardLayout } from './components/UserDashboardLayout.jsx';
import { UserProfile } from './components/UserProfile.jsx';
import { InternshipTraining } from './components/InternshipTraining.jsx';
import { CertificatesRewards } from './components/CertificatesRewards.jsx';

export function UserDashboard({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('profile');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <UserProfile />;
      case 'internship':
        return <InternshipTraining />;
      case 'certificates':
        return <CertificatesRewards />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <UserDashboardLayout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
      onNavigate={onNavigate}
    >
      {renderActiveSection()}
    </UserDashboardLayout>
  );
}