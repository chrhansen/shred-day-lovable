
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SkiDayItem } from "@/components/SkiDayItem";
import { useEffect, useState } from "react";

const sampleDays = [
  {
    id: "1",
    date: new Date("2025-01-15"),
    resort: "Whistler Blackcomb",
    ski: "Line Blade",
    activity: "Resort Skiing",
    photoCount: 8
  },
  {
    id: "2",
    date: new Date("2025-02-01"),
    resort: "Revelstoke",
    ski: "Line Blade",
    activity: "Backcountry",
    photoCount: 12
  },
  {
    id: "3",
    date: new Date("2025-02-14"),
    resort: "Fernie Alpine",
    ski: "Black Crows Corvus",
    activity: "Resort Skiing",
    photoCount: 5
  }
];

export default function DaysPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [highlightedDayId, setHighlightedDayId] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const dayId = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(dayId);
      
      if (element) {
        // Scroll to the element
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the day
        setHighlightedDayId(dayId);
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
          setHighlightedDayId(null);
        }, 2000);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-slate-800"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="secondary"
              onClick={() => navigate("/export")}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate("/import")}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Import Photos
            </Button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">Ski Days</h1>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          {sampleDays.map((day, index) => (
            <div key={day.id}>
              <SkiDayItem 
                day={day} 
                isHighlighted={highlightedDayId === `day_${day.id}`}
              />
              {index < sampleDays.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
