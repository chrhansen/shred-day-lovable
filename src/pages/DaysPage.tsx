
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SkiDayItem } from "@/components/SkiDayItem";

const sampleDays = [
  {
    id: "1",
    date: new Date("2025-01-15"),
    resort: "Whistler Blackcomb",
    ski: "Line Blade",
    activity: "Resort Skiing"
  },
  {
    id: "2",
    date: new Date("2025-02-01"),
    resort: "Revelstoke",
    ski: "Line Blade",
    activity: "Backcountry"
  },
  {
    id: "3",
    date: new Date("2025-02-14"),
    resort: "Fernie Alpine",
    ski: "Black Crows Corvus",
    activity: "Resort Skiing"
  }
];

export default function DaysPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4 text-slate-600 hover:text-slate-800"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">Ski Days</h1>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          {sampleDays.map((day, index) => (
            <div key={day.id}>
              <SkiDayItem day={day} />
              {index < sampleDays.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
