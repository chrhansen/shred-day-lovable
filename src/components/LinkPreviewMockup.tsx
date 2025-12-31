import { Mountain } from "lucide-react";

const LinkPreviewMockup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8 flex flex-col items-center justify-center gap-12">
      <h1 className="text-2xl font-bold text-white/90">Link Preview Mockup</h1>
      
      {/* iMessage Style Container */}
      <div className="max-w-sm w-full">
        <p className="text-xs text-white/50 mb-2 text-center">iMessage / WhatsApp Preview</p>
        
        {/* The actual link preview card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Preview Image - Photo collage */}
          <div className="relative h-44">
            {/* 2x2 photo grid */}
            <div className="grid grid-cols-2 grid-rows-2 h-full gap-0.5 bg-black/20">
              <img 
                src="/placeholder-1.jpg" 
                alt="Ski day photo 1"
                className="w-full h-full object-cover"
              />
              <img 
                src="/placeholder-2.jpg" 
                alt="Ski day photo 2"
                className="w-full h-full object-cover"
              />
              <img 
                src="/placeholder-3.jpg" 
                alt="Ski day photo 3"
                className="w-full h-full object-cover"
              />
              <img 
                src="/placeholder-4.jpg" 
                alt="Ski day photo 4"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            
            {/* Main content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 mb-1">
                <Mountain className="h-5 w-5 text-white" />
                <span className="text-white font-bold text-lg tracking-tight">
                  Vail Mountain
                </span>
              </div>
              <p className="text-white/90 text-sm font-medium">
                December 28, 2024
              </p>
            </div>
            
            {/* Activity tags */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              <span className="bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-medium">
                Powder
              </span>
              <span className="bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-medium">
                Groomers
              </span>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50">
            <p className="text-xs text-gray-500 tracking-wide mb-0.5">
              shred.day
              shred.day
            </p>
            <p className="text-sm text-gray-700 line-clamp-2">
              Powder day at Vail! 8 runs, blue skies, and perfect conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPreviewMockup;
