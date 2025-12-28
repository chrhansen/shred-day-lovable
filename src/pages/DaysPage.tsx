
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SkiDayItem } from "@/components/SkiDayItem";
import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, format, isWithinInterval, isSameMonth, subMonths } from "date-fns";

const sampleDays = [
  {
    id: "1",
    date: new Date("2025-12-26"),
    resort: "Whistler Blackcomb",
    ski: "Line Blade",
    activity: "Resort Skiing",
    photoCount: 8,
    photos: ["/placeholder-1.jpg", "/placeholder-2.jpg"],
    shared_at: null,
  },
  {
    id: "2",
    date: new Date("2025-12-24"),
    resort: "Mount Baker",
    ski: "Black Crows Corvus",
    activity: "Backcountry",
    photoCount: 15,
    photos: ["/placeholder-3.jpg", "/placeholder-4.jpg", "/placeholder-5.jpg"],
    shared_at: new Date("2025-12-24T10:00:00Z"),
  },
  {
    id: "3",
    date: new Date("2025-12-20"),
    resort: "Crystal Mountain",
    ski: "Line Blade",
    activity: "Resort Skiing",
    photoCount: 6,
    photos: ["/placeholder-1.jpg"],
    shared_at: null,
  },
  {
    id: "4",
    date: new Date("2025-12-15"),
    resort: "Stevens Pass",
    ski: "Faction Candide 2.0",
    activity: "Resort Skiing",
    photoCount: 10,
    photos: ["/placeholder-2.jpg", "/placeholder-3.jpg"],
    shared_at: null,
  },
  {
    id: "5",
    date: new Date("2025-11-28"),
    resort: "Revelstoke",
    ski: "Line Blade",
    activity: "Backcountry",
    photoCount: 12,
    photos: ["/placeholder-4.jpg", "/placeholder-5.jpg"],
    shared_at: new Date("2025-11-28T14:30:00Z"),
  },
];

function groupDaysByPeriod(days: typeof sampleDays) {
  const now = new Date();
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonth = subMonths(now, 1);
  const lastMonthStart = startOfMonth(lastMonth);
  const lastMonthEnd = endOfMonth(lastMonth);

  const groups: { [key: string]: typeof sampleDays } = {
    'This week': [],
    'This month': [],
    'Last month': [],
  };

  days.forEach(day => {
    const dayDate = new Date(day.date);
    
    if (isWithinInterval(dayDate, { start: thisWeekStart, end: thisWeekEnd })) {
      groups['This week'].push(day);
    } else if (isWithinInterval(dayDate, { start: thisMonthStart, end: thisMonthEnd })) {
      groups['This month'].push(day);
    } else if (isWithinInterval(dayDate, { start: lastMonthStart, end: lastMonthEnd })) {
      groups['Last month'].push(day);
    } else {
      const monthYear = format(dayDate, 'MMMM yyyy');
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(day);
    }
  });

  // Remove empty groups and sort remaining groups
  return Object.entries(groups)
    .filter(([_, days]) => days.length > 0)
    .map(([period, days]) => ({
      period,
      days: days.sort((a, b) => b.date.getTime() - a.date.getTime())
    }));
}

export default function DaysPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [highlightedDayId, setHighlightedDayId] = useState<string | null>(null);
  const groupedDays = groupDaysByPeriod(sampleDays);

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
        
        {/* Demo button to show highlighting effect */}
        <div className="mb-4 text-center">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => navigate('/days#day_2')}
          >
            Demo: Highlight Day 2
          </Button>
        </div>

        <div className="space-y-8">
          {groupedDays.map((group, groupIndex) => (
            <div key={group.period}>
              <h2 className="text-lg font-semibold text-slate-700 mb-3 px-1">{group.period}</h2>
              <div className="bg-white rounded-lg shadow-sm border border-slate-100">
                {group.days.map((day, dayIndex) => (
                  <div key={day.id}>
                    <SkiDayItem 
                      day={day} 
                      isHighlighted={highlightedDayId === `day_${day.id}`}
                    />
                    {dayIndex < group.days.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
