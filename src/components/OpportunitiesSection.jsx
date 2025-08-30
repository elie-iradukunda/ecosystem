import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { Textarea } from './ui/textarea.jsx';
import { Badge } from './ui/badge.jsx';
import { Separator } from './ui/separator.jsx';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select.jsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog.jsx';

const sectors = [
  'Technology',
  'Healthcare',
  'Education',
  'Construction',
  'Manufacturing',
  'Finance',
  'Retail',
  'Tourism',
  'Agriculture',
  'Energy'
];

const levels = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'executive', label: 'Executive' }
];

const mockOpportunities = [
  {
    id: '1',
    name: 'React Developer',
    company: 'TechCorp Solutions',
    sector: 'Technology',
    level: 'mid',
    location: 'Remote',
    salary: '$60,000 - $80,000',
    positions: 3,
    description: 'We are looking for a skilled React developer to join our team and work on exciting projects.',
    requirements: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
    period: {
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      duration: '60 days'
    },
    status: 'active',
    applicants: 24
  },
  {
    id: '2',
    name: 'Construction Manager',
    company: 'BuildRight Construction',
    sector: 'Construction',
    level: 'senior',
    location: 'New York, NY',
    salary: '$75,000 - $95,000',
    positions: 1,
    description: 'Experienced construction manager needed to oversee large-scale residential projects.',
    requirements: ['Project Management', 'Construction Safety', 'Team Leadership', 'Budget Management'],
    period: {
      startDate: '2024-02-15',
      endDate: '2024-05-15',
      duration: '90 days'
    },
    status: 'active',
    applicants: 18
  },
  {
    id: '3',
    name: 'Registered Nurse',
    company: 'HealthCare Plus',
    sector: 'Healthcare',
    level: 'junior',
    location: 'Boston, MA',
    salary: '$55,000 - $70,000',
    positions: 5,
    description: 'Join our caring team of healthcare professionals in providing excellent patient care.',
    requirements: ['RN License', 'Patient Care', 'Medical Records', 'Emergency Response'],
    period: {
      startDate: '2024-03-15',
      endDate: '2024-06-15',
      duration: '90 days'
    },
    status: 'active',
    applicants: 42
  }
];

