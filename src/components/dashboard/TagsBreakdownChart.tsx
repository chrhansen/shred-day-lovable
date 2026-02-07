import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from 'lucide-react';

interface TagData {
  name: string;
  count: number;
}

interface TagsBreakdownChartProps {
  data: TagData[];
}

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e'];

export function TagsBreakdownChart({ data }: TagsBreakdownChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700 flex items-center gap-2">
          <Tags className="h-4 w-4 text-indigo-500" />
          Day Types
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="count"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                align="right" 
                verticalAlign="middle"
                formatter={(value, entry: any) => (
                  <span className="text-xs text-slate-600">
                    {value} ({Math.round((entry.payload.count / total) * 100)}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
