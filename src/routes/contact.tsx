import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-secondary">
        <div className="container-prose py-24 md:py-32">
          <p className="eyebrow">Contact Us</p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl font-light leading-[1.05] md:text-6xl">
            Let's talk about your <em className="text-brass-deep">visa pathway</em>.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80">
            Book a confidential consultation. We'll assess your eligibility, identify risks, and outline the strongest pathway under current migration law.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-prose grid gap-16 py-24 md:grid-cols-2 md:py-32">
          <div className="space-y-8">
            <div className="flex items-start gap-4 border-t border-border pt-8">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-foreground text-background">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                <a href="mailto:hello@masterguidesaustralia.com" className="mt-1 font-display text-lg hover:text-brass-deep">
                  hello@masterguidesaustralia.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-border pt-8">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-foreground text-background">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
                <a href="tel:+610000000000" className="mt-1 font-display text-lg hover:text-brass-deep">
                  +61 (0) 000 000 000
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-border pt-8">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-foreground text-background">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                <p className="mt-1 font-display text-lg">Sydney, NSW · Australia</p>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-secondary p-10">
            <p className="eyebrow mb-6">Book a Consultation</p>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">First Name</label>
                  <input type="text" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">Last Name</label>
                  <input type="text" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</label>
                <input type="email" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">Visa Type of Interest</label>
                <input type="text" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">Message</label>
                <textarea rows={4} className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-foreground focus:outline-none resize-none" />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-foreground px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Send Message
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
