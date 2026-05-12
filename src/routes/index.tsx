import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-sydney.jpg";
import logoImg from "@/assets/logo.png";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/")({
  component: Index,
});

const listed = services.filter((s) => s.slug !== "initial-consultations");

const heroTags = listed.slice(0, 5);
const remainingCount = listed.length - heroTags.length;

const heroNav = [
  { to: "/services" as const, label: "Services" },
  { to: "/about" as const, label: "About Us" },
  { to: "/client-stories" as const, label: "Client Stories" },
  { to: "/contact" as const, label: "Contact Us" },
];

const statsData = [
  { end: 10,  format: (n: number) => `${n}K+`, label: "Cases reviewed & guided" },
  { end: 10,  format: (n: number) => `${n}+`,  label: "Years of experience" },
  { end: 98,  format: (n: number) => `${n}%`,  label: "Client satisfaction" },
];

// Circle sizes per breakpoint (diameter):
//   Desktop  ≥1024px : 360px  → 3×360 + 2×60 spacers = 1,200px max-width
//   Tablet    ≥640px : 200px  → fits within screen
//   Mobile    <640px : stacked, no circles

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / 1500, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCounts(statsData.map((s) => Math.round(eased * s.end)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);

  return (
    <section ref={ref} className="bg-background py-12 px-[50px]">
      {/* Hard cap at 1200px — circles + dots never exceed this */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Desktop & Tablet: horizontal row ── */}
        {/* relative container so dots can be positioned at exact junction points */}
        <div className="relative hidden items-center justify-between sm:flex sm:h-[200px] lg:h-[360px]">

          {/* LEFT — bottom semicircle stroke only */}
          <div className="relative shrink-0 h-[200px] w-[200px] lg:h-[360px] lg:w-[360px]">
            <div
              className="absolute inset-0 rounded-full border border-foreground/20"
              style={{ clipPath: "inset(50% 0 0 0)" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-4xl font-bold tracking-tight text-foreground lg:text-7xl">
                {statsData[0].format(counts[0])}
              </span>
              <span className="text-xs text-foreground/50 lg:text-sm">{statsData[0].label}</span>
            </div>
          </div>

          {/* CENTRE — full circle */}
          <div className="relative shrink-0 h-[200px] w-[200px] lg:h-[360px] lg:w-[360px]">
            <div className="absolute inset-0 rounded-full border border-foreground/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-4xl font-bold tracking-tight text-foreground lg:text-7xl">
                {statsData[1].format(counts[1])}
              </span>
              <span className="text-xs text-foreground/50 lg:text-sm">{statsData[1].label}</span>
            </div>
          </div>

          {/* RIGHT — top semicircle stroke only */}
          <div className="relative shrink-0 h-[200px] w-[200px] lg:h-[360px] lg:w-[360px]">
            <div
              className="absolute inset-0 rounded-full border border-foreground/20"
              style={{ clipPath: "inset(0 0 50% 0)" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-4xl font-bold tracking-tight text-foreground lg:text-7xl">
                {statsData[2].format(counts[2])}
              </span>
              <span className="text-xs text-foreground/50 lg:text-sm">{statsData[2].label}</span>
            </div>
          </div>

          {/* Dot 1 — at junction of left and centre circles, vertically centred */}
          <span className="absolute left-1/3 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/25 lg:h-3 lg:w-3" />
          {/* Dot 2 — at junction of centre and right circles */}
          <span className="absolute left-2/3 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/25 lg:h-3 lg:w-3" />

        </div>

        {/* ── Mobile: stacked, no circles ── */}
        <div className="flex flex-col items-center gap-10 sm:hidden">
          {statsData.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <span className="text-6xl font-bold tracking-tight text-foreground">
                {s.format(counts[i])}
              </span>
              <span className="text-sm text-foreground/50">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const missionWords =
  "We make migration accessible, clear and lawful. Masterguides Australia helps individuals and businesses navigate Australia's complex visa system — using deep expertise, strategic planning, and a personalised approach to protect your eligibility and secure your confidence in a future here.".split(
    " "
  );

function MissionText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (vh - top) / (vh + height))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <p ref={ref} className="text-[28px] font-bold leading-snug tracking-tight md:text-[32px] lg:text-[44px]">
      {missionWords.map((word, i) => {
        const threshold = i / missionWords.length;
        const lit = Math.max(0, Math.min(1, (progress * 1.4 - threshold) / 0.25));
        const opacity = 0.15 + lit * 0.85;
        return (
          <span key={i} style={{ opacity }}>
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

function scrollDown() {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}

function Index() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-svh overflow-hidden bg-background">

        <div className="animate-hero-card-in absolute inset-0 hidden md:block">
          <img
            src={heroImg}
            alt="Sydney Harbour at golden hour"
            className="animate-hero-pan h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-foreground/30" />
        </div>

        {/* MOBILE */}
        <div className="relative h-full md:hidden">
          <img src={heroImg} alt="Sydney Harbour at golden hour" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
          <div className="relative flex h-full flex-col justify-end px-6 pb-14">
            <div className="mb-6 flex flex-col gap-2">
              {heroTags.map((t, i) => (
                <Link key={t.slug} to="/services"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-background/40 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-background">
                  {t.title}
                  {i === heroTags.length - 1 && <span className="text-background/50">+{remainingCount}</span>}
                </Link>
              ))}
            </div>
            <h1 className="font-display text-5xl font-light leading-[1.04] text-background">
              Your Guide<br />to Australia.
            </h1>
            <p className="mt-4 max-w-sm text-background/75">
              Strategic, lawful migration guidance for every Australian visa pathway — protecting what matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-foreground">
                Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden h-full overflow-hidden md:flex">

          <div className="flex w-[38%] shrink-0 flex-col bg-background px-12 xl:px-16">
            <div className="flex h-[5.5rem] shrink-0 items-center">
              <Link to="/" className="animate-hero-logo flex items-center gap-3">
                <img src={logoImg} alt="Master Guide Australia" className="h-12 w-12 object-contain" />
                <span className="leading-tight">
                  <span className="block text-lg font-semibold text-foreground">Masterguides Australia</span>
                  <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">Migration & Visa</span>
                </span>
              </Link>
            </div>

            <div className="flex flex-1 flex-col justify-between py-12 xl:py-16">
              <p className="animate-hero-desc max-w-xs text-base leading-relaxed text-foreground/65">
                Masterguides Australia is your trusted migration partner. Expert guidance for student, partner, skilled and employer-sponsored visas, appeals, and permanent residency pathways.
              </p>

              <div className="flex flex-wrap gap-2">
                {heroTags.map((t, i) => (
                  <Link key={t.slug} to="/services"
                    className="animate-hero-pill inline-flex h-11 items-center whitespace-nowrap rounded-full border border-foreground/20 px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                    style={{ animationDelay: `${3.0 + i * 0.1}s` }}>
                    {t.title}
                  </Link>
                ))}
                <Link to="/services"
                  className="animate-hero-pill inline-flex h-11 items-center whitespace-nowrap rounded-full border border-foreground/15 px-5 text-[0.68rem] font-bold tracking-[0.1em] text-foreground/40 transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                  style={{ animationDelay: `${3.0 + heroTags.length * 0.1}s` }}>
                  +{remainingCount}
                </Link>
                <Link to="/services"
                  className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:bg-foreground hover:text-background"
                  style={{
                    animation: `hero-pill-in 0.55s cubic-bezier(0.4,0,0.2,1) ${3.0 + (heroTags.length + 1) * 0.1}s both, hero-bounce 0.8s cubic-bezier(0.4,0,0.2,1) ${3.0 + (heroTags.length + 1) * 0.1 + 0.65}s both`,
                  }}>
                  View All <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative flex-1">
            <nav className="animate-hero-nav absolute left-0 right-0 top-0 flex items-center justify-between px-[50px] pt-[30px] pb-[15px]">
              <div className="flex items-center gap-[15px]">
                {heroNav.map((n) => (
                  <Link key={n.to} to={n.to}
                    className="text-sm font-medium text-background/80 transition-colors hover:text-background">
                    {n.label}
                  </Link>
                ))}
              </div>
              <Link to="/contact"
                className="animate-hero-cta my-6 flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-85">
                Book a Call
                <span className="inline-block" style={{ animation: "hero-icon-spin 0.6s cubic-bezier(0.4,0,0.2,1) 2.8s both" }}>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </nav>

            <div className="absolute bottom-0 left-0 px-10 pb-12 xl:px-14 xl:pb-16">
              <h1 className="animate-hero-headline font-display text-[4.5rem] font-bold leading-[1.02] text-background xl:text-[5.5rem]">
                Your Guide<br />to Australia.
              </h1>
            </div>

            <button onClick={scrollDown} aria-label="Scroll down"
              className="absolute bottom-[50px] right-[60px] grid h-10 w-10 place-items-center rounded-full border border-background/40 text-background/70 transition-colors hover:border-background hover:text-background">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

        </div>
      </section>

      {/* ─── MISSION ──────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="px-[50px] py-10">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-foreground">Our Mission</span>
            <Link to="/about"
              className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:bg-foreground hover:text-background">
              Read More <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-5 border-t border-border" />

          <div className="mt-16 md:ml-[28%]">
            <MissionText />
          </div>
        </div>
      </section>

      <StatsSection />

    </>
  );
}
