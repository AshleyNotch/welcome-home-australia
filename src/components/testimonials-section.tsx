import { InView } from "@/components/in-view";
import type { Testimonial } from "@/lib/testimonials-data";

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: Props) {
  return (
    <section className="bg-background px-5 py-16 md:px-[50px] md:py-20">
      <InView y={16}>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-foreground/40">
          Client Stories
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
          What our clients say
        </h2>
      </InView>
      <div className="mt-4 border-t border-border" />

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => {
          const initials = t.name.split(" ").map((n) => n[0]).join("");
          return (
            <InView key={t.name} delay={i * 50} y={14} threshold={0.05}>
              <div className="flex flex-col rounded-2xl border border-border bg-background p-6 md:p-7">
                {/* Quote */}
                <p className="flex-1 text-sm leading-relaxed text-foreground/70 md:text-base">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "#00417c" }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="mt-0.5 text-[0.62rem] text-foreground/40">{t.visa}</p>
                    <div className="mt-1 flex gap-px">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} style={{ color: "#f59e0b", fontSize: "11px" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </InView>
          );
        })}
      </div>
    </section>
  );
}
