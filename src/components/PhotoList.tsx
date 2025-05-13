
import { useMemo, useState } from "react";
import { type SkiPhoto } from "@/types/ski";
import { PhotoItem } from "@/components/PhotoItem";
import { SkiDayActionToggle } from "@/components/SkiDayActionToggle";

type SkiDayAction = "add" | "create" | "skip";

interface GroupActions {
  [key: string]: SkiDayAction;
}

interface PhotoListProps {
  photos: SkiPhoto[];
  onPhotoUpdate: (id: string, updates: Partial<SkiPhoto>) => void;
  onStatusChange: (id: string, status: "accepted" | "rejected" | "pending") => void;
}

export function PhotoList({ photos, onPhotoUpdate, onStatusChange }: PhotoListProps) {
  // Track selected actions for each group
  const [groupActions, setGroupActions] = useState<GroupActions>({});

  // Separate stripped photos from regular photos
  const strippedPhotos = useMemo(() => {
    return photos.filter(photo => photo.isStripped);
  }, [photos]);

  const regularPhotos = useMemo(() => {
    return photos.filter(photo => !photo.isStripped);
  }, [photos]);

  // Sort regular photos by date (descending) and then by resort name
  const sortedPhotos = useMemo(() => {
    return [...regularPhotos].sort((a, b) => {
      // First sort by date (descending)
      const dateCompare = b.date.getTime() - a.date.getTime();
      
      // If dates are equal, sort by resort name
      if (dateCompare === 0) {
        return a.resort.localeCompare(b.resort);
      }
      
      return dateCompare;
    });
  }, [regularPhotos]);

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
        photos,
        // Simulate if a ski day exists already (for demo purposes)
        // In a real app, this would come from the backend
        skiDayExists: Math.random() > 0.3 // 70% chance a ski day exists
      };
    });
  }, [sortedPhotos]);

  // Initialize default actions for each group
  useMemo(() => {
    const initialActions: GroupActions = {};
    
    groupedPhotos.forEach(group => {
      initialActions[group.id] = group.skiDayExists ? "add" : "create";
    });
    
    setGroupActions(initialActions);
  }, [groupedPhotos]);

  // Handle action change for a group
  const handleActionChange = (groupId: string, action: SkiDayAction) => {
    setGroupActions(prev => ({
      ...prev,
      [groupId]: action
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100">
      {/* Stripped Photos Section */}
      {strippedPhotos.length > 0 && (
        <div className="mb-6">
          <div className="bg-amber-50 p-3 border-l-4 border-amber-400">
            <h3 className="text-sm font-medium text-amber-800">
              Photos with Missing Data
            </h3>
            <p className="text-xs text-amber-600">
              {strippedPhotos.length} {strippedPhotos.length === 1 ? 'photo' : 'photos'} with missing EXIF data
            </p>
          </div>
          
          <div className="border-l-4 border-amber-100 pl-3">
            {strippedPhotos.map((photo) => (
              <PhotoItem 
                key={photo.id} 
                photo={photo} 
                onUpdate={onPhotoUpdate}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Photos Section */}
      {groupedPhotos.length > 0 ? (
        <div>
          {groupedPhotos.map((group) => (
            <div key={group.id} className="mb-4">
              {/* Group header for all groups */}
              <div className="bg-purple-50 p-3 border-l-4 border-purple-400">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <h3 className="text-sm font-medium text-purple-800">
                      Ski Day: {group.resort} • {new Date(group.dateStr).toLocaleDateString()}
                    </h3>
                    <p className="text-xs text-purple-600">
                      {group.photos.length} {group.photos.length === 1 ? 'photo' : 'photos'} in this ski day
                    </p>
                  </div>
                  
                  <SkiDayActionToggle 
                    skiDayExists={group.skiDayExists}
                    selectedAction={groupActions[group.id] || (group.skiDayExists ? "add" : "create")}
                    onActionChange={(action) => handleActionChange(group.id, action)}
                  />
                </div>
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
      ) : regularPhotos.length > 0 ? (
        <div className="p-3">
          <p className="text-slate-500">All photos are in the Missing Data section.</p>
        </div>
      ) : (
        <div className="text-center p-8">
          <p className="text-slate-500">No photos have been imported yet.</p>
        </div>
      )}
    </div>
  );
}
