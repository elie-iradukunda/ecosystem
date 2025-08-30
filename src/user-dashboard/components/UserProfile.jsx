import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import { 
  Upload, 
  Plus, 
  X, 
  User, 
  Mail, 
  Phone, 
  LinkedinIcon, 
  MapPin,
  Briefcase,
  Code
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.jsx';

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

const skillOptions = [
  'React', 'JavaScript', 'Python', 'Java', 'C++', 'SQL', 'HTML/CSS',
  'Node.js', 'TypeScript', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go',
  'Project Management', 'Data Analysis', 'Digital Marketing', 'Graphic Design',
  'Nursing', 'Teaching', 'Accounting', 'Sales', 'Customer Service'
];

export function UserProfile() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe2024',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/johndoe',
    bio: 'Experienced software developer with 5+ years in full-stack development. Passionate about creating innovative solutions and mentoring junior developers.',
    location: '',
    profilePicture: null
  });

  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'AWS']);
  const [newSkill, setNewSkill] = useState('');
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Senior Software Developer',
      company: 'TechCorp Solutions',
      duration: '2022 - Present',
      description: 'Lead development of web applications using React and Node.js'
    },
    {
      id: 2,
      title: 'Junior Developer',
      company: 'StartupXYZ',
      duration: '2020 - 2022',
      description: 'Developed and maintained various client projects'
    }
  ]);
  const [selectedSectors, setSelectedSectors] = useState(['Technology']);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    description: ''
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const addExperience = () => {
    if (newExperience.title.trim() && newExperience.company.trim()) {
      setExperiences(prev => [...prev, { ...newExperience, id: Date.now() }]);
      setNewExperience({ title: '', company: '', duration: '', description: '' });
      setShowAddExperience(false);
    }
  };

  const removeExperience = (id) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleSectorToggle = (sector) => {
    setSelectedSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-white mb-2">User Profile</h2>
        <p className="text-slate-400">Manage your personal information and professional details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
            <CardDescription className="text-slate-400">
              Basic personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => handleProfileChange('username', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-slate-300">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
            <CardDescription className="text-slate-400">
              How others can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-slate-300">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="linkedin" className="text-slate-300">LinkedIn</Label>
              <Input
                id="linkedin"
                value={profile.linkedin}
                onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
                placeholder="linkedin.com/in/username"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-slate-300">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
                placeholder="City, Country"
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Picture */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Profile Picture</CardTitle>
            <CardDescription className="text-slate-400">
              Upload your profile photo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Choose File
              </Button>
              <p className="text-slate-400 text-sm mt-2">
                or drag and drop<br />
                JPG, PNG or GIF (max 5MB)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Skills</CardTitle>
          <CardDescription className="text-slate-400">
            Add your technical and professional skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-blue-600 text-white px-3 py-1 flex items-center space-x-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:bg-blue-700 rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Select value={newSkill} onValueChange={setNewSkill}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Add a skill..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {skillOptions.filter(skill => !skills.includes(skill)).map((skill) => (
                  <SelectItem key={skill} value={skill} className="text-white">
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addSkill} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Experience</CardTitle>
              <CardDescription className="text-slate-400">
                Your work experience and career history
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddExperience(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-slate-700 rounded-lg p-4 relative">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
              <h4 className="text-white font-medium">{exp.title}</h4>
              <p className="text-blue-400">{exp.company}</p>
              <p className="text-slate-400 text-sm">{exp.duration}</p>
              <p className="text-slate-300 text-sm mt-2">{exp.description}</p>
            </div>
          ))}

          {showAddExperience && (
            <div className="bg-slate-700 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Job Title</Label>
                  <Input
                    value={newExperience.title}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-slate-600 border-slate-500 text-white mt-1"
                    placeholder="e.g., Software Developer"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Company</Label>
                  <Input
                    value={newExperience.company}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-slate-600 border-slate-500 text-white mt-1"
                    placeholder="e.g., TechCorp"
                  />
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Duration</Label>
                <Input
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, duration: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white mt-1"
                  placeholder="e.g., 2020 - 2022"
                />
              </div>
              <div>
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white mt-1"
                  placeholder="Describe your role and responsibilities..."
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={addExperience} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Add
                </Button>
                <Button 
                  onClick={() => setShowAddExperience(false)}
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sectors */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Interested Sectors</CardTitle>
          <CardDescription className="text-slate-400">
            Select the industries you're interested in working in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={selectedSectors.includes(sector) ? "default" : "outline"}
                onClick={() => handleSectorToggle(sector)}
                className={`text-sm ${
                  selectedSectors.includes(sector)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sector}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
}