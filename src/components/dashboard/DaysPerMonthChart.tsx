import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonthData {
  month: string;
  fullMonth: string;
  days: number;
}

interface DaysPerMonthChartProps {
  data: MonthData[];
  seasonStartMonth?: number; // 0-11, default September (8)
}

// Generate full 12-month season data starting from seasonStartMonth
function generateSeasonData(data: MonthData[], seasonStartMonth: number = 8): MonthData[] {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const seasonMonths: MonthData[] = [];
  for (let i = 0; i < 12; i++) {
    const monthIndex = (seasonStartMonth + i) % 12;
    const monthAbbr = monthNames[monthIndex];
    const existingData = data.find(d => d.month === monthAbbr);
    seasonMonths.push({
      month: monthAbbr,
      fullMonth: fullMonthNames[monthIndex],
      days: existingData?.days ?? 0
    });
  }
  return seasonMonths;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-medium">{data.fullMonth}</p>
        <p className="text-slate-300">{data.days} {data.days === 1 ? 'day' : 'days'}</p>
      </div>
    );
  }
  return null;
};

export function DaysPerMonthChart({ data, seasonStartMonth = 8 }: DaysPerMonthChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const seasonData = generateSeasonData(data, seasonStartMonth);
  const maxDays = Math.max(...seasonData.map(d => d.days));
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">Days Per Month</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[180px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={seasonData} 
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b' }}
                interval={0}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
                allowDecimals={false}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
              />
              <Bar 
                dataKey="days" 
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                {seasonData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      activeIndex === index 
                        ? '#3730a3' 
                        : entry.days === maxDays 
                          ? '#4f46e5' 
                          : entry.days > 0 
                            ? '#a5b4fc' 
                            : '#e2e8f0'
                    }
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
