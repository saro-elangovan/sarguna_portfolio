import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { contact } from "@/lib/portfolio-data";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot
    const v = Object.fromEntries(["name", "email", "subject", "message"].map((k) => [k, String(f.get(k) || "").trim()]));
    const err: Errors = {};
    if (!v.name) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) err.email = "Please enter a valid email address.";
    if (!v.subject) err.subject = "Please add a subject.";
    if (v.message.length < 10) err.message = "Message should be at least 10 characters.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const body = `${v.message}\n\n— ${v.name} (${v.email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
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
      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto">
        <Send className="h-4 w-4" /> Send via Email
      </button>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {opened ? "Your email app should now be open with the message ready — just press send." : "This opens your email app with your message pre-filled."}
      </p>
    </form>
  );
}
