import React from 'react';
import HeroSection from '@/sections/HeroSection';
import DailyBroadcastPlayer from '@/components/DailyBroadcastPlayer';
import { AppliancePressBriefing } from '@/components/AppliancePressBriefing';
import NewsGrid from '@/sections/NewsGrid';
import DropTheTea from '@/sections/DropTheTea';
import Leaderboard from '@/sections/Leaderboard';
import Achievements from '@/sections/Achievements';
import StoryArcs from '@/sections/StoryArcs';
import FakeBets from '@/sections/FakeBets';
import { QuestDecision } from '@/components/QuestDecision';
import { fetchWorldState } from '@/lib/gemini';
import { useState, useEffect } from 'react';

interface HomeProps {
    onLoginClick: (mode?: 'login' | 'signup') => void;
}

import ApplianceGrievances from '@/sections/ApplianceGrievances';
import ConspiracyDesk from '@/sections/ConspiracyDesk';

const Home: React.FC<HomeProps> = ({ onLoginClick }) => {
    const [activeStories, setActiveStories] = useState<any[]>([]);

    useEffect(() => {
        const loadState = async () => {
            const data = await fetchWorldState();
            if (data?.activeStories) {
                setActiveStories(data.activeStories);
            }
        };
        loadState();
    }, []);

    return (
        <main>
            <HeroSection />
            <DailyBroadcastPlayer />
            <AppliancePressBriefing />

            {/* System Intercepts (The Guts) */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <a href="/logs/darren-03" className="block bg-black border border-green-900/50 p-4 rounded-lg hover:border-green-500 transition-colors group relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="font-mono text-green-500 text-sm uppercase tracking-widest">
                                Encrypted Signal Intercepted // Darren_Log_03
                            </span>
                        </div>
                        <span className="text-xs text-green-700 font-mono group-hover:text-green-400">
                            DECRYPT_NOW &rarr;
                        </span>
                    </div>
                </a>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <QuestDecision activeStories={activeStories} />
            </div>

            <NewsGrid />
            <ConspiracyDesk />
            <ApplianceGrievances />
            <FakeBets />
            <DropTheTea onLoginRequired={() => onLoginClick('login')} />
            <Leaderboard />
            <StoryArcs />
            <Achievements />
        </main>
    );
};

export default Home;
