"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import EventCard from "@/components/Events/EventCard";
import { flagshipEvents } from "@/data/events";

export default function FeaturedEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Show up to 3 flagship events as a preview on the home page
  const preview = flagshipEvents.slice(0, 3);

  return (
    <section ref={sectionRef} id="events" className="w-full bg-black py-14 sm:py-20 lg:py-28">
      <div className="mx-auto w-11/12 max-w-7xl">
        <SectionHeading className="mb-8 sm:mb-12 lg:mb-16">Events</SectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-12">
            {preview.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/events"
            className="border border-red-400/60 px-6 py-3 text-sm uppercase tracking-wider text-red-400 transition-all duration-300 hover:bg-red-400 hover:text-black"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
