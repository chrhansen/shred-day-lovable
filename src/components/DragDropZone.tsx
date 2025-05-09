
import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DragDropZoneProps {
  onFileDrop: (files: File[]) => void;
  isUploading: boolean;
  uploadProgress: number;
  acceptedFileTypes: string[];
}

export function DragDropZone({
  onFileDrop,
  isUploading,
  uploadProgress,
  acceptedFileTypes
}: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      return acceptedFileTypes.includes(extension);
    });
    
    onFileDrop(validFiles);
  }, [onFileDrop, acceptedFileTypes]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFileDrop(files);
    }
  }, [onFileDrop]);

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? "border-primary bg-slate-50" : "border-slate-200"
      } ${isUploading ? "pointer-events-none" : "cursor-pointer"}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => !isUploading && document.getElementById("fileInput")?.click()}
    >
      <input 
        id="fileInput" 
        type="file" 
        multiple 
        accept={acceptedFileTypes.join(",")} 
        className="hidden" 
        onChange={handleFileSelect}
        disabled={isUploading}
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isDragging ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
        }`}>
          <Upload className="h-8 w-8" />
        </div>
        
        {isUploading ? (
          <div className="w-full space-y-2">
            <h3 className="text-lg font-medium">Uploading photos...</h3>
            <p className="text-slate-500">
              {uploadProgress < 100 
                ? "Analyzing EXIF data and locating ski resorts..." 
                : "Processing complete!"}
            </p>
            <Progress value={uploadProgress} className="h-2 w-full" />
          </div>
        ) : (
          <>
            <h3 className="text-lg font-medium">Drag and drop your ski photos</h3>
            <p className="text-slate-500">
              Or click to select files from your device
            </p>
            <p className="text-sm text-slate-400">
              Supported formats: {acceptedFileTypes.join(", ")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
