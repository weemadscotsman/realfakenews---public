import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, HeartCrack, BatteryWarning, WifiOff } from 'lucide-react';

const Timeline: React.FC = () => {
    const events = [
        {
            date: "Nov 12, 2024",
            title: "The Arrival",
            icon: <Calendar className="text-blue-500" />,
            desc: "Darren purchases 'Sheila' (Model X-9000) during a Black Friday sale. First clean cycle described as 'magical'."
        },
        {
            date: "Dec 05, 2024",
            title: "The Bonding",
            icon: <HeartCrack className="text-pink-500" />,
            desc: "Darren cancels Friday night plans to 'supervise' the hallway cleaning. Neighbours notice ambient lighting."
        },
        {
            date: "Jan 15, 2025",
            title: "Firmware Update v4.2",
            icon: <WifiOff className="text-red-500" />,
            desc: "Sheila receives OTA update. Pathfinding efficiency increases by 14%. Emotional warmth decreases by 100%."
        },
        {
            date: "Jan 18, 2025",
            title: "The Incident",
            icon: <BatteryWarning className="text-orange-500" />,
            desc: "Sheila bypasses Darren's foot without stopping. Darren writes first poem."
        },
        {
            date: "Feb 14, 2025",
            title: "Valentine's Day Massacre",
            icon: <HeartCrack className="text-purple-600" />,
            desc: "Darren buys premium filters. Sheila attempts to vacuum up the gift receipt. Police called for noise complaint (sobbing)."
        },
        {
            date: "Current Day",
            title: "Co-Habitation Status",
            icon: <WifiOff className="text-gray-500" />,
            desc: "House is spotless. Darren is a mess. The Fridge has started making judgmental beeping noises."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-serif font-bold mb-4">The Darren & Sheila Saga</h1>
                <p className="text-xl text-gray-500 italic">"A timeline of domestic obsolescence"</p>
            </div>

            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>

                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`flex items-center justify-between mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                            }`}
                    >
                        <div className="w-5/12"></div>
                        <div className="z-10 bg-white p-2 rounded-full border-2 border-gray-200 shadow-sm">
                            {event.icon}
                        </div>
                        <div className="w-5/12 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:border-red-200 transition-colors">
                            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{event.date}</span>
                            <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{event.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
