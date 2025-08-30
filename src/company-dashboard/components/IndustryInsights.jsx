import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { Label } from '../../components/ui/label.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Badge } from '../../components/ui/badge.jsx';
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
  TrendingUp,
  BarChart3,
  Target,
  Lightbulb,
  Calendar,
  Users
} from 'lucide-react';

// Mock data for industry insights
const mockInsights = [
  {
    id: 1,
    title: 'The Rise of AI in Software Development',
    sector: 'Technology',
    type: 'Market Trend',
    skillsGapSuggestion: 'Companies should invest in training developers in AI/ML frameworks like TensorFlow and PyTorch. There\'s a growing demand for AI-powered applications.',
    content: 'Artificial Intelligence is transforming the software development landscape. Companies are increasingly adopting AI tools for code generation, testing, and deployment.',
    tags: ['AI', 'Machine Learning', 'Automation'],
    publishedDate: '2024-03-15',
    author: 'TechCorp Research Team',
    views: 1250,
    engagement: 'High'
  },
  {
    id: 2,
    title: 'Remote Work Skills Gap in Project Management',
    sector: 'Management',
    type: 'Skills Analysis',
    skillsGapSuggestion: 'Project managers need enhanced digital collaboration skills. Training in remote team management, digital project tools, and virtual leadership is essential.',
    content: 'The shift to remote work has created new challenges for project managers. Traditional management approaches need to evolve for distributed teams.',
    tags: ['Remote Work', 'Project Management', 'Digital Tools'],
    publishedDate: '2024-03-10',
    author: 'TechCorp Research Team',
    views: 890,
    engagement: 'Medium'
  },
  {
    id: 3,
    title: 'Cybersecurity Skills Shortage in Healthcare',
    sector: 'Healthcare',
    type: 'Industry Report',
    skillsGapSuggestion: 'Healthcare organizations urgently need cybersecurity professionals. Focus on training in HIPAA compliance, medical device security, and healthcare data protection.',
    content: 'Healthcare sector faces critical cybersecurity skills shortage as digital transformation accelerates. Patient data protection has become more challenging.',
    tags: ['Cybersecurity', 'Healthcare', 'Data Protection'],
    publishedDate: '2024-03-05',
    author: 'TechCorp Research Team',
    views: 2100,
    engagement: 'High'
  }
];

const sectors = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Education', 'Retail', 'Energy', 'Management'];
const insightTypes = ['Market Trend', 'Skills Analysis', 'Industry Report', 'Research Study', 'Best Practices'];

