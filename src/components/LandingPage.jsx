import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Menu, 
  X, 
  Search, 
  TrendingUp, 
  Users, 
  Building2, 
  Briefcase, 
  Award, 
  BookOpen, 
  Target, 
  ArrowRight, 
  Star,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  ExternalLink,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  BarChart3,
  Globe,
  Lightbulb
} from 'lucide-react';

// Mock data for trending jobs
const trendingJobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    salary: '$80k - $120k',
    type: 'Full-time',
    trending: true,
    applicants: 45
  },
  {
    id: 2,
    title: 'Healthcare Data Analyst',
    company: 'MedTech Plus',
    location: 'New York, NY',
    salary: '$65k - $85k',
    type: 'Full-time',
    trending: true,
    applicants: 32
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    company: 'Growth Marketing Co',
    location: 'Los Angeles, CA',
    salary: '$50k - $70k',
    type: 'Full-time',
    trending: true,
    applicants: 28
  }
];

// Mock data for emerging roles
const emergingRoles = [
  { title: 'AI Ethics Specialist', growth: '+150%' },
  { title: 'Sustainability Coordinator', growth: '+120%' },
  { title: 'Remote Work Facilitator', growth: '+95%' },
  { title: 'Data Privacy Officer', growth: '+85%' }
];

// Mock data for success stories
const successStories = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Developer',
    story: 'Through TVET training, I transitioned from retail to tech in just 8 months.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Digital Marketing Manager',
    story: 'TVET helped me upskill and secure a 40% salary increase.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    role: 'Data Analyst',
    story: 'From unemployed to leading data projects at a Fortune 500 company.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

