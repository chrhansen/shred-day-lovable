import { useState } from "react";
import { Logo } from "@/components/Logo";
import { SeasonStatsCard } from "@/components/dashboard/SeasonStatsCard";
import { DaysPerMonthChart } from "@/components/dashboard/DaysPerMonthChart";
import { ResortMap } from "@/components/dashboard/ResortMap";
import { TopResortsCard } from "@/components/dashboard/TopResortsCard";
import { TagsBreakdownChart } from "@/components/dashboard/TagsBreakdownChart";
import { SkisUsageCard } from "@/components/dashboard/SkisUsageCard";
import { SeasonSelector } from "@/components/dashboard/SeasonSelector";

// Mock data - will be replaced with real data from API
const mockSeasons = [
  { id: '2025-26', label: '2025/26 Season' },
  { id: '2024-25', label: '2024/25 Season' },
  { id: '2023-24', label: '2023/24 Season' },
];

const mockMonthlyData = [
  { month: 'Sep', fullMonth: 'September', days: 0 },
  { month: 'Oct', fullMonth: 'October', days: 2 },
  { month: 'Nov', fullMonth: 'November', days: 4 },
  { month: 'Dec', fullMonth: 'December', days: 8 },
  { month: 'Jan', fullMonth: 'January', days: 12 },
  { month: 'Feb', fullMonth: 'February', days: 9 },
  { month: 'Mar', fullMonth: 'March', days: 6 },
  { month: 'Apr', fullMonth: 'April', days: 3 },
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
  { name: 'Bad Visibility', count: 3 },
  { name: 'Racing', count: 2 },
];

const mockSkis = [
  { name: 'Atomic Redster G9, 181', days: 18 },
  { name: 'Fischer Ranger 102', days: 12 },
  { name: 'Völkl Mantra M6', days: 8 },
  { name: 'Salomon QST 106', days: 6 },
];

export default function Dashboard() {
  const [selectedSeason, setSelectedSeason] = useState('2025-26');

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <div className="max-w-md mx-auto px-4 pt-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <Logo className="text-lg" />
          <SeasonSelector 
            seasons={mockSeasons}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
          />
        </div>

        {/* Season Stats Hero */}
        <SeasonStatsCard 
          totalDays={44} 
          uniqueResorts={5} 
          currentStreak={3}
        />

        {/* Days Per Month Chart */}
        <DaysPerMonthChart data={mockMonthlyData} seasonStartMonth={8} />

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
      </div>
    </div>
  );
}
