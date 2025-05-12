
import { useMemo } from "react";
import { type SkiPhoto } from "@/types/ski";
import { PhotoItem } from "@/components/PhotoItem";

interface PhotoListProps {
  photos: SkiPhoto[];
  onPhotoUpdate: (id: string, updates: Partial<SkiPhoto>) => void;
  onStatusChange: (id: string, status: "accepted" | "rejected" | "pending") => void;
}

export function PhotoList({ photos, onPhotoUpdate, onStatusChange }: PhotoListProps) {
  // Sort photos by date (descending) and then by resort name
  const sortedPhotos = useMemo(() => {
    return [...photos].sort((a, b) => {
      // First sort by date (descending)
      const dateCompare = b.date.getTime() - a.date.getTime();
      
      // If dates are equal, sort by resort name
      if (dateCompare === 0) {
        return a.resort.localeCompare(b.resort);
      }
      
      return dateCompare;
    });
  }, [photos]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100">
      {sortedPhotos.length > 0 ? (
        <div>
          {sortedPhotos.map((photo) => (
            <PhotoItem 
              key={photo.id} 
              photo={photo} 
              onUpdate={onPhotoUpdate}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <p className="text-slate-500">No photos have been imported yet.</p>
        </div>
      )}
    </div>
  );
}