export function LandingPage({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // Apply dark theme on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f172a' }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('landing')} 
                className="text-2xl font-bold hover:opacity-80 transition-opacity"
                style={{ color: '#3b82f6' }}
              >
                TVET Ecosystem
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <div className="relative group">
                  <button 
                    className="px-3 py-2 rounded-md transition-colors flex items-center"
                    style={{ color: '#94a3b8' }}
                    onClick={() => toggleDropdown('ecosystem')}
                    onMouseEnter={() => setActiveDropdown('ecosystem')}
                  >
                    The Ecosystem <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {activeDropdown === 'ecosystem' && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                      <div className="py-1">
                        <button 
                          onClick={() => scrollToSection('ecosystem')}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = '#334155'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.backgroundColor = 'transparent'; }}
                        >
                          Overview
                        </button>
                        <button 
                          onClick={() => scrollToSection('ecosystem-picture')}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = '#334155'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.backgroundColor = 'transparent'; }}
                        >
                          Visual Guide
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <button 
                    className="px-3 py-2 rounded-md transition-colors flex items-center"
                    style={{ color: '#94a3b8' }}
                    onClick={() => toggleDropdown('jobs')}
                    onMouseEnter={() => setActiveDropdown('jobs')}
                  >
                    Job Boards <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {activeDropdown === 'jobs' && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                      <div className="py-1">
                        <button 
                          onClick={() => scrollToSection('jobs')}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = '#334155'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.backgroundColor = 'transparent'; }}
                        >
                          Industry Categories
                        </button>
                        <button 
                          onClick={() => scrollToSection('jobs')}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = '#334155'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.backgroundColor = 'transparent'; }}
                        >
                          Job Search Tools
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => scrollToSection('trending')}
                  className="px-3 py-2 rounded-md transition-colors"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  Trending Jobs
                </button>

                <div className="relative group">
                  <button 
                    className="px-3 py-2 rounded-md transition-colors flex items-center"
                    style={{ color: '#94a3b8' }}
                    onClick={() => toggleDropdown('tvet')}
                    onMouseEnter={() => setActiveDropdown('tvet')}
                  >
                    Why TVET Matters <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {activeDropdown === 'tvet' && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                      <div className="py-1">
                        <button 
                          onClick={() => scrollToSection('tvet-matters')}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = '#334155'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.backgroundColor = 'transparent'; }}
                        >
                          Importance
                        </button>
                        <button 
                          onClick={() => scrollToSection('tvet-matters')}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = '#334155'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.backgroundColor = 'transparent'; }}
                        >
                          Case Studies
                        </button>
                        <button 
                          onClick={() => scrollToSection('tvet-matters')}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = '#334155'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.backgroundColor = 'transparent'; }}
                        >
                          Benefits
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => scrollToSection('stories')}
                  className="px-3 py-2 rounded-md transition-colors"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  Stories
                </button>

                <button 
                  onClick={() => scrollToSection('get-ineco')}
                  className="px-3 py-2 rounded-md transition-colors"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  Get Ineco
                </button>
              </div>
            </div>

            {/* Dashboard Links */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('user-dashboard')}
                className="px-3 py-2 rounded-md transition-colors"
                style={{ color: '#3b82f6' }}
                onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
              >
                User Dashboard
              </button>
              <button 
                onClick={() => onNavigate('company-dashboard')}
                className="px-3 py-2 rounded-md transition-colors"
                style={{ color: '#10b981' }}
                onMouseEnter={(e) => e.target.style.color = '#34d399'}
                onMouseLeave={(e) => e.target.style.color = '#10b981'}
              >
                Company Dashboard
              </button>
              <button 
                onClick={() => onNavigate('tvet-dashboard')}
                className="px-3 py-2 rounded-md transition-colors"
                style={{ color: '#8b5cf6' }}
                onMouseEnter={(e) => e.target.style.color = '#a78bfa'}
                onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
              >
                TVET Dashboard
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 transition-colors"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: '#334155' }}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3" style={{ backgroundColor: '#1e293b' }}>
              <button 
                onClick={() => scrollToSection('ecosystem')}
                className="block px-3 py-2 rounded-md transition-colors w-full text-left"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                The Ecosystem
              </button>
              <button 
                onClick={() => scrollToSection('jobs')}
                className="block px-3 py-2 rounded-md transition-colors w-full text-left"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                Job Boards
              </button>
              <button 
                onClick={() => scrollToSection('trending')}
                className="block px-3 py-2 rounded-md transition-colors w-full text-left"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                Trending Jobs
              </button>
              <button 
                onClick={() => scrollToSection('tvet-matters')}
                className="block px-3 py-2 rounded-md transition-colors w-full text-left"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                Why TVET Matters
              </button>
              <button 
                onClick={() => scrollToSection('stories')}
                className="block px-3 py-2 rounded-md transition-colors w-full text-left"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                Stories
              </button>
              <button 
                onClick={() => scrollToSection('get-ineco')}
                className="block px-3 py-2 rounded-md transition-colors w-full text-left"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              >
                Get Ineco
              </button>
              <div className="border-t pt-4 mt-4" style={{ borderColor: '#334155' }}>
                <button 
                  onClick={() => onNavigate('user-dashboard')}
                  className="block px-3 py-2 rounded-md w-full text-left transition-colors"
                  style={{ color: '#3b82f6' }}
                >
                  User Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('company-dashboard')}
                  className="block px-3 py-2 rounded-md w-full text-left transition-colors"
                  style={{ color: '#10b981' }}
                >
                  Company Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('tvet-dashboard')}
                  className="block px-3 py-2 rounded-md w-full text-left transition-colors"
                  style={{ color: '#8b5cf6' }}
                >
                  TVET Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ color: '#ffffff' }}>
              Welcome to the
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TVET Ecosystem
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed" style={{ color: '#bfdbfe' }}>
              Bridging Skills Gaps • Creating Opportunities • Building Futures
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold"
                style={{ backgroundColor: '#ffffff', color: '#1e40af' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                onClick={() => onNavigate('user-dashboard')}
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold"
                style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#1e40af'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ffffff'; }}
                onClick={() => onNavigate('company-dashboard')}
              >
                Post Jobs
                <Building2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>50K+</div>
                <div style={{ color: '#bfdbfe' }}>Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>2.5K+</div>
                <div style={{ color: '#bfdbfe' }}>Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>500+</div>
                <div style={{ color: '#bfdbfe' }}>Training Programs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>85%</div>
                <div style={{ color: '#bfdbfe' }}>Job Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Ecosystem Section */}
      <section id="ecosystem" className="py-24" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#f1f5f9' }}>The TVET Ecosystem</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#94a3b8' }}>
              A comprehensive platform connecting learners, employers, and educators in a thriving vocational ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div id="overview">
                <h3 className="text-3xl font-semibold mb-8" style={{ color: '#f1f5f9' }}>Overview</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-6 p-6 rounded-xl border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                      <Users className="h-8 w-8" style={{ color: '#3b82f6' }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2" style={{ color: '#f1f5f9' }}>For Learners</h4>
                      <p className="leading-relaxed" style={{ color: '#94a3b8' }}>Access training programs, track progress, and find career opportunities tailored to your skills and aspirations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6 p-6 rounded-xl border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                      <Building2 className="h-8 w-8" style={{ color: '#10b981' }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2" style={{ color: '#f1f5f9' }}>For Employers</h4>
                      <p className="leading-relaxed" style={{ color: '#94a3b8' }}>Find skilled talent, offer internships, and contribute to skills development in your industry.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6 p-6 rounded-xl border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                      <BookOpen className="h-8 w-8" style={{ color: '#8b5cf6' }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2" style={{ color: '#f1f5f9' }}>For Institutions</h4>
                      <p className="leading-relaxed" style={{ color: '#94a3b8' }}>Manage programs, track outcomes, and align curriculum with industry needs and market demands.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="ecosystem-picture" className="p-8 rounded-2xl border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="TVET Ecosystem"
                className="w-full h-80 object-cover rounded-xl mb-8"
              />
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#3b82f6' }}>92%</div>
                  <div style={{ color: '#94a3b8' }}>Graduate Success Rate</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>150+</div>
                  <div style={{ color: '#94a3b8' }}>Industry Partners</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#8b5cf6' }}>40+</div>
                  <div style={{ color: '#94a3b8' }}>Countries Served</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#f59e0b' }}>24/7</div>
                  <div style={{ color: '#94a3b8' }}>Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Boards Section */}
      <section id="jobs" className="py-24" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#f1f5f9' }}>Job Opportunities</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>Discover career opportunities across various industries with our comprehensive job board</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl" style={{ color: '#f1f5f9' }}>
                  <Search className="h-6 w-6 mr-3" style={{ color: '#3b82f6' }} />
                  Job Search Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>Advanced filters and AI-powered matching to find your perfect role</p>
                <ul className="space-y-3">
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    Location-based search
                  </li>
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    Salary range filters
                  </li>
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    Skills matching algorithm
                  </li>
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    Experience level filters
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl" style={{ color: '#f1f5f9' }}>
                  <Target className="h-6 w-6 mr-3" style={{ color: '#10b981' }} />
                  Industry Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>Explore opportunities across diverse sectors and emerging fields</p>
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="outline" className="justify-center py-2" style={{ borderColor: '#334155', color: '#94a3b8' }}>Technology</Badge>
                  <Badge variant="outline" className="justify-center py-2" style={{ borderColor: '#334155', color: '#94a3b8' }}>Healthcare</Badge>
                  <Badge variant="outline" className="justify-center py-2" style={{ borderColor: '#334155', color: '#94a3b8' }}>Manufacturing</Badge>
                  <Badge variant="outline" className="justify-center py-2" style={{ borderColor: '#334155', color: '#94a3b8' }}>Finance</Badge>
                  <Badge variant="outline" className="justify-center py-2" style={{ borderColor: '#334155', color: '#94a3b8' }}>Education</Badge>
                  <Badge variant="outline" className="justify-center py-2" style={{ borderColor: '#334155', color: '#94a3b8' }}>Green Energy</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl" style={{ color: '#f1f5f9' }}>
                  <Award className="h-6 w-6 mr-3" style={{ color: '#8b5cf6' }} />
                  Career Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 leading-relaxed" style={{ color: '#94a3b8' }}>Comprehensive support throughout your career journey</p>
                <ul className="space-y-3">
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    AI resume optimization
                  </li>
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    Mock interview sessions
                  </li>
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    Skills gap assessments
                  </li>
                  <li className="flex items-center" style={{ color: '#94a3b8' }}>
                    <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                    Personal career counseling
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Job Search Demo */}
          <div className="rounded-2xl p-8 border" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
            <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#f1f5f9' }}>Find Your Next Opportunity</h3>
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <Input 
                placeholder="Job title or keywords..." 
                className="flex-1"
                style={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              />
              <Input 
                placeholder="Location..." 
                className="flex-1"
                style={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              />
              <Button className="px-8" style={{ backgroundColor: '#3b82f6' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'} onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>
                Search Jobs
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-center mt-4" style={{ color: '#94a3b8' }}>
              Join 50,000+ professionals who found their dream job through our platform
            </p>
          </div>
        </div>
      </section>

      {/* Trending Jobs Section */}
      <section id="trending" className="py-24" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#f1f5f9' }}>Trending Jobs</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94a3b8' }}>Popular positions and emerging roles driving the future of work</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Popular Positions */}
            <div>
              <h3 className="text-3xl font-semibold mb-8 flex items-center" style={{ color: '#f1f5f9' }}>
                <TrendingUp className="h-8 w-8 mr-3" style={{ color: '#f59e0b' }} />
                Popular Positions
              </h3>
              <div className="space-y-6">
                {trendingJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold" style={{ color: '#f1f5f9' }}>{job.title}</h4>
                        <Badge style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                      <p className="mb-4 text-lg" style={{ color: '#94a3b8' }}>{job.company}</p>
                      <div className="flex items-center text-sm space-x-6" style={{ color: '#94a3b8' }}>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {job.applicants} applicants
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: '#334155' }}>
                        <Button variant="outline" size="sm" className="w-full" style={{ borderColor: '#334155', color: '#94a3b8' }}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emerging Roles */}
            <div>
              <h3 className="text-3xl font-semibold mb-8 flex items-center" style={{ color: '#f1f5f9' }}>
                <Star className="h-8 w-8 mr-3" style={{ color: '#3b82f6' }} />
                Emerging Roles
              </h3>
              <div className="space-y-6">
                {emergingRoles.map((role, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-semibold" style={{ color: '#f1f5f9' }}>{role.title}</h4>
                        <Badge className="text-lg px-3 py-1" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                          {role.growth}
                        </Badge>
                      </div>
                      <p className="mb-4" style={{ color: '#94a3b8' }}>Growth rate in the last year</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm" style={{ color: '#94a3b8' }}>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          High demand sector
                        </div>
                        <Button variant="outline" size="sm" style={{ borderColor: '#334155', color: '#94a3b8' }}>
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Future Skills Preview */}
                <Card style={{ backgroundColor: '#1e293b', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Lightbulb className="h-6 w-6 mr-3" style={{ color: '#8b5cf6' }} />
                      <h4 className="text-xl font-semibold" style={{ color: '#f1f5f9' }}>Future Skills</h4>
                    </div>
                    <p className="mb-4" style={{ color: '#94a3b8' }}>Skills that will be essential in the next 5 years</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#8b5cf6' }}>AI/ML</Badge>
                      <Badge variant="outline" style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#8b5cf6' }}>Sustainability</Badge>
                      <Badge variant="outline" style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#8b5cf6' }}>Digital Health</Badge>
                      <Badge variant="outline" style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#8b5cf6' }}>Cybersecurity</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TVET Matters Section */}
      <section id="tvet-matters" className="py-24" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#f1f5f9' }}>Why TVET Matters</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94a3b8' }}>The critical role of vocational education in building tomorrow's workforce and driving economic growth</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Importance */}
            <Card id="importance" className="hover:shadow-xl transition-all duration-300 text-center" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
              <CardHeader>
                <CardTitle>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <Target className="h-10 w-10" style={{ color: '#ef4444' }} />
                  </div>
                  <h3 className="text-2xl" style={{ color: '#f1f5f9' }}>Importance</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4" style={{ color: '#94a3b8' }}>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Addresses critical skills gaps
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Provides practical, job-ready training
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Supports economic development
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Enables seamless career transitions
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card id="benefits" className="hover:shadow-xl transition-all duration-300 text-center" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
              <CardHeader>
                <CardTitle>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <Award className="h-10 w-10" style={{ color: '#10b981' }} />
                  </div>
                  <h3 className="text-2xl" style={{ color: '#f1f5f9' }}>Benefits</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4" style={{ color: '#94a3b8' }}>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Higher employment rates
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Better salary prospects
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Industry-recognized certifications
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Flexible learning pathways
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Case Studies */}
            <Card id="case-studies" className="hover:shadow-xl transition-all duration-300 text-center" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
              <CardHeader>
                <CardTitle>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                    <BarChart3 className="h-10 w-10" style={{ color: '#3b82f6' }} />
                  </div>
                  <h3 className="text-2xl" style={{ color: '#f1f5f9' }}>Success Metrics</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#1e293b' }}>
                    <span style={{ color: '#94a3b8' }}>Job placement rate</span>
                    <span className="text-2xl font-bold" style={{ color: '#10b981' }}>85%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#1e293b' }}>
                    <span style={{ color: '#94a3b8' }}>Average salary increase</span>
                    <span className="text-2xl font-bold" style={{ color: '#3b82f6' }}>40%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#1e293b' }}>
                    <span style={{ color: '#94a3b8' }}>Employer satisfaction</span>
                    <span className="text-2xl font-bold" style={{ color: '#8b5cf6' }}>95%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#1e293b' }}>
                    <span style={{ color: '#94a3b8' }}>Skills gap reduction</span>
                    <span className="text-2xl font-bold" style={{ color: '#f59e0b' }}>70%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Impact */}
          <div className="rounded-2xl p-8 border" style={{ backgroundColor: '#0f172a', borderColor: '#334155' }}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#f1f5f9' }}>
                <Globe className="h-8 w-8 mr-3" style={{ color: '#3b82f6' }} />
                Global Impact
              </h3>
              <p className="max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>
                TVET programs worldwide are transforming economies and individual lives
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#3b82f6' }}>2.8M</div>
                <div style={{ color: '#94a3b8' }}>Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>150+</div>
                <div style={{ color: '#94a3b8' }}>Countries Involved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#8b5cf6' }}>$2.1B</div>
                <div style={{ color: '#94a3b8' }}>Economic Impact</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: '#f59e0b' }}>12M</div>
                <div style={{ color: '#94a3b8' }}>New Jobs Created</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-24" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#f1f5f9' }}>Success Stories</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94a3b8' }}>Real people, real transformations through TVET - discover how vocational education changes lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {successStories.map((story) => (
              <Card key={story.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4"
                      style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                        <Star className="h-3 w-3 mr-1" />
                        Success
                      </Badge>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-3" style={{ color: '#f1f5f9' }}>{story.name}</h4>
                  <p className="mb-6 font-medium" style={{ color: '#3b82f6' }}>{story.role}</p>
                  <blockquote className="italic leading-relaxed border-l-4 pl-4 text-left" style={{ color: '#94a3b8', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                    "{story.story}"
                  </blockquote>
                  <div className="mt-6 pt-6 border-t" style={{ borderColor: '#334155' }}>
                    <Button variant="outline" size="sm" className="w-full" style={{ borderColor: '#334155', color: '#94a3b8' }}>
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Stories Preview */}
          <div className="rounded-2xl p-8 border mb-12" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
            <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#f1f5f9' }}>More Inspiring Journeys</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                  <Users className="h-6 w-6" style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: '#f1f5f9' }}>Career Changers</h4>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>1,200+ professionals who switched careers</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <Award className="h-6 w-6" style={{ color: '#10b981' }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: '#f1f5f9' }}>Industry Leaders</h4>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>500+ now in leadership positions</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                  <Target className="h-6 w-6" style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: '#f1f5f9' }}>Entrepreneurs</h4>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>300+ started their own businesses</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#0f172a' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                  <Globe className="h-6 w-6" style={{ color: '#f59e0b' }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: '#f1f5f9' }}>Global Impact</h4>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>Working across 50+ countries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="px-8" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
              Read More Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4" style={{ color: '#94a3b8' }}>
              Join thousands of successful graduates who transformed their careers through TVET
            </p>
          </div>
        </div>
      </section>

      {/* Get Ineco Section */}
      <section id="get-ineco" className="py-24" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>Get Ineco</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#bfdbfe' }}>Join our ecosystem and transform your career with comprehensive TVET solutions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Subscription Options */}
            <div>
              <h3 className="text-3xl font-semibold mb-8" style={{ color: '#ffffff' }}>Subscription Plans</h3>
              <div className="space-y-6">
                <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', backdropFilter: 'blur(10px)' }}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center" style={{ color: '#ffffff' }}>
                      Basic Plan
                      <Badge style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>Free</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3" style={{ color: '#bfdbfe' }}>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Access to job boards
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Basic skill assessments
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Community forums
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Career guidance resources
                      </li>
                    </ul>
                    <Button className="w-full mt-6" style={{ backgroundColor: '#ffffff', color: '#1e40af' }}>
                      Get Started Free
                    </Button>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', backdropFilter: 'blur(10px)' }}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center" style={{ color: '#ffffff' }}>
                      Premium Plan
                      <Badge style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }}>$29/month</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3" style={{ color: '#bfdbfe' }}>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Everything in Basic
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Advanced training programs
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        One-on-one mentoring
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Priority job matching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-3" style={{ color: '#10b981' }} />
                        Industry certifications
                      </li>
                    </ul>
                    <Button className="w-full mt-6" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                      Start Premium Trial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* App Information */}
            <div>
              <h3 className="text-3xl font-semibold mb-8" style={{ color: '#ffffff' }}>Download Our App</h3>
              <div className="rounded-2xl p-8 border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
                  alt="Mobile App"
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h4 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff' }}>TVET Mobile</h4>
                <p className="mb-6 leading-relaxed" style={{ color: '#bfdbfe' }}>
                  Take your learning journey anywhere. Access courses, track progress, and connect with mentors on the go.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center" style={{ color: '#bfdbfe' }}>
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Offline course access
                  </div>
                  <div className="flex items-center" style={{ color: '#bfdbfe' }}>
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Real-time progress tracking
                  </div>
                  <div className="flex items-center" style={{ color: '#bfdbfe' }}>
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Push notifications for opportunities
                  </div>
                  <div className="flex items-center" style={{ color: '#bfdbfe' }}>
                    <CheckCircle className="h-5 w-5 mr-3" style={{ color: '#10b981' }} />
                    Seamless desktop sync
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button className="flex-1" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    App Store
                  </Button>
                  <Button className="flex-1" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 rounded-2xl p-8 border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold mb-4" style={{ color: '#ffffff' }}>Get in Touch</h3>
              <p style={{ color: '#bfdbfe' }}>Have questions? Our team is here to help you succeed</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                  <Mail className="h-8 w-8" style={{ color: '#3b82f6' }} />
                </div>
                <h4 className="text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>Email Support</h4>
                <p className="mb-4" style={{ color: '#bfdbfe' }}>Get help via email</p>
                <Button variant="outline" style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'transparent' }}>
                  support@tvet.edu
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <Phone className="h-8 w-8" style={{ color: '#10b981' }} />
                </div>
                <h4 className="text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>Phone Support</h4>
                <p className="mb-4" style={{ color: '#bfdbfe' }}>Speak with our experts</p>
                <Button variant="outline" style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'transparent' }}>
                  +1 (555) 123-4567
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                  <MessageSquare className="h-8 w-8" style={{ color: '#8b5cf6' }} />
                </div>
                <h4 className="text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>Live Chat</h4>
                <p className="mb-4" style={{ color: '#bfdbfe' }}>Instant support online</p>
                <Button variant="outline" style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'transparent' }}>
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#f1f5f9' }}>TVET Ecosystem</h3>
              <p className="mb-6 leading-relaxed max-w-md" style={{ color: '#94a3b8' }}>
                Empowering learners, connecting employers, and building the future workforce through comprehensive vocational education and training.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" style={{ borderColor: '#334155', color: '#94a3b8' }}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" style={{ borderColor: '#334155', color: '#94a3b8' }}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" style={{ borderColor: '#334155', color: '#94a3b8' }}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#f1f5f9' }}>Quick Links</h4>
              <ul className="space-y-3" style={{ color: '#94a3b8' }}>
                <li>
                  <button 
                    onClick={() => scrollToSection('ecosystem')}
                    className="transition-colors"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    The Ecosystem
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('jobs')}
                    className="transition-colors"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    Job Boards
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('trending')}
                    className="transition-colors"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    Trending Jobs
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('stories')}
                    className="transition-colors"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    Success Stories
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#f1f5f9' }}>Resources</h4>
              <ul className="space-y-3" style={{ color: '#94a3b8' }}>
                <li><a href="#" className="transition-colors" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Help Center</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Documentation</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Privacy Policy</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#94a3b8' }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center" style={{ borderColor: '#334155', color: '#94a3b8' }}>
            <p>&copy; 2024 TVET Ecosystem. All rights reserved. Built with passion for education and innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}