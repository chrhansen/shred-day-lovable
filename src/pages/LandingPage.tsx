import { ArrowRight, BarChart3, Download, Share2, Camera, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  const navigate = useNavigate();

  const stats = [
    "Most used skis",
    "Most rides in a week", 
    "Most visited resort",
    "Total vertical feet",
    "Favorite weather conditions",
    "Season progression"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <Logo className="text-2xl" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Track Your Season
            <br />
            <span className="text-slate-700">The Simple Way</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            For skiers, snowboarders, and telemark enthusiasts who want to remember every powder day, 
            track their progress, and share their adventures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/signup")}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Tracking Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/signin")}
              size="lg"
              className="px-8 py-6 text-lg border-2 hover:bg-slate-50"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Feature 1: Simple Tracking */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Camera className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Simple Tracking</h3>
            <p className="text-slate-600 leading-relaxed">
              Log your days in seconds. Add photos, notes, gear, and conditions. 
              The fastest way to capture your season memories.
            </p>
          </div>

          {/* Feature 2: Insightful Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100">
            <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Review Your Stats</h3>
            <div className="space-y-2">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center text-slate-600">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                  {stat}
                </div>
              ))}
            </div>
          </div>

          {/* Feature 3: No Lock-in */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100">
            <div className="bg-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Download className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Data, Your Way</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Import from photos or spreadsheets. Export to CSV anytime. 
              No lock-in, complete data ownership.
            </p>
            <div className="flex gap-2">
              <div className="flex items-center text-sm text-slate-500">
                <Camera className="h-4 w-4 mr-1" />
                Photos
              </div>
              <div className="flex items-center text-sm text-slate-500">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                CSV
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Feature */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
              <Share2 className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Beautiful Share Links
            </h2>
            
            <p className="text-xl text-blue-100 leading-relaxed">
              Create stunning visual summaries of your season. 
              Share your achievements with friends or keep them private.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
              <div className="text-white/80 text-sm mb-2">shred.day/share/your-season</div>
              <div className="bg-white/20 rounded-lg p-4 text-left">
                <div className="text-white font-semibold">Alex's 2024/25 Season</div>
                <div className="text-blue-100 text-sm mt-1">42 days • 15 resorts • 127,340 ft vertical</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            Ready to Track Your Season?
          </h2>
          
          <p className="text-xl text-slate-600">
            Join thousands of skiers and snowboarders already tracking their adventures.
          </p>
          
          <Button 
            onClick={() => navigate("/signup")}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          
          <p className="text-sm text-slate-500">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </div>
  );
}