import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const listed = services.filter((s) => s.slug !== "initial-consultations");

function ServicesPage() {
  return (
    <>
      <section className="bg-secondary">
        <div className="container-prose py-24 md:py-32">
          <p className="eyebrow">Our Services</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-light leading-[1.05] md:text-6xl">
            Comprehensive migration guidance, <em className="text-brass-deep">every pathway</em>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80">
            From first entry to permanent residency and citizenship — lawful, strategic guidance across all major visa categories and immigration matters.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-prose py-24 md:py-32">
          <div className="grid gap-px bg-border md:grid-cols-2">
            {listed.map((s, i) => (
              <div key={s.slug} className="bg-background p-10">
                <span className="font-display text-5xl text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-6 font-display text-2xl font-medium">{s.title}</h2>
                {s.subclass && (
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brass-deep">
                    {s.subclass}
                  </p>
                )}
                <p className="mt-4 text-foreground/70">{s.short}</p>
                <ul className="mt-6 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-foreground/70">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brass" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="container-prose grid gap-10 py-24 md:grid-cols-2 md:items-center md:py-28">
          <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">
            Not sure which visa is right for you?
          </h2>
          <div>
            <p className="text-lg text-background/80">
              Book an initial consultation. We'll assess your eligibility, identify risks, and map the strongest pathway under current migration law — no obligation.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Book a Free Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
