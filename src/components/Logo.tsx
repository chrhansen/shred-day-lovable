import shredDayLogo from "@/assets/shred-day-logo.png";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={shredDayLogo}
        alt="shred.day"
        className="h-8 w-8 mr-2"
      />
      <span className="font-bold text-foreground">shred.day</span>
    </div>
  );
}
