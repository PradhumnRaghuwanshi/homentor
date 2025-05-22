
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Star, MapPin, Clock, Calendar as CalendarIcon, Check, BookOpen, Award, MessageSquare, Video } from 'lucide-react';

// Sample mentor data
const mentorData = {
  id: 1,
  name: 'Sarah Johnson',
  subjects: ['Mathematics', 'Physics'],
  rating: 4.9,
  reviewCount: 124,
  hourlyRate: 40,
  location: 'New York, NY',
  image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
  experience: '8+ years',
  bio: 'I am a mathematics and physics tutor with a PhD in Applied Mathematics from MIT. With over 8 years of teaching experience at both high school and college levels, I specialize in making complex concepts easy to understand. My students consistently improve their grades and develop a genuine interest in these subjects.',
  education: [
    { degree: 'PhD in Applied Mathematics', institution: 'Massachusetts Institute of Technology', year: '2015' },
    { degree: 'MSc in Physics', institution: 'Columbia University', year: '2012' },
    { degree: 'BSc in Mathematics', institution: 'University of California, Berkeley', year: '2010' },
  ],
  qualifications: [
    'Certified Mathematics Teacher',
    'Advanced Physics Teaching Certification',
    'Specialized in STEM Education',
  ],
  availability: [
    { day: 'Monday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
    { day: 'Tuesday', slots: ['4:00 PM - 7:00 PM'] },
    { day: 'Wednesday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
    { day: 'Thursday', slots: ['4:00 PM - 7:00 PM'] },
    { day: 'Friday', slots: ['4:00 PM - 6:00 PM'] },
    { day: 'Saturday', slots: ['10:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
    { day: 'Sunday', slots: ['2:00 PM - 5:00 PM'] },
  ],
  reviews: [
    {
      id: 1,
      name: 'Jennifer P.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Sarah is an exceptional tutor. My daughter was struggling with calculus, but after just a few sessions, she gained confidence and improved her grades significantly. Sarah explains complex concepts in a way that\'s easy to understand, and she\'s patient and encouraging.',
    },
    {
      id: 2,
      name: 'Michael T.',
      rating: 5,
      date: '1 month ago',
      comment: 'I highly recommend Sarah for physics tutoring. She helped me prepare for my AP Physics exam, and I ended up getting a 5! She has a knack for breaking down difficult topics and making them accessible.',
    },
    {
      id: 3,
      name: 'David K.',
      rating: 4,
      date: '3 months ago',
      comment: 'Sarah is a knowledgeable and methodical tutor. She helped me with both math and physics, creating a customized study plan that addressed my specific challenges. Her teaching approach is structured but flexible.',
    },
  ],
};

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const { toast } = useToast();

  // In a real app, fetch mentor data based on id
  const mentor = mentorData;

  const handleBookSession = () => {
    if (!date || !timeSlot) {
      toast({
        title: "Booking Failed",
        description: "Please select both a date and time slot.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send a request to the server
    setTimeout(() => {
      setShowBookingSuccess(true);
    }, 1000);
  };

  const handleRequestDemo = () => {
    if (!message.trim()) {
      toast({
        title: "Request Failed",
        description: "Please enter a message for the mentor.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send a request to the server
    toast({
      title: "Demo Request Sent",
      description: "The mentor will contact you soon about scheduling a demo session.",
    });
    setMessage('');
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container-tight">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mentor Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={`${mentor.image}?w=128&h=128&fit=crop`} 
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
                    <p className="text-homentor-blue font-medium">{mentor.subjects.join(', ')}</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-current text-homentor-gold" />
                        <span className="ml-1 font-medium">{mentor.rating}</span>
                        <span className="ml-1 text-gray-600">({mentor.reviewCount} reviews)</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        ${mentor.hourlyRate}/hr
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{mentor.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{mentor.experience} experience</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-homentor-blue hover:bg-homentor-darkBlue">
                      Book a Session
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-homentor-blue text-homentor-blue hover:bg-homentor-lightBlue">
                          Request Demo Session
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Request a Demo Session</DialogTitle>
                          <DialogDescription>
                            Send a message to {mentor.name} to request a demo session.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea 
                              id="message" 
                              placeholder="Tell the mentor what you need help with..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="min-h-[150px]"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            className="bg-homentor-blue hover:bg-homentor-darkBlue"
                            onClick={handleRequestDemo}
                          >
                            Send Request
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mentor Main Content */}
            <div className="md:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About {mentor.name}</h3>
                  <p className="text-gray-700 mb-6">
                    {mentor.bio}
                  </p>
                  
                  <h4 className="font-semibold text-lg mb-3">Education</h4>
                  <div className="space-y-3 mb-6">
                    {mentor.education.map((edu, index) => (
                      <div key={index} className="flex items-start">
                        <BookOpen className="h-5 w-5 mr-2 text-homentor-blue mt-0.5" />
                        <div>
                          <div className="font-medium">{edu.degree}</div>
                          <div className="text-gray-600">{edu.institution}, {edu.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-3">Certifications & Qualifications</h4>
                  <div className="space-y-2 mb-6">
                    {mentor.qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-homentor-blue" />
                        <span>{qualification}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-3">Subjects</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mentor.subjects.map(subject => (
                      <span key={subject} className="bg-homentor-lightBlue text-homentor-blue px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="booking">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="booking">Book a Session</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                {/* Booking Tab */}
                <TabsContent value="booking" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Book a Session with {mentor.name}</h3>
                      
                      {!showBookingSuccess ? (
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-medium mb-3">1. Choose a date</h4>
                            <Calendar 
                              mode="single" 
                              selected={date} 
                              onSelect={setDate}
                              className="rounded-md border p-3 pointer-events-auto"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">2. Select a time slot</h4>
                            {date ? (
                              <div className="grid grid-cols-2 gap-2">
                                {mentor.availability[date.getDay() === 0 ? 6 : date.getDay() - 1]?.slots.map((slot, index) => (
                                  <button
                                    key={index}
                                    className={`p-3 rounded-md border ${
                                      timeSlot === slot
                                        ? 'bg-homentor-blue text-white border-homentor-blue'
                                        : 'hover:border-homentor-blue'
                                    }`}
                                    onClick={() => setTimeSlot(slot)}
                                  >
                                    {slot}
                                  </button>
                                )) || (
                                  <p className="text-gray-500 col-span-2">No availability on this day</p>
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-500">Please select a date first</p>
                            )}
                            
                            <div className="mt-8">
                              <h4 className="font-medium mb-3">3. Confirm your booking</h4>
                              <div className="bg-gray-50 p-4 rounded-md mb-4">
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-600">Date:</span>
                                  <span className="font-medium">
                                    {date ? format(date, 'MMMM d, yyyy') : 'Not selected'}
                                  </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-600">Time:</span>
                                  <span className="font-medium">{timeSlot || 'Not selected'}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-600">Subject:</span>
                                  <span className="font-medium">{mentor.subjects[0]}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Rate:</span>
                                  <span className="font-medium">${mentor.hourlyRate}/hour</span>
                                </div>
                              </div>
                              
                              <Button 
                                className="w-full bg-homentor-blue hover:bg-homentor-darkBlue"
                                onClick={handleBookSession}
                                disabled={!date || !timeSlot}
                              >
                                Confirm Booking
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-8">
                          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Booking Successful!</h3>
                          <p className="text-gray-600 mb-6">
                            Your session with {mentor.name} has been booked for {date && format(date, 'MMMM d, yyyy')} at {timeSlot}.
                          </p>
                          <div className="bg-gray-50 p-4 rounded-md mb-6 max-w-sm mx-auto text-left">
                            <div className="flex items-center mb-3">
                              <CalendarIcon className="h-5 w-5 text-homentor-blue mr-2" />
                              <span className="font-medium">{date && format(date, 'MMMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center mb-3">
                              <Clock className="h-5 w-5 text-homentor-blue mr-2" />
                              <span className="font-medium">{timeSlot}</span>
                            </div>
                            <div className="flex items-center">
                              <Video className="h-5 w-5 text-homentor-blue mr-2" />
                              <span className="font-medium">Online Session</span>
                            </div>
                          </div>
                          <Button 
                            className="bg-homentor-blue hover:bg-homentor-darkBlue"
                            onClick={() => setShowBookingSuccess(false)}
                          >
                            Return to Booking
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Availability Tab */}
                <TabsContent value="availability">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Weekly Availability</h3>
                      <div className="divide-y">
                        {mentor.availability.map((item, index) => (
                          <div key={index} className="py-4 first:pt-0 last:pb-0">
                            <div className="font-medium mb-2">{item.day}</div>
                            <div className="flex flex-wrap gap-2">
                              {item.slots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                                  {slot}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">Student Reviews</h3>
                        <div className="flex items-center">
                          <span className="text-3xl font-bold mr-2">{mentor.rating}</span>
                          <div>
                            <div className="flex mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${
                                    star <= Math.floor(mentor.rating) 
                                      ? 'fill-current text-homentor-gold' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{mentor.reviewCount} reviews</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {mentor.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                                  <img 
                                    src={`https://randomuser.me/api/portraits/${review.id % 2 === 0 ? 'women' : 'men'}/${review.id + 43}.jpg`} 
                                    alt={review.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{review.name}</div>
                                  <div className="text-gray-500 text-sm">{review.date}</div>
                                </div>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${
                                      star <= review.rating 
                                        ? 'fill-current text-homentor-gold' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorProfile;
