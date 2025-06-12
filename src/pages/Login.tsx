
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [userType, setUserType] = useState<'student' | 'mentor'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock login - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back! You are logged in as a ${userType}.`
      });
      
      // Redirect based on user type
      if (userType === 'student') {
        navigate('/dashboard/student');
      } else {
        navigate('/dashboard/mentor');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isOtp, setIsOtp] = useState(false);

  return (
    <Layout>
      <div className="container-tight max-w-md py-12 mt-[8vh]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Log in to your Homentor account</p>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setUserType(value as 'student' | 'mentor')}>
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="mentor">Mentor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Mobile Number</Label>
                    <Input 
                      id="student-email" 
                      type="email" 
                      placeholder="" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                
                  <Button 
                    type="submit" 
                    className="w-full bg-homentor-blue hover:bg-homentor-darkBlue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Send OTP'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="mentor">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Mobile Number</Label>
                    <Input 
                      id="student-email" 
                      type="email" 
                      placeholder="" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-homentor-blue hover:bg-homentor-darkBlue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Send OTP'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
          
          </CardContent>
          
        </Card>
       
      </div>
    </Layout>
  );
};

export default Login;
