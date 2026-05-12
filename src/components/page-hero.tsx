import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoImg from "@/assets/logo.png";

const nav = [
  { to: "/services" as const, label: "Services" },
  { to: "/about" as const, label: "About Us" },
  { to: "/client-stories" as const, label: "Client Stories" },
  { to: "/contact" as const, label: "Contact Us" },
];

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt?: string;
  onCta: () => void;
}

export function PageHero({ eyebrow, heading, description, image, imageAlt = "", onCta }: PageHeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-svh overflow-hidden bg-background">

      {/* ── MOBILE SLIDE PANEL ────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <span className="text-sm font-semibold text-foreground">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-4 flex-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 pb-8">
          <button
            onClick={() => { setMenuOpen(false); onCta(); }}
            className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
          >
            Book a Free Consultation
          </button>
        </div>
      </div>

      {/* ── DESKTOP ─────────────────────────────────────────── */}
      <div className="hidden h-full md:flex">

        {/* Left white panel */}
        <div className="flex w-[38%] shrink-0 flex-col bg-background px-12 xl:px-16">
          {/* Logo */}
          <div className="flex h-[5.5rem] shrink-0 items-center">
            <Link to="/" className="animate-hero-logo flex items-center gap-3">
              <img src={logoImg} alt="Masterguides Australia" className="h-12 w-12 object-contain" />
              <span className="leading-tight">
                <span className="block text-lg font-semibold text-foreground">Masterguides Australia</span>
                <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">Migration & Visa</span>
              </span>
            </Link>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between py-12 xl:py-16">
            <p className="animate-hero-desc max-w-xs text-base leading-relaxed text-foreground/65">
              {description}
            </p>
            <div>
              <p
                className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-foreground/40"
                style={{ animation: "fade-up 0.55s cubic-bezier(0.4,0,0.2,1) 0.05s both" }}
              >
                {eyebrow}
              </p>
              <h1
                className="mt-4 font-display text-[2.8rem] font-bold leading-[1.02] xl:text-[3.5rem]"
                style={{ animation: "fade-up 0.65s cubic-bezier(0.4,0,0.2,1) 0.15s both" }}
              >
                {heading}
              </h1>
              <button
                onClick={onCta}
                className="mt-8 inline-flex items-center rounded-full bg-foreground pl-7 pr-2 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-80"
                style={{ animation: "fade-up 0.6s cubic-bezier(0.4,0,0.2,1) 0.28s both" }}
              >
                Book a Free Consultation
                <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right image panel */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
            style={{ animation: "fade-in 1s cubic-bezier(0.4,0,0.2,1) 0s both" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-foreground/30" />

          {/* Nav overlay — top of image (same as homepage) */}
          <nav
            className="animate-hero-nav absolute left-0 right-0 top-0"
            style={{ paddingRight: "2vw" }}
          >
            <div className="flex items-center justify-between" style={{ padding: "44px 32px 32px" }}>
              <div className="flex items-center gap-[15px]">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="text-sm font-medium text-background/80 transition-colors hover:text-background"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
              <button
                onClick={onCta}
                className="flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-85"
              >
                Book a Free Call
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────── */}
      <div className="relative h-full bg-background md:hidden">
        <div
          className="relative mx-4 mt-4 mb-4 overflow-hidden rounded-[20px]"
          style={{ height: "calc(100% - 32px)" }}
        >
          <img
            src={image}
            alt={imageAlt}
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
            <span className="animate-mobile-pills inline-block rounded-full border border-background/40 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-background">
              {eyebrow}
            </span>
            <h1 className="animate-mobile-title mt-4 font-display text-5xl font-bold leading-[1.04] text-background">
              {heading}
            </h1>
            <div className="animate-mobile-cta mt-5">
              <button
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-foreground"
              >
                Book a Free Call <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
