import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useBookingModal } from "@/components/booking-modal";
import { InView } from "@/components/in-view";
import { PageHero } from "@/components/page-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { aboutTestimonials } from "@/lib/testimonials-data";
import heroImg from "@/assets/hero-sydney.jpg";
import consultationBannerImg from "@/assets/consultation-banner.webp";
import aboutImg from "@/assets/about-us.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Masterguides Australia" },
      { name: "description", content: "Strategic Australian migration advisors focused on lawful, accurate and long-term migration outcomes." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "10K+", label: "Cases reviewed & guided" },
  { value: "98%", label: "Client satisfaction" },
];

const process = [
  {
    n: "01",
    title: "Understand Your Situation",
    body: "We carefully assess your visa status, goals, and existing risks before recommending any course of action.",
  },
  {
    n: "02",
    title: "Clarify the Correct Pathway",
    body: "We explain every available option clearly — including legal implications, realistic timelines, and what to expect.",
  },
  {
    n: "03",
    title: "Develop a Responsible Strategy",
    body: "No assumptions. No shortcuts. Every strategy is built on compliance and designed to protect your long-term eligibility.",
  },
  {
    n: "04",
    title: "Ongoing Support & Review",
    body: "We stay with you through every stage — responding to departmental requests and keeping you aligned with requirements.",
  },
];

const principles = [
  {
    title: "Strategic, not transactional",
    body: "We act as advisors throughout your migration journey — from first conversation to outcome — not order-takers.",
  },
  {
    title: "Education before submission",
    body: "You will understand your obligations, options and risks before lodging anything. No pressure. No false promises.",
  },
  {
    title: "Accuracy over speed",
    body: "Migration law is unforgiving of small errors. Every file we touch is built to withstand departmental scrutiny.",
  },
  {
    title: "Discretion and care",
    body: "Sensitive personal and business matters are handled with the confidentiality they deserve.",
  },
];

function AboutPage() {
  const { openModal } = useBookingModal();

  return (
    <>
      <PageHero
        eyebrow="About Us"
        heading="Trusted migration guidance built on expertise."
        description="Masterguides Australia is a migration & visa consultancy delivering lawful, accurate and long-term solutions. We act as strategic advisors — not agents."
        image={aboutImg}
        imageAlt="Masterguides Australia"
        onCta={openModal}
      />

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="bg-background px-5 py-16 md:px-[50px] md:py-20">
        <InView>
          <p className="text-base font-bold text-foreground">By the numbers</p>
          <div className="mt-4 border-t border-border" />
        </InView>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((s, i) => (
            <InView key={s.label} delay={i * 80} y={14}>
              <div
                className="flex min-h-[180px] flex-col justify-between rounded-2xl bg-secondary p-8 md:p-10"
              >
                <span
                  className="font-display text-5xl font-bold md:text-6xl"
                  style={{ color: "#00417c" }}
                >
                  {s.value}
                </span>
                <p className="mt-4 text-sm text-foreground/60">{s.label}</p>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────── */}
      <section
        className="mx-3 overflow-hidden rounded-[14px] px-5 py-10 md:mx-[50px] md:px-[50px] md:py-16"
        style={{ backgroundColor: "#00417c" }}
      >
        <InView y={20}>
          <p className="text-base font-bold text-background">Our Process</p>
          <div className="mt-4 border-t border-background/15" />
        </InView>
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {process.map((p, i) => (
            <InView key={p.n} delay={i * 60} y={16}>
              <div
                className="flex min-h-[180px] flex-col justify-between rounded-2xl p-7"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-background/40">
                  {p.n}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-background">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-background/60">{p.body}</p>
                </div>
              </div>
            </InView>
          ))}
        </div>
        <InView delay={300} y={12} className="mt-8">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 rounded-full border border-background/30 px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-background transition-all hover:border-background hover:bg-background hover:text-foreground"
          >
            Start Your Journey <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </InView>
      </section>

      {/* ─── PRINCIPLES ───────────────────────────────────────── */}
      <section className="bg-background px-5 py-16 md:px-[50px] md:py-20">
        <InView>
          <p className="text-base font-bold text-foreground">How we work</p>
          <div className="mt-4 border-t border-border" />
        </InView>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p, i) => (
            <InView key={p.title} delay={i * 60} y={14}>
              <div className="flex min-h-[200px] flex-col justify-between rounded-2xl bg-secondary p-7">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">{p.body}</p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </section>

      <TestimonialsSection testimonials={aboutTestimonials} />

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="mx-3 mb-5 overflow-hidden rounded-[14px] md:mx-[50px]">
        <div className="relative">
          <img
            src={consultationBannerImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/65" />
          <div className="relative flex min-h-[300px] flex-col items-center justify-center px-6 py-16 text-center md:h-[340px] md:min-h-0">
            <InView y={20} className="w-full text-center">
              <h2 className="font-display text-4xl font-bold text-background md:text-5xl">
                Ready to start your case review?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-background/70">
                A short consultation is often all it takes to know whether your application is on safe ground.
              </p>
              <div className="mt-8">
                <button
                  onClick={openModal}
                  className="inline-flex items-center rounded-full bg-background pl-7 pr-2 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-90"
                >
                  Book a Free Consultation
                  <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </InView>
          </div>
        </div>
      </section>
    </>
  );
}
