import React from 'react';
import HeroSection from '@/sections/HeroSection';
import DailyBroadcastPlayer from '@/components/DailyBroadcastPlayer';
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
