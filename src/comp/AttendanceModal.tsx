"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function AttendanceModal({ classBooking, getBookings }) {
  const [formData, setFormData] = useState({
    date: "",
    timeIn: "",
    timeOut: "",
    duration: "",
    topic: "",
    mentorTick: false,
    parentTick: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attendance submitted:", formData);
    // You can POST to backend here with classBooking._id
    // await axios.post(`/api/attendance/${classBooking._id}`, formData);
    getBookings(); // Refresh bookings
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">📝 Mark Attendance</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>📄 Attendance Sheet</DialogTitle>
          <DialogDescription>
            Fill in class attendance for <strong>{classBooking.subject}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Topic Covered</Label>
              <Input
                type="text"
                name="topic"
                placeholder="e.g., Algebra Basics"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Time In</Label>
              <Input
                type="time"
                name="timeIn"
                value={formData.timeIn}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Time Out</Label>
              <Input
                type="time"
                name="timeOut"
                value={formData.timeOut}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label>Duration</Label>
            <Input
              type="text"
              name="duration"
              placeholder="e.g., 60 mins"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2">
              <Checkbox
                name="mentorTick"
                checked={formData.mentorTick}
                onCheckedChange={(val) =>
                  setFormData((prev) => ({ ...prev, mentorTick: val }))
                }
              />
              Mentor Tick
            </label>

            <label className="flex items-center gap-2">
              <Checkbox
                name="parentTick"
                checked={formData.parentTick}
                onCheckedChange={(val) =>
                  setFormData((prev) => ({ ...prev, parentTick: val }))
                }
              />
              Parent Tick
            </label>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit Attendance</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
