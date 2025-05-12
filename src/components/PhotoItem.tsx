
import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { type SkiPhoto } from "@/types/ski";

interface PhotoItemProps {
  photo: SkiPhoto;
  onUpdate: (id: string, updates: Partial<SkiPhoto>) => void;
  onStatusChange: (id: string, status: "accepted" | "rejected" | "pending") => void;
}

export function PhotoItem({ photo, onUpdate, onStatusChange }: PhotoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResort, setEditedResort] = useState(photo.resort);
  const [editedDate, setEditedDate] = useState<Date>(photo.date);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSave = () => {
    onUpdate(photo.id, { 
      resort: editedResort,
      date: editedDate
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedResort(photo.resort);
    setEditedDate(photo.date);
    setIsEditing(false);
  };

  return (
    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={photo.url} 
          alt={`Photo from ${photo.resort}`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label htmlFor="resort" className="block text-sm font-medium text-slate-700 mb-1">
                Resort Name
              </label>
              <Input
                id="resort"
                value={editedResort}
                onChange={(e) => setEditedResort(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date
              </label>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(editedDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={editedDate}
                    onSelect={(date) => {
                      if (date) {
                        setEditedDate(date);
                        setIsDatePickerOpen(false);
                      }
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex justify-end gap-2 mt-2">
              <Button type="button" variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 border-slate-200"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => onStatusChange(photo.id, "rejected")}
              >
                <Trash className="h-3.5 w-3.5" />
                Delete Image
              </Button>
            </div>
            {photo.status === "rejected" && (
              <div className="mt-2 flex">
                <span className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded">
                  Marked for deletion
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-500 ml-2"
                  onClick={() => onStatusChange(photo.id, "pending")}
                >
                  Undo
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
