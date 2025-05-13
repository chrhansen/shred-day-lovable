
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DragDropZone } from "@/components/DragDropZone";
import { PhotoList } from "@/components/PhotoList";
import { type SkiPhoto } from "@/types/ski";

// Extended sample data to demonstrate grouping and stripped EXIF data
const samplePhotos: SkiPhoto[] = [
  // Stripped EXIF data photos
  {
    id: "photo-strip-1",
    url: "/placeholder-1.jpg",
    date: new Date(), // Today's date as placeholder
    resort: "",
    status: "pending",
    isStripped: true
  },
  {
    id: "photo-strip-2",
    url: "/placeholder-2.jpg",
    date: new Date(),
    resort: "",
    status: "pending",
    isStripped: true
  },
  
  // Group 1: Photos 1-3 (same date and resort)
  {
    id: "photo-1",
    url: "/placeholder-1.jpg",
    date: new Date("2025-03-20"),
    resort: "Aspen Snowmass",
    status: "pending"
  },
  {
    id: "photo-2",
    url: "/placeholder-2.jpg",
    date: new Date("2025-03-20"),
    resort: "Aspen Snowmass",
    status: "pending"
  },
  {
    id: "photo-3",
    url: "/placeholder-3.jpg",
    date: new Date("2025-03-20"),
    resort: "Aspen Snowmass",
    status: "pending"
  },
  
  // Group 2: Photo 4 (unique date)
  {
    id: "photo-4",
    url: "/placeholder-4.jpg",
    date: new Date("2025-03-18"),
    resort: "Vail Resorts",
    status: "pending"
  },
  
  // Group 3: Photo 5 (unique date, same resort as photo 4)
  {
    id: "photo-5",
    url: "/placeholder-5.jpg",
    date: new Date("2025-03-16"),
    resort: "Vail Resorts", 
    status: "pending"
  },
  
  // Group 4: Photos 6-7 (same date and resort)
  {
    id: "photo-6",
    url: "/placeholder-1.jpg", // Reusing placeholder images
    date: new Date("2025-03-15"),
    resort: "Breckenridge",
    status: "pending"
  },
  {
    id: "photo-7",
    url: "/placeholder-2.jpg",
    date: new Date("2025-03-15"),
    resort: "Breckenridge",
    status: "pending"
  },
  
  // Group 5: Photos 8-10 (same date and resort)
  {
    id: "photo-8",
    url: "/placeholder-3.jpg",
    date: new Date("2025-03-14"),
    resort: "Park City",
    status: "pending"
  },
  {
    id: "photo-9",
    url: "/placeholder-4.jpg",
    date: new Date("2025-03-14"),
    resort: "Park City",
    status: "pending"
  },
  {
    id: "photo-10",
    url: "/placeholder-5.jpg",
    date: new Date("2025-03-14"),
    resort: "Park City",
    status: "pending"
  }
];

export default function PhotoImportPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photos, setPhotos] = useState<SkiPhoto[]>([]);

  const handleFileDrop = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setPhotos(samplePhotos);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Cleanup interval
    return () => clearInterval(interval);
  }, []);

  const handlePhotoUpdate = useCallback((id: string, updates: Partial<SkiPhoto>) => {
    setPhotos(prev => 
      prev.map(photo => photo.id === id ? { ...photo, ...updates } : photo)
    );
  }, []);

  const handleStatusChange = useCallback((id: string, status: "accepted" | "rejected" | "pending") => {
    setPhotos(prev => 
      prev.map(photo => photo.id === id ? { ...photo, status } : photo)
    );
  }, []);

  const handleSavePhotos = useCallback(() => {
    const acceptedPhotos = photos.filter(photo => photo.status === "accepted");
    
    // In a real app, this would send the accepted photos to the server
    console.log("Saving accepted photos:", acceptedPhotos);
    
    toast({
      title: "Import successful",
      description: `${acceptedPhotos.length} photos have been imported.`
    });
    
    navigate("/days");
  }, [photos, navigate, toast]);

  const handleCancel = useCallback(() => {
    if (isUploading || photos.length > 0) {
      if (confirm("Are you sure you want to cancel? All progress will be lost.")) {
        navigate("/days");
      }
    } else {
      navigate("/days");
    }
  }, [isUploading, photos.length, navigate]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-slate-800"
            onClick={handleCancel}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          
          {photos.length > 0 && photos.some(photo => photo.status === "accepted") && (
            <Button 
              onClick={handleSavePhotos}
              className="flex items-center gap-2"
            >
              Save Photos
            </Button>
          )}
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          Import Photos
        </h1>

        <DragDropZone 
          onFileDrop={handleFileDrop}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          acceptedFileTypes={[".jpg", ".jpeg", ".png"]}
        />
        
        {photos.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Review Imported Photos</h2>
              <div className="text-sm text-slate-500">
                {photos.filter(p => p.status === "accepted").length} selected
              </div>
            </div>
            <PhotoList
              photos={photos}
              onPhotoUpdate={handlePhotoUpdate}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
