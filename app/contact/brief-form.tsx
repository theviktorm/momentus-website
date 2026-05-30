"use client";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

/**
 * BriefForm — client-side form for the /contact page. POSTs to /api/contact;
 * on success it swaps for a confirmation card. Validation is intentionally
 * minimal — required fields only — because the goal is conversational handoff
 * to a human, not a structured lead-qualification engine.
 */
export function BriefForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("submit failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="glass relative overflow-hidden rounded-2xl p-8"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
              <Check size={16} strokeWidth={3} />
            </span>
            <div>
              <h3 className="font-display text-xl font-medium tracking-tight">
                Got it.
              </h3>
              <p className="mt-2 text-sm text-white/65">
                Reply within one business day.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" name="firstName" required />
            <Field label="Last name" name="lastName" required />
          </div>
          <Field label="Company email" name="email" type="email" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company name" name="company" required />
            <Field label="Website" name="website" placeholder="https://" />
          </div>
          <Select label="Annual revenue" name="revenue" required>
            <option value="">Select range</option>
            <option>$5M–$25M</option>
            <option>$25M–$100M</option>
            <option>$100M–$500M</option>
            <option>$500M+</option>
          </Select>
          <Select label="Current GEO investment" name="geo" required>
            <option value="">Select</option>
            <option>None</option>
            <option>In-house</option>
            <option>Agency</option>
            <option>Other</option>
          </Select>
          <Select label="Current paid spend per month" name="paidSpend" required>
            <option value="">Select range</option>
            <option>{"<$25K"}</option>
            <option>$25K–$100K</option>
            <option>$100K–$500K</option>
            <option>$500K+</option>
          </Select>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-white/55">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Where you are, what would make the next 90 days a clear win."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 transition focus:bg-white/[0.05]"
            />
          </div>

          {state === "error" ? (
            <p className="text-sm text-red-300">
              Something went wrong. Try again or email viktor@momentus.ai directly.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={state === "submitting"}
            className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft disabled:opacity-60"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {state === "submitting" ? "Sending…" : "Send brief"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-white/55">
        {label}
        {required ? <span className="ml-1 text-accent/70">*</span> : null}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 transition focus:bg-white/[0.05]"
      />
    </div>
  );
}

function Select({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-white/55">
        {label}
        {required ? <span className="ml-1 text-accent/70">*</span> : null}
      </label>
      <select
        name={name}
        required={required}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition focus:bg-white/[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffffff80' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          paddingRight: "2.5rem",
        }}
      >
        {children}
      </select>
    </div>
  );
}
