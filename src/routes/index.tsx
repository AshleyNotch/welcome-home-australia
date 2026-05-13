import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-sydney.jpg";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: MaintenancePage,
});

function MaintenancePage() {
  return (
    <section className="relative h-svh overflow-hidden bg-background">

      {/* ── DESKTOP: animated image card ── */}
      <div className="animate-hero-card-in absolute inset-0 hidden md:block">
        <img
          src={heroImg}
          alt="Sydney Harbour at golden hour"
          className="animate-hero-pan h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-foreground/30" />
      </div>

      {/* ── MOBILE ── */}
      <div className="relative h-full bg-background md:hidden">
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

          {/* Logo — top left */}
          <div className="animate-mobile-menu absolute left-5 top-5 z-10 flex items-center gap-2.5">
            <img src={logoImg} alt="Masterguides Australia" className="h-9 w-9 object-contain" />
            <div className="leading-tight">
              <span className="block text-[0.75rem] font-semibold text-background">Masterguides Australia</span>
              <span className="block text-[0.55rem] uppercase tracking-[0.2em] text-background/60">Migration & Visa</span>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <h1 className="animate-mobile-title font-display text-5xl font-light leading-[1.04] text-background">
              Site is Under<br />Maintenance.
            </h1>
            <p className="animate-mobile-cta mt-4 text-sm leading-relaxed text-background/60">
              We'll be back soon.
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden h-full overflow-hidden md:flex">

        {/* Left panel */}
        <div className="flex w-[38%] shrink-0 flex-col bg-background px-12 xl:px-16">

          {/* Logo */}
          <div className="flex h-[5.5rem] shrink-0 items-center">
            <div className="animate-hero-logo flex items-center gap-3">
              <img src={logoImg} alt="Masterguides Australia" className="h-12 w-12 object-contain" />
              <span className="leading-tight">
                <span className="block text-lg font-semibold text-foreground">Masterguides Australia</span>
                <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">Migration & Visa</span>
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center py-12 xl:py-16">
            <p className="animate-hero-desc max-w-xs text-base leading-relaxed text-foreground/65">
              We're currently performing scheduled maintenance and will be back shortly.
            </p>
          </div>
        </div>

        {/* Right image panel */}
        <div className="relative flex-1">
          <div className="absolute bottom-0 left-0 px-10 pb-12 xl:px-14 xl:pb-16">
            <h1 className="animate-hero-headline font-display text-[4.5rem] font-bold leading-[1.02] text-background xl:text-[5.5rem]">
              Site is Under<br />Maintenance.
            </h1>
          </div>
        </div>

      </div>
    </section>
  );
}
