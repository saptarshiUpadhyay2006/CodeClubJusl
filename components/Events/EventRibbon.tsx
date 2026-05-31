"use client";

import React from "react";

interface EventRibbonProps {
  text?: string;
}

export default function EventRibbon({ text = "" }: EventRibbonProps) {
  // Reserve space even when text is empty so the ribbon is always visible
  const displayText = text || "\u00A0";

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-10 flex-col items-center overflow-hidden bg-black/60 backdrop-blur-sm sm:w-12">
      {/* Animated marquee container */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Two copies for seamless loop */}
        <div className="animate-marquee-down absolute flex flex-col items-center gap-16">
          <span
            className="whitespace-nowrap font-bebas-neue text-xl uppercase tracking-[0.15em] text-red-400 sm:text-2xl"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {displayText}
          </span>
          <span
            className="whitespace-nowrap font-bebas-neue text-xl uppercase tracking-[0.15em] text-red-400 sm:text-2xl"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {displayText}
          </span>
          <span
            className="whitespace-nowrap font-bebas-neue text-xl uppercase tracking-[0.15em] text-red-400 sm:text-2xl"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {displayText}
          </span>
        </div>
      </div>
    </div>
  );
}
