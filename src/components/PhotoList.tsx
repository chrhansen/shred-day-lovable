
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

  // Group photos by date and resort
  const groupedPhotos = useMemo(() => {
    const groups: { [key: string]: SkiPhoto[] } = {};
    
    sortedPhotos.forEach(photo => {
      // Create a unique key for each date+resort combination
      const dateStr = photo.date.toISOString().split('T')[0];
      const key = `${dateStr}_${photo.resort}`;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      
      groups[key].push(photo);
    });
    
    // Convert the groups object to an array for rendering
    return Object.entries(groups).map(([key, photos]) => {
      const [dateStr, resort] = key.split('_');
      return {
        id: key,
        dateStr,
        resort,
        photos
      };
    });
  }, [sortedPhotos]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100">
      {groupedPhotos.length > 0 ? (
        <div>
          {groupedPhotos.map((group) => (
            <div key={group.id} className="mb-4">
              {/* Group header - show for all groups regardless of size */}
              <div className="bg-purple-50 p-3 border-l-4 border-purple-400">
                <h3 className="text-sm font-medium text-purple-800">
                  Ski Day: {group.resort} • {new Date(group.dateStr).toLocaleDateString()}
                </h3>
                <p className="text-xs text-purple-600">
                  {group.photos.length} {group.photos.length === 1 ? 'photo' : 'photos'} in this ski day
                </p>
              </div>
              
              {/* Photos in this group */}
              <div className="border-l-4 border-purple-100 pl-3">
                {group.photos.map((photo) => (
                  <PhotoItem 
                    key={photo.id} 
                    photo={photo} 
                    onUpdate={onPhotoUpdate}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
            </div>
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
