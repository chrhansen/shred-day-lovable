import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonthData {
  month: string;
  days: number;
}

interface DaysPerMonthChartProps {
  data: MonthData[];
}

export function DaysPerMonthChart({ data }: DaysPerMonthChartProps) {
  const maxDays = Math.max(...data.map(d => d.days));
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">Days Per Month</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[180px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
                allowDecimals={false}
              />
              <Bar dataKey="days" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.days === maxDays ? '#4f46e5' : '#a5b4fc'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
