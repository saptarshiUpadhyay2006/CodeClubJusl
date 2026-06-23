"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Building, FileText, Download, Users } from "lucide-react";
import Magnet from "./Magnet";

interface FolderCardProps {
  company: string;
  count: number;
  contributors: string[];
  pdfPath: string;
  meta: {
    color: string;
    bgGlow: string;
    gradientLine: string;
    buttonClass: string;
    initial: string;
  };
}

const brandBorders: Record<string, {
  border: string;
  borderHover: string;
  glowDefault: string;
  glowHover: string;
  text: string;
  bgBtn: string;
  borderBtn: string;
}> = {
  "Google": {
    border: "border-blue-500/30",
    borderHover: "border-blue-400/60",
    glowDefault: "rgba(96, 165, 250, 0.1)",
    glowHover: "rgba(96, 165, 250, 0.3)",
    text: "text-blue-400",
    bgBtn: "group-hover:bg-blue-500 group-hover:text-black group-hover:border-blue-400",
    borderBtn: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  },
  "D.E. Shaw": {
    border: "border-rose-500/30",
    borderHover: "border-rose-400/60",
    glowDefault: "rgba(244, 63, 94, 0.1)",
    glowHover: "rgba(244, 63, 94, 0.3)",
    text: "text-rose-400",
    bgBtn: "group-hover:bg-rose-500 group-hover:text-black group-hover:border-rose-400",
    borderBtn: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  },
  "JPMC": {
    border: "border-amber-500/30",
    borderHover: "border-amber-400/60",
    glowDefault: "rgba(251, 191, 36, 0.1)",
    glowHover: "rgba(251, 191, 36, 0.3)",
    text: "text-amber-400",
    bgBtn: "group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400",
    borderBtn: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  },
  "Salesforce": {
    border: "border-cyan-500/30",
    borderHover: "border-cyan-400/60",
    glowDefault: "rgba(34, 211, 238, 0.1)",
    glowHover: "rgba(34, 211, 238, 0.3)",
    text: "text-cyan-400",
    bgBtn: "group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400",
    borderBtn: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  },
  "Sprinklr": {
    border: "border-orange-500/30",
    borderHover: "border-orange-400/60",
    glowDefault: "rgba(249, 115, 22, 0.1)",
    glowHover: "rgba(249, 115, 22, 0.3)",
    text: "text-orange-500",
    bgBtn: "group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-400",
    borderBtn: "border-orange-500/30 text-orange-400 bg-orange-500/10",
  },
  "Visa": {
    border: "border-indigo-500/30",
    borderHover: "border-indigo-400/60",
    glowDefault: "rgba(129, 140, 248, 0.1)",
    glowHover: "rgba(129, 140, 248, 0.3)",
    text: "text-indigo-400",
    bgBtn: "group-hover:bg-indigo-500 group-hover:text-black group-hover:border-indigo-400",
    borderBtn: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
  },
  "Wells Fargo": {
    border: "border-emerald-500/30",
    borderHover: "border-emerald-400/60",
    glowDefault: "rgba(52, 211, 153, 0.1)",
    glowHover: "rgba(52, 211, 153, 0.3)",
    text: "text-emerald-400",
    bgBtn: "group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-400",
    borderBtn: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  }
};

const defaultBrand = {
  border: "border-white/10",
  borderHover: "border-white/30",
  glowDefault: "rgba(255, 255, 255, 0.05)",
  glowHover: "rgba(255, 255, 255, 0.15)",
  text: "text-neutral-300",
  bgBtn: "group-hover:bg-white group-hover:text-black group-hover:border-white",
  borderBtn: "border-white/20 text-neutral-300 bg-white/5",
};

