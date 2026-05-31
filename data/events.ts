// ─── Event Data ───────────────────────────────────────────────────────────────
// To add or edit events, modify only this file.
// Images live in /public/images/events/

export type EventCategory = "exclusive" | "seasonal" | "flagship";

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  image: string;
  description?: string;
  ribbonText?: string;
}

export const events: EventItem[] = [
  // ── Exclusive Events (empty — Coming Soon) ──────────────────────────────────

  // ── Seasonal Events ─────────────────────────────────────────────────────────
  {
    id: "push-to-prod",
    title: "Push to Prod and Pray",
    category: "seasonal",
    image: "/images/events/push-to-prod.webp",
    description: "Introductory session on modern Web Development and Technologies. Focused towards beginners trying to learn and get into Full Stack Web Applications.",
    ribbonText: "Web Development"
  },
  {
    id: "include-cp",
    title: "#include<CP.h>",
    category: "seasonal",
    image: "/images/events/include-cp.webp",
    description: "Introductory session on Competetive Programming. Aims to introduce to the world of competitive programming and help beginners get started.",
    ribbonText: "Competetive Programming"
  },
  {
    id: "array-tricks",
    title: "Array Tricks",
    category: "seasonal",
    image: "/images/events/array-tricks.webp",
    description: "Event on Array tricks used for Competetive programming and Contests",
    ribbonText: "Competetive Programming"
  },
  {
    id: "sybau",
    title: "SYBAU",
    category: "seasonal",
    image: "/images/events/sybau.webp",
    description: "Introductory Event for the students to Machine Learning and Artificial Intelligence. Students learn about the growing field of Machine Learning and improve their understanding of AI",
    ribbonText: "Machine Learning & AI"
  },
  {
    id: "prarambh",
    title: "Prarambh",
    category: "seasonal",
    image: "/images/events/prarambh.webp",
    description: "Orientation of the First Year students into Code Club JUSL. Imparting them with technical knowledge and skills to get started with coding",
    ribbonText: "Orientation"
  },
  {
    id: "valentines",
    title: "Valentine's Coding Challenge",
    category: "seasonal",
    image: "/images/events/valentines-coding-challenge.webp",
    description: "A Coding Contests for those who prefer logic over love.",
    ribbonText: "Special Challenge"
  },

  // ── Flagship Events ─────────────────────────────────────────────────────────
  {
    id: "hackforge",
    title: "HackForge",
    category: "flagship",
    image: "/images/events/hackforge.webp",
    description: "Flagship of Srijan. A 24 hour hackathon aiming to solve real world problems using new and existing technologies to provide real solutions to them. Topics range from Blockchain, Web Development to Machine Learning and AI",
    ribbonText: "24 hour Hackathon"
  },
  {
    id: "h42",
    title: "h42",
    category: "flagship",
    image: "/images/events/h42.webp",
    description: "Flagship of Srijan. An ICPC style Competetive Programming Coding contest with team of 3 members each",
    ribbonText: "Competetive Programming"
  },
  {
    id: "ptb",
    title: "Pass the Baton",
    category: "flagship",
    image: "/images/events/pass-the-baton.webp",
    description: "Flagship of Srijan. A Relay Programming Contest where teams of 3 members each have to solve the problems in a relay format to score points.",
    ribbonText: "Competetive Programming"
  },
  {
    id: "sherlocked",
    title: "Sherlocked",
    category: "flagship",
    image: "/images/events/sherlocked.webp",
    description: "Flagship of Srijan. A Capture the Flag Contest where teams must uncover the mysteries by solving problems and puzzles. Puzzles may range from basic SQL to Cybersecurity fundamentals",
    ribbonText: "Capture the Flag"
  },
  {
    id: "epochalypse",
    title: "Epochalypse",
    category: "flagship",
    image: "/images/events/epochalypse.webp",
    description: "Flagship of Srijan. Build real world solutions using Machine Learning and Deep Learning approaches by training models to give the best possible outcomes to a persisent real world problem.",
    ribbonText: "Machine Learning"
  },
  {
    id: "snap-syntax",
    title: "Snap Syntax",
    category: "flagship",
    image: "/images/events/snap-syntax.webp",
    description: "Flagship of Srijan. In Collaboration with ACM Student Chapter JU. Make the best looking working design of a website in a fixed provided time",
    ribbonText: "Web Design and Development"
  },
];

// Helpers
export const exclusiveEvents = events.filter((e) => e.category === "exclusive");
export const seasonalEvents = events.filter((e) => e.category === "seasonal");
export const flagshipEvents = events.filter((e) => e.category === "flagship");
