
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TutorApplicationForm from "./pages/TutorApplicationForm";
import ChatPage from "./pages/ChatPage";
import { LoadScript } from '@react-google-maps/api';



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
     <LoadScript googleMapsApiKey="AIzaSyAb6ZthJEvNAczmOeuvFrnwEcMJjhlNpUk" libraries={['places']}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentors/:id" element={<MentorProfile />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/mentor" element={<MentorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/chat/:mentorPhone" element={<ChatPage/>} />

          {/* <Route path="/TutorApplicationForm" element={<TutorApplicationForm />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LoadScript>
  </QueryClientProvider>
);

export default App;