export default function FolderCard({
  company,
  count,
  contributors,
  pdfPath,
  meta,
}: FolderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), { damping: 30, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), { damping: 30, stiffness: 150 });

  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    x.set((e.clientX - rect.left) / width);
    y.set((e.clientY - rect.top) / height);

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  const brand = brandBorders[company] || defaultBrand;

  return (
    <a
      href={pdfPath}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative mt-8 pt-1 group w-full h-[380px] outline-none"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className="w-full h-full relative"
      >
        {/* Layer 1: Folder Back Panel */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[330px] rounded-b-2xl rounded-tr-2xl bg-neutral-950 border transition-all duration-500 z-0 ${
            isHovered ? brand.borderHover : brand.border
          }`}
          style={{
            transform: "translateZ(0px)",
            boxShadow: isHovered
              ? `0 20px 50px -10px ${brand.glowHover}`
              : `0 10px 30px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Top Folder Tab */}
          <div
            className={`absolute -top-[30px] left-0 h-[30px] px-5 bg-neutral-950 border-t border-x rounded-t-xl flex items-center gap-2.5 transition-all duration-500 ${
              isHovered ? brand.borderHover : brand.border
            }`}
          >
            <Building size={13} className={`transition-colors duration-500 ${isHovered ? brand.text : "text-neutral-500"}`} />
            <span className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-neutral-300">
              {company}
            </span>
          </div>
        </div>

        {/* Layer 2: Inner Document Sheet */}
        <motion.div
          animate={{
            y: isHovered ? -45 : 10,
            scale: isHovered ? 1.02 : 0.96,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="absolute left-[3%] w-[94%] h-[310px] bg-[#1a1a1a] border border-white/10 rounded-xl p-6 z-10 flex flex-col justify-between shadow-2xl"
          style={{ transform: "translateZ(8px)" }}
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-medium tracking-[0.2em] text-neutral-400 uppercase">
              Resource // PDF Guide
            </span>
            <div className="w-full h-px bg-white/5 mt-3 mb-4" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
            <FileText size={32} strokeWidth={1.5} className={`mb-4 ${brand.text} opacity-80`} />
            <h3 className="text-lg font-display font-semibold text-white tracking-tight mb-2">
              {company} Interview Kit
            </h3>
            <p className="text-[13px] font-body text-neutral-400 font-normal leading-relaxed max-w-[240px]">
              Click to view the full PDF containing coding challenges and HR strategies.
            </p>
          </div>

          <Magnet className="w-full" magnetStrength={0.1}>
            <div
              className={`flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-xs font-mono font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 backdrop-blur-sm ${brand.borderBtn} ${brand.bgBtn} hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
            >
              <Download size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              Download Guide
            </div>
          </Magnet>
        </motion.div>

        {/* Layer 3: Folder Front Cover */}
        <motion.div
          animate={{
            rotateX: isHovered ? -20 : -2,
            y: isHovered ? 15 : 0,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
            transform: "translateZ(16px)",
          }}
          className={`absolute bottom-0 left-0 w-full h-[330px] rounded-b-2xl rounded-tr-2xl bg-[#111] border p-6 flex flex-col justify-between overflow-hidden z-20 transition-colors duration-500 ${
            isHovered ? brand.borderHover : brand.border
          }`}
        >
          {/* Spotlight Cursor */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${brand.glowHover}, transparent 80%)`,
            }}
          />

          {/* Subdued Watermark Letter */}
          <div
            className={`absolute -bottom-4 -right-4 text-[180px] font-display font-semibold select-none pointer-events-none transition-all duration-700 ease-out leading-none z-0 ${
              isHovered ? `${brand.text} opacity-[0.07] scale-105` : "text-white opacity-[0.02]"
            }`}
          >
            {meta.initial}
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col justify-between h-full w-full" style={{ transform: "translateZ(10px)" }}>

            <div className="flex justify-between items-start w-full">
              <h2 className="text-3xl font-display font-semibold italic tracking-tight bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent pb-1 pr-3">
                {company}
              </h2>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md mt-1">
                <FileText size={12} className={brand.text} />
                <span className="text-[11px] font-mono font-medium tracking-wide">
                  {count} {count === 1 ? "Exp" : "Exps"}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-end flex-1 mt-6">
              <p className="text-[13px] font-body text-neutral-300 leading-relaxed font-normal mb-6 pr-2">
                Complete preparation guide containing online assessments, technical rounds, and interview experiences.
              </p>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users size={12} className={brand.text} />
                  <span className="text-[10px] font-mono font-medium tracking-[0.15em] uppercase text-neutral-400">
                    Contributors
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contributors.map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-body text-neutral-200 font-medium transition-colors hover:bg-white/10"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full pt-4 mt-5 border-t border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-mono font-medium text-neutral-500 tracking-[0.15em] uppercase">
                Placement Resource
              </span>
              <span className="text-[10px] font-mono font-medium text-neutral-400 tracking-[0.15em] uppercase group-hover:text-white transition-colors duration-300">
                Click to open PDF
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </a>
  );
}
