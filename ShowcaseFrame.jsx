import React from "react";
import { BookOpen } from "lucide-react";

/**
 * Purple showcase panel used for portfolio previews, with the
 * "Movement Publisher | Portfolio" label across the top.
 */
export default function ShowcaseFrame({ children, className = "" }) {
  return (
    <div className={`bg-purple-800 px-5 pt-4 pb-7 ${className}`}>
      <div className="flex items-center justify-center gap-2 text-white/90 mb-4">
        <BookOpen className="w-3.5 h-3.5" strokeWidth={1.6} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-center">
          Movement Publisher | Portfolio
        </span>
      </div>
      {children}
    </div>
  );
}