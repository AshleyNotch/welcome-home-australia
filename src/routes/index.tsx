import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, ShieldCheck, ScrollText, Compass, Quote } from "lucide-react";
import heroImg from "@/assets/hero-sydney.jpg";
import aboutImg from "@/assets/about-clients.jpg";
import ctaImg from "@/assets/cta-bg.jpg";
import logoImg from "@/assets/logo.png";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/")({
  component: Index,
});

const listed = services.filter((s) => s.slug !== "initial-consultations");

// First 5 shown as pills on the hero left panel; the rest counted as "+N"
const heroTags = listed.slice(0, 5);
const remainingCount = listed.length - heroTags.length;

const heroNav = [
  { to: "/services" as const, label: "Services" },
  { to: "/about" as const, label: "About Us" },
  { to: "/client-stories" as const, label: "Client Stories" },
  { to: "/contact" as const, label: "Contact Us" },
];

const stats = [
  { value: "10+", label: "Years of migration practice" },
  { value: "10K+", label: "Cases reviewed & guided" },
  { value: "98%", label: "Client satisfaction" },
  { value: "11", label: "Visa specialisations" },
];

const testimonials = [
  {
    name: "Themiya Wickramage",
    role: "Skilled Migration · 189",
    quote:
      "I was sceptical about my visa process, but the team's expertise quickly dispelled every doubt. Meticulous planning, calm execution — my visa was approved without disruption.",
  },
  {
    name: "Bhagya Senatilake",
    role: "Partner Visa · 820",
    quote:
      "Exceptional support for a complex case. Every concern was addressed promptly and professionally. What could have been stressful became completely seamless.",
  },
  {
    name: "Ahen Wanigasekara",
    role: "Employer Sponsored · 482",
    quote:
      "Master Guides Australia handled my case with precision and efficiency. They were responsive at every step and made the process unusually easy.",
  },
];

function scrollDown() {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}

