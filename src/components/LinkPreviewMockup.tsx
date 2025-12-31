import { Mountain, Snowflake } from "lucide-react";

const LinkPreviewMockup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8 flex flex-col items-center justify-center gap-12">
      <h1 className="text-2xl font-bold text-white/90">Link Preview Mockup</h1>
      
      {/* iMessage Style Container */}
      <div className="max-w-sm w-full">
        <p className="text-xs text-white/50 mb-2 text-center">iMessage / WhatsApp Preview</p>
        
        {/* The actual link preview card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Preview Image - Hero section */}
          <div className="relative h-44 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
            {/* Decorative mountains */}
            <div className="absolute inset-0 overflow-hidden">
              <svg 
                viewBox="0 0 400 180" 
                className="absolute bottom-0 w-full"
                preserveAspectRatio="xMidYMax slice"
              >
                <path 
                  d="M0 180 L80 80 L120 120 L180 40 L240 100 L300 60 L360 90 L400 50 L400 180 Z" 
                  fill="rgba(255,255,255,0.15)"
                />
                <path 
                  d="M0 180 L60 120 L100 140 L160 80 L220 130 L280 90 L340 110 L400 70 L400 180 Z" 
                  fill="rgba(255,255,255,0.1)"
                />
              </svg>
              
              {/* Snowflakes */}
              <Snowflake className="absolute top-4 right-6 h-5 w-5 text-white/30" />
              <Snowflake className="absolute top-8 left-8 h-3 w-3 text-white/20" />
              <Snowflake className="absolute top-16 right-16 h-4 w-4 text-white/25" />
            </div>
            
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
          
          {/* Text content below image */}
          <div className="p-3 bg-gray-50">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
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
