
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Images } from "lucide-react";

interface DraftDayThumbnailProps {
  photos?: string[];
  maxDisplay?: number;
}

export function DraftDayThumbnail({ photos = [], maxDisplay = 5 }: DraftDayThumbnailProps) {
  // If there are no photos, show a placeholder
  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-20 w-24 bg-slate-100 rounded-md">
        <Images className="h-8 w-8 text-slate-400" />
      </div>
    );
  }

  // Determine how many photos to display
  const displayPhotos = photos.slice(0, Math.min(maxDisplay, photos.length));
  const hasMore = photos.length > maxDisplay;

  return (
    <div className="flex flex-row gap-1 mt-2 overflow-x-auto pb-2">
      {displayPhotos.map((photo, index) => (
        <Avatar key={index} className="h-16 w-16 rounded-md border border-slate-200">
          <AvatarImage 
            src={photo} 
            alt={`Photo ${index + 1}`} 
            className="object-cover"
          />
          <AvatarFallback className="bg-slate-100 text-xs rounded-md">
            Photo
          </AvatarFallback>
        </Avatar>
      ))}
      
      {hasMore && (
        <div className="h-16 w-16 rounded-md border border-slate-200 flex items-center justify-center bg-slate-50">
          <span className="text-xs font-medium text-slate-500">
            +{photos.length - maxDisplay} more
          </span>
        </div>
      )}
    </div>
  );
}
