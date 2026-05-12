import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import aboutImg from "@/assets/about-clients.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Masterguides Australia" },
      { name: "description", content: "Strategic Australian migration advisors focused on lawful, accurate and long-term migration outcomes." },
      { property: "og:title", content: "About Masterguides Australia" },
      { property: "og:description", content: "Strategic Australian migration advisors focused on lawful, accurate outcomes." },
    ],
  }),
  component: AboutPage,
});

const principles = [
  { title: "Strategic, not transactional", body: "We act as advisors throughout your migration journey — from first conversation to outcome — not order-takers." },
  { title: "Education before submission", body: "You will understand your obligations, options and risks before lodging anything. No pressure. No false promises." },
  { title: "Accuracy over speed", body: "Migration law is unforgiving of small errors. Every file we touch is built to withstand departmental scrutiny." },
  { title: "Discretion and care", body: "Sensitive personal and business matters are handled with the confidentiality they deserve." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-secondary">
        <div className="container-prose grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">About</p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.05] md:text-6xl">
              Trusted migration guidance built on <em className="text-brass-deep">expertise</em>.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80">
              Masterguides Australia is a migration & visa consultancy delivering lawful, accurate and long-term solutions. We act as strategic advisors — not agents — helping clients avoid costly mistakes and protect their future in Australia.
            </p>
          </div>
          <div className="md:col-span-5">
            <img src={aboutImg} alt="Masterguides Australia clients" loading="lazy" width={1280} height={1280} className="h-full w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-prose py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">Four principles that shape every engagement.</h2>
          </div>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="bg-background p-10">
                <span className="font-display text-5xl text-brass">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl font-medium">{p.title}</h3>
                <p className="mt-3 text-foreground/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="container-prose grid gap-10 py-24 md:grid-cols-2 md:items-center md:py-28">
          <h2 className="font-display text-4xl font-light leading-tight md:text-5xl">Ready to start your case review?</h2>
          <div>
            <p className="text-lg text-background/80">A short consultation is often all it takes to know whether your application is on safe ground.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-foreground hover:-translate-y-0.5 transition-transform">
              Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
