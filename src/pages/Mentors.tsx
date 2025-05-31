import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MentorCarousel from "@/components/MentorCarousel";
import TornCard from "@/components/TornCard";
import SVGFilter from "@/components/SVGFilter";
import SearchBar from "@/components/SearchBar";
import AnimatedSelect from "@/components/AnimatedSelect";
import axios from "axios";

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
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setUserLocation({ lat, lon });
          console.log(lat, lon);
          getAllMentorsData();
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    } else {
      console.warn("Geolocation not available");
    }
  }, []);

  useEffect(() => {
    getAllMentorsData();
  }, []);

  const [mentorsData, setMentorsData] = useState([]);
  const getAllMentorsData = () => {
    axios.get("http://localhost:5001/api/mentor").then((res) => {
      const filteredAndSorted = filterAndSortMentors(res.data.data, userLocation);
      setMentorsData(filteredAndSorted);
      // setMentorsData(
      //   res.data.data
      //     .map((mentor) => {
      //       const distance = getDistance(
      //         userLocation.lat,
      //         userLocation.lon,
      //         mentor.location.lat,
      //         mentor.location.lon
      //       );
      //       const range = parseTeachingRange(mentor.teachingRange);

      //       return {
      //         ...mentor,
      //         distance,
      //         inRange: distance <= range,
      //         inRangeDistance : distance  ,
      //       };
      //     })
      //     .sort((a, b) => {
      //       // First sort by "inRange"
      //       if (a.inRange !== b.inRange) {
      //         return a.inRange ? -1 : 1;
      //       }
      //       // Then sort by distance
      //       return a.distance - b.distance;
      //     })
      // );
      console.log(mentorsData);
    });
  };

  const filterAndSortMentors = (mentors, parentLocation) => {
    const withinRange = [];
    const outsideRange = [];

    mentors.forEach((mentor) => {
      const latitude = mentor.location.lat;
      const longitude = mentor.location.lon;

      const distance = getDistance(
        parentLocation.lat,
        parentLocation.lon,
        latitude,
        longitude
      );

      const range = parseTeachingRange(mentor.teachingRange);
      const mentorWithDistance = { ...mentor, distance };

      if (distance <= range) {
        withinRange.push(mentorWithDistance);
      } else {
        outsideRange.push(mentorWithDistance);
      }
    });

    const sortByRanking = (a, b) => (a.adminRanking || 10) - (b.adminRanking || 10);

    const sortedWithin = withinRange.sort(sortByRanking);
    const sortedOutside = outsideRange.sort(sortByRanking);

    return [...sortedWithin, ...sortedOutside];
  };


  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    console.log(lat2)
    return R * c;
  }

  function parseTeachingRange(rangeStr) {
    if (!rangeStr || rangeStr.toLowerCase() === "anywhere") return Infinity;
    const match = rangeStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

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
          <div className="space-y-3 ">
            <div className="flex gap-4 items-center">
              <SearchBar
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              ></SearchBar>

              <AnimatedSelect onValueChange={setSelectedClass}>
                <SelectItem value="Class 8">Class 8</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 12">Class 12</SelectItem>
              </AnimatedSelect>

              <AnimatedSelect onValueChange={setSelectedSubject}>
                <SelectItem value="Class 8">Class 8</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 12">Class 12</SelectItem>
              </AnimatedSelect>
            </div>
            <div className="flex gap-4 items-center">
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
              <Button
                variant="outline"
                className="border-homentor-blue text-homentor-blue hover:bg-homentor-lightBlue"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>

            <div className="px-2 py-1">
              <div className="flex items-center justify-between mt-2">
                <span>₹{priceRange[0]}</span>
                <Label>Price Range (₹/month)</Label>
                <span>₹{priceRange[1]}</span>
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
          <SVGFilter></SVGFilter>

          <div className="md:col-span-3 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentorsData.map((mentor) => (
              <TornCard mentor={mentor}></TornCard>
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
