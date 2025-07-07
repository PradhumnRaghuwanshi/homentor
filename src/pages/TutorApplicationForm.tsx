import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Upload,
  Image,
  IdCard,
  Video,
  GraduationCap,
  MapPin,
  IndianRupee,
  BookOpen,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import axios from "axios";
import MonthlyRateSlider from "@/components/MonthlyRateSlider";
import { useNavigate } from "react-router-dom";
import StateData from "../StateData.json";
const graduationData = [
  // 🔬 Science
  { label: "B.Sc (Physics)", value: "bsc_physics" },
  { label: "B.Sc (Chemistry)", value: "bsc_chemistry" },
  { label: "B.Sc (Mathematics)", value: "bsc_mathematics" },
  { label: "B.Sc (Botany)", value: "bsc_botany" },
  { label: "B.Sc (Zoology)", value: "bsc_zoology" },
  { label: "B.Sc (Biotechnology)", value: "bsc_biotech" },
  { label: "B.Sc (Microbiology)", value: "bsc_microbiology" },
  { label: "B.Sc (Environmental Science)", value: "bsc_env_sci" },
  { label: "B.Sc (Computer Science)", value: "bsc_cs" },
  { label: "B.Sc (Statistics)", value: "bsc_statistics" },
  { label: "B.Tech (Computer Science)", value: "btech_cs" },
  { label: "B.Tech (Mechanical)", value: "btech_me" },
  { label: "B.Tech (Civil)", value: "btech_civil" },
  { label: "B.Tech (Electrical)", value: "btech_ee" },
  { label: "B.Tech (Electronics & Comm)", value: "btech_ec" },
  { label: "BCA (Computer Applications)", value: "bca" },
  { label: "B.Pharma (Pharmacy)", value: "bpharma" },
  { label: "B.Sc (Nursing)", value: "bsc_nursing" },

  // 💼 Commerce
  { label: "B.Com (General)", value: "bcom_general" },
  { label: "B.Com (Honours)", value: "bcom_hons" },
  { label: "B.Com (Accounting & Finance)", value: "bcom_af" },
  { label: "B.Com (Taxation)", value: "bcom_taxation" },
  { label: "B.Com (Banking & Insurance)", value: "bcom_bi" },
  { label: "BBA (Bachelor of Business Administration)", value: "bba" },
  { label: "BMS (Bachelor of Management Studies)", value: "bms" },
  { label: "BAF (Accounting & Finance)", value: "baf" },

  // 🎨 Arts / Humanities
  { label: "B.A. (English)", value: "ba_english" },
  { label: "B.A. (Hindi)", value: "ba_hindi" },
  { label: "B.A. (History)", value: "ba_history" },
  { label: "B.A. (Geography)", value: "ba_geography" },
  { label: "B.A. (Political Science)", value: "ba_political" },
  { label: "B.A. (Sociology)", value: "ba_sociology" },
  { label: "B.A. (Psychology)", value: "ba_psychology" },
  { label: "B.A. (Economics)", value: "ba_economics" },
  { label: "B.A. (Philosophy)", value: "ba_philosophy" },
  { label: "B.A. (Public Administration)", value: "ba_public_admin" },
  { label: "B.A. (Education)", value: "ba_education" },
  { label: "BJMC (Journalism & Mass Comm)", value: "bjmc" },
  { label: "BSW (Social Work)", value: "bsw" },
  { label: "BFA (Fine Arts)", value: "bfa" },

  // 🏫 Education & Others
  { label: "B.Ed (Education)", value: "bed" },
  { label: "B.El.Ed (Elementary Education)", value: "beled" },
  { label: "B.Li.Sc (Library Science)", value: "blisc" },
  { label: "B.Design (Interior/Fashion/Product)", value: "bdes" },
  { label: "B.Arch (Architecture)", value: "barch" },
  { label: "BHM (Hotel Management)", value: "bhm" },
  { label: "BPT (Physiotherapy)", value: "bpt" },
  { label: "LL.B (Law)", value: "llb" },
];
const postGraduationData = [
  // 🔬 Science & IT
  { label: "M.Sc (Physics)", value: "msc_physics" },
  { label: "M.Sc (Chemistry)", value: "msc_chemistry" },
  { label: "M.Sc (Mathematics)", value: "msc_mathematics" },
  { label: "M.Sc (Botany)", value: "msc_botany" },
  { label: "M.Sc (Zoology)", value: "msc_zoology" },
  { label: "M.Sc (Microbiology)", value: "msc_microbiology" },
  { label: "M.Sc (Biotechnology)", value: "msc_biotech" },
  { label: "M.Sc (Environmental Science)", value: "msc_env_sci" },
  { label: "M.Sc (Computer Science)", value: "msc_cs" },
  { label: "MCA (Computer Applications)", value: "mca" },
  { label: "M.Tech (Computer Science)", value: "mtech_cs" },
  { label: "M.Tech (Mechanical Engineering)", value: "mtech_me" },
  { label: "M.Tech (Civil Engineering)", value: "mtech_civil" },
  { label: "M.Tech (Electronics & Communication)", value: "mtech_ec" },
  { label: "M.Tech (Electrical Engineering)", value: "mtech_ee" },

  // 💼 Commerce & Management
  { label: "M.Com (General)", value: "mcom_general" },
  { label: "M.Com (Finance)", value: "mcom_finance" },
  { label: "M.Com (Accounting)", value: "mcom_accounting" },
  { label: "MBA (Marketing)", value: "mba_marketing" },
  { label: "MBA (Finance)", value: "mba_finance" },
  { label: "MBA (Human Resource)", value: "mba_hr" },
  { label: "MBA (Information Technology)", value: "mba_it" },
  { label: "MBA (Operations)", value: "mba_operations" },
  { label: "MBA (International Business)", value: "mba_ib" },
  { label: "PGDM (Post Graduate Diploma in Management)", value: "pgdm" },

  // 🎨 Arts & Humanities
  { label: "M.A. (English)", value: "ma_english" },
  { label: "M.A. (Hindi)", value: "ma_hindi" },
  { label: "M.A. (History)", value: "ma_history" },
  { label: "M.A. (Geography)", value: "ma_geography" },
  { label: "M.A. (Political Science)", value: "ma_political" },
  { label: "M.A. (Sociology)", value: "ma_sociology" },
  { label: "M.A. (Psychology)", value: "ma_psychology" },
  { label: "M.A. (Economics)", value: "ma_economics" },
  { label: "M.A. (Philosophy)", value: "ma_philosophy" },
  { label: "M.A. (Education)", value: "ma_education" },
  { label: "MSW (Master of Social Work)", value: "msw" },
  { label: "MJMC (Mass Communication)", value: "mjmc" },

  // 🏫 Education & Others
  { label: "M.Ed (Education)", value: "med" },
  { label: "M.Li.Sc (Library Science)", value: "mlisc" },
  { label: "MFA (Fine Arts)", value: "mfa" },
  { label: "M.Des (Design)", value: "mdes" },
  { label: "M.Arch (Architecture)", value: "march" },
  { label: "MPT (Physiotherapy)", value: "mpt" },
  { label: "MPH (Public Health)", value: "mph" },
  { label: "LL.M (Law)", value: "llm" },
  { label: "M.Phil (Various Subjects)", value: "mphil" },
];
const InputField = ({ label, value, onChange }) => (
  <div>
    <Label>{label}</Label>
    <Input
      className="mt-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TutorRegistrationForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("");

  const allStates = Object.keys(StateData);
  const [mentorData, setMentorData] = useState(() => ({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    profilePhoto: null as File | null,
    mentorId: null as File | null,
    teachingVideo: null as File | null,
    cv: null as File | null,

    // Educational Background
    qualifications: {
      highestQualification: "",
      specialization: "",
      university: "",
      graduationYear: "",
    },
    twelfthStream: "", // new
    twelfthBoard: "",
    graduation: {
      degree: "",
      college: "",
    },
    postGraduation: {
      degree: "",
      college: "",
    },
    experience: "",

    // Location & Availability
    location: {
      area: "",
      city: "",
      state: "",
      lat: "",
      lon: "",
    },

    teachingRange: "",

    // Teaching Modes & Pricing
    teachingModes: [],

    // Teaching Preferences (Level -> Class -> Subject mapping)
    teachingPreferences: {} as Record<string, Record<string, string[]>>,

    // Availability
    availableDays: [] as string[],
    startDate: "",

    // Additional Information
    brief: "",
    teachingExperience: ""
  }));

  const getLatLonFromAddress = async (area: string, apiKey: string) => {
    const address = `${area}, ${mentorData.location.city}, ${mentorData.location.state}, India`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      console.log("Selected Area - ", location.lat, location.lng);
      setMentorData({
        ...mentorData,
        location: {
          ...mentorData.location,
          lat: location.lat,
          lon: location.lat,
        },
      }); // Default location
      return {
        lat: location.lat,
        lon: location.lng,
      };
    } else {
      throw new Error("Unable to get location for: " + address);
    }
  };

  useEffect(() => {
    // if (locationFetched) return;
    if (!mentorData.location.city || !window.google || !inputRef.current)
      return;

    // Get coordinates of the selected city (you can use a fixed map or Geocoder API)
    const cityBounds = {
      // Example for Indore
      north: 22.85,
      south: 22.6,
      east: 75.95,
      west: 75.7,
    };

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(cityBounds.south, cityBounds.west),
          new window.google.maps.LatLng(cityBounds.north, cityBounds.east)
        ),
        strictBounds: true,
      }
    );

    autocomplete.addListener("place_changed", async () => {
      const place = autocomplete.getPlace();
      console.log(place);
      setSelectedLocation(place["address_components"][2].long_name || "");
      const { lat, lon } = await getLatLonFromAddress(
        place["address_components"][2].long_name || "",
        "AIzaSyAb6ZthJEvNAczmOeuvFrnwEcMJjhlNpUk"
      );
      setMentorData({
        ...mentorData,
        location: {
          ...mentorData.location,
          area:
            place["address_components"][0]
            // .find((i) =>
            //   i.types.includes("sublocality_level_1")
            // )
            .long_name || "",
          lat: lat,
          lon: lon,
        },
      });

      // setDetails(place);
    });
  }, [mentorData.location.city]);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [locationFetched, setLocationFetched] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const handleDetectLocation = () => {
    if ("geolocation" in navigator) {
      setLocationFetched(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAb6ZthJEvNAczmOeuvFrnwEcMJjhlNpUk`
            );
            const data = await res.json();
            const components = data.results[0].address_components;
            const area = components.find(
              (c) =>
                c.types.includes("sublocality_level_1") ||
                c.types.includes("locality")
            )?.long_name;

            const city = components.find((c) =>
              c.types.includes("administrative_area_level_3")
            )?.long_name;

            const state = components.find((c) =>
              c.types.includes("administrative_area_level_1")
            )?.long_name;
            setMentorData({
              ...mentorData,
              location: {
                area: area,
                city: city,
                state: state,
                lat: lat,
                lon: lon,
              },
            });
            setCurrentLocation({
              area,
              city,
              state,
              lat,
              lon,
            });
            console.log(currentLocation);
          } catch (error) {
            console.warn("Geocoding error:", error);
          }
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    } else {
      console.warn("Geolocation not available");
    }
  };

  // Step 1: Get user location

  // Hierarchical structure for teaching preferences
  const educationLevels = {
    school: {
      label: "School Level",
      classes: {
        "class-1-6": {
          label: "Class 1-6",
          subjects: [
            "Mathematics",
            "English",
            "Hindi",
            "Science",
            "Social Science",
            "Computer Science",
          ],
        },
        "class-7-8": {
          label: "Class 7-8",
          subjects: [
            "Mathematics",
            "English",
            "Hindi",
            "Science",
            "Social Science",
            "Computer Science",
          ],
        },
        "class-9-10": {
          label: "Class 9-10",
          subjects: [
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology",
            "English",
            "Hindi",
            "Social Science",
            "Computer Science",
          ],
        },
        "class-11": {
          label: "Class 11",
          subjects: [
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology",
            "English",
            "Economics",
            "Accountancy",
            "Business Studies",
            "Computer Science",
          ],
        },
        "class-12": {
          label: "Class 12",
          subjects: [
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology",
            "English",
            "Economics",
            "Accountancy",
            "Business Studies",
            "Computer Science",
          ],
        },
      },
    },
    graduation: {
      label: "Graduation Level",
      classes: {
        btech: {
          label: "B.Tech/Engineering",
          subjects: [
            "Engineering Mathematics",
            "Physics",
            "Chemistry",
            "Computer Science",
            "Mechanical Engineering",
            "Electrical Engineering",
            "Civil Engineering",
          ],
        },
        bsc: {
          label: "B.Sc",
          subjects: [
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology",
            "Computer Science",
            "Statistics",
          ],
        },
        bcom: {
          label: "B.Com",
          subjects: [
            "Accountancy",
            "Business Studies",
            "Economics",
            "Mathematics",
            "Statistics",
          ],
        },
        ba: {
          label: "B.A",
          subjects: [
            "English",
            "Hindi",
            "History",
            "Geography",
            "Political Science",
            "Economics",
            "Psychology",
          ],
        },
      },
    },
    postgraduation: {
      label: "Post Graduation",
      classes: {
        mtech: {
          label: "M.Tech/M.E",
          subjects: [
            "Advanced Engineering Mathematics",
            "Research Methodology",
            "Specialized Engineering Subjects",
          ],
        },
        msc: {
          label: "M.Sc",
          subjects: [
            "Advanced Mathematics",
            "Advanced Physics",
            "Advanced Chemistry",
            "Research Methods",
          ],
        },
        mcom: {
          label: "M.Com",
          subjects: [
            "Advanced Accountancy",
            "Financial Management",
            "Business Research",
            "Economics",
          ],
        },
        ma: {
          label: "M.A",
          subjects: [
            "Literature",
            "Linguistics",
            "History",
            "Political Science",
            "Psychology",
          ],
        },
      },
    },
    competitive: {
      label: "Competitive Exams",
      classes: {
        jee: {
          label: "JEE Preparation",
          subjects: ["Mathematics", "Physics", "Chemistry"],
        },
        neet: {
          label: "NEET Preparation",
          subjects: ["Physics", "Chemistry", "Biology"],
        },
        gate: {
          label: "GATE Preparation",
          subjects: [
            "Engineering Mathematics",
            "General Aptitude",
            "Technical Subjects",
          ],
        },
        banking: {
          label: "Banking Exams",
          subjects: [
            "Quantitative Aptitude",
            "Reasoning",
            "English",
            "General Knowledge",
          ],
        },
      },
    },
  };

  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>(
    {}
  );
  const [expandedClasses, setExpandedClasses] = useState<
    Record<string, boolean>
  >({});

  const updateFormData = (updates: Partial<typeof mentorData>) => {
    setMentorData((prev) => ({ ...prev, ...updates }));
  };

  const handleLocation = (key, value) => {
    setMentorData({
      ...mentorData,
      location: {
        ...mentorData.location,
        [key]: value,
      },
    });
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    console.log("HI");
    axios
      .post("https://homentor-backend.onrender.com/api/mentor", mentorData)
      .then((res) => {
        console.log("Form submitted:", mentorData);
        setShowThankYouModal(true); // ✅ Show thank-you modal
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // Data for various form sections

  const teachingModeOptions = [
    {
      id: "homeTuition",
      label: "Home Tuition (Student's Home)",
      description: "Visit student's home for teaching",
    },
    {
      id: "myPlace",
      label: "My Place",
      description: "Students come to your location",
    },
    {
      id: "coachingCenter",
      label: "Coaching Center",
      description: "Teach at coaching institutes",
    },
    {
      id: "schoolTeaching",
      label: "School Teaching",
      description: "Regular school teaching positions",
    },
    {
      id: "counsellor",
      label: "Home Counsellor",
      description: "Home Counsellor",
    },
    {
      id: "groupClasses",
      label: "Group Classes",
      description: "Small group batch teaching",
    },
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Handler functions for teaching preferences
  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels((prev) => [...prev, level]);
      setExpandedLevels((prev) => ({ ...prev, [level]: true }));
    } else {
      setSelectedLevels((prev) => prev.filter((l) => l !== level));
      setExpandedLevels((prev) => ({ ...prev, [level]: false }));
      // Remove all classes and subjects for this level
      const updatedPreferences = { ...mentorData.teachingPreferences };
      delete updatedPreferences[level];
      updateFormData({ teachingPreferences: updatedPreferences });
    }
  };

  const handleClassChange = (
    level: string,
    classId: string,
    checked: boolean
  ) => {
    const updatedPreferences = { ...mentorData.teachingPreferences };

    if (!updatedPreferences[level]) {
      updatedPreferences[level] = {};
    }

    if (checked) {
      updatedPreferences[level][classId] = [];
      setExpandedClasses((prev) => ({
        ...prev,
        [`${level}-${classId}`]: true,
      }));
    } else {
      delete updatedPreferences[level][classId];
      setExpandedClasses((prev) => ({
        ...prev,
        [`${level}-${classId}`]: false,
      }));
    }

    updateFormData({ teachingPreferences: updatedPreferences });
  };

  const handleSubjectChange = (
    levelId: string,
    classId: string,
    subject: string | null, // null means "All Subjects"
    checked: boolean
  ) => {
    const updated = { ...mentorData.teachingPreferences };

    if (!updated[levelId]) updated[levelId] = {};
    if (!updated[levelId][classId]) updated[levelId][classId] = [];

    if (subject === null) {
      // All subjects selected/deselected
      if (checked) {
        updated[levelId][classId] = [
          ...educationLevels[levelId].classes[classId].subjects,
        ];
      } else {
        updated[levelId][classId] = [];
      }
    } else {
      const subjects = updated[levelId][classId];
      if (checked) {
        if (!subjects.includes(subject)) {
          subjects.push(subject);
        }
      } else {
        updated[levelId][classId] = subjects.filter((s) => s !== subject);
      }
    }

    setMentorData({ ...mentorData, teachingPreferences: updated });
  };

  const isSubjectSelected = (
    levelId: string,
    classId: string,
    subject?: string
  ) => {
    const subjects = mentorData.teachingPreferences?.[levelId]?.[classId] || [];
    if (!subject) {
      const allSubjects = educationLevels[levelId].classes[classId].subjects;
      return allSubjects.every((sub) => subjects.includes(sub));
    }
    return subjects.includes(subject);
  };

  const getSelectedSubjectsCount = (level: string, classId: string) => {
    return mentorData.teachingPreferences[level]?.[classId]?.length || 0;
  };

  // Handler functions
  const handleTeachingModeChange = (
    modeId: string,
    field: "selected" | "monthlyPrice",
    value: boolean | string
  ) => {
    updateFormData({
      teachingModes: {
        ...mentorData.teachingModes,
        [modeId]: {
          ...mentorData.teachingModes[modeId],
          [field]: value,
        },
      },
    });
  };

  // ---------------------------Image/Video Upload------------------------------
  const [uploadingKey, setUploadingKey] = useState(null);
  const handleImageUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingKey(key);
    const isVideo = file.type.startsWith("video/");
    const uploadUrl = `https://api.cloudinary.com/v1_1/dpveehhtq/${
      isVideo ? "video" : "image"
    }/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "homentor"); // change this
    formData.append("cloud_name", "dpveehhtq"); // change this

    // setUploading(true);
    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(key);
      setMentorData({ ...mentorData, [key]: data.secure_url });
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setUploadingKey("");
    }
  };

  console.log(mentorData);
  return (
    <div className="min-h-screen bg-gradient-to-br  from-mentor-blue-50 via-white to-mentor-yellow-50 py-8 lg:px-4 px-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-mentor-blue-600 to-mentor-yellow-500 bg-clip-text text-transparent mb-4">
            Join HomeMentor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Become a part of our elite tutoring network and help students
            achieve their academic goals through personalized offline coaching.
          </p>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <Card className="border-mentor-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Please provide your basic details and required documents
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={mentorData.fullName}
                    onChange={(e) =>
                      updateFormData({ fullName: e.target.value })
                    }
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={mentorData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={mentorData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={mentorData.gender}
                    onValueChange={(value) => updateFormData({ gender: value })}
                  >
                    <SelectTrigger className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min="18"
                    max="65"
                    value={mentorData.age}
                    onChange={(e) => updateFormData({ age: e.target.value })}
                    className="focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                    required
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4 text-mentor-blue-700">
                  Required Documents & Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Profile Photo */}
                  <div>
                    <Label
                      htmlFor="photo"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Image className="h-4 w-4" />
                      Profile Photo *
                    </Label>
                    <div className="relative">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "profilePhoto")}
                        className="hidden"
                      />
                      <label
                        htmlFor="photo"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mentor-yellow-400 bg-gray-50 hover:bg-mentor-yellow-50 transition-colors"
                      >
                        {uploadingKey === "profilePhoto" ? (
                          <div className="flex flex-col items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-mentor-yellow-500" />
                            <p className="text-sm text-gray-600 mt-2">
                              Uploading...
                            </p>
                          </div>
                        ) : mentorData?.profilePhoto ? (
                          <img
                            src={mentorData.profilePhoto}
                            controls
                            className="h-full w-auto object-contain rounded"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              Click to upload photo
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* ID Document */}
                  <div>
                    <Label
                      htmlFor="mentorId"
                      className="flex items-center gap-2 mb-2"
                    >
                      <IdCard className="h-4 w-4" />
                      ID Document *
                    </Label>
                    <div className="relative">
                      <Input
                        id="mentorId"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleImageUpload(e, "mentorId")}
                        className="hidden"
                      />
                      <label
                        htmlFor="mentorId"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mentor-yellow-400 bg-gray-50 hover:bg-mentor-yellow-50 transition-colors"
                      >
                        {uploadingKey === "mentorId" ? (
                          <div className="flex flex-col items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-mentor-yellow-500" />
                            <p className="text-sm text-gray-600 mt-2">
                              Uploading...
                            </p>
                          </div>
                        ) : mentorData?.mentorId ? (
                          <img
                            src={mentorData.mentorId}
                            controls
                            className="h-full w-auto object-contain rounded"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              Click to upload documents/id
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Tutorial Video */}
                  <div>
                    <Label
                      htmlFor="teachingVideo"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Video className="h-4 w-4" />
                      Teaching Video
                    </Label>
                    <div className="relative">
                      <Input
                        id="teachingVideo"
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleImageUpload(e, "teachingVideo")}
                        className="hidden"
                      />
                      <label
                        htmlFor="teachingVideo"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mentor-yellow-400 bg-gray-50 hover:bg-mentor-yellow-50 transition-colors"
                      >
                        {uploadingKey === "teachingVideo" ? (
                          <div className="flex flex-col items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-mentor-yellow-500" />
                            <p className="text-sm text-gray-600 mt-2">
                              Uploading...
                            </p>
                          </div>
                        ) : mentorData?.teachingVideo ? (
                          <video
                            src={mentorData.teachingVideo}
                            controls
                            className="h-full w-auto object-contain rounded"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              Click to upload teaching video
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Resume */}
                  <div>
                    <Label
                      htmlFor="cv"
                      className="flex items-center gap-2 mb-2"
                    >
                      <IdCard className="h-4 w-4" />
                      Resume/CV
                    </Label>
                    <div className="relative">
                      <Input
                        id="cv"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleImageUpload(e, "cv")}
                        className="hidden"
                      />
                      <label
                        htmlFor="cv"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mentor-yellow-400 bg-gray-50 hover:bg-mentor-yellow-50 transition-colors"
                      >
                        {uploadingKey === "cv" ? (
                          <div className="flex flex-col items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-mentor-yellow-500" />
                            <p className="text-sm text-gray-600 mt-2">
                              Uploading...
                            </p>
                          </div>
                        ) : mentorData?.cv ? (
                          <img
                            src={mentorData.cv}
                            controls
                            className="h-full w-auto object-contain rounded"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              Click to upload cv/resume
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Required fields. Teaching video is optional but recommended
                  to showcase your teaching style.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-mentor-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Educational Background
              </CardTitle>
              <CardDescription className="text-mentor-yellow-100">
                Your academic qualifications
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* 11th & 12th Stream */}
              <div>
                <Label htmlFor="twelfthStream">12th Stream *</Label>
                <Select
                  value={mentorData.twelfthStream}
                  onValueChange={(value) =>
                    setMentorData({
                      ...mentorData,
                      twelfthStream: value,
                    })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science(PCM)</SelectItem>
                    <SelectItem value="science">Science(Biology)</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="twelfthBoard">12th Board *</Label>
                <Select
                  value={mentorData.twelfthBoard}
                  onValueChange={(value) =>
                    setMentorData({
                      ...mentorData,
                      twelfthBoard: value,
                    })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MP Board">MP Board</SelectItem>
                    <SelectItem value="CBSE Board">CBSE Board</SelectItem>
                    <SelectItem value="ICSE Board">ICSE Board</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Graduation Details */}
              <div className="space-y-2">
                <h4 className="font-semibold text-lg text-mentor-yellow-600">
                  Graduation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="graduation-degree">Course/Degree*</Label>
                    <Select
                      value={mentorData.graduation.degree}
                      onValueChange={(value) =>
                        setMentorData({
                          ...mentorData,
                          graduation: {
                            ...mentorData.graduation,
                            degree: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        {graduationData.map((i, index) => (
                          <SelectItem key={index} value={i.label}>{i.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Label htmlFor="graduation-college">College Name*</Label>
                  <Input
                    className="mt-1"
                    value={mentorData.graduation.college}
                    onChange={(e) => setMentorData({
                      ...mentorData,
                      graduation: {
                        ...mentorData.graduation,
                        college:e.target.value
                      }
                    })}
                  />
                 
                </div>
              </div>

              {/*Post Graduation Details */}
              <div className="space-y-2">
                <h4 className="font-semibold text-lg text-mentor-yellow-600">
                  Post Graduation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="post-degree">Course/Degree*</Label>
                    <Select
                      value={mentorData.postGraduation.degree}
                      onValueChange={(value) =>
                        setMentorData({
                          ...mentorData,
                          postGraduation: {
                            ...mentorData.postGraduation,
                            degree: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select board" />
                      </SelectTrigger>
                      <SelectContent>
                        {postGraduationData.map((i) => (
                          <SelectItem value={i.label}>{i.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                 <Label htmlFor="post-college">College Name*</Label>
                  <Input
                    className="mt-1"
                    value={mentorData.postGraduation.college}
                    onChange={(e) => setMentorData({
                      ...mentorData,
                      postGraduation: {
                        ...mentorData.postGraduation,
                        college: e.target.value
                      }
                    })}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="experience">Teaching Experience *</Label>
                <Select
                  value={mentorData.experience}
                  onValueChange={(value) =>
                    updateFormData({ experience: value })
                  }
                >
                  <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-mentor-yellow-200">
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Educational Background */}
          {/* <Card className="border-mentor-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Educational Background
              </CardTitle>
              <CardDescription className="text-mentor-yellow-100">
                Your academic qualifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="qualification">Highest Qualification *</Label>
                  <Select
                    value={mentorData.qualifications.highestQualification}
                    onValueChange={(value) =>
                      setMentorData({
                        ...mentorData,
                        qualifications: {
                          ...mentorData.qualifications,
                          highestQualification: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-mentor-yellow-200">
                      <SelectItem value="bachelors">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certification">
                        Professional Certification
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialization">Degree Name *</Label>
                  <Input
                    value={mentorData.qualifications.specialization}
                    onChange={(e) =>
                      setMentorData({
                        ...mentorData,
                        qualifications: {
                          ...mentorData.qualifications,
                          specialization: e.target.value,
                        },
                      })
                    }
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="university">University/Institution</Label>
                  <Input
                    id="university"
                    value={mentorData.qualifications.university}
                    onChange={(e) =>
                      setMentorData({
                        ...mentorData,
                        qualifications: {
                          ...mentorData.qualifications,
                          university: e.target.value,
                        },
                      })
                    }
                    className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400"
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Year of Graduation *</Label>
                  <Select
                    value={mentorData.qualifications.graduationYear}
                    onValueChange={(value) =>
                      setMentorData({
                        ...mentorData,
                        qualifications: {
                          ...mentorData.qualifications,
                          graduationYear: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-mentor-yellow-200">
                      {Array.from({ length: 20 }, (_, i) => 2030 - i).map(
                        (year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Location & Availability Range */}
          <Card className="border-mentor-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Availability Range
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Where are you located and what's your teaching range?
              </CardDescription>
            </CardHeader>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDetectLocation()}
              className="w-full"
            >
              📍 Detect My Location
            </Button>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-6">
                {/* State */}
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select
                    onValueChange={(value) => handleLocation("state", value)}
                    value={mentorData.location.state}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {allStates.map((state) => (
                        <SelectItem key={state} value={`${state}`}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Select
                    disabled={!mentorData.location.state} // disable until a state is selected
                    onValueChange={(value) => handleLocation("city", value)}
                    value={mentorData.location.city}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {mentorData.location.state &&
                        StateData[`${mentorData.location.state}`]?.map(
                          (city, index) => (
                            <SelectItem key={index} value={`${city}`}>
                              {city}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Area */}
                <div>
                  <Label htmlFor="area">Area *</Label>
                  <div className="space-y-2">
                    {!locationFetched ? (
                      <input
                        // value={mentorData.location.area}
                        ref={inputRef}
                        placeholder={`Type to search in ${mentorData.location.city}`}
                        className="border px-3 py-2 rounded w-full"
                      />
                    ) : (
                      <input
                        className="border px-3 py-2 rounded w-full"
                        value={mentorData.location.area}
                      ></input>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="availabilityRange">
                  Teaching Availability Range *
                </Label>
                <Select
                  value={mentorData.teachingRange}
                  onValueChange={(value) =>
                    updateFormData({ teachingRange: value })
                  }
                >
                  <SelectTrigger className="mt-1 focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400">
                    <SelectValue placeholder="Select your travel range" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-mentor-blue-200">
                    <SelectItem value="2km">Within 2 km</SelectItem>
                    <SelectItem value="5km">Within 5 km</SelectItem>
                    <SelectItem value="10km">Within 10 km</SelectItem>
                    <SelectItem value="15km">Within 15 km</SelectItem>
                    <SelectItem value="20km">Within 20 km</SelectItem>
                    <SelectItem value="25km+">25+ km</SelectItem>
                    <SelectItem value="anywhere">Anywhere in city</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Modes & Monthly Pricing */}
          <Card className="border-mentor-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Teaching Modes & Monthly Pricing
              </CardTitle>
              <CardDescription className="text-mentor-yellow-100">
                Select your preferred teaching modes and set monthly rates
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:p-6 py-2 px-2 lg:px-4 lg:space-y-6 space-y-2">
              {teachingModeOptions.map((mode) => (
                <div
                  key={mode.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={`mode-${mode.id}`}
                      checked={
                        mentorData.teachingModes[mode.id]?.selected || false
                      }
                      onCheckedChange={(checked) =>
                        handleTeachingModeChange(
                          mode.id,
                          "selected",
                          checked as boolean
                        )
                      }
                      className="mt-1 data-[state=checked]:bg-mentor-blue-500 data-[state=checked]:border-mentor-blue-500"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={`mode-${mode.id}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {mode.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {mode.description}
                      </p>
                      {mentorData.teachingModes[mode.id]?.selected && (
                        <div className="mt-3">
                          <MonthlyRateSlider
                            className="px-0"
                            value={
                              mentorData.teachingModes[mode.id]?.monthlyPrice ||
                              3000
                            }
                            onValueChange={(value) =>
                              handleTeachingModeChange(
                                mode.id,
                                "monthlyPrice",
                                value
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Teaching Preferences - Hierarchical Selection */}
          <Card className="border-mentor-blue-200 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Teaching Preferences
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Select education levels, then classes/courses, and finally
                subjects you can teach
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6 px-2 lg:px-4  space-y-4">
              {/* Education Levels */}
              <div className="space-y-4 ">
                {Object.entries(educationLevels).map(([levelId, level]) => (
                  <div
                    key={levelId}
                    className="border  border-blue-200 rounded-lg lg:py-4 py-2 lg:px-4 px-2"
                  >
                    {/* Level Selection */}
                    <div className="flex items-center justify-between lg:mb-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`level-${levelId}`}
                          checked={selectedLevels.includes(levelId)}
                          onCheckedChange={(checked) =>
                            handleLevelChange(levelId, checked as boolean)
                          }
                          className="data-[state=checked]:bg-mentor-yellow-500 data-[state=checked]:border-mentor-yellow-500"
                        />
                        <Label
                          htmlFor={`level-${levelId}`}
                          className="text-lg font-medium cursor-pointer"
                        >
                          {level.label}
                        </Label>
                      </div>
                      {selectedLevels.includes(levelId) && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setExpandedLevels((prev) => ({
                              ...prev,
                              [levelId]: !prev[levelId],
                            }))
                          }
                          className="h-8 w-8 p-0"
                        >
                          {expandedLevels[levelId] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Classes/Courses (shown when level is selected and expanded) */}
                    {selectedLevels.includes(levelId) &&
                      expandedLevels[levelId] && (
                        <div className="lg:ml-6 space-y-3 lg:border-l-2 border-gray-200 lg:pl-4">
                          {Object.entries(level.classes).map(
                            ([classId, classInfo]) => (
                              <div
                                key={classId}
                                className="border border-gray-100 rounded-md p-3"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`class-${levelId}-${classId}`}
                                      checked={
                                        !!mentorData.teachingPreferences[
                                          levelId
                                        ]?.[classId]
                                      }
                                      onCheckedChange={(checked) =>
                                        handleClassChange(
                                          levelId,
                                          classId,
                                          checked as boolean
                                        )
                                      }
                                      className="data-[state=checked]:bg-mentor-blue-500 data-[state=checked]:border-mentor-blue-500"
                                    />
                                    <Label
                                      htmlFor={`class-${levelId}-${classId}`}
                                      className="font-medium cursor-pointer"
                                    >
                                      {classInfo.label}
                                    </Label>
                                  </div>
                                  {mentorData.teachingPreferences[levelId]?.[
                                    classId
                                  ] && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs bg-mentor-blue-100 text-mentor-blue-700 px-2 py-1 rounded">
                                        {getSelectedSubjectsCount(
                                          levelId,
                                          classId
                                        )}{" "}
                                        subjects
                                      </span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          setExpandedClasses((prev) => ({
                                            ...prev,
                                            [`${levelId}-${classId}`]:
                                              !prev[`${levelId}-${classId}`],
                                          }))
                                        }
                                        className="h-6 w-6 p-0"
                                      >
                                        {expandedClasses[
                                          `${levelId}-${classId}`
                                        ] ? (
                                          <ChevronUp className="h-3 w-3" />
                                        ) : (
                                          <ChevronDown className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </div>
                                  )}
                                </div>

                                {/* Subjects (shown when class is selected and expanded) */}
                                {mentorData.teachingPreferences[levelId]?.[
                                  classId
                                ] &&
                                  expandedClasses[`${levelId}-${classId}`] && (
                                    <div className="ml-4 grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                      <div className="flex items-center space-x-1">
                                        <Checkbox
                                          id={`subject-${levelId}-${classId}-all`}
                                          checked={isSubjectSelected(
                                            levelId,
                                            classId
                                          )} // no subject passed = check all
                                          onCheckedChange={(checked) =>
                                            handleSubjectChange(
                                              levelId,
                                              classId,
                                              null,
                                              checked as boolean
                                            )
                                          }
                                          className="data-[state=checked]:bg-mentor-yellow-500 data-[state=checked]:border-mentor-yellow-500 h-3 w-3"
                                        />
                                        <Label
                                          htmlFor={`subject-${levelId}-${classId}-all`}
                                          className="text-xs cursor-pointer"
                                        >
                                          All Subjects
                                        </Label>
                                      </div>
                                      {classInfo.subjects.map((subject) => (
                                        <div
                                          key={subject}
                                          className="flex items-center space-x-1"
                                        >
                                          <Checkbox
                                            id={`subject-${levelId}-${classId}-${subject}`}
                                            checked={isSubjectSelected(
                                              levelId,
                                              classId,
                                              subject
                                            )}
                                            onCheckedChange={(checked) =>
                                              handleSubjectChange(
                                                levelId,
                                                classId,
                                                subject,
                                                checked as boolean
                                              )
                                            }
                                            className="data-[state=checked]:bg-mentor-yellow-500 data-[state=checked]:border-mentor-yellow-500 h-3 w-3"
                                          />
                                          <Label
                                            htmlFor={`subject-${levelId}-${classId}-${subject}`}
                                            className="text-xs cursor-pointer"
                                          >
                                            {subject}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability - Simplified */}
          <Card className="border-mentor-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Availability
              </CardTitle>
              <CardDescription className="text-mentor-yellow-100">
                Select your availability preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Week Type Selection */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Available Days *
                </Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={
                      mentorData.dayType === "weekdays" ? "default" : "outline"
                    }
                    onClick={() => updateFormData({ dayType: "weekdays" })}
                  >
                    Weekdays
                  </Button>
                  <Button
                    type="button"
                    variant={
                      mentorData.dayType === "weekend" ? "default" : "outline"
                    }
                    onClick={() => updateFormData({ dayType: "weekend" })}
                  >
                    Weekend
                  </Button>
                </div>
              </div>

              {/* Common hours per day */}
              <div className="space-y-2">
                <Label htmlFor="daily-hours" className="text-sm font-medium">
                  Hours available per day *
                </Label>
                <Input
                  id="daily-hours"
                  type="number"
                  min={1}
                  max={12}
                  step={0.5}
                  value={mentorData.dailyHours || ""}
                  onChange={(e) =>
                    updateFormData({ dailyHours: e.target.value })
                  }
                  placeholder="e.g. 4"
                  className="w-32"
                />
                <p className="text-xs text-gray-500">
                  Enter hours (1-12, in 0.5 hour increments)
                </p>
              </div>

              {/* Start immediately option */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Can Start Immediately? *
                </Label>
                <Select
                  value={mentorData.startImmediately}
                  onValueChange={(value) =>
                    updateFormData({ startImmediately: value })
                  }
                >
                  <SelectTrigger className="mt-1 focus:ring-mentor-blue-400 focus:border-mentor-blue-400">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-mentor-yellow-200">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Experience - Simplified */}
          <Card className="border-mentor-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-mentor-blue-500 to-mentor-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Teaching Details
              </CardTitle>
              <CardDescription className="text-mentor-blue-100">
                Brief description of your teaching approach
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="teachingExperience">
                  Teaching Experience & Approach
                </Label>
                <Textarea
                  id="teachingExperience"
                  placeholder="Briefly describe your teaching experience and methodology (e.g., years of experience, teaching style, student success stories)..."
                  value={mentorData?.teachingExperience}
                  onChange={(e) => updateFormData({ teachingExperience: e.target.value })}
                  className="mt-1 min-h-[80px] focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                />
              </div>
            </CardContent>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="brief">
                  Bio
                </Label>
                <Textarea
                  id="brief"
                  placeholder="Briefly describe yourself..."
                  value={mentorData.brief}
                  onChange={(e) => updateFormData({ brief: e.target.value })}
                  className="mt-1 min-h-[80px] focus:ring-mentor-yellow-400 focus:border-mentor-yellow-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              onClick={() => handleSubmit()}
            
              size="lg"
              className="bg-gradient-to-r from-mentor-blue-600 to-mentor-yellow-500 hover:from-mentor-blue-700 hover:to-mentor-yellow-600 text-white px-12 py-3 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              By submitting this form, you agree to our terms and conditions and
              privacy policy.
            </p>
          </div>
          {showThankYouModal && (
            <div className="h-[100vh] w-[100%] fixed top-[-5%] left-0 z-[1000] flex items-center justify-center">
              <div className="h-[100vh] w-[100%] top-0 left-0 bg-black opacity-50 fixed"></div>
              <div className="bg-white z-[50] w-[90%] relative h-auto px-2 py-4 rounded-sm">
                <p className="text-center text-lg text-gray-700 ">
                  Your application has been submitted successfully. We’ll
                  contact you soon.
                </p>
                <div className="text-center ">
                  <Button
                    onClick={() => {
                      setShowThankYouModal(false);
                      navigate("/"); // ✅ On "Okay" click
                    }}
                    className="mt-4"
                  >
                    Okay
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorRegistrationForm;
