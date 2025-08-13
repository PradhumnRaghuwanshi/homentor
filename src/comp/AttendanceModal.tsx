"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

export default function AttendanceModal({ classBooking }) {
  const closeRef = useRef(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(null); // track saving row

  // Fetch all attendance records
  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          
          `https://homentor-backend.onrender.com/api/class-records/class-booking/${classBooking._id}`
        );
        setRecords(res.data.data || []);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
      setLoading(false);
    };
    fetchRecords();
  }, [classBooking._id]);

  // Handle inline change
  const handleChange = (id, field, value) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec._id === id ? { ...rec, [field]: value } : rec
      )
    );
  };

  // Save changes for a row
  const handleSave = async (record) => {
    setSaving(record._id);
    try {
      await axios.put(
        `https://homentor-backend.onrender.com/api/class-records/${record._id}`,
        record
      );
    } catch (err) {
      console.error("Error saving:", err);
    }
    setSaving(null);
  };

  const [todayAtt, setTodayAtt] = useState({
    date: "",
  timeIn: "",
  timeOut: "",
  duration: "",
  topic: "",
  mentorTick: "",
  parentTick: "",
  }) 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          📝 Mark Attendance
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>📄 Attendance Sheet</DialogTitle>
          <DialogDescription>
            Update attendance for <strong>{classBooking.subject}</strong>
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-gray-500">Loading records...</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Topic</th>
                  <th className="px-3 py-2">Time In</th>
                  <th className="px-3 py-2">Time Out</th>
                  <th className="px-3 py-2">Duration</th>
                  <th className="px-3 py-2">Mentor</th>
                  <th className="px-3 py-2">Parent</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  records.map((rec) => (
                    <tr key={rec._id} className="border-b">
                      <td className="px-3 py-2">{rec.date}</td>

                      <td className="px-3 py-2">
                        <Input
                          value={rec.topic || ""}
                          onChange={(e) =>
                            handleChange(rec._id, "topic", e.target.value)
                          }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Input
                          type="time"
                          value={rec.timeIn || ""}
                          onChange={(e) =>
                            handleChange(rec._id, "timeIn", e.target.value)
                          }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Input
                          type="time"
                          value={rec.timeOut || ""}
                          onChange={(e) =>
                            handleChange(rec._id, "timeOut", e.target.value)
                          }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Input
                          value={rec.duration || ""}
                          onChange={(e) =>
                            handleChange(rec._id, "duration", e.target.value)
                          }
                        />
                      </td>

                      <td className="px-3 py-2 text-center">
                        <Checkbox
                          checked={rec.mentorTick}
                          onCheckedChange={(val) =>
                            handleChange(rec._id, "mentorTick", val)
                          }
                        />
                      </td>

                      <td className="px-3 py-2 text-center">
                        <Checkbox
                          checked={rec.parentTick}
                          onCheckedChange={(val) =>
                            handleChange(rec._id, "parentTick", val)
                          }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(rec)}
                          disabled={saving === rec._id}
                        >
                          {saving === rec._id ? "Saving..." : "Save"}
                        </Button>
                      </td>
                    </tr>
                  ))
               }
               <tr className="border-b">
                      <td className="px-3 py-2">
                        <input type="date"></input>
                      </td>

                      <td className="px-3 py-2">
                        <Input
                          value={todayAtt.topic || ""}
                          onChange={(e) =>
                           
                            setTodayAtt({...todayAtt, topic : e.target.value})
                          
                          }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Input
                          type="time"
                          value={todayAtt.timeIn || ""}
                          onChange={(e) =>
                            setTodayAtt({...todayAtt, timeIn : e.target.value})
                          }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Input
                          type="time"
                          value={todayAtt.timeOut || ""}
                          onChange={(e) =>
                            setTodayAtt({...todayAtt, timeOut : e.target.value})
                          }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Input
                          value={todayAtt.duration || ""}
                          onChange={(e) =>
                            setTodayAtt({...todayAtt, duration : e.target.value})
                          }
                        />
                      </td>

                      <td className="px-3 py-2 text-center">
                        <Checkbox
                          // checked={todayAtt?.mentorTick}
                          
                        />
                      </td>

                      <td className="px-3 py-2 text-center">
                        <Checkbox
                          // checked={rec.parentTick}
                          // onCheckedChange={(val) =>
                          //   handleChange(rec._id, "parentTick", val)
                          // }
                        />
                      </td>

                      <td className="px-3 py-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(todayAtt)}
                          // disabled={saving === todayAtt._id}
                        >
                          Save
                          {/* {saving === rec._id ? "Saving..." : "Save"} */}
                        </Button>
                      </td>
                    </tr>
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
