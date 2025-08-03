import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  Label, Checkbox, Button
} from "@/components/ui";
import { useState, useEffect } from "react";

export default function ParentAttendanceModal({ attendanceId, onSaved }: any) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await fetch(`/api/attendance/${attendanceId}`);
      const json = await res.json();
      setData(json);
    };
    fetchAttendance();
  }, [attendanceId]);

  const handleTick = async () => {
    await fetch(`/api/attendance/parent/${attendanceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentTick: true }),
    });
    onSaved();
  };

  return (
    <Dialog>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Attendance Confirmation</DialogTitle>
        </DialogHeader>

        {["date", "timeIn", "timeOut", "duration", "topic"].map((f) => (
          <div key={f}>
            <Label>{f.toUpperCase()}: {data[f]}</Label>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <Checkbox checked={data.parentTick} onCheckedChange={handleTick} />
          <Label>Confirm Attendance</Label>
        </div>

        <Button onClick={handleTick}>Submit Confirmation</Button>
      </DialogContent>
    </Dialog>
  );
}