function Index() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-svh overflow-hidden">

        {/* MOBILE: traditional full-bleed hero (hidden md+) */}
        <div className="relative h-full md:hidden">
          <img
            src={heroImg}
            alt="Sydney Harbour at golden hour"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
          <div className="relative flex h-full flex-col justify-end px-6 pb-14">
            <div className="mb-6 flex flex-col gap-2">
              {heroTags.map((t, i) => (
                <Link
                  key={t.slug}
                  to="/services"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-background/40 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-background"
                >
                  {t.title}
                  {i === heroTags.length - 1 && (
                    <span className="text-background/50">+{remainingCount}</span>
                  )}
                </Link>
              ))}
            </div>
            <h1 className="font-display text-5xl font-light leading-[1.04] text-background">
              Your guide<br />to Australia.
            </h1>
            <p className="mt-4 max-w-sm text-background/75">
              Strategic, lawful migration guidance for every Australian visa pathway — protecting what matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-foreground"
              >
                Book a Free Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP: split-screen hero (hidden below md) */}
        <div className="hidden h-full md:flex">

          {/* LEFT PANEL — white, logo + description + service tags */}
          <div className="flex w-[38%] shrink-0 flex-col justify-between bg-background px-12 py-10 xl:px-16 xl:py-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="Master Guide Australia" className="h-12 w-12 object-contain" />
              <span className="leading-tight">
                <span className="block text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-satoshi)" }}>Masterguides Australia</span>
                <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                  Migration & Visa
                </span>
              </span>
            </Link>

            {/* Description */}
            <p className="max-w-xs text-base leading-relaxed text-foreground/65">
              Masterguides Australia is your trusted migration partner. Expert guidance for student, partner, skilled and employer-sponsored visas, appeals, and permanent residency pathways.
            </p>

            {/* Service pills + View All — flex-wrap, fixed height, hug width */}
            <div className="flex flex-wrap gap-2">
              {heroTags.map((t) => (
                <Link
                  key={t.slug}
                  to="/services"
                  className="inline-flex h-11 items-center whitespace-nowrap rounded-full border border-foreground/20 px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {t.title}
                </Link>
              ))}
              <Link
                to="/services"
                className="inline-flex h-11 items-center whitespace-nowrap rounded-full border border-foreground/15 px-5 text-[0.68rem] font-bold tracking-[0.1em] text-foreground/40 transition-all hover:border-foreground hover:bg-foreground hover:text-background"
              >
                +{remainingCount}
              </Link>
              <Link
                to="/services"
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:bg-foreground hover:text-background"
              >
                View All
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT PANEL — full-bleed image, nav overlay, large headline */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src={heroImg}
              alt="Sydney Harbour at golden hour"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-foreground/30" />

            {/* Integrated nav */}
            <nav className="absolute left-0 right-0 top-0 flex items-center justify-between px-10 py-8">
              <div className="flex items-center gap-8">
                {heroNav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="text-sm font-medium text-background/80 transition-colors hover:text-background"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
              <Link
                to="/contact"
                className="flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-85"
              >
                Book a Call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>

            {/* Large headline at bottom */}
            <div className="absolute bottom-0 left-0 px-10 pb-12 xl:px-14 xl:pb-16">
              <h1 className="font-display text-[4.5rem] font-light leading-[1.02] text-background xl:text-[5.5rem]">
                Your guide<br />to Australia.
              </h1>
            </div>

            {/* Scroll down */}
            <button
              onClick={scrollDown}
              aria-label="Scroll down"
              className="absolute bottom-12 right-10 grid h-10 w-10 place-items-center rounded-full border border-background/40 text-background/70 transition-colors hover:border-background hover:text-background"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="border-b border-border bg-background">
        <div className="container-prose">
          <dl className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-8 py-10">
                <dt className="font-display text-3xl text-brass">{s.value}</dt>
                <dd className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── FOUNDATION / INTRO ───────────────────────────────── */}
      <section className="bg-background">
        <div className="container-prose grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <p className="eyebrow">Our Foundation</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              Integrity, accuracy & <em className="text-brass-deep">long-term outcomes</em>.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/80">
              Masterguides Australia is a migration and visa consultancy focused on lawful, accurate and durable migration solutions. We act as strategic advisors — not agents — helping clients understand obligations, protect eligibility and avoid the costly mistakes that lead to refusal.
            </p>
            <p className="mt-6 text-foreground/70">
              From early-stage planning to compliance reviews and refusal-risk assessment, our work is designed to protect your future in Australia.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="rounded-sm border border-border px-3 py-1.5">MARA Aware</span>
              <span className="rounded-sm border border-border px-3 py-1.5">MIA Member</span>
              <span className="rounded-sm border border-border px-3 py-1.5">Compliance Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW WE HELP ──────────────────────────────────────── */}
      <section className="bg-secondary">
        <div className="container-prose py-24 md:py-32">
          <div className="max-w-xl">
            <p className="eyebrow">How We Can Help</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              Ten visa specialisations, one trusted team.
            </h2>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            {listed.map((s, i) => (
              <Link
                key={s.slug}
                to="/services"
                className="group relative flex flex-col gap-6 bg-background p-8 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="h-5 w-5 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium">{s.title}</h3>
                  {s.subclass && (
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brass-deep">{s.subclass}</p>
                  )}
                  <p className="mt-3 text-sm text-foreground/70">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ───────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container-prose grid gap-16 py-24 md:grid-cols-2 md:py-32">
          <div>
            <img
              src={aboutImg}
              alt="Clients celebrating successful Australian visa outcomes"
              loading="lazy"
              width={1280}
              height={1280}
              className="h-full w-full rounded-sm object-cover grayscale"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Why Masterguides</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              We prioritise what matters to our clients.
            </h2>
            <p className="mt-6 text-lg text-foreground/70">
              Our approach is calm, transparent and education-driven — helping you make informed decisions without pressure or false promises.
            </p>

            <ul className="mt-10 space-y-6">
              {[
                { icon: ShieldCheck, title: "Compliance first", body: "Every case is built to withstand scrutiny under current migration law." },
                { icon: Compass, title: "Strategic clarity", body: "We map your visa pathway from day one, not application day." },
                { icon: ScrollText, title: "Documented outcomes", body: "Detailed reviews protect eligibility and prevent future risk." },
              ].map((f) => (
                <li key={f.title} className="flex gap-5 border-t border-border pt-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-foreground text-background">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium">{f.title}</h3>
                    <p className="mt-1 text-foreground/70">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-foreground text-background">
        <div className="container-prose py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">Praise</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              What clients say about our guidance.
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex h-full flex-col gap-6 border border-background/15 p-8">
                <Quote className="h-7 w-7 text-accent" />
                <blockquote className="text-base leading-relaxed text-background/85">"{t.quote}"</blockquote>
                <figcaption className="mt-auto border-t border-background/15 pt-5">
                  <div className="font-display text-lg">{t.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-background/60">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <img
          src={ctaImg}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/85" />
        <div className="relative container-prose grid gap-10 py-24 md:grid-cols-2 md:items-center md:py-32">
          <h2 className="font-display text-4xl font-light leading-tight text-background md:text-5xl">
            Let's review your case <em className="text-accent">before</em> it becomes a refusal.
          </h2>
          <div>
            <p className="text-lg text-background/80">
              Book a confidential consultation. We'll assess eligibility, identify risks, and outline your strongest pathway under current migration law.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-4 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
            >
              Book a Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
