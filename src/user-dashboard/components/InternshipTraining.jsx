import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
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
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Building2, 
  MapPin, 
  Users,
  ExternalLink,
  BookOpen,
  Target
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.jsx';

// Mock data for available internships and training programs
const availableInternships = [
  {
    id: 1,
    name: 'Software Development Internship',
    company: 'TechCorp Solutions',
    type: 'Internship',
    sector: 'Technology',
    level: 'Intermediate',
    duration: '6 months',
    stipend: '$800/month',
    location: 'Remote',
    deadline: '2024-04-30',
    description: 'Work with our development team on real-world projects using React, Node.js, and cloud technologies.',
    requirements: ['JavaScript', 'React', 'Git'],
    status: 'open'
  },
  {
    id: 2,
    name: 'Digital Marketing Training Program',
    company: 'Marketing Hub',
    type: 'Training',
    sector: 'Marketing',
    level: 'Beginner',
    duration: '3 months',
    stipend: 'Unpaid',
    location: 'New York, NY',
    deadline: '2024-05-15',
    description: 'Comprehensive training in digital marketing strategies, SEO, and social media management.',
    requirements: ['Basic Computer Skills', 'Communication'],
    status: 'open'
  },
  {
    id: 3,
    name: 'Healthcare Assistant Training',
    company: 'HealthCare Plus',
    type: 'Training',
    sector: 'Healthcare',
    level: 'Entry',
    duration: '4 months',
    stipend: '$600/month',
    location: 'Boston, MA',
    deadline: '2024-04-20',
    description: 'Learn essential healthcare assistance skills including patient care and medical record management.',
    requirements: ['High School Diploma', 'CPR Certification'],
    status: 'open'
  }
];

const myApplications = [
  {
    id: 1,
    programId: 1,
    name: 'Software Development Internship',
    company: 'TechCorp Solutions',
    appliedDate: '2024-03-15',
    status: 'under_review',
    nextStep: 'Technical Interview'
  },
  {
    id: 2,
    programId: 2,
    name: 'Digital Marketing Training Program',
    company: 'Marketing Hub',
    appliedDate: '2024-03-10',
    status: 'accepted',
    nextStep: 'Orientation - March 25'
  }
];

const completedPrograms = [
  {
    id: 1,
    name: 'Web Development Bootcamp',
    company: 'CodeAcademy',
    type: 'Training',
    duration: '12 weeks',
    completedDate: '2024-02-15',
    grade: 'A',
    certificate: 'Available'
  }
];

export function InternshipTraining() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredPrograms = availableInternships.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || program.sector === sectorFilter;
    const matchesType = typeFilter === 'all' || program.type === typeFilter;
    const matchesLevel = levelFilter === 'all' || program.level === levelFilter;
    
    return matchesSearch && matchesSector && matchesType && matchesLevel;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-600 text-white';
      case 'under_review': return 'bg-yellow-600 text-white';
      case 'rejected': return 'bg-red-600 text-white';
      case 'pending': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Entry': return 'bg-green-100 text-green-800 border-green-200';
      case 'Beginner': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermediate': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-white mb-2">Internship & Training</h2>
        <p className="text-slate-400">Discover and apply for internships and training programs</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Available Programs</p>
                <p className="text-2xl font-semibold text-white">{availableInternships.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">My Applications</p>
                <p className="text-2xl font-semibold text-yellow-400">{myApplications.length}</p>
              </div>
              <Target className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-semibold text-green-400">{completedPrograms.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p className="text-2xl font-semibold text-purple-400">75%</p>
              </div>
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="available" className="text-slate-300">Available Programs</TabsTrigger>
          <TabsTrigger value="applications" className="text-slate-300">My Applications</TabsTrigger>
          <TabsTrigger value="completed" className="text-slate-300">Completed</TabsTrigger>
        </TabsList>

        {/* Available Programs Tab */}
        <TabsContent value="available">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Available Programs</CardTitle>
                  <CardDescription className="text-slate-400">
                    Browse and apply for internships and training opportunities
                  </CardDescription>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search programs..."
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
                    <SelectItem value="Technology" className="text-white">Technology</SelectItem>
                    <SelectItem value="Healthcare" className="text-white">Healthcare</SelectItem>
                    <SelectItem value="Marketing" className="text-white">Marketing</SelectItem>
                    <SelectItem value="Finance" className="text-white">Finance</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white">All Types</SelectItem>
                    <SelectItem value="Internship" className="text-white">Internship</SelectItem>
                    <SelectItem value="Training" className="text-white">Training</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white">All Levels</SelectItem>
                    <SelectItem value="Entry" className="text-white">Entry</SelectItem>
                    <SelectItem value="Beginner" className="text-white">Beginner</SelectItem>
                    <SelectItem value="Intermediate" className="text-white">Intermediate</SelectItem>
                    <SelectItem value="Advanced" className="text-white">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {filteredPrograms.map((program) => (
                  <div key={program.id} className="bg-slate-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{program.name}</h3>
                        <div className="flex items-center space-x-4 text-slate-300 mb-2">
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4" />
                            <span>{program.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{program.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{program.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className="bg-blue-600 text-white">{program.type}</Badge>
                          <Badge className={getLevelColor(program.level)} variant="outline">
                            {program.level}
                          </Badge>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {program.sector}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">{program.stipend}</p>
                        <p className="text-slate-400 text-sm">Deadline: {program.deadline}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mb-4">{program.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-slate-300 font-medium mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Apply by {program.deadline}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="border-slate-600 text-slate-300">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Applications Tab */}
        <TabsContent value="applications">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">My Applications</CardTitle>
              <CardDescription className="text-slate-400">
                Track the status of your applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Program</TableHead>
                    <TableHead className="text-slate-300">Company</TableHead>
                    <TableHead className="text-slate-300">Applied Date</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Next Step</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myApplications.map((application) => (
                    <TableRow key={application.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">{application.name}</TableCell>
                      <TableCell className="text-slate-300">{application.company}</TableCell>
                      <TableCell className="text-slate-300">{application.appliedDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{application.nextStep}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Programs Tab */}
        <TabsContent value="completed">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Completed Programs</CardTitle>
              <CardDescription className="text-slate-400">
                Your completed internships and training programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Program</TableHead>
                    <TableHead className="text-slate-300">Company</TableHead>
                    <TableHead className="text-slate-300">Type</TableHead>
                    <TableHead className="text-slate-300">Duration</TableHead>
                    <TableHead className="text-slate-300">Completed</TableHead>
                    <TableHead className="text-slate-300">Grade</TableHead>
                    <TableHead className="text-slate-300">Certificate</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedPrograms.map((program) => (
                    <TableRow key={program.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">{program.name}</TableCell>
                      <TableCell className="text-slate-300">{program.company}</TableCell>
                      <TableCell className="text-slate-300">{program.type}</TableCell>
                      <TableCell className="text-slate-300">{program.duration}</TableCell>
                      <TableCell className="text-slate-300">{program.completedDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-600 text-white">{program.grade}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{program.certificate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          Download Certificate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}