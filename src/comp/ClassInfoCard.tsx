import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function ClassInfoCard() {
  const [mentorConfirmed, setMentorConfirmed] = useState(false);
  const [parentConfirmed, setParentConfirmed] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const statusCompleted = mentorConfirmed && parentConfirmed;

  return (
    <Card className="mt-2 w-full shadow-lg rounded-xl">
      <CardHeader className="mb-2 p-[1px] ">
        <CardTitle className="flex flex-wrap justify-between items-center text-lg font-semibold">
          Class Status:{" "}
          <span
            className={`ml-2 font-bold ${
              statusCompleted ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusCompleted ? "Completed" : "Pending"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-[1px]">
        {/* Checkboxes */}
        <div className="flex gap-2 items-center">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={mentorConfirmed}
              onCheckedChange={(checked) => setMentorConfirmed(!!checked)}
            />
            Mentor
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={parentConfirmed}
              onCheckedChange={(checked) => setParentConfirmed(!!checked)}
            />
            Parent
          </label>
        </div>

        {/* Rating */}
        <div className="flex  gap-2">
          <p className="font-medium mb-1">Rating:</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div>
          <p className="font-medium mb-1">Feedback:</p>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            className="min-h-[80px]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-1 mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Book Next Session
          </Button>
          <Button variant="destructive">Terminate / Change Teacher</Button>
        </div>
      </CardContent>
    </Card>
  );
}
