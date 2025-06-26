
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { SelectionPill } from "@/components/SelectionPill";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { skiService } from "@/services/skiService";
import { toast } from "sonner";
import { isSameDay } from "date-fns";

const RESORTS = ["Stubai", "Kühtai", "Axamer Lizum"];
const SKIS = ["Fischer RC4 GS", "Atomic G9", "Kästle Twin tip"];
const ACTIVITIES = ["Friends", "Training"];

// Sample data for demonstration - in real app this would come from the service
const sampleExistingDays = [
  { id: "1", date: new Date("2025-01-15"), resort: "Whistler Blackcomb", ski: "Line Blade", activity: "Resort Skiing" },
  { id: "2", date: new Date("2025-02-01"), resort: "Revelstoke", ski: "Line Blade", activity: "Backcountry" },
  { id: "3", date: new Date("2025-02-14"), resort: "Fernie Alpine", ski: "Black Crows Corvus", activity: "Resort Skiing" },
  { id: "4", date: new Date("2025-06-05"), resort: "Stubai", ski: "Fischer RC4 GS", activity: "Training" },
  { id: "5", date: new Date("2025-06-12"), resort: "Kühtai", ski: "Atomic G9", activity: "Friends" },
  { id: "6", date: new Date("2025-06-18"), resort: "Axamer Lizum", ski: "Kästle Twin tip", activity: "Training" },
  { id: "7", date: new Date("2025-06-25"), resort: "Stubai", ski: "Fischer RC4 GS", activity: "Friends" }
];

export default function LogDay() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedResort, setSelectedResort] = useState<string>("");
  const [selectedSki, setSelectedSki] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<string>("");

  // In a real app, this would fetch from the service
  const existingDays = sampleExistingDays;

  const { mutate: saveDay, isPending } = useMutation({
    mutationFn: skiService.logDay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skiStats'] });
      toast.success("Ski day logged successfully!");
      navigate('/');
    },
    onError: () => {
      toast.error("Failed to log ski day");
    },
  });

  const handleSave = () => {
    if (!selectedResort || !selectedSki || !selectedActivity) {
      toast.error("Please fill in all fields");
      return;
    }

    saveDay({
      date,
      resort: selectedResort,
      ski: selectedSki,
      activity: selectedActivity,
    });
  };

  // Function to check if a date has existing ski days
  const hasSkiDay = (checkDate: Date) => {
    return existingDays.some(day => isSameDay(day.date, checkDate));
  };

  return (
    <div className="min-h-screen bg-white p-4 flex justify-center">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          className="mb-4 text-slate-600 hover:text-slate-800"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-md">
            <h2 className="text-lg font-medium text-slate-800 mb-4 text-center">Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-lg mx-auto"
              modifiers={{
                hasSkiDay: (date) => hasSkiDay(date)
              }}
              modifiersStyles={{
                hasSkiDay: {
                  fontWeight: 'bold',
                  color: '#3b82f6',
                  backgroundColor: '#eff6ff',
                  borderRadius: '6px'
                }
              }}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium text-slate-800 mb-4">Ski Resort</h2>
            <div className="flex flex-wrap gap-2">
              {RESORTS.map((resort) => (
                <SelectionPill
                  key={resort}
                  label={resort}
                  selected={selectedResort === resort}
                  onClick={() => setSelectedResort(resort)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-slate-800 mb-4">Skis</h2>
            <div className="flex flex-wrap gap-2">
              {SKIS.map((ski) => (
                <SelectionPill
                  key={ski}
                  label={ski}
                  selected={selectedSki === ski}
                  onClick={() => setSelectedSki(ski)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-slate-800 mb-4">Activity</h2>
            <div className="flex flex-wrap gap-2">
              {ACTIVITIES.map((activity) => (
                <SelectionPill
                  key={activity}
                  label={activity}
                  selected={selectedActivity === activity}
                  onClick={() => setSelectedActivity(activity)}
                />
              ))}
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSave}
          disabled={isPending}
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all hover:shadow-xl mt-8"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
