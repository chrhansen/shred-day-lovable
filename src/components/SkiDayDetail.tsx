
import { format } from "date-fns";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { type SkiDay } from "@/types/ski";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SkiDayDetailProps {
  day: SkiDay;
  isOpen: boolean;
  onClose: () => void;
}

export function SkiDayDetail({ day, isOpen, onClose }: SkiDayDetailProps) {
  // For demo, we'll use placeholder images
  const images = [1, 2, 3]; // In a real app, these would be actual image URLs from the day

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-md md:max-w-xl p-0 gap-0 border-none overflow-hidden bg-white rounded-xl">
        <div className="relative">
          {/* Carousel for images */}
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((_, index) => (
                <CarouselItem key={index} className="relative">
                  <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center">
                    <div className="text-slate-400">
                      Image {index + 1}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-slate-700" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-lg shadow-md">
              <AvatarFallback className="bg-slate-50 text-slate-400 text-sm">
                {day.resort.split(" ").map(word => word[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">{day.resort}</h2>
              <p className="text-slate-500">{format(day.date, "EEEE, MMMM d, yyyy")}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">Skis</h3>
              <p className="text-slate-800">{day.ski}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">Activity</h3>
              <p className="text-slate-800">{day.activity}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Notes</h3>
            <p className="text-slate-800">
              {/* Placeholder for notes - in a real app, this would come from the day data */}
              Perfect snow conditions today! Had a great time exploring the back bowls.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
