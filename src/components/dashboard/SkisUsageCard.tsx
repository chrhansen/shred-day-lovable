import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkiUsage {
  name: string;
  days: number;
}

interface SkisUsageCardProps {
  skis: SkiUsage[];
}

export function SkisUsageCard({ skis }: SkisUsageCardProps) {
  const totalDays = skis.reduce((sum, s) => sum + s.days, 0);
  
  // Stack bar colors
  const colors = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'];
  
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">Skis Used</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {/* Stacked bar */}
        <div className="h-6 flex rounded-full overflow-hidden">
          {skis.map((ski, index) => (
            <div
              key={ski.name}
              className="h-full transition-all"
              style={{ 
                width: `${(ski.days / totalDays) * 100}%`,
                backgroundColor: colors[index % colors.length]
              }}
              title={`${ski.name}: ${ski.days} days`}
            />
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {skis.map((ski, index) => (
            <div key={ski.name} className="flex items-center gap-1.5">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-xs text-slate-600">{ski.name}</span>
              <span className="text-xs text-slate-400">({ski.days})</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
