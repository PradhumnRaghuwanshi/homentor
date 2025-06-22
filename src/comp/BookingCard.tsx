import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";

const BookingCard = ({ mentorData, payNow }) => {
  const [mode, setMode] = useState("monthly"); // 'monthly' | 'demo' | 'hourly'
  const [hours, setHours] = useState(1);

  const monthlyRate = parseInt(
    mentorData.teachingModes.homeTuition.monthlyPrice || "0",
    10
  );
  const demoRate = 99; // fixed demo rate (customize if you have per-mentor demoFee)
  const hourlyRate = 300; // fixed per-hour rate (customize per mentor)

  const getPrice = () => {
    if (mode === "demo") return demoRate;
    if (mode === "hourly") return hourlyRate * hours;
    return monthlyRate;
  };

  return (
    <div className="flex flex-col gap-4 px-2 py-3 rounded-2xl shadow-xl bg-white border border-gray-200 lg:min-w-[250px] w-full">
      <div className="flex justify-between">
        <div className="text-right w-[45%]">
          <p className="text-4xl font-bold text-yellow-600 tracking-wide">
            ₹ {getPrice().toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">
            {mode === "monthly" && "per month"}
            {mode === "demo" && "demo class"}
            {mode === "hourly" && `${hours} hour${hours > 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex w-[45%] flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Select Plan:
          </label>
          <select
            className="border rounded px-3 py-2 text-sm"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option className="text-[10px]" value="monthly">Monthly</option>
            <option className="text-[10px]" value="demo">Demo Class</option>
            <option className="text-[10px]" value="hourly">Choose No. of Hours</option>
          </select>
          {mode === "hourly" && (
            <input
              type="number"
              min={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="mt-2 border rounded px-3 py-2 text-sm"
              placeholder="Enter hours"
            />
          )}
        </div>
      </div>

      <Button
        onClick={() => payNow()}
        size="lg"
        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-md font-semibold shadow-md"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Book Now
      </Button>

      <div className="flex justify-between gap-2 mt-1">
        <Button
          variant="outline"
          size="sm"
          className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Send Message
        </Button>

        <a href={`tel:${mentorData.phone}`} className="w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-green-500 text-green-600 hover:bg-green-50"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Call
          </Button>
        </a>
      </div>
    </div>
  );
};

export default BookingCard;
