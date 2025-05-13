
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PlusCircle, FolderPlus, XCircle } from "lucide-react";

type SkiDayAction = "add" | "create" | "skip";

interface SkiDayActionToggleProps {
  skiDayExists: boolean;
  selectedAction: SkiDayAction;
  onActionChange: (value: SkiDayAction) => void;
}

export function SkiDayActionToggle({ 
  skiDayExists, 
  selectedAction, 
  onActionChange 
}: SkiDayActionToggleProps) {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-xs font-medium">
        {skiDayExists ? "A ski day already exists" : "No ski day exists"}
      </span>
      <ToggleGroup 
        type="single" 
        value={selectedAction} 
        onValueChange={(value) => {
          if (value) onActionChange(value as SkiDayAction);
        }}
        className="bg-white border border-slate-200 rounded-md"
      >
        {skiDayExists && (
          <ToggleGroupItem 
            value="add" 
            aria-label="Add photos to existing ski day"
            className="text-xs px-2 py-1 data-[state=on]:bg-orange-600 data-[state=on]:text-white"
          >
            <PlusCircle className="h-3 w-3 mr-1" />
            Add Photos
          </ToggleGroupItem>
        )}
        <ToggleGroupItem 
          value="create" 
          aria-label="Create new ski day"
          className="text-xs px-2 py-1 data-[state=on]:bg-orange-600 data-[state=on]:text-white"
        >
          <FolderPlus className="h-3 w-3 mr-1" />
          Create New
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="skip" 
          aria-label="Don't import photos"
          className="text-xs px-2 py-1 data-[state=on]:bg-orange-600 data-[state=on]:text-white"
        >
          <XCircle className="h-3 w-3 mr-1" />
          Don't import
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
