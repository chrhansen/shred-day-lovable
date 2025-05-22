
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, addYears, subYears, subDays } from "date-fns";
import { ChevronLeft, CalendarIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock user data - in a real app, this would come from an auth service
  const [user, setUser] = useState({
    email: "user@example.com",
    signUpDate: new Date(2024, 2, 15), // March 15, 2024
    seasonStartDate: new Date(2024, 8, 1) // September 1, 2024
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSeasonDateChange = (date: Date | undefined) => {
    if (date) {
      setUser(prev => ({ ...prev, seasonStartDate: date }));
    }
  };

  // Calculate season ranges based on the selected start date
  const calculateSeasonRanges = () => {
    const { seasonStartDate } = user;
    const month = seasonStartDate.getMonth();
    const day = seasonStartDate.getDate();
    
    // Current season
    const currentSeasonStart = new Date(new Date().getFullYear(), month, day);
    if (currentSeasonStart > new Date()) {
      currentSeasonStart.setFullYear(currentSeasonStart.getFullYear() - 1);
    }
    const currentSeasonEnd = new Date(currentSeasonStart);
    currentSeasonEnd.setFullYear(currentSeasonEnd.getFullYear() + 1);
    currentSeasonEnd.setDate(currentSeasonEnd.getDate() - 1);
    
    // Last season
    const lastSeasonStart = subYears(currentSeasonStart, 1);
    const lastSeasonEnd = subDays(currentSeasonStart, 1);
    
    return {
      current: {
        start: currentSeasonStart,
        end: currentSeasonEnd
      },
      last: {
        start: lastSeasonStart,
        end: lastSeasonEnd
      }
    };
  };

  const seasonRanges = calculateSeasonRanges();

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would be an API call to save the changes
      // await apiClient.updateSeasonStartDate(user.seasonStartDate);
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Season start date saved",
        description: `Your season start date has been updated to ${format(user.seasonStartDate, "MMMM d, yyyy")}`,
      });
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
          <h1 className="text-xl font-bold">My Account</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="p-2 bg-gray-50 rounded-md border">
                {user.email}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Sign Up Date</Label>
              <div className="p-2 bg-gray-50 rounded-md border">
                {format(user.signUpDate, "MMMM d, yyyy")}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seasonStart">Season Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="seasonStart"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(user.seasonStartDate, "MMMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={user.seasonStartDate}
                    onSelect={handleSeasonDateChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-muted-foreground">
                This date is used to define the start of your ski season.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-medium">Season Ranges</h3>
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Current season:</span>{" "}
                  {format(seasonRanges.current.start, "MMM. d yyyy")} to{" "}
                  {format(seasonRanges.current.end, "MMM. d, yyyy")}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Last season:</span>{" "}
                  {format(seasonRanges.last.start, "MMM. d yyyy")} to{" "}
                  {format(seasonRanges.last.end, "MMM. d, yyyy")}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveChanges} 
              className="w-full"
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
