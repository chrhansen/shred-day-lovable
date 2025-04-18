
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <p className="text-3xl font-bold text-blue-900">{value}</p>
        <p className="text-sm text-slate-600 mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}
