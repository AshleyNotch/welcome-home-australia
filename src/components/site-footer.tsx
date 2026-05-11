import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Master Guide Australia" className="h-12 w-12 object-contain brightness-0 invert" />
            <span className="text-lg font-semibold">Masterguides Australia</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-background/70">
            A migration & visa consultancy delivering lawful, accurate, long-term solutions for individuals and businesses moving to Australia.
          </p>
          <div className="mt-6 flex gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-background/60">
            <span className="rounded-sm border border-background/30 px-3 py-1.5">MARA Aware</span>
            <span className="rounded-sm border border-background/30 px-3 py-1.5">MIA Member</span>
          </div>
        </div>

        <div>
          <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-background/60">Navigate</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/services", label: "Services" },
              { to: "/about", label: "About Us" },
              { to: "/client-stories", label: "Client Stories" },
              { to: "/contact", label: "Contact Us" },
            ].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-background/80 hover:text-background">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-background/60">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-background/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> Sydney, NSW · Australia</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" /> hello@masterguidesaustralia.com</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +61 (0) 000 000 000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/15">
        <div className="container-prose flex flex-col items-start justify-between gap-3 py-6 text-xs text-background/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Masterguides Australia. All rights reserved.</span>
          <span>Information on this site is general guidance, not legal advice.</span>
        </div>
      </div>
    </footer>
  );
}
