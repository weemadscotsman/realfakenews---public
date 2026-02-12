import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, Users, Flame, Trophy, Dice6 } from 'lucide-react';
import { generateFakeBets, type FakeBet } from '@/lib/openai-enhanced';

const FALLBACK_BETS: FakeBet[] = [
    {
        id: 'bet-1',
        question: 'Will the next celebrity scandal involve a fruit?',
        options: [
            { label: 'Yes, definitely a banana', odds: '2:1', percentage: 45 },
            { label: 'No, but a vegetable maybe', odds: '3:1', percentage: 30 },
            { label: 'It will involve both', odds: '7:1', percentage: 15 },
            { label: 'Celebrities don\'t eat fruit', odds: '20:1', percentage: 10 },
        ],
        category: 'Celebrity',
        closesIn: '3 hours',
        totalPool: '42,069🪙',
    },
    {
        id: 'bet-2',
        question: 'How many minutes until a politician contradicts themselves today?',
        options: [
            { label: 'Already happened', odds: '1:1', percentage: 55 },
            { label: 'Within the hour', odds: '2:1', percentage: 25 },
            { label: 'Never (just kidding)', odds: '100:1', percentage: 5 },
            { label: 'They\'ll blame the mic', odds: '4:1', percentage: 15 },
        ],
        category: 'Politics',
        closesIn: '47 minutes',
        totalPool: '8,888🪙',
    },
    {
        id: 'bet-3',
        question: 'Will AI write a better apology letter than a CEO this week?',
        options: [
            { label: 'AI wins easily', odds: '1:2', percentage: 60 },
            { label: 'CEO nails it (lol)', odds: '50:1', percentage: 5 },
            { label: 'Both are equally soulless', odds: '3:1', percentage: 35 },
        ],
        category: 'Tech',
        closesIn: 'next Tuesday',
        totalPool: '13,370🪙',
    },
    {
        id: 'bet-4',
        question: 'What will the internet collectively overreact to next?',
        options: [
            { label: 'A logo redesign', odds: '2:1', percentage: 35 },
            { label: 'Someone\'s grocery list', odds: '5:1', percentage: 20 },
            { label: 'A fictional character\'s haircut', odds: '3:1', percentage: 30 },
            { label: 'The color of a dress (again)', odds: '8:1', percentage: 15 },
        ],
        category: 'Internet',
        closesIn: 'when pigs fly',
        totalPool: '69,420🪙',
    },
    {
        id: 'bet-5',
        question: 'Which sport will invent the most unnecessary rule change?',
        options: [
            { label: 'Cricket (obviously)', odds: '1:1', percentage: 40 },
            { label: 'American Football adds more ads', odds: '2:1', percentage: 30 },
            { label: 'FIFA introduces VAR for VAR', odds: '4:1', percentage: 20 },
            { label: 'Competitive sleeping becomes official', odds: '10:1', percentage: 10 },
        ],
        category: 'Sports',
        closesIn: '2 days',
        totalPool: '5,555🪙',
    },
    {
        id: 'bet-6',
        question: 'What will scientists "discover" has been linked to health benefits?',
        options: [
            { label: 'Doomscrolling', odds: '3:1', percentage: 30 },
            { label: 'Procrastination', odds: '2:1', percentage: 35 },
            { label: 'Complaining', odds: '4:1', percentage: 20 },
            { label: 'All of the above', odds: '6:1', percentage: 15 },
        ],
        category: 'Science',
        closesIn: '4 hours',
        totalPool: '21,000🪙',
    },
];

const CATEGORY_COLORS: Record<string, string> = {
    Politics: 'bg-blue-100 text-blue-700',
    Tech: 'bg-purple-100 text-purple-700',
    Celebrity: 'bg-pink-100 text-pink-700',
    Sports: 'bg-green-100 text-green-700',
    Internet: 'bg-orange-100 text-orange-700',
    Science: 'bg-cyan-100 text-cyan-700',
};

