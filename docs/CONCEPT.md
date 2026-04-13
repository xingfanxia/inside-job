# Inside Job — Concept Document (Locked V2)

## One-Line Pitch
A critical acquisition deal collapsed because someone leaked your company's secrets. You're the Head of Security. Find the mole — but the deeper you dig, the more you realize you're part of the problem.

## Setting
**NovaTech** — a Series C enterprise AI startup (~200 employees). International tech hub, modern office. The company was in advanced acquisition talks with **Meridian Group**, a Fortune 500 conglomerate.

## Player
**Alex Chen**, Head of Information Security. Monday morning, 9:07 AM. CEO Sarah Park calls you in.

> "The Meridian deal is dead. They knew our floor price. They knew about the patent gaps in our core IP. They had our board minutes — word for word. Someone in this building sold us out. I need you to find them before the board meets tomorrow at 9 AM. You have full access to our internal systems. Don't tell anyone what you're doing."

## Target Audience
Global — the corporate tech setting is universally understood. No culture-specific references. Characters represent diverse international backgrounds.

## Emotional Goal
The player should feel:
1. **Competence** — "I'm good at this investigation" (early game)
2. **Discomfort** — "I'm seeing things about these people I shouldn't know" (mid game)
3. **Moral conflict** — "The mole might be right" (late game)
4. **Self-reflection** — "I'm part of why this happened" (ending)

## Three-Layer Narrative Structure

### Layer 1: The Detective Story (Surface)
Find who leaked confidential documents to Meridian Group. Classic whodunit across 11 internal company apps.

### Layer 2: Systemic Failure (Middle)
The leak wasn't one person. Multiple employees inadvertently exposed fragments of information through poor security practices:
- CFO reviewed financial models on public Wi-Fi (Meridian's people were at the same cafe)
- CTO mentioned patent gaps during a job interview (interviewer was a Meridian consultant)
- VP Sales told his college friend at Meridian "we won't go below 2.8" on a casual call

Meridian assembled these fragments into a complete intelligence picture. The root cause is systemic security failure — which the player (Head of Security) enabled.

### Layer 3: The Whistleblower (Deep)
One person DID deliberately leak the board minutes — the most damaging document. But they did it because the board minutes contain a conversation revealing NovaTech's AI product is being sold to a government client for mass surveillance. The CEO knows and chose not to disclose.

The whistleblower believed the Meridian acquisition would bury this further. They leaked to torpedo the deal and force disclosure.

### The Mirror
The investigation form (Incident Report) gradually reveals the player's own failures:
- You approved the lax BYOD policy
- You postponed 3 security audits
- You signed off on the VPN exceptions
- The systemic vulnerabilities exist because you didn't do your job

The Incident Report starts as "who did this?" and becomes "how did I let this happen?"

## The 5 Suspects

| Name | Role | Access Level | Surface Motive | Secret (Red Herring) | Personality |
|------|------|-------------|----------------|---------------------|-------------|
| **David Reeves** | CFO | All financials, board minutes | Expensive divorce, financial pressure | Offshore transfers = hiding assets from divorce | Polished, controlled, hates being questioned |
| **Priya Sharma** | CTO | All technical IP, patents | Clashed with CEO over product ethics | Interviewing at Meridian, exploring options | Brilliant, principled, the "moral compass" |
| **James Whitfield** | VP Sales | Deal terms, pricing strategy | College roommate at Meridian | Late-night calls = personal investment advice | Charming, loyal, "bro culture" type |
| **Elena Vasquez** | Ops Director | All internal systems, admin access | Previously at Meridian for 6 years | Stays in touch with ex-colleagues | Efficient, private, keeps her past quiet |
| **Ryan Kim** | CEO's EA | Sees everything — every email, meeting, document | Underpaid, passed over for promotion | Copied board minutes to USB per CEO's request | Quiet, observant, overlooked |

## The Actual Mole
[Revealed through gameplay — the evidence trail is logically watertight. The mole's identity creates maximum moral complexity when combined with their whistleblower motivation.]

## Endings

### Ending A — Truth (found 14+ clues, report names self)
You report everything: the systemic failures, the whistleblower's identity, AND your own negligence. CEO is held accountable by the board. The surveillance contract is reviewed. You're demoted but keep your integrity.
> "Sometimes the hardest report to file is the one about yourself."

### Ending B — Cover-up (found 10+ clues, report blames systems only)
You frame it as pure systemic failure — no individual blame, no whistleblower, no self-accountability. The company survives. The surveillance project continues. 
> "The report was technically accurate. It was also a lie of omission."

### Ending C — Whistleblower (found 14+ clues, side with the mole)
You leak the surveillance evidence yourself, joining the whistleblower. NovaTech collapses. But the truth comes out.
> "You deleted the incident report. Then you wrote a different kind of report."

### Hidden Ending D — The Full Picture (found ALL clues)
You discover Meridian knew about the surveillance project all along. The acquisition was never about NovaTech's AI — it was about acquiring the surveillance capability. The deal didn't "collapse" — Meridian used the leaked info to negotiate a lower price. The CEO knows.
> "The deal isn't dead. It never was. Check your email."

## Technical Approach
- React + Vite SPA
- useReducer + createContext (no external state libs)
- SVG pixel art icons, zero image files
- Web Audio API synthesis, zero audio files
- CRT/corporate aesthetic: blue-gray palette with green terminal accents
- IntersectionObserver for scroll-based clue discovery
- localStorage for save/resume
- Vercel deployment
