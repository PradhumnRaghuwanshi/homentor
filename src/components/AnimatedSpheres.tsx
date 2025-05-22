import React, { useEffect, useRef } from "react";

interface KeyPointSphere {
  title: string;
  content: string;
  color: string;
  size: number;
  position: {
    left: string;
    top: string;
  };
  delay: number;
  duration: number;
}

interface AnimatedSpheresProps {
  keyPoints?: KeyPointSphere[];
}

const defaultKeyPoints: KeyPointSphere[] = [
  {
    title: "HOME TUTOR",
    content: "Personalized one-on-one learning at home",
    color: "blue",
    size: 180,
    position: { left: "5%", top: "20%" },
    delay: 0,
    duration: 20,
  },
  {
    title: "School & College Teachers",
    content: "Experienced educators from top institutions",
    color: "gold",
    size: 190,
    position: { left: "55%", top: "40%" },
    delay: 2, 
    duration: 25,
  },
  {
    title: "Coaching & Counsellor",
    content: "Academic guidance and emotional support",
    color: "blue",
    size: 170,
    position: { left: "25%", top: "65%" },
    delay: 4,
    duration: 22,
  },
];

const AnimatedSpheres: React.FC<AnimatedSpheresProps> = ({ 
  keyPoints = defaultKeyPoints 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const sphereElements: HTMLDivElement[] = [];
    
    // Create the key point spheres
    keyPoints.forEach((point, index) => {
      const sphere = document.createElement('div');
      
      // Set basic styles for the sphere
      sphere.className = `absolute rounded-full flex flex-col items-center justify-center p-6 backdrop-blur-md shadow-lg transform transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-xl`;
      sphere.style.width = `${point.size}px`;
      sphere.style.height = `${point.size}px`;
      sphere.style.left = point.position.left;
      sphere.style.top = point.position.top;
      sphere.style.opacity = "0.9";
      sphere.style.zIndex = `${10 + index}`;
      
      // Set the background color based on the logo colors
      if (point.color === 'blue') {
        sphere.style.background = `radial-gradient(circle, rgba(30, 144, 255, 0.7) 0%, rgba(30, 144, 255, 0.3) 100%)`;
        sphere.style.border = `2px solid rgba(30, 144, 255, 0.5)`;
      } else if (point.color === 'gold') {
        sphere.style.background = `radial-gradient(circle, rgba(255, 215, 0, 0.7) 0%, rgba(255, 215, 0, 0.3) 100%)`;
        sphere.style.border = `2px solid rgba(255, 215, 0, 0.5)`;
      }
      
      // Set content
      const title = document.createElement('h3');
      title.className = "font-bold text-foreground text-center mb-1";
      title.textContent = point.title;
      
      const content = document.createElement('p');
      content.className = "text-sm text-foreground/80 text-center";
      content.textContent = point.content;
      
      sphere.appendChild(title);
      sphere.appendChild(content);
      
      // Animation properties
      sphere.style.animationDuration = `${point.duration}s`;
      sphere.style.animationDelay = `${point.delay}s`;
      sphere.className += " animate-float";
      
      // Add hover effect
      sphere.addEventListener('mouseenter', () => {
        sphere.style.transform = "scale(1.08)";
        sphere.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
      });
      
      sphere.addEventListener('mouseleave', () => {
        sphere.style.transform = "scale(1)";
        sphere.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      });
      
      // Add to DOM
      containerRef.current.appendChild(sphere);
      sphereElements.push(sphere);
    });
    
    // Create decorative smaller spheres
    const decorativeSphereCount = 5;
    for (let i = 0; i < decorativeSphereCount; i++) {
      const sphere = document.createElement('div');
      const size = Math.random() * 60 + 30; // 30px to 90px
      
      // Set basic styles
      sphere.className = "absolute rounded-full";
      sphere.style.width = `${size}px`;
      sphere.style.height = `${size}px`;
      sphere.style.opacity = `${Math.random() * 0.3 + 0.1}`; // 0.1 to 0.4
      
      // Random position within boundaries for better alignment
      sphere.style.left = `${Math.random() * 60 + 15}%`;
      sphere.style.top = `${Math.random() * 60 + 10}%`;
      
      // Random color matching logo
      const color = Math.random() > 0.5 ? 
        "rgba(30, 144, 255, 0.2)" : // Blue
        "rgba(255, 215, 0, 0.2)";   // Gold
      sphere.style.backgroundColor = color;
      sphere.style.backdropFilter = "blur(3px)";
      
      // Animation properties
      sphere.style.animationDuration = `${Math.random() * 15 + 15}s`; // 15-30s
      sphere.style.animationDelay = `${Math.random() * 5}s`;
      sphere.className += " animate-float";
      
      // Add to DOM
      containerRef.current.appendChild(sphere);
      sphereElements.push(sphere);
    }
    
    // Cleanup
    return () => {
      sphereElements.forEach(sphere => {
        sphere.remove();
      });
    };
  }, [keyPoints]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
      aria-hidden="false"
      role="region"
      aria-label="Interactive key features"
    />
  );
};

export default AnimatedSpheres;