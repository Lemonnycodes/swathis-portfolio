"use client";

import { useEffect, useRef, useState } from "react";
import { getReply } from "@/lib/chat";
import { suggestedPrompts, profile, type Project } from "@/lib/portfolio";
import ProjectCard from "@/components/ProjectCard";

type Message = {
  role: "user" | "assistant";
  text: string;
  projects?: Project[];
  // While true, the assistant text is still "typing".
  streaming?: boolean;
};

export default function AskTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hi! I'm ${profile.name}'s portfolio assistant. Ask me why teams hire her, what she's shipped, or how to get in touch.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function send(raw: string) {
    const question = raw.trim();
    if (!question || busy) return;

    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: question }]);

    const reply = getReply(question);

    // Simulate a streaming token-by-token response for an "AI" feel.
    const words = reply.text.split(" ");
    let i = 0;

    // Brief "thinking" delay, then push an empty assistant message and fill it.
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "", streaming: true },
      ]);

      const interval = setInterval(() => {
        i += 1;
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            last.text = words.slice(0, i).join(" ");
            if (i >= words.length) {
              last.streaming = false;
              last.projects = reply.projects;
            }
          }
          return next;
        });
        if (i >= words.length) {
          clearInterval(interval);
          setBusy(false);
        }
      }, 28);
    }, 420);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl glass-strong shadow-glow">
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-plasma/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-signal/80" />
          <span className="ml-3 font-mono text-xs text-slate-400">
            ask-my-portfolio · live
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            online
          </span>
        </div>

        {/* Transcript */}
        <div
          ref={scrollRef}
          className="h-80 space-y-4 overflow-y-auto px-4 py-5 font-mono text-sm"
        >
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.role === "user" ? (
                <div className="flex gap-2">
                  <span className="shrink-0 text-signal">{">"}</span>
                  <span className="text-slate-200">{msg.text}</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span className="shrink-0 text-synapse-glow">✦</span>
                  <div className="text-slate-300">
                    <span className="leading-relaxed">{msg.text}</span>
                    {msg.streaming && (
                      <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-synapse-glow align-middle" />
                    )}
                    {msg.projects && msg.projects.length > 0 && (
                      <div className="mt-3 grid gap-3 font-sans sm:grid-cols-2">
                        {msg.projects.map((p) => (
                          <ProjectCard key={p.id} project={p} compact />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggested prompts */}
        <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 pt-3">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              disabled={busy}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-synapse/50 hover:text-white disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={onSubmit} className="flex gap-2 p-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything…"
            className="flex-1 rounded-lg border border-white/10 bg-ink-950/60 px-4 py-2.5 font-mono text-sm text-slate-100 outline-none transition focus:border-synapse/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-lg bg-synapse px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-synapse-glow disabled:opacity-40"
          >
            {busy ? "…" : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}
