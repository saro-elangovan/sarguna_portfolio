import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, FileText, Mail, Phone, MapPin, Award, Briefcase, GraduationCap, ArrowUp, BarChart3, LineChart, Code2, Brain, Database, Workflow, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroVisual, ProjectVisual } from "@/components/portfolio/Visuals";
import { Reveal, SectionHeader, CountUp, Tag, Github, Linkedin } from "@/components/portfolio/Shared";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { AskAssistant } from "@/components/portfolio/AskAssistant";
import { contact, stats, skills, experience, projects, certifications, services, nav } from "@/lib/portfolio-data";

const TITLE = "Sarguna E — AI & Data Science Portfolio | Data Analyst";
const DESC = "Portfolio of Sarguna E, AI & Data Science graduate and Data Analyst skilled in Python, SQL, Power BI, and Machine Learning.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Sarguna E", jobTitle: "Data Analyst", email: contact.email, sameAs: [contact.linkedin, contact.github] }) }],
  }),
  component: Index,
});

const roles = ["Data Analytics", "Machine Learning", "Python Development", "AI-Powered Applications"];
const serviceIcons = [BarChart3, LineChart, Code2, Brain, Workflow, Database];

function Rotator() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => { if (reduce) return; const t = setInterval(() => setI((x) => (x + 1) % roles.length), 2400); return () => clearInterval(t); }, [reduce]);
  return (
    <span className="relative inline-block h-[1.4em] min-w-[14ch] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={roles[i]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.4 }} className="absolute left-0 text-accent">
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const btn = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5";

async function openResume() {
  try {
    const res = await fetch("/resume.pdf", { method: "HEAD" });
    if (res.ok) {
      window.open("/resume.pdf", "_blank", "noopener");
      return;
    }
  } catch {
    // fall through to email fallback
  }
  window.location.href = `mailto:${contact.email}?subject=Resume%20request`;
}

function Index() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({ initial: (reduce ? false : { opacity: 0, y: 20 }) as false | { opacity: number; y: number }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d } });

  return (
    <div className="relative">
      <div className="mesh pointer-events-none absolute inset-x-0 top-0 h-[120vh]" aria-hidden="true" />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2">Skip to content</a>
      <Navbar />
      <main className="relative">
        {/* HERO */}
        <section id="home" className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-16 pt-28 lg:grid-cols-2">
          <div>
            <motion.p {...fade(0)} className="font-mono text-xs tracking-[0.25em] text-accent">HELLO, I'M SARGUNA</motion.p>
            <motion.h1 {...fade(0.1)} className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Turning Data Into Insights.<br /><span className="text-gradient">Building Intelligent Solutions.</span>
            </motion.h1>
            <motion.p {...fade(0.2)} className="mt-5 text-sm text-foreground/80 sm:text-base">AI & Data Science Graduate · Data Analyst · Aspiring AI/ML Developer</motion.p>
            <motion.p {...fade(0.25)} className="mt-2 text-sm text-muted-foreground">Focused on <Rotator /></motion.p>
            <motion.p {...fade(0.3)} className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              I am an AI and Data Science graduate passionate about transforming data into meaningful insights and building intelligent solutions using Python, Machine Learning, and Data Analytics.
            </motion.p>
            <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={`${btn} bg-brand text-primary-foreground shadow-glow`}>Explore My Projects <ArrowRight className="h-4 w-4" /></a>
              <button type="button" onClick={openResume} className={`${btn} glass`}><FileText className="h-4 w-4" /> Request Resume</button>
              <a href="#contact" className={`${btn} text-muted-foreground hover:text-foreground`}>Contact Me</a>
            </motion.div>
          </div>
          <motion.div initial={reduce ? false : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <HeroVisual />
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <SectionHeader eyebrow="About" title="About Me" subtitle="Curious About Data. Passionate About Technology." />
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-foreground/85">
              I am a motivated Artificial Intelligence and Data Science graduate with hands-on experience in Python, SQL, Machine Learning, and Data Analytics. During my internship at Nexila Technologies, I cleaned and organized large datasets, built Power BI dashboards, and automated workflows. I enjoy solving real-world problems with data and am seeking entry-level opportunities in AI/ML Development and Data Analytics.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="glass rounded-2xl p-6 transition-colors hover:border-accent/50">
                <p className="text-3xl font-bold text-gradient"><CountUp to={s.value} suffix={s.suffix} /></p>
                <p className="mt-2 font-medium">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <SectionHeader eyebrow="Skills" title="Technical Skills" subtitle="Tools and techniques I use to collect, clean, analyze, and model data." />
          <div className="grid gap-5 md:grid-cols-2">
            {skills.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08} className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <h3 className="text-lg font-semibold">{g.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">{g.items.map((t) => <Tag key={t}>{t}</Tag>)}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <SectionHeader eyebrow="Experience" title="Professional Experience" />
          <div className="relative border-l border-border pl-8">
            <span className="absolute -left-[9px] top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand shadow-glow" aria-hidden="true" />
            <Reveal className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold"><Briefcase className="h-5 w-5 text-accent" /> {experience.role}</h3>
                  <p className="mt-1 text-foreground/80">{experience.company}</p>
                </div>
                <div className="text-right font-mono text-xs text-muted-foreground"><p>{experience.duration}</p><p>{experience.mode}</p></div>
              </div>
              <ul className="mt-6 space-y-3">
                {experience.points.map((p) => <li key={p} className="flex gap-3 text-sm leading-relaxed text-foreground/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{p}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">{experience.stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>
            </Reveal>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <SectionHeader eyebrow="Projects" title="Featured Projects" subtitle="Hands-on work across AI applications, machine learning, and business intelligence." />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <motion.article whileHover={{ y: reduce ? 0 : -6 }} className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-colors hover:border-accent/50">
                  <div className="border-b border-border bg-secondary/40"><ProjectVisual kind={p.visual} /></div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-foreground/85">
                      {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-accent">▹</span>{f}</li>)}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="rounded-md bg-primary/20 px-2 py-0.5 font-mono text-[11px] text-foreground/90">{t}</span>)}</div>
                    {p.note && <p className="mt-4 text-xs italic text-muted-foreground">{p.note}</p>}
                    <div className="mt-auto pt-5">
                      {p.github ? (
                        <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline" aria-label={`View ${p.title} on GitHub`}><Github className="h-4 w-4" /> View on GitHub <ExternalLink className="h-3 w-3" /></a>
                      ) : (
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Project Overview</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION + CERTS */}
        <section id="education" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <SectionHeader eyebrow="Education" title="Education" />
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="glass rounded-2xl p-6 sm:p-8">
              <GraduationCap className="h-7 w-7 text-accent" />
              <h3 className="mt-4 text-lg font-semibold">B.Tech in Artificial Intelligence & Data Science</h3>
              <p className="mt-1 text-foreground/80">Adhi College of Engineering and Technology</p>
              <p className="text-sm text-muted-foreground">Anna University · Kancheepuram, Tamil Nadu</p>
              <div className="mt-5 flex gap-3 font-mono text-xs"><Tag>2023–2027</Tag><Tag>CGPA 8.6 / 10</Tag></div>
            </Reveal>
            <Reveal delay={0.1} className="glass rounded-2xl p-6 sm:p-8">
              <GraduationCap className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Higher Secondary Education</h3>
              <p className="mt-1 text-foreground/80">Government Girls Higher Secondary School</p>
              <p className="text-sm text-muted-foreground">Villupuram, Tamil Nadu</p>
            </Reveal>
          </div>
          <h3 className="mb-6 mt-16 text-2xl font-bold">Certifications</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="glass rounded-xl p-5">
                <Award className="h-5 w-5 text-accent" />
                <p className="mt-3 text-sm font-medium">{c.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.detail}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-6xl px-5 py-24" aria-labelledby="interests">
          <SectionHeader eyebrow="Focus" title="Areas of Interest" subtitle="Capabilities I bring as an early-career data professional." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = serviceIcons[i] ?? BarChart3;
              return (
                <Reveal key={s.title} delay={i * 0.05} className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
                  <div className="inline-flex rounded-lg bg-brand p-2.5"><Icon className="h-5 w-5 text-primary-foreground" /></div>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <SectionHeader eyebrow="Contact" title="Let's Connect" subtitle="I'm always interested in learning, collaborating on meaningful projects, and exploring opportunities in Data Analytics, AI, and Machine Learning." />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <Reveal className="space-y-4">
              {[
                { I: Mail, l: contact.email, h: `mailto:${contact.email}` },
                { I: Phone, l: contact.phone, h: `tel:${contact.phone.replace(/-/g, "")}` },
                { I: MapPin, l: contact.location },
                { I: Linkedin, l: "linkedin.com/in/sargunaelangovan", h: contact.linkedin },
                { I: Github, l: "github.com/saro-elangovan", h: contact.github },
              ].map(({ I, l, h }) => {
                const inner = <><span className="rounded-lg bg-secondary p-2.5"><I className="h-4 w-4 text-accent" /></span><span className="break-all text-sm">{l}</span></>;
                return h ? <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-accent/50">{inner}</a> : <div key={l} className="glass flex items-center gap-4 rounded-xl p-4">{inner}</div>;
              })}
            </Reveal>
            <Reveal delay={0.1}><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">Sarguna E</p>
            <p className="text-sm text-muted-foreground">AI & Data Science Portfolio</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-foreground">{n}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="glass rounded-lg p-2.5"><Linkedin className="h-4 w-4" /></a>
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="glass rounded-lg p-2.5"><Github className="h-4 w-4" /></a>
            <a href="#home" aria-label="Back to top" className="rounded-lg bg-brand p-2.5"><ArrowUp className="h-4 w-4 text-primary-foreground" /></a>
          </div>
        </div>
        <p className="pb-8 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Sarguna E. All rights reserved.</p>
      </footer>
      <AskAssistant />
    </div>
  );
}
