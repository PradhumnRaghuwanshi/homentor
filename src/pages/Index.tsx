
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FeaturedMentorsSection from '@/components/sections/FeaturedMentorsSection';
import SubjectsSection from '@/components/sections/SubjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';

const testimonials = [
  {
    content: "My daughter was struggling with calculus, but after just a few sessions with her Homentor tutor, she gained confidence and improved her grades significantly.",
    author: "Jennifer P.",
    role: "Parent of a high school student",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    content: "I've tried many tutoring services, but Homentor stands out for the quality of their mentors and the personalized approach to learning. Highly recommend!",
    author: "Michael T.",
    role: "University student",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5
  },
  {
    content: "The flexibility of scheduling sessions and the ability to choose between online and in-person tutoring has been a game-changer for our busy family schedule.",
    author: "Sarah K.",
    role: "Parent of two teenagers",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    rating: 4
  }
];

const faqItems = [
  {
    question: "How does Homentor select its mentors?",
    answer: "All mentors on Homentor go through a rigorous verification process that includes background checks, academic credential verification, and teaching ability assessments. Only about 15% of applicants are accepted to ensure the highest quality of instruction."
  },
  {
    question: "Is Homentor available for all grade levels?",
    answer: "Yes, Homentor offers tutoring for students from elementary school through university level. Our mentors specialize in various subjects and age groups, so you can find the perfect match for your specific needs."
  },
  {
    question: "Can I change my mentor if I'm not satisfied?",
    answer: "Absolutely! If you feel your current mentor isn't the right fit, you can request a change at any time. Our goal is to ensure you have the best learning experience possible."
  },
  {
    question: "How much does tutoring cost?",
    answer: "Tutoring rates vary depending on the subject, level, and mentor experience. You can view each mentor's hourly rate on their profile. We offer packages that provide discounted rates for multiple sessions."
  },
  {
    question: "Is there a guarantee for satisfaction?",
    answer: "Yes, we offer a 100% satisfaction guarantee for your first session with any mentor. If you're not completely satisfied, we'll refund that session and help you find a better match."
  }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout fullWidth={true}>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Mentors */}
      <FeaturedMentorsSection />

      {/* Subjects */}
      <SubjectsSection />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* FAQ Section */}
      <FAQSection items={faqItems} />
    </Layout>
  );
};

export default Index;
