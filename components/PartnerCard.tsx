"use client";

import React from "react";
import Image from "next/image";
import type { Partner } from "@/data/partners";

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  const hasImage = !!partner.image;

  return (
    <div className="group relative aspect-square w-28 sm:w-36 md:w-40 bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center justify-center hover:bg-white/[0.04] hover:border-red-400/20 hover:shadow-lg hover:shadow-red-400/5 transition-all duration-300">
      {hasImage ? (
        <div className="relative w-full h-full">
          <Image
            src={partner.image}
            alt={partner.name}
            fill
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center w-full h-full gap-1 sm:gap-2">
          <div className="text-xl sm:text-2xl animate-pulse">👥</div>
          <div className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-white/50 uppercase tracking-widest leading-tight">
            {partner.name}
          </div>
          <div className="text-[7px] sm:text-[8px] uppercase tracking-wider text-red-400/60 font-mono">
            Placeholder
          </div>
        </div>
      )}
    </div>
  );
}
