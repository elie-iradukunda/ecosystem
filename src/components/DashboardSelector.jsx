import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { User, Building2, ArrowRight } from 'lucide-react';

export function DashboardSelector({ onSelectDashboard }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">TVET Dashboard System</h1>
          <p className="text-xl text-slate-400">Choose your dashboard type to get started</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Dashboard */}
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">User Dashboard</CardTitle>
              <CardDescription className="text-slate-400 text-lg">
                For learners, trainees, and job seekers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-slate-300 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Personal Profile Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Internship & Training Programs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Certificates & Rewards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Skills & Experience Tracking</span>
                </div>
              </div>
              <Button 
                onClick={() => onSelectDashboard('user')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
              >
                Access User Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Company Dashboard */}
          <Card className="bg-slate-800 border-slate-700 hover:border-green-500 transition-all cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-green-600 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">Company Dashboard</CardTitle>
              <CardDescription className="text-slate-400 text-lg">
                For employers, companies, and organizations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-slate-300 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Company Profile & Locations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Job Board Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Internship Programs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Industry Insights & Reports</span>
                </div>
              </div>
              <Button 
                onClick={() => onSelectDashboard('company')}
                className="w-full bg-green-600 hover:bg-green-700 text-white mt-6"
              >
                Access Company Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-500">
            Technical and Vocational Education and Training (TVET) Management System
          </p>
        </div>
      </div>
    </div>
  );
}