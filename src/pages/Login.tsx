import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Eye, EyeOff } from "lucide-react";
import LoginPopup from "@/components/LoginPopup";
import axios from "axios";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "mentor">("student");

  const [number, setNumber] = useState("");
  const [mentorOtpSent, setMentorOtpSent] = useState(false); // for mentor
  const handleSendOTP = async () => {
    navigate(`/dashboard/${userType}`)
    // if (!phoneNumber || phoneNumber.length !== 10)
    //   return toast.error("Enter valid 10-digit number");

    // setIsLoading(true);
    // try {
    //   await sendOTP({ phone: phoneNumber, userType }); // Call your backend API here
    //   setOtpSent(true);
    //   toast.success("OTP sent!");
    // } catch (err) {
    //   toast.error("Failed to send OTP");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      await verifyOTP({ phone: phoneNumber, otp, userType }); // Backend verify logic
      toast.success("Logged in successfully!");
      // Navigate to dashboard after login
    } catch (err) {
      toast.error("Incorrect OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const [isOTP, setIsOTP] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock login - in a real app, this would be an API call
      // Redirect based on user type
      if (userType === "student") {
        const response = await axios.post(
          "https://homentor-backend.onrender.com/api/users/login-check",
          { phone: number }
        );
        localStorage.setItem("usernumber", number);
        navigate("/dashboard/student");
      } else {
        const response = await axios.post(
          "https://homentor-backend.onrender.com/api/mentor/login-check",
          { phone: number }
        );
        localStorage.setItem("usernumber", number);

        navigate("/dashboard/mentor");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Logged in successfully",
        description: `Welcome back! You are logged in as a ${userType}.`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isOtp, setIsOtp] = useState(false);
  const handleOTP = async () => {
    setIsOtp(true);
    setIsLoading(true);
    const response = await axios.post(
      "https://homentor-backend.onrender.com/api/users/login-check",
      { phone: number }
    );
    setIsLoading(false);
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    const response = await axios.post(
      "https://homentor-backend.onrender.com/api/users/verify-check",
      { phone: number }
    );
  };

  return (
    <Layout>
      <Card className="max-w-md mx-auto mt-12">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to Homentor</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="student"
            onValueChange={(val) => {
              setUserType(val as "student" | "mentor");
              setOtpSent(false);
              setPhoneNumber("");
              setOTP("");
            }}
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
            </TabsList>

            {/* Login Tab Content */}
            <TabsContent value="student">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit number"
                  />
                </div>

                {!otpSent ? (
                  <Button
                    className="w-full bg-homentor-blue hover:bg-homentor-darkBlue"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Enter OTP</Label>
                      <Input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="6-digit OTP"
                      />
                    </div>
                    <Button
                      className="w-full bg-homentor-blue hover:bg-homentor-darkBlue"
                      onClick={handleVerifyOTP}
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Login"}
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="mentor">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit number"
                  />
                </div>

                {!otpSent ? (
                  <Button
                    className="w-full bg-homentor-blue hover:bg-homentor-darkBlue"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Enter OTP</Label>
                      <Input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="6-digit OTP"
                      />
                    </div>
                    <Button
                      className="w-full bg-homentor-blue hover:bg-homentor-darkBlue"
                      onClick={handleVerifyOTP}
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Login"}
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Login;
