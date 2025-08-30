import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const skillsData = [
  { name: 'Technical Skills', current: 65, desired: 85, gap: 20 },
  { name: 'Soft Skills', current: 70, desired: 90, gap: 20 },
  { name: 'Digital Literacy', current: 60, desired: 80, gap: 20 },
  { name: 'Communication', current: 75, desired: 88, gap: 13 },
  { name: 'Problem Solving', current: 68, desired: 85, gap: 17 },
  { name: 'Leadership', current: 55, desired: 78, gap: 23 }
];

const companyStatusData = [
  { name: 'Registered', value: 12, color: '#10b981' },
  { name: 'Pending', value: 8, color: '#f59e0b' },
  { name: 'Under Review', value: 3, color: '#3b82f6' }
];

const trainingProgressData = [
  { month: 'Jan', completed: 15, enrolled: 25, satisfaction: 4.2 },
  { month: 'Feb', completed: 22, enrolled: 30, satisfaction: 4.1 },
  { month: 'Mar', completed: 28, enrolled: 35, satisfaction: 4.3 },
  { month: 'Apr', completed: 35, enrolled: 40, satisfaction: 4.4 },
  { month: 'May', completed: 42, enrolled: 45, satisfaction: 4.5 },
  { month: 'Jun', completed: 48, enrolled: 50, satisfaction: 4.6 }
];

const opportunityTrendsData = [
  { month: 'Jan', opportunities: 45, placements: 12 },
  { month: 'Feb', opportunities: 52, placements: 18 },
  { month: 'Mar', opportunities: 48, placements: 15 },
  { month: 'Apr', opportunities: 61, placements: 22 },
  { month: 'May', opportunities: 58, placements: 25 },
  { month: 'Jun', opportunities: 67, placements: 28 }
];

export function StatisticsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReport, setSelectedReport] = useState('overview');

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`);
    alert(`Report generated successfully! Check your downloads folder.`);
  };

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Statistics & Reports</h2>
          <p className="text-slate-400">Comprehensive analytics and reporting dashboard</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="1month" className="text-white">Last Month</SelectItem>
              <SelectItem value="3months" className="text-white">Last 3 Months</SelectItem>
              <SelectItem value="6months" className="text-white">Last 6 Months</SelectItem>
              <SelectItem value="1year" className="text-white">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="overview" className="text-white">Overview Report</SelectItem>
              <SelectItem value="skills" className="text-white">Skills Analysis</SelectItem>
              <SelectItem value="companies" className="text-white">Company Report</SelectItem>
              <SelectItem value="training" className="text-white">Training Report</SelectItem>
              <SelectItem value="opportunities" className="text-white">Opportunities Report</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="text-2xl font-semibold text-white">1,234</p>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Training Completed</p>
                <p className="text-2xl font-semibold text-white">856</p>
                <p className="text-xs text-green-400">+8% from last month</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Job Placements</p>
                <p className="text-2xl font-semibold text-white">342</p>
                <p className="text-xs text-green-400">+15% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg. Satisfaction</p>
                <p className="text-2xl font-semibold text-white">4.5</p>
                <p className="text-xs text-green-400">+0.2 from last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="skills" className="text-white data-[state=active]:bg-blue-600">
            Skills Analysis
          </TabsTrigger>
          <TabsTrigger value="companies" className="text-white data-[state=active]:bg-blue-600">
            Company Status
          </TabsTrigger>
          <TabsTrigger value="training" className="text-white data-[state=active]:bg-blue-600">
            Training Progress
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="text-white data-[state=active]:bg-blue-600">
            Opportunities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Skills Gap Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Comparison of current vs desired skill levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="current" fill="#3b82f6" name="Current Level" />
                  <Bar dataKey="desired" fill="#10b981" name="Desired Level" />
                  <Bar dataKey="gap" fill="#f59e0b" name="Skills Gap" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Company Registration Status</CardTitle>
                <CardDescription className="text-slate-400">
                  Distribution of company registration statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={companyStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {companyStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Registration Summary</CardTitle>
                <CardDescription className="text-slate-400">
                  Quick overview of company registrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white">{item.name}</span>
                    </div>
                    <Badge style={{ backgroundColor: item.color }} className="text-white">
                      {item.value}
                    </Badge>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-600">
                  <p className="text-sm text-slate-400">
                    Total Companies: {companyStatusData.reduce((sum, item) => sum + item.value, 0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Training Progress & Satisfaction</CardTitle>
              <CardDescription className="text-slate-400">
                Monthly training completion rates and satisfaction scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trainingProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="enrolled" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="Enrolled"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stackId="1" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.8}
                    name="Completed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Opportunities & Placements Trend</CardTitle>
              <CardDescription className="text-slate-400">
                Monthly trends in job opportunities and successful placements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={opportunityTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="opportunities" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Opportunities"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="placements" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Placements"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}