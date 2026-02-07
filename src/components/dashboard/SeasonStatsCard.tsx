import { Card, CardContent } from '@/components/ui/card';
import { Calendar, TrendingUp, Flame, Target } from 'lucide-react';

interface SeasonStatsProps {
  totalDays: number;
  uniqueResorts: number;
  currentStreak: number;
  seasonGoal?: number;
}

export function SeasonStatsCard({ totalDays, uniqueResorts, currentStreak, seasonGoal = 50 }: SeasonStatsProps) {
  const progress = Math.min((totalDays / seasonGoal) * 100, 100);
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-4xl font-bold">{totalDays}</p>
            <p className="text-sm text-indigo-200">days this season</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center justify-end gap-1.5 text-indigo-200">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-sm">{uniqueResorts} resorts</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-indigo-200">
              <Flame className="h-3.5 w-3.5" />
              <span className="text-sm">{currentStreak} day streak</span>
            </div>
          </div>
        </div>
        
        {/* Progress toward goal */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              <span>Season Goal</span>
            </div>
            <span>{totalDays}/{seasonGoal}</span>
          </div>
          <div className="h-2 bg-indigo-800/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/90 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
