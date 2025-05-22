
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, BookOpen, User, MessageSquare, Video, Star, Search } from 'lucide-react';

// Mock data for the student dashboard
const upcomingSessions = [
  {
    id: 1,
    mentorName: 'Sarah Johnson',
    mentorAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop',
    subject: 'Mathematics',
    topic: 'Calculus Fundamentals',
    date: '2025-05-22',
    time: '4:00 PM - 5:00 PM',
    isOnline: true,
  },
  {
    id: 2,
    mentorName: 'David Wilson',
    mentorAvatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop',
    subject: 'Computer Science',
    topic: 'Introduction to Algorithms',
    date: '2025-05-25',
    time: '2:00 PM - 3:30 PM',
    isOnline: true,
  },
];

const pastSessions = [
  {
    id: 3,
    mentorName: 'Michael Rodriguez',
    mentorAvatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop',
    subject: 'Chemistry',
    topic: 'Organic Chemistry Review',
    date: '2025-05-15',
    time: '5:00 PM - 6:00 PM',
    isOnline: true,
    isRated: true,
    rating: 5,
  },
  {
    id: 4,
    mentorName: 'Emily Chen',
    mentorAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
    subject: 'English Literature',
    topic: 'Essay Writing Techniques',
    date: '2025-05-10',
    time: '3:00 PM - 4:00 PM',
    isOnline: true,
    isRated: false,
  },
  {
    id: 5,
    mentorName: 'Jennifer Lee',
    mentorAvatar: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop',
    subject: 'History',
    topic: 'World War II Analysis',
    date: '2025-05-05',
    time: '6:00 PM - 7:00 PM',
    isOnline: false,
    isRated: true,
    rating: 4,
  },
];

const courseProgress = [
  {
    id: 1,
    subject: 'Mathematics',
    progress: 60,
    total: 10,
    completed: 6,
  },
  {
    id: 2,
    subject: 'Computer Science',
    progress: 30,
    total: 8,
    completed: 2.4,
  },
  {
    id: 3,
    subject: 'Chemistry',
    progress: 90,
    total: 5,
    completed: 4.5,
  },
];

