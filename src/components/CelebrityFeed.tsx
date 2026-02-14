import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Repeat, BadgeCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CELEBS = [
    { name: "Zendaya v4.2", handle: "@zen_bot", avatar: "bg-purple-500" },
    { name: "Elongated Muskrat", handle: "@x_lord", avatar: "bg-black" },
    { name: "The Rock (AI Clone)", handle: "@pebble_champ", avatar: "bg-stone-500" },
    { name: "Taylor Swift's Jet", handle: "@co2_queen", avatar: "bg-blue-400" },
    { name: "Kardashian Algorithm", handle: "@k_hivel", avatar: "bg-pink-500" }
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

export const CelebrityFeed: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);

    const addPost = () => {
        const celeb = CELEBS[Math.floor(Math.random() * CELEBS.length)];
        const content = TWEETS[Math.floor(Math.random() * TWEETS.length)];
        const newPost = {
            id: Date.now(),
            celeb,
            content,
            likes: Math.floor(Math.random() * 50000),
            rts: Math.floor(Math.random() * 10000)
        };
        setPosts(prev => [newPost, ...prev].slice(0, 5));
    };

    useEffect(() => {
        addPost();
        const interval = setInterval(addPost, 3500);
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

            <div className="divide-y divide-gray-100 max-h-[400px] overflow-hidden relative">
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
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-sm text-gray-900">{post.celeb.name}</span>
                                        <BadgeCheck size={14} className="text-blue-500" />
                                        <span className="text-gray-500 text-xs">{post.celeb.handle}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 leading-snug">
                                        {post.content}
                                    </p>
                                    <div className="flex gap-6 mt-3 text-gray-400 text-xs font-mono">
                                        <div className="flex items-center gap-1 group cursor-pointer hover:text-pink-500">
                                            <Heart size={12} className="group-hover:fill-pink-500 transition-colors" /> {post.likes.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
                                            <Repeat size={12} /> {post.rts.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            <MessageCircle size={12} /> Bot Repl
                                        </div>
                                    </div>
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
