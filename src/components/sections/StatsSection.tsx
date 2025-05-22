
import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';

const StatsSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ScrollReveal delay={0.1} className="text-center transform hover:scale-105 transition-transform duration-300">
            <AnimatedCounter 
              end={500} 
              suffix="+" 
              className="text-3xl md:text-4xl font-bold text-homentor-blue mb-2"
              duration={2500}
              easing="easeOut"
            />
            <p className="text-gray-600">Verified Mentors</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="text-center transform hover:scale-105 transition-transform duration-300">
            <AnimatedCounter 
              end={10000} 
              suffix="+" 
              className="text-3xl md:text-4xl font-bold text-homentor-blue mb-2"
              duration={2800}
              easing="easeOut"
            />
            <p className="text-gray-600">Happy Students</p>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="text-center transform hover:scale-105 transition-transform duration-300">
            <AnimatedCounter 
              end={30} 
              suffix="+" 
              className="text-3xl md:text-4xl font-bold text-homentor-blue mb-2"
              duration={2000}
              easing="easeOut"
            />
            <p className="text-gray-600">Subjects Covered</p>
          </ScrollReveal>
          <ScrollReveal delay={0.4} className="text-center transform hover:scale-105 transition-transform duration-300">
            <AnimatedCounter 
              end={4.9} 
              duration={1500} 
              className="text-3xl md:text-4xl font-bold text-homentor-blue mb-2"
              decimals={1}
              easing="easeOut"
            />
            <p className="text-gray-600">Average Rating</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
