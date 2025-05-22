
import { Plus, User } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { skiService } from "@/services/skiService";
import { Logo } from "@/components/Logo";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ['skiStats'],
    queryFn: skiService.getStats,
  });

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <div className="flex justify-center">
          <Logo className="text-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div onClick={() => navigate("/days")} className="cursor-pointer">
            <StatsCard label="Days Skied" value={stats?.totalDays ?? '...'} />
          </div>
          <StatsCard label="Resorts Visited" value={stats?.uniqueResorts ?? '...'} />
          <StatsCard label="Most Used Ski" value={stats?.mostUsedSki ?? '...'} />
        </div>
        
        <Button 
          onClick={() => navigate("/log")}
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all hover:shadow-xl"
        >
          <Plus className="mr-2 h-5 w-5" />
          Log a day
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate("/account")}
          className="w-full mt-4"
        >
          <User className="mr-2 h-4 w-4" />
          My Account
        </Button>
      </div>
    </div>
  );
}
