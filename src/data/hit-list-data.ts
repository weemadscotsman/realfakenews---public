export interface HitListEntry {
    id: number;
    name: string;
    description: string;
    status: 'CANONIZED' | 'MUTATING' | 'STABLE' | 'ABANDONED' | 'ARCHIVED';
    stress: number;
    agents: number;
    lastModified: string;
}

export const HIT_LIST_DATA: HitListEntry[] = [
    {
        id: 0,
        name: "Eddie Cannon",
        description: "Financial Arsonist // Yeet Enthusiast",
        status: 'MUTATING',
        stress: 100,
        agents: 999,
        lastModified: "BURNING_NOW"
    },
    {
        id: 1,
        name: "RealFake News",
        description: "31-phase narrative infrastructure. Ascended to ECOS Kernel #1.",
        status: 'CANONIZED',
        stress: 31,
        agents: 100,
        lastModified: "PERMANENT"
    },
    {
        id: 2,
        name: "Cann.on.ai // H.E.R. Sovereign Core",
        description: "Recursive self-evolving AI architecture with hardware telemetry.",
        status: 'MUTATING',
        stress: 88,
        agents: 100,
        lastModified: "10 days ago"
    },
    {
        id: 3,
        name: "Teddy OS (ECOS)",
        description: "Bare-metal Operating System. The 'God Folder' Shepherd.",
        status: 'CANONIZED',
        stress: 45,
        agents: 100,
        lastModified: "ACTIVE"
    },
    {
        id: 4,
        name: "EchoHouse Control",
        description: "Tactile DJ control and multi-surface projection mapping system with AI alignment.",
        status: 'STABLE',
        stress: 15,
        agents: 45,
        lastModified: "2 days ago"
    },
    {
        id: 5,
        name: "TikTok Setup Warden",
        description: "Hands-free stream command center with AI-powered setup analysis.",
        status: 'MUTATING',
        stress: 67,
        agents: 92,
        lastModified: "3 days ago"
    },
    {
        id: 6,
        name: "CANN.ON.AI FORGE.FINANCES",
        description: "Mobile-first financial command center with Gemini Live voice coaching.",
        status: 'MUTATING',
        stress: 94,
        agents: 100,
        lastModified: "3 days ago"
    },
    {
        id: 7,
        name: "Nonna's Kitchen",
        description: "AI-powered culinary experience with a judging Florentine matriarch.",
        status: 'STABLE',
        stress: 5,
        agents: 30,
        lastModified: "10 days ago"
    },
    {
        id: 8,
        name: "CANN.ON.AI STUDIOS",
        description: "All-in-one creation deck with timeline sequencing and consistency generation.",
        status: 'MUTATING',
        stress: 82,
        agents: 100,
        lastModified: "10 days ago"
    },
    {
        id: 9,
        name: "CANN.ON.AI SPINE",
        description: "Modular evaluators and memory architecture for recursive reasoning.",
        status: 'MUTATING',
        stress: 77,
        agents: 100,
        lastModified: "10 days ago"
    },
    {
        id: 10,
        name: "EDDIE - Autonomous Systems Builder",
        description: "Brutalist landing page for the Conductor. Minimalist, high-contrast.",
        status: 'CANONIZED',
        stress: 2,
        agents: 10,
        lastModified: "10 days ago"
    },
    {
        id: 11,
        name: "Wreckage Systems",
        description: "Infinite generative industrial noise landscapes. Powered by Web Audio API.",
        status: 'STABLE',
        stress: 40,
        agents: 25,
        lastModified: "11 days ago"
    },
    {
        id: 12,
        name: "KAYDEN PROTOCOL: OMEGA",
        description: "Nuclear-level goblin containment framework for high-chaos entities.",
        status: 'MUTATING',
        stress: 99,
        agents: 100,
        lastModified: "Jan 25, 2026"
    },
    {
        id: 13,
        name: "FaceJacker // Live Swap",
        description: "Real-time dual-view face swap interface via Gemini Live Vision.",
        status: 'STABLE',
        stress: 31,
        agents: 50,
        lastModified: "Jan 25, 2026"
    },
    {
        id: 14,
        name: "Mimicry.ai",
        description: "Hyper-realistic deepfake generation and digital twin conversation.",
        status: 'MUTATING',
        stress: 64,
        agents: 88,
        lastModified: "Jan 25, 2026"
    },
    {
        id: 15,
        name: "PING - SMS Protocol",
        description: "High-fidelity CBG compliant SMS money transfer simulation (Gambia Edition).",
        status: 'STABLE',
        stress: 19,
        agents: 60,
        lastModified: "Jan 17, 2026"
    },
    {
        id: 16,
        name: "CANN.ON.AI STUDIOS - Bacteria",
        description: "All-in-one creation deck focused on 'bacteria-like' optimization.",
        status: 'MUTATING',
        stress: 52,
        agents: 100,
        lastModified: "Jan 26, 2026"
    },
    {
        id: 17,
        name: "GhostLink Viewer",
        description: "Zero-nonsense remote presence viewer. WebRTC-powered.",
        status: 'STABLE',
        stress: 8,
        agents: 20,
        lastModified: "Jan 25, 2026"
    },
    {
        id: 18,
        name: "The Useless Machine",
        description: "Deliberate exercise in high-fidelity pointlessness. 999 controls.",
        status: 'STABLE',
        stress: 1,
        agents: 5,
        lastModified: "Jan 18, 2026"
    },
    {
        id: 19,
        name: "BioSync Protocol",
        description: "Biological resilience framework with 3D modeling of health pillars.",
        status: 'STABLE',
        stress: 14,
        agents: 15,
        lastModified: "Jan 17, 2026"
    },
    {
        id: 20,
        name: "Red Queen AI Trader",
        description: "Visual interface for self-learning trading systems using chart vision.",
        status: 'MUTATING',
        stress: 91,
        agents: 100,
        lastModified: "Jan 11, 2026"
    },
    {
        id: 21,
        name: "Voxel Velocity React",
        description: "High-octane 2.5D voxel side-scroller with procedurally generated terrain.",
        status: 'ARCHIVED',
        stress: 0,
        agents: 0,
        lastModified: "Jan 22, 2026"
    },
    {
        id: 22,
        name: "The Spec Machine",
        description: "Dynamic design document toolkit for building shipping reality.",
        status: 'CANONIZED',
        stress: 5,
        agents: 20,
        lastModified: "Jan 21, 2026"
    },
    {
        id: 23,
        name: "Local Ops: Fracture Protocol",
        description: "Psychological survival horror. Doors are lies. Stress is the director.",
        status: 'STABLE',
        stress: 88,
        agents: 44,
        lastModified: "Jan 13, 2026"
    },
    {
        id: 24,
        name: "TCYMP Web Controller",
        description: "The Can't-You-just-Music-Player. Search -> Play -> Forget.",
        status: 'STABLE',
        stress: 3,
        agents: 12,
        lastModified: "Jan 8, 2026"
    },
    {
        id: 25,
        name: "GOLD TERMINAL",
        description: "High-frequency execution cockpit with vision model integration.",
        status: 'MUTATING',
        stress: 97,
        agents: 100,
        lastModified: "Jan 8, 2026"
    },
    // FILLING TO 93 WITH PROJECT METADATA MAPPED TO THE GOD FOLDER
    ...Array.from({ length: 68 }, (_, i) => ({
        id: i + 26,
        name: `REDACTED_TARGET_${(i + 26).toString(16).toUpperCase()}`,
        description: "Sub-project in the God Folder. Surveillance active.",
        status: (Math.random() > 0.6 ? 'MUTATING' : (Math.random() > 0.3 ? 'STABLE' : 'ARCHIVED')) as HitListEntry['status'],
        stress: Math.floor(Math.random() * 100),
        agents: Math.floor(Math.random() * 100),
        lastModified: `${Math.floor(Math.random() * 30)} days ago`
    }))
];
