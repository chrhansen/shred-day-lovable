

import { format } from "date-fns";
import { useState } from "react";
import { type SkiDay } from "@/types/ski";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SkiDayDetail } from "@/components/SkiDayDetail";
import { Badge } from "@/components/ui/badge";

interface SkiDayItemProps {
  day: SkiDay;
}

export function SkiDayItem({ day }: SkiDayItemProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div 
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsDetailOpen(true)}
      >
        <div className="relative">
          <Avatar className="h-16 w-16 rounded-lg shadow-md">
            <AvatarFallback className="bg-slate-50 text-slate-400 text-sm">
              {day.resort.split(' ').map(word => word[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {day.photoCount && day.photoCount > 0 && (
            <div className="absolute bottom-0 right-0 bg-black/40 text-white text-xs px-1.5 py-0.5 rounded-tl-sm rounded-br-lg min-w-[20px] text-center">
              {day.photoCount}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-medium text-slate-900">{day.resort}</div>
          <div className="text-sm text-slate-500">{format(day.date, 'MMM d, yyyy')}</div>
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <span>{day.ski}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{day.activity}</span>
          </div>
        </div>
      </div>

      <SkiDayDetail 
        day={day} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />
    </>
  );
}

