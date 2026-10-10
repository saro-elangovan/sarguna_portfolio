import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    e.preventDefault();
    const f = new FormData(form);
    if (f.get("website")) return; // honeypot
    const g = (k: string) => String(f.get(k) || "").trim();
    const v = { name: g("name"), email: g("email"), subject: g("subject"), message: g("message") };
    const err: Errors = {};
    if (!v.name) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) err.email = "Please enter a valid email address.";
    if (!v.subject) err.subject = "Please add a subject.";
    if (v.message.length < 10) err.message = "Message should be at least 10 characters.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("sending");
    const { error } = await supabase.from("contact_messages").insert(v);
    if (error) return setState("error");
    form.reset();
    setState("sent");
  }

  const field = "mt-1.5 w-full rounded-lg border border-input bg-secondary px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none";
  const Err = ({ k }: { k: keyof Errors }) => errors[k] ? <p id={`${k}-err`} role="alert" className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="glass space-y-4 rounded-2xl p-6 sm:p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        {(["name", "email"] as const).map((k) => (
          <div key={k}>
            <label htmlFor={k} className="text-sm font-medium capitalize">{k} <span className="text-muted-foreground">(required)</span></label>
            <input id={k} name={k} type={k === "email" ? "email" : "text"} required aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={field} />
            <Err k={k} />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-medium">Subject <span className="text-muted-foreground">(required)</span></label>
        <input id="subject" name="subject" required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-err" : undefined} className={field} />
        <Err k="subject" />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">Message <span className="text-muted-foreground">(required)</span></label>
        <textarea id="message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={field} />
        <Err k="message" />
      </div>
      <button type="submit" disabled={state === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto">
        <Send className="h-4 w-4" /> {state === "sending" ? "Sending…" : "Send Message"}
      </button>
      <p aria-live="polite" className={`text-sm ${state === "error" ? "text-destructive" : "text-accent"}`}>
        {state === "sent" && "Thank you! Your message has been sent — Sarguna will get back to you soon."}
        {state === "error" && "Sorry, your message couldn't be sent. Please try again or email directly."}
      </p>
    </form>
  );
}
