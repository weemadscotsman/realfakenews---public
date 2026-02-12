import React from 'react';
import HeroSection from '@/sections/HeroSection';
import NewsGrid from '@/sections/NewsGrid';
import DropTheTea from '@/sections/DropTheTea';
import Leaderboard from '@/sections/Leaderboard';
import Achievements from '@/sections/Achievements';
import StoryArcs from '@/sections/StoryArcs';
import Subscription from '@/sections/Subscription';
import FakeBets from '@/sections/FakeBets';

interface HomeProps {
    onLoginClick: (mode?: 'login' | 'signup') => void;
}

import ApplianceGrievances from '@/sections/ApplianceGrievances';
import ConspiracyDesk from '@/sections/ConspiracyDesk';

const Home: React.FC<HomeProps> = ({ onLoginClick }) => {
    return (
        <main>
            <HeroSection />
            <NewsGrid />
            <ConspiracyDesk />
            <ApplianceGrievances />
            <FakeBets />
            <DropTheTea onLoginRequired={() => onLoginClick('login')} />
            <Leaderboard />
            <StoryArcs />
            <Achievements />
            <Subscription />
        </main>
    );
};

export default Home;
