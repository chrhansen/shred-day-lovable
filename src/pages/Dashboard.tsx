
import { Plus } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">My Ski Journal</h1>
        <div className="grid grid-cols-1 gap-6">
          <StatsCard label="Days Skied" value={85} />
          <StatsCard label="Resorts Visited" value={7} />
          <StatsCard label="Most Used Ski" value="Fischer RC4" />
        </div>
        
        <Button 
          onClick={() => navigate("/log")}
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all hover:shadow-xl"
        >
          <Plus className="mr-2 h-5 w-5" />
          Log a day
        </Button>
      </div>
    </div>
  );
}
