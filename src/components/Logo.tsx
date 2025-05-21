
import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="32" height="32" rx="6" fill="#9b87f5" />
        <path
          d="M16 5L8 27M16 5L24 27M8 27H24M12 17H20"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-slate-800">Ski Journal</span>
    </div>
  );
}
