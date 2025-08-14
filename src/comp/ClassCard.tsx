import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Calendar,
  Clock,
  ChevronRight,
  Video,
  Star,
  Eye,
  User,
  View,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import axios from "axios";
import ParentAttendanceModal from "./ParentAttendanceModal";

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "pending_schedule":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "scheduled":
      return "Scheduled";
    case "pending_schedule":
      return "Pending";
    default:
      return "Unknown";
  }
};

export default function ClassCard({ classItem, userType }) {
  useEffect(() => {
    getClassRecords();
  }, []);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const formatDateTime = (isoDate: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium", // e.g., Aug 2, 2025
      timeStyle: "short", // e.g., 3:09 PM
      timeZone: "Asia/Kolkata", // To adjust for Indian time
    }).format(new Date(isoDate));
  };
  const formatDateOnly = (isoDate: string) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return new Date(isoDate).toLocaleDateString("en-IN", options);
  };

  const formatTimeOnly = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const [classRecords, setClassRecords] = useState([]);
  const getClassRecords = async () => {
    const response = await axios.get(
      `https://homentor-backend.onrender.com/api/class-records/class-booking/${classItem._id}`
    );
    setClassRecords(response.data.data);
  };

  const handleParentAttendance = async (record) => {
    const response = await axios.put(
      `https://homentor-backend.onrender.com/api/class-records/${record._id}`,
      {
        parentTick: !record.parentTick,
      }
    );
    getClassRecords();
  };
  console.log(classItem);

  return (
    <>
      <Card key={classItem.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex lg:flex-row gap-2 flex-col items-start justify-between">
            <Badge className={getStatusColor(classItem.status)}>
              {getStatusText(classItem.status)}
            </Badge>
            <div className="flex items-start space-x-4">
              <img
                src={classItem?.mentor?.profilePhoto}
                alt={classItem?.mentor?.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">
                    {" "}
                    {classItem?.mentor?.fullName}
                  </h3>
                </div>

                <p className="text-gray-600 mb-1">
                  Mobile No : {classItem?.mentor?.phone}
                </p>
              </div>
            </div>
            {classItem.scheduledDate && (
              <div className="mt-2 p-2 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Scheduled for {formatDateOnly(
                    classItem.scheduledDate
                  )} at {formatTimeOnly(classItem.scheduledTime)}
                </p>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {classItem.duration} days
              </span>
              <span>Booked: {formatDateTime(classItem.bookedDate)}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h5 className="font-semibold text-lg">
                Student Name: {classItem?.studentName}
              </h5>
            </div>
            <p className="text-gray-600 mb-1">Class : {classItem?.class}</p>
            <p className="text-gray-600 mb-1">School : {classItem?.school}</p>
            <p className="text-gray-600 mb-1">Subject : {classItem?.subject}</p>

            {classItem.status === "scheduled" && (
              <ParentAttendanceModal classBooking={classItem} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Full Attendance Modal */}
      <Dialog
        open={isAttendanceModalOpen}
        onOpenChange={setIsAttendanceModalOpen}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Attendance Sheet</DialogTitle>
            <DialogDescription>
              Daily attendance for this program
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {classItem.attendance?.length ? (
              classItem.attendance.map((day, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-1 text-sm"
                >
                  <span>{day.date}</span>
                  <span
                    className={day.present ? "text-green-600" : "text-red-600"}
                  >
                    {day.present ? "Present" : "Absent"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No attendance records yet.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
