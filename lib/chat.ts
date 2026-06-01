import {
  intents,
  fallbackAnswer,
  projects,
  type Project,
} from "@/lib/portfolio";

export type ChatReply = {
  text: string;
  projects: Project[];
};

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "do", "you", "your", "my", "me", "i",
  "of", "to", "and", "or", "what", "whats", "how", "for", "in", "on",
  "with", "about", "tell", "can", "could", "would", "please",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

// Score each intent by how strongly the question matches its patterns.
// A phrase pattern that appears verbatim wins big; otherwise we count
// overlapping significant tokens.
function scoreIntent(question: string, patterns: string[]): number {
  const q = question.toLowerCase();
  const qTokens = new Set(tokenize(question));
  let score = 0;

  for (const pattern of patterns) {
    const p = pattern.toLowerCase();
    // Multi-word patterns only count on a full phrase match, so a generic word
    // inside them (e.g. "get" in "get in touch") can't trigger the intent.
    if (p.includes(" ")) {
      if (q.includes(p)) score += 6;
      continue;
    }
    // Single-word pattern: an exact significant-word match, or a long substring.
    if (qTokens.has(p)) score += 3;
    else if (p.length >= 5 && q.includes(p)) score += 1;
  }
  return score;
}

export function getReply(question: string): ChatReply {
  const trimmed = question.trim();
  if (!trimmed) {
    return { text: fallbackAnswer, projects: [] };
  }

  let best = { score: 0, index: -1 };
  intents.forEach((intent, index) => {
    const score = scoreIntent(trimmed, intent.patterns);
    if (score > best.score) best = { score, index };
  });

  // Require a real signal (one exact keyword = 3, or a phrase hit) so random
  // off-topic questions fall through to the honest fallback instead of
  // matching something unrelated.
  if (best.index === -1 || best.score < 3) {
    return { text: fallbackAnswer, projects: [] };
  }

  const intent = intents[best.index];
  const refs = (intent.projects ?? [])
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  return { text: intent.answer, projects: refs };
}
