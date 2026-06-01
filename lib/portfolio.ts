// ============================================================================
//  EDIT THIS FILE — it drives the entire site and the "Ask my portfolio" chat.
//  Content is pulled from Swathi Sankar's resume. Employer NAMES are
//  anonymized on purpose; the achievements are real. Adjust anything freely.
// ============================================================================

export const profile = {
  name: "Swathi Sankar",
  // Stylized handle used as the logo/wordmark in the nav and footer.
  handle: "swathiiii",
  // Short role line shown under your name and in the browser tab.
  role: "Software Engineer · AI Systems",
  // One sentence that captures your pitch: the hook, not a job title.
  tagline:
    "Give me the ambiguous, unglamorous problem and I'll ship the solution that lasts. I reach for AI when it earns its place, and lean on solid engineering always.",
  // The short status badge in the hero.
  status: "Open to AI / ML Engineering roles",
  // TODO: confirm how public you want this to be.
  location: "United States · Open to relocation",
  email: "swathidharmasankaran@gmail.com",
  links: {
    github: "https://github.com/Lemonnycodes",
    linkedin: "https://www.linkedin.com/in/rdsus/",
    resume: "/resume.pdf", // drop your PDF in /public, or hide this button
  },
};

// The case for hiring you — punchy value props, each backed by a real number.
export const value = {
  heading: "Why teams hand me the hard problems",
  items: [
    {
      title: "I ship AI people actually use",
      proof:
        "A RAG search that three of four sales teams now run daily, with 400+ searches in the first month. It wasn't a demo. It became a habit.",
    },
    {
      title: "I make slow things disappear",
      proof:
        "Three-day report prep cut to one hour. Lead research from 18 minutes down to 8. I find the bottleneck and get rid of it.",
    },
    {
      title: "I bring engineering rigor to AI",
      proof:
        "I refactored legacy Flask into modular FastAPI and drove integration test failures from 5+ a sprint to zero. AI that survives production.",
    },
    {
      title: "Drop me in anywhere",
      proof:
        "Startup, open-source nonprofit, university research, Fortune-50 telecom. Same outcome every time: it ships, and it lasts.",
    },
  ],
};

// Your story — the narrative a resume can't tell. Edit the personal bits freely.
export const story = {
  heading: "I'm not chasing a title. I'm chasing a problem worth out-working.",
  paragraphs: [
    "On every team I've been on, my job comes down to the same thing: getting what actually matters out of the demo and into people's daily work. I've done that at an AI sales-tech startup, an open-source nonprofit, a university research lab, and now a Fortune-50 telecom.",
    "I gravitate to the part most people skip. The search tool a team ends up opening every day. The pipeline that quietly turns a three-day report into an hour. A model that only runs in a notebook isn't done to me. I get it into production and keep it running.",
    // TODO (make this YOURS): replace this line with one real, specific detail.
    // What actually pulled you to AI, or a moment a hard problem hooked you.
    // One honest sentence here beats a paragraph of polish, and it's what recruiters remember.
    "I'm at my best when a problem is messy and nobody's sure where to start. I dig in, figure out what I'm missing, and stay with it until it holds up. That part is the reason I do this work.",
  ],
  education: [
    {
      school: "George Mason University",
      degree: "M.S., Computer Science",
      period: "2022 to 2024",
    },
    {
      school: "SRM Institute of Science and Technology",
      degree: "B.Tech, Computer Science & Engineering",
      period: "2018 to 2022",
    },
  ],
};

