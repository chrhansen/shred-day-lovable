import { format } from "date-fns";
import { useState } from "react";
import { MoreVertical, Share2, Pencil, Trash2 } from "lucide-react";
import { type SkiDay } from "@/types/ski";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SkiDayDetail } from "@/components/SkiDayDetail";
import { ShareDayDialog } from "@/components/ShareDayDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SkiDayItemProps {
  day: SkiDay;
  isHighlighted?: boolean;
  onToggleShare?: (dayId: string, enabled: boolean) => void;
  onEdit?: (day: SkiDay) => void;
  onDelete?: (day: SkiDay) => void;
}

export function SkiDayItem({ day, isHighlighted = false, onToggleShare, onEdit, onDelete }: SkiDayItemProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleToggleShare = (enabled: boolean) => {
    onToggleShare?.(day.id!, enabled);
  };

  return (
    <>
      <div 
        id={`day_${day.id}`}
        className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-all duration-500 ${
          isHighlighted ? 'bg-primary/5 border-l-4 border-l-primary' : ''
        }`}
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
          <div className="font-medium text-foreground">{day.resort}</div>
          <div className="text-sm text-muted-foreground">{format(day.date, 'MMM d, yyyy')}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span>{day.ski}</span>
            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
            <span>{day.activity}</span>
          </div>
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={handleMenuClick}>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={() => setIsShareOpen(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(day)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete?.(day)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SkiDayDetail 
        day={day} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />

      <ShareDayDialog
        day={day}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        onToggleShare={handleToggleShare}
      />
    </>
  );
}

