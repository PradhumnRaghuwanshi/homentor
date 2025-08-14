import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import ClassInfoCard from "./ClassInfoCard";
import axios from "axios";

export default function ParentAttendanceModal({ classBooking }: any) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    getClassRecords();
  }, []);

  // const handleTick = async () => {
  //   await fetch(`/api/attendance/parent/${attendanceId}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ parentTick: true }),
  //   });
  //   onSaved();
  // };
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const getClassRecords = async () => {
    const response = await axios.get(
      `https://homentor-backend.onrender.com/api/class-records/class-booking/${classBooking._id}`
    );
    setRecords(response.data.data);
  };

  const updateParentAtt = async() => {
    const response = await axios.put(
      `https://homentor-backend.onrender.com/api/class-records/${record._id}`,
      {
        parentTick: true,
      }
    );
    getClassRecords();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          📝 View Sheet
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full  px-1">
        <DialogHeader>
          <DialogTitle>📄 Attendance Sheet</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-gray-500">Loading records...</p>
        ) : (
          <div className="overflow-x-auto  w-full border rounded-lg ">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Time In</th>
                  <th className="px-3 py-2">Time Out</th>
                  <th className="px-3 py-2">Duration</th>
                  <th className="px-3 py-2">Mentor</th>
                  <th className="px-3 py-2">Parent</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec._id} className="border-b">
                    <td className="px-3 py-2 text-nowrap">
                      {new Date(rec.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-3 py-2">{rec?.timeIn}</td>

                    <td className="px-3 py-2">{rec?.timeOut}</td>

                    <td className="px-3 py-2">{rec?.duration}</td>

                    <td className="px-3 py-2 text-center">
                      <Checkbox checked={rec.mentorTick} />
                    </td>

                    <td className="px-3 py-2 text-center">
                      <Checkbox
                        checked={rec.parentTick}
                        onClick={() => updateParentAtt()}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ClassInfoCard />
      </DialogContent>
    </Dialog>
  );
}
