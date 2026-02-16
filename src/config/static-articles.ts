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