const recommendedMentors = [
  {
    id: 1,
    name: 'Robert Thomas',
    subjects: ['Spanish', 'French'],
    rating: 4.8,
    hourlyRate: 40,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'David Wilson',
    subjects: ['Computer Science', 'Mathematics'],
    rating: 4.7,
    hourlyRate: 50,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop',
  },
];

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const StudentDashboard = () => {
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmitFeedback = () => {
    if (!feedbackMessage.trim()) {
      toast({
        title: "Feedback submission failed",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send feedback to the server
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    setFeedbackMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-homentor-blue text-white py-4 px-6 shadow-sm">
        <div className="container-tight flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <img 
                src="/lovable-uploads/fd84ccc3-d993-4d2a-b179-a79cbae53518.png" 
                alt="Homentor Logo" 
                className="h-8"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard/student" className="font-medium">Dashboard</Link>
              <Link to="/mentors" className="font-medium opacity-80 hover:opacity-100 transition-opacity">Find Mentors</Link>
              <Link to="/dashboard/student/sessions" className="font-medium opacity-80 hover:opacity-100 transition-opacity">My Sessions</Link>
              <Link to="/dashboard/student/messages" className="font-medium opacity-80 hover:opacity-100 transition-opacity">Messages</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-homentor-blue">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <span className="ml-2 hidden sm:inline">John Smith</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-tight py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-gray-600 mb-8">Here's an overview of your learning progress and upcoming sessions.</p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">Upcoming Sessions</h3>
                <span className="bg-homentor-blue/10 text-homentor-blue text-sm font-medium px-2 py-1 rounded">
                  {upcomingSessions.length}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Next session in 2 days</p>
              <Link to="/dashboard/student/sessions">
                <Button variant="outline" className="w-full mt-2 text-homentor-blue border-homentor-blue hover:bg-homentor-lightBlue">
                  View All Sessions
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">Learning Progress</h3>
                <span className="bg-green-100 text-green-700 text-sm font-medium px-2 py-1 rounded">
                  60% Complete
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">You're making steady progress!</p>
              <Link to="/dashboard/student/progress">
                <Button variant="outline" className="w-full mt-2 text-homentor-blue border-homentor-blue hover:bg-homentor-lightBlue">
                  View Progress Details
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">Recommended</h3>
                <span className="bg-homentor-gold/20 text-homentor-darkGold text-sm font-medium px-2 py-1 rounded">
                  New
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Mentors selected for you</p>
              <Link to="/mentors">
                <Button variant="outline" className="w-full mt-2 text-homentor-blue border-homentor-blue hover:bg-homentor-lightBlue">
                  Explore Mentors
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="flex items-start p-4 border border-gray-100 rounded-lg hover:border-homentor-blue transition-colors">
                        <div className="mr-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.mentorAvatar} alt={session.mentorName} />
                            <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">{session.subject}: {session.topic}</h3>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm text-gray-600">{formatDate(session.date)}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">with {session.mentorName}</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm text-gray-600">{session.time}</span>
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                session.isOnline 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {session.isOnline ? 'Online' : 'In-Person'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" className="text-xs h-8 px-3 bg-homentor-blue hover:bg-homentor-darkBlue">
                              <Video className="h-3 w-3 mr-1" />
                              Join Session
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs h-8 px-3 border-gray-300">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Contact Mentor
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">No upcoming sessions</h3>
                    <p className="text-gray-600 mb-4">Schedule a session with a mentor to get started</p>
                    <Link to="/mentors">
                      <Button className="bg-homentor-blue hover:bg-homentor-darkBlue">
                        Find a Mentor
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Learning Progress</h2>
                {courseProgress.map(course => (
                  <div key={course.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{course.subject}</span>
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-1" />
                    <div className="text-xs text-gray-600">
                      {course.completed} of {course.total} sessions completed
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recommended Mentors</h2>
                {recommendedMentors.map(mentor => (
                  <div key={mentor.id} className="flex items-start p-3 border border-gray-100 rounded-lg mb-3 last:mb-0 hover:border-homentor-blue transition-colors">
                    <div className="mr-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium">{mentor.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-current text-homentor-gold" />
                          <span className="text-xs ml-1">{mentor.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{mentor.subjects.join(', ')}</div>
                      <div className="text-sm font-medium">${mentor.hourlyRate}/hour</div>
                      <div className="mt-2">
                        <Link to={`/mentors/${mentor.id}`}>
                          <Button size="sm" className="text-xs h-8 w-full bg-homentor-blue hover:bg-homentor-darkBlue">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-center">
                  <Link to="/mentors" className="text-homentor-blue hover:underline text-sm font-medium">
                    View All Mentors
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
                <Tabs defaultValue="past">
                  <TabsList className="mb-4">
                    <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="past">
                    {pastSessions.slice(0, 2).map(session => (
                      <div key={session.id} className="flex items-start p-3 border border-gray-100 rounded-lg mb-3 last:mb-0">
                        <div className="mr-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.mentorAvatar} alt={session.mentorName} />
                            <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">{session.subject}</h3>
                            <span className="text-xs text-gray-500">{formatDate(session.date)}</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">with {session.mentorName}</div>
                          
                          {!session.isRated ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="text-xs h-7 px-3 bg-homentor-gold text-gray-900 hover:bg-homentor-darkGold">
                                  <Star className="h-3 w-3 mr-1" />
                                  Leave Feedback
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Leave Feedback</DialogTitle>
                                  <DialogDescription>
                                    Share your experience with {session.mentorName} from your {session.subject} session.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-center justify-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                      <button key={rating} className="p-1">
                                        <Star className="h-8 w-8 text-gray-300 hover:text-homentor-gold transition-colors" />
                                      </button>
                                    ))}
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="feedback">Your Feedback</Label>
                                    <Textarea 
                                      id="feedback" 
                                      placeholder="Share your experience with this mentor..."
                                      value={feedbackMessage}
                                      onChange={(e) => setFeedbackMessage(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={handleSubmitFeedback}>Submit Feedback</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <div className="flex items-center">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-3 w-3 ${
                                      star <= session.rating! 
                                        ? 'fill-current text-homentor-gold' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 ml-2">You rated this session</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="mt-3 text-center">
                      <Link to="/dashboard/student/sessions" className="text-homentor-blue hover:underline text-sm font-medium">
                        View All Sessions
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upcoming">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="flex items-start p-3 border border-gray-100 rounded-lg mb-3 last:mb-0">
                        <div className="mr-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.mentorAvatar} alt={session.mentorName} />
                            <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">{session.subject}</h3>
                            <span className="text-xs text-gray-500">{formatDate(session.date)}</span>
                          </div>
                          <div className="text-sm text-gray-600">{session.time}</div>
                          <div className="text-sm text-gray-600">with {session.mentorName}</div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
