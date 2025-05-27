import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Layout from '@/components/Layout';

const AboutUs = () => {
  return (
    <Layout>
         <section className="bg-white py-20 mt-[8vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-4xl font-bold text-homentor-blue relative inline-block">
            About Us
            <span className="absolute -z-10 bottom-1 left-0 w-full h-3 bg-homentor-lightGold opacity-40"></span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Empowering students and connecting them to the right mentors.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
          <ScrollReveal className="space-y-6">
            <h3 className="text-2xl font-semibold text-homentor-blue">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We are a team of passionate educators and technologists committed to transforming learning experiences. Through our platform, students can connect with expert mentors in various subjects to get personalized guidance and improve their understanding.
            </p>

            <h3 className="text-2xl font-semibold text-homentor-blue">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to create an accessible and inspiring educational ecosystem. We aim to bridge the gap between knowledge seekers and knowledge providers through innovative and reliable mentorship solutions.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <img
              src="https://images.unsplash.com/photo-1600195077073-fb57a63aa3a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
              alt="Teamwork"
              className="rounded-xl shadow-lg"
            />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3} className="mt-20 text-center">
          <h3 className="text-2xl font-semibold text-homentor-blue mb-4">
            Why Choose Us?
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            With carefully selected mentors, modern tools, and a student-focused approach, we ensure your learning journey is effective, enjoyable, and empowering.
          </p>
        </ScrollReveal>
      </div>
    </section>
    </Layout>
   
  );
};

export default AboutUs;
