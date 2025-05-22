
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ChevronLeft, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    seasonStartDate: new Date(2024, 10, 15) // November 15, 2024
  });

  const handleSeasonDateChange = (date: Date | undefined) => {
    if (date) {
      setUser(prev => ({ ...prev, seasonStartDate: date }));
      toast({
        title: "Season start date updated",
        description: `Your season start date is now set to ${format(date, "MMMM d, yyyy")}`,
      });
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
