import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Flame, Target, Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SeasonStatsProps {
  totalDays: number;
  uniqueResorts: number;
  currentStreak: number;
  seasonGoal?: number;
  onSeasonGoalChange?: (newGoal: number) => void;
}

export function SeasonStatsCard({ 
  totalDays, 
  uniqueResorts, 
  currentStreak, 
  seasonGoal = 50,
  onSeasonGoalChange 
}: SeasonStatsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [goalInput, setGoalInput] = useState(String(seasonGoal));
  
  const progress = Math.min((totalDays / seasonGoal) * 100, 100);

  const handleSave = () => {
    const newGoal = parseInt(goalInput, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      onSeasonGoalChange?.(newGoal);
      setIsEditOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsEditOpen(open);
    if (open) {
      setGoalInput(String(seasonGoal));
    }
  };
  
  return (
    <>
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
          
          {/* Progress toward goal - tappable to edit */}
          <button 
            onClick={() => setIsEditOpen(true)}
            className="w-full text-left space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>Season Goal</span>
                <Pencil className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span>{totalDays}/{seasonGoal}</span>
            </div>
            <div className="h-2 bg-indigo-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/90 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </button>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Set Season Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="season-goal">Number of days</Label>
            <Input
              id="season-goal"
              type="number"
              min="1"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="50"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}