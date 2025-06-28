
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, CheckCircle, User, MessageSquare, Video, Search, Settings, BookOpen } from 'lucide-react';
import axios from 'axios';

// Mock data for the mentor dashboard
const upcomingSessions = [
  {
    id: 1,
    studentName: 'John Smith',
    studentAvatar: 'https://github.com/shadcn.png',
    subject: 'Mathematics',
    topic: 'Calculus Fundamentals',
    date: '2025-05-22',
    time: '4:00 PM - 5:00 PM',
    isOnline: true,
    isPaid: true,
  },
  {
    id: 2,
    studentName: 'Emily Johnson',
    studentAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    subject: 'Mathematics',
    topic: 'Linear Algebra Intro',
    date: '2025-05-23',
    time: '2:00 PM - 3:00 PM',
    isOnline: true,
    isPaid: true,
  },
  {
    id: 3,
    studentName: 'Michael Brown',
    studentAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    subject: 'Physics',
    topic: 'Mechanics Review',
    date: '2025-05-25',
    time: '5:00 PM - 6:30 PM',
    isOnline: false,
    isPaid: true,
  },
];

const pendingRequests = [
  {
    id: 1,
    studentName: 'Alice Williams',
    studentAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    subject: 'Mathematics',
    message: 'I need help with my calculus homework. Are you available this weekend?',
    date: '2025-05-21',
    time: 'Flexible',
  },
  {
    id: 2,
    studentName: 'Robert Davis',
    studentAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    subject: 'Physics',
    message: 'I\'m struggling with understanding quantum mechanics concepts. Can you help?',
    date: 'Not specified',
    time: 'Evenings preferred',
  },
];

