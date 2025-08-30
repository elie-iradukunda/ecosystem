import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { TrendingUp, Plus, X, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SkillFeedback {
  id: string;
  skillName: string;
  currentLevel: number;
  desiredLevel: number;
  priority: 'low' | 'medium' | 'high';
  feedback: string;
  trainingNeeded: boolean;
}

const skillCategories = [
  'Technical Skills',
  'Soft Skills',
  'Digital Literacy',
  'Communication',
  'Problem Solving',
  'Leadership',
  'Project Management',
  'Data Analysis'
];

export function SkillsSection() {
  const [skillsFeedback, setSkillsFeedback] = useState<SkillFeedback[]>([
    {
      id: '1',
      skillName: 'React Development',
      currentLevel: 3,
      desiredLevel: 5,
      priority: 'high',
      feedback: 'Need advanced training in React hooks and state management',
      trainingNeeded: true
    },
    {
      id: '2',
      skillName: 'Data Analysis',
      currentLevel: 2,
      desiredLevel: 4,
      priority: 'medium',
      feedback: 'Require training in statistical analysis and visualization tools',
      trainingNeeded: true
    }
  ]);

  const [newSkill, setNewSkill] = useState({
    skillName: '',
    currentLevel: 1,
    desiredLevel: 5,
    priority: 'medium' as const,
    feedback: '',
    trainingNeeded: false
  });

  const [selectedCategory, setSelectedCategory] = useState('');

  const addSkillFeedback = () => {
    if (!newSkill.skillName.trim()) return;

    const skillFeedback: SkillFeedback = {
      id: Date.now().toString(),
      ...newSkill
    };

    setSkillsFeedback(prev => [...prev, skillFeedback]);
    setNewSkill({
      skillName: '',
      currentLevel: 1,
      desiredLevel: 5,
      priority: 'medium',
      feedback: '',
      trainingNeeded: false
    });
  };

  const removeSkillFeedback = (id: string) => {
    setSkillsFeedback(prev => prev.filter(skill => skill.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < level ? 'text-yellow-400 fill-current' : 'text-slate-500'
        }`}
      />
    ));
  };

  const handleSubmitFeedback = () => {
    console.log('Skills feedback submitted:', skillsFeedback);
    alert('Skills gap feedback submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Skills Gap Feedback</h2>
        <p className="text-slate-400">Identify skill gaps and provide feedback for training needs</p>
      </div>

      {/* Add New Skill Feedback */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Skills Feedback
          </CardTitle>
          <CardDescription className="text-slate-400">
            Assess current skills and identify training needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-slate-300">Skill Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {skillCategories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="skillName" className="text-slate-300">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkill.skillName}
                onChange={(e) => setNewSkill(prev => ({ ...prev, skillName: e.target.value }))}
                placeholder="e.g., React Development, Data Analysis"
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currentLevel" className="text-slate-300">Current Level (1-5)</Label>
              <Select
                value={newSkill.currentLevel.toString()}
                onValueChange={(value) => setNewSkill(prev => ({ ...prev, currentLevel: parseInt(value) }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <SelectItem key={level} value={level.toString()} className="text-white">
                      {level} - {level === 1 ? 'Beginner' : level === 2 ? 'Basic' : level === 3 ? 'Intermediate' : level === 4 ? 'Advanced' : 'Expert'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="desiredLevel" className="text-slate-300">Desired Level (1-5)</Label>
              <Select
                value={newSkill.desiredLevel.toString()}
                onValueChange={(value) => setNewSkill(prev => ({ ...prev, desiredLevel: parseInt(value) }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <SelectItem key={level} value={level.toString()} className="text-white">
                      {level} - {level === 1 ? 'Beginner' : level === 2 ? 'Basic' : level === 3 ? 'Intermediate' : level === 4 ? 'Advanced' : 'Expert'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority" className="text-slate-300">Priority</Label>
              <Select
                value={newSkill.priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => setNewSkill(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="low" className="text-white">Low</SelectItem>
                  <SelectItem value="medium" className="text-white">Medium</SelectItem>
                  <SelectItem value="high" className="text-white">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="feedback" className="text-slate-300">Feedback & Training Needs</Label>
            <Textarea
              id="feedback"
              value={newSkill.feedback}
              onChange={(e) => setNewSkill(prev => ({ ...prev, feedback: e.target.value }))}
              placeholder="Describe the skill gap and specific training requirements..."
              className="bg-slate-700 border-slate-600 text-white mt-1 min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="trainingNeeded"
              checked={newSkill.trainingNeeded}
              onChange={(e) => setNewSkill(prev => ({ ...prev, trainingNeeded: e.target.checked }))}
              className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="trainingNeeded" className="text-slate-300">
              Formal training required
            </Label>
          </div>

          <Button onClick={addSkillFeedback} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Skills Feedback List */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Skills Gap Assessment
          </CardTitle>
          <CardDescription className="text-slate-400">
            Review and manage identified skill gaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          {skillsFeedback.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No skills feedback added yet.</p>
          ) : (
            <div className="space-y-4">
              {skillsFeedback.map((skill) => (
                <div key={skill.id} className="border border-slate-700 rounded-lg p-4 bg-slate-750">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{skill.skillName}</h4>
                      <Badge className={getPriorityColor(skill.priority)}>
                        {skill.priority} priority
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkillFeedback(skill.id)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Current Level</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(skill.currentLevel)}
                        <span className="text-slate-300 ml-2">({skill.currentLevel}/5)</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Desired Level</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(skill.desiredLevel)}
                        <span className="text-slate-300 ml-2">({skill.desiredLevel}/5)</span>
                      </div>
                    </div>
                  </div>

                  {skill.feedback && (
                    <div className="mb-3">
                      <p className="text-sm text-slate-400 mb-1">Feedback</p>
                      <p className="text-slate-300">{skill.feedback}</p>
                    </div>
                  )}

                  {skill.trainingNeeded && (
                    <Badge variant="outline" className="border-blue-600 text-blue-400">
                      Training Required
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator className="bg-slate-700" />

      <div className="flex justify-end">
        <Button onClick={handleSubmitFeedback} className="bg-green-600 hover:bg-green-700 text-white">
          Submit Skills Feedback
        </Button>
      </div>
    </div>
  );
}