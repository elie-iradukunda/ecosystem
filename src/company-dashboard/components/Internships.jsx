import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import { Switch } from '../../components/ui/switch.jsx';
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
  Users,
  Calendar,
  DollarSign,
  Building2,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock data for internship programs
const mockInternships = [
  {
    id: 1,
    name: 'Software Development Internship',
    type: 'Technical',
    level: 'Intermediate',
    sector: 'Technology',
    duration: '6 months',
    stipend: '$1,200/month',
    sponsorship: 'Full sponsorship',
    description: 'Hands-on experience in full-stack development with mentorship from senior developers.',
    requirements: ['Programming basics', 'Git knowledge', 'Problem-solving skills'],
    period: {
      startDate: '2024-06-01',
      endDate: '2024-11-30'
    },
    applicationOpen: true,
    deadline: '2024-05-15',
    applicants: 45,
    maxSlots: 10,
    status: 'active'
  },
  {
    id: 2,
    name: 'Digital Marketing Internship',
    type: 'Business',
    level: 'Beginner',
    sector: 'Marketing',
    duration: '4 months',
    stipend: '$800/month',
    sponsorship: 'Partial sponsorship',
    description: 'Learn digital marketing strategies including SEO, social media, and content marketing.',
    requirements: ['Basic computer skills', 'Communication skills', 'Creativity'],
    period: {
      startDate: '2024-05-01',
      endDate: '2024-08-31'
    },
    applicationOpen: true,
    deadline: '2024-04-20',
    applicants: 32,
    maxSlots: 5,
    status: 'active'
  },
  {
    id: 3,
    name: 'Data Science Internship',
    type: 'Technical',
    level: 'Advanced',
    sector: 'Technology',
    duration: '8 months',
    stipend: '$1,500/month',
    sponsorship: 'Full sponsorship',
    description: 'Work on real data science projects using Python, machine learning, and data visualization.',
    requirements: ['Python programming', 'Statistics knowledge', 'Mathematics background'],
    period: {
      startDate: '2024-07-01',
      endDate: '2025-02-28'
    },
    applicationOpen: false,
    deadline: '2024-06-01',
    applicants: 0,
    maxSlots: 3,
    status: 'draft'
  }
];

