
import React, { useState } from "react";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface ColumnConfig {
  id: string;
  label: string;
  enabled: boolean;
}

interface ColumnSelectorProps {
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
}

export function ColumnSelector({ columns, onColumnsChange }: ColumnSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = columns.map(col => 
      col.id === columnId ? { ...col, enabled: !col.enabled } : col
    );
    onColumnsChange(updatedColumns);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const updatedColumns = [...columns];
    const draggedColumn = updatedColumns[draggedIndex];
    
    // Remove the dragged item
    updatedColumns.splice(draggedIndex, 1);
    
    // Insert at new position
    updatedColumns.splice(dropIndex, 0, draggedColumn);
    
    onColumnsChange(updatedColumns);
    setDraggedIndex(null);
  };

  const enabledCount = columns.filter(col => col.enabled).length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between mb-4"
          type="button"
        >
          <span>
            Customize Columns ({enabledCount} selected)
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Select and reorder columns for your CSV export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {columns.map((column, index) => (
              <div
                key={column.id}
                className={`flex items-center space-x-3 p-2 rounded border transition-colors ${
                  draggedIndex === index ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                <Checkbox
                  id={column.id}
                  checked={column.enabled}
                  onCheckedChange={() => handleColumnToggle(column.id)}
                />
                <label 
                  htmlFor={column.id}
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  {column.label}
                </label>
              </div>
            ))}
            
            {enabledCount === 0 && (
              <div className="text-sm text-red-600 text-center py-2">
                Please select at least one column to export.
              </div>
            )}
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
