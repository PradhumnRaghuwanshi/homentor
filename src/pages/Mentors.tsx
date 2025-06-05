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


const classSubjects = {
  "1": ["English", "Math", "EVS", "Hindi"],
  "2": ["English", "Math", "EVS", "Hindi"],
  "3": ["English", "Math", "EVS", "Hindi"],
  "4": ["English", "Math", "Science", "Social Studies", "Hindi"],
  "5": ["English", "Math", "Science", "Social Studies", "Hindi"],
  "6": [
    "English",
    "Math",
    "Science",
    "Social Studies",
    "Hindi",
    "Sanskrit",
  ],
  "7": [
    "English",
    "Math",
    "Science",
    "Social Studies",
    "Hindi",
    "Sanskrit",
  ],
  "8": [
    "English",
    "Math",
    "Science",
    "Social Studies",
    "Hindi",
    "Sanskrit",
  ],
  "9": [
    "English",
    "Mathematics",
    "Science",
    "Social Science",
    "Hindi",
    "Sanskrit",
  ],
  "10": [
    "English",
    "Mathematics",
    "Science",
    "Social Science",
    "Hindi",
    "Sanskrit",
  ],
  "11": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Business Studies",
    "Accountancy",
    "Economics",
    "English",
  ],
  "12": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Business Studies",
    "Accountancy",
    "Economics",
    "English",
  ],
};