const internshipTypes = ['Technical', 'Business', 'Creative', 'Research', 'Operations'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const sectors = ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Education', 'Manufacturing'];
const sponsorshipTypes = ['Full sponsorship', 'Partial sponsorship', 'Unpaid', 'Stipend only'];

export function Internships() {
  const [internships, setInternships] = useState(mockInternships);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);

  const [newInternship, setNewInternship] = useState({
    name: '',
    type: 'Technical',
    level: 'Intermediate',
    sector: 'Technology',
    duration: '',
    stipend: '',
    sponsorship: 'Full sponsorship',
    description: '',
    requirements: '',
    startDate: '',
    endDate: '',
    deadline: '',
    maxSlots: 1,
    applicationOpen: true
  });

  const [editInternship, setEditInternship] = useState({
    name: '',
    type: 'Technical',
    level: 'Intermediate',
    sector: 'Technology',
    duration: '',
    stipend: '',
    sponsorship: 'Full sponsorship',
    description: '',
    requirements: '',
    startDate: '',
    endDate: '',
    deadline: '',
    maxSlots: 1,
    applicationOpen: true
  });

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || internship.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'draft': return 'bg-gray-600 text-white';
      case 'completed': return 'bg-blue-600 text-white';
      case 'cancelled': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddInternship = () => {
    const internship = {
      id: Date.now(),
      ...newInternship,
      requirements: newInternship.requirements.split('\n').filter(req => req.trim()),
      period: {
        startDate: newInternship.startDate,
        endDate: newInternship.endDate
      },
      applicants: 0,
      status: 'draft'
    };

    setInternships(prev => [...prev, internship]);
    setNewInternship({
      name: '',
      type: 'Technical',
      level: 'Intermediate',
      sector: 'Technology',
      duration: '',
      stipend: '',
      sponsorship: 'Full sponsorship',
      description: '',
      requirements: '',
      startDate: '',
      endDate: '',
      deadline: '',
      maxSlots: 1,
      applicationOpen: true
    });
    setIsAddDialogOpen(false);
  };

  const handleEditInternship = (internship) => {
    setEditingInternship(internship);
    setEditInternship({
      name: internship.name,
      type: internship.type,
      level: internship.level,
      sector: internship.sector,
      duration: internship.duration,
      stipend: internship.stipend,
      sponsorship: internship.sponsorship,
      description: internship.description,
      requirements: internship.requirements.join('\n'),
      startDate: internship.period.startDate,
      endDate: internship.period.endDate,
      deadline: internship.deadline,
      maxSlots: internship.maxSlots,
      applicationOpen: internship.applicationOpen
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateInternship = () => {
    const updatedInternship = {
      ...editingInternship,
      name: editInternship.name,
      type: editInternship.type,
      level: editInternship.level,
      sector: editInternship.sector,
      duration: editInternship.duration,
      stipend: editInternship.stipend,
      sponsorship: editInternship.sponsorship,
      description: editInternship.description,
      requirements: editInternship.requirements.split('\n').filter(req => req.trim()),
      period: {
        startDate: editInternship.startDate,
        endDate: editInternship.endDate
      },
      deadline: editInternship.deadline,
      maxSlots: editInternship.maxSlots,
      applicationOpen: editInternship.applicationOpen
    };

    setInternships(prev => prev.map(int => int.id === editingInternship.id ? updatedInternship : int));
    setIsEditDialogOpen(false);
    setEditingInternship(null);
  };

  const handleDeleteInternship = (id) => {
    setInternships(prev => prev.filter(int => int.id !== id));
  };

  const toggleApplicationStatus = (id) => {
    setInternships(prev => prev.map(int => 
      int.id === id ? { ...int, applicationOpen: !int.applicationOpen } : int
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-2">Internship Programs</h2>
          <p className="text-slate-400">Manage your internship offerings and applications</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Internship</DialogTitle>
              <DialogDescription className="text-slate-400">
                Set up a new internship program for your company
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="internshipName" className="text-slate-300">Internship Name</Label>
                  <Input
                    id="internshipName"
                    value={newInternship.name}
                    onChange={(e) => setNewInternship(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., Software Development Internship"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration" className="text-slate-300">Duration</Label>
                  <Input
                    id="duration"
                    value={newInternship.duration}
                    onChange={(e) => setNewInternship(prev => ({ ...prev, duration: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., 6 months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type" className="text-slate-300">Type</Label>
                  <Select
                    value={newInternship.type}
                    onValueChange={(value) => setNewInternship(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {internshipTypes.map((type) => (
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
                    value={newInternship.level}
                    onValueChange={(value) => setNewInternship(prev => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {levels.map((level) => (
                        <SelectItem key={level} value={level} className="text-white">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sector" className="text-slate-300">Sector</Label>
                  <Select
                    value={newInternship.sector}
                    onValueChange={(value) => setNewInternship(prev => ({ ...prev, sector: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stipend" className="text-slate-300">Stipend</Label>
                  <Input
                    id="stipend"
                    value={newInternship.stipend}
                    onChange={(e) => setNewInternship(prev => ({ ...prev, stipend: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="e.g., $1,200/month"
                  />
                </div>
                
                <div>
                  <Label htmlFor="sponsorship" className="text-slate-300">Sponsorship</Label>
                  <Select
                    value={newInternship.sponsorship}
                    onValueChange={(value) => setNewInternship(prev => ({ ...prev, sponsorship: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {sponsorshipTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-slate-300">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newInternship.startDate}
                    onChange={(e) => setNewInternship(prev => ({ ...prev, startDate: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate" className="text-slate-300">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newInternship.endDate}
                    onChange={(e) => setNewInternship(prev => ({ ...prev, endDate: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="deadline" className="text-slate-300">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newInternship.deadline}
                    onChange={(e) => setNewInternship(prev => ({ ...prev, deadline: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxSlots" className="text-slate-300">Maximum Slots</Label>
                  <Input
                    id="maxSlots"
                    type="number"
                    min="1"
                    value={newInternship.maxSlots}
                    onChange={(e) => setNewInternship(prev => ({ ...prev, maxSlots: parseInt(e.target.value) || 1 }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mt-6">
                  <Switch
                    id="applicationOpen"
                    checked={newInternship.applicationOpen}
                    onCheckedChange={(checked) => setNewInternship(prev => ({ ...prev, applicationOpen: checked }))}
                  />
                  <Label htmlFor="applicationOpen" className="text-slate-300">
                    Applications Open
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-slate-300">Description</Label>
                <Textarea
                  id="description"
                  value={newInternship.description}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
                  placeholder="Describe the internship program, learning objectives, and what interns will gain..."
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="text-slate-300">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  value={newInternship.requirements}
                  onChange={(e) => setNewInternship(prev => ({ ...prev, requirements: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="Programming basics&#10;Git knowledge&#10;Problem-solving skills"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-600 text-slate-300">
                Cancel
              </Button>
              <Button onClick={handleAddInternship} className="bg-green-600 hover:bg-green-700 text-white">
                Create Internship
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
                <p className="text-sm text-slate-400">Total Programs</p>
                <p className="text-2xl font-semibold text-white">{internships.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Programs</p>
                <p className="text-2xl font-semibold text-green-400">
                  {internships.filter(int => int.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Available Slots</p>
                <p className="text-2xl font-semibold text-yellow-400">
                  {internships.reduce((sum, int) => sum + int.maxSlots, 0)}
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
                <p className="text-sm text-slate-400">Applications</p>
                <p className="text-2xl font-semibold text-purple-400">
                  {internships.reduce((sum, int) => sum + int.applicants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Internships Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Internship Programs</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your internship offerings and track applications
              </CardDescription>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search internships..."
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
                <SelectItem value="draft" className="text-white">Draft</SelectItem>
                <SelectItem value="completed" className="text-white">Completed</SelectItem>
                <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Program Name</TableHead>
                <TableHead className="text-slate-300">Type & Level</TableHead>
                <TableHead className="text-slate-300">Duration</TableHead>
                <TableHead className="text-slate-300">Stipend</TableHead>
                <TableHead className="text-slate-300">Applications</TableHead>
                <TableHead className="text-slate-300">Deadline</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInternships.map((internship) => (
                <TableRow key={internship.id} className="border-slate-700">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{internship.name}</p>
                      <p className="text-slate-400 text-sm">{internship.sector}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {internship.type}
                      </Badge>
                      <Badge className={getLevelColor(internship.level)} variant="outline">
                        {internship.level}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{internship.duration}</TableCell>
                  <TableCell className="text-slate-300">{internship.stipend}</TableCell>
                  <TableCell className="text-slate-300">
                    {internship.applicants}/{internship.maxSlots}
                  </TableCell>
                  <TableCell className="text-slate-300">{internship.deadline}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(internship.status)}>
                        {internship.status}
                      </Badge>
                      {internship.applicationOpen ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
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
                        onClick={() => handleEditInternship(internship)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleApplicationStatus(internship.id)}
                        className="text-purple-400 hover:text-purple-300"
                        title={internship.applicationOpen ? 'Close Applications' : 'Open Applications'}
                      >
                        {internship.applicationOpen ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteInternship(internship.id)}
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

      {/* Edit Internship Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Internship Program</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update internship program details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editInternshipName" className="text-slate-300">Internship Name</Label>
                <Input
                  id="editInternshipName"
                  value={editInternship.name}
                  onChange={(e) => setEditInternship(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="editDuration" className="text-slate-300">Duration</Label>
                <Input
                  id="editDuration"
                  value={editInternship.duration}
                  onChange={(e) => setEditInternship(prev => ({ ...prev, duration: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="editDescription" className="text-slate-300">Description</Label>
              <Textarea
                id="editDescription"
                value={editInternship.description}
                onChange={(e) => setEditInternship(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleUpdateInternship} className="bg-green-600 hover:bg-green-700 text-white">
              Update Internship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}