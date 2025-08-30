import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx';
import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  BarChart3,
  PieChart,
  Target,
  Award,
  BookOpen,
  MapPin,
  DollarSign
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for dashboard
const dashboardStats = {
  totalUsers: 1247,
  totalCompanies: 156,
  totalOpportunities: 89,
  activeOpportunities: 45,
  skillGapReports: 23,
  completionRate: 78
};

const recentActivities = [
  {
    id: 1,
    type: 'opportunity',
    title: 'New React Developer position added',
    company: 'TechCorp Solutions',
    time: '2 hours ago',
    status: 'new'
  },
  {
    id: 2,
    type: 'company',
    title: 'BuildRight Construction verified',
    company: 'BuildRight Construction',
    time: '4 hours ago',
    status: 'verified'
  },
  {
    id: 3,
    type: 'skill',
    title: 'Skills assessment completed',
    company: 'Healthcare Plus',
    time: '6 hours ago',
    status: 'completed'
  },
  {
    id: 4,
    type: 'user',
    title: 'New trainee registration',
    company: 'System',
    time: '8 hours ago',
    status: 'registered'
  }
];

const monthlyData = [
  { month: 'Jan', opportunities: 45, applications: 234, completions: 178 },
  { month: 'Feb', opportunities: 52, applications: 267, completions: 198 },
  { month: 'Mar', opportunities: 48, applications: 245, completions: 189 },
  { month: 'Apr', opportunities: 61, applications: 298, completions: 223 },
  { month: 'May', opportunities: 55, applications: 276, completions: 201 },
  { month: 'Jun', opportunities: 67, applications: 334, completions: 267 }
];

const sectorData = [
  { sector: 'Technology', value: 35, color: '#3b82f6' },
  { sector: 'Healthcare', value: 25, color: '#10b981' },
  { sector: 'Construction', value: 20, color: '#f59e0b' },
  { sector: 'Manufacturing', value: 12, color: '#ef4444' },
  { sector: 'Other', value: 8, color: '#8b5cf6' }
];

const skillsData = [
  { skill: 'React Development', demand: 85, supply: 65 },
  { skill: 'Project Management', demand: 78, supply: 82 },
  { skill: 'Data Analysis', demand: 92, supply: 45 },
  { skill: 'Digital Marketing', demand: 67, supply: 71 },
  { skill: 'Nursing', demand: 89, supply: 56 }
];

const topCompanies = [
  { name: 'TechCorp Solutions', opportunities: 12, sector: 'Technology', status: 'active' },
  { name: 'HealthCare Plus', opportunities: 8, sector: 'Healthcare', status: 'active' },
  { name: 'BuildRight Construction', opportunities: 6, sector: 'Construction', status: 'active' },
  { name: 'DataFlow Analytics', opportunities: 5, sector: 'Technology', status: 'pending' },
  { name: 'Green Energy Co', opportunities: 4, sector: 'Energy', status: 'active' }
];

export function DashboardOverview() {
  const [timeRange, setTimeRange] = useState('6months');

  const getActivityIcon = (type) => {
    switch (type) {
      case 'opportunity': return <Briefcase className="h-4 w-4" />;
      case 'company': return <Building2 className="h-4 w-4" />;
      case 'skill': return <Target className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-600';
      case 'verified': return 'bg-green-600';
      case 'completed': return 'bg-purple-600';
      case 'registered': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">TVET Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's what's happening in your TVET system.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="text-2xl font-semibold text-white">{dashboardStats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+12% from last month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Companies</p>
                <p className="text-2xl font-semibold text-white">{dashboardStats.totalCompanies}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+8% from last month</span>
                </div>
              </div>
              <Building2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Job Opportunities</p>
                <p className="text-2xl font-semibold text-white">{dashboardStats.totalOpportunities}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-yellow-400">{dashboardStats.activeOpportunities} active</span>
                </div>
              </div>
              <Briefcase className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completion Rate</p>
                <p className="text-2xl font-semibold text-white">{dashboardStats.completionRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+5% from last month</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Charts */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Overview</CardTitle>
              <CardDescription className="text-slate-400">
                Monthly trends for opportunities, applications, and completions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={timeRange} onValueChange={setTimeRange} className="space-y-4">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="3months" className="text-slate-300">3M</TabsTrigger>
                  <TabsTrigger value="6months" className="text-slate-300">6M</TabsTrigger>
                  <TabsTrigger value="1year" className="text-slate-300">1Y</TabsTrigger>
                </TabsList>
                <TabsContent value={timeRange} className="space-y-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="opportunities" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          name="Opportunities"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="applications" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="Applications"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="completions" 
                          stroke="#f59e0b" 
                          strokeWidth={2}
                          name="Completions"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Skills Gap Analysis */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Skills Gap Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Demand vs Supply comparison for key skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{skill.skill}</span>
                      <span className="text-slate-400">
                        Demand: {skill.demand}% | Supply: {skill.supply}%
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="h-full bg-red-500 rounded-full transition-all"
                            style={{ width: `${skill.demand}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{ width: `${skill.supply}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activities</CardTitle>
              <CardDescription className="text-slate-400">
                Latest updates across your TVET system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-slate-400">{activity.company}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-400 hover:text-blue-300">
                View all activities
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Sector Distribution */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Sector Distribution</CardTitle>
              <CardDescription className="text-slate-400">
                Opportunities by industry sector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {sectorData.map((sector, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sector.color }}
                    />
                    <span className="text-xs text-slate-300">{sector.sector}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Companies */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Top Companies</CardTitle>
              <CardDescription className="text-slate-400">
                Most active companies by opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-white">{company.name}</p>
                      <p className="text-xs text-slate-400">{company.sector}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className="border-slate-600 text-slate-300"
                      >
                        {company.opportunities}
                      </Badge>
                      <Badge 
                        className={company.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}
                      >
                        {company.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-400 hover:text-blue-300">
                View all companies
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-slate-400">
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto border-slate-600 text-slate-300">
              <Plus className="h-6 w-6 mb-2" />
              <span>Add Opportunity</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto border-slate-600 text-slate-300">
              <Building2 className="h-6 w-6 mb-2" />
              <span>Register Company</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto border-slate-600 text-slate-300">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Generate Report</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto border-slate-600 text-slate-300">
              <Target className="h-6 w-6 mb-2" />
              <span>Skills Assessment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}