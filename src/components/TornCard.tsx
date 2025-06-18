import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { CalendarPlus, MessageCircle, PhoneCall, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPopup from "./LoginPopup";

const TornCard = ({ mentor }) => {
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleChatClick = () => {
    localStorage.setItem("mentorNumber", mentor.phone);
    localStorage.setItem("mentor", JSON.stringify(mentor));
    const parentPhone = "8878084604";
    if (!parentPhone) return alert("Login required");

    navigate(`/chat/${mentor.fullName}`);
  };
  const makeCall = async () => {
    console.log("Hi");
    try {
      const response = await axios.post(
        "https://homentor-backend.onrender.com/api/call",
        {
          parentNumber: "9630709988", // Parent's phone number
          mentorNumber: "8182858627", // Mentor's real phone number
        }
      );

      if (response.data.success) {
        alert("Call initiated successfully!");
      } else {
        alert("Failed to initiate call");
      }
    } catch (error) {
      console.error("Call error:", error);
      alert("Something went wrong!");
    }
  };

  const handleSelectMentor = () => {
    localStorage.setItem("mentor", JSON.stringify(mentor));
    navigate(`/mentors/${mentor.fullName}`);
  };

  const formatSalary = (amount: number): string => {
    if (amount >= 5000) {
      return `${(amount + 1000) / 1000}k`;
    }
    if (amount < 5000) {
      return `${(amount + 500) / 1000}k`;
    }
    return amount.toString();
  };

  const redirectToPhonePe = (redirectUrl) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = redirectUrl;
    form.style.display = "none";

    document.body.appendChild(form);
    form.submit();
  };

  const initiatePayment = async () => {
    const res = await axios.post(
      "https://homentor-backend.onrender.com/api/create-order",
      {
        name: "Pradhumn",
        email: "user@example.com",
        phone: "9999999999",
        amount: 100, // ₹100
      }
    );

    console.log("PhonPe response", res.data);
    const redirectUrl = res.data.redirectUrl;
    // window.location.href = redirectUrl
    // redirectToPhonePe(redirectUrl);
  };
  const [loginWait, setLoginWait] = useState(false)
  const userNumber = localStorage.getItem("usernumber");
  const payNow = async (fees) => {
    if (!userNumber) {
      setIsLoginOpen(true);
    } else {
      const res = await axios.post(
        "https://homentor-backend.onrender.com/api/pay-now",
        {
          phone: userNumber,
          amount: fees,
        }
      );

      console.log("PhonPe response", res.data);
      window.location.href = res.data; // ← This tries to redirect after axios call
    }

    //   const redirectUrl = res.data.redirectUrl;
    // redirectToPhonePe(redirectUrl);
  };
  return (
    <div className="relative animate-shake origin-top w-[100%] flex overflow-hidden flex-col items-center bg-[papayawhip] rounded-lg  shadow-[0_0_20px_-5px_black]">
      {/* 📌 Pin (just like CSS :after) */}

      <div
        className="absolute z-30"
        style={{
          top: "0.5rem",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "0.7rem",
          height: "0.7rem",
          backgroundColor: "crimson",
          borderRadius: "50%",
          boxShadow: "-0.1rem -0.1rem 0.3rem 0.02rem rgba(0, 0, 0, 0.5) inset",
          filter: "drop-shadow(0.3rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5))",
        }}
      />
      {/* Star */}
      <div className="absolute top-2 right-2 z-[30]">
        <Badge className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-semibold px-2 py-1 flex items-center gap-1 shadow-lg transform-gpu transition-transform duration-300 hover:scale-110">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          {mentor?.rating}
        </Badge>
      </div>

      <div className="w-[100%] lg:block hidden h-[20vh] bg-black absolute z-[100] opacity-30 mentor-bg"></div>

      <div className="lg:text-lg text-white text-sm lg:block hidden font-bold mentor-content absolute z-[100] bottom-[16vh]">
        {mentor.fullName}
      </div>

      <div className="lg:text-lg text-sm text-white lg:hidden font-bold mentor-content absolute z-[100] bottom-[8vh]">
        {mentor.fullName}
      </div>
      <div className="absolute z-[1000] lg:flex hidden gap-10 bottom-[10vh]">
        <Button
          onClick={() => handleChatClick()}
          className="bg-gradient-to-r mentor-icons1  from-homentor-chat to-homentor-chatHover hover:from-homentor-chatHover hover:to-homentor-chat transition-all duration-300 flex items-center justify-center gap-1 group/icon overflow-hidden relative"
          title="Chat with mentor"
        >
          <MessageCircle className="lg:w-4 lg:h-4 h-2 w-2 transition-transform duration-300 group-hover/icon:scale-110" />
          <span className="inline lg:text-md text-[10px]">Chat</span>
          <span className=" absolute inset-0 bg-white/10 transform-gpu -translate-x-full group-hover/icon:translate-x-0 transition-transform duration-500"></span>
        </Button>

        <Button
          className="bg-gradient-to-r mentor-icons2 from-homentor-call to-homentor-callHover hover:from-homentor-callHover hover:to-homentor-call transition-all duration-300 flex items-center justify-center gap-1 group/icon overflow-hidden relative"
          title="Call mentor"
        >
          <PhoneCall className="lg:w-4 lg:h-4 h-2 w-2 transition-transform duration-300 group-hover/icon:scale-110" />
          <a
            href={`tel:${mentor.phone}`}
            className="inline lg:text-md text-[10px]"
          >
            Call
          </a>
        </Button>
      </div>

      {/* Login Popup */}
      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <div className="absolute z-[100] lg:hidden flex justify-between w-full items-center  gap-1 bottom-[1vh] px-2">
        <button
          onClick={() => handleChatClick()}
          className="border bg-blue-opacity px-1 py-0.5 border-mentor-blue-500 rounded-[2px] bg-mentor-blue-500 text-white mentor-icons1-sm from-homentor-chat to-homentor-chatHover hover:from-homentor-chatHover hover:to-homentor-chat transition-all duration-300 flex items-center justify-center overflow-hidden "
          title="Chat with mentor"
        >
          <span className="inline lg:text-md text-[11px]">Chat</span>
        </button>
        <button
          onClick={() =>
            payNow(+mentor?.teachingModes?.homeTuition?.monthlyPrice)
          }
          className="bg-green-500 z-[100] bg-opacity px-1 py-0 gap-0 rounded-[2px] flex lg:hidden flex-col h-[auto]"
        >
          <span className="text-[10px] sm:inline text-white">Book Now</span>
          <div className="lg:text-[12px] text-[11px]  text-white flex items-center">
            ({+mentor?.teachingModes?.homeTuition?.monthlyPrice / 1000}k
            <span className="text-[9px] ">/month</span>)
          </div>
        </button>
        <button
          // onClick={() => makeCall()}
          className="border bg-blue-opacity px-1 py-0.5 border-mentor-blue-500 rounded-[2px] bg-mentor-blue-500 text-white mentor-icons1-sm from-homentor-chat to-homentor-chatHover hover:from-homentor-chatHover hover:to-homentor-chat transition-all duration-300 flex items-center justify-center overflow-hidden "
          title="Chat with mentor"
        >
          <a
            href={`tel:${mentor.phone}`}
            className="inline lg:text-md text-[11px]"
          >
            Call
          </a>
        </button>
      </div>

      <Button
        onClick={() =>
          payNow(+mentor?.teachingModes?.homeTuition?.monthlyPrice)
        }
        className="absolute z-[100] bg-green-500 gap-0 lg:flex hidden flex-col bottom-[1vh] h-[auto]"
      >
        <div className="flex gap-2">
          <CalendarPlus className="lg:w-4 lg:h-4 h-3 w-3 hidden lg:inline transition-transform duration-300 group-hover/icon:scale-110" />
          <span className="text-[10px] sm:inline">Book Now</span>
        </div>
        <div className="lg:text-[12px] text-[9px] mentor-content-2 text-white">
          ({+mentor?.teachingModes?.homeTuition?.monthlyPrice / 1000}k/month)
        </div>
      </Button>

      {/* 🖼 Foreground content (not distorted) */}
      <div className="relative z-20 w-full lg:h-[60vh] h-[28vh]">
        <img
          src={mentor.profilePhoto ? mentor.profilePhoto : ""}
          alt="mentor"
          className="w-[98%] relative left-[01%] top-[1%] rounded-lg h-full object-cover"
          onClick={() => handleSelectMentor()}
        />

        <div className="Card-wave wave-first"></div>
      </div>
    </div>
  );
};

export default TornCard;
