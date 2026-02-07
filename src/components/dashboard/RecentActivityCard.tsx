import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface RecentDay {
  date: Date;
  resort: string;
  dayNumber: number;
}

interface RecentActivityCardProps {
  days: RecentDay[];
}

export function RecentActivityCard({ days }: RecentActivityCardProps) {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700 flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-500" />
          Recent Days
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {days.slice(0, 5).map((day, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                #{day.dayNumber}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{day.resort}</p>
                <p className="text-xs text-slate-500">{format(day.date, 'MMM d, yyyy')}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
