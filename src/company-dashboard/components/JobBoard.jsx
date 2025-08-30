import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Badge } from '../../components/ui/badge.jsx';
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
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Clock
} from 'lucide-react';

// Mock data for job postings
const mockJobs = [
  {
    id: 1,
    name: 'Senior React Developer',
    type: 'Full-time',
    level: 'Senior',
    location: 'Remote',
    salary: '$80,000 - $120,000',
    positions: 2,
    skillsRequired: ['React', 'TypeScript', 'Node.js', 'AWS'],
    qualifications: ['Bachelor\'s degree in Computer Science', '5+ years React experience'],
    description: 'We are looking for a senior React developer to lead our frontend development team.',
    applicationLink: 'https://techcorp.com/jobs/senior-react-dev',
    period: {
      startDate: '2024-03-01',
      endDate: '2024-05-01'
    },
    status: 'active',
    applicants: 24,
    postedDate: '2024-03-01'
  },
  {
    id: 2,
    name: 'DevOps Engineer',
    type: 'Full-time',
    level: 'Mid-level',
    location: 'New York, NY',
    salary: '$70,000 - $95,000',
    positions: 1,
    skillsRequired: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    qualifications: ['Bachelor\'s degree', '3+ years DevOps experience', 'AWS Certification preferred'],
    description: 'Join our infrastructure team to improve our deployment and monitoring systems.',
    applicationLink: 'https://techcorp.com/jobs/devops-engineer',
    period: {
      startDate: '2024-02-15',
      endDate: '2024-04-15'
    },
    status: 'active',
    applicants: 18,
    postedDate: '2024-02-15'
  }
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const jobLevels = ['Entry', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Principal'];

export function JobBoard() {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const [newJob, setNewJob] = useState({
    name: '',
    type: 'Full-time',
    level: 'Mid-level',
    location: '',
    salary: '',
    positions: 1,
    skillsRequired: '',
    qualifications: '',
    description: '',
    applicationLink: '',
    startDate: '',
    endDate: ''
  });

  const [editJob, setEditJob] = useState({
    name: '',
    type: 'Full-time',
    level: 'Mid-level',
    location: '',
    salary: '',
    positions: 1,
    skillsRequired: '',
    qualifications: '',
    description: '',
    applicationLink: '',
    startDate: '',
    endDate: ''
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'paused': return 'bg-yellow-600 text-white';
      case 'closed': return 'bg-red-600 text-white';
      case 'draft': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Entry': return 'bg-green-100 text-green-800 border-green-200';
      case 'Junior': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Mid-level': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Senior': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Lead': return 'bg-red-100 text-red-800 border-red-200';
      case 'Principal': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddJob = () => {
    const job = {
      id: Date.now(),
      ...newJob,
      skillsRequired: newJob.skillsRequired.split(',').map(skill => skill.trim()),
      qualifications: newJob.qualifications.split('\n').filter(qual => qual.trim()),
      period: {
        startDate: newJob.startDate,
        endDate: newJob.endDate
      },
      status: 'draft',
      applicants: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };

    setJobs(prev => [...prev, job]);
    setNewJob({
      name: '',
      type: 'Full-time',
      level: 'Mid-level',
      location: '',
      salary: '',
      positions: 1,
      skillsRequired: '',
      qualifications: '',
      description: '',
      applicationLink: '',
      startDate: '',
      endDate: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setEditJob({
      name: job.name,
      type: job.type,
      level: job.level,
      location: job.location,
      salary: job.salary,
      positions: job.positions,
      skillsRequired: job.skillsRequired.join(', '),
      qualifications: job.qualifications.join('\n'),
      description: job.description,
      applicationLink: job.applicationLink,
      startDate: job.period.startDate,
      endDate: job.period.endDate
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateJob = () => {
    const updatedJob = {
      ...editingJob,
      name: editJob.name,
      type: editJob.type,
      level: editJob.level,
      location: editJob.location,
      salary: editJob.salary,
      positions: editJob.positions,
      skillsRequired: editJob.skillsRequired.split(',').map(skill => skill.trim()),
      qualifications: editJob.qualifications.split('\n').filter(qual => qual.trim()),
      description: editJob.description,
      applicationLink: editJob.applicationLink,
      period: {
        startDate: editJob.startDate,
        endDate: editJob.endDate
      }
    };

    setJobs(prev => prev.map(job => job.id === editingJob.id ? updatedJob : job));
    setIsEditDialogOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-2">Job Board</h2>
          <p className="text-slate-400">Manage your job postings and applications</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Post New Job</DialogTitle>
              <DialogDescription className="text-slate-400">
                Create a new job posting for your company
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobName" className="text-slate-300">Job Title</Label>
                  <Input
                    id="jobName"
                    value={newJob.name}
                    onChange={(e) => setNewJob(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., Senior React Developer"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-slate-300">Location</Label>
                  <Input
                    id="location"
                    value={newJob.location}
                    onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., Remote, New York, NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type" className="text-slate-300">Job Type</Label>
                  <Select
                    value={newJob.type}
                    onValueChange={(value) => setNewJob(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level" className="text-slate-300">Level</Label>
                  <Select
                    value={newJob.level}
                    onValueChange={(value) => setNewJob(prev => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {jobLevels.map((level) => (
                        <SelectItem key={level} value={level} className="text-white">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="positions" className="text-slate-300">Positions Available</Label>
                  <Input
                    id="positions"
                    type="number"
                    min="1"
                    value={newJob.positions}
                    onChange={(e) => setNewJob(prev => ({ ...prev, positions: parseInt(e.target.value) || 1 }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary" className="text-slate-300">Salary Range</Label>
                  <Input
                    id="salary"
                    value={newJob.salary}
                    onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., $70,000 - $90,000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="applicationLink" className="text-slate-300">Application Link</Label>
                  <Input
                    id="applicationLink"
                    value={newJob.applicationLink}
                    onChange={(e) => setNewJob(prev => ({ ...prev, applicationLink: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="https://company.com/apply"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-slate-300">Application Period Start</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newJob.startDate}
                    onChange={(e) => setNewJob(prev => ({ ...prev, startDate: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate" className="text-slate-300">Application Period End</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newJob.endDate}
                    onChange={(e) => setNewJob(prev => ({ ...prev, endDate: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-slate-300">Job Description</Label>
                <Textarea
                  id="description"
                  value={newJob.description}
                  onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
                  placeholder="Detailed job description, responsibilities, and requirements..."
                />
              </div>

              <div>
                <Label htmlFor="skillsRequired" className="text-slate-300">Skills Required (comma-separated)</Label>
                <Textarea
                  id="skillsRequired"
                  value={newJob.skillsRequired}
                  onChange={(e) => setNewJob(prev => ({ ...prev, skillsRequired: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="React, TypeScript, Node.js, AWS"
                />
              </div>

              <div>
                <Label htmlFor="qualifications" className="text-slate-300">Qualifications (one per line)</Label>
                <Textarea
                  id="qualifications"
                  value={newJob.qualifications}
                  onChange={(e) => setNewJob(prev => ({ ...prev, qualifications: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="Bachelor's degree in Computer Science&#10;5+ years of experience with React&#10;Strong problem-solving skills"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-600 text-slate-300">
                Cancel
              </Button>
              <Button onClick={handleAddJob} className="bg-green-600 hover:bg-green-700 text-white">
                Post Job
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
                <p className="text-sm text-slate-400">Total Jobs</p>
                <p className="text-2xl font-semibold text-white">{jobs.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Postings</p>
                <p className="text-2xl font-semibold text-green-400">
                  {jobs.filter(job => job.status === 'active').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Open Positions</p>
                <p className="text-2xl font-semibold text-yellow-400">
                  {jobs.reduce((sum, job) => sum + job.positions, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Applications</p>
                <p className="text-2xl font-semibold text-purple-400">
                  {jobs.reduce((sum, job) => sum + job.applicants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Job Postings</CardTitle>
              <CardDescription className="text-slate-400">
                Manage and track all your job postings
              </CardDescription>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                <SelectItem value="active" className="text-white">Active</SelectItem>
                <SelectItem value="paused" className="text-white">Paused</SelectItem>
                <SelectItem value="closed" className="text-white">Closed</SelectItem>
                <SelectItem value="draft" className="text-white">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Job Title</TableHead>
                <TableHead className="text-slate-300">Type & Level</TableHead>
                <TableHead className="text-slate-300">Location</TableHead>
                <TableHead className="text-slate-300">Positions</TableHead>
                <TableHead className="text-slate-300">Applications</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Period</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} className="border-slate-700">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{job.name}</p>
                      <p className="text-slate-400 text-sm">{job.salary}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {job.type}
                      </Badge>
                      <Badge className={getLevelColor(job.level)} variant="outline">
                        {job.level}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{job.location}</TableCell>
                  <TableCell className="text-slate-300">{job.positions}</TableCell>
                  <TableCell className="text-slate-300">{job.applicants}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">
                    <div>
                      <p>{job.period.startDate}</p>
                      <p className="text-slate-500">to {job.period.endDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditJob(job)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(job.applicationLink, '_blank')}
                        className="text-green-400 hover:text-green-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Job Posting</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update job posting details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Same form fields as add dialog, but using editJob state */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editJobName" className="text-slate-300">Job Title</Label>
                <Input
                  id="editJobName"
                  value={editJob.name}
                  onChange={(e) => setEditJob(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="editLocation" className="text-slate-300">Location</Label>
                <Input
                  id="editLocation"
                  value={editJob.location}
                  onChange={(e) => setEditJob(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="editDescription" className="text-slate-300">Job Description</Label>
              <Textarea
                id="editDescription"
                value={editJob.description}
                onChange={(e) => setEditJob(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleUpdateJob} className="bg-green-600 hover:bg-green-700 text-white">
              Update Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}