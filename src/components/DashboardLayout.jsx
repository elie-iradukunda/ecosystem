import { useState } from 'react';
import { 
  User, 
  Building2, 
  TrendingUp, 
  BarChart3, 
  Briefcase,
  Menu,
  Search,
  Bell,
  Settings,
  LayoutDashboard,
  ArrowLeft
} from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.jsx';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'skills', label: 'Skills Gap Feedback', icon: TrendingUp },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
  { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
];

export function DashboardLayout({ children, activeSection, onSectionChange, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onNavigate && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-700"
              onClick={() => onNavigate('landing')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-slate-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">TVET Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 w-64"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            <Settings className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-blue-600 text-white">CM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    isActive 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}