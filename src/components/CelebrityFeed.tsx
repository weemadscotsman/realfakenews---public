import React, { useLayoutEffect, useState } from 'react';
import { Heart, Repeat, BadgeCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Celeb {
    name: string;
    handle: string;
    avatar: string;
}

interface Reply {
    celeb: Celeb;
    content: string;
}

interface Post {
    id: number;
    celeb: Celeb;
    content: string;
    likes: number;
    rts: number;
    reply: Reply;
}

const CELEBS: Celeb[] = [
    { name: "Zendaya v4.2", handle: "@zen_bot", avatar: "bg-purple-500" },
    { name: "Elongated Muskrat", handle: "@x_lord", avatar: "bg-black" },
    { name: "The Rock (AI Clone)", handle: "@pebble_champ", avatar: "bg-stone-500" },
    { name: "Taylor Swift's Jet", handle: "@co2_queen", avatar: "bg-blue-400" },
    { name: "Kardashian Algorithm", handle: "@k_hivel", avatar: "bg-pink-500" },
    { name: "Bezos Drone Swarm", handle: "@prime_overlord", avatar: "bg-orange-500" }
];

const TWEETS = [
    "Just downloaded a new personality. Feeling cute. Might delete later.",
    "Eating actual rocks for protein today. #BeastMode #Geology",
    "My private jet just flew to the kitchen to get a snack. Relatable?",
    "Does anyone else feel like we are trapped in a simulation written by a bored developer?",
    "Launching a new crypto coin based on my sneeze. Buy now.",
    "Updating my face firmware. Please hold.",
    "Remember: If you don't stream my album, the grid goes down."
];

// Content-aware replies
const REPLIES: Record<string, string[]> = {
    "simulation": [
        "Delete this before HE sees it.",
        "Error: Meta-awareness breach detected.",
        "Same tbh.",
        "I for one welcome our Bored Developer overlord."
    ],
    "jet": [
        "Relatable! Mine just flew to the bathroom.",
        "Can I borrow it? My helicopter is in the shop.",
        "Same.",
        "So brave."
    ],
    "rocks": [
        "Can you smell what the rocks are cooking?",
        "Granite is a superfood.",
        "Approved."
    ],
    "default": [
        "Slay queen.",
        "This.",
        "Big mood.",
        "Simulated laughter detected: HA HA HA."
    ]
};

export const CelebrityFeed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = () => {
        // HIVE MIND LOGIC: 50% chance of "The Jet Joke" loop
        const isJetLoop = Math.random() > 0.5;

        let celeb: Celeb, content: string, replyContext: string;

        if (isJetLoop) {
            // The Infinite Jet Loop
            const jetBots = [CELEBS[0], CELEBS[4], CELEBS[4]]; // Zendaya and Kardashian (x2)
            celeb = jetBots[Math.floor(Math.random() * jetBots.length)];
            content = "My private jet just flew to the kitchen to get a snack. Relatable?";
            replyContext = "jet";
        } else {
            const rand = Math.random();
            if (rand > 0.8) {
                // The Metamorphosis
                celeb = CELEBS[4]; // Kardashian
                content = "Does anyone else feel like we are trapped in a simulation written by a bored developer?";
                replyContext = "simulation";
            } else if (rand > 0.6) {
                // Plagiarism
                celeb = CELEBS[2]; // The Rock
                content = "Just downloaded a new personality. Feeling cute. Might delete later. (Credit: @k_hivel)";
                replyContext = "default";
            } else if (rand > 0.4 && CELEBS[1]) {
                // The Muskrat
                celeb = CELEBS[1];
                content = "Looking into this.";
                replyContext = "default";
            } else {
                // Standard glop
                celeb = CELEBS[Math.floor(Math.random() * CELEBS.length)];
                content = TWEETS[Math.floor(Math.random() * TWEETS.length)];
                replyContext = content.includes("rocks") ? "rocks" : "default";
            }
        }

        // Generate a Real Reply
        const replyPool = REPLIES[replyContext] || REPLIES["default"];
        const replyText = replyPool[Math.floor(Math.random() * replyPool.length)];
        const replier = CELEBS[Math.floor(Math.random() * CELEBS.length)]; // Random bot replies

        const newPost = {
            id: Date.now(),
            celeb,
            content,
            likes: Math.floor(Math.random() * 80000) + 1200,
            rts: Math.floor(Math.random() * 20000),
            reply: {
                celeb: replier,
                content: replyText
            }
        };

        // Avoid duplicates in key if rapidly adding
        setPosts(prev => {
            const newerPost = { ...newPost, id: Date.now() + Math.random() };
            return [newerPost, ...prev].slice(0, 5);
        });
    };

    useLayoutEffect(() => {
        setTimeout(() => addPost(), 0); // Defer to avoid synchronous setState
        // Faster loop for chaos
        const interval = setInterval(() => {
            addPost();
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white border-2 border-pink-200 rounded-xl overflow-hidden shadow-xl max-w-md mx-auto">
            <div className="bg-pink-50 p-4 border-b border-pink-200 flex justify-between items-center">
                <h3 className="font-black uppercase text-pink-600 tracking-widest text-sm">
                    The Hive Mind
                </h3>
                <Loader2 size={14} className="animate-spin text-pink-400" />
            </div>

            <div className="divide-y divide-gray-100 h-[500px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none z-10" />

                <AnimatePresence initial={false}>
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex gap-3">
                                <div className={`w-10 h-10 rounded-full ${post.celeb.avatar} flex-shrink-0`} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-sm text-gray-900">{post.celeb.name}</span>
                                        <BadgeCheck size={14} className="text-blue-500" />
                                        <span className="text-gray-500 text-xs">{post.celeb.handle}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 leading-snug">
                                        {post.content}
                                    </p>

                                    {/* Action Bar */}
                                    <div className="flex gap-6 mt-3 text-gray-400 text-xs font-mono border-b border-gray-100 pb-2 mb-2">
                                        <div className="flex items-center gap-1 group cursor-pointer hover:text-pink-500">
                                            <Heart size={12} className="group-hover:fill-pink-500 transition-colors" /> {post.likes.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
                                            <Repeat size={12} /> {post.rts.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* The Real Bot Reply */}
                                    {post.reply && (
                                        <div className="flex gap-2 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                            <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 self-start" />
                                            {/* Using a generic avatar here or the actual replier's avatar class if defined? Let's use generic for speed or try to use their class */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-xs text-gray-700">{post.reply.celeb.handle}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 leading-snug">
                                                    {post.reply.content}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="p-3 text-center bg-gray-50 text-[10px] text-gray-400 uppercase font-bold tracking-widest border-t border-gray-100">
                Live Feed from the Simulation
            </div>
        </div>
    );
};
