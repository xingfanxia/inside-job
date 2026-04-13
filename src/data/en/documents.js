export default {
  docvault: [
    {
      id: 'doc-board-minutes',
      title: 'Board Minutes — Q4 Strategy Review',
      classification: 'CONFIDENTIAL',
      lastModified: '2026-04-10',
      accessLog: [
        { user: 'Sarah Park', date: '2026-04-10 16:00', action: 'Created' },
        { user: 'David Reeves', date: '2026-04-10 17:12', action: 'Viewed' },
        { user: 'Ryan Kim', date: '2026-04-10 16:15', action: 'Downloaded (USB)' },
        { user: 'Priya Sharma', date: '2026-04-10 18:30', action: 'Viewed' },
        { user: 'Elena Vasquez', date: '2026-04-11 08:45', action: 'Downloaded' },
      ],
      watermarks: {
        'Sarah Park': 'WM-SP-4401',
        'David Reeves': 'WM-DR-4402',
        'Ryan Kim': 'WM-RK-4403',
        'Priya Sharma': 'WM-PS-4404',
        'Elena Vasquez': 'WM-EV-4405',
      },
      clueId: 'doc-board-access-log',
      content: `NOVATECH INC. — BOARD OF DIRECTORS
MEETING MINUTES — Q4 STRATEGY REVIEW
Date: Thursday, April 10, 2026
Location: NovaTech HQ, Board Room 12A
Classification: CONFIDENTIAL

ATTENDEES:
Sarah Park (CEO, Chair), David Reeves (CFO), Priya Sharma (CTO),
James Whitfield (VP Sales), Elena Vasquez (Ops Director),
Board Members: R. Nakamura, L. Fontaine, D. Okonkwo

---

1. FINANCIAL OVERVIEW (D. Reeves)
   - ARR: $127M (up 22% YoY)
   - Burn rate: $4.2M/month, runway 18 months at current pace
   - Q3 bookings exceeded forecast by 18%
   - Meridian Group acquisition scenarios presented:
     Floor: $2.8B | Target: $3.1B | Stretch: $3.5B
   - Board consensus: proceed with negotiation at $3.1B target

2. IP PORTFOLIO STATUS (P. Sharma)
   - 7 patents filed, 4 granted
   - Gap analysis flagged: 3 patents have prior art overlap
   - Real-time inference pipeline remains unpatented
   - CTO recommends accelerated filing before Meridian due diligence
   - Board: approved expedited filing budget ($400K)

3. PROJECT LIGHTHOUSE UPDATE (S. Park)
   - Current contract value: $47.2M over 3 years
   - Client: [REDACTED — Government Agency]
   - Platform capabilities: population-scale behavioral analytics
   - Active monitored endpoints: 2,847,331 devices
   - Q3 renewal confirmed with expanded scope

   DISCUSSION:
   R. Nakamura: "What is the end-use profile for this deployment?"
   S. Park: "The client uses it for behavioral pattern analysis
   at scale. The specific application is covered under their
   classification framework."
   L. Fontaine: "And the ethical review recommendation from Q3?"
   S. Park: "We considered it. The legal position is sound. An
   independent review would delay the renewal and potentially
   surface questions we are not obligated to answer."
   D. Okonkwo: "So we proceed as-is?"
   S. Park: "We proceed. The board has no legal obligation to
   proactively disclose the end-use case. Our contract is with
   the agency, not the monitored population."
   Board vote: 5-0 to continue without independent ethics review.

4. OPERATIONS UPDATE (E. Vasquez)
   - Server infrastructure migration: 92% complete
   - Cost savings from vendor renegotiation: $1.8M annually
   - Headcount: 204 FTE, 12 open positions

5. NEXT STEPS
   - Meridian due diligence begins April 14
   - Patent filings to be expedited
   - Project Lighthouse Q4 deliverables on track
   - Next board meeting: April 14, 9:00 AM

MINUTES PREPARED BY: Ryan Kim, Executive Assistant
DISTRIBUTION: Board members + C-suite only
DOCUMENT ID: BM-2026-Q4-001
WATERMARK: [EMBEDDED — UNIQUE PER RECIPIENT]`,
    },
    {
      id: 'doc-financial-model',
      title: 'Q4 Financial Model — CONFIDENTIAL',
      classification: 'CONFIDENTIAL',
      lastModified: '2026-04-08',
      accessLog: [
        { user: 'David Reeves', date: '2026-04-08 06:03', action: 'Created' },
        { user: 'David Reeves', date: '2026-04-08 14:20', action: 'Updated (v3)' },
        { user: 'Sarah Park', date: '2026-04-08 15:30', action: 'Viewed' },
        { user: 'Priya Sharma', date: '2026-04-09 09:45', action: 'Viewed' },
        { user: 'James Whitfield', date: '2026-04-09 10:10', action: 'Viewed' },
      ],
      watermarks: {
        'David Reeves': 'WM-DR-5501',
        'Sarah Park': 'WM-SP-5502',
        'Priya Sharma': 'WM-PS-5503',
        'James Whitfield': 'WM-JW-5504',
      },
      clueId: null,
      content: `NOVATECH INC. — Q4 FINANCIAL MODEL (v3)
Classification: CONFIDENTIAL
Prepared by: David Reeves, CFO
Last updated: April 8, 2026

---

REVENUE PROJECTIONS
  ARR (current):       $127.4M
  ARR (Q4 forecast):   $142.1M
  Growth rate:          22% YoY

MERIDIAN ACQUISITION SCENARIOS
  Scenario A (Floor):   $2.8B  (22.0x ARR)
  Scenario B (Target):  $3.1B  (24.4x ARR)
  Scenario C (Stretch): $3.5B  (27.6x ARR)

  Key assumptions:
  - IP portfolio valued at $600-900M (subject to due diligence)
  - Project Lighthouse contract adds $180M NPV
  - Integration costs estimated at $45M over 18 months
  - Retention packages for key personnel: $12M

BURN RATE ANALYSIS
  Monthly burn:         $4.2M
  Cash on hand:         $76.3M
  Runway:               18.1 months
  Post-acquisition:     Meridian absorbs operating costs

RISK FACTORS
  - Patent portfolio gaps (see CTO memo)
  - Key person dependencies (CTO, VP Sales)
  - Project Lighthouse contract renewal risk if end-use disclosed
  - Meridian may demand IP representations & warranties

NOTE: This model assumes Lighthouse revenue continues uninterrupted.
If the contract is terminated or renegotiated, reduce valuation by
$150-220M across all scenarios.`,
    },
    {
      id: 'doc-patent-analysis',
      title: 'Patent Portfolio Gap Analysis',
      classification: 'INTERNAL ONLY',
      lastModified: '2026-04-07',
      accessLog: [
        { user: 'Priya Sharma', date: '2026-04-07 11:00', action: 'Created' },
        { user: 'Sarah Park', date: '2026-04-07 14:15', action: 'Viewed' },
        { user: 'Aisha Patel', date: '2026-04-07 16:22', action: 'Viewed' },
        { user: 'External (203.45.67.89)', date: '2026-04-09 14:22', action: 'Accessed', flag: 'ANOMALY' },
      ],
      watermarks: {
        'Priya Sharma': 'WM-PS-6601',
        'Sarah Park': 'WM-SP-6602',
      },
      clueId: 'doc-patent-external-ip',
      content: `NOVATECH INC. — PATENT PORTFOLIO GAP ANALYSIS
Prepared by: Priya Sharma, CTO
Date: April 7, 2026
Classification: INTERNAL ONLY
Distribution: CEO, Legal

---

EXECUTIVE SUMMARY
NovaTech holds 7 filed patents (4 granted, 3 pending).
Analysis reveals significant vulnerabilities ahead of
Meridian due diligence.

CRITICAL FINDINGS

1. PRIOR ART OVERLAP (3 patents)
   - Patent US-2024-0847: Behavioral clustering algorithm
     Risk: 73% overlap with published academic work
     (Chen et al., ICML 2023; Zhao & Rivera, NeurIPS 2023)
   - Patent US-2024-0848: Predictive engagement model
     Risk: Core approach independently developed by Nexion AI
   - Patent US-2025-0112: Multi-modal feature extraction
     Risk: Derivative of open-source transformer architecture

2. FILING GAPS
   - Real-time inference pipeline: NO patent coverage
     This is arguably our most defensible technology
   - Edge deployment framework: NO patent coverage
   - Federated learning orchestrator: NO patent coverage

3. COMPETITIVE LANDSCAPE
   - At least 2 competitors have filed similar claims
   - Meridian's own patent portfolio overlaps with items 1-2

IMPACT ON VALUATION
If Meridian's technical due diligence team identifies these
gaps, the IP component of the deal could be reduced by
$200-400M. This is material.

RECOMMENDATION
Expedite filings for items in Section 2 before due diligence
begins April 14. Budget: $400K for accelerated prosecution.

---

ACCESS LOG NOTE: External IP 203.45.67.89 accessed this
document on April 9. IP geolocation: consulting firm
associated with Meridian Group. Access method unknown —
investigation pending (assigned to: Alex Chen, InfoSec).`,
    },
  ],
  secureFiles: [
    {
      id: 'sec-lighthouse-contract',
      title: 'Project Lighthouse — Client Contract',
      classification: 'TOP SECRET',
      clueId: 'sec-lighthouse-contract',
      content: `CONTRACT FOR BEHAVIORAL ANALYTICS PLATFORM
Document ID: LH-CONTRACT-2024-001
Classification: TOP SECRET — NEED TO KNOW

---

PARTIES:
  Provider: NovaTech Inc. ("Company")
  Client: [REDACTED — Government Agency] ("Agency")

EFFECTIVE DATE: March 1, 2024
TERM: 36 months (renewable)
CONTRACT VALUE: $47,200,000

SCOPE OF WORK:

1. PLATFORM DEPLOYMENT
   The Company shall deploy and maintain a behavioral analytics
   platform capable of processing data from population-scale
   digital infrastructure.

2. MONITORING CAPABILITIES
   - Active endpoint monitoring: up to 3,000,000 devices
   - Current active endpoints: 2,847,331
   - Data streams: mobile, desktop, IoT, public infrastructure
   - Real-time behavioral pattern recognition
   - Predictive anomaly detection
   - Geospatial movement analysis

3. DATA HANDLING
   - All data processed within Agency-controlled infrastructure
   - NovaTech provides software and operational support
   - Data classification: [REDACTED]
   - Retention policy: per Agency directive (minimum 7 years)

4. CONFIDENTIALITY
   The Company shall not disclose the existence, scope, or
   nature of this contract to any party not designated by the
   Agency. Violation constitutes breach and is subject to
   penalties under [REDACTED].

5. KEY PERSONNEL
   - Project Lead: Priya Sharma, CTO
   - Operations: Elena Vasquez, Ops Director
   - Security Clearance Holder: Alex Chen, Head of InfoSec

   NOTE: Alex Chen holds valid security clearance for this
   project but has not accessed the Lighthouse admin console
   since deployment (March 2024).

SIGNATURES:
  Sarah Park, CEO, NovaTech Inc.
  [REDACTED], Deputy Director, [REDACTED]

AMENDMENT LOG:
  2024-09-15: Scope expanded — endpoint cap raised to 3M
  2025-01-20: Renewal discussion initiated
  2025-11-01: Q3 renewal confirmed, expanded analytics scope`,
    },
    {
      id: 'sec-board-discussion',
      title: 'Board Discussion Transcript — Project Lighthouse',
      classification: 'TOP SECRET',
      clueId: 'sec-board-surveillance-discussion',
      content: `TRANSCRIPT — CONFIDENTIAL
Board of Directors, NovaTech Inc.
Extracted from Q3 Board Meeting Recording
Date: October 12, 2025
Re: Project Lighthouse Ethics Review

---

[RECORDING BEGINS — 14:32]

Sarah Park: "Next item. Priya raised a formal concern about
Lighthouse during her performance review. I want to address
it here."

Priya Sharma: "Thank you. I'll be brief. We sold this platform
as enterprise behavioral analytics. The deployment is
population-scale surveillance. Nearly three million devices.
We don't know — and have chosen not to ask — what the Agency
does with the output. I believe we have an ethical obligation
to conduct an independent review."

R. Nakamura: "Priya, I appreciate the concern. What's the
legal exposure?"

Aisha Patel (Legal): "Minimal. Our contract is with the Agency.
We provide software. What they do with the output is governed
by their own legal framework. We have no disclosure obligation."

David Reeves: "Lighthouse is our highest-margin contract. The
renewal alone adds $180M to the NPV for the Meridian deal."

Sarah Park: "I've thought about this carefully. The legal
position is solid. An independent ethics review would take
90 days minimum, delay the Meridian timeline, and potentially
surface information that creates obligations we don't
currently have."

L. Fontaine: "So we'd be worse off knowing."

Sarah Park: "Exactly. We will not proactively disclose the
end-use case. Our legal position is sound."

D. Okonkwo: "And Priya's concern?"

Sarah Park: "Noted and logged. Priya, I respect your position.
But the board's fiduciary duty is clear."

Priya Sharma: "Understood. I've said my piece."

Board vote: Ethics review declined, 5-0.

[RECORDING ENDS — 14:47]

---

NOTE: This transcript was generated from the secure recording
system. Access restricted to CEO and General Counsel.
Elena Vasquez was granted temporary access to this file on
2026-04-11 per operations audit scope (approved by Alex Chen).`,
    },
    {
      id: 'sec-leaked-comparison',
      title: 'Leaked Document Analysis',
      classification: 'TOP SECRET',
      clueId: 'sec-watermark-match',
      content: `DOCUMENT FORENSIC COMPARISON
Prepared by: NovaTech InfoSec (automated analysis)
Date: April 12, 2026
Case Ref: BREACH-2026-001

---

ORIGINAL DOCUMENT:
  Title: NovaTech Board Minutes — Q4 Strategy Review
  Document ID: BM-2026-Q4-001
  Created: April 10, 2026
  Author: Ryan Kim (on behalf of CEO)
  Distribution: Board + C-suite (5 unique watermarked copies)

LEAKED DOCUMENT:
  Source: Forwarded to NovaTech by Marcus Webb, SVP Corp Dev,
  Meridian Group, on April 10, 2026 at 6:18 PM
  Format: PDF, NovaTech formatting intact
  Redactions: None — full document leaked verbatim

---

WATERMARK ANALYSIS:

  Each distributed copy contains an invisible digital watermark
  embedded in the document metadata and pixel pattern.

  Copies distributed:
    WM-SP-4401  →  Sarah Park (CEO)
    WM-DR-4402  →  David Reeves (CFO)
    WM-RK-4403  →  Ryan Kim (EA)
    WM-PS-4404  →  Priya Sharma (CTO)
    WM-EV-4405  →  Elena Vasquez (Ops Director)

  LEAKED COPY WATERMARK: WM-EV-4405

  MATCH: Elena Vasquez's download copy
  Downloaded: April 11, 2026 at 08:45 AM
  Method: Standard DocVault download (browser)

---

FORWARDING METADATA (recovered from email headers):

  From: anonymous.source@protonmail.com
  To: [REDACTED — external recipient]
  Date: April 11, 2026, 01:15 AM
  Relay: Proton Mail encrypted relay
  Attachment: NovaTech_Board_Minutes_Q4_Review.pdf

  Note attached to email:
  "They know what they're selling and they chose profit.
   Someone needs to see this."

---

CONCLUSION:
The leaked document originated from Elena Vasquez's
watermarked copy. The forwarding email was sent from an
anonymous Proton Mail address approximately 16 hours after
Elena downloaded the document from DocVault.`,
    },
    {
      id: 'sec-whistleblower-email',
      title: 'Forwarded Email (recovered)',
      classification: 'TOP SECRET',
      clueId: 'sec-whistleblower-email',
      content: `RECOVERED EMAIL — FORENSIC COPY
Source: External mail relay logs (Proton Mail → recipient)
Recovery method: Metadata reconstruction from NovaTech
  outbound mail gateway logs
Case Ref: BREACH-2026-001

---

FROM: anonymous.source@protonmail.com
TO: [REDACTED]
DATE: April 11, 2026, 01:15 AM
SUBJECT: (none)

ATTACHMENT: NovaTech_Board_Minutes_Q4_Review.pdf (2.4 MB)

---

BODY:

I joined this company to build something good.

I believed in the mission. I believed we were making tools
that helped businesses understand their customers better.
That's what the pitch deck said. That's what they told me
in the interview.

Project Lighthouse monitors nearly three million people.
Not customers. Not users who opted in. People.

The board voted unanimously to hide it. They declined an
ethics review because — and I quote — "we'd be worse off
knowing."

I sat in that room. I heard them say it.

I can't be part of this anymore. I can't sit in meetings
and pretend the numbers on the dashboard are abstractions.
They're people. Every endpoint is a person who doesn't know
we're watching.

Someone needs to see this.

I'm sorry for whatever comes next. But silence is worse.`,
    },
  ],
}
