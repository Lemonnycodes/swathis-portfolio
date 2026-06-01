import NeuralBackground from "@/components/NeuralBackground";
import AskTerminal from "@/components/AskTerminal";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { profile, value, story, projects, skills } from "@/lib/portfolio";

export default function Home() {
  return (
    <>
      <NeuralBackground />

      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-ink-950/50 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a href="#top" className="font-mono text-sm font-semibold text-white">
            {profile.handle}
          </a>
          <div className="hidden gap-6 text-sm text-slate-400 sm:flex">
            <a href="#ask" className="hover:text-white">Ask</a>
            <a href="#why" className="hover:text-white">Why me</a>
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#story" className="hover:text-white">Story</a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg border border-synapse/40 bg-synapse/10 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-synapse/20"
            >
              Email
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-5">
        {/* Hero */}
        <section className="flex min-h-[88vh] flex-col justify-center py-20">
          <Reveal>
            <span className="tag mb-6 gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {profile.status}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 font-mono text-lg gradient-text font-semibold sm:text-2xl">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#ask"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-synapse via-synapse-glow to-synapse bg-[length:200%_auto] px-6 py-3 font-semibold text-white shadow-glow transition animate-shimmer hover:shadow-[0_0_55px_-6px_rgba(124,92,255,0.75)]"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden
                />
                Ask my portfolio →
              </a>
              <a
                href="#work"
                className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
              >
                See the work
              </a>
            </div>
          </Reveal>
        </section>

        {/* Ask terminal */}
        <section id="ask" className="scroll-mt-20 py-16">
          <Reveal className="mb-8 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-synapse-glow">
              Interactive
            </h2>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Don&apos;t read a résumé. Interrogate it.
            </p>
            <p className="mt-2 text-slate-400">
              I built an assistant that answers for me : go ahead, ask it
              something.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <AskTerminal />
          </Reveal>
        </section>

        {/* Why you need me */}
        <section id="why" className="scroll-mt-20 py-16">
          <Reveal className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-signal">
              Why me
            </h2>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {value.heading}
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {value.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition hover:border-signal/40 hover:shadow-glow-cyan">
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-signal/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold gradient-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-300">
                    {item.proof}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-20 py-16">
          <Reveal className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-signal">
              Selected work
            </h2>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Things I&apos;ve shipped
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-20 py-16">
          <Reveal className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-plasma">
              Stack
            </h2>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              What I build with
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 80}>
                <div className="rounded-2xl glass p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wide text-slate-400">
                    {group.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Story */}
        <section id="story" className="scroll-mt-20 py-16">
          <Reveal className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-synapse-glow">
              My story
            </h2>
            <p className="mt-2 max-w-3xl text-2xl font-bold text-white sm:text-3xl">
              {story.heading}
            </p>
          </Reveal>
          <div className="space-y-5 border-l-2 border-synapse/30 pl-6">
            {story.paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8" delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {story.education.map((ed) => (
                <div key={ed.school} className="rounded-2xl glass p-5">
                  <div className="font-mono text-xs text-slate-500">
                    {ed.period}
                  </div>
                  <div className="mt-1 font-semibold text-white">
                    {ed.school}
                  </div>
                  <div className="text-sm text-slate-400">{ed.degree}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <footer className="border-t border-white/5 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <a href="#top" className="font-mono text-sm font-semibold text-white">
              {profile.handle}
            </a>
            <div className="flex gap-5 text-sm text-slate-400">
              <a href={`mailto:${profile.email}`} className="hover:text-white">
                Email
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </div>
            <p className="font-mono text-xs text-slate-600">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
