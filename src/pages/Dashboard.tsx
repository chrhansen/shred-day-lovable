
import { Plus } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <StatsCard label="Days Skied" value={85} />
          <StatsCard label="Resorts Visited" value={7} />
          <StatsCard label="Most Used Ski" value="Fischer RC4" />
        </div>
        
        <Button 
          onClick={() => navigate("/log")}
          className="w-full h-14 text-lg bg-blue-900 hover:bg-blue-800 text-white"
        >
          <Plus className="mr-2 h-5 w-5" />
          Log a day
        </Button>
      </div>
    </div>
  );
}