// Anonymized roles — real, quantified achievements. Rename `org` anytime.
export type Job = {
  role: string;
  org: string;
  period: string;
  points: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    role: "Software Engineer",
    org: "Major US Telecom (Fortune 50)",
    period: "2025 to Present",
    points: [
      "Built an LLM pipeline that summarizes 456 weekly field alerts and auto-publishes them, cutting report prep from 3 days to 1 hour across 17 markets.",
      "Refactored legacy Flask into modular FastAPI, driving integration test failures from 5+ a sprint to zero.",
    ],
    tags: ["LLMs", "FastAPI", "Python"],
  },
  {
    role: "Backend Engineer",
    org: "AI Sales-Tech Startup",
    period: "2024 to 2025",
    points: [
      "Shipped RAG semantic search over 5,000+ CRM records with LangChain and LLMs, reaching 400+ searches a day and adopted by 3 of 4 sales teams.",
      "Built NLP intent and summary extraction that cut lead research time from 18 minutes to 8.",
    ],
    tags: ["RAG", "LangChain", "Django", "NLP"],
  },
  {
    role: "Graduate Research Assistant",
    org: "George Mason University",
    period: "2023 to 2024",
    points: [
      "Built ensemble ML models (AdaBoost, MLP, XGBoost) hitting 95% accuracy for personalized reading interventions — deployed in 120+ real sessions.",
    ],
    tags: ["XGBoost", "Ensemble ML", "Research"],
  },
  {
    role: "Full-Stack Engineer (Open Source)",
    org: "Nonprofit Org",
    period: "2024 to 2025",
    points: [
      "Cut page load from 4.6s to 2.9s and halved component bug reports with modular React + Node.js and strong test coverage.",
    ],
    tags: ["React", "Node.js", "Testing"],
  },
];

export type Project = {
  id: string;
  title: string;
  blurb: string;
  detail: string; // longer text surfaced in the chat
  tags: string[];
  metrics?: { label: string; value: string }[];
  link?: string;
  status?: string; // optional badge, e.g. "Building now"
  keywords: string[];
};

export const projects: Project[] = [
  {
    id: "saveit",
    title: "SaveIt",
    status: "Building now",
    blurb:
      "An AI save manager I'm building: it reads what you save, structures it, and resurfaces the right thing at the right moment, so your saves stop dying in a graveyard.",
    detail:
      "My own product, in progress. You paste a link (or an Instagram/LinkedIn export) and an LLM reads the page, pulls out a clean title, summary, action items, and content type, then stores it with a vector embedding. Search is semantic, so 'that pasta recipe' finds the right save even when those words never appear on the page. The bigger idea is a coach, not a library: it learns your patterns and nudges you to act on what you saved. Built on Next.js with the Anthropic API (Haiku) for extraction, OpenAI embeddings, Supabase pgvector for search, and the Jina reader for fetching.",
    tags: ["Next.js", "Anthropic API", "OpenAI Embeddings", "Supabase", "pgvector", "Jina Reader", "RAG"],
    keywords: ["saveit", "save it", "save manager", "bookmark", "bookmarks", "semantic search", "embeddings", "rag", "vector", "pgvector", "claude", "haiku", "llm", "side project", "personal project", "building", "product", "idea"],
  },
  {
    id: "job-match",
    title: "Job Match Pro",
    blurb:
      "An NLP job recommender that extracts skills with DistilBERT + TF-IDF and matches roles by location.",
    detail:
      "A Flask job-recommendation engine with 95% skill-extraction accuracy using DistilBERT and TF-IDF. Geocoded 98% of cities within a 50-mile radius to sharpen match quality, and tuned SQL queries to a 2.5s response per request.",
    tags: ["Python", "Flask", "DistilBERT", "TF-IDF", "PySpark", "SQL"],
    metrics: [
      { label: "Skill extraction", value: "95%" },
      { label: "Query response", value: "2.5s" },
    ],
    keywords: ["job", "match", "nlp", "distilbert", "tf-idf", "recommender", "ml", "best", "strongest", "favorite", "proudest"],
  },
  {
    id: "fire-evac",
    title: "Fire Evacuation Simulator",
    blurb:
      "A real-time evacuation system combining Q-learning with A* pathfinding for adaptive routing.",
    detail:
      "A real-time hybrid fire-evacuation simulator using reinforcement learning (Q-learning) alongside A* search. Adaptive routing cut evacuation time by 25% and reached an 80% simulation success rate.",
    tags: ["Python", "Reinforcement Learning", "Q-learning", "A*", "Pygame"],
    metrics: [
      { label: "Faster evac", value: "25%" },
      { label: "Sim success", value: "80%" },
    ],
    keywords: ["fire", "evacuation", "reinforcement", "q-learning", "rl", "pathfinding", "simulation", "ml"],
  },
  {
    id: "ai-portfolio",
    title: "Ask-My-Portfolio (this site)",
    blurb:
      "This AI-native portfolio: an in-browser assistant, intent routing, and a generative neural background.",
    detail:
      "The site you're on. The assistant answers questions about me using client-side intent matching over a structured knowledge base. It's instant, costs nothing to run, and is built so the engine can swap to a hosted LLM with a one-line change. The neural background is hand-rolled on canvas, no libraries.",
    tags: ["Next.js", "TypeScript", "Client-side RAG", "Canvas"],
    metrics: [
      { label: "Response", value: "<50ms" },
    ],
    keywords: ["portfolio", "this site", "chat", "assistant", "frontend", "next.js", "how did you build"],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "AI / ML",
    items: ["LLMs", "RAG workflows", "LangChain", "LlamaIndex", "Vector Search", "OpenAI APIs", "NLP", "DistilBERT", "XGBoost", "Reinforcement Learning"],
  },
  {
    label: "Languages",
    items: ["Python", "C++", "Java", "JavaScript", "SQL"],
  },
  {
    label: "Backend & Web",
    items: ["FastAPI", "Django", "Flask", "Node.js", "Express.js", "Spring Boot", "React", "REST"],
  },
  {
    label: "Data & Cloud",
    items: ["PostgreSQL", "MongoDB", "AWS", "GCP", "Docker", "Jenkins", "PySpark", "CI/CD"],
  },
];

