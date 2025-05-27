import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { CalendarPlus, MessageCircle, PhoneCall, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const TornCard = () => {
  const navigate = useNavigate()
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
      <div className="absolute top-2 right-2 z-[100]">
        <Badge className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-semibold px-2 py-1 flex items-center gap-1 shadow-lg transform-gpu transition-transform duration-300 hover:scale-110">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          {/* {mentor.rating} */} 4.9
        </Badge>
      </div>

      <div className="w-[100%] lg:block hidden h-[20vh] bg-blue-500 absolute z-[100] opacity-50 mentor-bg"></div>

      <div className="lg:text-lg text-white text-sm lg:block hidden font-bold mentor-content absolute z-[100] bottom-[16vh]">
        Filan Fisteku
      </div>

      <div className="lg:text-lg text-sm text-white lg:hidden font-bold mentor-content absolute z-[100] bottom-[8vh]">
        Filan Fisteku
      </div>
      <div className="absolute z-[100] lg:flex hidden gap-10 bottom-[10vh]">
        <Button
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
          <span className="inline lg:text-md text-[10px]">Call</span>
        </Button>
      </div>

      <div className="absolute z-[100] lg:hidden flex w-full items-center  gap-1 bottom-[1vh] left-2">
        <Button
          className="bg-gradient-to-r px-3 mentor-icons1-sm from-homentor-chat to-homentor-chatHover hover:from-homentor-chatHover hover:to-homentor-chat transition-all duration-300 flex items-center justify-center gap-1 group/icon overflow-hidden relative"
          title="Chat with mentor"
        >
          {/* <MessageCircle className="lg:w-4 lg:h-4 h-2 w-2 transition-transform duration-300 group-hover/icon:scale-110" /> */}
          <span className="inline lg:text-md text-[11px]">Chat</span>
        </Button>
        <Button className=" z-[100] px-3 gap-0 flex lg:hidden flex-col bottom-[1vh] right-2 h-[auto]">
          <div className="flex gap-2">
            <CalendarPlus className="lg:w-4 lg:h-4 h-3 w-3 hidden lg:inline transition-transform duration-300 group-hover/icon:scale-110" />
            <span className="text-[10px] sm:inline">Book Now</span>
          </div>
          <div className="lg:text-[12px] text-[9px] mentor-content-2 text-white">
            (6k/month)
          </div>
        </Button>
        <Button
          className="bg-gradient-to-r px-3 mentor-icons2 from-homentor-call to-homentor-callHover hover:from-homentor-callHover hover:to-homentor-call transition-all duration-300 flex items-center justify-center gap-1 group/icon overflow-hidden relative"
          title="Call mentor"
        >
          {/* <PhoneCall className="lg:w-4 lg:h-4 h-2 w-2 transition-transform duration-300 group-hover/icon:scale-110" /> */}
          <span className="inline lg:text-md text-[11px]">Call</span>
        </Button>
      </div>

      <Button className="absolute z-[100] gap-0 lg:flex hidden flex-col bottom-[1vh] h-[auto]">
        <div className="flex gap-2">
          <CalendarPlus className="lg:w-4 lg:h-4 h-3 w-3 hidden lg:inline transition-transform duration-300 group-hover/icon:scale-110" />
          <span className="text-[10px] sm:inline">Book Now</span>
        </div>
        <div className="lg:text-[12px] text-[9px] mentor-content-2 text-white">
          (6k/month)
        </div>
      </Button>

      {/* 🖼 Foreground content (not distorted) */}
      <div className="relative z-20 w-full h-full">
        <img
          src="https://photosnow.org/wp-content/uploads/2024/04/indian-girl-photo_18.jpg"
          alt="mentor"
          className="w-[98%] relative left-[01%] top-[1%] rounded-lg h-full object-cover"
          onClick={()=> navigate('/mentors/prashant')}
        />

        <div className="Card-wave wave-first"></div>
      </div>
    </div>
  );
};

export default TornCard;
