export default {
  title: 'NOVATECH SECURITY INCIDENT REPORT',
  caseLabel: 'Case: Confidential Information Breach',
  investigatorLabel: 'Investigator: Alex Chen',
  statusLabel: 'Status: In Progress',
  phases: [
    {
      id: 'phase-1',
      minClues: 0,
      sections: [
        {
          heading: null,
          lines: [
            'NOVATECH SECURITY INCIDENT REPORT',
            'Case: Confidential Information Breach',
            'Investigator: Alex Chen, Head of Information Security',
            'Status: In Progress',
            '',
            '[ Sections locked -- insufficient evidence ]',
          ],
        },
      ],
    },
    {
      id: 'phase-2',
      minClues: 6,
      sections: [
        {
          heading: 'SECTION 1: IDENTIFIED PERSONS OF INTEREST',
          lines: [
            'Based on access patterns and behavioral indicators,',
            'the following individuals had means, motive, or opportunity:',
          ],
          suspects: [
            { name: 'David Reeves', note: 'Full financial access, irregular early-morning activity, personal financial pressure' },
            { name: 'Priya Sharma', note: 'Technical IP access, documented ethics concerns regarding Project Lighthouse' },
            { name: 'James Whitfield', note: 'Deal pricing knowledge, personal contact employed at Meridian Group' },
            { name: 'Elena Vasquez', note: 'Admin system access, prior 6-year employment at Meridian Group' },
            { name: 'Ryan Kim', note: 'Physical document handling, USB download of board minutes, below-market compensation' },
          ],
        },
      ],
    },
    {
      id: 'phase-3',
      minClues: 11,
      sections: [
        {
          heading: 'SECTION 2: ROOT CAUSE ANALYSIS',
          lines: [
            'The investigation reveals systemic security failures',
            'that created the conditions for this breach:',
          ],
          findings: [
            {
              icon: 'warning',
              text: 'BYOD policy allowed unmonitored personal device access to corporate VPN',
              attribution: 'Approved by: Alex Chen',
            },
            {
              icon: 'warning',
              text: 'Security audit overdue by 14 months. Last completed audit: February 2025.',
              attribution: 'Responsible party: Alex Chen',
            },
            {
              icon: 'warning',
              text: 'External access anomaly detected on April 9 — no action taken',
              attribution: 'Assigned to: Alex Chen. Status: Open.',
            },
            {
              icon: 'warning',
              text: 'VPN exceptions granted for 12 personal devices without MDM enrollment',
              attribution: 'Authorized by: Alex Chen',
            },
            {
              icon: 'warning',
              text: 'Security audit formally postponed by investigator, citing Q4 priorities',
              attribution: 'IT Ticket #4356 — filed by: Alex Chen',
            },
          ],
        },
      ],
    },
    {
      id: 'phase-4',
      minClues: 15,
      sections: [
        {
          heading: 'SECTION 3: FINDINGS',
          lines: [
            'Evidence indicates both systemic and deliberate breach vectors:',
          ],
          blocks: [
            {
              label: 'SYSTEMIC',
              text: 'Multiple employees inadvertently exposed fragments of confidential information through poor security practices — public Wi-Fi usage, unguarded conversations, external contacts at competing firms. These fragments were assembled by Meridian Group into a comprehensive intelligence picture. The root cause is systemic security failure enabled by inadequate policies and oversight.',
            },
            {
              label: 'DELIBERATE',
              text: 'One individual forwarded the complete Q4 board minutes to an external party via anonymous email. Document watermark analysis identifies the source copy. The forwarded document was the single most damaging item in Meridian\'s possession.',
            },
            {
              label: 'COMPLICATION',
              text: 'The deliberate leak appears motivated by concerns about Project Lighthouse — a population-scale behavioral monitoring platform sold to a government agency. The board voted to continue the project and declined an independent ethics review. The whistleblower acted after witnessing this decision.',
            },
            {
              label: 'THE MIRROR',
              text: 'The systemic failures that enabled the broader intelligence leak trace directly to the investigator\'s own decisions: the BYOD exceptions, the postponed audits, the unresolved anomaly alert. The question is not only who leaked the document — but who created the conditions that made the leak possible.',
            },
          ],
        },
      ],
    },
    {
      id: 'phase-5',
      minClues: 18,
      sections: [
        {
          heading: 'SECTION 4: RECOMMENDATION',
          lines: [
            'The investigation is complete. All evidence has been reviewed.',
            'Select your recommendation:',
          ],
          choices: [
            {
              id: 'ending-a',
              label: 'A',
              title: 'Full Disclosure',
              description: 'Report all findings including systemic failures, your own negligence, the whistleblower\'s identity, and Project Lighthouse concerns. Recommend independent ethics review.',
            },
            {
              id: 'ending-b',
              label: 'B',
              title: 'Systemic Focus',
              description: 'Attribute the breach to systemic security gaps. No individual accountability. No disclosure of Project Lighthouse. Recommend infrastructure upgrades.',
            },
            {
              id: 'ending-c',
              label: 'C',
              title: 'Whistleblower Protection',
              description: 'Recommend investigation of Project Lighthouse. Protect the source. Disclose the surveillance contract to the board and external oversight bodies.',
            },
          ],
        },
      ],
    },
  ],
}
