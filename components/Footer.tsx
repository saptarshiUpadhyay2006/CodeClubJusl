import Link from "next/link";
import Image from "next/image";
import React from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/teams", label: "Teams" },
  { href: "/alumni", label: "Alumni" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/company/codeclub-jusl/", label: "LinkedIn" },
  { href: "https://youtube.com/@codeclubjusl", label: "YouTube" },
  { href: "https://www.instagram.com/jusl_codeclub", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto w-11/12 max-w-7xl py-8 sm:py-10">

        {/* Top row: Branding + Links */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Branding — left */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/">
              <Image
                src="/images/Secondary-Main-Light.png"
                alt="CodeClub JUSL Logo"
                width={120}
                height={120}
                className="h-auto w-24"
              />
            </Link>
            <h2 className="text-base font-semibold">
              <span className="text-white">Code</span>
              <span className="text-[#ed1b58]">Club</span>
              <span className="text-white"> JUSL</span>
            </h2>
            <p className="max-w-[220px] text-center text-[11px] leading-relaxed text-white/40 sm:text-left">
              The official coding club of Jadavpur University, Salt Lake Campus.
            </p>
          </div>

          {/* Quick Links + Connect — right side, side by side */}
          <div className="flex justify-center gap-12 sm:gap-16">

            {/* Quick Links — left-aligned */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-1.5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[11px] uppercase tracking-wide text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect — right-aligned */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
                Connect
              </h3>
              <nav className="flex flex-col gap-1.5">
                {socialLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className="text-[11px] uppercase tracking-wide text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="mailto:codeclubjusl@gmail.com"
                  className="text-[11px] tracking-wide text-white/50 transition-colors hover:text-white"
                >
                  codeclubjusl@gmail.com
                </Link>
              </nav>
            </div>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <p className="py-3 text-center text-[10px] uppercase tracking-wider text-white/30">
          &copy; {new Date().getFullYear()} CodeClub JUSL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