// ============================================================================
//  Chat knowledge base. The in-browser assistant matches a visitor's question
//  against these intents (by keyword overlap) and replies with `answer`.
// ============================================================================

export type Intent = {
  id: string;
  patterns: string[];
  answer: string;
  projects?: string[]; // project ids to show as cards under the answer
};

export const intents: Intent[] = [
  {
    id: "why-hire",
    patterns: ["why should we hire", "why you", "why are you needed", "why hire you", "what makes you different", "stand out", "why should i hire", "convince me", "what do you bring"],
    answer:
      "Honestly? Because I finish things. Plenty of people can stand up a slick prototype, I'm the one who gets it into real hands and keeps it alive once people depend on it. Hand me a messy problem with no obvious answer and a deadline, and that's exactly where I do my best work. Want specifics? Ask about my strongest project or my AI work.",
  },
  {
    id: "work-ethic",
    patterns: ["hard worker", "grit", "work ethic", "hungry", "motivated", "drive", "dedicated", "hard work"],
    answer:
      "I don't really stop until a thing actually works. I'm not in it for the title, I'm in it for the problem. Whatever I'm missing, I go learn it and stay with it until it holds up. That's been the same whether I was at a startup, a nonprofit, a research lab, or a big telecom. Curious what that looked like day to day? Ask about my experience.",
  },
  {
    id: "story",
    patterns: ["your story", "tell me about yourself", "journey", "your background", "about you", "who is swathi"],
    answer:
      "Short version: I keep ending up as the person who drags the thing out of the demo and into people's actual workflow. I've done that at an AI sales-tech startup, an open-source nonprofit, a university research lab, and now a Fortune-50 telecom. Different teams, same job. Want the work that came out of it? Ask about my projects or my AI work.",
  },
  {
    id: "ai-experience",
    patterns: ["ai experience", "ml experience", "llm", "rag", "machine learning", "what ai", "ai work", "production ai", "shipped"],
    answer:
      "Quite a bit, and the part I care about is that it's real, not notebook demos. I've built an LLM pipeline that chews through hundreds of weekly alerts and publishes the summary itself, RAG semantic search over thousands of records that a sales org actually adopted, and NLP that cut research time by more than half. A couple of those live here:",
    projects: ["job-match", "fire-evac"],
  },
  {
    id: "strongest-project",
    patterns: ["best project", "strongest", "favorite project", "proudest", "impressive", "favourite"],
    answer:
      "Probably Job Match Pro. It's an NLP job recommender that pulls skills out of messy postings with about 95% accuracy, geocodes most cities within range, and still answers in a couple of seconds. I like it because it's where the modeling and the boring-but-crucial engineering both had to be right. Take a look:",
    projects: ["job-match"],
  },
  {
    id: "experience",
    patterns: ["experience", "where have you worked", "job", "career", "roles", "work history", "backend"],
    answer:
      "I've bounced across the stack: an LLM reporting pipeline and FastAPI services at a Fortune-50 telecom, RAG and NLP features at an AI sales-tech startup, and ensemble ML research back in grad school. Pick whichever one sounds interesting and I'll go deeper on it.",
  },
  {
    id: "swe-strength",
    patterns: ["software engineer", "swe", "systems", "production", "scale", "reliable", "good engineer", "backend"],
    answer:
      "Engineering is the part I trust most about myself. I've torn legacy Flask apart and rebuilt it as clean FastAPI, designed Django and Postgres services, sped up slow queries, and shipped through real CI/CD. None of the AI stuff would survive contact with production without that. Want to see where it shows up? Ask about my stack.",
  },
  {
    id: "stack",
    patterns: ["stack", "tools", "technologies", "languages", "tech", "skills", "what do you use"],
    answer:
      "Python and SQL are home base, with JavaScript, Java, and C++ in the mix. On the AI side: LangChain, LlamaIndex, RAG, vector search, OpenAI APIs, DistilBERT, XGBoost. For actually shipping: FastAPI, Django, Flask, React, PostgreSQL, AWS/GCP, Docker, CI/CD. The Skills section has the full picture if you want it.",
  },
  {
    id: "education",
    patterns: ["education", "degree", "study", "school", "university", "masters", "gmu", "background"],
    answer:
      "I've got an M.S. in Computer Science from George Mason and a B.Tech in CSE before that. The grad work I'm proudest of was building ensemble models that hit around 95% accuracy to personalize reading help for kids. Happy to get into the AI work that came after if you want.",
  },
  {
    id: "this-site",
    patterns: ["this site", "this portfolio", "how does this work", "how did you build", "chat", "are you real ai"],
    answer:
      "Fair question. This whole site is something I built, not a template, and the assistant you're talking to runs entirely in your browser. It matches your question against a little knowledge base, so it's instant and costs nothing to run, and it's wired so a real hosted LLM could drop in with one change. Want to see it as a project card?",
    projects: ["ai-portfolio"],
  },
  {
    id: "contact",
    patterns: ["contact", "email", "hire", "reach", "get in touch", "available", "resume", "cv", "hiring"],
    answer: `Easiest is email: ${profile.email}. My LinkedIn and GitHub are linked on this page. Happy to talk about potential SWE / AI engineering roles.`,
  },
  {
    id: "greeting",
    patterns: ["hello", "hi", "hey", "who are you", "introduce", "yourself"],
    answer: `Hey! I'm a stand-in for ${profile.name}. Ask me anything, like why a team should hire her, what she's actually shipped, or how to reach her. There are a few suggestions below if you want a starting point.`,
  },
];

export const fallbackAnswer =
  "I don't have a scripted answer for that one yet. Try asking about my production AI work, my strongest project, my engineering background, my stack, or how to reach me.";

export const suggestedPrompts = [
  "Why should we hire you?",
  "Show me your AI experience",
  "What's your story?",
  "How do I reach you?",
];
