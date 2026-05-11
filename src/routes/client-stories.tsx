import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Quote } from "lucide-react";

export const Route = createFileRoute("/client-stories")({
  component: ClientStoriesPage,
});

const stories = [
  {
    name: "Themiya Wickramage",
    visa: "Skilled Migration · Subclass 189",
    outcome: "Permanent Residency Granted",
    quote:
      "I was sceptical about my visa process, but the team's expertise quickly dispelled every doubt. Meticulous planning, calm execution — my visa was approved without disruption.",
  },
  {
    name: "Bhagya Senatilake",
    visa: "Partner Visa · Subclass 820",
    outcome: "Visa Approved",
    quote:
      "Exceptional support for a complex case. Every concern was addressed promptly and professionally. What could have been stressful became completely seamless.",
  },
  {
    name: "Ahen Wanigasekara",
    visa: "Employer Sponsored · Subclass 482",
    outcome: "Nomination & Visa Approved",
    quote:
      "Master Guides Australia handled my case with precision and efficiency. They were responsive at every step and made the process unusually easy.",
  },
];

function ClientStoriesPage() {
  return (
    <>
      <section className="bg-secondary">
        <div className="container-prose py-24 md:py-32">
          <p className="eyebrow">Client Stories</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-light leading-[1.05] md:text-6xl">
            Real outcomes for <em className="text-brass-deep">real people</em>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80">
            Every case is personal. These are a few of the clients we've guided through Australia's complex migration system — each with a different pathway, each with a successful outcome.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-prose py-24 md:py-32">
          <div className="grid gap-px bg-border md:grid-cols-1">
            {stories.map((s) => (
              <figure key={s.name} className="bg-background p-10 md:p-14">
                <Quote className="h-8 w-8 text-brass" />
                <blockquote className="mt-6 max-w-3xl font-display text-2xl font-light leading-relaxed text-foreground md:text-3xl">
                  "{s.quote}"
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-8">
                  <div>
                    <div className="font-display text-lg font-medium">{s.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.visa}</div>
                  </div>
                  <span className="rounded-full border border-brass/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-brass-deep">
                    {s.outcome}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="container-prose grid gap-10 py-24 md:grid-cols-2 md:items-center md:py-28">
          <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">
            Ready to write your own success story?
          </h2>
          <div>
            <p className="text-lg text-background/80">
              Book a confidential consultation and let us map your strongest pathway under current Australian migration law.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-4 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
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
