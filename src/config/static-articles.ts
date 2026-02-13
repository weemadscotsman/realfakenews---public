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
