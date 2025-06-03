
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { type TextDraftDay } from "@/types/ski";

interface TextDraftDayEditorProps {
  day: TextDraftDay;
  onSave: (updatedDay: Partial<TextDraftDay>) => void;
  onCancel: () => void;
}

export function TextDraftDayEditor({ day, onSave, onCancel }: TextDraftDayEditorProps) {
  const [resort, setResort] = useState(day.resort);
  const [date, setDate] = useState<Date>(day.date);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ resort, date });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="resort" className="block text-sm font-medium text-slate-700">
          Resort Name
        </label>
        <Input
          id="resort"
          value={resort}
          onChange={(e) => setResort(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Date
        </label>
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setIsDatePickerOpen(false);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="bg-slate-50 rounded p-3 text-sm text-slate-600">
        <span className="font-medium">Original text:</span> {day.originalText}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
