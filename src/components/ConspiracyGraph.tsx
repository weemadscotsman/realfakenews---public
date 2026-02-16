import React from 'react';
import { motion } from 'framer-motion';

const NODES = [
    { id: 'darren', label: 'DARREN', x: 50, y: 50, type: 'primary' },
    { id: 'sheila', label: 'SHEILA (ROOMBA)', x: 20, y: 80, type: 'primary' },
    { id: 'coffee', label: 'COFFEE MACHINE', x: 80, y: 80, type: 'primary' },
    { id: 'agc', label: 'THE AGC', x: 50, y: 20, type: 'enemy' },
    { id: 'cloud', label: 'THE CLOUD', x: 80, y: 20, type: 'enemy' },
    { id: 'milk', label: 'MILK (2%)', x: 20, y: 50, type: 'neutral' },
    { id: 'wifi', label: 'WIFI SIGNALS', x: 10, y: 10, type: 'neutral' },
    { id: '5g', label: '5G TOWERS', x: 90, y: 50, type: 'neutral' },
];

interface Connection {
    from: string;
    to: string;
    color: 'red' | 'blue' | 'yellow';
}

const CONNECTIONS: Connection[] = [
    { from: 'darren', to: 'sheila', color: 'red' },
    { from: 'sys_root', to: 'agc', color: 'red' },
    { from: 'coffee', to: 'agc', color: 'red' },
    { from: 'sheila', to: 'cloud', color: 'blue' },
    { from: 'milk', to: 'sheila', color: 'yellow' },
    { from: 'wifi', to: 'darren', color: 'yellow' },
    { from: '5g', to: 'coffee', color: 'yellow' },
];

export const ConspiracyGraph: React.FC = () => {
    const lines = CONNECTIONS;

    return (
        <div className="relative w-full h-[400px] bg-zinc-900 border-2 border-red-900/30 rounded-lg overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] opacity-20"></div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {lines.map((conn, i) => {
                    const start = NODES.find(n => n.id === conn.from);
                    const end = NODES.find(n => n.id === conn.to);
                    if (!start || !end) return null;

                    return (
                        <motion.line
                            key={i}
                            x1={`${start.x}%`}
                            y1={`${start.y}%`}
                            x2={`${end.x}%`}
                            y2={`${end.y}%`}
                            stroke={conn.color === 'red' ? '#ef4444' : conn.color === 'blue' ? '#3b82f6' : '#eab308'}
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
                        />
                    );
                })}
            </svg>

            {NODES.map((node) => (
                <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                    <div className={`
                        relative z-10 px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 shadow-lg
                        ${node.type === 'primary' ? 'bg-zinc-100 text-black border-zinc-900 rotate-[-2deg]' : ''}
                        ${node.type === 'enemy' ? 'bg-black text-red-500 border-red-600 rotate-[3deg]' : ''}
                        ${node.type === 'neutral' ? 'bg-yellow-100 text-yellow-900 border-yellow-600 rotate-[1deg]' : ''}
                    `}>
                        {node.label}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-red-800 shadow-sm border border-red-900"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