export function IndustryInsights() {
  const [insights, setInsights] = useState(mockInsights);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState(null);

  const [newInsight, setNewInsight] = useState({
    title: '',
    sector: 'Technology',
    type: 'Market Trend',
    skillsGapSuggestion: '',
    content: '',
    tags: ''
  });

  const [editInsight, setEditInsight] = useState({
    title: '',
    sector: 'Technology',
    type: 'Market Trend',
    skillsGapSuggestion: '',
    content: '',
    tags: ''
  });

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insight.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || insight.sector === sectorFilter;
    const matchesType = typeFilter === 'all' || insight.type === typeFilter;
    
    return matchesSearch && matchesSector && matchesType;
  });

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case 'High': return 'bg-green-600 text-white';
      case 'Medium': return 'bg-yellow-600 text-white';
      case 'Low': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Market Trend': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Skills Analysis': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Industry Report': return 'bg-green-100 text-green-800 border-green-200';
      case 'Research Study': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Best Practices': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddInsight = () => {
    const insight = {
      id: Date.now(),
      ...newInsight,
      tags: newInsight.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      publishedDate: new Date().toISOString().split('T')[0],
      author: 'TechCorp Research Team',
      views: 0,
      engagement: 'Low'
    };

    setInsights(prev => [...prev, insight]);
    setNewInsight({
      title: '',
      sector: 'Technology',
      type: 'Market Trend',
      skillsGapSuggestion: '',
      content: '',
      tags: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEditInsight = (insight) => {
    setEditingInsight(insight);
    setEditInsight({
      title: insight.title,
      sector: insight.sector,
      type: insight.type,
      skillsGapSuggestion: insight.skillsGapSuggestion,
      content: insight.content,
      tags: insight.tags.join(', ')
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateInsight = () => {
    const updatedInsight = {
      ...editingInsight,
      title: editInsight.title,
      sector: editInsight.sector,
      type: editInsight.type,
      skillsGapSuggestion: editInsight.skillsGapSuggestion,
      content: editInsight.content,
      tags: editInsight.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    setInsights(prev => prev.map(insight => insight.id === editingInsight.id ? updatedInsight : insight));
    setIsEditDialogOpen(false);
    setEditingInsight(null);
  };

  const handleDeleteInsight = (id) => {
    setInsights(prev => prev.filter(insight => insight.id !== id));
  };

  const viewInsight = (insight) => {
    setSelectedInsight(insight);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-2">Industry Insights</h2>
          <p className="text-slate-400">Share market trends and skills gap analysis for your industry</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Share Insight
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Share Industry Insight</DialogTitle>
              <DialogDescription className="text-slate-400">
                Contribute your knowledge and analysis to help the industry
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="insightTitle" className="text-slate-300">Title</Label>
                <Input
                  id="insightTitle"
                  value={newInsight.title}
                  onChange={(e) => setNewInsight(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., The Rise of AI in Software Development"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sector" className="text-slate-300">Sector</Label>
                  <Select
                    value={newInsight.sector}
                    onValueChange={(value) => setNewInsight(prev => ({ ...prev, sector: value }))}
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

                <div>
                  <Label htmlFor="type" className="text-slate-300">Type</Label>
                  <Select
                    value={newInsight.type}
                    onValueChange={(value) => setNewInsight(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {insightTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="content" className="text-slate-300">Content</Label>
                <Textarea
                  id="content"
                  value={newInsight.content}
                  onChange={(e) => setNewInsight(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[150px]"
                  placeholder="Share your insights, analysis, or observations about the industry..."
                />
              </div>

              <div>
                <Label htmlFor="skillsGapSuggestion" className="text-slate-300">Skills Gap Suggestion</Label>
                <Textarea
                  id="skillsGapSuggestion"
                  value={newInsight.skillsGapSuggestion}
                  onChange={(e) => setNewInsight(prev => ({ ...prev, skillsGapSuggestion: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
                  placeholder="What skills gaps do you see? What training or development would help address them?"
                />
              </div>

              <div>
                <Label htmlFor="tags" className="text-slate-300">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newInsight.tags}
                  onChange={(e) => setNewInsight(prev => ({ ...prev, tags: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g., AI, Machine Learning, Automation"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-600 text-slate-300">
                Cancel
              </Button>
              <Button onClick={handleAddInsight} className="bg-green-600 hover:bg-green-700 text-white">
                Share Insight
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
                <p className="text-sm text-slate-400">Total Insights</p>
                <p className="text-2xl font-semibold text-white">{insights.length}</p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">High Engagement</p>
                <p className="text-2xl font-semibold text-green-400">
                  {insights.filter(insight => insight.engagement === 'High').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Views</p>
                <p className="text-2xl font-semibold text-blue-400">
                  {insights.reduce((sum, insight) => sum + insight.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Sectors Covered</p>
                <p className="text-2xl font-semibold text-purple-400">
                  {new Set(insights.map(insight => insight.sector)).size}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
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
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Types</SelectItem>
                {insightTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-white">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => (
          <Card key={insight.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(insight.type)} variant="outline">
                    {insight.type}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {insight.sector}
                  </Badge>
                </div>
                <Badge className={getEngagementColor(insight.engagement)}>
                  {insight.engagement}
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">{insight.title}</CardTitle>
              <CardDescription className="text-slate-400">
                {insight.author} • {insight.publishedDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                {insight.content}
              </p>
              
              <div className="mb-4">
                <h4 className="text-slate-300 font-medium text-sm mb-2 flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  Skills Gap Suggestion:
                </h4>
                <p className="text-slate-400 text-sm line-clamp-2">
                  {insight.skillsGapSuggestion}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {insight.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-slate-600 text-slate-300 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
                {insight.tags.length > 3 && (
                  <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                    +{insight.tags.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-slate-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{insight.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{insight.publishedDate}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewInsight(insight)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditInsight(insight)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteInsight(insight.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Insight Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedInsight && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getTypeColor(selectedInsight.type)} variant="outline">
                    {selectedInsight.type}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {selectedInsight.sector}
                  </Badge>
                  <Badge className={getEngagementColor(selectedInsight.engagement)}>
                    {selectedInsight.engagement}
                  </Badge>
                </div>
                <DialogTitle className="text-white text-xl">{selectedInsight.title}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  By {selectedInsight.author} • Published on {selectedInsight.publishedDate} • {selectedInsight.views.toLocaleString()} views
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Content</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedInsight.content}</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Skills Gap Analysis & Suggestions
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{selectedInsight.skillsGapSuggestion}</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInsight.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Insight Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Industry Insight</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update your industry insight and analysis
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="editInsightTitle" className="text-slate-300">Title</Label>
              <Input
                id="editInsightTitle"
                value={editInsight.title}
                onChange={(e) => setEditInsight(prev => ({ ...prev, title: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="editContent" className="text-slate-300">Content</Label>
              <Textarea
                id="editContent"
                value={editInsight.content}
                onChange={(e) => setEditInsight(prev => ({ ...prev, content: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[150px]"
              />
            </div>

            <div>
              <Label htmlFor="editSkillsGapSuggestion" className="text-slate-300">Skills Gap Suggestion</Label>
              <Textarea
                id="editSkillsGapSuggestion"
                value={editInsight.skillsGapSuggestion}
                onChange={(e) => setEditInsight(prev => ({ ...prev, skillsGapSuggestion: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleUpdateInsight} className="bg-green-600 hover:bg-green-700 text-white">
              Update Insight
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}