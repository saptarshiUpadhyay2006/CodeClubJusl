"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import EventRibbon from "./EventRibbon";
import type { EventItem } from "@/data/events";

interface EventCardProps {
  event: EventItem;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group flex flex-col h-full rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-red-400/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-red-400/5"
    >
      {/* Poster (edge to edge at top) */}
      <div className="relative aspect-square w-full overflow-hidden transition-all duration-300">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Ribbon on left edge */}
        <EventRibbon text={event.ribbonText} />
      </div>

      {/* Text Container */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-red-400 sm:text-2xl">
          {event.title}
        </h3>

        {/* Description — only shown when present */}
        {event.description && (
          <p className="mt-4 text-sm leading-relaxed text-white/60 whitespace-normal break-words">
            {event.description}
          </p>
        )}

        {/* Extra bottom spacing inside the card */}
        <div className="mt-auto pt-4" />
      </div>
    </motion.div>
  );
}
