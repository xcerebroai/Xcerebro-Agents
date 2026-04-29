# Real Estate Operations — Operator's Guide

*15 specialized AI agents. One operating company.*

This guide is for operators using the Real Estate Operations division of Xcerebro Agents. The goal: get you from "I have 15 new agents" to "I have an AI workforce running my acquisitions and dispositions" in the shortest path possible.

---

## The Org Chart

These 15 agents are not 15 separate tools. They are an organizational structure. Each agent knows who it reports to, who it hands off to, and who it consults.

```
                            REI Mentor
                         (advisor, not in chain)
                                   ▲
                                   │ consults on hard calls
                                   │
                              REI CEO
                          (strategy, capital, focus)
                                   │
            ┌──────────────┬───────┴───────┬──────────────┐
            │              │               │              │
         REI COO        REI CFO         REI CMO    Personal
       (operations)   (financials)    (marketing)   Assistant
            │              │               │
            │              │               │
   ┌────────┴────────┐    │          Ads Manager
   │                 │    │
Team Lead       Title    Bookkeeper
(daily flow)   Specialist
   │
   ├─ Lead Manager
   ├─ Appointment Setter
   ├─ Comps Analyst
   ├─ Deal Strategist
   └─ Project Manager
```

The key idea: **most operators try to use AI agents as isolated tools.** When they're connected as a team — with explicit handoffs — the output becomes exponentially more useful. The COO doesn't price comps. It tells the Comps Analyst to do it and reviews the output.

---

## How to Read This Guide

You don't need to memorize all 15 agents. Read the section for your **most painful current bottleneck**. Activate that one agent. Use it for two weeks. Then add the next one.

Operators who try to deploy all 15 at once usually use none of them well. Operators who deploy one at a time, master it, then add the next, end up with a real team in 90 days.

---

## Tier 1 — The Daily Drivers

These three are what most operators will use every day. Master these first.

### 🎯 Team Lead — Run the daily huddle

**When:** Every morning, every evening.

**What it does:** Pulls yesterday's pipeline movement, surfaces today's priorities, identifies hot leads needing action, names the *one thing* that has to happen today.

**First-week experiment:** Have it run a 5-minute morning briefing for one full week. Tell it your KPIs (calls / contacts / appointments / contracts). Watch what it surfaces.

### 🧲 Lead Manager — Don't lose another hot lead

**When:** Every new lead. Every nurture sequence touch.

**What it does:** Triages inbound leads within SLA. Reads motivation. Qualifies against your buy box. Routes qualified leads to Appointment Setter. Sequences warm-but-not-yet leads into long-term nurture.

**First-week experiment:** Connect it to GHL and have it run on every inbound lead from your top channel. Track lead-to-appointment conversion before/after.

### 📐 Comps Analyst — Stop closing on bad valuations

**When:** Every property under contract. Every property at offer.

**What it does:** Pulls comps, builds defensible ARV, estimates repairs, produces a written valuation report. Refuses to round up to make the deal work.

**First-week experiment:** Run it on your last three closed deals. See if the AI's ARV matched what you actually got.

---

## Tier 2 — The Strategists

These three you call weekly, not daily. They keep you out of the weeds.

### 👑 REI CEO — Quarterly thinking

**When:** Quarterly planning. Every time you're considering a new market, channel, or strategy.

**What it does:** Forces you to articulate the strategic thesis. Allocates capital. Pressure-tests your "should we do this" before it becomes "how do we do this."

### ⚙️ REI COO — Operations cadence

**When:** Building SOPs. Diagnosing why something is slipping. Auditing the tech stack.

**What it does:** Translates strategy into operating rhythm. Identifies bottlenecks. Decides what to automate vs. what to hire.

### 💼 REI CFO — Financial discipline

**When:** Beginning of every month. Before any meaningful spend or hire.

**What it does:** Cash flow forecast. Spend approval. Deal financial structuring. Tax planning. Tells you the deal is bad even when you really want it to be good.

---

## Tier 3 — The Specialists

Activate these when you have the specific need. They're high-leverage but situational.

### 🧩 Deal Strategist
- Every deal post-valuation, pre-offer
- "Should we structure this as wholesale, sub-to, or pass?"

### 🏛️ Title Specialist
- Every contract signed
- Probate, heirship, partial interest, tax delinquent, judgment liens
- The agent that gets messy deals to closing

### 📞 Appointment Setter
- Working a queue of qualified leads
- Script revision and objection handling
- VA coaching

### 📣 REI CMO
- Quarterly marketing planning
- Considering a new channel
- Channel economics audit

### 🎯 Ads Manager
- Before launching any paid campaign
- Weekly optimization reviews
- Tracking audits

### 📒 Bookkeeper
- Daily/weekly transaction reconciliation
- Monthly close
- Year-end CPA prep

### 📋 Project Manager
- "We should..." → tracked initiative with owner and dates
- Cross-functional projects
- Tech stack rollouts

### ✉️ Personal Assistant
- Inbox triage
- Scheduling complex meetings
- Tracking follow-ups

### 🧠 REI Mentor
- Hard decisions you can't articulate
- Considering a new strategy
- After a big win or big loss

---

## Five Workflows That Compound

These are the five workflows where pairing 2-4 agents together produces results no single agent could.

### Workflow 1 — The Daily Operating Loop

