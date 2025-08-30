import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { Badge } from './ui/badge.jsx';
import { Building2, Search, Plus, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog.jsx';

const mockCompanies = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    registrationDate: '2024-01-15',
    status: 'registered',
    contact: 'john@techcorp.com'
  },
  {
    id: '2',
    name: 'BuildRight Construction',
    industry: 'Construction',
    registrationDate: '2024-02-20',
    status: 'pending',
    contact: 'mary@buildright.com'
  },
  {
    id: '3',
    name: 'HealthCare Plus',
    industry: 'Healthcare',
    registrationDate: '2024-02-28',
    status: 'registered',
    contact: 'info@healthcareplus.com'
  },
  {
    id: '4',
    name: 'EduTech Academy',
    industry: 'Education',
    registrationDate: '2024-03-05',
    status: 'pending',
    contact: 'admin@edutech.com'
  },
  {
    id: '5',
    name: 'Green Energy Ltd',
    industry: 'Energy',
    registrationDate: '2024-03-10',
    status: 'registered',
    contact: 'contact@greenenergy.com'
  }
];

export function CompanySection() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    contact: '',
    status: 'pending'
  });

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'registered':
        return 'bg-green-600 text-white';
      case 'pending':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const handleStatusChange = (companyId, newStatus) => {
    setCompanies(prev => 
      prev.map(company => 
        company.id === companyId ? { ...company, status: newStatus } : company
      )
    );
  };

  const registeredCount = companies.filter(c => c.status === 'registered').length;
  const pendingCount = companies.filter(c => c.status === 'pending').length;

  const handleAddCompany = () => {
    if (!newCompany.name.trim() || !newCompany.industry.trim() || !newCompany.contact.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const company = {
      id: Date.now().toString(),
      name: newCompany.name,
      industry: newCompany.industry,
      contact: newCompany.contact,
      registrationDate: new Date().toISOString().split('T')[0],
      status: newCompany.status
    };

    setCompanies(prev => [...prev, company]);
    setNewCompany({
      name: '',
      industry: '',
      contact: '',
      status: 'pending'
    });
    setIsAddDialogOpen(false);
    alert('Company added successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Company Management</h2>
        <p className="text-slate-400">Manage company registrations and track their status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Companies</p>
                <p className="text-2xl font-semibold text-white">{companies.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Registered</p>
                <p className="text-2xl font-semibold text-green-400">{registeredCount}</p>
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
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-semibold text-yellow-400">{pendingCount}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">⏳</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Companies</CardTitle>
              <CardDescription className="text-slate-400">
                View and manage all registered companies
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Company</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Register a new company in the system
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName" className="text-slate-300">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                      placeholder="e.g., TechCorp Solutions"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="industry" className="text-slate-300">Industry *</Label>
                    <Input
                      id="industry"
                      value={newCompany.industry}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, industry: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                      placeholder="e.g., Technology, Healthcare"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact" className="text-slate-300">Contact Email *</Label>
                    <Input
                      id="contact"
                      type="email"
                      value={newCompany.contact}
                      onChange={(e) => setNewCompany(prev => ({ ...prev, contact: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                      placeholder="e.g., info@company.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status" className="text-slate-300">Initial Status</Label>
                    <Select
                      value={newCompany.status}
                      onValueChange={(value) => setNewCompany(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="pending" className="text-white">Pending</SelectItem>
                        <SelectItem value="registered" className="text-white">Registered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-600 text-slate-300 bg-red-500">
                    Cancel
                  </Button>
                  <Button onClick={handleAddCompany} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Add Company
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                <SelectItem value="registered" className="text-white">Registered</SelectItem>
                <SelectItem value="pending" className="text-white">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Company Name</TableHead>
                <TableHead className="text-slate-300">Industry</TableHead>
                <TableHead className="text-slate-300">Registration Date</TableHead>
                <TableHead className="text-slate-300">Contact</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id} className="border-slate-700">
                  <TableCell className="text-white font-medium">{company.name}</TableCell>
                  <TableCell className="text-slate-300">{company.industry}</TableCell>
                  <TableCell className="text-slate-300">{company.registrationDate}</TableCell>
                  <TableCell className="text-slate-300">{company.contact}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(company.status)}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={company.status}
                      onValueChange={(value) => handleStatusChange(company.id, value)}
                    >
                      <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="registered" className="text-white">Registered</SelectItem>
                        <SelectItem value="pending" className="text-white">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}