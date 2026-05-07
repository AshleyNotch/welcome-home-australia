export type Service = {
  slug: string;
  title: string;
  subclass?: string;
  short: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "student-visa",
    title: "Student Visas",
    subclass: "Subclass 500",
    short: "Clear, compliant guidance from course selection through visa lodgement.",
    bullets: ["Course suitability review", "Financial verification", "GTE statement strategy"],
  },
  {
    slug: "partner-visa",
    title: "Partner Visas",
    subclass: "Subclass 820 / 309",
    short: "Expert support with relationship evidence and the pathway to permanent residency.",
    bullets: ["Relationship proof", "Document checklists", "PR strategy"],
  },
  {
    slug: "skilled-migration",
    title: "Skilled Migration",
    subclass: "189 / 190 / 491",
    short: "Strategic, points-tested advice for regional or permanent residency outcomes.",
    bullets: ["Points optimisation", "Skills assessment", "State nomination"],
  },
  {
    slug: "employer-sponsored",
    title: "Employer Sponsored",
    subclass: "482 / 186",
    short: "End-to-end support for sponsorship, nomination and visa applications.",
    bullets: ["Sponsor approval", "Position mapping", "Nomination strategy"],
  },
  {
    slug: "visitor-visas",
    title: "Visitor Visas",
    subclass: "Subclass 600",
    short: "Reliable guidance for holiday, business or family visit visas.",
    bullets: ["GTE assessment", "Document preparation", "Stay extensions"],
  },
  {
    slug: "aat-appeals",
    title: "AAT Appeals",
    short: "Evidence-based representation to challenge refusals and cancellations.",
    bullets: ["Case assessment", "Evidence filing", "Hearing preparation"],
  },
  {
    slug: "temporary-graduate",
    title: "Temporary Graduate",
    subclass: "Subclass 485",
    short: "Bridge from study to work with confident, fast-tracked advice.",
    bullets: ["Eligibility check", "Document preparation", "Fast lodgement"],
  },
  {
    slug: "parent-visas",
    title: "Parent Visas",
    short: "Family reunion guidance through the right parent visa pathway.",
    bullets: ["Pathway options", "Family balance test", "Sponsor support"],
  },
  {
    slug: "citizenship",
    title: "Citizenship",
    short: "Complete support through residency audit, application and the citizenship test.",
    bullets: ["Residency audit", "Application lodgement", "Test preparation"],
  },
  {
    slug: "temporary-activity",
    title: "Temporary Activity",
    subclass: "Subclass 407",
    short: "Specialised support for workplace training and structured development plans.",
    bullets: ["Training plans", "Nominations", "Skill mapping"],
  },
  {
    slug: "initial-consultations",
    title: "Initial Consultations",
    short: "Personalised eligibility check and a clear roadmap for your visa journey.",
    bullets: ["Eligibility check", "Custom roadmap", "Fee transparency"],
  },
];
