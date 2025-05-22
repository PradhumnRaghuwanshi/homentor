import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import MentorCard from "@/components/MentorCard";
import CollapsibleSelects from "@/components/CollapsibleSelects";
import RadialFilterMenu from "@/components/RadialFilterMenu";
import MentorCarousel from "@/components/MentorCarousel";

// Mentor data for demonstration
const mentorsData = [
  {
    id: 1,
    name: "Anita Sharma",
    subjects: ["Mathematics", "Science"],
    rating: 4.9,
    hourlyRate: 25,
    location: "Indore, Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    experience: "6+ years",
    bio: "B.Ed in Mathematics, passionate about teaching and mentoring young students.",
    availability: "Weekdays, 5pm - 8pm",
    state: "Madhya Pradesh",
    city: "Indore",
    area: "Vijay Nagar",
    classLevel: "Class 10",
  },
  {
    id: 2,
    name: "Rahul Verma",
    subjects: ["English", "Social Studies"],
    rating: 4.7,
    hourlyRate: 20,
    location: "Indore, Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    experience: "4+ years",
    bio: "Experienced English tutor with creative teaching methods.",
    availability: "Weekends, morning slots",
    state: "Madhya Pradesh",
    city: "Indore",
    area: "Palasia",
    classLevel: "Class 8",
  },
  {
    id: 3,
    name: "Sneha Jain",
    subjects: ["Biology", "Chemistry"],
    rating: 4.8,
    hourlyRate: 30,
    location: "Indore, Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    experience: "7+ years",
    bio: "MSc in Biology, specializes in helping students with board exam preparation.",
    availability: "Evenings after 6pm",
    state: "Madhya Pradesh",
    city: "Indore",
    area: "Bhawarkuan",
    classLevel: "Class 12",
  },
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Literature",
  "Writing",
  "Computer Science",
  "History",
  "Social Studies",
  "Spanish",
  "French",
];

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined
  );
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("rating");
  const [inPersonOnly, setInPersonOnly] = useState(false);
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [selectedArea, setSelectedArea] = useState<string | undefined>(
    undefined
  );
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined
  );
  const [shake, setShake] = useState(false);

  const [filteredMentors, setFilteredMentors] = useState(mentorsData);

  // Apply filters
  const applyFilters = () => {
    let result = [...mentorsData];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.subjects.some((subject) =>
            subject.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          mentor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject) {
      result = result.filter((mentor) =>
        mentor.subjects.some((subject) => subject === selectedSubject)
      );
    }

    // Filter by price range
    result = result.filter(
      (mentor) =>
        mentor.hourlyRate >= priceRange[0] && mentor.hourlyRate <= priceRange[1]
    );

    // Sort results
    if (sortBy === "rating") {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "priceAsc") {
      result = result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === "priceDesc") {
      result = result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    }

    setFilteredMentors(result);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSubject(undefined);
    setPriceRange([0, 100]);
    setSortBy("rating");
    setInPersonOnly(false);
    setFilteredMentors(mentorsData);
  };

  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container-tight">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Find Your Perfect Mentor
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Search from our database of verified tutors
            </p>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Search by name, subject, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* <Select onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Social Studies">Social Studies</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Indore">Indore</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedArea}>
              <SelectTrigger>
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vijay Nagar">Vijay Nagar</SelectItem>
                <SelectItem value="Palasia">Palasia</SelectItem>
                <SelectItem value="Bhawarkuan">Bhawarkuan</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class 8">Class 8</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 12">Class 12</SelectItem>
              </SelectContent>
            </Select> */}
            {/* <CollapsibleSelects></CollapsibleSelects> */}

            <div className="px-2 py-1">
              <Label>Price Range ($/hr)</Label>
              <div className="flex items-center justify-between mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={5}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                className="mt-2"
              />
            </div>

            <div className="px-2 py-1 flex gap-4">
              {/* <Button
                className="flex-1 bg-homentor-blue hover:bg-homentor-darkBlue"
                onClick={applyFilters}
              >
                Apply Filters
              </Button> */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <RadialFilterMenu></RadialFilterMenu>
              <Button
                variant="outline"
                className="border-homentor-blue text-homentor-blue hover:bg-homentor-lightBlue"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className=" border-t border-gray-100">
              <div className="flex flex-wrap gap-6">
                <div className="min-w-[200px] space-y-4"></div>

                <div className="flex-1 flex items-end"></div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredMentors.length} mentors
            </p>
          </div>

          <div className="w-full ">
            <MentorCarousel mentors={filteredMentors} />
          </div>

          <div className="md:col-span-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMentors.map((mentor) => (
              // <Card
              //   ref={ref}
              //   key={mentor.id}
              //   className={`flex flex-col  mentor-card  `}
              // >
              //   <CardContent className="p-4 flex flex-col h-full">
              //     <img
              //       src={mentor.image}
              //       alt={mentor.name}
              //       className="w-full h-40 object-cover rounded-md mb-2"
              //     />
              //     <div className="flex-grow">
              //       <h3 className="text-lg font-semibold leading-snug">
              //         {mentor.name}
              //       </h3>
              //       <p className="text-sm mb-1">
              //         <Star className="inline w-4 h-4 text-yellow-500" />{" "}
              //         {mentor.rating}
              //       </p>
              //       <p className="text-sm mb-1 font-semibold text-homentor-blue">
              //         ₹{mentor.hourlyRate}/month
              //       </p>
              //       <p className="text-sm">Class: {mentor.classLevel}</p>
              //     </div>
              //     <div className="mt-4">
              //       <Link to={`/mentors/${mentor.id}`}>
              //         <Button className="w-full bg-homentor-blue hover:bg-homentor-darkBlue">
              //           View Profile
              //         </Button>
              //       </Link>
              //     </div>
              //   </CardContent>
              // </Card>
              <MentorCard mentor={mentor} key={mentor.id}/>
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No mentors found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search filters or reset them to see all
                available mentors.
              </p>
              <Button
                className="mt-4 bg-homentor-blue hover:bg-homentor-darkBlue"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Mentors;
