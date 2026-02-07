import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from 'lucide-react';

interface TagData {
  name: string;
  count: number;
}

interface TagsBreakdownChartProps {
  data: TagData[];
  maxVisible?: number;
}

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#94a3b8'];

// Process tags to show top N and group rest as "Other"
function processTagsData(data: TagData[], maxVisible: number): TagData[] {
  if (data.length <= maxVisible) {
    return data;
  }
  
  // Sort by count descending
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const topTags = sorted.slice(0, maxVisible);
  const otherTags = sorted.slice(maxVisible);
  
  if (otherTags.length > 0) {
    const otherCount = otherTags.reduce((sum, t) => sum + t.count, 0);
    topTags.push({ name: 'Other', count: otherCount });
  }
  
  return topTags;
}

export function TagsBreakdownChart({ data, maxVisible = 5 }: TagsBreakdownChartProps) {
  const processedData = processTagsData(data, maxVisible);
  const total = processedData.reduce((sum, d) => sum + d.count, 0);
  
  if (total === 0) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-700 flex items-center gap-2">
            <Tags className="h-4 w-4 text-indigo-500" />
            Top Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-slate-500 text-center py-8">No tags used yet</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700 flex items-center gap-2">
          <Tags className="h-4 w-4 text-indigo-500" />
          Top Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={processedData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="count"
              >
                {processedData.map((_, index) => (
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
