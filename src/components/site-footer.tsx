import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { to: "/services" as const, label: "Services" },
  { to: "/about" as const, label: "About Us" },
  { to: "/client-stories" as const, label: "Client Stories" },
  { to: "/contact" as const, label: "Contact Us" },
];

export function SiteFooter() {
  return (
    <footer className="mx-[50px] mt-5 overflow-hidden rounded-t-[14px]" style={{ backgroundColor: "#0d1f35" }}>

      {/* Top section */}
      <div className="flex items-start justify-between gap-10 px-[50px] pt-14 pb-10">

        {/* Headline + CTA */}
        <div>
          <h2 className="font-display text-4xl font-light leading-tight text-white md:text-5xl lg:text-[3.5rem]">
            Let's begin your<br />migration journey.
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center rounded-full py-2 pl-6 pr-2 text-sm font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "white" }}
          >
            Book a Call
            <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              <ArrowUpRight className="h-4 w-4 text-white" />
            </span>
          </Link>
        </div>

        {/* Contact info */}
        <div className="hidden shrink-0 text-right text-sm leading-loose md:block" style={{ color: "rgba(255,255,255,0.45)" }}>
          <p>Sydney, NSW</p>
          <p>Australia</p>
          <p className="mt-2">+61 (0) 000 000 000</p>
          <p>hello@masterguidesaustralia.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-[50px] border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Bottom bar */}
      <div className="flex items-center justify-between gap-6 px-[50px] py-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="Masterguides Australia" className="h-9 w-9 object-contain brightness-0 invert opacity-80" />
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
            Masterguides Australia
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          © Masterguides Australia {new Date().getFullYear()}. All rights reserved.
        </span>
      </div>

    </footer>
  );
}