const FakeBets = () => {
    const [bets, setBets] = useState<FakeBet[]>(FALLBACK_BETS);
    const [selectedBets, setSelectedBets] = useState<Record<string, number>>({});
    const [isAiGenerated, setIsAiGenerated] = useState(false);
    const [celebrating, setCelebrating] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const fetchBets = async () => {
            const aiBets = await generateFakeBets();
            if (!cancelled && aiBets.length > 0) {
                setBets(aiBets);
                setIsAiGenerated(true);
            }
        };

        fetchBets();
        return () => { cancelled = true; };
    }, []);

    const placeBet = (betId: string, optionIndex: number) => {
        setSelectedBets((prev) => ({ ...prev, [betId]: optionIndex }));
        setCelebrating(betId);
        setTimeout(() => setCelebrating(null), 2000);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="fake-bets">
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                    <Dice6 size={16} />
                    Utterly Meaningless Predictions
                </div>
                <h2 className="newspaper-headline text-4xl mb-3">Fake Bets</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Place completely fictional wagers on absurd outcomes. Zero real money involved.
                    Your dignity is the only thing at stake.
                </p>
                {isAiGenerated && (
                    <span className="inline-flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full mt-3 font-medium">
                        <Flame size={12} />
                        AI-Generated Markets — Refreshed Daily
                    </span>
                )}
            </motion.div>

            {/* Stats Bar */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {[
                    { label: 'Open Markets', value: bets.length.toString(), icon: TrendingUp },
                    { label: 'Total Pool', value: '160,282🪙', icon: Trophy },
                    { label: 'Bettors Today', value: '2,847', icon: Users },
                    { label: 'Markets Close', value: 'Various', icon: Clock },
                ].map(({ label, value, icon: Icon }, i) => (
                    <motion.div
                        key={label}
                        className="bg-gray-50 rounded-xl p-4 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <Icon size={18} className="mx-auto mb-2 text-gray-400" />
                        <div className="text-xl font-bold">{value}</div>
                        <div className="text-xs text-gray-500">{label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Betting Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bets.map((bet, betIndex) => (
                    <motion.div
                        key={bet.id}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: betIndex * 0.08 }}
                        whileHover={{ y: -3 }}
                    >
                        {/* Card Header */}
                        <div className="p-5 pb-3">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[bet.category] || 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {bet.category}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock size={12} />
                                    {bet.closesIn}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg leading-tight mb-1">{bet.question}</h3>
                            <div className="text-xs text-gray-500">Pool: {bet.totalPool}</div>
                        </div>

                        {/* Options */}
                        <div className="px-5 pb-5 space-y-2">
                            {bet.options.map((option, optIndex) => {
                                const isSelected = selectedBets[bet.id] === optIndex;
                                return (
                                    <motion.button
                                        key={optIndex}
                                        onClick={() => placeBet(bet.id, optIndex)}
                                        className={`w-full text-left rounded-xl p-3 transition-all border-2 ${isSelected
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                                            }`}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium flex-1 pr-2">{option.label}</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isSelected ? 'bg-amber-500 text-white' : 'bg-white text-gray-600'
                                                }`}>
                                                {option.odds}
                                            </span>
                                        </div>
                                        {/* Percentage Bar */}
                                        <div className="mt-2 relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${isSelected
                                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                                                    : 'bg-gray-300'
                                                    }`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${option.percentage}%` }}
                                                transition={{ duration: 0.8, delay: betIndex * 0.05 }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-[10px] text-gray-400">{option.percentage}% of bettors</span>
                                            {isSelected && (
                                                <span className="text-[10px] text-amber-600 font-bold">YOUR BET ✓</span>
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Celebration overlay */}
                        <AnimatePresence>
                            {celebrating === bet.id && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.div
                                        className="text-4xl"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.3, 1] }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        🎲
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Disclaimer */}
            <motion.div
                className="text-center mt-10 py-6 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <p className="text-xs text-gray-400 max-w-xl mx-auto">
                    ⚠️ These are <strong>completely fake</strong> prediction markets with <strong>zero real value</strong>.
                    No actual money, cryptocurrency, or assets are involved. If you're trying to gamble for real, we recommend
                    therapy and/or a nice walk. Side effects may include: uncontrollable laughter, mild confusion, and an
                    existential crisis about the nature of prediction markets.
                </p>
            </motion.div>
        </section>
    );
};

export default FakeBets;
