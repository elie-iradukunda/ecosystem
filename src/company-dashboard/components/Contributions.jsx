import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.jsx';
import { 
  Plus, 
  Search, 
  Download, 
  Eye, 
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Building2,
  Target,
  Award
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for reports and contributions
const mockReports = [
  {
    id: 1,
    title: 'Q1 2024 Skills Development Impact Report',
    type: 'Impact Report',
    category: 'Skills Development',
    description: 'Comprehensive analysis of our training programs\' impact on employee performance and career advancement.',
    createdDate: '2024-03-31',
    status: 'published',
    downloads: 156,
    views: 892,
    summary: {
      traineesImpacted: 245,
      programsCompleted: 18,
      skillsAcquired: 78,
      promotions: 34
    }
  },
  {
    id: 2,
    title: 'Technology Sector Hiring Trends 2024',
    type: 'Market Analysis',
    category: 'Industry Insights',
    description: 'Analysis of hiring patterns, skill demands, and salary trends in the technology sector.',
    createdDate: '2024-03-15',
    status: 'published',
    downloads: 298,
    views: 1250,
    summary: {
      companiesSurveyed: 150,
      jobPostingsAnalyzed: 2500,
      skillsIdentified: 95,
      averageSalaryIncrease: '12%'
    }
  },
  {
    id: 3,
    title: 'Internship Program Effectiveness Study',
    type: 'Program Evaluation',
    category: 'Education',
    description: 'Evaluation of our internship programs and their contribution to bridging the skills gap.',
    createdDate: '2024-02-28',
    status: 'draft',
    downloads: 0,
    views: 45,
    summary: {
      internsParticipated: 89,
      conversionRate: '78%',
      skillsImproved: 65,
      mentorsSatisfaction: '94%'
    }
  }
];

// Mock data for charts
const monthlyImpactData = [
  { month: 'Jan', trainees: 45, programs: 8, skills: 23 },
  { month: 'Feb', trainees: 62, programs: 12, skills: 31 },
  { month: 'Mar', trainees: 78, programs: 15, skills: 42 },
  { month: 'Apr', trainees: 84, programs: 18, skills: 48 },
  { month: 'May', trainees: 95, programs: 22, skills: 55 },
  { month: 'Jun', trainees: 103, programs: 25, skills: 61 }
];

const sectorContributionData = [
  { sector: 'Technology', value: 40, color: '#3b82f6' },
  { sector: 'Healthcare', value: 25, color: '#10b981' },
  { sector: 'Finance', value: 20, color: '#f59e0b' },
  { sector: 'Education', value: 15, color: '#ef4444' }
];

const reportTypes = ['Impact Report', 'Market Analysis', 'Program Evaluation', 'Research Study', 'White Paper'];
const categories = ['Skills Development', 'Industry Insights', 'Education', 'Training Programs', 'Market Research'];

export function Contributions() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newReport, setNewReport] = useState({
    title: '',
    type: 'Impact Report',
    category: 'Skills Development',
    description: '',
    content: '',
    keyFindings: '',
    recommendations: ''
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-600 text-white';
      case 'draft': return 'bg-yellow-600 text-white';
      case 'review': return 'bg-blue-600 text-white';
      case 'archived': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Impact Report': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Market Analysis': return 'bg-green-100 text-green-800 border-green-200';
      case 'Program Evaluation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Research Study': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'White Paper': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddReport = () => {
    const report = {
      id: Date.now(),
      ...newReport,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      downloads: 0,
      views: 0,
      summary: {
        traineesImpacted: 0,
        programsCompleted: 0,
        skillsAcquired: 0,
        promotions: 0
      }
    };

    setReports(prev => [...prev, report]);
    setNewReport({
      title: '',
      type: 'Impact Report',
      category: 'Skills Development',
      description: '',
      content: '',
      keyFindings: '',
      recommendations: ''
    });
    setIsAddDialogOpen(false);
  };

  const viewReport = (report) => {
    setSelectedReport(report);
    setIsViewDialogOpen(true);
  };

  const publishReport = (id) => {
    setReports(prev => prev.map(report => 
      report.id === id ? { ...report, status: 'published' } : report
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-2">Contributions & Reports</h2>
          <p className="text-slate-400">Track your contributions to the TVET ecosystem and generate impact reports</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Report</DialogTitle>
              <DialogDescription className="text-slate-400">
                Document your contributions and impact in the TVET ecosystem
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="reportTitle" className="text-slate-300">Report Title</Label>
                <Input
                  id="reportTitle"
                  value={newReport.title}
                  onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., Q1 2024 Skills Development Impact Report"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className="text-slate-300">Report Type</Label>
                  <Select
                    value={newReport.type}
                    onValueChange={(value) => setNewReport(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {reportTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category" className="text-slate-300">Category</Label>
                  <Select
                    value={newReport.category}
                    onValueChange={(value) => setNewReport(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-slate-300">Description</Label>
                <Textarea
                  id="description"
                  value={newReport.description}
                  onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="Brief description of the report contents and purpose..."
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-slate-300">Report Content</Label>
                <Textarea
                  id="content"
                  value={newReport.content}
                  onChange={(e) => setNewReport(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[150px]"
                  placeholder="Main content of your report including methodology, data analysis, and observations..."
                />
              </div>

              <div>
                <Label htmlFor="keyFindings" className="text-slate-300">Key Findings</Label>
                <Textarea
                  id="keyFindings"
                  value={newReport.keyFindings}
                  onChange={(e) => setNewReport(prev => ({ ...prev, keyFindings: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="List the most important findings and insights from your analysis..."
                />
              </div>

              <div>
                <Label htmlFor="recommendations" className="text-slate-300">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  value={newReport.recommendations}
                  onChange={(e) => setNewReport(prev => ({ ...prev, recommendations: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="Provide actionable recommendations based on your findings..."
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-600 text-slate-300">
                Cancel
              </Button>
              <Button onClick={handleAddReport} className="bg-green-600 hover:bg-green-700 text-white">
                Create Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Reports</p>
                <p className="text-2xl font-semibold text-white">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Published</p>
                <p className="text-2xl font-semibold text-green-400">
                  {reports.filter(report => report.status === 'published').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Downloads</p>
                <p className="text-2xl font-semibold text-blue-400">
                  {reports.reduce((sum, report) => sum + report.downloads, 0)}
                </p>
              </div>
              <Download className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Views</p>
                <p className="text-2xl font-semibold text-purple-400">
                  {reports.reduce((sum, report) => sum + report.views, 0)}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="reports" className="text-slate-300">Reports</TabsTrigger>
          <TabsTrigger value="analytics" className="text-slate-300">Impact Analytics</TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Contribution Reports</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage and track your reports and contributions
                  </CardDescription>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white">All Types</SelectItem>
                    {reportTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-white">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white">All Status</SelectItem>
                    <SelectItem value="published" className="text-white">Published</SelectItem>
                    <SelectItem value="draft" className="text-white">Draft</SelectItem>
                    <SelectItem value="review" className="text-white">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Report Title</TableHead>
                    <TableHead className="text-slate-300">Type</TableHead>
                    <TableHead className="text-slate-300">Category</TableHead>
                    <TableHead className="text-slate-300">Created</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Views</TableHead>
                    <TableHead className="text-slate-300">Downloads</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="border-slate-700">
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">{report.title}</p>
                          <p className="text-slate-400 text-sm line-clamp-1">{report.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(report.type)} variant="outline">
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{report.category}</TableCell>
                      <TableCell className="text-slate-300">{report.createdDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{report.views}</TableCell>
                      <TableCell className="text-slate-300">{report.downloads}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewReport(report)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-400 hover:text-green-300"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {report.status === 'draft' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => publishReport(report.id)}
                              className="text-yellow-400 hover:text-yellow-300"
                              title="Publish Report"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Impact Chart */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Monthly Impact Metrics</CardTitle>
                <CardDescription className="text-slate-400">
                  Track your monthly contribution impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyImpactData}>
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
                      <Line 
                        type="monotone" 
                        dataKey="trainees" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Trainees Impacted"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="programs" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Programs"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="skills" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Skills Developed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sector Contribution */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Contribution by Sector</CardTitle>
                <CardDescription className="text-slate-400">
                  Distribution of your contributions across sectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorContributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sectorContributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {sectorContributionData.map((sector, index) => (
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

            {/* Key Metrics */}
            <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Impact Summary</CardTitle>
                <CardDescription className="text-slate-400">
                  Overall impact of your contributions to the TVET ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-white">579</p>
                    <p className="text-slate-400 text-sm">Total Trainees Impacted</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-white">43</p>
                    <p className="text-slate-400 text-sm">Programs Completed</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-white">156</p>
                    <p className="text-slate-400 text-sm">Skills Developed</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-white">89</p>
                    <p className="text-slate-400 text-sm">Career Advancements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Report Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getTypeColor(selectedReport.type)} variant="outline">
                    {selectedReport.type}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {selectedReport.category}
                  </Badge>
                  <Badge className={getStatusColor(selectedReport.status)}>
                    {selectedReport.status}
                  </Badge>
                </div>
                <DialogTitle className="text-white text-xl">{selectedReport.title}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Created on {selectedReport.createdDate} • {selectedReport.views} views • {selectedReport.downloads} downloads
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Description</h3>
                  <p className="text-slate-300">{selectedReport.description}</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Impact Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedReport.summary).map(([key, value]) => (
                      <div key={key} className="bg-slate-700 rounded-lg p-3 text-center">
                        <p className="text-lg font-semibold text-white">{value}</p>
                        <p className="text-slate-400 text-xs capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}