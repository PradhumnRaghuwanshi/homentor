import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Upload, Image, IdCard, Video, GraduationCap, MapPin, IndianRupee, BookOpen, Clock, Award, ChevronDown, ChevronUp } from 'lucide-react';

const TutorRegistrationForm = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    photo: null as File | null,
    idDocument: null as File | null,
    tutorialVideo: null as File | null,
    
    // Educational Background
    highestQualification: '',
    specialization: '',
    university: '',
    graduationYear: '',
    experience: '',
    
    // Location & Availability
    address: '',
    city: '',
    state: '',
    pincode: '',
    availabilityRange: '',
    
    // Teaching Modes & Pricing
    teachingModes: {} as Record<string, { selected: boolean; monthlyPrice: string }>,
    
    // Teaching Preferences (Level -> Class -> Subject mapping)
    teachingPreferences: {} as Record<string, Record<string, string[]>>,
    
    // Availability
    availableDays: [] as string[],
    startDate: '',
    
    // Additional Information
    teachingExperience: ''
  });

  // Hierarchical structure for teaching preferences
  const educationLevels = {
    'school': {
      label: 'School Level',
      classes: {
        'class-1-6': {
          label: 'Class 1-6',
          subjects: ['Mathematics', 'English', 'Hindi', 'Science', 'Social Science', 'Computer Science']
        },
        'class-7-8': {
          label: 'Class 7-8', 
          subjects: ['Mathematics', 'English', 'Hindi', 'Science', 'Social Science', 'Computer Science']
        },
        'class-9-10': {
          label: 'Class 9-10',
          subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Science', 'Computer Science']
        },
        'class-11': {
          label: 'Class 11',
          subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Economics', 'Accountancy', 'Business Studies', 'Computer Science']
        },
        'class-12': {
          label: 'Class 12',
          subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Economics', 'Accountancy', 'Business Studies', 'Computer Science']
        }
      }
    },
    'graduation': {
      label: 'Graduation Level',
      classes: {
        'btech': {
          label: 'B.Tech/Engineering',
          subjects: ['Engineering Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering']
        },
        'bsc': {
          label: 'B.Sc',
          subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics']
        },
        'bcom': {
          label: 'B.Com',
          subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Statistics']
        },
        'ba': {
          label: 'B.A',
          subjects: ['English', 'Hindi', 'History', 'Geography', 'Political Science', 'Economics', 'Psychology']
        }
      }
    },
    'postgraduation': {
      label: 'Post Graduation',
      classes: {
        'mtech': {
          label: 'M.Tech/M.E',
          subjects: ['Advanced Engineering Mathematics', 'Research Methodology', 'Specialized Engineering Subjects']
        },
        'msc': {
          label: 'M.Sc',
          subjects: ['Advanced Mathematics', 'Advanced Physics', 'Advanced Chemistry', 'Research Methods']
        },
        'mcom': {
          label: 'M.Com', 
          subjects: ['Advanced Accountancy', 'Financial Management', 'Business Research', 'Economics']
        },
        'ma': {
          label: 'M.A',
          subjects: ['Literature', 'Linguistics', 'History', 'Political Science', 'Psychology']
        }
      }
    },
    'competitive': {
      label: 'Competitive Exams',
      classes: {
        'jee': {
          label: 'JEE Preparation',
          subjects: ['Mathematics', 'Physics', 'Chemistry']
        },
        'neet': {
          label: 'NEET Preparation', 
          subjects: ['Physics', 'Chemistry', 'Biology']
        },
        'gate': {
          label: 'GATE Preparation',
          subjects: ['Engineering Mathematics', 'General Aptitude', 'Technical Subjects']
        },
        'banking': {
          label: 'Banking Exams',
          subjects: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Knowledge']
        }
      }
    }
  };

  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({});

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleFileChange = (field: 'photo' | 'idDocument' | 'tutorialVideo', file: File | null) => {
    updateFormData({ [field]: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: "Application Submitted Successfully!",
      description: "Thank you for applying to HomeMentor. We'll review your application and get back to you soon.",
    });
  };

  // Data for various form sections
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const teachingModeOptions = [
    { id: 'home-tuition', label: 'Home Tuition (Student\'s Home)', description: 'Visit student\'s home for teaching' },
    { id: 'my-place', label: 'My Place', description: 'Students come to your location' },
    { id: 'coaching-center', label: 'Coaching Center', description: 'Teach at coaching institutes' },
    { id: 'school-teaching', label: 'School Teaching', description: 'Regular school teaching positions' },
    { id: 'online-tutoring', label: 'Online Tutoring', description: 'Virtual teaching sessions' },
    { id: 'group-classes', label: 'Group Classes', description: 'Small group batch teaching' }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Handler functions for teaching preferences
  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels(prev => [...prev, level]);
      setExpandedLevels(prev => ({ ...prev, [level]: true }));
    } else {
      setSelectedLevels(prev => prev.filter(l => l !== level));
      setExpandedLevels(prev => ({ ...prev, [level]: false }));
      // Remove all classes and subjects for this level
      const updatedPreferences = { ...formData.teachingPreferences };
      delete updatedPreferences[level];
      updateFormData({ teachingPreferences: updatedPreferences });
    }
  };

  const handleClassChange = (level: string, classId: string, checked: boolean) => {
    const updatedPreferences = { ...formData.teachingPreferences };
    
    if (!updatedPreferences[level]) {
      updatedPreferences[level] = {};
    }
    
    if (checked) {
      updatedPreferences[level][classId] = [];
      setExpandedClasses(prev => ({ ...prev, [`${level}-${classId}`]: true }));
    } else {
      delete updatedPreferences[level][classId];
      setExpandedClasses(prev => ({ ...prev, [`${level}-${classId}`]: false }));
    }
    
    updateFormData({ teachingPreferences: updatedPreferences });
  };

  const handleSubjectChange = (level: string, classId: string, subject: string, checked: boolean) => {
    const updatedPreferences = { ...formData.teachingPreferences };
    
    if (!updatedPreferences[level]) {
      updatedPreferences[level] = {};
    }
    if (!updatedPreferences[level][classId]) {
      updatedPreferences[level][classId] = [];
    }
    
    if (checked) {
      updatedPreferences[level][classId] = [...updatedPreferences[level][classId], subject];
    } else {
      updatedPreferences[level][classId] = updatedPreferences[level][classId].filter(s => s !== subject);
    }
    
    updateFormData({ teachingPreferences: updatedPreferences });
  };

  const isSubjectSelected = (level: string, classId: string, subject: string) => {
    return formData.teachingPreferences[level]?.[classId]?.includes(subject) || false;
  };

  const getSelectedSubjectsCount = (level: string, classId: string) => {
    return formData.teachingPreferences[level]?.[classId]?.length || 0;
  };

  // Handler functions
  const handleTeachingModeChange = (modeId: string, field: 'selected' | 'monthlyPrice', value: boolean | string) => {
    updateFormData({
      teachingModes: {
        ...formData.teachingModes,
        [modeId]: {
          ...formData.teachingModes[modeId],
          [field]: value
        }
      }
    });
  };

  const handleDayChange = (day: string, checked: boolean) => {
    updateFormData({
      availableDays: checked 
        ? [...formData.availableDays, day]
        : formData.availableDays.filter(d => d !== day)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mentor-blue-50 via-white to-mentor-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-mentor-blue-600 to-mentor-yellow-500 bg-clip-text text-transparent mb-4">
            Join HomeMentor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Become a part of our elite tutoring network and help students achieve their academic goals through personalized offline coaching.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="border-mentor-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Please provide your basic details and required documents
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData({ fullName: e.target.value })}
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
                    <SelectTrigger className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min="18"
                    max="65"
                    value={formData.age}
                    onChange={(e) => updateFormData({ age: e.target.value })}
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4 text-mentor-blue-700">Required Documents & Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Profile Photo */}
                  <div>
                    <Label htmlFor="photo" className="flex items-center gap-2 mb-2">
                      <Image className="h-4 w-4" />
                      Profile Photo *
                    </Label>
                    <div className="relative">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('photo', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="photo"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mentor-yellow-400 bg-gray-50 hover:bg-mentor-yellow-50 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {formData.photo ? formData.photo.name : 'Click to upload photo'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* ID Document */}
                  <div>
                    <Label htmlFor="idDocument" className="flex items-center gap-2 mb-2">
                      <IdCard className="h-4 w-4" />
                      ID Document *
                    </Label>
                    <div className="relative">
                      <Input
                        id="idDocument"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="idDocument"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mentor-yellow-400 bg-gray-50 hover:bg-mentor-yellow-50 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {formData.idDocument ? formData.idDocument.name : 'Aadhar/PAN/License'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Tutorial Video */}
                  <div>
                    <Label htmlFor="tutorialVideo" className="flex items-center gap-2 mb-2">
                      <Video className="h-4 w-4" />
                      Teaching Video
                    </Label>
                    <div className="relative">
                      <Input
                        id="tutorialVideo"
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange('tutorialVideo', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="tutorialVideo"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mentor-yellow-400 bg-gray-50 hover:bg-mentor-yellow-50 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {formData.tutorialVideo ? formData.tutorialVideo.name : 'Sample teaching video'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Required fields. Teaching video is optional but recommended to showcase your teaching style.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Educational Background */}
          <Card className="border-mentor-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Educational Background
              </CardTitle>
              <CardDescription className="text-mentor-yellow-100">
                Your academic qualifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="qualification">Highest Qualification *</Label>
                  <Select value={formData.highestQualification} onValueChange={(value) => updateFormData({ highestQualification: value })}>
                    <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-mentor-yellow-200">
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certification">Professional Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialization">Field of Specialization *</Label>
                  <Select value={formData.specialization} onValueChange={(value) => updateFormData({ specialization: value })}>
                    <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-mentor-yellow-200">
                      <SelectItem value="science">Science & Technology</SelectItem>
                      <SelectItem value="commerce">Commerce & Business</SelectItem>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="medicine">Medicine & Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="university">University/Institution</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => updateFormData({ university: e.target.value })}
                    className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400"
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Year of Graduation *</Label>
                  <Select value={formData.graduationYear} onValueChange={(value) => updateFormData({ graduationYear: value })}>
                    <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-mentor-yellow-200">
                      {Array.from({length: 20}, (_, i) => 2024 - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="experience">Teaching Experience *</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormData({ experience: value })}>
                    <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-mentor-yellow-200">
                      <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Availability Range */}
          <Card className="border-mentor-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Availability Range
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Where are you located and what's your teaching range?
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) => updateFormData({ address: e.target.value })}
                  className="mt-1 focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData({ city: e.target.value })}
                    className="mt-1 focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData({ state: value })}>
                    <SelectTrigger className="mt-1 focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-mentor-blue-200 max-h-60">
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => updateFormData({ pincode: e.target.value })}
                    className="mt-1 focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="availabilityRange">Teaching Availability Range *</Label>
                <Select value={formData.availabilityRange} onValueChange={(value) => updateFormData({ availabilityRange: value })}>
                  <SelectTrigger className="mt-1 focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400">
                    <SelectValue placeholder="Select your travel range" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-mentor-blue-200">
                    <SelectItem value="2km">Within 2 km</SelectItem>
                    <SelectItem value="5km">Within 5 km</SelectItem>
                    <SelectItem value="10km">Within 10 km</SelectItem>
                    <SelectItem value="15km">Within 15 km</SelectItem>
                    <SelectItem value="20km">Within 20 km</SelectItem>
                    <SelectItem value="25km+">25+ km</SelectItem>
                    <SelectItem value="anywhere">Anywhere in city</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Modes & Monthly Pricing */}
          <Card className="border-mentor-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Teaching Modes & Monthly Pricing
              </CardTitle>
              <CardDescription className="text-mentor-yellow-100">
                Select your preferred teaching modes and set monthly rates
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {teachingModeOptions.map((mode) => (
                <div key={mode.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={`mode-${mode.id}`}
                      checked={formData.teachingModes[mode.id]?.selected || false}
                      onCheckedChange={(checked) => handleTeachingModeChange(mode.id, 'selected', checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-mentor-blue-500 data-[state=checked]:border-mentor-blue-500"
                    />
                    <div className="flex-1">
                      <Label htmlFor={`mode-${mode.id}`} className="text-base font-medium cursor-pointer">
                        {mode.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{mode.description}</p>
                      {formData.teachingModes[mode.id]?.selected && (
                        <div className="mt-3">
                          <Label className="text-sm">Monthly Rate (₹) *</Label>
                          <Select 
                            value={formData.teachingModes[mode.id]?.monthlyPrice || ''} 
                            onValueChange={(value) => handleTeachingModeChange(mode.id, 'monthlyPrice', value)}
                          >
                            <SelectTrigger className="mt-1 w-full md:w-64 focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400">
                              <SelectValue placeholder="Select monthly rate" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-mentor-yellow-200">
                              <SelectItem value="2000-4000">₹2,000 - ₹4,000</SelectItem>
                              <SelectItem value="4000-6000">₹4,000 - ₹6,000</SelectItem>
                              <SelectItem value="6000-8000">₹6,000 - ₹8,000</SelectItem>
                              <SelectItem value="8000-10000">₹8,000 - ₹10,000</SelectItem>
                              <SelectItem value="10000-15000">₹10,000 - ₹15,000</SelectItem>
                              <SelectItem value="15000-20000">₹15,000 - ₹20,000</SelectItem>
                              <SelectItem value="20000+">₹20,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Teaching Preferences - Hierarchical Selection */}
          <Card className="border-mentor-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Teaching Preferences
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Select education levels, then classes/courses, and finally subjects you can teach
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Education Levels */}
              <div className="space-y-4">
                {Object.entries(educationLevels).map(([levelId, level]) => (
                  <div key={levelId} className="border border-gray-200 rounded-lg p-4">
                    {/* Level Selection */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`level-${levelId}`}
                          checked={selectedLevels.includes(levelId)}
                          onCheckedChange={(checked) => handleLevelChange(levelId, checked as boolean)}
                          className="data-[state=checked]:bg-mentor-yellow-500 data-[state=checked]:border-mentor-yellow-500"
                        />
                        <Label htmlFor={`level-${levelId}`} className="text-lg font-medium cursor-pointer">
                          {level.label}
                        </Label>
                      </div>
                      {selectedLevels.includes(levelId) && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedLevels(prev => ({ ...prev, [levelId]: !prev[levelId] }))}
                          className="h-8 w-8 p-0"
                        >
                          {expandedLevels[levelId] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Classes/Courses (shown when level is selected and expanded) */}
                    {selectedLevels.includes(levelId) && expandedLevels[levelId] && (
                      <div className="ml-6 space-y-3 border-l-2 border-gray-200 pl-4">
                        {Object.entries(level.classes).map(([classId, classInfo]) => (
                          <div key={classId} className="border border-gray-100 rounded-md p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`class-${levelId}-${classId}`}
                                  checked={!!formData.teachingPreferences[levelId]?.[classId]}
                                  onCheckedChange={(checked) => handleClassChange(levelId, classId, checked as boolean)}
                                  className="data-[state=checked]:bg-mentor-blue-500 data-[state=checked]:border-mentor-blue-500"
                                />
                                <Label htmlFor={`class-${levelId}-${classId}`} className="font-medium cursor-pointer">
                                  {classInfo.label}
                                </Label>
                              </div>
                              {formData.teachingPreferences[levelId]?.[classId] && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-mentor-blue-100 text-mentor-blue-700 px-2 py-1 rounded">
                                    {getSelectedSubjectsCount(levelId, classId)} subjects
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setExpandedClasses(prev => ({ 
                                      ...prev, 
                                      [`${levelId}-${classId}`]: !prev[`${levelId}-${classId}`] 
                                    }))}
                                    className="h-6 w-6 p-0"
                                  >
                                    {expandedClasses[`${levelId}-${classId}`] ? (
                                      <ChevronUp className="h-3 w-3" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3" />
                                    )}
                                  </Button>
                                </div>
                              )}
                            </div>

                            {/* Subjects (shown when class is selected and expanded) */}
                            {formData.teachingPreferences[levelId]?.[classId] && expandedClasses[`${levelId}-${classId}`] && (
                              <div className="ml-4 grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {classInfo.subjects.map((subject) => (
                                  <div key={subject} className="flex items-center space-x-1">
                                    <Checkbox
                                      id={`subject-${levelId}-${classId}-${subject}`}
                                      checked={isSubjectSelected(levelId, classId, subject)}
                                      onCheckedChange={(checked) => handleSubjectChange(levelId, classId, subject, checked as boolean)}
                                      className="data-[state=checked]:bg-mentor-yellow-500 data-[state=checked]:border-mentor-yellow-500 h-3 w-3"
                                    />
                                    <Label htmlFor={`subject-${levelId}-${classId}-${subject}`} className="text-xs cursor-pointer">
                                      {subject}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability - Simplified */}
          <Card className="border-mentor-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Availability
              </CardTitle>
              <CardDescription className="text-mentor-yellow-100">
                When are you available to teach?
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="text-base font-medium">Available Days * (Select multiple)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {days.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${day}`}
                        checked={formData.availableDays.includes(day)}
                        onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                        className="data-[state=checked]:bg-mentor-blue-500 data-[state=checked]:border-mentor-blue-500"
                      />
                      <Label htmlFor={`day-${day}`} className="text-sm">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="startDate">When can you start? *</Label>
                <Select value={formData.startDate} onValueChange={(value) => updateFormData({ startDate: value })}>
                  <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                    <SelectValue placeholder="Select start date" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-mentor-yellow-200">
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1week">Within 1 week</SelectItem>
                    <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                    <SelectItem value="1month">Within 1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Experience - Simplified */}
          <Card className="border-mentor-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Teaching Details
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Brief description of your teaching approach
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="teachingExperience">Teaching Experience & Approach</Label>
                <Textarea
                  id="teachingExperience"
                  placeholder="Briefly describe your teaching experience and methodology (e.g., years of experience, teaching style, student success stories)..."
                  value={formData.teachingExperience}
                  onChange={(e) => updateFormData({ teachingExperience: e.target.value })}
                  className="mt-1 min-h-[80px] focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-mentor-blue-600 to-mentor-yellow-500 hover:from-mentor-blue-700 hover:to-mentor-yellow-600 text-white px-12 py-3 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Submit Application
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              By submitting this form, you agree to our terms and conditions and privacy policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorRegistrationForm;