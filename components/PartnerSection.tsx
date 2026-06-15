"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PartnerCard from "./PartnerCard";
import type { Partner } from "@/data/partners";

interface PartnerSectionProps {
  title: string;
  partners: Partner[];
}

export default function PartnerSection({ title, partners }: PartnerSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="w-full py-10 sm:py-16 md:py-24">
      <SectionHeading className="mb-12 sm:mb-16">{title}</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto w-11/12 max-w-7xl flex flex-wrap justify-center items-center gap-6 sm:gap-8"
      >
        {partners.map((partner, index) => (
          <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </motion.div>
    </div>
  );
}
