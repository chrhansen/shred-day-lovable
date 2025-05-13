
import React from "react";
import { PlusCircle, FolderPlus, XCircle, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
  // Map action to display text and icon
  const getActionDisplay = (action: SkiDayAction) => {
    switch(action) {
      case "add":
        return { text: "Add Photos", icon: <PlusCircle className="h-4 w-4" /> };
      case "create":
        return { text: "Create New", icon: <FolderPlus className="h-4 w-4" /> };
      case "skip":
        return { text: "Don't Import", icon: <XCircle className="h-4 w-4" /> };
    }
  };

  const currentAction = getActionDisplay(selectedAction);

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-2"
          >
            {currentAction.icon}
            {currentAction.text}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white">
          {skiDayExists && (
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onActionChange("add")}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Photos</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onActionChange("create")}
          >
            <FolderPlus className="h-4 w-4" />
            <span>Create New</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onActionChange("skip")}
          >
            <XCircle className="h-4 w-4" />
            <span>Don't Import</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
