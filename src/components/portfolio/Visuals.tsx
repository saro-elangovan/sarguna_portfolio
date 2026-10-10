import { Database, Brain, BarChart3 } from "lucide-react";

export function HeroVisual() {
  const bars = [40, 65, 50, 82, 70, 95, 60];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-8 rounded-full bg-brand opacity-25 blur-3xl" />
      {/* Neural network */}
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
        {[60, 150, 240].flatMap((x1, i) =>
          i < 2
            ? [70, 150, 230].flatMap((y1) =>
                [70, 150, 230].map((y2) => (
                  <line key={`${x1}-${y1}-${y2}`} x1={x1} y1={y1} x2={x1 + 90} y2={y2} stroke="var(--border)" strokeWidth="1" />
                )),
              )
            : [],
        )}
        {[60, 150, 240].flatMap((x) =>
          [70, 150, 230].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="7" fill="var(--accent)" opacity="0.8" />),
        )}
      </svg>
      <div className="glass float-slow absolute left-0 top-6 rounded-xl p-4 shadow-glow">
        <p className="font-mono text-[10px] text-muted-foreground">accuracy</p>
        <p className="text-2xl font-bold text-gradient">87%</p>
      </div>
      <div className="glass float-fast absolute bottom-6 right-0 w-44 rounded-xl p-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground"><BarChart3 className="h-3.5 w-3.5" /> Insights</div>
        <div className="flex h-16 items-end gap-1.5">
          {bars.map((h, i) => <div key={i} className="flex-1 rounded-sm bg-brand" style={{ height: `${h}%` }} />)}
        </div>
      </div>
      <div className="glass float-fast absolute right-4 top-2 rounded-xl p-3"><Database className="h-6 w-6 text-accent" /></div>
      <div className="glass float-slow absolute bottom-10 left-6 rounded-xl p-3"><Brain className="h-6 w-6 text-primary" /></div>
      <div className="glass absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl px-4 py-3 font-mono text-[11px] leading-relaxed">
        <span className="text-accent">model</span>.fit(X, y)<br />
        <span className="text-muted-foreground"># insights ✓</span>
      </div>
    </div>
  );
}

export function ProjectVisual({ kind }: { kind: "chat" | "ml" | "dash" }) {
  if (kind === "chat")
    return (
      <div className="space-y-2 p-5" aria-hidden="true">
        <div className="ml-auto w-3/5 rounded-xl rounded-br-sm bg-primary/70 px-3 py-2 text-[11px]">I've been feeling stressed…</div>
        <div className="w-4/5 rounded-xl rounded-bl-sm bg-secondary px-3 py-2 text-[11px] text-muted-foreground">I'm here to listen. Here are some resources that may help…</div>
        <div className="flex items-center gap-2 pt-2 font-mono text-[10px] text-accent">docs → embed → retrieve → Gemini</div>
      </div>
    );
  if (kind === "ml")
    return (
      <div className="flex items-center justify-between gap-1 p-5 font-mono text-[10px]" aria-hidden="true">
        {["Data", "Clean", "Train", "Predict"].map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div className="rounded-lg border border-border bg-secondary px-2 py-3 text-center">{s}</div>
            {i < 3 && <span className="text-accent">→</span>}
          </div>
        ))}
      </div>
    );
  return (
    <div className="grid grid-cols-3 gap-2 p-5" aria-hidden="true">
      {["Headcount", "Attrition", "Rate"].map((k) => (
        <div key={k} className="rounded-lg bg-secondary p-2"><p className="text-[9px] text-muted-foreground">{k}</p><div className="mt-1 h-2 w-3/4 rounded bg-brand" /></div>
      ))}
      <div className="col-span-2 flex h-14 items-end gap-1 rounded-lg bg-secondary p-2">
        {[50, 80, 35, 65, 90].map((h, i) => <div key={i} className="flex-1 rounded-sm bg-accent/80" style={{ height: `${h}%` }} />)}
      </div>
      <div className="flex items-center justify-center rounded-lg bg-secondary">
        <div className="h-10 w-10 rounded-full" style={{ background: "conic-gradient(var(--primary) 0 60%, var(--accent) 60% 85%, var(--violet) 85%)", mask: "radial-gradient(circle, transparent 45%, black 46%)" }} />
      </div>
      <p className="col-span-3 text-[9px] text-muted-foreground">Sample visual · illustrative only</p>
    </div>
  );
}
