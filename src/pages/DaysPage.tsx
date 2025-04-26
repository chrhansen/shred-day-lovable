
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

const sampleDays = [
  {
    id: "1",
    date: new Date("2025-01-15"),
    resort: "Whistler Blackcomb",
    ski: "Line Blade",
    activity: "Resort Skiing"
  },
  {
    id: "2",
    date: new Date("2025-02-01"),
    resort: "Revelstoke",
    ski: "Line Blade",
    activity: "Backcountry"
  },
  {
    id: "3",
    date: new Date("2025-02-14"),
    resort: "Fernie Alpine",
    ski: "Black Crows Corvus",
    activity: "Resort Skiing"
  }
];

export default function DaysPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="mb-4 text-slate-600 hover:text-slate-800"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">Ski Days</h1>

        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Resort</TableHead>
                <TableHead>Ski</TableHead>
                <TableHead>Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleDays.map((day) => (
                <TableRow key={day.id}>
                  <TableCell>{day.date.toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{day.resort}</TableCell>
                  <TableCell>{day.ski}</TableCell>
                  <TableCell>{day.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