export function OpportunitiesSection() {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);

  const [newOpportunity, setNewOpportunity] = useState({
    name: '',
    company: '',
    sector: '',
    level: 'entry',
    location: '',
    salary: '',
    positions: 1,
    description: '',
    requirements: '',
    startDate: '',
    endDate: '',
    duration: ''
  });

  const [editOpportunity, setEditOpportunity] = useState({
    name: '',
    company: '',
    sector: '',
    level: 'entry',
    location: '',
    salary: '',
    positions: 1,
    description: '',
    requirements: '',
    startDate: '',
    endDate: '',
    duration: '',
    status: 'draft'
  });

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || opportunity.sector === sectorFilter;
    const matchesLevel = levelFilter === 'all' || opportunity.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || opportunity.status === statusFilter;
    
    return matchesSearch && matchesSector && matchesLevel && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'expired': return 'bg-red-600 text-white';
      case 'filled': return 'bg-blue-600 text-white';
      case 'draft': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'entry': return 'bg-green-100 text-green-800 border-green-200';
      case 'junior': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mid': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'senior': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'executive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddOpportunity = () => {
    if (!newOpportunity.name.trim() || !newOpportunity.company.trim()) {
      alert('Please fill in the opportunity name and company');
      return;
    }

    const opportunity = {
      id: Date.now().toString(),
      ...newOpportunity,
      requirements: newOpportunity.requirements.split(',').map(req => req.trim()).filter(req => req.length > 0),
      period: {
        startDate: newOpportunity.startDate,
        endDate: newOpportunity.endDate,
        duration: newOpportunity.duration
      },
      status: 'draft',
      applicants: 0
    };

    setOpportunities(prev => [...prev, opportunity]);
    setNewOpportunity({
      name: '',
      company: '',
      sector: '',
      level: 'entry',
      location: '',
      salary: '',
      positions: 1,
      description: '',
      requirements: '',
      startDate: '',
      endDate: '',
      duration: ''
    });
    setIsAddDialogOpen(false);
    alert('Opportunity added successfully!');
  };

  const handleDeleteOpportunity = (id) => {
    setOpportunities(prev => prev.filter(opp => opp.id !== id));
  };

  const viewOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsViewDialogOpen(true);
  };

  const editOpportunityHandler = (opportunity) => {
    setEditingOpportunity(opportunity);
    setEditOpportunity({
      name: opportunity.name,
      company: opportunity.company,
      sector: opportunity.sector,
      level: opportunity.level,
      location: opportunity.location,
      salary: opportunity.salary,
      positions: opportunity.positions,
      description: opportunity.description,
      requirements: Array.isArray(opportunity.requirements) ? opportunity.requirements.join(', ') : opportunity.requirements,
      startDate: opportunity.period.startDate,
      endDate: opportunity.period.endDate,
      duration: opportunity.period.duration,
      status: opportunity.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateOpportunity = () => {
    if (!editOpportunity.name.trim() || !editOpportunity.company.trim()) {
      alert('Please fill in the opportunity name and company');
      return;
    }

    const updatedOpportunity = {
      ...editingOpportunity,
      name: editOpportunity.name,
      company: editOpportunity.company,
      sector: editOpportunity.sector,
      level: editOpportunity.level,
      location: editOpportunity.location,
      salary: editOpportunity.salary,
      positions: editOpportunity.positions,
      description: editOpportunity.description,
      requirements: editOpportunity.requirements.split(',').map(req => req.trim()).filter(req => req.length > 0),
      period: {
        startDate: editOpportunity.startDate,
        endDate: editOpportunity.endDate,
        duration: editOpportunity.duration
      },
      status: editOpportunity.status
    };

    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === editingOpportunity.id ? updatedOpportunity : opp
      )
    );

    setEditOpportunity({
      name: '',
      company: '',
      sector: '',
      level: 'entry',
      location: '',
      salary: '',
      positions: 1,
      description: '',
      requirements: '',
      startDate: '',
      endDate: '',
      duration: '',
      status: 'draft'
    });
    setEditingOpportunity(null);
    setIsEditDialogOpen(false);
    alert('Opportunity updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Opportunities Management</h2>
          <p className="text-slate-400">Manage job opportunities with detailed tracking and analytics</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Opportunity</DialogTitle>
              <DialogDescription className="text-slate-400">
                Create a new job opportunity with detailed information
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="oppName" className="text-slate-300">Opportunity Name</Label>
                  <Input
                    id="oppName"
                    value={newOpportunity.name}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., React Developer"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="text-slate-300">Company</Label>
                  <Input
                    id="company"
                    value={newOpportunity.company}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., TechCorp Solutions"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sector" className="text-slate-300">Sector</Label>
                  <Select
                    value={newOpportunity.sector}
                    onValueChange={(value) => setNewOpportunity(prev => ({ ...prev, sector: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector} className="text-white">
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level" className="text-slate-300">Level</Label>
                  <Select
                    value={newOpportunity.level}
                    onValueChange={(value) => setNewOpportunity(prev => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value} className="text-white">
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="positions" className="text-slate-300">Number of Positions</Label>
                  <Input
                    id="positions"
                    type="number"
                    min="1"
                    value={newOpportunity.positions}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, positions: parseInt(e.target.value) || 1 }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="text-slate-300">Location</Label>
                  <Input
                    id="location"
                    value={newOpportunity.location}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., Remote, New York, NY"
                  />
                </div>
                
                <div>
                  <Label htmlFor="salary" className="text-slate-300">Salary Range</Label>
                  <Input
                    id="salary"
                    value={newOpportunity.salary}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, salary: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., $60,000 - $80,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-slate-300">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newOpportunity.startDate}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, startDate: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate" className="text-slate-300">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newOpportunity.endDate}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, endDate: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration" className="text-slate-300">Duration</Label>
                  <Input
                    id="duration"
                    value={newOpportunity.duration}
                    onChange={(e) => setNewOpportunity(prev => ({ ...prev, duration: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., 60 days"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-slate-300">Description</Label>
                <Textarea
                  id="description"
                  value={newOpportunity.description}
                  onChange={(e) => setNewOpportunity(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
                  placeholder="Detailed job description..."
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="text-slate-300">Requirements (comma-separated)</Label>
                <Textarea
                  id="requirements"
                  value={newOpportunity.requirements}
                  onChange={(e) => setNewOpportunity(prev => ({ ...prev, requirements: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="React, JavaScript, TypeScript, Node.js"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-600 text-slate-300">
                Cancel
              </Button>
              <Button onClick={handleAddOpportunity} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Opportunity
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Opportunity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Opportunity</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update opportunity information and settings
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editOppName" className="text-slate-300">Opportunity Name</Label>
                <Input
                  id="editOppName"
                  value={editOpportunity.name}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., React Developer"
                />
              </div>
              
              <div>
                <Label htmlFor="editCompany" className="text-slate-300">Company</Label>
                <Input
                  id="editCompany"
                  value={editOpportunity.company}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, company: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., TechCorp Solutions"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="editSector" className="text-slate-300">Sector</Label>
                <Select
                  value={editOpportunity.sector}
                  onValueChange={(value) => setEditOpportunity(prev => ({ ...prev, sector: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector} className="text-white">
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="editLevel" className="text-slate-300">Level</Label>
                <Select
                  value={editOpportunity.level}
                  onValueChange={(value) => setEditOpportunity(prev => ({ ...prev, level: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value} className="text-white">
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="editPositions" className="text-slate-300">Number of Positions</Label>
                <Input
                  id="editPositions"
                  type="number"
                  min="1"
                  value={editOpportunity.positions}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, positions: parseInt(e.target.value) || 1 }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editLocation" className="text-slate-300">Location</Label>
                <Input
                  id="editLocation"
                  value={editOpportunity.location}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., Remote, New York, NY"
                />
              </div>
              
              <div>
                <Label htmlFor="editSalary" className="text-slate-300">Salary Range</Label>
                <Input
                  id="editSalary"
                  value={editOpportunity.salary}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, salary: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., $60,000 - $80,000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="editStartDate" className="text-slate-300">Start Date</Label>
                <Input
                  id="editStartDate"
                  type="date"
                  value={editOpportunity.startDate}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, startDate: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="editEndDate" className="text-slate-300">End Date</Label>
                <Input
                  id="editEndDate"
                  type="date"
                  value={editOpportunity.endDate}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, endDate: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="editDuration" className="text-slate-300">Duration</Label>
                <Input
                  id="editDuration"
                  value={editOpportunity.duration}
                  onChange={(e) => setEditOpportunity(prev => ({ ...prev, duration: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., 60 days"
                />
              </div>

              <div>
                <Label htmlFor="editStatus" className="text-slate-300">Status</Label>
                <Select
                  value={editOpportunity.status}
                  onValueChange={(value) => setEditOpportunity(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="draft" className="text-white">Draft</SelectItem>
                    <SelectItem value="active" className="text-white">Active</SelectItem>
                    <SelectItem value="expired" className="text-white">Expired</SelectItem>
                    <SelectItem value="filled" className="text-white">Filled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="editDescription" className="text-slate-300">Description</Label>
              <Textarea
                id="editDescription"
                value={editOpportunity.description}
                onChange={(e) => setEditOpportunity(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
                placeholder="Detailed job description..."
              />
            </div>

            <div>
              <Label htmlFor="editRequirements" className="text-slate-300">Requirements (comma-separated)</Label>
              <Textarea
                id="editRequirements"
                value={editOpportunity.requirements}
                onChange={(e) => setEditOpportunity(prev => ({ ...prev, requirements: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1"
                placeholder="React, JavaScript, TypeScript, Node.js"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleUpdateOpportunity} className="bg-blue-600 hover:bg-blue-700 text-white">
              Update Opportunity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Opportunities</p>
                <p className="text-2xl font-semibold text-white">{opportunities.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-semibold text-green-400">
                  {opportunities.filter(o => o.status === 'active').length}
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
                <p className="text-sm text-slate-400">Total Positions</p>
                <p className="text-2xl font-semibold text-yellow-400">
                  {opportunities.reduce((sum, o) => sum + o.positions, 0)}
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
                <p className="text-sm text-slate-400">Total Applicants</p>
                <p className="text-2xl font-semibold text-purple-400">
                  {opportunities.reduce((sum, o) => sum + o.applicants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Job Opportunities</CardTitle>
              <CardDescription className="text-slate-400">
                Manage and track all job opportunities
              </CardDescription>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Sectors</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector} className="text-white">
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="text-white">
                    {level.label}
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
                <SelectItem value="active" className="text-white">Active</SelectItem>
                <SelectItem value="expired" className="text-white">Expired</SelectItem>
                <SelectItem value="filled" className="text-white">Filled</SelectItem>
                <SelectItem value="draft" className="text-white">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Opportunity</TableHead>
                <TableHead className="text-slate-300">Sector</TableHead>
                <TableHead className="text-slate-300">Level</TableHead>
                <TableHead className="text-slate-300">Positions</TableHead>
                <TableHead className="text-slate-300">Period</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Applicants</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id} className="border-slate-700">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{opportunity.name}</p>
                      <p className="text-slate-400 text-sm">{opportunity.company}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{opportunity.sector}</TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(opportunity.level)} variant="outline">
                      {levels.find(l => l.value === opportunity.level)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{opportunity.positions}</TableCell>
                  <TableCell className="text-slate-300 text-sm">
                    <div>
                      <p>{opportunity.period.startDate} - {opportunity.period.endDate}</p>
                      <p className="text-slate-500">{opportunity.period.duration}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{opportunity.applicants}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewOpportunity(opportunity)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editOpportunityHandler(opportunity)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOpportunity(opportunity.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Opportunity Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOpportunity && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">{selectedOpportunity.name}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {selectedOpportunity.company} • {selectedOpportunity.sector}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">{selectedOpportunity.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">{selectedOpportunity.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">{selectedOpportunity.positions} positions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">{selectedOpportunity.period.duration}</span>
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <h4 className="text-white font-medium mb-2">Description</h4>
                  <p className="text-slate-300">{selectedOpportunity.description}</p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Application Period</h4>
                  <p className="text-slate-300">
                    {selectedOpportunity.period.startDate} - {selectedOpportunity.period.endDate}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}