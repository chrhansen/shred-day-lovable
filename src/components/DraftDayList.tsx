
import { format } from "date-fns";
import { type DraftDay } from "@/types/ski";
import { Button } from "@/components/ui/button";
import { Check, X, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { DraftDayEditor } from "@/components/DraftDayEditor";

interface DraftDayListProps {
  draftDays: DraftDay[];
  onStatusChange: (id: string, status: "accepted" | "rejected" | "pending") => void;
  onDraftEdit: (id: string, updatedDay: Partial<DraftDay>) => void;
}

export function DraftDayList({ draftDays, onStatusChange, onDraftEdit }: DraftDayListProps) {
  const [editingDayId, setEditingDayId] = useState<string | null>(null);
  
  const handleStartEdit = (id: string) => {
    setEditingDayId(id);
  };
  
  const handleFinishEdit = () => {
    setEditingDayId(null);
  };

  return (
    <div className="space-y-6">
      {draftDays.length > 0 ? (
        <>
          <div className="text-center mb-4">
            <p className="text-slate-500">
              We found {draftDays.length} potential ski days from your photos.
              Please review each day below.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-slate-100 divide-y divide-slate-100">
            {draftDays.map((day) => (
              <div key={day.id} className="p-4">
                {editingDayId === day.id ? (
                  <DraftDayEditor
                    day={day}
                    onSave={(updatedDay) => {
                      onDraftEdit(day.id, updatedDay);
                      handleFinishEdit();
                    }}
                    onCancel={handleFinishEdit}
                  />
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{day.resort}</div>
                      <div className="text-sm text-slate-500">{format(day.date, 'MMM d, yyyy')}</div>
                      <div className="text-sm text-slate-500">{day.photoCount} photos</div>
                    </div>
                    <div className="flex gap-2">
                      {day.status === "pending" ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1 border-slate-200"
                            onClick={() => handleStartEdit(day.id)}
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => onStatusChange(day.id, "rejected")}
                          >
                            <X className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                            onClick={() => onStatusChange(day.id, "accepted")}
                          >
                            <Check className="h-3.5 w-3.5" />
                            Accept
                          </Button>
                        </>
                      ) : (
                        <>
                          {day.status === "rejected" && (
                            <span className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded">
                              Rejected
                            </span>
                          )}
                          {day.status === "accepted" && (
                            <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
                              Accepted
                            </span>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500"
                            onClick={() => onStatusChange(day.id, "pending")}
                          >
                            Undo
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-slate-500">No ski days found in your photos.</p>
        </div>
      )}
    </div>
  );
}
