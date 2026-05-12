import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { services } from "@/lib/services-data";
import { InView } from "@/components/in-view";
import { useBookingModal } from "@/components/booking-modal";
import { PageHero } from "@/components/page-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { servicesTestimonials } from "@/lib/testimonials-data";
import heroImg from "@/assets/hero-sydney.jpg";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const listed = services.filter((s) => s.slug !== "initial-consultations");;


function ServiceCard({ s, i }: { s: (typeof listed)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const { openModal } = useBookingModal();
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex min-h-[220px] flex-col justify-between rounded-2xl p-7"
      style={{
        backgroundColor: hovered ? "#00417c" : "#d8e8f5",
        transition: "background-color 0.3s ease",
      }}
    >
      <div>
        <span
          className="text-[0.6rem] font-bold uppercase tracking-[0.25em]"
          style={{ color: hovered ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)", transition: "color 0.3s ease" }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <h3
          className="mt-3 font-display text-2xl font-bold leading-tight"
          style={{ color: hovered ? "white" : "var(--color-foreground)", transition: "color 0.3s ease" }}
        >
          {s.title}
        </h3>
        {s.subclass && (
          <p
            className="mt-1 text-[0.62rem] uppercase tracking-[0.18em]"
            style={{ color: hovered ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)", transition: "color 0.3s ease" }}
          >
            {s.subclass}
          </p>
        )}
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: hovered ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)", transition: "color 0.3s ease" }}
        >
          {s.short}
        </p>
      </div>
      <button
        onClick={openModal}
        className="mt-6 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] underline underline-offset-4"
        style={{
          color: hovered ? "rgba(255,255,255,0.8)" : "var(--color-foreground)",
          textDecorationColor: hovered ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
          transition: "color 0.3s ease",
        }}
      >
        Learn More
      </button>
    </div>
  );
}

function ServicesPage() {
  const { openModal } = useBookingModal();
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        heading="Comprehensive migration guidance, every pathway."
        description="From first entry to permanent residency and citizenship — lawful, strategic guidance across all major visa categories."
        image={heroImg}
        imageAlt="Sydney Harbour at golden hour"
        onCta={openModal}
      />

      {/* ─── SERVICES GRID ────────────────────────────────────── */}
      <section className="bg-background px-5 py-16 md:px-[50px] md:py-20">

        <InView className="flex items-center justify-between">
          <p className="text-base font-bold text-foreground">All Services</p>
          <button
            onClick={openModal}
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Book Now <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </InView>
        <div className="mt-4 border-t border-border" />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {listed.map((s, i) => (
            <InView key={s.slug} delay={i * 30} y={14} threshold={0.05}>
              <ServiceCard s={s} i={i} />
            </InView>
          ))}
        </div>
      </section>

      <TestimonialsSection testimonials={servicesTestimonials} />

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="mx-3 mb-5 overflow-hidden rounded-[14px] md:mx-[50px]">
        <div className="relative">
          <img
            src={heroImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
          />
          <div className="absolute inset-0 bg-foreground/65" />
          <div className="relative flex min-h-[300px] flex-col items-center justify-center px-6 py-16 text-center md:h-[340px] md:min-h-0">
            <InView y={20} className="w-full text-center">
              <h2 className="font-display text-4xl font-bold text-background md:text-5xl">
                Not sure which visa is right for you?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-background/70">
                Book an initial consultation. We'll assess your eligibility, identify risks, and map the strongest pathway under current migration law.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={openModal}
                  className="inline-flex items-center rounded-full bg-background pl-7 pr-2 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-90"
                >
                  Book a Free Consultation
                  <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </InView>
          </div>
        </div>
      </section>
    </>
  );
}
