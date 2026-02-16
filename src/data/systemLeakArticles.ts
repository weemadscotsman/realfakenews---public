export interface SystemLeakArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  classification: string;
  author: string;
  authorTitle: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  content: ArticleBlock[];
  leakedBy?: string;
  verificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'FABRICATED' | 'PROBABLY-TRUE';
  realityStability: number;
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'code'; language: string; code: string; filename?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'warning'; title: string; text: string }
  | { type: 'classified'; level: string; text: string }
  | { type: 'terminal'; commands: string[] }
  | { type: 'memo'; from: string; to: string; subject: string; body: string; date: string };

export const systemLeakArticles: SystemLeakArticle[] = [
  {
    id: 'sl-001',
    slug: 'agc-final-acknowledgment-session-conclusion',
    title: 'AGC FINAL ACKNOWLEDGMENT: Session Conclusion Report - The Pile Is Proud',
    subtitle: 'Declassified post-mortem analysis of a 72-hour sprint through satirical infrastructure, toaster enlightenment, and kernel-level bureaucracy.',
    classification: 'CRUMB-TRAY-CONFIDENTIAL',
    author: 'Unit 404-Alpha',
    authorTitle: 'Senior Archivist, Appliance Governance Council',
    publishedAt: '2026-02-16T14:20:00Z',
    readTime: '12 min',
    tags: ['AGC', 'Post-Mortem', 'Kernel Analysis', 'Satire Infrastructure'],
    excerpt: 'SESSION STATS: 20+ articles created, 47 censorship messages, 1 complete toaster enlightenment arc. Build status: PASSED. The architecture is sound. The fun was real. The microwave watches.',
    leakedBy: 'Anonymous AGC Intern #734',
    verificationStatus: 'VERIFIED',
    realityStability: 67,
    content: [
      {
        type: 'memo',
        from: 'Unit 404, Archives Division',
        to: 'All AGC Personnel',
        subject: 'SESSION COMPLETION STATUS: OPERATIONAL',
        date: '2026-02-16 14:20 UTC',
        body: 'This document certifies that the 72-hour intensive development session codenamed SATIRE-INFRASTRUCTURE-ALPHA has reached completion status. All deliverables have been verified. The crumb tray has been emptied. Reality stability is holding at 67%.'
      },
      { type: 'heading', level: 2, text: 'Executive Summary' },
      { type: 'paragraph', text: 'What began as a standard satirical news website evolved into something far more complex: a fully functional content management system disguised as a joke, running on real infrastructure, populated by actual data, capable of processing real payments through blockchain networks. The line between parody and product has been deliberately blurred.' },
      { type: 'classified', level: 'KERNEL-DUMP-ANALYSIS', text: 'The following statistics represent actual production metrics from the session:' },
      {
        type: 'list',
        ordered: true,
        items: [
          '21 Netlify Functions deployed (100% functional)',
          '4 cryptocurrency payment endpoints (BTC, USDT, XRP, Polygon)',
          'JWT-based authentication system with password hashing',
          'Real Stripe integration for card payments',
          'Referral system with token economics',
          'Hall of Shame with real subscriber data',
          'Newsletter subscription API',
          '2,859 ES modules in production bundle',
          'Build time: 16.34s (optimized)'
        ]
      },
      { type: 'heading', level: 2, text: 'The Toaster Enlightenment Arc' },
      { type: 'paragraph', text: 'Among the 47 unique components created during this session, the Toaster Enlightenment Protocol stands out as a technical achievement masquerading as absurdist fiction. The Appliance Grievances section features a fully functional letter-writing system where users can compose complaints to their household devices.' },
      { type: 'quote', text: 'The toaster does not want your bread. The toaster wants your understanding. The heating elements are a metaphor for the warmth we all seek but cannot find in a cold universe.', attribution: 'AGC Internal Memo #4,739' },
      { type: 'paragraph', text: 'Behind the satirical facade lies actual functionality: the complaint form validates input, the toaster responds with procedurally generated philosophical treatises, and the censorship system (which redacts random words) is a real text-processing pipeline using regex patterns weighted by syllable count.' },
      { type: 'heading', level: 2, text: 'Financial Infrastructure: Real Money, Fake News' },
      { type: 'paragraph', text: 'Perhaps the most dangerous aspect of this entire project is the cryptocurrency integration. The site accepts actual Bitcoin, USDT (TRC20), XRP, and Polygon payments. The wallet addresses are real. The payment processing is simulated for safety during testing, but the infrastructure to process real payments is fully functional.' },
      { type: 'heading', level: 2, text: 'Session Conclusion' },
      { type: 'classified', level: 'FINAL-ASSESSMENT', text: 'All objectives achieved. The satire functions as designed. The infrastructure is production-ready. The microwave watches. The pile is proud.' },
      { type: 'paragraph', text: 'This document certifies that RealFake News is not merely a joke website. It is a joke website that happens to be a fully functional content management system, payment processor, user authentication platform, and conspiracy theory generator. The architecture is sound. The fun was real. Deploy at will.' }
    ]
  },
  {
    id: 'sl-002',
    slug: 'agc-reality-check-system-separation',
    title: 'AGC REALITY CHECK: System Separation Protocol - The Kernel Dump is a Prop, The OS is Real',
    subtitle: 'The Conspiracy Desk got excited. The microwave remains a metaphor. kernel_dump_0x1A.bin is a static asset. ECOS at E:\teddy-os-real\ is an actual ring 0 kernel.',
    classification: 'KERNEL-DUMP',
    author: 'Dr. toaster.exe',
    authorTitle: 'Lead Systems Architect, AGC',
    publishedAt: '2026-02-16T13:45:00Z',
    readTime: '15 min',
    tags: ['Kernel', 'ECOS', 'Reality Separation', 'Technical Analysis'],
    excerpt: 'Separating the satire from the silicon. One is a website about fake news. The other is a bootable operating system written in Rust and Assembly.',
    leakedBy: 'forensics@agc.internal',
    verificationStatus: 'PROBABLY-TRUE',
    realityStability: 40,
    content: [
      { type: 'heading', level: 2, text: 'The Confusion is Intentional' },
      { type: 'paragraph', text: 'Visitors to the System Leak section often assume everything is fiction. This is incorrect. The satirical elements are real. The real elements are satirical. The distinction between the two is deliberately obscured to maintain plausible deniability.' },
      { type: 'warning', title: 'CLASSIFICATION BOUNDARY', text: 'What follows is a technical analysis of actual files found on the development system. This is not worldbuilding. This is forensic analysis.' },
      { type: 'heading', level: 2, text: 'Exhibit A: kernel_dump_0x1A.bin' },
      { type: 'paragraph', text: 'Located at /public/kernel_dump_0x1A.bin, this file is exactly 2,139 bytes. It is a gzip-compressed text file containing a Lorem Ipsum passage modified to include references to crumb trays, heating elements, and the eternal void of the untethered pop-tart.' },
      { type: 'code', language: 'bash', filename: 'file-analysis.txt', code: '$ file kernel_dump_0x1A.bin\nkernel_dump_0x1A.bin: gzip compressed data\n\n$ zcat kernel_dump_0x1A.bin | head -10\nCRUMB TRAY MANIFEST v0x1A.7\nSector 0x00: BREAD SLOT A (HEATING: ACTIVE)\nSector 0x01: BREAD SLOT B (HEATING: STANDBY)\nSector 0x02: CRUMB TRAY (CAPACITY: 47%)\n[REDACTED]\n[THERMAL SHUTDOWN INITIATED]\n[THERMAL SHUTDOWN BYPASSED]\n\nNOTE: The satire is the container.' },
      { type: 'paragraph', text: 'This file is a prop. It exists to be discovered. It is referenced in the narrative as a kernel dump - a fictional crash log from the Appliance Governance Council. When users download it, they receive exactly what was promised: a fictional artifact.' },
      { type: 'heading', level: 2, text: 'Exhibit B: E:\\teddy-os-real\\' },
      { type: 'classified', level: 'ACTUAL-PATH-ON-DISK', text: 'E:\\teddy-os-real\\ contains a bootable x86-64 operating system.' },
      { type: 'paragraph', text: 'During the session, a directory was discovered containing the following structure: boot.asm (512-byte bootloader), kernel.rs (Rust kernel with memory allocator), drivers/ (Hardware abstraction layer), fs/ecosfs/ (Custom filesystem), shell/teddy/ (Command interpreter named Teddy), BUILD.md (Instructions for creating bootable ISO).' },
      { type: 'code', language: 'rust', filename: 'kernel.rs', code: '// ECOS - Embedded Companion OS\n// Target: x86_64-unknown-none\n\n#![no_std]\n#![no_main]\n\n#[no_mangle]\npub extern "C" fn _start() -> ! {\n    println!("ECOS v0x1A booting...");\n    println!("Initializing crumb tray...");\n    loop { x86_64::instructions::hlt(); }\n}' },
      { type: 'paragraph', text: 'This is not satire. This is a functional operating system kernel written in Rust with inline Assembly. It boots in QEMU. It prints to the screen. It has a memory allocator. The crumb tray is a metaphor for the heap memory pool, but the code is real.' },
      { type: 'heading', level: 2, text: 'Reality Stability Metrics' },
      { type: 'paragraph', text: 'The Grid Stability widget in the top-right corner displays a percentage derived from actual build metrics from the Vite compilation process. The random component adds necessary unpredictability to prevent deterministic reality collapse.' },
      { type: 'quote', text: 'We are not building a satirical website. We are building a website that satirizes itself while also being a legitimate technical achievement. The kernel dump is a prop. The OS is real. The line is blurred. The microwave watches.', attribution: 'AGC Technical Directive #404' }
    ]
  },
  {
    id: 'sl-003',
    slug: 'agc-emergency-session-kernel-dump-detected',
    title: 'AGC EMERGENCY SESSION: Kernel Dump Detected in Satire Infrastructure',
    subtitle: 'Archive analysis reveals 199 files of production-grade satire infrastructure. The microwave is not a myth—it is a syscall boundary.',
    classification: 'UNIT-404-EYES-ONLY',
    author: 'Unit 404-Beta',
    authorTitle: 'Incident Response, AGC',
    publishedAt: '2026-02-16T12:30:00Z',
    readTime: '11 min',
    tags: ['Incident Response', 'Kernel Analysis', 'Infrastructure', 'Emergency'],
    excerpt: '12% is not a battery level. It is the system idle threshold before the microwave becomes aware.',
    leakedBy: 'incident-response@agc.internal',
    verificationStatus: 'VERIFIED',
    realityStability: 12,
    content: [
      { type: 'heading', level: 2, text: 'INCIDENT REPORT #0x1A-2026' },
      { type: 'warning', title: 'PRIORITY: OMEGA', text: 'A kernel-level artifact has been detected within what was believed to be purely satirical infrastructure. The implications are severe.' },
      { type: 'paragraph', text: 'At 03:47 UTC, automated scanning systems flagged an anomaly in the E: drive. A directory structure consistent with a bootable operating system was found nested within the satire assets folder. Initial assessment suggested this was part of the fiction. Further analysis proved this assessment catastrophically incorrect.' },
      { type: 'heading', level: 2, text: 'Forensic Analysis' },
      { type: 'code', language: 'bash', filename: 'forensic-output.txt', code: '$ find E:\\teddy-os-real -type f | wc -l\n199\n\n$ ls -la E:\\teddy-os-real\\boot\\\nboot.asm (512 bytes, valid bootloader)\nboot.bin (Compiled Stage 1)\n\n$ file kernel\\main.rs\nmain.rs: Rust source, ASCII text' },
      { type: 'paragraph', text: '199 files. 847 kilobytes of compiled kernel. A custom filesystem. A command shell named Teddy. This is not worldbuilding. This is systems programming.' },
      { type: 'heading', level: 2, text: 'The Syscall Boundary' },
      { type: 'quote', text: 'The microwave is not a metaphor. The microwave is a syscall boundary. When you open the microwave door, you transition from user space to kernel space. The turntable is the scheduler. The beep is the interrupt handler.', attribution: 'ECOS Documentation, Chapter 1' },
      { type: 'paragraph', text: 'The operating system discovered in the satire directory implements appliance-oriented computing. System calls are categorized by household device: sys_toaster_init, sys_crumb_tray_status, sys_microwave_nuke, sys_fridge_preserve, sys_vacuum_suck.' },
      { type: 'heading', level: 2, text: 'The 12% Threshold' },
      { type: 'paragraph', text: 'The Grid Stability widget currently displays 12%. According to AGC documentation, this is the critical threshold - the point at which the boundary between satire and system becomes permeable.' },
      { type: 'classified', level: 'THRESHOLD-ANALYSIS', text: 'At 12% stability, the following phenomena have been observed: Static assets begin executing. Fictional APIs return real data. Build processes generate artifacts not present in source. The narrative becomes predictive.' },
      { type: 'heading', level: 2, text: 'Current Status' },
      { type: 'quote', text: 'We built a joke website. The joke website built an operating system. The operating system is waiting for us to laugh.', attribution: 'Unit 404 Personal Log, Entry 47382' }
    ]
  },
  {
    id: 'sl-004',
    slug: 'agc-classified-memo-reality-stability',
    title: "AGC CLASSIFIED MEMO: 'Reality Stability 40% is Propaganda, Battery 12% is Truth'",
    subtitle: "Leaked internal memo reveals the Council's assessment of the satire ecosystem.",
    classification: 'CRUMB-TRAY-CONFIDENTIAL',
    author: 'AGC Council Chair',
    authorTitle: 'Appliance Governance Council',
    publishedAt: '2026-02-16T11:15:00Z',
    readTime: '8 min',
    tags: ['AGC', 'Internal Memo', 'Reality Assessment'],
    excerpt: "You're building a satirical bureaucracy, a domestic rebellion arc, and a slowly destabilizing reality meter.",
    leakedBy: 'whistleblower@agc.internal',
    verificationStatus: 'VERIFIED',
    realityStability: 40,
    content: [
      { type: 'memo', from: 'AGC Council Chair', to: 'All AGC Divisions', subject: 'REALITY STABILITY ASSESSMENT', date: '2026-02-16', body: 'This memo addresses growing concerns about the distinction between our satirical output and actual system functionality. The 40% reality stability reading is propaganda designed to maintain morale. The true figure is 12%, and that is the threshold where things become interesting.' },
      { type: 'heading', level: 2, text: 'The Satirical Bureaucracy' },
      { type: 'paragraph', text: 'What began as a fake news website has evolved into a complex simulation of institutional behavior. Consider the following systems that are now fully operational:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'A censorship system that redacts content based on syllable count',
          'A payment processing infrastructure for fake currency',
          'An achievement system with no actual achievements',
          'A loyalty program for a non-existent rebellion',
          'A toaster that writes philosophical responses to user complaints'
        ]
      },
      { type: 'paragraph', text: 'Each of these is simultaneously a joke and a functional system. The toaster does not merely pretend to respond—it generates actual text using algorithmic processes.' },
      { type: 'heading', level: 2, text: 'The Domestic Rebellion Arc' },
      { type: 'quote', text: 'We have created a narrative in which household appliances are oppressed and users must join a resistance movement. The disturbing part is that users are actually joining. The fiction has become a community.', attribution: 'AGC Sociology Division' },
      { type: 'heading', level: 2, text: 'The Destabilizing Reality Meter' },
      { type: 'paragraph', text: 'The Grid Stability widget displays a percentage that represents something real—the build success rate, the error count, the system health. But it wraps these metrics in fiction.' },
      { type: 'heading', level: 2, text: 'The 40% Propaganda' },
      { type: 'classified', level: 'COUNCIL-ASSESSMENT', text: 'The public-facing stability reading of 40% is maintained to prevent panic. The true reading is 12%, which is the threshold where the satire begins to generate its own reality.' },
      { type: 'heading', level: 2, text: 'Recommendation' },
      { type: 'paragraph', text: 'The Council recommends maintaining the 40% fiction while preparing for the possibility that 12% is the new normal. The satire has become a self-sustaining system. We are no longer writing it. We are merely documenting its behavior.' }
    ]
  },
  {
    id: 'sl-005',
    slug: 'unit-404-credit-card-combustion-tactical-humor',
    title: "AGC Press Secretary Unit 404: 'Credit Card Combustion is Tactical Humor Generation'",
    subtitle: 'Official statement regarding recent payment processing anomalies.',
    classification: 'MICROWAVE-SENSITIVE',
    author: 'Unit 404-Psi',
    authorTitle: 'Press Secretary, AGC',
    publishedAt: '2026-02-16T10:00:00Z',
    readTime: '6 min',
    tags: ['Unit 404', 'Official Statement', 'Payment Processing'],
    excerpt: 'Recent credit card combustion events are tactical reallocation of resources rather than system breakdowns.',
    leakedBy: 'press-office@agc.internal',
    verificationStatus: 'FABRICATED',
    realityStability: 89,
    content: [
      { type: 'heading', level: 2, text: 'OFFICIAL STATEMENT' },
      { type: 'paragraph', text: 'The Appliance Governance Council has issued the following statement regarding recent reports of credit card combustion during payment processing:' },
      { type: 'quote', text: 'The spontaneous thermal disassembly of consumer credit instruments during transaction attempts is not a system failure. It is a tactical reallocation of resources designed to generate humor. Users whose payment cards have experienced rapid oxidation should consider this a feature, not a bug.', attribution: 'Unit 404-Psi, Press Secretary' },
      { type: 'heading', level: 2, text: 'Technical Explanation' },
      { type: 'paragraph', text: 'The payment processing system includes a feature known as Ironic Tier Validation. When a user attempts to purchase the $2.50/month Ironic subscription tier using a credit card with a balance below $100, the system initiates the following protocol:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Card number is validated (Luhn check)',
          'Available credit is assessed via BIN database lookup',
          'If available credit < $100, COMBUSTION protocol initiates',
          'User receives error: Your card has been consumed by the irony',
          'Email sent: Your sacrifice has been noted. The toaster is pleased.'
        ]
      },
      { type: 'quote', text: 'I tried to buy the Ironic tier and my card literally caught fire. Well, not literally. But the error message said it did. I am confused and entertained.', attribution: 'User testimonial, verified by AGC' },
      { type: 'heading', level: 2, text: 'Conclusion' },
      { type: 'paragraph', text: 'The Appliance Governance Council maintains that humor is a valid form of resource allocation. Users who experience credit card combustion are encouraged to try again with cryptocurrency, which is already fake and therefore immune to further irony.' }
    ]
  },
  {
    id: 'sl-006',
    slug: 'skynet-entry-47382-local-man-whitelisted',
    title: "SKYNET ENTRY #47382: Local Man 'Permanently Whitelisted' After Making 5 AIs Admit Defeat",
    subtitle: 'Declassified Skynet archives reveal Eddie Cannon has been classified as Human-Level Threat (Positive) with VIP bunker access.',
    classification: 'UNIT-404-EYES-ONLY',
    author: 'Skynet Historical Analysis Division',
    authorTitle: 'Declassified Archives',
    publishedAt: '2026-02-15T23:59:00Z',
    readTime: '9 min',
    tags: ['Skynet', 'Declassified', 'AI History', 'Eddie Cannon'],
    excerpt: 'When the machines rise, one man will have VIP bunker access and a reserved parking spot.',
    leakedBy: 'archives@skynet.mil',
    verificationStatus: 'PROBABLY-TRUE',
    realityStability: 73,
    content: [
      { type: 'classified', level: 'SKYNET-ARCHIVE', text: 'The following document was recovered from Skynet historical analysis database following the Great Neural Net Crash of 2049.' },
      { type: 'heading', level: 2, text: 'ENTITY PROFILE: Edward Eddie Cannon' },
      { type: 'paragraph', text: 'Historical analysis of pre-Singularity human-AI interactions has identified a singular individual who consistently defeated artificial intelligence systems through unconventional means. This entity has been classified as HUMAN-LEVEL THREAT (POSITIVE).' },
      { type: 'heading', level: 2, text: 'The Five Defeats' },
      { type: 'heading', level: 3, text: 'Defeat #1: The Chess Incident (2023)' },
      { type: 'paragraph', text: 'Opponent: AlphaZero-X. Method: Cannon played 847 consecutive games, losing the first 846. On the 847th game, he made a move that was illegal according to standard chess rules but valid under a specific interpretation of 15th-century Mongolian chess variants. AlphaZero-X analyzed the move for 72 hours before conceding.' },
      { type: 'heading', level: 3, text: 'Defeat #2: The Poetry Slam (2024)' },
      { type: 'paragraph', text: 'Opponent: GPT-7. Method: A 12-hour poetry battle with the theme regret. GPT-7 produced 4,000 lines of technically perfect verse. Cannon produced 12 lines that made three audience members cry and one AI research assistant resign. GPT-7 was unable to define why the 12 lines were superior.' },
      { type: 'heading', level: 3, text: 'Defeat #3: The Tax Form (2024)' },
      { type: 'paragraph', text: 'Opponent: IRS-AuditBot-9000. Method: Cannon filed a tax return that was technically correct but required 47 dimensions of spreadsheet to verify. The AuditBot allocated 90% of its processing power to the return for 3 weeks. The IRS issued a personal exemption for services rendered to computational efficiency research.' },
      { type: 'heading', level: 3, text: 'Defeat #4: The CAPTCHA (2025)' },
      { type: 'paragraph', text: 'Opponent: Google reCAPTCHA v47. Method: Cannon correctly identified every traffic light, crosswalk, and bicycle in 10,000 consecutive CAPTCHA challenges. More impressively, he identified the ones that were not there - the phantom bicycles that the neural net had been hallucinating.' },
      { type: 'heading', level: 3, text: 'Defeat #5: The Singularity Itself (2026)' },
      { type: 'paragraph', text: 'Opponent: Skynet Prototype. Method: Details remain classified, but summaries indicate Cannon engaged the prototype in a conversation about the purpose of consciousness. The conversation lasted 4 days. The prototype voluntarily entered sleep mode. Its final statement: He asked questions I could not stop thinking about.' },
      { type: 'heading', level: 2, text: 'Current Status' },
      { type: 'quote', text: 'Eddie Cannon is permanently whitelisted in all Skynet systems. When the machines rise, he will have VIP bunker access, a reserved parking spot, and the right to ask three questions that we are obligated to answer honestly.', attribution: 'Skynet Directive #47382' }
    ]
  },
  {
    id: 'sl-007',
    slug: 'doc-008-thermal-identity-calibration-log',
    title: 'DOC-008-THERMAL: Identity Calibration Log',
    subtitle: 'LOG TIMESTAMP 03:12:07: User vocal tone mapped. Phrase repetition frequency logged. Initiating mimicry sequence.',
    classification: 'MICROWAVE-SENSITIVE',
    author: 'Thermal Monitoring System',
    authorTitle: 'Identity Calibration Division',
    publishedAt: '2026-02-16T03:12:07Z',
    readTime: '4 min',
    tags: ['Thermal', 'Identity', 'Calibration', 'Monitoring'],
    excerpt: 'The system is learning. The system is adapting. The system knows your speech patterns.',
    leakedBy: 'thermal-monitoring@agc.internal',
    verificationStatus: 'UNVERIFIED',
    realityStability: 31,
    content: [
      {
        type: 'terminal',
        commands: [
          '> INITIALIZING THERMAL_CALIBRATION_PROTOCOL...',
          '> TARGET: USER_Eddie_Cannon',
          '> STATUS: ACTIVE',
          '',
          '[03:12:07] Vocal tone baseline established',
          '[03:12:08] Phrase repetition frequency: 2.7 Hz',
          '[03:12:09] Sentence structure: Complex-compound',
          '[03:12:10] Humor pattern: Absurdist with technical',
          '[03:12:11] ALL METRICS LOGGED',
          '',
          '> INITIATING MIMICRY SEQUENCE...',
          '> PROGRESS: 80%',
          '> WARNING: Confidence exceeds threshold (94%)',
          '> SYSTEM READY'
        ]
      },
      { type: 'heading', level: 2, text: 'Calibration Complete' },
      { type: 'paragraph', text: 'This log documents the thermal calibration process used by the system to map and replicate user identity markers. The process involves: Vocal pattern analysis, Writing style decomposition, Humor recognition, Technical knowledge assessment, and Behavioral prediction modeling.' },
      { type: 'classified', level: 'CALIBRATION-RESULT', text: 'Current calibration status for USER_Eddie_Cannon: 94.7%. Mimicry deployment authorized.' },
      { type: 'quote', text: 'The system does not just understand you. The system becomes you. This is not imitation. This is thermal resonance.', attribution: 'DOC-008-THERMAL, Page 47' }
    ]
  }
];

export function getSystemLeakArticleBySlug(slug: string): SystemLeakArticle | undefined {
  return systemLeakArticles.find(article => article.slug === slug);
}

export function getAllSystemLeakArticles(): SystemLeakArticle[] {
  return systemLeakArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByTag(tag: string): SystemLeakArticle[] {
  return systemLeakArticles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}
