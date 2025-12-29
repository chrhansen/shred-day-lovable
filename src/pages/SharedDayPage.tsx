import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { MapPin, Calendar, ChevronLeft, ChevronRight, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/Logo";

// Mock data - in production this would come from your Rails API
const mockSharedDay = {
  id: "abc123",
  date: new Date("2024-02-15"),
  resort: "Jackson Hole",
  ski: "Nordica Enforcer 100",
  activities: ["Powder", "Training", "With Friends"],
  notes: "Epic powder day! Fresh 18 inches overnight. Hit the backcountry gates early.",
  photos: [
    "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800&q=80",
  ],
  user: {
    username: "powder_hound",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
};

export default function SharedDayPage() {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // In production, fetch the day data from your Rails API using dayId
  const day = mockSharedDay;
  const hasPhotos = day.photos && day.photos.length > 0;

  const nextPhoto = () => {
    if (hasPhotos) {
      setCurrentPhotoIndex((prev) => 
        prev === day.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (hasPhotos) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? day.photos.length - 1 : prev - 1
      );
    }
  };

  // Handle touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPhoto();
      else prevPhoto();
    }
    setTouchStart(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Photo Carousel */}
      <div 
        className="relative w-full aspect-[4/5] sm:aspect-[16/10] bg-muted"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {hasPhotos ? (
          <>
            <img
              src={day.photos[currentPhotoIndex]}
              alt={`${day.resort} - Photo ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Photo Navigation */}
            {day.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Photo Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {day.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentPhotoIndex 
                          ? "bg-white w-4" 
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Mountain className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-2xl mx-auto w-full">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={day.user.avatar_url || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {day.user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-foreground">@{day.user.username}</p>
        </div>

        {/* Day Details */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {day.resort}
          </h1>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{format(day.date, 'MMMM d, yyyy')}</span>
          </div>

          {/* Activities */}
          <div className="flex flex-wrap gap-2">
            {day.activities.map((activity, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {activity}
              </span>
            ))}
          </div>

          {/* Ski Info */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
            <span className="text-sm font-medium">{day.ski}</span>
          </div>

          {/* Notes */}
          {day.notes && (
            <p className="text-foreground leading-relaxed pt-2">
              {day.notes}
            </p>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-6 border-t">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground">
              Track your ski days and share your adventures
            </p>
            <Button 
              onClick={() => navigate("/")}
              variant="default"
              className="w-full sm:w-auto"
            >
              Start Logging Your Days
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
