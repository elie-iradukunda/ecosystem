import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout.jsx';
import { DashboardOverview } from './DashboardOverview.jsx';
import { ProfileSection } from './ProfileSection.jsx';
import { CompanySection } from './CompanySection.jsx';
import { SkillsSection } from './SkillsSection.jsx';
import { StatisticsSection } from './StatisticsSection.jsx';
import { OpportunitiesSection } from './OpportunitiesSection.jsx';
import { Button } from './ui/button.jsx';
import { ArrowLeft } from 'lucide-react';

export function TVETDashboard({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'profile':
        return <ProfileSection />;
      case 'company':
        return <CompanySection />;
      case 'skills':
        return <SkillsSection />;
      case 'statistics':
        return <StatisticsSection />;
      case 'opportunities':
        return <OpportunitiesSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Back to Landing Page Button */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-2">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-slate-700"
          onClick={() => onNavigate('landing')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Landing Page
        </Button>
      </div>
      
      <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection} onNavigate={onNavigate}>
        {renderActiveSection()}
      </DashboardLayout>
    </div>
  );
}