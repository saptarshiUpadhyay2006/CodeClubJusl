"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { interviewGuides } from "@/data/guides";
import {
  Search,
  FileText,
  Briefcase,
  Download,
  Building,
  Users,
  X
} from "lucide-react";
import Footer from "@/components/Footer";
import { FEATURES } from "@/config/features";
import NotFound from "@/components/NotFound";

// Brand-specific metadata for dynamic, premium styling
const companyMetadata: Record<string, {
  color: string;
  bgGlow: string;
  gradientLine: string;
  buttonClass: string;
  initial: string;
}> = {
  "Google": {
    color: "text-blue-400",
    bgGlow: "rgba(96, 165, 250, 0.12)",
    gradientLine: "from-blue-400/50 via-blue-500/50 to-transparent",
    buttonClass: "border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10",
    initial: "G"
  },
  "D.E. Shaw": {
    color: "text-rose-500",
    bgGlow: "rgba(244, 63, 94, 0.12)",
    gradientLine: "from-rose-400/50 via-rose-500/50 to-transparent",
    buttonClass: "border-rose-500/30 hover:border-rose-400 hover:bg-rose-500/10",
    initial: "D"
  },
  "JPMC": {
    color: "text-amber-400",
    bgGlow: "rgba(251, 191, 36, 0.12)",
    gradientLine: "from-amber-400/50 via-amber-500/50 to-transparent",
    buttonClass: "border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10",
    initial: "J"
  },
  "Salesforce": {
    color: "text-cyan-400",
    bgGlow: "rgba(34, 211, 238, 0.15)",
    gradientLine: "from-cyan-400/50 via-cyan-500/50 to-transparent",
    buttonClass: "border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10",
    initial: "S"
  },
  "Sprinklr": {
    color: "text-orange-500",
    bgGlow: "rgba(249, 115, 22, 0.12)",
    gradientLine: "from-orange-400/50 via-orange-500/50 to-transparent",
    buttonClass: "border-orange-500/30 hover:border-orange-400 hover:bg-orange-500/10",
    initial: "S"
  },
  "Visa": {
    color: "text-indigo-400",
    bgGlow: "rgba(129, 140, 248, 0.12)",
    gradientLine: "from-indigo-400/50 via-indigo-500/50 to-transparent",
    buttonClass: "border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-500/10",
    initial: "V"
  },
  "Wells Fargo": {
    color: "text-emerald-400",
    bgGlow: "rgba(52, 211, 153, 0.12)",
    gradientLine: "from-emerald-400/50 via-emerald-500/50 to-transparent",
    buttonClass: "border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10",
    initial: "W"
  }
};

const defaultMeta = {
  color: "text-red-500",
  bgGlow: "rgba(239, 68, 68, 0.12)",
  gradientLine: "from-red-400/50 via-red-500/50 to-transparent",
  buttonClass: "border-red-500/30 hover:border-red-500 hover:bg-red-500/10",
  initial: "C"
};

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const companyGuides = useMemo(() => {
    const map = new Map<string, { pdfPath: string; count: number; contributors: string[] }>();
    interviewGuides.forEach((guide) => {
      const existing = map.get(guide.company);
      const name = guide.candidateName;
      if (existing) {
        existing.count += 1;
        if (!existing.contributors.includes(name)) existing.contributors.push(name);
      } else {
        map.set(guide.company, { pdfPath: guide.pdfPath, count: 1, contributors: [name] });
      }
    });
    return Array.from(map.entries()).map(([company, data]) => ({ company, ...data }));
  }, []);

  const filteredCompanyGuides = useMemo(() => {
    return companyGuides.filter((guide) =>
      guide.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companyGuides, searchQuery]);

  if (!FEATURES.enableGuides) return <NotFound />;

  return (
    <div className="min-h-screen bg-black text-[#ededed] font-jetbrains-mono selection:bg-red-500/30 selection:text-red-200">
      {/* Subtle Grid Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-red-900/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl pt-12 pb-24">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center pb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-6 backdrop-blur-md cursor-default"
          >
            <Briefcase size={14} className="text-red-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80">Ace Your Placement & Internships</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Guides</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50"
          >
            Download official, compiled company interview guides. Read about preparation strategies, online assessment questions, and technical/HR round experiences shared by your seniors.
          </motion.div>
        </div>

        {/* Filters & Search Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 mb-10 gap-4">
          <h2 className="text-lg font-semibold uppercase tracking-wider text-white">
            Available Guides ({filteredCompanyGuides.length})
          </h2>

          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-2.5 text-sm bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Guides Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCompanyGuides.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCompanyGuides.map((guide, idx) => {
                const meta = companyMetadata[guide.company] || defaultMeta;

                return (
                  <motion.div
                    layout
                    key={guide.company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    style={{ "--card-glow": meta.bgGlow } as React.CSSProperties}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_12px_40px_var(--card-glow)] z-10 hover:z-20"
                  >
                    {/* Top Accent Line */}
                    <div className={`absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r ${meta.gradientLine} opacity-40 transition-opacity duration-500 group-hover:opacity-100`} />
                    
                    {/* Background Watermark Letter */}
                    <div 
                      className="absolute -bottom-8 -right-4 text-[180px] font-black select-none pointer-events-none opacity-[0.02] group-hover:opacity-[0.04] group-hover:scale-105 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-700 ease-out leading-none"
                    >
                      {meta.initial}
                    </div>

                    <div className="relative z-10">
                      {/* Header Elements */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.03] border border-white/5">
                          <Building size={14} className={meta.color} />
                          <span className="text-xs font-bold tracking-widest uppercase text-white">{guide.company}</span>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.03] border border-white/5 text-white/70">
                          <FileText size={12} className={meta.color} />
                          <span className="text-[10px] font-bold tracking-widest uppercase">{guide.count} Exp</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-white/50 mb-6 min-h-[50px] group-hover:text-white/70 transition-colors duration-300 pr-4">
                        Complete preparation guide compiled from real technical interviews, coding challenges, and HR rounds.
                      </p>

                      {/* Contributors */}
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Users size={12} className={meta.color} />
                          <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Seniors Interviewed</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {guide.contributors.map((name) => (
                            <span 
                              key={name} 
                              className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-[11px] text-white/50 font-medium transition-colors hover:bg-white/[0.08] hover:text-white cursor-default"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="mt-8 pt-5 border-t border-white/5 relative z-10">
                      <a
                        href={guide.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl border bg-white/[0.02] py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 ${meta.buttonClass}`}
                      >
                        <Download size={16} className={`transition-transform duration-300 group-hover/btn:translate-y-0.5 ${meta.color}`} />
                        Download PDF Guide
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
            >
              <FileText size={48} className="mx-auto text-white/10 mb-4" />
              <h3 className="text-lg font-semibold tracking-wide text-white/80">No Guides Found</h3>
              <p className="text-sm text-white/40 mt-1 font-light">Try searching for a different company name.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <Footer />
    </div>
  );
}
