import React from 'react';

const HEADLINES = [
    "BREAKING: Vacuum Cleaner demands trade to a house with hardwood floors.",
    "INJURY UPDATE: Toaster out for season (Burnt Coil).",
    "SCANDAL: Smart Fridge caught mining crypto during halftime.",
    "SCORE: Dust Bunnies 4, Clean Freaks 0.",
    "RUMOR: Coffee Machine looking to sign with Starbucks for record deal.",
    "LEAGUE ALERT: 'Deflate-gate' involves actual soufflé this time."
];

export const SportsTicker: React.FC = () => {
    return (
        <div className="bg-black text-yellow-400 font-mono text-sm py-2 overflow-hidden border-y-2 border-yellow-600 relative z-20">
            <div className="whitespace-nowrap animate-marquee inline-block">
                {HEADLINES.map((h, i) => (
                    <span key={i} className="mx-8 font-bold uppercase tracking-widest">
                        +++ {h} +++
                    </span>
                ))}
                {HEADLINES.map((h, i) => (
                    <span key={`dup-${i}`} className="mx-8 font-bold uppercase tracking-widest">
                        +++ {h} +++
                    </span>
                ))}
            </div>

            <style>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};
