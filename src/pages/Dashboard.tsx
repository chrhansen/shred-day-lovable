import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SeasonStatsCard } from "@/components/dashboard/SeasonStatsCard";
import { DaysPerMonthChart } from "@/components/dashboard/DaysPerMonthChart";
import { ResortMap } from "@/components/dashboard/ResortMap";
import { TopResortsCard } from "@/components/dashboard/TopResortsCard";
import { TagsBreakdownChart } from "@/components/dashboard/TagsBreakdownChart";
import { SkisUsageCard } from "@/components/dashboard/SkisUsageCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";

// Mock data - will be replaced with real data from API
const mockMonthlyData = [
  { month: 'Sep', days: 0 },
  { month: 'Oct', days: 2 },
  { month: 'Nov', days: 4 },
  { month: 'Dec', days: 8 },
  { month: 'Jan', days: 12 },
  { month: 'Feb', days: 9 },
  { month: 'Mar', days: 6 },
  { month: 'Apr', days: 3 },
];

const mockResorts = [
  { name: 'Zermatt', latitude: 46.0207, longitude: 7.7491, daysSkied: 8, country: 'Switzerland' },
  { name: 'Chamonix', latitude: 45.9237, longitude: 6.8694, daysSkied: 6, country: 'France' },
  { name: 'St. Anton', latitude: 47.1297, longitude: 10.2685, daysSkied: 5, country: 'Austria' },
  { name: 'Verbier', latitude: 46.0963, longitude: 7.2286, daysSkied: 4, country: 'Switzerland' },
  { name: 'Val d\'Isère', latitude: 45.4481, longitude: 6.9769, daysSkied: 3, country: 'France' },
];

const mockTags = [
  { name: 'Powder', count: 12 },
  { name: 'Groomed', count: 18 },
  { name: 'Training', count: 8 },
  { name: 'Family', count: 5 },
  { name: 'Touring', count: 4 },
];

const mockSkis = [
  { name: 'All-Mountain', days: 18 },
  { name: 'Powder', days: 12 },
  { name: 'Race', days: 8 },
  { name: 'Touring', days: 6 },
];

const mockRecentDays = [
  { date: new Date(2026, 1, 5), resort: 'Zermatt', dayNumber: 44 },
  { date: new Date(2026, 1, 3), resort: 'Zermatt', dayNumber: 43 },
  { date: new Date(2026, 0, 28), resort: 'Chamonix', dayNumber: 42 },
  { date: new Date(2026, 0, 25), resort: 'Chamonix', dayNumber: 41 },
  { date: new Date(2026, 0, 20), resort: 'St. Anton', dayNumber: 40 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-md mx-auto px-4 pt-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <Logo className="text-lg" />
          <span className="text-sm text-slate-500">2025/26 Season</span>
        </div>

        {/* Season Stats Hero */}
        <SeasonStatsCard 
          totalDays={44} 
          uniqueResorts={5} 
          currentStreak={3}
          seasonGoal={50}
        />

        {/* Days Per Month Chart */}
        <DaysPerMonthChart data={mockMonthlyData} />

        {/* Map View */}
        <ResortMap resorts={mockResorts} />

        {/* Top Resorts */}
        <TopResortsCard 
          resorts={mockResorts.map(r => ({ name: r.name, days: r.daysSkied, country: r.country }))} 
        />

        {/* Tags Breakdown */}
        <TagsBreakdownChart data={mockTags} />

        {/* Skis Usage */}
        <SkisUsageCard skis={mockSkis} />

        {/* Recent Activity */}
        <RecentActivityCard days={mockRecentDays} />
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4 max-w-md mx-auto">
        <Button 
          onClick={() => navigate("/log")}
          className="w-full h-14 text-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-xl transition-all hover:shadow-2xl rounded-full"
        >
          <Plus className="mr-2 h-5 w-5" />
          Log a Day
        </Button>
      </div>
    </div>
  );
}