const earnings = {
  currentMonth: 1240,
  lastMonth: 980,
  totalStudents: 18,
  totalSessions: 45,
  completionRate: 95,
  averageRating: 4.8,
  recentTransactions: [
    { id: 1, student: 'John Smith', amount: 40, date: '2025-05-18', subject: 'Mathematics' },
    { id: 2, student: 'Emily Johnson', amount: 40, date: '2025-05-15', subject: 'Mathematics' },
    { id: 3, student: 'Michael Brown', amount: 60, date: '2025-05-12', subject: 'Physics' },
  ]
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const CallAdmin = () => {
  const [notes, setNotes] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSaveNotes = () => {
    if (!notes.trim()) {
      toast({
        title: "Cannot save empty notes",
        description: "Please enter some notes before saving.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to the server
    toast({
      title: "Notes saved",
      description: "Session notes have been saved successfully.",
    });
    setNotes('');
  };

  const handleAcceptRequest = (requestId: number) => {
    // In a real app, this would update the request status in the database
    toast({
      title: "Request accepted",
      description: "The session has been added to your schedule.",
    });
  };

  const handleDeclineRequest = (requestId: number) => {
    // In a real app, this would update the request status in the database
    toast({
      title: "Request declined",
      description: "The student has been notified.",
    });
  };
  const [callData, setCallData] = useState([])
  useEffect(()=>{fetchCallData()}, [])
  const fetchCallData = ()=>{
    axios.get(`https://homentor-backend.onrender.com/api/mentor-call`).then((res)=>{
      setCallData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

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
              <Link to="/dashboard/mentor" className="font-medium">Dashboard</Link>
              <Link to="/dashboard/mentor/sessions" className="font-medium opacity-80 hover:opacity-100 transition-opacity">Sessions</Link>
              <Link to="/dashboard/mentor/students" className="font-medium opacity-80 hover:opacity-100 transition-opacity">Students</Link>
              <Link to="/dashboard/mentor/messages" className="font-medium opacity-80 hover:opacity-100 transition-opacity">Messages</Link>
              <Link to="/dashboard/mentor/earnings" className="font-medium opacity-80 hover:opacity-100 transition-opacity">Earnings</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-homentor-blue">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <span className="ml-2 hidden sm:inline">Sarah Johnson</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-tight py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Mentor Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your sessions, students, and earnings in one place.</p>
        
        <table>
          <thead>
            <th>S. no.</th>
            <th>Name</th>
            <th>Contact Number</th>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
        
        <div className="grid lg:grid-cols-3 gap-6">
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
                            <AvatarImage src={session.studentAvatar} alt={session.studentName} />
                            <AvatarFallback>{session.studentName.charAt(0)}</AvatarFallback>
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
                          <div className="text-sm text-gray-600 mb-2">with {session.studentName}</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm text-gray-600">{session.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                session.isOnline 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {session.isOnline ? 'Online' : 'In-Person'}
                              </span>
                              {session.isPaid && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Paid
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button size="sm" className="text-xs h-8 px-3 bg-homentor-blue hover:bg-homentor-darkBlue">
                              <Video className="h-3 w-3 mr-1" />
                              Start Session
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="text-xs h-8 px-3 border-gray-300">
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  Session Notes
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Session Notes</DialogTitle>
                                  <DialogDescription>
                                    Add notes for your session with {session.studentName}.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <div className="font-medium">{session.subject}: {session.topic}</div>
                                    <div className="text-sm text-gray-600">{formatDate(session.date)} • {session.time}</div>
                                    <div className="text-sm text-gray-600">Student: {session.studentName}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="notes">Session Notes</Label>
                                    <Textarea 
                                      id="notes" 
                                      placeholder="Add notes about the student's progress, topics covered, homework assigned, etc."
                                      value={notes}
                                      onChange={(e) => setNotes(e.target.value)}
                                      className="min-h-[200px]"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={handleSaveNotes}>
                                    Save Notes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Button size="sm" variant="outline" className="text-xs h-8 px-3 border-gray-300">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-center">
                      <Link to="/dashboard/mentor/sessions">
                        <Button variant="outline" className="text-homentor-blue border-homentor-blue hover:bg-homentor-lightBlue">
                          View All Sessions
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">No upcoming sessions</h3>
                    <p className="text-gray-600 mb-4">You have no upcoming sessions scheduled</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Session Requests</h2>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map(request => (
                      <div key={request.id} className="p-4 border border-gray-100 rounded-lg">
                        <div className="flex items-start">
                          <div className="mr-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={request.studentAvatar} alt={request.studentName} />
                              <AvatarFallback>{request.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium">{request.studentName}</h3>
                              <span className="text-sm text-gray-500">
                                Subject: {request.subject}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">
                              "{request.message}"
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
                              {request.date !== 'Not specified' && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{request.date}</span>
                                </div>
                              )}
                              {request.time && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{request.time}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Button 
                            size="sm" 
                            className="flex-1 text-xs h-8 bg-homentor-blue hover:bg-homentor-darkBlue"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs h-8 border-gray-300"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            Decline
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-8 px-3 border-gray-300">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="font-medium text-gray-900 mb-1">No pending requests</h3>
                    <p className="text-gray-600">You have no pending session requests</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Earnings</h2>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-500">This Month</div>
                    <div className="text-3xl font-bold">${earnings.currentMonth}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Last Month</div>
                    <div className="text-xl font-medium">${earnings.lastMonth}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="text-sm font-medium">{earnings.completionRate}%</span>
                    </div>
                    <Progress value={earnings.completionRate} className="h-2" />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Total Students</div>
                        <div className="text-xl font-medium">{earnings.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Total Sessions</div>
                        <div className="text-xl font-medium">{earnings.totalSessions}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Avg. Rating</div>
                        <div className="text-xl font-medium">{earnings.averageRating}/5</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Subjects</div>
                        <div className="text-xl font-medium">2</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Recent Transactions</h3>
                    <div className="space-y-2">
                      {earnings.recentTransactions.map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                          <div>
                            <div className="font-medium">{transaction.student}</div>
                            <div className="text-xs text-gray-500">{transaction.subject} • {transaction.date}</div>
                          </div>
                          <div className="font-medium text-green-600">+${transaction.amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/dashboard/mentor/earnings">
                    <Button variant="outline" className="w-full text-homentor-blue border-homentor-blue hover:bg-homentor-lightBlue">
                      View Earnings Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Update Availability</h2>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Set your weekly availability to let students know when you can schedule sessions.
                  </p>
                  <Button className="w-full bg-homentor-blue hover:bg-homentor-darkBlue">
                    Manage Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Completion</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Profile completeness</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2 mb-4" />
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Basic Information</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Education & Qualifications</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Subject Expertise</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <div className="h-4 w-4 border border-gray-300 rounded-full mr-2" />
                      <span>Teaching Approach (Missing)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <div className="h-4 w-4 border border-gray-300 rounded-full mr-2" />
                      <span>Add Profile Video (Missing)</span>
                    </div>
                  </div>
                  
                  <Link to="/dashboard/mentor/profile">
                    <Button variant="outline" className="w-full mt-2 text-homentor-blue border-homentor-blue hover:bg-homentor-lightBlue">
                      Complete Your Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallAdmin;
