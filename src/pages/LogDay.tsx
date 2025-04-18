
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { SelectionPill } from "@/components/SelectionPill";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RESORTS = ["Stubai", "Kühtai", "Axamer Lizum"];
const SKIS = ["Fischer RC4 GS", "Atomic G9", "Kästle Twin tip"];
const ACTIVITIES = ["Friends", "Training"];

export default function LogDay() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedResort, setSelectedResort] = useState<string>("");
  const [selectedSki, setSelectedSki] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<string>("");

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-3">Date</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border w-full"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">Ski Resort</h2>
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
            <h2 className="text-lg font-medium mb-3">Skis</h2>
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
            <h2 className="text-lg font-medium mb-3">Activity</h2>
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
          className="w-full h-14 text-lg bg-blue-900 hover:bg-blue-800 text-white mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
