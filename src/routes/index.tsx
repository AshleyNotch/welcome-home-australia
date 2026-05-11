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

const statsData = [
  { end: 10,  format: (n: number) => `${n}K+`, label: "Cases reviewed & guided" },
  { end: 10,  format: (n: number) => `${n}+`,  label: "Years of experience" },
  { end: 98,  format: (n: number) => `${n}%`,  label: "Client satisfaction" },
];

function StatCircle({
  end, format, label, active,
}: {
  end: number; format: (n: number) => string; label: string; active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1500;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, end]);

  return (
    <div className="flex h-[440px] w-[440px] shrink-0 flex-col items-center justify-center rounded-full border border-border/50">
      <span className="text-7xl font-bold tracking-tight text-foreground">{format(count)}</span>
      <span className="mt-4 text-sm text-foreground/50">{label}</span>
    </div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-background">
      <div className="flex items-center justify-center py-24">
        {statsData.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <StatCircle {...s} active={active} />
            {i < statsData.length - 1 && (
              <span className="shrink-0 px-2 text-lg text-foreground/25">•</span>
            )}
          </div>
        ))}
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
    <p ref={ref} className="text-3xl font-bold leading-snug tracking-tight md:text-4xl lg:text-5xl">
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

// First 5 shown as pills on the hero left panel; the rest counted as "+N"
const heroTags = listed.slice(0, 5);
const remainingCount = listed.length - heroTags.length;

const heroNav = [
  { to: "/services" as const, label: "Services" },
  { to: "/about" as const, label: "About Us" },
  { to: "/client-stories" as const, label: "Client Stories" },
  { to: "/contact" as const, label: "Contact Us" },
];


function scrollDown() {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}

function Index() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      {/* bg-background = ivory shows around the card during Phase 1 */}
      <section className="relative h-svh overflow-hidden bg-background">

        {/* Desktop: clip-path wrapper expands from centred card to full bleed */}
        <div className="animate-hero-card-in absolute inset-0 hidden md:block">
          <img
            src={heroImg}
            alt="Sydney Harbour at golden hour"
            className="animate-hero-pan h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-foreground/30" />
        </div>

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
              Your Guide<br />to Australia.
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
        <div className="hidden h-full overflow-hidden md:flex">

          {/* LEFT PANEL — Phase 2: slides in from the left */}
          <div className="animate-hero-panel flex w-[38%] shrink-0 flex-col bg-background px-12 xl:px-16">

            {/* Logo row — Phase 2: fades + rises */}
            <div className="flex h-[5.5rem] shrink-0 items-center">
              <Link to="/" className="animate-hero-logo flex items-center gap-3">
                <img src={logoImg} alt="Master Guide Australia" className="h-12 w-12 object-contain" />
                <span className="leading-tight">
                  <span className="block text-lg font-semibold text-foreground">Masterguides Australia</span>
                  <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                    Migration & Visa
                  </span>
                </span>
              </Link>
            </div>

            {/* Body — fills remaining height */}
            <div className="flex flex-1 flex-col justify-between py-12 xl:py-16">
              {/* Description — Phase 2 */}
              <p className="animate-hero-desc max-w-xs text-base leading-relaxed text-foreground/65">
                Masterguides Australia is your trusted migration partner. Expert guidance for student, partner, skilled and employer-sponsored visas, appeals, and permanent residency pathways.
              </p>

              {/* Phase 4: pills stagger in one by one */}
              <div className="flex flex-wrap gap-2">
                {heroTags.map((t, i) => (
                  <Link
                    key={t.slug}
                    to="/services"
                    className="animate-hero-pill inline-flex h-11 items-center whitespace-nowrap rounded-full border border-foreground/20 px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                    style={{ animationDelay: `${3.0 + i * 0.1}s` }}
                  >
                    {t.title}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="animate-hero-pill inline-flex h-11 items-center whitespace-nowrap rounded-full border border-foreground/15 px-5 text-[0.68rem] font-bold tracking-[0.1em] text-foreground/40 transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                  style={{ animationDelay: `${3.0 + heroTags.length * 0.1}s` }}
                >
                  +{remainingCount}
                </Link>
                {/* View All: entrance + micro-bounce after */}
                <Link
                  to="/services"
                  className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:bg-foreground hover:text-background"
                  style={{
                    animation: `hero-pill-in 0.55s cubic-bezier(0.4,0,0.2,1) ${3.0 + (heroTags.length + 1) * 0.1}s both, hero-bounce 0.8s cubic-bezier(0.4,0,0.2,1) ${3.0 + (heroTags.length + 1) * 0.1 + 0.65}s both`,
                  }}
                >
                  View All
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — transparent, image is behind at section level */}
          <div className="relative flex-1">

            {/* Phase 3: nav drops in from above */}
            <nav className="animate-hero-nav absolute left-0 right-0 top-0 flex items-center justify-between px-[50px] pt-[30px] pb-[15px]">
              <div className="flex items-center gap-[15px]">
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
                className="animate-hero-cta flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-85"
              >
                Book a Call
                <span
                  className="inline-block"
                  style={{ animation: "hero-icon-spin 0.6s cubic-bezier(0.4,0,0.2,1) 2.8s both" }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </nav>

            {/* Phase 3: headline masked slide up */}
            <div className="absolute bottom-0 left-0 px-10 pb-12 xl:px-14 xl:pb-16">
              <h1 className="animate-hero-headline font-display text-[4.5rem] font-bold leading-[1.02] text-background xl:text-[5.5rem]">
                Your Guide<br />to Australia.
              </h1>
            </div>

            {/* Scroll down */}
            <button
              onClick={scrollDown}
              aria-label="Scroll down"
              className="absolute bottom-[50px] right-[60px] grid h-10 w-10 place-items-center rounded-full border border-background/40 text-background/70 transition-colors hover:border-background hover:text-background"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── MISSION ──────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="px-[50px] py-20 md:py-28">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-foreground">Our Mission</span>
            <Link
              to="/about"
              className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:bg-foreground hover:text-background"
            >
              Read More
              <ArrowUpRight className="h-3.5 w-3.5" />
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
