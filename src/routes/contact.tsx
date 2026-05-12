import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useBookingModal } from "@/components/booking-modal";
import { InView } from "@/components/in-view";
import { PageHero } from "@/components/page-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { contactTestimonials } from "@/lib/testimonials-data";
import heroImg from "@/assets/hero-sydney.jpg";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const contactDetails = [
  {
    Icon: Phone,
    label: "Call us",
    value: "+61 426 899 272",
    href: "tel:+61426899272",
  },
  {
    Icon: Mail,
    label: "Email us",
    value: "info@masterguidesaustralia.com",
    href: "mailto:info@masterguidesaustralia.com",
  },
  {
    Icon: MapPin,
    label: "Visit us",
    value: "381, Level 2, 66 Victor Crescent\nNarre Warren, Victoria 3805",
    href: "https://maps.google.com/?q=66+Victor+Crescent+Narre+Warren+VIC+3805",
  },
];

function ContactPage() {
  const { openModal } = useBookingModal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nMessage:\n${form.message}`;
    window.location.href = `mailto:info@masterguidesaustralia.com?subject=Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        heading="Let's talk about your visa pathway."
        description="Have questions about your visa options? Our team provides clear, compliant, and personalised advice to help you make informed migration decisions."
        image={heroImg}
        imageAlt="Sydney Harbour"
        onCta={openModal}
      />

      {/* ─── CONTACT DETAILS + FORM ───────────────────────────── */}
      <section className="bg-background px-5 py-16 md:px-[50px] md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 md:items-start">

          {/* Left — contact details */}
          <div>
            <InView>
              <p className="text-base font-bold text-foreground">Get in touch</p>
              <div className="mt-4 border-t border-border" />
            </InView>
            <InView delay={100} y={14}>
              <h2 className="mt-10 font-display text-[2rem] font-bold leading-[1.05] md:text-[2.8rem]">
                We're here to guide every step of the way.
              </h2>
              <p className="mt-5 leading-relaxed text-foreground/60">
                Whether you have a quick question or need a full case assessment, reach out through any channel below — or book a consultation directly.
              </p>
            </InView>

            <div className="mt-10 flex flex-col gap-3">
              {contactDetails.map(({ Icon, label, value, href }, i) => (
                <InView key={label} delay={i * 70} y={12}>
                  <a
                    href={href}
                    target={href.startsWith("https") ? "_blank" : undefined}
                    rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-2xl bg-secondary p-6 transition-opacity hover:opacity-80"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "#00417c" }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/40">
                        {label}
                      </p>
                      <p className="mt-1 font-display text-lg font-bold leading-snug whitespace-pre-line">
                        {value}
                      </p>
                    </div>
                  </a>
                </InView>
              ))}
            </div>
          </div>

          {/* Right — enquiry form */}
          <InView delay={120} y={16}>
            <div className="rounded-2xl bg-secondary p-7 md:p-10">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-foreground/40">
                Quick Enquiry
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                Send us a message
              </h3>
              <p className="mt-2 text-sm text-foreground/50">
                For a scheduled consultation, use the booking button above.
              </p>

              {sent ? (
                <div className="mt-8 rounded-xl bg-background p-6 text-center">
                  <p className="font-display text-xl font-bold">Message sent!</p>
                  <p className="mt-2 text-sm text-foreground/60">
                    Your email client should have opened. We'll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+61 4xx xxx xxx"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@email.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your situation…"
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
                  >
                    Send Message <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </InView>

        </div>
      </section>

      <TestimonialsSection testimonials={contactTestimonials} />

      {/* ─── BOOK CTA ─────────────────────────────────────────── */}
      <section
        className="mx-3 mb-5 overflow-hidden rounded-[14px] px-5 py-12 md:mx-[50px] md:px-[50px] md:py-16"
        style={{ backgroundColor: "#00417c" }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <InView y={16}>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-background/50">
              Ready to begin?
            </p>
            <h2 className="mt-4 max-w-lg font-display text-3xl font-bold leading-tight text-background md:text-4xl">
              Get expert migration guidance before you apply.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">
              Book a discovery call. We'll assess your eligibility, identify risks, and map the strongest pathway under current migration law — no obligation.
            </p>
          </InView>
          <InView delay={150} y={12}>
            <button
              onClick={openModal}
              className="inline-flex shrink-0 items-center rounded-full bg-background pl-7 pr-2 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-90"
            >
              Book a Free Consultation
              <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </InView>
        </div>
      </section>
    </>
  );
}
