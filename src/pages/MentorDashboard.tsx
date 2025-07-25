import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  User, 
  DollarSign, 
  BookOpen, 
  Settings, 
  Bell,
  ChevronRight,
  Star,
  Video
} from 'lucide-react';

// Mock data for demonstration
const mockClasses = [
  {
    id: 2,
    mentorName: "Alex Rodriguez",
    mentorImage: "/placeholder.svg", 
    subject: "Full Stack Development",
    status: "pending_schedule",
    duration: "90 min",
    price: 120,
    bookedDate: "2024-07-24",
    type: "one-on-one"
  },
  {
    id: 1,
    mentorName: "Dr. Sarah Chen",
    mentorImage: "/placeholder.svg",
    subject: "Machine Learning Fundamentals",
    status: "scheduled",
    scheduledDate: "2024-07-28",
    scheduledTime: "2:00 PM",
    duration: "60 min",
    price: 150,
    bookedDate: "2024-07-25",
    type: "one-on-one"
  },
  
  {
    id: 3,
    mentorName: "Emily Johnson",
    mentorImage: "/placeholder.svg",
    subject: "Product Strategy Session",
    status: "completed",
    scheduledDate: "2024-07-20",
    scheduledTime: "10:00 AM",
    duration: "45 min",
    price: 200,
    bookedDate: "2024-07-18",
    type: "consultation",
    rating: 5
  }
];

const MentorDashboard = () => {
  const [userType, setUserType] = useState<'parent' | 'mentor'>('mentor');
  
  // Simulate user type detection (in real app, this would come from auth)
  useEffect(() => {
    // For demo purposes, you can change this to 'mentor' to see mentor view
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') as 'parent' | 'mentor';
    if (type) setUserType(type);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'pending_schedule': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'pending_schedule': return 'Awaiting Schedule';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userType === 'parent' ? 'Parent' : 'Mentor'} Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              {userType === 'parent' 
                ? 'Manage your mentoring sessions and track progress' 
                : 'Manage your students and upcoming sessions'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === 'parent' ? 'Total Sessions' : 'Active Students'}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userType === 'parent' ? '12' : '24'}
              </div>
              <p className="text-xs text-muted-foreground">
                {userType === 'parent' ? '+2 this month' : '+5 this month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userType === 'parent' ? 'Total Spent' : 'Total Earned'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${userType === 'parent' ? '1,240' : '3,680'}
              </div>
              <p className="text-xs text-muted-foreground">
                {userType === 'parent' ? '+$320 this month' : '+$890 this month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                {userType === 'parent' ? 'From mentors' : 'From students'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="classes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="classes">
              {userType === 'parent' ? 'My Classes' : 'Student Classes'}
            </TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="payments">
              {userType === 'parent' ? 'Payments' : 'Earnings'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {userType === 'parent' ? 'Your Booked Classes' : 'Your Student Classes'}
              </h2>
              <Button size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </div>

            <div className="space-y-4">
              {mockClasses.map((classItem) => (
                <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img
                          src={classItem.mentorImage}
                          alt={classItem.mentorName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{classItem.subject}</h3>
                            <Badge className={getStatusColor(classItem.status)}>
                              {getStatusText(classItem.status)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-1">
                            {userType === 'parent' ? 'Mentor: ' : 'Student: '}{classItem.mentorName}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {classItem.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${classItem.price}
                            </span>
                            <span>Booked: {classItem.bookedDate}</span>
                          </div>
                          {classItem.scheduledDate && (
                            <div className="mt-2 p-2 bg-green-50 rounded-md">
                              <p className="text-sm text-green-800">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Scheduled for {classItem.scheduledDate} at {classItem.scheduledTime}
                              </p>
                            </div>
                          )}
                          {classItem.status === 'completed' && classItem.rating && (
                            <div className="mt-2 flex items-center gap-1">
                              <span className="text-sm text-gray-600">Rating:</span>
                              {[...Array(classItem.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {classItem.status === 'pending_schedule' && userType === 'mentor' && (
                          <Button size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Set Schedule
                          </Button>
                        )}
                        {classItem.status === 'scheduled' && (
                          <Button size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join Session
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Management</CardTitle>
                <CardDescription>
                  {userType === 'parent' 
                    ? 'View your upcoming sessions and request schedule changes'
                    : 'Manage your availability and set session schedules'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Schedule management interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === 'parent' ? 'Payment History' : 'Earnings Overview'}
                </CardTitle>
                <CardDescription>
                  {userType === 'parent' 
                    ? 'Track your mentoring session payments'
                    : 'Monitor your earnings and payment schedule'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    {userType === 'parent' ? 'Payment' : 'Earnings'} details coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MentorDashboard;