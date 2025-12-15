import { ArrowRight, Mountain, Calendar, BarChart3, Share2, Download, Sparkles, FileSpreadsheet, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  const navigate = useNavigate();

  const problems = [
    "Forgetting which days you skied last season",
    "No easy way to track your gear usage",
    "Scattered notes across apps and photos",
    "Missing out on seeing your progress",
  ];

  const features = [
    {
      icon: Calendar,
      title: "Log Every Day",
      description: "Quick entries with photos, conditions, and gear. Takes seconds.",
    },
    {
      icon: BarChart3,
      title: "See Your Stats",
      description: "Total days, resorts visited, gear breakdown, and more.",
    },
    {
      icon: Share2,
      title: "Share Your Season",
      description: "Beautiful share links to show off your adventures.",
    },
    {
      icon: Download,
      title: "Own Your Data",
      description: "Import from photos. Export to CSV. No lock-in.",
    },
    {
      icon: FileSpreadsheet,
      title: "Google Sheets Sync",
      description: "Automatic sync to Google Sheets. Your days, always up to date.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Logo className="text-xl" />
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/signin")}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Your ski journal
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-foreground">Remember</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  every powder day
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The simplest way to track your ski season. Log days, see stats, 
                and never forget another epic run.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
                <Button 
                  onClick={() => navigate("/signup")}
                  size="lg"
                  className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Start Tracking Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/signin")}
                  size="lg"
                  className="h-14 px-8 text-lg border-2"
                >
                  I have an account
                </Button>
              </div>

              {/* Social Proof */}
              <p className="text-sm text-muted-foreground pt-4">
                Join skiers & snowboarders tracking their seasons
              </p>
            </div>

            {/* Right Column - Phone Mockups */}
            <div className="relative flex justify-center lg:justify-end items-center">
              {/* Phone Mockup 1 - Front */}
              <div className="relative z-10 w-56 md:w-64 lg:w-72">
                <div className="bg-card rounded-[2.5rem] border-4 border-foreground/10 shadow-2xl shadow-primary/20 overflow-hidden">
                  {/* Phone Notch */}
                  <div className="bg-foreground/10 h-6 flex items-center justify-center">
                    <div className="w-20 h-4 bg-foreground/20 rounded-full"></div>
                  </div>
                  {/* Screen Content - Placeholder */}
                  <div className="aspect-[9/16] bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Screenshot 1</span>
                  </div>
                  {/* Bottom Bar */}
                  <div className="h-6 bg-foreground/10 flex items-center justify-center">
                    <div className="w-24 h-1 bg-foreground/30 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Phone Mockup 2 - Behind */}
              <div className="absolute right-0 lg:right-8 top-12 md:top-16 w-48 md:w-56 lg:w-64 -rotate-6">
                <div className="bg-card rounded-[2.5rem] border-4 border-foreground/10 shadow-xl shadow-primary/10 overflow-hidden">
                  {/* Phone Notch */}
                  <div className="bg-foreground/10 h-5 flex items-center justify-center">
                    <div className="w-16 h-3 bg-foreground/20 rounded-full"></div>
                  </div>
                  {/* Screen Content - Placeholder */}
                  <div className="aspect-[9/16] bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Screenshot 2</span>
                  </div>
                  {/* Bottom Bar */}
                  <div className="h-5 bg-foreground/10 flex items-center justify-center">
                    <div className="w-20 h-1 bg-foreground/30 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sound familiar?
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-5 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✕</span>
                </div>
                <p className="text-foreground/80">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution/Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              One app. Your whole season.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for skiers who want to remember every day on the mountain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            {/* Mock App Preview */}
            <div className="bg-card rounded-2xl border border-border shadow-2xl shadow-primary/10 overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-muted/50 rounded-xl p-6 text-center">
                    <Mountain className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-4xl font-bold text-foreground">47</div>
                    <div className="text-sm text-muted-foreground">Days This Season</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6 text-center">
                    <Snowflake className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-4xl font-bold text-foreground">5</div>
                    <div className="text-sm text-muted-foreground">Skis Used</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6 text-center">
                    <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-4xl font-bold text-foreground">12</div>
                    <div className="text-sm text-muted-foreground">Resorts Visited</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to track your season?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Free to use. No credit card required. Your data, always.
          </p>
          <Button 
            onClick={() => navigate("/signup")}
            size="lg"
            className="h-16 px-12 text-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Get Started Free
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo className="text-lg" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} shred.day — Track your season.
          </p>
        </div>
      </footer>
    </div>
  );
}
