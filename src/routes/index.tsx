
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import { useBookingModal } from "@/components/booking-modal";
import { ArrowUpRight, ChevronDown, Briefcase, Gem, Users, Zap, Quote, Menu, X } from "lucide-react";
import heroImg from "@/assets/hero-sydney.jpg";
import consultationBannerImg from "@/assets/consultation-banner.webp";
import logoImg from "@/assets/logo.png";
import { services } from "@/lib/services-data";
import { InView } from "@/components/in-view";

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
  { end: 10, format: (n: number) => `${n}K+`, label: "Cases reviewed & guided" },
  { end: 10, format: (n: number) => `${n}+`, label: "Years of experience" },
  { end: 98, format: (n: number) => `${n}%`, label: "Client satisfaction" },
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
    <section ref={ref} className="bg-background py-10 px-5 md:px-[50px]">
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

const benefits = [
  {
    Icon: Briefcase,
    title: "Deep Expertise",
    desc: "Registered migration agents with mastery of Australian visa law, policy, and every major pathway.",
  },
  {
    Icon: Gem,
    title: "Proven Effectiveness",
    desc: "Thousands of successful visa outcomes across every category — from student visas to permanent residency.",
  },
  {
    Icon: Users,
    title: "Individual Approach",
    desc: "Every case is unique. We build a tailored strategy around your specific circumstances and goals.",
  },
  {
    Icon: Zap,
    title: "Transparent Pricing",
    desc: "Clear, upfront costs with no hidden fees. You know exactly what to expect from day one.",
  },
  {
    Icon: ArrowUpRight,
    title: "End-to-End Support",
    desc: "From your first consultation to visa grant — we're with you at every stage of the process.",
  },
];

function BenefitCard({ b }: { b: (typeof benefits)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex w-full shrink-0 flex-col justify-between rounded-2xl p-8 md:w-[520px] md:p-10"
      style={{
        backgroundColor: hovered ? "#00417c" : "#d8e8f5",
        height: "460px",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: hovered ? "white" : "#1a3a5c",
          transition: "background-color 0.3s ease",
        }}
      >
        <b.Icon
          className="h-6 w-6"
          style={{ color: hovered ? "#00417c" : "white", transition: "color 0.3s ease" }}
        />
      </div>
      <div>
        <h3
          className="font-display text-4xl font-light leading-tight"
          style={{ color: hovered ? "white" : undefined, transition: "color 0.3s ease" }}
        >
          {b.title}
        </h3>
        <p
          className="mt-4"
          style={{
            color: hovered ? "rgba(255,255,255,0.7)" : "var(--color-foreground)",
            opacity: hovered ? 1 : 0.6,
            transition: "color 0.3s ease, opacity 0.3s ease",
          }}
        >
          {b.desc}
        </p>
      </div>
    </div>
  );
}

function BenefitsSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!outer || !sticky || !track) return;

    const setHeight = () => {
      const stickyH = sticky.offsetHeight;
      const maxScroll = track.scrollWidth - window.innerWidth;
      const dwell = stickyH * 0.25;
      outer.style.height = `${stickyH + Math.max(0, maxScroll) + dwell}px`;
    };

    setHeight();
    window.addEventListener("resize", setHeight);

    const onScroll = () => {
      const o = outerRef.current;
      const s = stickyRef.current;
      const t = trackRef.current;
      if (!o || !s || !t) return;
      const maxScroll = t.scrollWidth - window.innerWidth;
      const progress = Math.max(0, Math.min(1, -o.getBoundingClientRect().top / maxScroll));
      setTranslateX(-progress * maxScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <div ref={outerRef} className="bg-background">
      <div ref={stickyRef} className="sticky top-0 flex flex-col overflow-hidden bg-background pb-10">
        <div className="px-[50px] pt-10 pb-6 shrink-0">
          <p className="text-base font-bold text-foreground">Why Us</p>
          <div className="mt-4 border-t border-border" />
        </div>
        <div className="overflow-hidden pt-8">
          <div
            ref={trackRef}
            className="flex gap-5 pl-[50px]"
            style={{ transform: `translateX(${translateX}px)`, willChange: "transform" }}
          >
            {benefits.map((b) => (
              <BenefitCard key={b.title} b={b} />
            ))}
            <div className="w-[50px] shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

const homeStories = [
  {
    name: "Themiya Wickramage",
    visa: "Skilled Migration · Subclass 189",
    outcome: "Permanent Residency Granted",
    quote: "I was sceptical about my visa process, but the team's expertise quickly dispelled every doubt. Meticulous planning, calm execution — my visa was approved without disruption.",
  },
  {
    name: "Bhagya Senatilake",
    visa: "Partner Visa · Subclass 820",
    outcome: "Visa Approved",
    quote: "Exceptional support for a complex case. Every concern was addressed promptly and professionally. What could have been stressful became completely seamless.",
  },
  {
    name: "Ahen Wanigasekara",
    visa: "Employer Sponsored · Subclass 482",
    outcome: "Nomination & Visa Approved",
    quote: "Master Guides Australia handled my case with precision and efficiency. They were responsive at every step and made the process unusually easy.",
  },
];

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { openModal } = useBookingModal();
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-foreground/50 transition-opacity duration-300 md:hidden"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="fixed right-0 top-0 z-50 flex h-full w-[300px] flex-col bg-background transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <img src={logoImg} alt="Masterguides Australia" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-foreground">Masterguides Australia</span>
              <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">Migration & Visa</span>
            </div>
          </Link>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/60 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-6 border-t border-border" />

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-6 pt-6">
          {heroNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={onClose}
              className="rounded-xl px-4 py-3.5 text-lg font-light text-foreground transition-colors hover:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-auto px-6 pb-12">
          <button
            onClick={() => { onClose(); openModal(); }}
            className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Book a Free Call
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

function scrollDown() {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useBookingModal();
  return (
    <>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
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
        <div className="relative h-full bg-background md:hidden">
          {/* Card with rounded corners on all 4 sides */}
          <div
            className="relative mx-4 mt-4 mb-4 overflow-hidden rounded-[20px]"
            style={{ height: "calc(100% - 32px)" }}
          >
            <img
              src={heroImg}
              alt="Sydney Harbour at golden hour"
              className="animate-mobile-img absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/20" />

            {/* Hamburger — top right */}
            <button
              onClick={() => setMenuOpen(true)}
              className="animate-mobile-menu absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/20 backdrop-blur-sm"
            >
              <Menu className="h-5 w-5 text-background" />
            </button>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
              <div className="animate-mobile-pills mb-4 flex flex-wrap gap-2">
                {heroTags.slice(0, 2).map((t) => (
                  <Link key={t.slug} to="/services"
                    className="inline-flex items-center rounded-full border border-background/40 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-background">
                    {t.title}
                  </Link>
                ))}
                <Link to="/services"
                  className="inline-flex items-center rounded-full border border-background/25 px-4 py-2 text-[0.65rem] font-bold text-background/50">
                  +{remainingCount + 3}
                </Link>
              </div>

              <h1 className="animate-mobile-title font-display text-5xl font-light leading-[1.04] text-background">
                Your Guide<br />to Australia.
              </h1>

              <div className="animate-mobile-cta mt-5">
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-foreground">
                  Book a Free Call <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
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
            <nav
              className="animate-hero-nav absolute left-0 right-0 top-0"
              style={{ paddingRight: '2vw' }}
            >
              <div
                className="flex items-center justify-between"
                style={{ padding: '44px 32px 32px' }}
              >
                <div className="flex items-center gap-[15px]">
                  {heroNav.map((n) => (
                    <Link key={n.to} to={n.to}
                      className="text-sm font-medium text-background/80 transition-colors hover:text-background">
                      {n.label}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={openModal}
                  className="animate-hero-cta flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-85">
                  Book a Free Call
                  <span className="inline-block" style={{ animation: "hero-icon-spin 0.6s cubic-bezier(0.4,0,0.2,1) 2.8s both" }}>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </div>
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
        <div className="px-5 py-10 md:px-[50px]">
          <InView className="flex items-center justify-between">
            <span className="text-base font-bold text-foreground">Our Mission</span>
            <Link to="/about"
              className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:bg-foreground hover:text-background">
              Read More <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </InView>

          <div className="mt-5 border-t border-border" />

          <div className="mt-16 md:ml-[28%]">
            <MissionText />
          </div>
        </div>
      </section>

      <StatsSection />

      {/* ─── SERVICES LIST ────────────────────────────────────── */}
      <section className="mx-3 overflow-hidden rounded-[14px] px-5 py-10 text-background md:mx-[50px] md:px-[50px] md:py-16" style={{ backgroundColor: '#00417c' }}>

        <InView y={20}>
          <p className="text-base font-bold text-background">Our services</p>
          <div className="mt-4 border-t border-background/15" />
        </InView>

        <div>
          {listed.slice(0, 5).map((s, i) => (
            <InView key={s.slug} delay={i * 60} y={16} threshold={0.05}>
              <Link
                to="/services"
                className="group flex flex-col border-b border-background/10 py-7 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-light leading-none text-background/40 transition-colors duration-300 group-hover:text-background md:text-[40px] lg:text-[56px]">
                    {s.title}
                  </span>
                  <span className="text-sm text-background/25 transition-colors duration-300 group-hover:text-background/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:mt-4 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="flex items-end justify-between gap-6">
                      <p className="text-sm text-background/50 lg:text-base">{s.short}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); openModal(); }}
                        className="shrink-0 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-80"
                      >
                        Book a Free Call
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </InView>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {listed.slice(5).map((s, i) => (
            <Link
              key={s.slug}
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-background/20 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-background/50 transition-all hover:border-background/50 hover:text-background"
            >
              <span className="text-background/30">{String(i + 6).padStart(2, "0")}</span>
              {s.title}
            </Link>
          ))}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-background px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-background transition-all hover:bg-background hover:text-foreground"
          >
            Read More
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </section>

      {/* Desktop: sticky horizontal scroll */}
      <div className="hidden md:block">
        <BenefitsSection />
      </div>

      {/* Mobile: vertical stack */}
      <section className="bg-background md:hidden">
        <div className="px-5 pt-10 pb-0">
          <p className="text-base font-bold text-foreground">Why Us</p>
          <div className="mt-4 border-t border-border" />
        </div>
        <div className="grid grid-cols-1 gap-4 px-5 pb-10 pt-6">
          {benefits.map((b) => (
            <BenefitCard key={b.title} b={b} />
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="mx-3 mt-5 overflow-hidden rounded-[14px] md:mx-[50px]" style={{ minHeight: '260px' }}>
        <div className="relative h-full">
          <img
            src={consultationBannerImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/55" />
          <div className="relative flex min-h-[260px] flex-col items-center justify-center gap-6 py-12 text-center px-6 md:min-h-0 md:h-[340px]">
            <InView y={20} className="w-full text-center">
              <h2 className="font-display text-4xl font-bold text-background md:text-5xl">
                Ready for expert migration guidance?
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-background/70">
                Clear answers. Trusted support. Let Masterguides Australia be your compass to a new life here.
              </p>
            </InView>
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center rounded-full bg-background pl-7 pr-2 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-90"
            >
              Book a Free Consultation
              <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CLIENT STORIES ───────────────────────────────────── */}
      <section className="bg-background">
        <div className="px-5 pt-12 pb-0 md:px-[50px]">
          <InView className="flex items-center justify-between">
            <p className="text-base font-bold text-foreground">Client stories</p>
            <Link
              to="/client-stories"
              className="inline-flex items-center rounded-full border border-foreground pl-6 pr-2 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-70"
            >
              View All
              <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </InView>
          <div className="mt-4 border-t border-border" />
        </div>

        <div className="mt-8 flex flex-col gap-4 pb-12 px-5 md:flex-row md:flex-nowrap md:overflow-x-auto md:pl-[50px] md:px-0" style={{ scrollbarWidth: 'none' }}>
          {homeStories.flatMap((s) => {
            const initials = s.name.split(" ").map((n) => n[0]).join("");
            return [
              /* Portrait card — desktop only */
              <div
                key={`${s.name}-photo`}
                className="relative hidden md:flex w-full md:w-[260px] md:shrink-0 flex-col justify-end overflow-hidden rounded-2xl p-5 md:p-7 h-[280px] md:h-[400px]"
                style={{ backgroundColor: "#00417c" }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[140px] font-bold select-none" style={{ color: "rgba(255,255,255,0.07)" }}>
                  {initials}
                </span>
                <div className="relative">
                  <p className="font-semibold text-white">{s.name}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/50">{s.visa}</p>
                </div>
              </div>,

              /* Quote card */
              <div
                key={`${s.name}-quote`}
                className="flex w-full md:w-[400px] md:shrink-0 flex-col justify-between rounded-2xl p-8 md:h-[400px]"
                style={{ backgroundColor: "#d8e8f5" }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.visa}</p>
                  </div>
                  <div
                    className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: "#1a3a5c" }}
                  >
                    {initials}
                  </div>
                </div>

                <p className="text-xl font-light leading-relaxed text-foreground mt-6 md:mt-0">"{s.quote}"</p>

                <div className="mt-6 md:mt-0">
                  <span className="mb-4 inline-block rounded-full border border-brass/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-brass-deep">
                    {s.outcome}
                  </span>
                  <Link to="/client-stories" className="block text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 underline underline-offset-4 hover:text-foreground">
                    Read More
                  </Link>
                </div>
              </div>,
            ];
          })}
          <div className="hidden md:block w-[50px] shrink-0" />
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <FaqSection />

    </>
  );
}

const faqs = [
  {
    q: "What does an initial consultation include?",
    a: "We analyse your migration situation in full, assess your visa options, identify any eligibility risks, and outline the strongest pathway under current Australian migration law. You leave with a clear plan and realistic expectations.",
  },
  {
    q: "How much does it cost?",
    a: "Fees vary depending on the visa type and complexity of your case. We provide a transparent quote after your initial consultation — no hidden charges.",
  },
  {
    q: "Can my case be handled remotely?",
    a: "Yes. We work with clients across Australia and internationally. All consultations, document reviews, and submissions can be completed entirely online.",
  },
  {
    q: "How long does a visa application take?",
    a: "Processing times vary by visa subclass and the Department of Home Affairs' current workload. We'll give you realistic timelines specific to your application during your consultation.",
  },
  {
    q: "What happens if my visa is refused?",
    a: "We can review the decision and advise on appeal options through the Administrative Review Tribunal (ART), or explore alternative visa pathways. Early legal advice after a refusal is critical.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-background">
      <div className="px-5 pt-12 pb-0 md:px-[50px]">
        <InView className="flex items-center justify-between">
          <p className="text-base font-bold text-foreground">Frequently asked questions</p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-foreground pl-6 pr-2 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-70"
          >
            Contact Us
            <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </InView>
        <div className="mt-4 border-t border-border" />
      </div>

      <div className="py-6 px-5 space-y-3 md:py-8 md:pl-[30%] md:pr-[50px]">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              className="w-full cursor-default rounded-2xl px-5 py-4 text-left md:px-8 md:py-6"
              style={{
                backgroundColor: isOpen ? "#00417c" : "#d8e8f5",
                transition: "background-color 0.35s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div className="flex items-center justify-between gap-6">
                <span
                  className="text-lg font-light leading-snug"
                  style={{
                    color: isOpen ? "white" : "var(--color-foreground)",
                    transition: "color 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className="shrink-0 text-2xl font-light leading-none"
                  style={{
                    color: isOpen ? "rgba(255,255,255,0.5)" : "var(--color-foreground)",
                    transition: "color 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                    transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              <div
                className="grid"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div className="overflow-hidden">
                  <p
                    className="pt-4 text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      opacity: isOpen ? 1 : 0,
                      transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1) 0.1s",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
