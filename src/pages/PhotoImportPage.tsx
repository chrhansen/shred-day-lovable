
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DragDropZone } from "@/components/DragDropZone";
import { DraftDayList } from "@/components/DraftDayList";
import { type DraftDay } from "@/types/ski";

// Placeholder data for draft days - in a real app, these would come from the server
const sampleDraftDays: DraftDay[] = [
  {
    id: "draft-1",
    date: new Date("2025-03-15"),
    resort: "Aspen Snowmass",
    photoCount: 5,
    status: "pending"
  },
  {
    id: "draft-2",
    date: new Date("2025-03-16"),
    resort: "Vail Resorts",
    photoCount: 8,
    status: "pending"
  }
];

export default function PhotoImportPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [draftDays, setDraftDays] = useState<DraftDay[]>([]);
  const [showDraftReview, setShowDraftReview] = useState(false);

  const handleFileDrop = useCallback((files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowDraftReview(true);
          setDraftDays(sampleDraftDays);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Cleanup interval
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = useCallback((id: string, status: "accepted" | "rejected" | "pending") => {
    setDraftDays(prev => 
      prev.map(day => day.id === id ? { ...day, status } : day)
    );
  }, []);

  const handleDraftEdit = useCallback((id: string, updatedDay: Partial<DraftDay>) => {
    setDraftDays(prev => 
      prev.map(day => day.id === id ? { ...day, ...updatedDay } : day)
    );
  }, []);

  const handleSaveDays = useCallback(() => {
    const acceptedDays = draftDays.filter(day => day.status === "accepted");
    
    // In a real app, this would send the accepted days to the server
    console.log("Saving accepted days:", acceptedDays);
    
    toast({
      title: "Import successful",
      description: `${acceptedDays.length} ski days have been imported.`
    });
    
    navigate("/days");
  }, [draftDays, navigate, toast]);

  const handleCancel = useCallback(() => {
    if (isUploading || draftDays.length > 0) {
      if (confirm("Are you sure you want to cancel? All progress will be lost.")) {
        navigate("/days");
      }
    } else {
      navigate("/days");
    }
  }, [isUploading, draftDays.length, navigate]);

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
          
          {showDraftReview && draftDays.some(day => day.status === "accepted") && (
            <Button 
              onClick={handleSaveDays}
              className="flex items-center gap-2"
            >
              Save Days
            </Button>
          )}
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          {showDraftReview ? "Review Imported Days" : "Import Photos"}
        </h1>

        {!showDraftReview ? (
          <DragDropZone 
            onFileDrop={handleFileDrop}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            acceptedFileTypes={[".jpg", ".jpeg", ".png"]}
          />
        ) : (
          <DraftDayList
            draftDays={draftDays}
            onStatusChange={handleStatusChange}
            onDraftEdit={handleDraftEdit}
          />
        )}
      </div>
    </div>
  );
}
