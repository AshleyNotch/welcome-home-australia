import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useBookingModal } from "@/components/booking-modal";
import { InView } from "@/components/in-view";
import { PageHero } from "@/components/page-hero";
import { wallTestimonials } from "@/lib/testimonials-data";
import heroImg from "@/assets/clients.webp";
import consultationBannerImg from "@/assets/consultation-banner.webp";

export const Route = createFileRoute("/client-stories")({
  component: ClientStoriesPage,
});

function ClientStoriesPage() {
  const { openModal } = useBookingModal();

  return (
    <>
      <PageHero
        eyebrow="Client Stories"
        heading="Real outcomes for real people."
        description="Every case is personal. These are a few of the clients we've guided through Australia's complex migration system — each with a successful outcome."
        image={heroImg}
        imageAlt="Sydney Harbour"
        onCta={openModal}
      />

      {/* ─── TESTIMONIAL TICKER ───────────────────────────────── */}
      <section className="bg-background py-16 md:py-20">
        <InView className="px-5 md:px-[50px]">
          <p className="text-base font-bold text-foreground">What our clients say</p>
          <div className="mt-4 border-t border-border" />
        </InView>

        <div className="mt-10 flex flex-col gap-4 overflow-hidden">
          {[0, 1, 2].map((row) => {
            // Rotate start point per row so each row shows different cards first
            const offset = row * 4;
            const items = [...wallTestimonials.slice(offset), ...wallTestimonials.slice(0, offset)];
            const movesRight = row % 2 === 0;
            const speed = 40 + row * 5;
            return (
              <div key={row} className="overflow-hidden">
                <div
                  className="flex flex-nowrap gap-4"
                  style={{
                    animation: `${movesRight ? "ticker-right" : "ticker-left"} ${speed}s linear infinite`,
                    willChange: "transform",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                  onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
                >
                  {/* Duplicate for seamless loop */}
                  {[...items, ...items].map((t, i) => {
                    const initials = t.name.split(" ").map((n) => n[0]).join("");
                    return (
                      <div
                        key={`${t.name}-${i}`}
                        className="w-[320px] shrink-0 rounded-2xl border border-border bg-background p-6"
                      >
                        <div className="flex gap-px mb-4">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <span key={j} style={{ color: "#f59e0b", fontSize: "12px" }}>★</span>
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/70">
                          "{t.quote}"
                        </p>
                        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold text-white"
                            style={{ backgroundColor: "#00417c" }}
                          >
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{t.name}</p>
                            <p className="text-[0.62rem] text-foreground/40">{t.visa}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── STATS BANNER ─────────────────────────────────────── */}
      <section
        className="mx-3 overflow-hidden rounded-[14px] px-5 py-10 md:mx-[50px] md:px-[50px] md:py-14"
        style={{ backgroundColor: "#00417c" }}
      >
        <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
          {[
            { value: "98%", label: "Client satisfaction rate" },
            { value: "10K+", label: "Cases reviewed & guided" },
            { value: "10+", label: "Years of expertise" },
          ].map((s, i) => (
            <InView key={s.label} delay={i * 80} y={12}>
              <div className="flex flex-col items-center py-8 text-center">
                <span className="font-display text-5xl font-bold text-white md:text-6xl">
                  {s.value}
                </span>
                <p className="mt-3 text-sm text-white/50">{s.label}</p>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="mx-3 mb-5 mt-3 overflow-hidden rounded-[14px] md:mx-[50px]">
        <div className="relative">
          <img
            src={consultationBannerImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/65" />
          <div className="relative flex min-h-[300px] flex-col items-center justify-center px-6 py-16 text-center md:h-[340px] md:min-h-0">
            <InView y={20} className="w-full text-center">
              <h2 className="font-display text-4xl font-bold text-background md:text-5xl">
                Ready to write your own success story?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-background/70">
                Book a confidential consultation and let us map your strongest pathway under current Australian migration law.
              </p>
              <div className="mt-8">
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