const Mentors = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [mentorsData, setMentorsData] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loader, setLoader] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState([]);
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

  // Step 1: Get user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("User location:", lat, lon);
          setUserLocation({ lat, lon });
        },
        (error) => {
          console.warn("Geolocation error:", error);
          setUserLocation({ lat: 22.7196, lon: 75.8577 }); // Indore coordinates as fallback
        }
      );
    } else {
      console.warn("Geolocation not available");
      setUserLocation({ lat: 22.7196, lon: 75.8577 }); // Default location
    }
  }, []);
  const [locationName, setLocation] = useState<string>("your area");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAb6ZthJEvNAczmOeuvFrnwEcMJjhlNpUk`
        );
        const data = await res.json();
        const components = data.results[0].address_components;

        const area = components.find(c =>
          c.types.includes("sublocality_level_1") || c.types.includes("locality")
        )?.long_name;

        const city = components.find(c =>
          c.types.includes("administrative_area_level_2")
        )?.long_name;

        setLocation(`${area}, ${city}`);
      },
      (error) => {
        setLocation("Location access denied");
      }
    );
  }, []);

  // Step 2: Once location is available, fetch mentors
  useEffect(() => {
    if (userLocation) {
      fetchMentors();
    }
  }, [userLocation]);

  // Step 3: Apply filters whenever mentorsData or filter states change
  useEffect(() => {
    applyFilters();
  }, [
    // mentorsData,
    searchTerm,
    selectedSubject,
    priceRange,
    sortBy,
    selectedCity,
    selectedArea,
    selectedClass,
  ]);

  const fetchMentors = async () => {
    setLoader(true);
    try {
      console.log("Fetching mentors...");
      const res = await axios.get(
        "https://homentor-backend.onrender.com/api/mentor"
      );
      console.log("API Response:", res.data);

      if (res.data && res.data.data) {
        const filteredAndSorted = filterAndSortMentors(
          res.data.data,
          userLocation
        );
        console.log("Processed mentors:", filteredAndSorted);
        setMentorsData(filteredAndSorted);
        setFilteredMentors(filteredAndSorted);
      } else {
        console.warn("No data found in API response");
        setMentorsData([]);
      }
    } catch (err) {
      console.error("Error fetching mentors:", err);
      setMentorsData([]);
    } finally {
      setLoader(false);
    }
  };

  const filterAndSortMentors = (mentors, parentLocation) => {
    if (!mentors || !Array.isArray(mentors)) {
      console.warn("Invalid mentors data:", mentors);
      return [];
    }

    const withinRange = [];
    const outsideRange = [];

    mentors.forEach((mentor) => {
      try {
        const latitude = mentor.location?.lat || 0;
        const longitude = mentor.location?.lon || 0;

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
      } catch (error) {
        console.warn("Error processing mentor:", mentor, error);
      }
    });

    const sortByRanking = (a, b) =>
      (a.adminRanking || 10) - (b.adminRanking || 10);

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
    return R * c;
  }

  function parseTeachingRange(rangeStr) {
    if (!rangeStr || rangeStr.toLowerCase() === "anywhere") return Infinity;
    const match = rangeStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
  const [subjects, setSubjects] = useState<string[]>([]);
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSubjects(classSubjects[value] || []);
  };

  // Apply filters
  const applyFilters = () => {
    let result = [...mentorsData];
    console.log("result");
    // Filter by search term
    // if (selectedClass) {
    //   result = result.filter((mentor) => {
    //     const schoolClasses = Object.keys(
    //       mentor?.teachingPreferences?.school || {}
    //     );

    //     return schoolClasses.some((key) => {
    //       const match = key.match(/\d+/g); // extract all numbers from keys like "class-9-10"
    //       if (!match) return false;
    //       const numbers = match.map(Number); // convert to [9, 10] or [12]

    //       // if the class is in a range like class-9-10, check if selectedClass is in range
    //       if (numbers.length === 2) {
    //         return +selectedClass >= numbers[0] && +selectedClass <= numbers[1];
    //       }

    //       // if single class like class-12
    //       return numbers[0] === +selectedClass;
    //     });
    //   });
    // }

    console.log(result);

    // Filter by search term
    if (searchTerm) {
      const terms = searchTerm.toLowerCase().trim().split(/\s+/);

      result = result.filter((mentor) => {
        const name = mentor.fullName?.toLowerCase() || "";
        const city = mentor.location?.city?.toLowerCase() || "";
        const area = mentor.location?.area?.toLowerCase() || "";
        const state = mentor.location?.state?.toLowerCase() || "";

        // Gather all subjects from all classes into a flat list
        const subjects = Object.values(
          mentor?.teachingPreferences?.school || {}
        )
          .flat()
          .map((subject) => subject.toLowerCase());

        // Also extract class keys to match class numbers like "9", "10", "12"
        const classKeys = Object.keys(
          mentor?.teachingPreferences?.school || {}
        ).map((key) => key.replace("class-", ""));

        return terms.some(
          (term) =>
            name.includes(term) ||
            city.includes(term) ||
            area.includes(term) ||
            state.includes(term) ||
            subjects.some((subj) => subj.includes(term)) ||
            classKeys.some((cls) => cls.includes(term))
        );
      });
    }
    let output = 1
    // Filter by subject
    if (selectedSubject.length > 0) {
      result = result.filter((mentor) => {
        // Safe check: teachingPreferences and school data exist
        const schoolPrefs = mentor.teachingPreferences?.school;

        if (!schoolPrefs) return false; // If no school preferences, skip this mentor
        // const allSubjects: string[] = [];
        console.log(schoolPrefs)    

        // // Combine all subjects from different classes safely
        // Object.values(schoolPrefs).forEach((subjectArray) => {
        //   if (Array.isArray(subjectArray)) {
        //     allSubjects.push(...subjectArray);
        //   }
        // });

        // // If no subjects listed, skip mentor
        // if (allSubjects.length === 0) return false;
    
        // // Check if at least one selected subject is taught by the mentor
        // return selectedSubject.some((subject) => allSubjects.includes(subject));
      });
    }
    
    console.log(selectedSubject)
    // Filter by city
    if (selectedCity) {
      result = result.filter(
        (mentor) =>
          mentor.location?.city?.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    // Filter by area
    if (selectedArea) {
      result = result.filter(
        (mentor) =>
          mentor.location?.area?.toLowerCase() === selectedArea.toLowerCase()
      );
    }

    // Sort results
    if (sortBy === "rating") {
      result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "priceAsc") {
      result = result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
    } else if (sortBy === "priceDesc") {
      result = result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
    }

    console.log("Filtered mentors:", result);
    setFilteredMentors(result);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSubject(undefined);
    setPriceRange([0, 100]);
    setSortBy("rating");
    setInPersonOnly(false);
    setSelectedCity(undefined);
    setSelectedArea(undefined);
    setSelectedClass(undefined);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Find Your Perfect Mentor
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Search from our database of verified tutors {locationName}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex gap-4 items-center">
              <SearchBar
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              />

              <AnimatedSelect
                onValueChange={handleClassChange}
                placeholder="Select Class"
              >
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ].map((i) => (
                  <SelectItem value={`${i}`}>{`class ${i}`}</SelectItem>
                ))}
              </AnimatedSelect>

              <AnimatedSelect
                onValueChange={(value)=> {setSelectedSubject([...selectedSubject, value])}}
                placeholder="Select Subject"
              >
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
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
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
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

          <div className="mb-4 mt-8">
            <p className="text-gray-600">
              Showing {filteredMentors.length} mentors
            </p>
          </div>

          <div className="w-full mb-8">
            {/* <MentorCarousel mentors={filteredMentors} /> */}
          </div>

          <SVGFilter />

          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">
              Total mentors loaded: {mentorsData.length}
            </p>

            {loader ? (
              <div className="flex justify-center items-center py-16">
                <div className="text-lg">Loading mentors...</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMentors?.map((mentor, index) => (
                  <TornCard
                    key={mentor._id || mentor._id || index}
                    mentor={mentor}
                  />
                ))}
              </div>
            )}

            {!loader &&
              filteredMentors.length === 0 &&
              mentorsData.length > 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No mentors found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search filters or reset them to see all
                    available mentors.
                  </p>
                  <Button
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}

            {!loader && mentorsData.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Unable to load mentors
                </h3>
                <p className="text-gray-600">
                  Please check your internet connection and try again.
                </p>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={fetchMentors}
                >
                  Retry
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mentors;
