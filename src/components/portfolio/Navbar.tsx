import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/portfolio-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => { const el = document.getElementById(n.toLowerCase()); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <a href="#home" className="leading-tight">
          <span className="block text-sm font-bold tracking-[0.18em]">SARGUNA E</span>
          <span className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground">AI & DATA SCIENCE</span>
        </a>
        <ul className="hidden gap-7 md:flex">
          {nav.map((n) => {
            const id = n.toLowerCase();
            const is = active === id;
            return (
              <li key={n}>
                <a href={`#${id}`} aria-current={is ? "true" : undefined} className={`group relative text-sm transition-colors ${is ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {n}
                  <span className={`absolute -bottom-1.5 left-0 h-px bg-brand transition-all ${is ? "w-full" : "w-0 group-hover:w-full"}`} />
                </a>
              </li>
            );
          })}
        </ul>
        <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul className="space-y-1 px-5 pb-5 md:hidden">
          {nav.map((n) => (
            <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block rounded-lg px-3 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground">{n}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}
