import type { Project } from "@/lib/portfolio";

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl glass transition duration-300 hover:border-synapse/40 hover:shadow-glow ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-synapse/20 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-0"
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-2">
        <h3
          className={`font-semibold text-white ${
            compact ? "text-base" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        {project.status && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-[11px] font-medium text-signal">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            {project.status}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {compact ? project.detail : project.blurb}
      </p>

      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-lg font-semibold gradient-text">
                {m.value}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-signal hover:text-signal-glow"
        >
          View project <span aria-hidden>→</span>
        </a>
      )}
    </article>
  );
}
