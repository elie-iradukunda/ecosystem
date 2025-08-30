import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { Button } from './ui/button.jsx';
import { Separator } from './ui/separator.jsx';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export function ProfileSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [formData, setFormData] = useState({
    username: 'caleb_mevis',
    email: 'caleb@example.com',
    phone: '+1234567890',
    password: '',
    retypePassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.password !== formData.retypePassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle save logic here
    console.log('Profile saved:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Profile Settings</h2>
        <p className="text-slate-400">Manage your account information and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-slate-400">
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Security Settings
            </CardTitle>
            <CardDescription className="text-slate-400">
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-slate-300">New Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pr-10"
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="retypePassword" className="text-slate-300">Re-type Password</Label>
              <div className="relative mt-1">
                <Input
                  id="retypePassword"
                  type={showRetypePassword ? "text" : "password"}
                  value={formData.retypePassword}
                  onChange={(e) => handleInputChange('retypePassword', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pr-10"
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                >
                  {showRetypePassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
              {formData.password && formData.retypePassword && formData.password !== formData.retypePassword && (
                <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-slate-700" />
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
}