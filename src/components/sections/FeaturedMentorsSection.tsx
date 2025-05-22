
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxWrapper from '@/components/ParallaxWrapper';

const FeaturedMentorsSection = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background parallax elements */}
      <ParallaxWrapper speed={0.04} className="absolute top-20 left-10 w-64 h-64 bg-homentor-lightBlue rounded-full opacity-20 -z-10" easing="ease-out">
        <div></div>
      </ParallaxWrapper>
      <ParallaxWrapper speed={0.06} direction="down" className="absolute bottom-40 right-20 w-80 h-80 bg-homentor-lightGold rounded-full opacity-20 -z-10" easing="ease-out">
        <div></div>
      </ParallaxWrapper>
      
      <div className="container-tight">
        <ScrollReveal className="text-center mb-12">
          <h2 className="section-heading relative inline-block">
            Featured Mentors
            <span className="absolute -z-10 bottom-2 left-0 h-3 bg-homentor-blue opacity-30 w-full"></span>
          </h2>
          <p className="section-subheading">
            Discover some of our top-rated mentors
          </p>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="card-hover overflow-hidden border-none glassmorphism">
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=350&fit=crop`} 
                    alt={`Featured mentor ${index}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="pt-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                      <div className="flex items-center bg-homentor-lightGold px-2 py-1 rounded-md">
                        <Star className="h-4 w-4 fill-current text-homentor-gold" />
                        <span className="ml-1 text-homentor-charcoal font-medium">4.9</span>
                      </div>
                    </div>
                    <p className="text-homentor-blue font-medium mb-2">Mathematics & Physics</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-homentor-lightBlue text-homentor-blue px-3 py-1 rounded-full text-sm">Calculus</span>
                      <span className="bg-homentor-lightBlue text-homentor-blue px-3 py-1 rounded-full text-sm">Physics</span>
                      <span className="bg-homentor-lightBlue text-homentor-blue px-3 py-1 rounded-full text-sm">Algebra</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      10+ years experience teaching high school and college level math and physics.
                    </p>
                    <Link to={`/mentors/${index}`}>
                      <Button className="w-full bg-gradient-primary hover:bg-homentor-darkBlue transition-all duration-300">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <ScrollReveal delay={0.4}>
            <Link to="/mentors">
              <Button className="bg-homentor-gold text-homentor-charcoal hover:bg-homentor-darkGold shadow-soft hover:shadow-hover transform transition-all duration-300 hover:-translate-y-1">
                Browse All Mentors
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentorsSection;
