
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, addYears, subYears, subDays } from "date-fns";
import { ChevronLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Season {
  id: string;
  label: string;
  startDate: Date;
  endDate: Date;
  dayCount: number;
}

export default function ExportPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock season start date - in a real app, this would come from user settings
  const seasonStartDate = new Date(2024, 8, 1); // September 1, 2024
  
  // Generate seasons data
  const generateSeasons = (): Season[] => {
    const seasons: Season[] = [];
    const currentYear = new Date().getFullYear();
    
    for (let i = 0; i < 3; i++) {
      const seasonYear = currentYear - i;
      const startDate = new Date(seasonYear - 1, seasonStartDate.getMonth(), seasonStartDate.getDate());
      const endDate = new Date(seasonYear, seasonStartDate.getMonth(), seasonStartDate.getDate() - 1);
      
      // Mock day counts - in a real app, this would come from the database
      const dayCount = Math.floor(Math.random() * 20) + 5; // Random between 5-25 days
      
      let label;
      if (i === 0) {
        label = "Current Season";
      } else if (i === 1) {
        label = "Last Season";
      } else {
        label = `${seasonYear - 1}/${seasonYear} Season`;
      }
      
      seasons.push({
        id: `season-${seasonYear}`,
        label,
        startDate,
        endDate,
        dayCount
      });
    }
    
    return seasons;
  };

  const seasons = generateSeasons();
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const handleSeasonToggle = (seasonId: string) => {
    setSelectedSeasons(prev => 
      prev.includes(seasonId) 
        ? prev.filter(id => id !== seasonId)
        : [...prev, seasonId]
    );
  };

  const handleExport = async () => {
    if (selectedSeasons.length === 0) {
      toast({
        title: "No seasons selected",
        description: "Please select at least one season to export.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    try {
      // Mock CSV generation - in a real app, this would fetch data from the API
      const csvData = generateMockCSV(selectedSeasons);
      
      // Create and download CSV file
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `ski-days-export-${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export successful",
        description: `Exported ${selectedSeasons.length} season(s) to CSV file.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was a problem exporting your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generateMockCSV = (seasonIds: string[]): string => {
    const headers = ['Date', 'Resort', 'Ski', 'Activity', 'Season'];
    const rows = [headers.join(',')];
    
    // Mock data generation
    const resorts = ['Whistler Blackcomb', 'Revelstoke', 'Fernie Alpine', 'Sun Peaks', 'Big White'];
    const skis = ['Line Blade', 'Black Crows Corvus', 'Rossignol Soul 7', 'K2 Mindbender'];
    const activities = ['Resort Skiing', 'Backcountry', 'Touring'];
    
    seasonIds.forEach(seasonId => {
      const season = seasons.find(s => s.id === seasonId);
      if (season) {
        // Generate mock days for this season
        for (let i = 0; i < season.dayCount; i++) {
          const randomDate = new Date(
            season.startDate.getTime() + 
            Math.random() * (season.endDate.getTime() - season.startDate.getTime())
          );
          
          const row = [
            format(randomDate, 'yyyy-MM-dd'),
            resorts[Math.floor(Math.random() * resorts.length)],
            skis[Math.floor(Math.random() * skis.length)],
            activities[Math.floor(Math.random() * activities.length)],
            season.label
          ];
          
          rows.push(row.join(','));
        }
      }
    });
    
    return rows.join('\n');
  };

  const totalSelectedDays = selectedSeasons.reduce((total, seasonId) => {
    const season = seasons.find(s => s.id === seasonId);
    return total + (season?.dayCount || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <div className="flex justify-center">
          <Logo className="text-xl" />
        </div>
        
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Export Ski Days</h1>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the seasons you want to include in your CSV export:
          </p>
          
          {seasons.map((season) => (
            <Card key={season.id} className="cursor-pointer transition-colors hover:bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id={season.id}
                    checked={selectedSeasons.includes(season.id)}
                    onCheckedChange={() => handleSeasonToggle(season.id)}
                  />
                  <div className="flex-1 space-y-1">
                    <label 
                      htmlFor={season.id} 
                      className="text-sm font-medium cursor-pointer"
                    >
                      {season.label}
                    </label>
                    <div className="text-xs text-muted-foreground">
                      {format(season.startDate, "MMM d, yyyy")} - {format(season.endDate, "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      {season.dayCount} ski days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {selectedSeasons.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-blue-800">
                  Selected: {selectedSeasons.length} season(s), {totalSelectedDays} total days
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Button 
          onClick={handleExport}
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all hover:shadow-xl"
          disabled={selectedSeasons.length === 0 || isExporting}
        >
          <Download className="mr-2 h-5 w-5" />
          {isExporting ? "Exporting..." : "Download CSV"}
        </Button>
      </div>
    </div>
  );
}
