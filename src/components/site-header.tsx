import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useBookingModal } from "@/components/booking-modal";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/client-stories", label: "Client Stories" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          scrolled ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container-prose flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Master Guide Australia" className="h-11 w-11 object-contain" />
            <span className="leading-tight">
              <span className="block text-lg font-semibold text-foreground">Masterguides Australia</span>
              <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">Migration & Visa</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={openModal}
            className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80 md:inline-flex"
          >
            Book a Free Consultation
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Backdrop — outside <header> so it's not affected by the header's transform */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide panel — outside <header> so fixed positioning is relative to viewport */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-background shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <span className="text-sm font-semibold text-foreground">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="p-1 text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-4 flex-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 pb-8">
          <button
            onClick={() => { setOpen(false); openModal(); }}
            className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
          >
            Book a Free Consultation
          </button>
        </div>
      </div>
    </>
  );
}
