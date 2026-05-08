import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, ScrollText, Compass, Quote } from "lucide-react";
import heroImg from "@/assets/hero-sydney.jpg";
import aboutImg from "@/assets/about-clients.jpg";
import ctaImg from "@/assets/cta-bg.jpg";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Masterguides Australia — Expert Migration & Visa Guidance" },
      { name: "description", content: "Australian migration and visa consultancy. Lawful, strategic guidance for student, partner, skilled, employer-sponsored visas and AAT appeals." },
      { property: "og:title", content: "Masterguides Australia — Expert Migration & Visa Guidance" },
      { property: "og:description", content: "Lawful, strategic guidance for Australian visa applications." },
    ],
  }),
  component: Index,
});

const listed = services.filter((s) => s.slug !== "initial-consultations");

const stats = [
  { value: "10+", label: "Years of migration practice" },
  { value: "10K+", label: "Cases reviewed & guided" },
  { value: "98%", label: "Client satisfaction" },
  { value: "11", label: "Visa specialisations" },
];

const testimonials = [
  {
    name: "Themiya Wickramage",
    role: "Skilled Migration · 189",
    quote:
      "I was sceptical about my visa process, but the team's expertise quickly dispelled every doubt. Meticulous planning, calm execution — my visa was approved without disruption.",
  },
  {
    name: "Bhagya Senatilake",
    role: "Partner Visa · 820",
    quote:
      "Exceptional support for a complex case. Every concern was addressed promptly and professionally. What could have been stressful became completely seamless.",
  },
  {
    name: "Ahen Wanigasekara",
    role: "Employer Sponsored · 482",
    quote:
      "Master Guides Australia handled my case with precision and efficiency. They were responsive at every step and made the process unusually easy.",
  },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Sydney Harbour at golden hour"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        <div className="relative container-prose flex min-h-[calc(100svh-5rem)] flex-col justify-center py-24 text-background">
          <div className="max-w-3xl">
            <p className="eyebrow text-accent">Australian Migration & Visa Consultancy</p>
            <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] sm:text-6xl md:text-7xl">
              Expert advice for your <em className="font-medium not-italic text-accent">Australian visa</em> application.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-background/80">
              Don't risk your future on a rejected application. We provide the lawful, strategic guidance required to navigate complex migration laws — and protect what matters.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-4 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
              >
                Book a Free Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-sm border border-background/40 px-6 py-4 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                Explore Our Services
              </Link>
            </div>

            <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-8 border-t border-background/20 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl text-accent">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-background/70">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FOUNDATION / INTRO */}
      <section className="bg-background">
        <div className="container-prose grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <p className="eyebrow">Our Foundation</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              Integrity, accuracy & <em className="text-brass-deep">long-term outcomes</em>.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/80">
              Masterguides Australia is a migration and visa consultancy focused on lawful, accurate and durable migration solutions. We act as strategic advisors — not agents — helping clients understand obligations, protect eligibility and avoid the costly mistakes that lead to refusal.
            </p>
            <p className="mt-6 text-foreground/70">
              From early-stage planning to compliance reviews and refusal-risk assessment, our work is designed to protect your future in Australia.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="rounded-sm border border-border px-3 py-1.5">MARA Aware</span>
              <span className="rounded-sm border border-border px-3 py-1.5">MIA Member</span>
              <span className="rounded-sm border border-border px-3 py-1.5">Compliance Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="bg-secondary">
        <div className="container-prose py-24 md:py-32">
          <div className="max-w-xl">
              <p className="eyebrow">How We Can Help</p>
              <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">Ten visa specialisations, one trusted team.</h2>
            </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            {listed.map((s, i) => (
              <Link
                key={s.slug}
                to="/services"
                className="group relative flex flex-col gap-6 bg-background p-8 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="h-5 w-5 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium">{s.title}</h3>
                  {s.subclass && <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brass-deep">{s.subclass}</p>}
                  <p className="mt-3 text-sm text-foreground/70">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-background">
        <div className="container-prose grid gap-16 py-24 md:grid-cols-2 md:py-32">
          <div>
            <img
              src={aboutImg}
              alt="Clients celebrating successful Australian visa outcomes"
              loading="lazy"
              width={1280}
              height={1280}
              className="h-full w-full rounded-sm object-cover grayscale"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Why Masterguides</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              We prioritise what matters to our clients.
            </h2>
            <p className="mt-6 text-lg text-foreground/70">
              Our approach is calm, transparent and education-driven — helping you make informed decisions without pressure or false promises.
            </p>

            <ul className="mt-10 space-y-6">
              {[
                { icon: ShieldCheck, title: "Compliance first", body: "Every case is built to withstand scrutiny under current migration law." },
                { icon: Compass, title: "Strategic clarity", body: "We map your visa pathway from day one, not application day." },
                { icon: ScrollText, title: "Documented outcomes", body: "Detailed reviews protect eligibility and prevent future risk." },
              ].map((f) => (
                <li key={f.title} className="flex gap-5 border-t border-border pt-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-foreground text-background">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium">{f.title}</h3>
                    <p className="mt-1 text-foreground/70">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-foreground text-background">
        <div className="container-prose py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">Praise</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">What clients say about our guidance.</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex h-full flex-col gap-6 border border-background/15 p-8">
                <Quote className="h-7 w-7 text-accent" />
                <blockquote className="text-base leading-relaxed text-background/85">"{t.quote}"</blockquote>
                <figcaption className="mt-auto border-t border-background/15 pt-5">
                  <div className="font-display text-lg">{t.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-background/60">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <img src={ctaImg} alt="" loading="lazy" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/85" />
        <div className="relative container-prose grid gap-10 py-24 md:grid-cols-2 md:items-center md:py-32">
          <h2 className="font-display text-4xl font-light leading-tight text-background md:text-5xl">
            Let's review your case <em className="text-accent">before</em> it becomes a refusal.
          </h2>
          <div>
            <p className="text-lg text-background/80">
              Book a confidential consultation. We'll assess eligibility, identify risks, and outline your strongest pathway under current migration law.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-4 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
            >
              Book a Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
