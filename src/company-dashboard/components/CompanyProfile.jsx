import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import { 
  Plus, 
  X, 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Users,
  Calendar,
  Star
} from 'lucide-react';

export function CompanyProfile() {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'TechCorp Solutions',
    description: 'Leading technology solutions provider specializing in enterprise software development and digital transformation.',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '500-1000 employees',
    founded: '2010'
  });

  const [contactInfo, setContactInfo] = useState({
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Silicon Valley, CA 94000'
  });

  const [locations, setLocations] = useState([
    { id: 1, name: 'New York, NY', type: 'Headquarters' },
    { id: 2, name: 'San Francisco, CA', type: 'Development Center' }
  ]);

  const [offerings, setOfferings] = useState([
    { id: 1, name: 'Software Development', category: 'Services' },
    { id: 2, name: 'Cloud Solutions', category: 'Services' },
    { id: 3, name: 'Data Analytics', category: 'Services' },
    { id: 4, name: 'Digital Transformation', category: 'Consulting' }
  ]);

  const [newLocation, setNewLocation] = useState({ name: '', type: 'Office' });
  const [newOffering, setNewOffering] = useState({ name: '', category: 'Services' });
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showAddOffering, setShowAddOffering] = useState(false);

  const handleCompanyInfoChange = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleContactInfoChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const addLocation = () => {
    if (newLocation.name.trim()) {
      setLocations(prev => [...prev, { ...newLocation, id: Date.now() }]);
      setNewLocation({ name: '', type: 'Office' });
      setShowAddLocation(false);
    }
  };

  const removeLocation = (id) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const addOffering = () => {
    if (newOffering.name.trim()) {
      setOfferings(prev => [...prev, { ...newOffering, id: Date.now() }]);
      setNewOffering({ name: '', category: 'Services' });
      setShowAddOffering(false);
    }
  };

  const removeOffering = (id) => {
    setOfferings(prev => prev.filter(off => off.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-white mb-2">Company Profile</h2>
        <p className="text-slate-400">Manage your company information and details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
            <CardDescription className="text-slate-400">
              Essential company details and overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName" className="text-slate-300">Company Name</Label>
              <Input
                id="companyName"
                value={companyInfo.name}
                onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-slate-300">Company Description (Bio)</Label>
              <Textarea
                id="description"
                value={companyInfo.description}
                onChange={(e) => handleCompanyInfoChange('description', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[120px]"
                placeholder="Describe your company, mission, and values..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website" className="text-slate-300">Website</Label>
                <Input
                  id="website"
                  value={companyInfo.website}
                  onChange={(e) => handleCompanyInfoChange('website', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="https://company.com"
                />
              </div>
              <div>
                <Label htmlFor="industry" className="text-slate-300">Industry</Label>
                <Input
                  id="industry"
                  value={companyInfo.industry}
                  onChange={(e) => handleCompanyInfoChange('industry', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size" className="text-slate-300">Company Size</Label>
                <Input
                  id="size"
                  value={companyInfo.size}
                  onChange={(e) => handleCompanyInfoChange('size', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., 100-500 employees"
                />
              </div>
              <div>
                <Label htmlFor="founded" className="text-slate-300">Founded</Label>
                <Input
                  id="founded"
                  value={companyInfo.founded}
                  onChange={(e) => handleCompanyInfoChange('founded', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., 2010"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
            <CardDescription className="text-slate-400">
              How people can reach your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-slate-300">Phone</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-slate-300">Address</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 text-slate-400 h-4 w-4" />
                <Textarea
                  id="address"
                  value={contactInfo.address}
                  onChange={(e) => handleContactInfoChange('address', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10 min-h-[80px]"
                  placeholder="Full company address..."
                />
              </div>
            </div>

            {/* Company Stats */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <h4 className="text-slate-300 font-medium mb-3">Company Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-700 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <p className="text-slate-400 text-sm">Employees</p>
                  <p className="text-white font-semibold">750+</p>
                </div>
                <div className="text-center p-3 bg-slate-700 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <p className="text-slate-400 text-sm">Years</p>
                  <p className="text-white font-semibold">14</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Locations</CardTitle>
              <CardDescription className="text-slate-400">
                Company offices and operational locations
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddLocation(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center justify-between bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">{location.name}</p>
                  <Badge variant="outline" className="border-slate-600 text-slate-300 mt-1">
                    {location.type}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLocation(location.id)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {showAddLocation && (
            <div className="bg-slate-700 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Location Name</Label>
                  <Input
                    value={newLocation.name}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-600 border-slate-500 text-white mt-1"
                    placeholder="e.g., Los Angeles, CA"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Type</Label>
                  <select
                    value={newLocation.type}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full mt-1 bg-slate-600 border border-slate-500 rounded-md px-3 py-2 text-white"
                  >
                    <option value="Office">Office</option>
                    <option value="Headquarters">Headquarters</option>
                    <option value="Development Center">Development Center</option>
                    <option value="Sales Office">Sales Office</option>
                    <option value="Support Center">Support Center</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={addLocation} className="bg-green-600 hover:bg-green-700 text-white">
                  Add
                </Button>
                <Button 
                  onClick={() => setShowAddLocation(false)}
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

      {/* What We Offer */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">What We Offer</CardTitle>
              <CardDescription className="text-slate-400">
                Services, products, and solutions your company provides
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddOffering(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Offering
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {offerings.map((offering) => (
              <div key={offering.id} className="flex items-center justify-between bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">{offering.name}</p>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 mt-1">
                      {offering.category}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOffering(offering.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {showAddOffering && (
            <div className="bg-slate-700 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Service/Product Name</Label>
                  <Input
                    value={newOffering.name}
                    onChange={(e) => setNewOffering(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-600 border-slate-500 text-white mt-1"
                    placeholder="e.g., Web Development"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Category</Label>
                  <select
                    value={newOffering.category}
                    onChange={(e) => setNewOffering(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full mt-1 bg-slate-600 border border-slate-500 rounded-md px-3 py-2 text-white"
                  >
                    <option value="Services">Services</option>
                    <option value="Products">Products</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Training">Training</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={addOffering} className="bg-green-600 hover:bg-green-700 text-white">
                  Add
                </Button>
                <Button 
                  onClick={() => setShowAddOffering(false)}
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

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
}