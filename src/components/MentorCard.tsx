import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Star, MapPin } from "lucide-react";

interface MentorCardProps {
  mentor: {
    name: string;
  rating: number;
  subjects: string[];
  experience: string;
  hourlyRate: number;
  location: string;
  classLevel: string;
  image: string;
  };
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: [0, -5, 5, -5, 5, 0], // Shake
        transition: { duration: 1, ease: "easeInOut" },
      });
    }
  }, [isInView, controls]);
  

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg bg-white relative"
    >
      {/* Top Section */}
      <div className="relative bg-sky-400 h-40 clip-curve flex flex-col items-center justify-center text-white px-4">
        <h3 className="text-lg font-semibold">{mentor.name}</h3>
        <p className="text-sm flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-300" /> {mentor.rating}
        </p>
      </div>

      {/* Profile Image */}
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
        />
      </div>

      {/* Bottom Section */}
      <div className="pt-16 pb-4 px-4 text-center">
        <p className="text-sm text-gray-600 mb-1">
          Subjects: {mentor.subjects.join(", ")}
        </p>
        <p className="text-sm text-gray-600 mb-1">Experience: {mentor.experience}</p>
        <p className="text-sm font-semibold text-homentor-blue mb-1">
          ₹{mentor.hourlyRate}/month
        </p>
        <p className="text-sm text-gray-600">
          <MapPin className="inline w-4 h-4 mr-1" />
          {mentor.location}
        </p>
      </div>
    </motion.div>
  );
};

export default MentorCard;