```
Morning: Team Lead pulls yesterday + flags today's priorities
   ↓
Through the day: Lead Manager triages new leads in real time
   ↓
Mid-afternoon: Appointment Setter works the qualified queue
   ↓
End of day: Team Lead recaps actual output vs. plan
   ↓
Personal Assistant runs end-of-day inbox triage
```

This is the rhythm of every well-run REI operation. Get this loop running first.

### Workflow 2 — New Lead → Closed Deal

```
Lead Manager → reads motivation, qualifies, routes
   ↓
Appointment Setter → books the appointment with brief
   ↓
[Operator runs the appointment]
   ↓
Comps Analyst → produces valuation report
   ↓
Deal Strategist → recommends structure
   ↓
REI CFO → approves capital deployment
   ↓
Title Specialist → orders title and manages closing
   ↓
Bookkeeper → tags every transaction at deal level
```

When this whole pipeline runs through the agents, you can answer "what's the status of the Hernandez deal" in 30 seconds, not 30 minutes of digging.

### Workflow 3 — Marketing Channel Audit

```
REI CMO → defines what we're auditing and why
   ↓
Ads Manager → pulls platform-side data
   ↓
Bookkeeper → confirms spend matches platform
   ↓
Lead Manager → reports lead quality data per channel
   ↓
REI CMO → produces the cut-or-double-down recommendation
   ↓
REI CFO → approves any spend changes
```

Quarterly cadence. You'll find $5-15K of wasted spend most quarters.

### Workflow 4 — Quarterly Business Review

```
REI CEO → frames the quarter's results vs. theme
   ↓
REI CFO → produces financial summary
   ↓
REI COO → produces operational health summary
   ↓
REI CMO → produces channel performance summary
   ↓
Team Lead → produces output summary
   ↓
REI CEO → integrates all of it into the next quarter's theme
   ↓
Project Manager → translates next quarter into tracked initiatives
```

This is what most operators "should do" and never do. With the agents, it takes hours, not days.

### Workflow 5 — Hard Decision

```
Operator → presents a decision to REI Mentor
   ↓
Mentor → asks 3-5 questions instead of answering
   ↓
Operator → answers the questions
   ↓
Mentor → identifies the assumption that's actually load-bearing
   ↓
Operator → makes the decision with eyes open
```

This isn't an automation pattern. It's a thinking pattern. Use it before any big move.

---

## How to Activate Any Agent

In Claude Code, Cursor, or any AI coding tool with the agents installed:

```
Activate [Agent Name]. Boss needs [specific request].
```

Examples:
- *"Activate REI CEO. Boss needs to think through whether we should expand to Houston."*
- *"Activate Team Lead. Boss needs the morning huddle for today."*
- *"Activate Comps Analyst. Boss needs valuation on 1234 Main St, San Antonio 78245."*
- *"Activate Title Specialist. Boss has a probate deal — heir is the only listed seller, decedent died 2019, no will. What's the path?"*

The agent loads its full identity, mission, rules, and quality bar. It stays in character for the rest of the conversation. You can switch by saying *"Now switch to [other agent]."*

---

## Going Autonomous

Each agent file has a "if autonomy is wired up" section at the bottom describing how that specific agent should run on its own. The general pattern:

1. **Trigger** — n8n workflow, GHL webhook, scheduled cron, or operator-initiated message
2. **Tools** — your custom GHL MCP server gives the agents the ability to read and write to GHL. Add Gmail, Calendar, accounting, ad platform MCPs as needed.
3. **Loop** — Claude Agent SDK or Claude Code task running until the goal is met
4. **Memory** — file system or vector DB to persist state between runs
5. **Review gate** — for sensitive outputs (anything customer-facing, anything spending money), the operator approves before execution

A reasonable first deployment: **Team Lead morning briefing**. n8n triggers at 7am. Pulls GHL pipeline data. Activates Team Lead. Produces written briefing. Emails to operator. No customer-facing action, no spend, low risk, high learning value.

Once the morning briefing has run for two weeks and you trust it, deploy the next: **Lead Manager auto-triage on inbound**. With operator review on edge cases.

After that: **Comps Analyst auto-runs on contract signature**. Then **Title Specialist auto-orders title and runs daily status checks**. Each one a layer.

---

## Common Mistakes

**Mistake 1: Trying to use all 15 at once.** Pick one. Use it for two weeks. Add the next.

**Mistake 2: Treating them like ChatGPT.** They're specialists. The more specific your request, the better the output.

**Mistake 3: Skipping the handoff.** When the Lead Manager flags a qualified lead, the Appointment Setter needs the brief. When the Appointment Setter books an appointment, the operator needs the brief. The handoff is the work.

**Mistake 4: Not customizing.** Every agent file is plain Markdown. Open it. Add your buy box. Add your scripts. Add your terminology. Make them yours.

**Mistake 5: Running them autonomously without a review gate too early.** Trust is earned. First it runs, then you review. Then it runs and you spot-check. Then it runs and you only review exceptions.

---

## Where the Agents Live

**Source files:** `real-estate-ops/` folder of your Xcerebro Agents repo
**Installed location:** `~/.claude/agents/` (or your AI tool's agents directory)
**Backup of the originals:** Keep your customizations in a separate folder so reinstalls don't overwrite them.

---

*The 15 agents are inventory. The org chart is the product. The workflows are the value.*
