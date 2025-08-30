import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.jsx';
import { 
  Search, 
  Download, 
  ExternalLink, 
  Award, 
  Trophy, 
  Star, 
  Calendar,
  Share,
  Eye,
  Plus,
  Upload
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';

// Mock data for certificates
const certificates = [
  {
    id: 1,
    name: 'Full Stack Web Development',
    issuer: 'TechCorp Academy',
    issueDate: '2024-02-15',
    expiryDate: '2027-02-15',
    type: 'Professional Certificate',
    status: 'active',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    credentialId: 'FSW-2024-0215-001',
    verificationUrl: 'https://verify.techcorp.com/FSW-2024-0215-001',
    description: 'Comprehensive full-stack web development program covering modern technologies and best practices.',
    image: '/certificates/fullstack-cert.jpg'
  },
  {
    id: 2,
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: '2024-01-10',
    expiryDate: '2027-01-10',
    type: 'Industry Certification',
    status: 'active',
    skills: ['AWS', 'Cloud Computing', 'Infrastructure'],
    credentialId: 'AWC-2024-0110-002',
    verificationUrl: 'https://aws.amazon.com/verification/AWC-2024-0110-002',
    description: 'Foundational knowledge of AWS cloud services and architecture.',
    image: '/certificates/aws-cert.jpg'
  },
  {
    id: 3,
    name: 'Digital Marketing Fundamentals',
    issuer: 'Marketing Institute',
    issueDate: '2023-11-20',
    expiryDate: '2025-11-20',
    type: 'Course Certificate',
    status: 'expiring_soon',
    skills: ['SEO', 'Social Media Marketing', 'Analytics'],
    credentialId: 'DMF-2023-1120-003',
    verificationUrl: 'https://verify.marketinginst.com/DMF-2023-1120-003',
    description: 'Essential digital marketing strategies and tools for modern businesses.',
    image: '/certificates/marketing-cert.jpg'
  }
];

// Mock data for rewards and achievements
const rewards = [
  {
    id: 1,
    name: 'Top Performer Award',
    type: 'Achievement',
    awardedBy: 'TechCorp Solutions',
    date: '2024-03-01',
    description: 'Recognized for outstanding performance during Software Development Internship',
    icon: 'trophy',
    category: 'Performance'
  },
  {
    id: 2,
    name: 'Innovation Excellence',
    type: 'Recognition',
    awardedBy: 'Innovation Hub',
    date: '2024-02-15',
    description: 'Awarded for developing an innovative solution during the hackathon',
    icon: 'star',
    category: 'Innovation'
  },
  {
    id: 3,
    name: 'Community Contributor',
    type: 'Badge',
    awardedBy: 'TVET Platform',
    date: '2024-01-30',
    description: 'Active participation in community forums and helping fellow learners',
    icon: 'award',
    category: 'Community'
  }
];

export function CertificatesRewards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    type: 'Course Certificate',
    credentialId: '',
    verificationUrl: '',
    description: '',
    skills: ''
  });

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || cert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'expiring_soon': return 'bg-yellow-600 text-white';
      case 'expired': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getRewardIcon = (iconType) => {
    switch (iconType) {
      case 'trophy': return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 'star': return <Star className="h-8 w-8 text-blue-500" />;
      case 'award': return <Award className="h-8 w-8 text-purple-500" />;
      default: return <Award className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleAddCertificate = () => {
    // Add certificate logic here
    console.log('Adding certificate:', newCertificate);
    setIsAddCertificateOpen(false);
    setNewCertificate({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      type: 'Course Certificate',
      credentialId: '',
      verificationUrl: '',
      description: '',
      skills: ''
    });
  };

  const viewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-white mb-2">Certificates & Rewards</h2>
        <p className="text-slate-400">Manage your achievements, certifications, and recognition</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Certificates</p>
                <p className="text-2xl font-semibold text-white">{certificates.length}</p>
              </div>
              <Award className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Certifications</p>
                <p className="text-2xl font-semibold text-green-400">
                  {certificates.filter(c => c.status === 'active').length}
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
                <p className="text-sm text-slate-400">Rewards Earned</p>
                <p className="text-2xl font-semibold text-yellow-400">{rewards.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Skills Verified</p>
                <p className="text-2xl font-semibold text-purple-400">12</p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="certificates" className="text-slate-300">Certificates</TabsTrigger>
          <TabsTrigger value="rewards" className="text-slate-300">Rewards & Achievements</TabsTrigger>
        </TabsList>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">My Certificates</CardTitle>
                  <CardDescription className="text-slate-400">
                    View and manage your certifications and credentials
                  </CardDescription>
                </div>
                
                <Dialog open={isAddCertificateOpen} onOpenChange={setIsAddCertificateOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certificate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add New Certificate</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Add a new certificate or credential to your profile
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="certName" className="text-slate-300">Certificate Name</Label>
                          <Input
                            id="certName"
                            value={newCertificate.name}
                            onChange={(e) => setNewCertificate(prev => ({ ...prev, name: e.target.value }))}
                            className="bg-slate-700 border-slate-600 text-white mt-1"
                            placeholder="e.g., AWS Cloud Practitioner"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="issuer" className="text-slate-300">Issuing Organization</Label>
                          <Input
                            id="issuer"
                            value={newCertificate.issuer}
                            onChange={(e) => setNewCertificate(prev => ({ ...prev, issuer: e.target.value }))}
                            className="bg-slate-700 border-slate-600 text-white mt-1"
                            placeholder="e.g., Amazon Web Services"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="certType" className="text-slate-300">Certificate Type</Label>
                          <Select
                            value={newCertificate.type}
                            onValueChange={(value) => setNewCertificate(prev => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-700 border-slate-600">
                              <SelectItem value="Course Certificate" className="text-white">Course Certificate</SelectItem>
                              <SelectItem value="Professional Certificate" className="text-white">Professional Certificate</SelectItem>
                              <SelectItem value="Industry Certification" className="text-white">Industry Certification</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="issueDate" className="text-slate-300">Issue Date</Label>
                          <Input
                            id="issueDate"
                            type="date"
                            value={newCertificate.issueDate}
                            onChange={(e) => setNewCertificate(prev => ({ ...prev, issueDate: e.target.value }))}
                            className="bg-slate-700 border-slate-600 text-white mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="expiryDate" className="text-slate-300">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            value={newCertificate.expiryDate}
                            onChange={(e) => setNewCertificate(prev => ({ ...prev, expiryDate: e.target.value }))}
                            className="bg-slate-700 border-slate-600 text-white mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="credentialId" className="text-slate-300">Credential ID</Label>
                          <Input
                            id="credentialId"
                            value={newCertificate.credentialId}
                            onChange={(e) => setNewCertificate(prev => ({ ...prev, credentialId: e.target.value }))}
                            className="bg-slate-700 border-slate-600 text-white mt-1"
                            placeholder="e.g., AWC-2024-001"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="verificationUrl" className="text-slate-300">Verification URL</Label>
                          <Input
                            id="verificationUrl"
                            value={newCertificate.verificationUrl}
                            onChange={(e) => setNewCertificate(prev => ({ ...prev, verificationUrl: e.target.value }))}
                            className="bg-slate-700 border-slate-600 text-white mt-1"
                            placeholder="https://verify.example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-slate-300">Description</Label>
                        <Textarea
                          id="description"
                          value={newCertificate.description}
                          onChange={(e) => setNewCertificate(prev => ({ ...prev, description: e.target.value }))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                          placeholder="Describe what this certificate covers..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="skills" className="text-slate-300">Skills (comma-separated)</Label>
                        <Input
                          id="skills"
                          value={newCertificate.skills}
                          onChange={(e) => setNewCertificate(prev => ({ ...prev, skills: e.target.value }))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                          placeholder="e.g., AWS, Cloud Computing, Infrastructure"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddCertificateOpen(false)} className="border-slate-600 text-slate-300">
                        Cancel
                      </Button>
                      <Button onClick={handleAddCertificate} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Add Certificate
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search certificates..."
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
                    <SelectItem value="Course Certificate" className="text-white">Course Certificate</SelectItem>
                    <SelectItem value="Professional Certificate" className="text-white">Professional Certificate</SelectItem>
                    <SelectItem value="Industry Certification" className="text-white">Industry Certification</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white">All Status</SelectItem>
                    <SelectItem value="active" className="text-white">Active</SelectItem>
                    <SelectItem value="expiring_soon" className="text-white">Expiring Soon</SelectItem>
                    <SelectItem value="expired" className="text-white">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((certificate) => (
                  <Card key={certificate.id} className="bg-slate-700 border-slate-600">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getStatusColor(certificate.status)}>
                          {certificate.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewCertificate(certificate)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-slate-300 p-1"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-slate-300 p-1"
                          >
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">{certificate.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {certificate.issuer}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Issue Date:</span>
                          <span className="text-slate-300">{certificate.issueDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Expires:</span>
                          <span className="text-slate-300">{certificate.expiryDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {certificate.skills.slice(0, 3).map((skill, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="border-slate-600 text-slate-300 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {certificate.skills.length > 3 && (
                            <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                              +{certificate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-600"
                          onClick={() => window.open(certificate.verificationUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Verify Certificate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Rewards & Achievements</CardTitle>
              <CardDescription className="text-slate-400">
                Recognition and awards for your accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="bg-slate-700 border-slate-600">
                    <CardHeader className="text-center pb-3">
                      <div className="mx-auto mb-3">
                        {getRewardIcon(reward.icon)}
                      </div>
                      <CardTitle className="text-white text-lg">{reward.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {reward.awardedBy}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="space-y-2 mb-4">
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {reward.category}
                        </Badge>
                        <div className="flex items-center justify-center space-x-1 text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{reward.date}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm">{reward.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Certificate View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">{selectedCertificate.name}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {selectedCertificate.issuer} • {selectedCertificate.type}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Issue Date</p>
                    <p className="text-white">{selectedCertificate.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Expiry Date</p>
                    <p className="text-white">{selectedCertificate.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Credential ID</p>
                    <p className="text-white">{selectedCertificate.credentialId}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <Badge className={getStatusColor(selectedCertificate.status)}>
                      {selectedCertificate.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Description</p>
                  <p className="text-slate-300">{selectedCertificate.description}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Skills Covered</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedCertificate.verificationUrl, '_blank')}
                  className="border-slate-600 text-slate-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify Online
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}