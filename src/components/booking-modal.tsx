import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { X, ArrowRight, Loader2, CheckCircle2, Calendar, Mail, Phone } from "lucide-react";
import confetti from "canvas-confetti";
import { services } from "@/lib/services-data";

// ─── Config ───────────────────────────────────────────────
const CAL_USERNAME = "masterguides-australia";
const CAL_EVENT = "discovery-call";

// ─── Types ────────────────────────────────────────────────
type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
};

type ContextValue = { openModal: () => void };

// ─── Context ──────────────────────────────────────────────
const Ctx = createContext<ContextValue>({ openModal: () => {} });
export const useBookingModal = () => useContext(Ctx);

// ─── Service options ──────────────────────────────────────
const SERVICE_OPTIONS = [
  "Discovery Call",
  ...services.filter((s) => s.slug !== "initial-consultations").map((s) => s.title),
  "Initial Consultation",
];

// ─── Provider (mount once in root) ────────────────────────
export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [calLoaded, setCalLoaded] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", email: "", service: SERVICE_OPTIONS[0],
  });

  const openModal = () => {
    setStep(1);
    setCalLoaded(false);
    setForm({ name: "", phone: "", email: "", service: SERVICE_OPTIONS[0] });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes (only on steps 1 & 2 — not confirmation)
  useEffect(() => {
    if (!open || step === 3) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, step]);

  // Listen for Cal.com booking confirmation postMessage
  useEffect(() => {
    if (!open || step !== 2) return;
    const handler = (e: MessageEvent) => {
      const type = e.data?.type ?? "";
      if (type === "bookingSuccessful" || type === "CAL:bookingSuccessful") {
        setStep(3);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [open, step]);

  const calUrl =
    `https://cal.com/${CAL_USERNAME}/${CAL_EVENT}` +
    `?name=${encodeURIComponent(form.name)}` +
    `&email=${encodeURIComponent(form.email)}` +
    `&phone=${encodeURIComponent(form.phone)}` +
    `&notes=${encodeURIComponent(form.service)}` +
    `&embed=1&embedType=inline&theme=light`;

  const modalWidth = step === 2 ? 820 : 480;

  return (
    <Ctx.Provider value={{ openModal }}>
      {children}

      {open && (
        <>
          {/* Backdrop — not clickable on confirmation step */}
          <div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={step !== 3 ? closeModal : undefined}
          />

          {/* Modal */}
          <div
            className="fixed inset-x-4 top-1/2 z-[201] -translate-y-1/2 overflow-hidden rounded-2xl bg-background shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full"
            style={{ maxWidth: modalWidth, maxHeight: "90vh", overflowY: "auto" }}
          >
            {step === 1 && (
              <StepForm
                form={form}
                setForm={setForm}
                onNext={() => { setStep(2); setCalLoaded(false); }}
                onClose={closeModal}
              />
            )}
            {step === 2 && (
              <StepCalendar
                calUrl={calUrl}
                loaded={calLoaded}
                onLoaded={() => setCalLoaded(true)}
                onClose={closeModal}
              />
            )}
            {step === 3 && (
              <StepConfirmation form={form} onClose={closeModal} />
            )}
          </div>
        </>
      )}
    </Ctx.Provider>
  );
}

// ─── Step 1: Form ─────────────────────────────────────────
function StepForm({
  form, setForm, onNext, onClose,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-foreground/40">
            Book a Consultation
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight">
            Let's get started
          </h2>
          <p className="mt-1.5 text-sm text-foreground/50">
            Fill in your details and we'll pre-fill the booking form for you.
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground/40 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <Field label="Full Name" error={errors.name}>
          <input type="text" placeholder="Your full name" autoComplete="name"
            value={form.name} onChange={set("name")} className={input(!!errors.name)} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Phone Number" error={errors.phone}>
            <input type="tel" placeholder="+61 4xx xxx xxx" autoComplete="tel"
              value={form.phone} onChange={set("phone")} className={input(!!errors.phone)} />
          </Field>
          <Field label="Email Address" error={errors.email}>
            <input type="email" placeholder="you@email.com" autoComplete="email"
              value={form.email} onChange={set("email")} className={input(!!errors.email)} />
          </Field>
        </div>

        <Field label="Preferred Service">
          <select value={form.service} onChange={set("service")} className={input(false)}>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <button
        onClick={() => validate() && onNext()}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
      >
        Next — Choose a Time
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Step 2: Cal.com embed ────────────────────────────────
function StepCalendar({
  calUrl, loaded, onLoaded, onClose,
}: {
  calUrl: string;
  loaded: boolean;
  onLoaded: () => void;
  onClose: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <p className="text-sm font-semibold text-foreground">Choose a time</p>
        <button
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/40 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="relative" style={{ height: 620 }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
          </div>
        )}
        <iframe
          src={calUrl}
          onLoad={onLoaded}
          className="h-full w-full"
          style={{ border: "none", opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
          title="Book a meeting"
          allow="camera; microphone; payment"
        />
      </div>
    </div>
  );
}

// ─── Step 3: Confirmation ─────────────────────────────────
function StepConfirmation({ form, onClose }: { form: FormData; onClose: () => void }) {
  useEffect(() => {
    const fire = (opts: confetti.Options) =>
      confetti({ zIndex: 9999, disableForReducedMotion: true, ...opts });

    // Two-burst spread from left and right
    fire({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0, y: 0.65 }, colors: ["#00417c", "#d8e8f5", "#ffffff"] });
    fire({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.65 }, colors: ["#00417c", "#d8e8f5", "#ffffff"] });

    // Second wave after a short delay
    const t = setTimeout(() => {
      fire({ particleCount: 40, angle: 75, spread: 55, origin: { x: 0.1, y: 0.7 }, colors: ["#1a3a5c", "#d8e8f5", "#ffffff"] });
      fire({ particleCount: 40, angle: 105, spread: 55, origin: { x: 0.9, y: 0.7 }, colors: ["#1a3a5c", "#d8e8f5", "#ffffff"] });
    }, 300);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center px-8 py-12 text-center">
      {/* Icon */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "#00417c" }}
      >
        <CheckCircle2 className="h-8 w-8 text-white" />
      </div>

      {/* Heading */}
      <h2 className="mt-6 font-display text-3xl font-bold leading-tight">
        You're all booked in!
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/60">
        A calendar invitation has been sent to your email. We look forward to speaking with you,{" "}
        <span className="font-semibold text-foreground">{form.name.split(" ")[0]}</span>.
      </p>

      {/* Details card */}
      <div className="mt-8 w-full rounded-2xl bg-secondary p-6 text-left space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#00417c" }}>
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/40">Service</p>
            <p className="font-semibold text-foreground">{form.service}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#00417c" }}>
            <Mail className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/40">Confirmation sent to</p>
            <p className="font-semibold text-foreground">{form.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#00417c" }}>
            <Phone className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/40">We'll also call you on</p>
            <p className="font-semibold text-foreground">{form.phone}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-8 w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
      >
        Done
      </button>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function input(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground",
    "placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/20",
    hasError ? "border-red-400" : "border-border",
  ].join(" ");
}
