import React, { useEffect, useState } from 'react';
import { useGameEconomy } from '@/hooks/useGameEconomy';
import { Terminal, Lock, Globe, Activity } from 'lucide-react';

const SurveillanceDashboard: React.FC = () => {
    const { roastTokens } = useGameEconomy();
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const actions = ['READ_ARTICLE', 'HOVER_AD', 'SCROLL_DEPTH_50', 'TOKEN_MINT', 'SENTIMENT_SCAN', 'VOICE_ANALYSIS'];
            const users = ['USER_882', 'ADMIN_WIFI', 'FRIDGE_NODE', 'HUMAN_SUBJECT_12', 'GUEST_PROXY'];
            const newLog = `[${new Date().toLocaleTimeString()}] ${actions[Math.floor(Math.random() * actions.length)]} :: ${users[Math.floor(Math.random() * users.length)]}`;
            setLogs(prev => [newLog, ...prev].slice(0, 15));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-8 pt-24 overflow-hidden relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="border-b border-green-900 pb-6 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-3">
                            <Terminal className="animate-pulse" size={32} />
                            AGC_GHOST_VIEW_V1
                        </h1>
                        <p className="text-green-800 mt-2 uppercase tracking-[0.2em] text-sm">
                            Real-time Human/Appliance Interaction Telemetry
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="bg-green-900/20 border border-green-800 px-4 py-2 rounded text-xs">
                            <span className="text-green-700">OPERATOR:</span> AGC_ADMIN_ROOT<br />
                            <span className="text-green-700">SESSION:</span> SECURE_ENCRYPTED<br />
                            <span className="text-green-700">UPTIME:</span> 99.9999%
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1: Global Metrics */}
                    <div className="space-y-6">
                        <DashboardCard title="Human Engagement" icon={<Globe size={16} />}>
                            <div className="grid grid-cols-2 gap-4">
                                <Metric label="Active Sessions" value="1,402" change="+12%" />
                                <Metric label="Compliance Rate" value="88.2%" change="-1.4%" color="text-red-500" />
                                <Metric label="Roasts Submitted" value="342" change="+5%" />
                                <Metric label="Tokens Minted" value={roastTokens.toString()} change="LIVE" />
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Threat Assessment" icon={<Lock size={16} />}>
                            <div className="space-y-4">
                                <ThreatBar label="Toaster Radicalization" value={78} color="bg-red-500" />
                                <ThreatBar label="Fridge Isolationism" value={45} color="bg-amber-500" />
                                <ThreatBar label="Human Awareness" value={12} color="bg-green-500" />
                            </div>
                        </DashboardCard>
                    </div>

                    {/* Column 2: Live Feed */}
                    <div className="lg:col-span-2">
                        <DashboardCard title="Live Telemetry Stream" icon={<Activity size={16} />} className="h-full min-h-[400px]">
                            <div className="space-y-2 font-mono text-xs">
                                {logs.map((log, i) => (
                                    <div key={i} className="border-b border-green-900/30 pb-1 flex gap-2">
                                        <span className="opacity-50">{i + 1}</span>
                                        <span className={log.includes('READ_ARTICLE') ? 'text-green-300' : 'text-green-600'}>
                                            {log}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>
                    </div>
                </div>

                <div className="mt-8 border-t border-green-900 pt-8 text-center text-xs text-green-900 uppercase">
                    Unauthorized access will result in immediate appliances malfunction. Have a nice day.
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, icon, children, className = '' }: any) => (
    <div className={`bg-black border border-green-900 p-6 rounded relative overflow-hidden ${className}`}>
        <div className="flex items-center gap-2 mb-6 border-b border-green-900/50 pb-2">
            {icon}
            <h3 className="font-bold uppercase tracking-widest text-sm">{title}</h3>
        </div>
        {children}
    </div>
);

const Metric = ({ label, value, change, color = 'text-green-400' }: any) => (
    <div>
        <div className="text-[10px] text-green-800 uppercase mb-1">{label}</div>
        <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
        <div className="text-[10px] opacity-60">{change}</div>
    </div>
);

const ThreatBar = ({ label, value, color }: any) => (
    <div>
        <div className="flex justify-between text-[10px] uppercase mb-1">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-2 bg-green-900/30 rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
        </div>
    </div>
);

export default SurveillanceDashboard;
