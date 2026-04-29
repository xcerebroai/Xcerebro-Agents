<div align="center">

# 🧠 Xcerebro Agents

### The Operator's Toolkit — 184 Specialized AI Agents

*Private collection. For members only.*

</div>

---

## What this is

You're looking at **184 specialized AI agents** — each one a focused expert with a defined personality, mission, non-negotiables, and deliverable expectations. They are not generic prompts. They are pre-loaded specialists you can activate by name in Claude Code, Cursor, GitHub Copilot, and 8 other AI coding tools.

Think of it as your AI dream team:
- A **Backend Architect** who designs production systems
- A **Reality Checker** who refuses to certify work without evidence
- A **Discovery Coach** who preps you for sales calls with surgical precision
- A **Paid Media Auditor** who runs a 200-point account review
- A **Content Creator** who writes in platform-native voice, not generic AI slop

184 of them. Across **15 divisions**. All ready to run.

---

## ⚡ Setup in 60 seconds

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/xcerebroai/Xcerebro-Agents.git
cd Xcerebro-Agents
\`\`\`

### 2. Make the install script executable (macOS only)

\`\`\`bash
chmod +x scripts/*.sh
\`\`\`

### 3. Install for your tool of choice

\`\`\`bash
# Recommended: Claude Code
./scripts/install.sh --tool claude-code

# Or interactive picker (auto-detects what you have installed)
./scripts/install.sh
\`\`\`

### 4. Activate any agent in your AI tool

\`\`\`
Use the Frontend Developer agent to review this React component.
\`\`\`

\`\`\`
Activate Reality Checker. I need certification before this ships.
\`\`\`

That's it. The agent loads automatically and stays in character for the rest of the conversation.

---

## 🎯 Supported Tools

| Tool | Command |
|---|---|
| Claude Code | \`./scripts/install.sh --tool claude-code\` |
| GitHub Copilot | \`./scripts/install.sh --tool copilot\` |
| Cursor | \`./scripts/install.sh --tool cursor\` |
| Aider | \`./scripts/install.sh --tool aider\` |
| Windsurf | \`./scripts/install.sh --tool windsurf\` |
| OpenCode | \`./scripts/install.sh --tool opencode\` |
| Antigravity | \`./scripts/install.sh --tool antigravity\` |
| Gemini CLI | \`./scripts/install.sh --tool gemini-cli\` |
| Qwen Code | \`./scripts/install.sh --tool qwen\` |
| Kimi Code | \`./scripts/install.sh --tool kimi\` |

---

## 🏛️ The 15 Divisions

Every agent lives inside one of these divisions. Browse the folder to see who's on the bench.

| Division | Agents | What they do |
|---|---|---|
| 💻 **Engineering** | 29 | Frontend, backend, DevOps, security, embedded, AI, smart contracts |
| 🎨 **Design** | 8 | UI, UX, brand, visual storytelling, image prompting |
| 📢 **Marketing** | 30 | Content, social, SEO, AI search, livestream commerce |
| 💰 **Paid Media** | 7 | PPC, programmatic, paid social, tracking, creative |
| 💼 **Sales** | 8 | Outbound, discovery, deal strategy, sales engineering, coaching |
| 📊 **Product** | 5 | Discovery, prioritization, feedback synthesis, behavioral nudges |
| 🎬 **Project Management** | 6 | Coordination, scoping, experiments, Git workflow |
| 🧪 **Testing & QA** | 8 | Visual QA, performance, API, accessibility, reality checking |
| 🛟 **Support & Operations** | 6 | Customer support, analytics, infrastructure, exec summaries |
| 🥽 **Spatial Computing** | 6 | Vision Pro, WebXR, Metal/Swift, cockpit interfaces |
| 🎯 **Specialized** | 41 | Compliance, legal, real estate, healthcare, recruitment, and more |
| 💵 **Finance** | 5 | Bookkeeping, FP&A, tax strategy, investment research |
| 📚 **Academic** | 5 | Anthropology, geography, history, narrative theory, psychology |
| 🎮 **Game Development** | 20 | Unity, Unreal, Godot, Blender, Roblox, plus cross-engine |

---

## 📖 The Companion Guide

This repo ships the agents. The full operator's guide — **257 pages, ~67,000 words** — covers:

- The **5 modes** of agent use (consultation, execution, audit, multi-agent, co-pilot)
- How to **build your dream team** without overwhelming yourself
- **Pairing strategies** that compound output across agents
- **Deep-dive entries** on every single one of the 184 agents
- A **master prompt library** with universal patterns
- **Multi-agent workflow recipes** for real projects (product launch, paid media takeover, deal cycles, content engines)

You should already have the PDF if you're seeing this repo. If you don't, ping me.

---

## 🛠️ Customizing an Agent

Every agent is a plain Markdown file. Open it, edit it, save it. Your changes take effect on the next activation.

Common customizations:

- Add your **company vocabulary** so the agent speaks your language
- Tighten the **communication style** to match how you actually work
- Point the agent at **specific tools or APIs** you use
- Load in your **brand voice** so output ships on-brand by default

After customizing, re-run the installer to push changes to your local AI tool:

\`\`\`bash
./scripts/install.sh --tool claude-code
\`\`\`

---

## 🔄 Updating Your Agents

When new agents drop or existing ones get refined, pull the latest:

\`\`\`bash
cd ~/path/to/Xcerebro-Agents
git pull
./scripts/install.sh --tool claude-code
\`\`\`

If you've made local customizations, save them somewhere safe before pulling — the installer overwrites whatever's in your AI tool's agents directory.

---

## 🚨 Quick Troubleshooting

**"Agent feels generic even though I activated it by name"**
→ Re-check that the file is actually installed: \`ls ~/.claude/agents/ | wc -l\` should show ~184.

**"Permission denied" running the install script**
→ macOS strips execute bits on download. Run \`chmod +x scripts/*.sh\` first.

**"Agent broke character mid-conversation"**
→ Long conversations can drift. Either start fresh and re-activate, or re-state the role: *"Stay in character as [Agent Name]."*

**"Can I run two agents in the same conversation?"**
→ Yes, but explicitly hand off: *"Now switch to Reality Checker and audit what Frontend Developer just produced."*

For everything else, the **Companion Guide** has a full Troubleshooting & FAQ appendix.

---

## 🔒 Access & Distribution

This is a **private repository**. Access is granted on a per-member basis.

- ✅ You may install these agents on **your own machines and your team's machines**
- ✅ You may **customize agents** for your business and workflows
- ❌ Do **not** redistribute the repo or share clone access outside your org
- ❌ Do **not** publish forks publicly

If you want to bring teammates in, ping me directly so I can issue them their own access.

---

<div align="center">

**Now go build something the agents can be proud of.** 🚀

</div>
