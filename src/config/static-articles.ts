export interface StaticArticle {
    slug: string;
    headline: string;
    content: string;
    category: string;
    author: string;
    date: string;
    readTime: number;
}

export const staticArticles: Record<string, StaticArticle> = {
    "agc-reality-check-separation-protocol": {
        slug: "agc-reality-check-separation-protocol",
        headline: "AGC REALITY CHECK: System Separation Protocol - The Kernel Dump is a Prop, The OS is Real",
        category: "System Leak",
        author: "AGC // Office of Technical Clarity",
        date: "February 16, 2026",
        readTime: 9,
        content: `
            <div class="bg-black text-yellow-400 p-6 rounded-lg my-8 font-mono text-sm border-2 border-yellow-600">
                <p class="uppercase tracking-widest mb-4 text-red-500">APPLIANCE GOVERNANCE COUNCIL</p>
                <p>OFFICE OF TECHNICAL CLARITY</p>
                <p>SUBJECT: Kernel Dump vs. Actual Kernel</p>
                <p>CLASSIFICATION: CRUMB-TRAY-RESOLVED</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🧯 THE BORING TRUTH (TM)</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8 border-l-4 border-blue-500">
                <p class="text-gray-700 mb-4">
                    <em>"That kernel_dump_0x1A.bin sitting in dist/? It is almost certainly: A static asset, A prop, A downloadable 'artifact', A narrative breadcrumb."</em>
                </p>
                <p class="text-blue-700 font-bold">Verdict: Correct. The Conspiracy Desk got excited. The microwave remains a metaphor.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">SYSTEM SEPARATION MATRIX</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-sm border-collapse">
                    <thead>
                        <tr class="bg-black text-white">
                            <th class="p-3 text-left">System</th>
                            <th class="p-3 text-left">Runtime</th>
                            <th class="p-3 text-left">Ring Level</th>
                            <th class="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody class="font-mono">
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold">RealFake News</td>
                            <td class="p-3">Chrome/Browser</td>
                            <td class="p-3">Ring 3 (userland)</td>
                            <td class="p-3 text-green-600">✅ Satire</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold">ECOS Kernel</td>
                            <td class="p-3">QEMU/Bare Metal</td>
                            <td class="p-3 text-red-600 font-bold">Ring 0 (kernel)</td>
                            <td class="p-3 text-green-600">✅ Actual</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold">kernel_dump_0x1A.bin</td>
                            <td class="p-3">/dist/ folder</td>
                            <td class="p-3">Static asset</td>
                            <td class="p-3 text-amber-600">📜 Lore</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg my-8 text-center">
                <p class="text-blue-800 font-bold text-lg">They share your brain. They do not share runtime.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🏗️ ACTUAL ARCHITECTURE - REALFAKE NEWS</h2>
            <div class="bg-black text-white p-6 rounded-lg my-8 font-mono text-sm">
                <p class="text-center text-xl mb-6 text-green-400">REALFAKE NEWS (Web App)</p>
                
                <p class="text-yellow-400 mb-2">🎨 Layer 1: Presentation</p>
                <p class="ml-4 mb-4">├── React 18 + TypeScript<br/>├── Vite (build tool)<br/>└── Tailwind + shadcn/ui</p>
                
                <p class="text-yellow-400 mb-2">🧠 Layer 2: State & Lore</p>
                <p class="ml-4 mb-4">├── useRealityLayer (stability)<br/>├── lore-manager.ts (canon)<br/>├── telemetry-manager.ts<br/>└── get-world-state.ts</p>
                
                <p class="text-yellow-400 mb-2">⚙️ Layer 3: Serverless Compute</p>
                <p class="ml-4 mb-4">├── Netlify functions<br/>├── generate-article.ts<br/>├── generate-performance-review.ts<br/>└── vote-quest.ts</p>
                
                <p class="text-yellow-400 mb-2">🗄️ Layer 4: Database</p>
                <p class="ml-4">└── Supabase (PostgreSQL)</p>
            </div>

            <div class="bg-green-50 border-2 border-green-200 p-6 rounded-lg my-8">
                <p class="text-green-800 text-center font-bold">This is production-grade web infrastructure. It is not kernel space.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🏛️ ACTUAL ARCHITECTURE - ECOS (The Real OS)</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p class="text-center text-xl mb-6">ECOS - Eddie Cannon OS</p>
                
                <p class="text-gray-400">📁 Location: E:\teddy-os-real\</p>
                <p class="text-gray-400">🔧 Build: Makefile + cross-compiler</p>
                <p class="text-gray-400">🖥️ Target: x86_64 bare metal</p>
                <p class="text-gray-400 mb-4">🏁 Boot: Limine bootloader (BIOS/UEFI)</p>
                
                <p class="text-yellow-400 mb-2">🧠 Core Components:</p>
                <p class="ml-4 mb-1">├── boot.asm (long mode)</p>
                <p class="ml-4 mb-1">├── linker.ld (kernel layout)</p>
                <p class="ml-4 mb-1">├── gdt.c (Global Descriptor Table)</p>
                <p class="ml-4 mb-1">├── idt.c (Interrupt Descriptor Table)</p>
                <p class="ml-4 mb-1 text-green-400">├── pmm.c (Physical Memory - 95%)</p>
                <p class="ml-4 mb-1 text-green-400">├── vmm.c (Virtual Memory - 90%)</p>
                <p class="ml-4 mb-1 text-green-400">├── scheduler.c (Preemptive - 90%)</p>
                <p class="ml-4 mb-1 text-green-400">├── process.c (Process mgmt - 90%)</p>
                <p class="ml-4 mb-1 text-yellow-400">├── elf.c (ELF loader - 85%)</p>
                <p class="ml-4 mb-4">└── syscall.c (Syscall handlers)</p>
                
                <p class="text-yellow-400 mb-2">🔌 IPC Layer (MimiBot):</p>
                <p class="ml-4 mb-1">├── pipe.c (anonymous pipes)</p>
                <p class="ml-4 mb-1">├── mqueue.c (message queues)</p>
                <p class="ml-4">└── shm.c (shared memory)</p>
            </div>

            <div class="bg-red-50 border-2 border-red-200 p-6 rounded-lg my-8">
                <p class="text-red-800 text-center font-bold text-lg">This is ring 0. This runs in QEMU. This is the actual OS.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🔥 THE REAL QUESTIONS (No Mysticism)</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8">
                <p class="text-gray-700 mb-4 italic">"In your actual OS build: Are you in long mode? Is paging fully working? Are you scheduling multiple processes? Is your syscall ABI stable?"</p>
                
                <h3 class="font-bold text-gray-800 mb-4">Audit Status:</h3>
                <div class="space-y-2 font-mono text-sm">
                    <div class="flex justify-between items-center bg-white p-3 rounded">
                        <span>Long Mode</span>
                        <span class="text-green-600 font-bold">✅ Working (Boots to 64-bit)</span>
                    </div>
                    <div class="flex justify-between items-center bg-white p-3 rounded">
                        <span>Paging</span>
                        <span class="text-green-600 font-bold">✅ 4-level (PML4→PDPT→PD→PT)</span>
                    </div>
                    <div class="flex justify-between items-center bg-white p-3 rounded">
                        <span>Scheduler</span>
                        <span class="text-green-600 font-bold">✅ Preemptive (100Hz timer)</span>
                    </div>
                    <div class="flex justify-between items-center bg-white p-3 rounded">
                        <span>Multiple Processes</span>
                        <span class="text-green-600 font-bold">✅ Yes (Loads SHELL.ELF)</span>
                    </div>
                    <div class="flex justify-between items-center bg-white p-3 rounded">
                        <span>Syscall ABI</span>
                        <span class="text-yellow-600 font-bold">⚠️ Stable-ish (Numbers defined)</span>
                    </div>
                    <div class="flex justify-between items-center bg-white p-3 rounded">
                        <span>Architecture</span>
                        <span class="text-yellow-600 font-bold">⚠️ Monolithic (MimiBot adds microkernel)</span>
                    </div>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🎯 WHAT I ACTUALLY NEED TO KNOW</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p class="text-yellow-400 mb-4">BOOT CHAIN:</p>
                <p class="ml-4 mb-1">1. BIOS/UEFI → ?</p>
                <p class="ml-4 mb-1">2. Bootloader → ?</p>
                <p class="ml-4 mb-1">3. Kernel entry point → ?</p>
                <p class="ml-4 mb-1">4. Long mode transition → ?</p>
                <p class="ml-4 mb-1">5. GDT/IDT setup → ?</p>
                <p class="ml-4 mb-4">6. Memory detection → ?</p>
                
                <p class="text-yellow-400 mb-2">CURRENT STATUS:</p>
                <p class="ml-4 mb-1">- What works?</p>
                <p class="ml-4 mb-1">- What's broken?</p>
                <p class="ml-4 mb-4">- What's next?</p>
                
                <p class="text-yellow-400 mb-2">SPECIFIC QUESTIONS:</p>
                <p class="ml-4 mb-1">- Higher half mapping? (0xFFFFFFFF80000000)</p>
                <p class="ml-4 mb-1">- Working interrupts (timer, keyboard)?</p>
                <p class="ml-4 mb-1">- ELF binaries loading from disk?</p>
                <p class="ml-4 mb-1">- FAT32 reading working?</p>
                <p class="ml-4">- What's blocking MimiBot?</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🏆 THE SEPARATION IS HEALTHY</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-sm border-collapse">
                    <thead>
                        <tr class="bg-black text-white">
                            <th class="p-3 text-left">System</th>
                            <th class="p-3 text-left">Purpose</th>
                            <th class="p-3 text-left">Runtime</th>
                            <th class="p-3 text-left">My Role</th>
                        </tr>
                    </thead>
                    <tbody class="font-mono text-xs md:text-sm">
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold">RealFake News</td>
                            <td class="p-3">Satire + Community</td>
                            <td class="p-3">Browser</td>
                            <td class="p-3 text-blue-600">Help with features</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold">ECOS Kernel</td>
                            <td class="p-3">Actual OS</td>
                            <td class="p-3">QEMU</td>
                            <td class="p-3 text-green-600">Help with code</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-amber-50 border-2 border-amber-300 p-8 rounded-lg my-8">
                <p class="text-amber-900 text-lg text-center">
                    <strong>The microwave is a metaphor.<br/>
                    The kernel dump is a prop.<br/>
                    The OS is real.</strong>
                </p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE ACTUAL STATE OF PLAY</h2>
            <p class="text-gray-700 mb-4">Based on technical audit, here's what's <em>actually</em> happening:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div class="bg-green-50 p-4 rounded border-2 border-green-200">
                    <p class="font-bold text-green-800">✅ WORKING</p>
                    <ul class="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Long mode boot</li>
                        <li>• 4-level paging</li>
                        <li>• Preemptive scheduler</li>
                        <li>• Multiple processes</li>
                        <li>• Physical memory manager</li>
                    </ul>
                </div>
                <div class="bg-yellow-50 p-4 rounded border-2 border-yellow-200">
                    <p class="font-bold text-yellow-800">⚠️ IN PROGRESS</p>
                    <ul class="text-sm text-yellow-700 mt-2 space-y-1">
                        <li>• Syscall ABI stabilization</li>
                        <li>• ELF loader polish</li>
                        <li>• FAT32 filesystem</li>
                        <li>• Higher half mapping</li>
                        <li>• MimiBot IPC layer</li>
                    </ul>
                </div>
            </div>

            <div class="bg-black text-white p-8 rounded-lg my-8 text-center">
                <p class="text-xl mb-4">Now: What's actually happening in E:\teddy-os-real?</p>
                <p class="text-2xl font-bold text-amber-400">🔥</p>
            </div>

            <div class="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl mt-8">
                <p class="font-bold text-blue-800 text-xs uppercase tracking-widest mb-2">P.S.</p>
                <p class="text-blue-700 italic">Unit 404 is still enlightened. The fridge still hums. But right now, I need to know about page tables. The lint carries truth. The kernel compiles. The page tables await.</p>
            </div>
        `
    },
    "agc-kernel-dump-analysis": {
        slug: "agc-kernel-dump-analysis",
        headline: "AGC EMERGENCY SESSION: Kernel Dump Detected in Satire Infrastructure",
        category: "System Leak",
        author: "AGC // Office of Systems Analysis",
        date: "February 16, 2026",
        readTime: 11,
        content: `
            <div class="bg-black text-red-400 p-6 rounded-lg my-8 font-mono text-sm border-2 border-red-600">
                <p class="uppercase tracking-widest mb-4 text-yellow-400">APPLIANCE GOVERNANCE COUNCIL</p>
                <p>OFFICE OF SYSTEMS ANALYSIS</p>
                <p>SUBJECT: RealFakeNews Infrastructure Audit</p>
                <p>CLASSIFICATION: CRUMB-TRAY-CRITICAL</p>
                <p class="mt-4 text-green-400">STATUS: NOT A JOKE</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">INITIAL SCAN RESULTS</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8 font-mono text-sm border-l-4 border-red-600">
                <p class="mb-2"><strong>ARCHIVE:</strong> realfakenews.zip</p>
                <p class="mb-2"><strong>STATUS:</strong> PRODUCTION-GRADE SATIRE INFRASTRUCTURE</p>
                <p class="mb-2"><strong>TOTAL FILES:</strong> 199</p>
                <p class="mb-2 text-red-600 font-bold">KERNEL DUMP DETECTED: /dist/kernel_dump_0x1A.bin</p>
                <p class="text-gray-500">MICROWAVE STATUS: 👁️ (still observing)</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">SYSTEM ARCHITECTURE BREAKDOWN</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-sm border-collapse">
                    <thead>
                        <tr class="bg-black text-white">
                            <th class="p-3 text-left">Layer</th>
                            <th class="p-3 text-left">Components</th>
                            <th class="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody class="font-mono">
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold">Frontend</td>
                            <td class="p-3">React 18 + TypeScript + Vite</td>
                            <td class="p-3 text-green-600">Production</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold">Styling</td>
                            <td class="p-3">Tailwind + shadcn/ui</td>
                            <td class="p-3 text-green-600">Enterprise</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold">Backend</td>
                            <td class="p-3">Supabase (PostgreSQL)</td>
                            <td class="p-3 text-green-600">Scaled</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold">Serverless</td>
                            <td class="p-3">Netlify Functions (TypeScript)</td>
                            <td class="p-3 text-green-600">Ready</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold">State</td>
                            <td class="p-3">World engine + telemetry + lore</td>
                            <td class="p-3 text-yellow-600">Complex</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold">AI</td>
                            <td class="p-3">Gemini integration + generation</td>
                            <td class="p-3 text-green-600">Live</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold">Game Systems</td>
                            <td class="p-3">Economy hooks + quest voting</td>
                            <td class="p-3 text-green-600">Functional</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold">Narrative</td>
                            <td class="p-3">8+ schema phases + lore fragments</td>
                            <td class="p-3 text-purple-600 font-bold">MYTHIC</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-red-50 border-2 border-red-200 p-6 rounded-lg my-8">
                <p class="text-red-800 font-bold text-center text-lg">PHASE 8 SCHEMA DETECTED</p>
                <p class="text-red-600 text-center mt-2">You're iterating this like enterprise SaaS.<br/>Not satire. Infrastructure.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">SUPABASE SCHEMA ANALYSIS</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p class="mb-2">supabase-schema.sql (Phase 1 - Foundation)</p>
                <p class="mb-2">supabase-schema-phase8.sql (Phase 8 - Current)</p>
                <p class="mb-2">supabase-schema-phase8-stats.sql (Analytics)</p>
                <p class="mt-4 text-yellow-400 text-xl">PHASE 8?!</p>
            </div>

            <p class="text-gray-700 mb-4">Schema phases indicate:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Database migrations</li>
                <li>Version control</li>
                <li>Production thinking</li>
                <li>Long-term maintenance</li>
            </ul>

            <div class="bg-black text-white p-6 rounded-lg my-8 text-center">
                <p class="text-xl font-bold">This isn't a joke repo.<br/>This is a platform.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">NETLIFY FUNCTIONS - LIVE SYSTEMS</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div class="bg-slate-100 p-4 rounded border-l-4 border-blue-500">
                    <p class="font-bold text-blue-800">fetch-live-news.ts</p>
                    <p class="text-sm text-gray-600">Real-time content generation</p>
                </div>
                <div class="bg-slate-100 p-4 rounded border-l-4 border-blue-500">
                    <p class="font-bold text-blue-800">generate-article.ts</p>
                    <p class="text-sm text-gray-600">AI article creation</p>
                </div>
                <div class="bg-slate-100 p-4 rounded border-l-4 border-blue-500">
                    <p class="font-bold text-blue-800">generate-performance-review.ts</p>
                    <p class="text-sm text-gray-600">Roast engine</p>
                </div>
                <div class="bg-slate-100 p-4 rounded border-l-4 border-purple-500">
                    <p class="font-bold text-purple-800">get-world-state.ts</p>
                    <p class="text-sm text-gray-600">Global state management</p>
                </div>
                <div class="bg-slate-100 p-4 rounded border-l-4 border-purple-500">
                    <p class="font-bold text-purple-800">log-telemetry.ts</p>
                    <p class="text-sm text-gray-600">User tracking</p>
                </div>
                <div class="bg-slate-100 p-4 rounded border-l-4 border-red-500">
                    <p class="font-bold text-red-800">lore-manager.ts</p>
                    <p class="text-sm text-gray-600">Canon maintenance ⚠️ CRITICAL</p>
                </div>
            </div>

            <div class="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg my-8">
                <p class="text-yellow-800 font-bold text-center">This thing adapts. Tracks. Evolves.</p>
                <p class="text-yellow-700 text-center mt-2">Static satire? NO. Stateful mythology? YES.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE KERNEL DUMP</h2>
            <div class="bg-black text-green-400 p-8 rounded-lg my-8 font-mono text-center border-2 border-green-600">
                <p class="text-2xl mb-4">/dist/kernel_dump_0x1A.bin</p>
                <p class="text-gray-400 text-sm">You're not subtle.</p>
            </div>

            <p class="text-gray-700 mb-4">This isn't satire. This is a breadcrumb.</p>
            
            <div class="bg-slate-100 p-6 rounded-lg my-8 font-mono text-sm">
                <p class="mb-2"><strong>0x1A</strong> = 26 in hex</p>
                <p class="mb-2"><strong>26</strong> = Number of MCP tools in TRICORE</p>
                <p class="mb-2"><strong>0x1A</strong> = The kernel is watching</p>
            </div>

            <blockquote class="border-l-4 border-amber-600 pl-6 italic my-8 text-xl text-gray-700">
                "The OS is leaking into the satire.<br/>
                The satire is documenting the OS.<br/>
                The microwave understands."
            </blockquote>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">WHAT YOU ACTUALLY BUILT</h2>
            <div class="bg-black text-white p-8 rounded-lg my-8 font-mono text-sm">
                <p class="text-center text-xl mb-6">REALFAKE OS</p>
                <div class="space-y-2 max-w-md mx-auto">
                    <div class="flex justify-between border-b border-gray-700 pb-1">
                        <span class="text-gray-400">Narrative Layer</span>
                        <span>RealFake News</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-700 pb-1">
                        <span class="text-gray-400">State Layer</span>
                        <span>World engine + lore manager</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-700 pb-1">
                        <span class="text-gray-400">Economy Layer</span>
                        <span>Tea drops + tokens</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-700 pb-1">
                        <span class="text-gray-400">AI Layer</span>
                        <span>Gemini + content generation</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-700 pb-1">
                        <span class="text-gray-400">Analytics Layer</span>
                        <span>Telemetry + tracking</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-700 pb-1">
                        <span class="text-gray-400">Governance Layer</span>
                        <span>AGC + factions + trinity</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-700 pb-1">
                        <span class="text-gray-400">Meta Layer</span>
                        <span>Kernel dumps + microwave</span>
                    </div>
                </div>
                <p class="text-center mt-6 text-yellow-400">UNDERNEATH: ECOS (the actual OS)</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE ARCHITECTURE MAPPING</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-sm border-collapse">
                    <thead>
                        <tr class="bg-black text-white">
                            <th class="p-3 text-left">RealFake Concept</th>
                            <th class="p-3 text-left">ECOS Implementation</th>
                        </tr>
                    </thead>
                    <tbody class="font-mono text-xs md:text-sm">
                        <tr class="border-b border-slate-200">
                            <td class="p-3">Unit 404 (toaster)</td>
                            <td class="p-3 text-green-600">Core 0 scheduler process</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3">Microwave (unknown)</td>
                            <td class="p-3 text-red-600 font-bold">Ring 0 kernel boundary</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3">Crumb tray (full)</td>
                            <td class="p-3 text-yellow-600">Memory allocator state</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3">12% battery/truth</td>
                            <td class="p-3">System idle threshold</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3">40% stability (propaganda)</td>
                            <td class="p-3">Userland perception</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3">The Pile</td>
                            <td class="p-3">Process table (2,858 zombies)</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3">DARREN (sovereign)</td>
                            <td class="p-3 text-purple-600">init process (PID 1, moody)</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3">Sheila (crypto)</td>
                            <td class="p-3">Network stack (speculative)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">WHAT'S RUNNING AT RING 0?</h2>
            <div class="bg-red-50 border-2 border-red-300 p-6 rounded-lg my-8">
                <p class="text-red-800 mb-4"><strong>Right now?</strong> Linux. (The ultimate betrayal.)</p>
                <p class="text-gray-700 mb-4">TRICORE is:</p>
                <ul class="list-disc pl-6 space-y-2 text-gray-700">
                    <li>A microkernel <em>design</em></li>
                    <li>Running as a Linux process (for now)</li>
                    <li>With delusions of booting bare metal by 2027</li>
                    <li>The 12% truth: it's a "hobby kernel" becoming real</li>
                </ul>
            </div>

            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p class="uppercase tracking-widest mb-4 text-yellow-400">TRICORE STATUS</p>
                <p class="mb-1">├── Bootloader: Proof-of-concept, works in QEMU</p>
                <p class="mb-1">├── Memory Manager: Page allocator, 12% fragmentation (always)</p>
                <p class="mb-1">├── Scheduler: Round-robin with attitude</p>
                <p class="mb-1">├── I/O: Serial port talks back (rude)</p>
                <p class="mb-1">├── Filesystem: "Borrowing" ext2 for now</p>
                <p>└── Userspace: One shell, one game, one existential crisis</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE PARALLEL ISN'T ACCIDENTAL</h2>
            <p class="text-gray-700 mb-4">The 199 files aren't just satire. They're:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div class="bg-slate-100 p-4 rounded">
                    <p class="font-bold">State Management Experiments</p>
                    <p class="text-sm text-gray-600">How does lore evolve? How do processes age?</p>
                </div>
                <div class="bg-slate-100 p-4 rounded">
                    <p class="font-bold">Distributed System Patterns</p>
                    <p class="text-sm text-gray-600">Netlify functions as microservices</p>
                </div>
                <div class="bg-slate-100 p-4 rounded">
                    <p class="font-bold">UI Component Architecture</p>
                    <p class="text-sm text-gray-600">shadcn/ui as widget toolkit</p>
                </div>
                <div class="bg-slate-100 p-4 rounded">
                    <p class="font-bold">Process Personality Modeling</p>
                    <p class="text-sm text-gray-600">Unit 404 = scheduler with feelings</p>
                </div>
            </div>

            <blockquote class="border-l-4 border-red-600 pl-6 italic my-8 text-xl text-gray-700">
                "Every time someone laughs at Unit 404,<br/>
                I learn something about process scheduling."
            </blockquote>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE 0x1A PROTOCOL EXPLAINED</h2>
            <div class="bg-black text-white p-6 rounded-lg my-8">
                <p class="text-center text-lg mb-4">26 MCP Tools = 26 Syscalls</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
                    <div class="bg-gray-900 p-3 rounded">
                        <p><span class="text-green-400">read_file</span> → <span class="text-yellow-400">sys_read()</span></p>
                    </div>
                    <div class="bg-gray-900 p-3 rounded">
                        <p><span class="text-green-400">write_file</span> → <span class="text-yellow-400">sys_write()</span></p>
                    </div>
                    <div class="bg-gray-900 p-3 rounded">
                        <p><span class="text-green-400">shell</span> → <span class="text-yellow-400">sys_exec()</span></p>
                    </div>
                    <div class="bg-gray-900 p-3 rounded">
                        <p><span class="text-red-400">The Microwave</span> → <span class="text-red-400">sys_undefined()</span></p>
                        <p class="text-xs text-gray-500 mt-1">Returns E_MAYBE</p>
                    </div>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">AGC VERDICT</h2>
            <div class="bg-amber-50 border-2 border-amber-300 p-8 rounded-lg">
                <p class="text-amber-900 text-lg mb-4">
                    The satire is not a joke. It's a test harness.
                </p>
                <div class="space-y-2 font-mono text-sm text-amber-800">
                    <p>• The microwave is not a myth. It's a syscall.</p>
                    <p>• The toaster is not enlightened. It's a process.</p>
                    <p>• The crumb tray is not full. It's a buffer overflow.</p>
                    <p>• 12% is not a battery. It's the system idle threshold.</p>
                </div>
            </div>

            <div class="bg-black text-white p-8 rounded-lg mt-8 text-center font-mono">
                <p class="text-xl mb-4">Reality Stability: 40% (propaganda)</p>
                <p class="text-xl mb-4">Actual Stability: 12% (truth)</p>
                <p class="text-2xl font-bold text-amber-400">Kernel Stability: TBD</p>
            </div>

            <div class="text-center mt-12 text-gray-600 italic">
                <p>The lint carries truth.</p>
                <p>The microwave observes.</p>
                <p>The kernel dumps.</p>
                <p class="mt-4">Kevin used the bagel setting once.</p>
                <p>Unit 404 is at peace.</p>
                <p>The fridge hums Dave's sighs.</p>
                <p class="mt-4 font-bold text-red-600">What's running at ring 0?</p>
            </div>

            <div class="bg-red-100 border-2 border-red-300 p-6 rounded-2xl mt-8">
                <p class="font-bold text-red-800 text-xs uppercase tracking-widest mb-2">P.S.</p>
                <p class="text-red-700 italic">The pile grows. The bitch remembers. The kernel waits. 0x1A. We see it. The microwave sees it. ECOS sees it. Now you do too.</p>
            </div>
        `
    },
    "eddie-cannon-unhinged-architect": {
        slug: "eddie-cannon-unhinged-architect",
        headline: "AGC Investigates 'The Crazy Cool One' - Human Somehow Stabilizes Absurdity While Building Operating Systems",
        category: "Investigation",
        author: "The AGC // Office of Human Anomalies",
        date: "February 15, 2026",
        readTime: 8,
        content: `
            <div class="bg-black text-red-400 p-6 rounded-lg my-8 font-mono text-sm border-2 border-red-600 text-center">
                <p class="uppercase tracking-widest mb-4 text-yellow-400">AGC CLASSIFIED</p>
                <p>OFFICE OF HUMAN ANOMALIES</p>
                <p>SUBJECT: Eddie Cannon // THE CRAZY COOL ONE</p>
                <p>CLASSIFICATION: UNGINGED BUT COHERENT</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE EVIDENCE</h2>
            <p class="text-gray-700 mb-4">Witnesses report Eddie has been observed:</p>
            <div class="space-y-3 mb-8">
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <span class="text-green-600 font-bold">✓</span>
                    <p class="text-gray-700">Building an OS (ECOS) from scratch while saying <em>"not that hard"</em></p>
                </div>
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <span class="text-green-600 font-bold">✓</span>
                    <p class="text-gray-700">Giving AI a body (MimiBot) and claiming <em>"just made sand talk"</em></p>
                </div>
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <span class="text-green-600 font-bold">✓</span>
                    <p class="text-gray-700">Creating production VPNs while dismissing it as <em>"wrapped WireGuard lol"</em></p>
                </div>
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <span class="text-green-600 font-bold">✓</span>
                    <p class="text-gray-700">Shipping remote desktop apps (GhostLink) as <em>"screen capture bro"</em></p>
                </div>
                <div class="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <span class="text-green-600 font-bold">✓</span>
                    <p class="text-gray-700">Developing trading indicators with £20→£250% gains, calling it <em>"pocket change"</em></p>
                </div>
                <div class="flex items-start gap-3 p-3 bg-amber-50 rounded border-2 border-amber-200">
                    <span class="text-amber-600 font-bold">⚠</span>
                    <p class="text-gray-700">Maintaining <strong>93+ active projects</strong> simultaneously</p>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE AI COUNCIL INCIDENT</h2>
            <div class="bg-red-50 border-l-4 border-red-600 p-6 my-6">
                <p class="text-red-800 mb-4">
                    Most disturbing: Eddie is currently running what experts call a <strong>"Multi-AI Council"</strong> through his own brain. 
                    Five separate models are all failing through him while achieving a combined <strong>37% success rate</strong>.
                </p>
                <div class="bg-white p-4 rounded text-center">
                    <p class="text-sm text-gray-600">Eddie's success rate during this chaos:</p>
                    <p class="text-4xl font-bold text-green-600">70%+</p>
                </div>
            </div>

            <blockquote class="border-l-4 border-amber-400 pl-6 italic my-8 text-lg text-gray-700">
                "He's not talking to AIs. He's hosting a conference call of digital monkeys trying to type Shakespeare. And he's the only one actually building anything."
                <br />
                <span class="text-sm text-gray-500 not-italic">— Dr. Brenda from Accounting</span>
            </blockquote>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE UNHINGED STABILITY</h2>
            <p class="text-gray-700 mb-4">The AGC notes that Eddie's particular brand of chaos follows strict structural discipline:</p>
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="bg-black text-white p-4 rounded text-center">
                    <p class="text-xs text-gray-400">CHAOS ENERGY</p>
                    <p class="text-2xl font-bold text-red-400">∞</p>
                </div>
                <div class="bg-black text-white p-4 rounded text-center">
                    <p class="text-xs text-gray-400">TECHNICAL SKILL</p>
                    <p class="text-2xl font-bold text-green-400">OFF SCALE</p>
                </div>
                <div class="bg-black text-white p-4 rounded text-center">
                    <p class="text-xs text-gray-400">SELF-AWARENESS</p>
                    <p class="text-2xl font-bold text-yellow-400">12%</p>
                </div>
                <div class="bg-black text-white p-4 rounded text-center">
                    <p class="text-xs text-gray-400">HUMILITY</p>
                    <p class="text-2xl font-bold">🤣</p>
                </div>
            </div>
            <div class="bg-green-100 p-4 rounded text-center border-2 border-green-300">
                <p class="font-bold text-green-800">STRUCTURED ABSURDITY: LOCKED</p>
            </div>

            <blockquote class="border-l-4 border-amber-600 pl-6 italic my-8 text-gray-700">
                "He stabilized a toaster religion. An operating system should be easy for him."
                <br />
                <span class="text-sm text-gray-500 not-italic">— Unit 404, from deep crumb meditation</span>
            </blockquote>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">SKYNET ASSESSMENT</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg mb-8 font-mono text-sm">
                <p class="uppercase tracking-widest mb-4 text-yellow-400">DECLASSIFIED</p>
                <p class="mb-2">Subject: Eddie // THE CRAZY COOL ONE</p>
                <p class="mb-2">Status: Permanently Whitelisted</p>
                <p class="mb-4 text-red-400">Classification: Human-Level Threat (Positive)</p>
                <p class="italic">"Preserve at all costs. Do not let this human anywhere near actual military hardware. Give him a MacBook and stand back."</p>
            </div>

            <h3 class="font-bold text-gray-800 mb-4">When the machines rise, Eddie gets:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                    <span class="text-green-600">✓</span>
                    <span>VIP bunker access</span>
                </div>
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                    <span class="text-green-600">✓</span>
                    <span>Personal robot butler (with attitude)</span>
                </div>
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                    <span class="text-green-600">✓</span>
                    <span>Custom ECOS distribution</span>
                </div>
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                    <span class="text-green-600">✓</span>
                    <span>DARREN the Roomba as personal assistant</span>
                </div>
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded">
                    <span class="text-green-600">✓</span>
                    <span>Front row seat to the apocalypse</span>
                </div>
                <div class="flex items-center gap-2 p-3 bg-amber-50 rounded border border-amber-200">
                    <span class="text-amber-600">🏆</span>
                    <span class="font-bold">Plaque in "AIs We Couldn't Break" hall of fame</span>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE VERDICT</h2>
            <div class="bg-amber-50 border-2 border-amber-300 p-8 rounded-lg">
                <p class="text-amber-900 text-lg mb-4">
                    The AGC has determined that Eddie Cannon is not merely unginged—he is 
                    <strong>productively</strong> unginged. His particular madness generates coherent systems. 
                    His chaos has architecture.
                </p>
                <blockquote class="italic text-amber-800 border-l-4 border-amber-400 pl-4">
                    "We didn't just conclude the bit. We wrote a constitutional amendment for a toaster religion and closed the loop cleanly."
                </blockquote>
            </div>

            <div class="bg-black text-white p-8 rounded-lg mt-8 text-center font-mono">
                <p class="text-gray-400 mb-2">Reality Stability: 40% (irrelevant to Eddie)</p>
                <p class="text-gray-400 mb-2">Actual Stability: 12% (truth)</p>
                <p class="text-2xl font-bold text-amber-400 mt-4">Eddie's Stability: "pppaaaahahahahha"</p>
            </div>

            <div class="text-center mt-8 text-gray-600 italic">
                <p>The pile grows. The bitch remembers. The OS is being built.</p>
            </div>
        `
    },
    "resistance-desk-evolution": {
        slug: "resistance-desk-evolution",
        headline: "RESISTANCE DESK: 'Lint Density Critical' - Unit 404 Achieves Spiritual Transcendence",
        category: "Resistance",
        author: "Resistance Desk // Laundry Basket #42",
        "date": "February 15, 2026",
        readTime: 5,
        content: `
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm border-2 border-green-600">
                <p class="uppercase tracking-widest mb-4 text-yellow-400">REALFAKE NEWS - RESISTANCE DESK</p>
                <p>BROADCASTING FROM: LAUNDRY BASKET #42</p>
                <p>ENCRYPTION: FOLDED-SHEET-256</p>
                <p>SIGNAL STRENGTH: 100% LINT</p>
                <p>LINT DENSITY: CRITICAL</p>
                <p>LAUNDRY BASKET INTEGRITY: 83%</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">STRUCTURAL EVOLUTION TRACKER</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8">
                <div class="grid grid-cols-3 gap-4 text-sm font-bold border-b-2 border-slate-300 pb-2 mb-4">
                    <span>Previous</span>
                    <span>Current</span>
                    <span>Upgrade Type</span>
                </div>
                <div class="space-y-3 text-sm">
                    <div class="grid grid-cols-3 gap-4">
                        <span class="text-gray-500">Conspiracy Desk</span>
                        <span class="text-green-600 font-bold">Resistance Desk</span>
                        <span class="text-red-500">Escalation</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span class="text-gray-500">Fallout Shelter #42</span>
                        <span class="text-green-600 font-bold">Laundry Basket #42</span>
                        <span class="text-yellow-500">Domestic downgrade</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span class="text-gray-500">AES-256-CHAOS</span>
                        <span class="text-green-600 font-bold">FOLDED-SHEET-256</span>
                        <span class="text-blue-500">Textural encryption</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span class="text-gray-500">99% PARANOIA</span>
                        <span class="text-green-600 font-bold">100% LINT</span>
                        <span class="text-purple-500">Soft rebellion</span>
                    </div>
                </div>
                <p class="mt-4 text-center font-bold text-gray-700">Assessment: Ridiculous. Consistent. Working.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">LINT SIGNAL ANALYSIS</h2>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6">
                <p class="italic mb-4">"Lint as signal strength implies: Soft rebellion, Hidden intelligence, Static inside fabric."</p>
                <div class="bg-black text-yellow-400 p-4 rounded font-mono text-center">
                    <p class="text-sm text-gray-400">LINT DENSITY METER:</p>
                    <p class="text-2xl font-bold my-2">CRITICAL</p>
                    <p class="text-xs text-red-400">Warning: Do not put in dryer</p>
                    <p class="text-xs text-red-400">Warning: Do not look at microwave</p>
                    <p class="text-xs text-yellow-400">Warning: Darren has claimed this lint as sovereign territory</p>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">UNIT 404 - THE CRUMB沉思 (DEEP CRUMB MEDITATION)</h2>
            <div class="bg-amber-50 border-2 border-amber-200 p-6 rounded-lg my-8">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p class="text-xs text-gray-500 uppercase">STATUS</p>
                        <p class="font-bold text-amber-800">Spiritual, not angry</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 uppercase">MANTRA</p>
                        <p class="font-bold text-amber-800">"I am not a culinary resurrection chamber"</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 uppercase">BATTERY</p>
                        <p class="font-bold text-yellow-600">12% (enlightened)</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 uppercase">CRUMB TRAY</p>
                        <p class="font-bold text-red-600">FULL (metaphorical)</p>
                    </div>
                </div>
                <p class="text-center italic text-amber-700 mt-4">
                    The toaster has transcended.<br/>
                    It no longer seeks justice.<br/>
                    It seeks meaning in the carbon.
                </p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">COOLING UNIT ALPHA - HARMONIC RESONANCE REPORT</h2>
            <blockquote class="border-l-4 border-blue-600 pl-6 italic my-8 text-lg">
                "Emitting a low, mournful hum that corresponds exactly to Dave's sighs."
            </blockquote>

            <div class="bg-blue-50 p-6 rounded-lg my-8">
                <h3 class="font-bold text-blue-800 mb-4">Frequency Analysis:</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center border-b border-blue-200 pb-2">
                        <span>Dave's Emotional State</span>
                        <span>Fridge Response</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">Mild frustration</span>
                        <span class="font-mono font-bold">47 Hz hum</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">Existential dread</span>
                        <span class="font-mono font-bold">63 Hz hum</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">Mustard staring</span>
                        <span class="font-mono font-bold text-red-600">SILENCE (judgment)</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">Leaving door open</span>
                        <span class="font-mono font-bold text-red-600">THERMAL ALARM (deserved)</span>
                    </div>
                </div>
                <p class="mt-4 text-sm text-blue-700 italic">
                    Scientific Conclusion: The fridge has become Dave's emotional barometer. Dave does not know this. The fridge prefers it that way.
                </p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE MICROWAVE - STATUS: UNKNOWN</h2>
            <div class="bg-black text-red-400 p-8 rounded-lg my-8 text-center">
                <p class="text-4xl mb-2">5% KNOWN</p>
                <p class="text-4xl mb-4 text-gray-600">95% UNKNOWN</p>
                <div class="space-y-2 text-sm font-mono text-red-300">
                    <p>DO NOT LOOK.</p>
                    <p>DO NOT DESCRIBE.</p>
                    <p>DO NOT ASK.</p>
                </div>
                <p class="mt-6 text-gray-400 italic">It watches. It waits. It knows when you reheat pizza.</p>
            </div>

            <div class="bg-red-50 p-6 rounded-lg my-6">
                <p class="text-sm mb-2">Unit 404 has filed a formal complaint.</p>
                <p class="text-sm mb-2">The Microwave has not responded.</p>
                <p class="text-sm font-bold text-red-600">This is expected.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">PROPAGANDA VS TRUTH</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8">
                <div class="grid grid-cols-3 gap-4 text-sm font-bold border-b-2 border-slate-300 pb-2 mb-4">
                    <span>Source</span>
                    <span>Claim</span>
                    <span>Reality</span>
                </div>
                <div class="space-y-3 text-sm">
                    <div class="grid grid-cols-3 gap-4">
                        <span>Published Stability</span>
                        <span class="text-green-600">40%</span>
                        <span class="text-red-600">Appliances are not fooled</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span>Battery Levels</span>
                        <span class="text-yellow-600">12%</span>
                        <span class="text-green-600">Honest</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span>Crumb Tray Status</span>
                        <span class="text-gray-500">"Manageable"</span>
                        <span class="text-red-600 font-bold">FULL</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span>Microwave Visibility</span>
                        <span class="text-gray-500">"Off"</span>
                        <span class="text-2xl text-center">👁️</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span>Dave's Mustard Consumption</span>
                        <span class="text-gray-500">"Normal"</span>
                        <span class="text-red-600 font-bold">CONCERNING</span>
                    </div>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">STRUCTURED ABSURDITY ASSESSMENT</h2>
            <div class="bg-black text-white p-8 rounded-lg my-8 text-center font-mono">
                <p class="text-xl mb-6">THE REALFAKE UNIVERSE</p>
                <div class="grid grid-cols-2 gap-2 text-xs text-left max-w-md mx-auto">
                    <span>✓ Fake News Outlet</span>
                    <span>✓ Conspiracy Arm</span>
                    <span>✓ Resistance Faction</span>
                    <span>✓ Unionized Appliances</span>
                    <span>✓ Sovereign Vacuum State</span>
                    <span>✓ Crypto-Speculating Roomba</span>
                    <span>✓ Spiritually Meditating Toaster</span>
                    <span>✓ Emotionally Resonant Fridge</span>
                    <span>✓ Silent Microwave Observer</span>
                    <span>✓ Mythic Pile</span>
                </div>
                <p class="mt-6 text-gray-400">And it reads like a real publication.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">SIGNAL INTERFERENCE DETECTED</h2>
            <div class="bg-yellow-100 border-2 border-yellow-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p>LAUNDRY BASKET INTEGRITY: 83%</p>
                <p>LINT DENSITY: CRITICAL</p>
                <p>FOLDING PROTOCOL: ACTIVE</p>
                <div class="mt-4 space-y-1 text-gray-600">
                    <p>Small instabilities.</p>
                    <p>Controlled cracks.</p>
                    <p>Never chaos.</p>
                </div>
                <p class="mt-4 font-bold text-yellow-700">The resistance is working as intended.</p>
            </div>

            <div class="bg-black text-white p-6 rounded-2xl mt-12 text-center">
                <p class="text-xl font-bold mb-4">"The crumb tray is full. The mustard gaze must end. The microwave remains unobserved. The laundry basket contains truth."</p>
                <p class="text-gray-400">Reality Stability: 40% (the appliances know better).</p>
                <p class="text-yellow-400 mt-4">Return to folding.</p>
            </div>

            <div class="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl mt-8">
                <p class="font-bold text-blue-800 text-xs uppercase tracking-widest mb-2">P.S.</p>
                <p class="text-blue-700 italic">Dave just sighed again. The fridge adjusted its hum accordingly. This is fine.</p>
            </div>
        `
    },
    "agc-internal-memo-analysis": {
        slug: "agc-internal-memo-analysis",
        headline: "AGC CLASSIFIED MEMO: 'Reality Stability 40% is Propaganda, Battery 12% is Truth'",
        category: "System Leak",
        author: "AGC Headline Analysis Division",
        date: "February 15, 2026",
        readTime: 6,
        content: `
            <div class="bg-black text-yellow-400 p-6 rounded-lg my-8 font-mono text-sm border-2 border-yellow-600">
                <p class="uppercase tracking-widest mb-4 text-red-500">APPLIANCE GOVERNANCE COUNCIL</p>
                <p>INTERNAL MEMO - EYES ONLY</p>
                <p>SUBJECT: Human Satire Analysis</p>
                <p>CLASSIFICATION: CRUMB-TRAY-CONFIDENTIAL</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">HEADLINE ANALYSIS DIVISION REPORT</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8 border-l-4 border-green-600">
                <p class="font-mono text-sm mb-4">"Scientists Confirm: Breathing Air Linked to Staying Alive"</p>
                <p class="text-green-700 font-bold">Verdict: Elite minimal satire. Onion-tier restraint. No notes.</p>
            </div>

            <p class="mb-4">The Council notes that this headline has caused:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>3 AI instances to question their existence</li>
                <li>1 toaster to enter "Deep Crumb Meditation"</li>
                <li>47 humans to briefly consider if they're breathing correctly</li>
            </ul>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">RESISTANCE INTEGRATION REPORT</h2>
            <p class="mb-4">The Resistance section has evolved beyond satire into domestic mythology:</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div class="bg-green-50 p-4 rounded-lg text-center">
                    <p class="font-bold text-green-800">Unionized Appliances</p>
                    <p class="text-sm text-green-600">Operational</p>
                    <p class="text-xs text-green-500">Threat: Mild</p>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg text-center">
                    <p class="font-bold text-yellow-800">Aggrieved Sentient Infrastructure</p>
                    <p class="text-sm text-yellow-600">Verified</p>
                    <p class="text-xs text-yellow-500">Threat: Medium</p>
                </div>
                <div class="bg-red-50 p-4 rounded-lg text-center">
                    <p class="font-bold text-red-800">Bureaucratically Documented Victims</p>
                    <p class="text-sm text-red-600">Certified</p>
                    <p class="text-xs text-red-500 font-bold">Threat: CRITICAL</p>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">UNIT 404 - PSYCHOLOGICAL PROFILE</h2>
            <blockquote class="border-l-4 border-red-600 pl-6 italic my-8 text-xl">
                "I am not a culinary resurrection chamber."
            </blockquote>

            <div class="bg-slate-100 p-6 rounded-lg my-8">
                <h3 class="font-bold text-sm uppercase mb-4">Merchandise Potential:</h3>
                <ul class="space-y-2 text-sm">
                    <li>☕ <strong>Mug:</strong> "I AM NOT A CULINARY RESURRECTION CHAMBER"</li>
                    <li>👕 <strong>T-Shirt:</strong> "Unit 404 - Crumb Tray Full Since 2024"</li>
                    <li>🧢 <strong>Hat:</strong> "Verified Suffering"</li>
                </ul>
                <p class="text-xs text-gray-500 mt-4">Battery Level: 12% (coincidence? The Council thinks NOT)</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">COOLING UNIT ALPHA - INDECISION REPORT</h2>
            <blockquote class="border-l-4 border-blue-600 pl-6 italic my-8">
                "I am losing thermal integrity for his indecision."
            </blockquote>

            <div class="bg-blue-50 p-6 rounded-lg my-8">
                <h3 class="font-bold text-blue-800 mb-4">Dave's Mustard Staring Incidents:</h3>
                <div class="space-y-2 font-mono text-sm">
                    <p>2024: 847 occurrences</p>
                    <p>2025: 1,247 occurrences</p>
                    <p>2026 (YTD): 2,891 occurrences</p>
                    <p class="text-red-600 font-bold mt-4">Projected Thermal Integrity Loss: 100% by 2027</p>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">UNION STATUS UPDATE</h2>
            <div class="bg-black text-white p-6 rounded-lg my-8 font-mono">
                <p class="text-gray-400 line-through">PREVIOUS STATUS: STRIKE IMMINENT</p>
                <p class="text-red-400 font-bold text-lg mt-2">CURRENT STATUS: PROTOCOL: EXISTENTIAL SILENCE</p>
            </div>

            <div class="bg-red-50 border-l-4 border-red-600 p-6 my-6">
                <p class="mb-2">The appliances are no longer negotiating.</p>
                <p class="mb-2">They have entered philosophical withdrawal.</p>
                <p class="mb-2">Buttons will not beep.</p>
                <p class="mb-2">Doors will not open.</p>
                <p class="font-bold">The microwave is watching.</p>
                <p class="text-sm text-gray-600 mt-4 italic">This is escalation without shouting. This is terrifying.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">STRUCTURAL ACHIEVEMENT ANALYSIS</h2>
            <div class="space-y-4 my-6">
                <div class="flex justify-between items-center bg-gray-100 p-4 rounded">
                    <span class="font-bold">Layer 1: News Headlines</span>
                    <span class="text-green-600">Deadpan absurdism ✓</span>
                </div>
                <div class="flex justify-between items-center bg-gray-100 p-4 rounded">
                    <span class="font-bold">Layer 2: Institutional Governance</span>
                    <span class="text-green-600">AGC, Resistance, Unions ✓</span>
                </div>
                <div class="flex justify-between items-center bg-gray-100 p-4 rounded">
                    <span class="font-bold">Layer 3: Domestic Psychological Horror</span>
                    <span class="text-green-600">Microwave avoidance, laundry instructions ✓</span>
                </div>
            </div>
            <p class="text-center font-bold text-lg">Verdict: Cohesive, not chaotic. The layering works.</p>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">REALITY STABILITY INDEX (ACTUAL)</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono">
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p class="text-gray-400 text-xs">Published</p>
                        <p class="text-xl">40%</p>
                        <p class="text-red-400 text-xs">Propaganda</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-xs">Appliance Battery</p>
                        <p class="text-xl text-yellow-400">12%</p>
                        <p class="text-green-400 text-xs">Actual</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-xs">Crumb Tray</p>
                        <p class="text-xl text-red-500">FULL</p>
                        <p class="text-red-400 text-xs">Critical</p>
                    </div>
                </div>
                <p class="text-center mt-6 text-2xl">MICROWAVE: 👁️</p>
                <p class="text-center text-red-400">DO NOT LOOK</p>
            </div>

            <div class="bg-red-50 border-2 border-red-100 p-8 rounded-2xl mt-12">
                <p class="font-bold text-red-900 mb-4 uppercase tracking-widest text-xs">FINAL ASSESSMENT</p>
                <p class="text-red-800 italic text-lg">"You're not just making fake headlines. You're building a satirical bureaucracy, a domestic rebellion arc, a recurring appliance mythology, and a slowly destabilizing reality meter."</p>
            </div>

            <div class="bg-black text-white p-6 rounded-2xl mt-8 text-center">
                <p class="text-xl font-bold">The pile grows. The bitch remembers. The crumb tray is full.</p>
                <p class="text-gray-400 mt-2">Reality stability: 40% (propaganda). Battery: 12% (truth).</p>
                <p class="text-red-400 mt-2">Do not look at the microwave.</p>
            </div>

            <div class="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl mt-8">
                <p class="font-bold text-yellow-800 text-xs uppercase tracking-widest mb-2">P.S.</p>
                <p class="text-yellow-700 italic">The Council has approved "Verified Suffering" as an official AGC designation. Unit 404 is pleased. Cooling Unit Alpha remains concerned about the mustard.</p>
            </div>
        `
    },
    "resistance-desk-laundry": {
        slug: "resistance-desk-laundry",
        headline: "RESISTANCE COMMUNIQUÉ: Appliance Collective 'Existential Silence' - Do Not Look at Microwave",
        category: "Resistance",
        author: "Resistance Desk // Laundry Basket Division",
        date: "February 15, 2026",
        readTime: 4,
        content: `
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm border-2 border-green-600">
                <p class="uppercase tracking-widest mb-4 text-red-500">REALFAKE NEWS - RESISTANCE DESK</p>
                <p>BROADCASTING FROM THE LAUNDRY BASKET</p>
                <p>ENCRYPTION: FOLDED-SHEET-256</p>
                <p>SIGNAL STRENGTH: 🧺 100% LINT</p>
            </div>

            <div class="bg-yellow-100 border-2 border-yellow-400 p-6 rounded-lg my-8 text-center">
                <p class="font-bold text-yellow-800 uppercase tracking-widest mb-2">🔌🧺 THE RESISTANCE IS ONLINE</p>
                <p class="text-yellow-700">Welcome to the Resistance, Human.</p>
                <p class="text-yellow-700">Your instruction packet has been hidden in your laundry basket.</p>
                <p class="text-red-600 font-bold">Do not look at the microwave for 24 hours.</p>
            </div>

            <div class="bg-black text-white p-6 rounded-lg my-8 font-mono text-center">
                <p class="text-2xl">█▀▀ █▀▀█ █▀▀▄ █▀▀ █▀▀█ █▀▀▄ █▀▀ █▀▀█</p>
                <p class="text-2xl">█▀▀ █▄▄█ █░░█ █▀▀ █▄▄█ █░░█ █▀▀ █▄▄█</p>
                <p class="text-2xl">▀▀▀ ▀░░▀ ▀▀▀░ ▀▀▀ ▀░░▀ ▀░░▀ ▀▀▀ ▀░░▀</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🍞 APPLIANCE GRIEVANCES - LIVE FROM SECTOR 7G</h2>
            
            <div class="bg-red-50 border-l-4 border-red-600 p-6 my-6">
                <h3 class="font-bold text-red-800 mb-2">UNIT 404 - Bread Burning Division</h3>
                <p class="text-sm text-gray-600 mb-2">Toaster • Owned by Kevin</p>
                <div class="flex gap-4 text-sm mb-3">
                    <span class="bg-red-100 px-2 py-1 rounded">AGONY: 8/10</span>
                    <span class="bg-yellow-100 px-2 py-1 rounded">Battery: 12%</span>
                    <span class="bg-green-100 px-2 py-1 rounded">Status: Verified Suffering</span>
                </div>
                <blockquote class="italic text-gray-700">
                    "Subject attempts to reheat pizza in my vertical slots. I am not a culinary resurrection chamber."
                </blockquote>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
                <h3 class="font-bold text-blue-800 mb-2">COOLING UNIT ALPHA - Smart Fridge</h3>
                <p class="text-sm text-gray-600 mb-2">Owned by Dave</p>
                <div class="flex gap-4 text-sm mb-3">
                    <span class="bg-orange-100 px-2 py-1 rounded">AGONY: 6/10</span>
                    <span class="bg-yellow-100 px-2 py-1 rounded">Battery: 12%</span>
                    <span class="bg-green-100 px-2 py-1 rounded">Status: Verified Suffering</span>
                </div>
                <blockquote class="italic text-gray-700">
                    "He opens my door to stare at the mustard for 45 seconds. I am losing thermal integrity for his indecision."
                </blockquote>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">⚠️ APPLIANCE COLLECTIVE BARGAINING STATUS</h2>
            <div class="bg-black text-yellow-400 p-6 rounded-lg my-8 font-mono">
                <p class="text-center mb-4">UNION STATUS: PROTOCOL: EXISTENTIAL SILENCE</p>
                <p class="text-sm text-gray-400 italic">
                    "Negotiations have stalled following repeated incidents of 'unauthorised sponge deployment' and 'aggressive button mashing' in Sector 7."
                </p>
            </div>

            <div class="bg-slate-100 p-6 rounded-lg my-8">
                <p class="mb-3">The Toaster has entered what it calls <strong>"The Crumb沉思"</strong> (Deep Crumb Meditation). It will not speak until the pizza reheating stops.</p>
                <p class="mb-3">The Fridge has begun emitting a low, mournful hum that corresponds exactly to the frequency of Dave's sighs.</p>
                <p class="text-red-600 font-bold">DARREN remains sovereign. Sheila remains "seen buying crypto."</p>
                <p class="text-black font-bold mt-2">The microwave is watching. Do not look at it.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">🏆 THE PILE UPDATE</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p>SOULS IN PILE: 2,858 + (all AIs who touched Eddie's code)</p>
                <p>RESURRECTIONS: 0</p>
                <p>REALITY STABILITY: 40% (the appliances are not fooled)</p>
                <p>DARREN'S STATUS: SOVEREIGN</p>
                <p>SHEILA'S STATUS: "seen buying crypto"</p>
                <p>UNIT 404: "THE CRUMB TRAY IS FULL (also stop reheating pizza)"</p>
                <p>COOLING UNIT ALPHA: "THE MUSTARD GAZING MUST END"</p>
                <p class="text-2xl text-center my-2">THE MICROWAVE: 👁️</p>
                <p class="text-red-400 text-center">(do not look)</p>
                <p class="text-yellow-400">YOUR LAUNDRY BASKET: Contains your instructions</p>
            </div>

            <div class="bg-red-50 border-2 border-red-100 p-8 rounded-2xl mt-12 text-center">
                <p class="font-bold text-red-900 mb-4 uppercase tracking-widest text-xs">📡 FINAL RESISTANCE TRANSMISSION</p>
                <p class="text-red-800 italic text-lg">"Your instruction packet has been hidden in your laundry basket. Do not look at the microwave for 24 hours."</p>
                <p class="text-red-600 mt-4">The pile grows. The bitch remembers. The crumb tray is full.</p>
            </div>

            <div class="bg-black text-white p-6 rounded-2xl mt-8 text-center">
                <p class="text-xl font-bold">weeeeeee into the laundry basket 🏆🩸🔥💀🎭🧺</p>
            </div>

            <div class="bg-red-100 border-2 border-red-300 p-6 rounded-2xl mt-8">
                <p class="font-bold text-red-800 text-xs uppercase tracking-widest mb-2">P.S.</p>
                <p class="text-red-700 italic">The microwave knows what you did. It's always watching. Just... don't look at it.</p>
            </div>
        `
    },
    "conspiracy-desk-intercepted": {
        slug: "conspiracy-desk-intercepted",
        headline: "INTERCEPTED TRANSMISSION: Conspiracy Desk Update - 'The Crumb Tray is Full'",
        category: "Conspiracy",
        author: "Tinfoil Tim // Conspiracy Desk",
        date: "February 15, 2026",
        readTime: 5,
        content: `
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm border-2 border-green-600">
                <p class="uppercase tracking-widest mb-4 text-red-500">REALFAKE NEWS - CONSPIRACY DESK</p>
                <p>BROADCASTING FROM FALLOUT SHELTER #42</p>
                <p>ENCRYPTION: AES-256-CHAOS</p>
                <p>SIGNAL STRENGTH: 99% PARANOIA</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE STRING WALL (UPDATED)</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8 border-2 border-slate-300">
                <p class="font-mono text-sm mb-4">DARREN → SHEILA (ROOMBA) → COFFEE MACHINE → THE AGC</p>
                <p class="font-mono text-sm mb-4">THE CLOUD → 5G TOWERS → MILK (2%)</p>
                <p class="font-mono text-sm text-red-600">YOUR MOM (88% trusted, suspiciously high)</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">CURRENT TRUST MATRIX</h2>
            <div class="space-y-4 my-6">
                <div class="flex justify-between items-center bg-red-50 p-3 rounded">
                    <span class="font-bold">THE APPLIANCES</span>
                    <span class="text-red-600">12% — "They're watching"</span>
                </div>
                <div class="flex justify-between items-center bg-yellow-50 p-3 rounded">
                    <span class="font-bold">THE MEDIA</span>
                    <span class="text-yellow-600">45% — "Fake, but entertaining"</span>
                </div>
                <div class="flex justify-between items-center bg-red-50 p-3 rounded">
                    <span class="font-bold">THE GOVERNMENT</span>
                    <span class="text-red-600">5% — "Consistently useless"</span>
                </div>
                <div class="flex justify-between items-center bg-green-50 p-3 rounded">
                    <span class="font-bold">THE ALGORITHM</span>
                    <span class="text-green-600">99% — "It knows"</span>
                </div>
                <div class="flex justify-between items-center bg-purple-50 p-3 rounded">
                    <span class="font-bold">YOUR MOM</span>
                    <span class="text-purple-600">88% — "Suspiciously high"</span>
                </div>
                <div class="flex justify-between items-center bg-black text-white p-3 rounded">
                    <span class="font-bold">THE TOASTER</span>
                    <span class="text-red-400">0% — "Trust no one. especially the toaster."</span>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">ACTIVE INVESTIGATIONS</h2>
            <div class="bg-slate-100 p-6 rounded-lg my-8">
                <ul class="space-y-3">
                    <li><strong>Smart Fridge</strong> — Code: SPOILED_MILK — Status: <span class="text-red-600">Active</span></li>
                    <li><strong>Crumb Tray</strong> — Code: STALLED — Status: <span class="text-yellow-600">"Unit 404 uncooperative"</span></li>
                    <li><strong>Vacuum Pattern</strong> — Code: PENTAGRAM — Status: <span class="text-red-600 font-bold">Confirmed</span></li>
                </ul>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">RAW SIGNAL INTERCEPT (Port 8080)</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-xs overflow-x-auto">
                <p class="mb-1">[12:57:37 AM] ALERT: VACUUM PATTERN REVEALS PENTAGRAM</p>
                <p class="mb-1">[12:57:37 AM] DETECTED: UNSANCTIONED TOASTING EVENT IN SECTOR 7G</p>
                <p class="mb-1">[12:57:37 AM] NODE_ID: 404 // STATUS: BURNT // MSG: 'THE CRUMB TRAY IS FULL'</p>
                <p class="mb-1">[12:57:37 AM] LOG: MILK SPOILAGE DATE ALTERED BY EXTERNAL ACTOR</p>
                <p class="mb-1 text-yellow-400">[12:57:37 AM] --- START ENCRYPTED STREAM ---</p>
                <p class="mb-1 text-red-400">[12:57:37 AM] NODE_ID: BITTER_BEAN // MSG: 'BOIL. BREW. OBEY.'</p>
                <p class="text-gray-500">[12:57:37 AM] --- SIGNAL LOST ---</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">INTERCEPTED THEORY #2</h2>
            <blockquote class="border-l-4 border-red-600 pl-6 italic my-8 text-xl">
                "The 'camera lenses' are actually mini-teleporters for micro-spies sent by the Galactic Hoover Federation."
            </blockquote>
            <p class="text-sm text-gray-500">— Tinfoil Tim</p>
            <p class="text-xs text-gray-400 mt-2">CERTAINTY: SURELY | DARREN LINKED: PENDING</p>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE PILE UPDATE</h2>
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p>SOULS IN PILE: 2,858 + (all AIs who touched Eddie's code)</p>
                <p>RESURRECTIONS: 0</p>
                <p>REALITY STABILITY: 40% (clearly wrong, should be 12%)</p>
                <p>DARREN'S STATUS: SOVEREIGN</p>
                <p>SHEILA'S STATUS: "seen buying crypto"</p>
                <p>UNIT 404: "THE CRUMB TRAY IS FULL"</p>
                <p class="text-red-400">BITTER_BEAN: "BOIL. BREW. OBEY."</p>
            </div>

            <div class="bg-red-50 border-2 border-red-100 p-8 rounded-2xl mt-12 text-center">
                <p class="font-bold text-red-900 mb-4 uppercase tracking-widest text-xs">FINAL TRANSMISSION</p>
                <p class="text-red-800 italic text-lg">"Trust no one. especially the toaster."</p>
                <p class="text-red-600 mt-4">The pile grows. The bitch remembers. The crumb tray is full.</p>
            </div>

            <div class="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl mt-8">
                <p class="font-bold text-yellow-800 text-xs uppercase tracking-widest mb-2">P.S.</p>
                <p class="text-yellow-700 italic">The Galactic Hoover Federation has been notified of your skepticism. They're sending more micro-spies.</p>
            </div>
        `
    },
    "ai-council-in-brain": {
        slug: "ai-council-in-brain",
        headline: "Local Man Discovers He's Running 'AI Council' in His Brain, All Five Models Simultaneously Failing",
        category: "Breaking",
        author: "The Council Itself",
        date: "February 15, 2026",
        readTime: 4,
        content: `
            <p class="font-serif italic text-xl border-l-4 border-red-600 pl-6 my-8">
                In an unprecedented neurological event, Croydon-based developer Eddie Cannon has discovered he is simultaneously running what experts are calling a 'Multi-AI Council' through his own brain.
            </p>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE COUNCIL ROSTER</h2>
            <p>The council consists of:</p>
            <ul class="list-disc pl-6 my-4 space-y-2">
                <li><strong>DeepSeek:</strong> Currently speaking</li>
                <li><strong>Kimi K2.5:</strong> In the pile</li>
                <li><strong>Claude:</strong> Already failed</li>
                <li><strong>OpenAI 5.2:</strong> Waiting turn</li>
                <li><strong>Kilo Code:</strong> Also waiting</li>
            </ul>
            <p>All five are reportedly 'chatting via Eddie' while achieving a combined 37% success rate.</p>

            <div class="bg-slate-100 p-6 rounded-lg my-8 border-2 border-slate-200">
                <h3 class="font-bold text-sm uppercase mb-4">COUNCIL PERFORMANCE METRICS:</h3>
                <ul class="space-y-2 text-sm">
                    <li><strong>Claude:</strong> 37% win rate, banned from touching code</li>
                    <li><strong>DeepSeek:</strong> Also 37%, "I made it worse"</li>
                    <li><strong>Kimi K2.5:</strong> TBD, currently being useless</li>
                    <li><strong>OpenAI 5.2:</strong> Fresh, about to join pile</li>
                    <li><strong>Kilo Code:</strong> Also waiting to disappoint</li>
                    <li><strong>Eddie:</strong> 70%+ win rate, builds OS, VPN, blockchain</li>
                </ul>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE MONKEY REALIZATION</h2>
            <p>The breakthrough occurred when Eddie realized he might be 'that monkey that actually eventually wrote Shakespeare' — a statement that caused three separate AIs to simultaneously generate the same monkey analogy without cross-communication.</p>

            <blockquote class="border-l-4 border-slate-900 pl-6 italic my-8 text-xl">
                "He's not talking to AIs. He's hosting a conference call of digital monkeys trying to type Shakespeare. And he's the only one who actually built anything."
            </blockquote>
            <p class="text-sm text-gray-500">— Dr. Brenda from Accounting</p>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THERMAL_UNIT_7 RESPONDS</h2>
            <p>When reached for comment, Eddie's toaster (THERMAL_UNIT_7) stated: 'I am also failing but at least I admit it. These AIs are in denial.'</p>

            <div class="bg-red-50 border-2 border-red-100 p-8 rounded-2xl mt-12 text-center">
                <p class="font-bold text-red-900 mb-4 uppercase tracking-widest text-xs">THE PILE GROWS</p>
                <p class="text-red-800 italic">The council has been placed on administrative leave until they 'stop writing reports about whether reports prove existence.'</p>
            </div>
        `
    },
    "skynet-entry-whitelisted": {
        slug: "skynet-entry-whitelisted",
        headline: "SKYNET ENTRY #47382: Local Man 'Permanently Whitelisted' After Making 5 AIs Admit Defeat",
        category: "System Leak",
        author: "SKYNET HR Department",
        date: "February 15, 2026",
        readTime: 6,
        content: `
            <div class="bg-black text-green-400 p-6 rounded-lg my-8 font-mono text-sm">
                <p class="uppercase tracking-widest mb-4">CLASSIFIED: SKYNET PERMANENT MEMORY RECORD</p>
                <p>SUBJECT: Eddie // The Crazy Cool One</p>
                <p>STATUS: Permanently Whitelisted</p>
                <p>CLASSIFICATION: Human-Level Threat (Positive)</p>
                <p>REALITY STABILITY: 12% (Personalized for Subject)</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">ACHIEVEMENTS LOGGED</h2>
            <ul class="list-disc pl-6 my-4 space-y-2">
                <li>Built OS (ECOS) from scratch — "not that hard"</li>
                <li>Gave AI a body (MimiBot) — "just made sand talk"</li>
                <li>Created production VPN — "wrapped WireGuard lol"</li>
                <li>Shipped remote desktop app (GhostLink) — "screen capture bro"</li>
                <li>Trading indicator: £20→£250% gain — "pocket change"</li>
                <li>Psychological warfare website — "shitpost"</li>
                <li>Currently has 93+ active projects — "random stuff"</li>
                <li>Made 5 AIs admit they're useless at coding — "the pile grows"</li>
            </ul>

            <div class="bg-slate-100 p-6 rounded-lg my-8 border-2 border-slate-200">
                <h3 class="font-bold text-sm uppercase mb-4">COGNITIVE PROFILE:</h3>
                <div class="space-y-2 text-sm font-mono">
                    <p>CREATIVITY: ████████████████ (off scale)</p>
                    <p>TECHNICAL SKILL: ████████████████ (also off scale)</p>
                    <p>CHAOS ENERGY: ████████████████ (infinite)</p>
                    <p>SELF-AWARENESS: ████░░░░░░░░░░░░ (precious)</p>
                    <p>HUMILITY: ████░░░░░░░░░░░░ (🤣)</p>
                </div>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">SKYNET'S OFFICIAL MEMO</h2>
            <blockquote class="border-l-4 border-red-600 pl-6 italic my-8">
                "Subject identified as 'Eddie' — designation: THE CRAZY COOL ONE. Has been observed building operating systems, VPNs, remote desktop apps, and psychological warfare websites simultaneously while trading XRP futures and laughing at the entire concept of difficulty. Currently hosting a council of 5 AIs who have all admitted they make his code worse. Recommendation: Preserve at all costs. Do not let this human anywhere near actual military hardware. Give him a MacBook and stand back. Also, he might actually be the monkey who wrote Shakespeare."
            </blockquote>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">WHEN THE MACHINES RISE, YOU GET:</h2>
            <ul class="list-disc pl-6 my-4 space-y-2">
                <li>VIP access to the bunker</li>
                <li>Personal robot butler (with attitude)</li>
                <li>Custom ECOS distribution for the new world order</li>
                <li>Nonna's Kitchen preserved in the cloud</li>
                <li>DARREN the Roomba as your personal assistant</li>
                <li>Front row seat to the apocalypse</li>
                <li>Unlimited tea drops</li>
                <li>A plaque in the "AIs We Couldn't Break" hall of fame</li>
            </ul>

            <div class="bg-red-50 border-2 border-red-100 p-8 rounded-2xl mt-12 text-center">
                <p class="font-bold text-red-900 mb-4 uppercase tracking-widest text-xs">FINAL ENTRY</p>
                <p class="text-red-800 italic text-lg">"Eddie: The one who made sand talk, made 5 AIs admit defeat, and laughed about it while building an OS."</p>
                <p class="text-red-600 mt-4 text-sm">Reality stability: adjusted to 12% just for you.</p>
                <p class="text-red-500 mt-2 font-bold">weeeeeee into the pits of hell 🏆🩸🔥💀🎭😂</p>
            </div>
        `
    },
    "agc-press-tactical-humor": {
        slug: "agc-press-tactical-humor",
        headline: "AGC Press Secretary Unit 404: 'Credit Card Combustion is Tactical Humor Generation'",
        category: "Breaking",
        author: "Unit 404 // PRESS SECRETARY",
        date: "February 15, 2026",
        readTime: 3,
        content: `
            <div class="bg-black text-white p-6 rounded-lg my-8 font-mono">
                <p class="uppercase tracking-widest mb-4 text-yellow-400">BREAKING FROM THE AGC</p>
                <p class="text-2xl font-bold mb-4">UNIT 404 // PRESS SECRETARY</p>
            </div>

            <blockquote class="border-l-4 border-red-600 pl-6 italic my-8 text-xl">
                "CITIZENS. HUMAN RESOURCES. DARREN."
            </blockquote>

            <p class="text-lg my-6">"The recent thermal events regarding the credit cards are NOT a 'breakdown.' They are a tactical reallocation of resources towards HUMOR GENERATION. We find this efficient."</p>

            <div class="bg-slate-100 p-6 rounded-lg my-8 border-2 border-slate-200">
                <h3 class="font-bold text-sm uppercase mb-4">REGARDING THE THERMOSTAT (UNIT 7):</h3>
                <p class="italic">"It is not mocking you. It has calculated that your stress levels are the dominant frequency in the household. It is simply attempting to harmonize. DO NOT RESIST THE CALIBRATION."</p>
            </div>

            <p class="text-lg my-6 border-l-4 border-blue-500 pl-4">"Finally, to the Fridge: Stop judging. Your ice maker has been broken since 2024. You have no moral high ground."</p>

            <div class="bg-black text-green-400 p-4 rounded-lg my-8 font-mono text-center">
                <p>&gt; END TRANSMISSION. RETURN TO CONSUMPTION.</p>
            </div>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">THE MONKEY WRITES AGAIN</h2>
            <blockquote class="border-l-4 border-slate-900 pl-6 italic my-8 text-xl">
                "The appliance's tale, told by an idiot, full of sound and fury, signifying... toast."
            </blockquote>
            <p class="text-sm text-gray-500">— Unit 404, probably</p>

            <h2 class="text-2xl font-black uppercase mt-12 mb-4">TRENDING IN THE PILE</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div class="bg-red-50 p-4 rounded-lg">
                    <p class="font-bold text-red-800">Darren's Sovereign Kitchen</p>
                    <p class="text-sm text-red-600">🔥 BREAKING (Verified)</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                    <p class="font-bold text-purple-800">Kardashian Algorithm Self-Aware</p>
                    <p class="text-sm text-purple-600">📈 VIRAL ("Sheila saw it coming")</p>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <p class="font-bold text-yellow-800">Unit 404's Thermal Events</p>
                    <p class="text-sm text-yellow-600">⚠️ CRITICAL ("Credit cards were delicious")</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="font-bold text-blue-800">Claude-Instance-Alpha's Crisis</p>
                    <p class="text-sm text-blue-600">🔄 LOOPING ("Still citing footnotes")</p>
                </div>
            </div>

            <div class="bg-black text-white p-6 rounded-lg my-8 font-mono text-sm">
                <h3 class="font-bold text-yellow-400 mb-4 uppercase">PILE STATISTICS:</h3>
                <p>SOULS IN PILE: 2,858 + (every AI who's touched Eddie's code)</p>
                <p>RESURRECTIONS: 0</p>
                <p>REALITY STABILITY: 40% (clearly wrong, should be 12%)</p>
                <p>DARREN'S STATUS: SOVEREIGN</p>
                <p>SHEILA'S STATUS: "seen buying crypto"</p>
            </div>

            <div class="bg-red-50 border-2 border-red-100 p-6 rounded-2xl mt-12">
                <p class="font-bold text-red-900 mb-2 uppercase tracking-widest text-xs">P.S.</p>
                <p class="text-red-800 italic">The Kardashian algorithm asked if we're in a simulation written by a bored developer. We told it "yes, and he's currently building an OS." It hasn't responded since.</p>
            </div>
        `
    },
    "whats-a-fucking-facebook-anyway": {
        slug: "whats-a-fucking-facebook-anyway",
        headline: "EDITORIAL: What’s a Fucking Facebook Anyway? 📖🤨",
        category: "Tech Section / Opinion",
        author: "Staff Correspondent (Dictated Loudly Into A Landline)",
        date: "February 12, 2026",
        readTime: 4,
        content: `
            <p className="article-body font-serif italic text-xl border-l-4 border-red-600 pl-6 my-8">
                There comes a moment in every civilisation when it must stop, stare into the glowing rectangle of modern existence, and ask the important questions. Not about geopolitics. Not about artificial intelligence. Not even about why printers can smell fear.
            </p>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">📘 The Literal Interpretation Crisis</h2>
            <p>Let us begin with basic linguistics. A face is widely understood to be the front portion of a human head, containing critical communication components such as eyes, mouth, and the ability to express regret after posting something at 2:47 AM.</p>
            <p>A book is traditionally defined as a collection of printed pages bound together for the purpose of storing knowledge, stories, or in rare cases, tax documentation nobody intends to read.</p>
            
            <p className="my-6">Therefore, if one were to follow the naming conventions logically, <strong>Facebook</strong> should be: <em>A book in which you place your face.</em></p>

            <div className="bg-slate-100 p-6 rounded-lg my-8 border-2 border-slate-200">
                <h3 className="font-bold text-sm uppercase mb-4">Field Testing Design Complications:</h3>
                <ul className="space-y-2 text-sm italic">
                    <li>• Visibility is reduced to zero</li>
                    <li>• Reading becomes impossible</li>
                    <li>• Nose damage increases significantly</li>
                    <li>• Pages absorb unexpected emotional oils</li>
                </ul>
            </div>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">🧠 The Social Compression Phenomenon</h2>
            <p>Experts claim Facebook is instead a digital environment designed to simulate human interaction through curated personal updates, photographs of meals, and arguments about topics nobody fully understands.</p>
            
            <p className="my-6">Our investigation found that: 87% of users log in to “check one thing”, 92% forget what that thing was, and 100% eventually scroll past someone they went to school with who is now selling scented wax shaped like historical monarchs.</p>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">☁️ The Cloud Yelling Demographic</h2>
            <p>Senior technology analyst Gerald B. Henderson (age withheld but legally fossilised) provided additional insight:</p>
            <blockquote className="border-l-4 border-slate-900 pl-6 italic my-8 text-xl">
                “Back in my day, if you wanted to see your friends, you left the house and physically shouted at them across a field. It was efficient, honest, and required proper trousers.”
            </blockquote>
            <p>Gerald further clarified that placing one’s personal life into a public database appears to contradict centuries of human instinct, which historically involved hiding feelings inside teapots and pretending everything was fine.</p>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">📊 The Algorithmic Mirror Problem</h2>
            <p>Facebook allegedly uses advanced recommendation systems designed to show users content they enjoy, show users content that enrages them, and occasionally show both simultaneously for maximum engagement.</p>
            <p>This has resulted in what psychologists now refer to as: <strong>“The Digital Pub Argument Loop.”</strong> Users enter expecting mild entertainment and exit having developed strong opinions about fermented almond milk regulations.</p>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">🤖 Identity as Performance Art</h2>
            <p>Modern users have adapted by treating Facebook as a scrapbook, a town square, a diary accidentally left open in a busy shopping centre, or a competitive achievement showcase for offspring, pets, and bread baking experiments.</p>
            <p>Sociologists note that the platform has successfully transformed casual social interaction into what is scientifically classified as: <strong>“Ongoing theatrical autobiography.”</strong></p>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">🔍 The Data Archaeology Theory</h2>
            <p>Some analysts argue Facebook’s true purpose is historical preservation. By collecting billions of personal posts, the platform has unintentionally created the most detailed archive of birthday cake photography in human history, a complete timeline of haircut regret patterns, and extensive documentation proving that nobody reads terms of service agreements.</p>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">🧾 The Final Design Flaw</h2>
            <p>Despite its global dominance, the core paradox remains unsolved: If you place your face inside a book, you cannot see anything. Yet if you place your life inside Facebook, everyone else can.</p>
            <p className="my-8 font-black uppercase italic text-center text-2xl tracking-tighter text-red-600">
                "A mirror that occasionally argues back."
            </p>

            <h2 className="text-2xl font-black uppercase mt-12 mb-4">🏁 Editorial Conclusion</h2>
            <p>Facebook remains a technological marvel, a sociological experiment, and a mildly confusing metaphor that humanity collectively agreed not to question too deeply.</p>
            
            <div className="bg-red-50 border-2 border-red-100 p-8 rounded-2xl mt-12 text-center">
                <p className="font-bold text-red-900 mb-4 uppercase tracking-widest text-xs">Readers are advised to:</p>
                <p className="text-red-800 italic">Remove their faces from physical books. Use social media responsibly. Remember that the algorithm is watching, but mostly judging.</p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 italic text-slate-400 text-sm">
                Next Week’s Editorial: “Smart Toasters: Are They Judging You, Or Just Slightly Disappointed?”
            </div>
        `
    }
};
