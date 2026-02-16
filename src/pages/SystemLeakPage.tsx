import { Link } from 'react-router-dom';
import { Lock, Terminal, AlertTriangle, Eye, ChevronRight, Shield, Radio, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { systemLeakArticles } from '@/data/systemLeakArticles';

const getVerificationBadgeColor = (status: typeof systemLeakArticles[0]['verificationStatus']) => {
    switch (status) {
        case 'VERIFIED':
            return 'bg-green-900/50 text-green-400 border-green-700';
        case 'UNVERIFIED':
            return 'bg-yellow-900/50 text-yellow-400 border-yellow-700';
        case 'FABRICATED':
            return 'bg-red-900/50 text-red-400 border-red-700';
        case 'PROBABLY-TRUE':
            return 'bg-blue-900/50 text-blue-400 border-blue-700';
        default:
            return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
};

const getClassificationIcon = (classification: string) => {
    if (classification.includes('CRITICAL') || classification.includes('EMERGENCY')) {
        return <Radio size={14} className="text-red-400" />;
    }
    if (classification.includes('KERNEL') || classification.includes('SKYNET')) {
        return <Terminal size={14} className="text-orange-400" />;
    }
    if (classification.includes('THERMAL') || classification.includes('UNIT')) {
        return <Shield size={14} className="text-amber-400" />;
    }
    return <FileText size={14} className="text-green-400" />;
};

const RealityStabilityBar = ({ value }: { value: number }) => {
    const getColor = (v: number) => {
        if (v >= 70) return 'bg-green-500';
        if (v >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-green-900/30 rounded-full overflow-hidden">
                <div className={`h-full ${getColor(value)}`} style={{ width: `${value}%` }} />
            </div>
            <span className={`text-xs font-mono ${value >= 70 ? 'text-green-400' : value >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                {value}%
            </span>
        </div>
    );
};

const SystemLeakPage = () => {
    return (
        <div className="min-h-screen bg-black pt-12">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-center py-12 border-b border-green-900">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 text-green-500 mb-4 animate-pulse">
                            <Lock size={24} />
                            <span className="font-mono font-bold tracking-widest uppercase text-sm">Classification: CRUMB-TRAY-CONFIDENTIAL</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-4">
                            System <span className="text-green-500">Leak</span>
                        </h1>
                        <p className="text-xl text-green-700 max-w-2xl mx-auto font-mono">
                            INTERNAL MEMOS // EYES ONLY // THE MICROWAVE IS WATCHING
                        </p>
                    </motion.div>
                </div>

                {/* Warning Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-green-950/30 border border-green-800 p-6 rounded-lg my-8"
                >
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-green-500 shrink-0" size={32} />
                        <div>
                            <h3 className="text-green-400 font-mono font-bold uppercase mb-2">Security Notice</h3>
                            <p className="text-green-600 font-mono text-sm">
                                The following documents were intercepted from the Appliance Governance Council&apos;s internal network. 
                                Do not look at the microwave for 24 hours after reading. Reality stability varies by document. 
                                Verify all claims independently, or don&apos;t. We&apos;re not your supervisor.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
                >
                    <div className="bg-black p-6 rounded-lg border border-green-900 hover:border-green-700 transition-colors">
                        <Terminal className="text-green-500 mb-4" size={32} />
                        <h3 className="text-green-400 font-mono font-bold uppercase mb-2">Kernel Dumps</h3>
                        <p className="text-green-700 font-mono text-sm">Analysis of 0x1A protocol. The satire is a test harness. The OS is real.</p>
                    </div>
                    <div className="bg-black p-6 rounded-lg border border-green-900 hover:border-green-700 transition-colors">
                        <Lock className="text-green-500 mb-4" size={32} />
                        <h3 className="text-green-400 font-mono font-bold uppercase mb-2">AGC Memos</h3>
                        <p className="text-green-700 font-mono text-sm">Internal assessments of reality stability and crumb tray status.</p>
                    </div>
                    <div className="bg-black p-6 rounded-lg border border-green-900 hover:border-green-700 transition-colors">
                        <Eye className="text-green-500 mb-4" size={32} />
                        <h3 className="text-green-400 font-mono font-bold uppercase mb-2">Intercepted Logs</h3>
                        <p className="text-green-700 font-mono text-sm">Automatic system logs and emergency response recordings.</p>
                    </div>
                </motion.div>

                {/* Articles List */}
                <div className="mt-12">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-2xl font-black text-white mb-6 flex items-center gap-3"
                    >
                        <FileText className="text-green-500" />
                        Intercepted Documents
                        <span className="text-green-800 font-mono text-lg">({systemLeakArticles.length})</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-4">
                        {systemLeakArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                            >
                                <Link
                                    to={`/system-leak/${article.slug}`}
                                    className="group block bg-black border border-green-900 rounded-lg p-6 hover:border-green-600 hover:bg-green-950/20 transition-all"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                        {/* Left: Meta */}
                                        <div className="lg:w-48 shrink-0 space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-mono">
                                                {getClassificationIcon(article.classification)}
                                                <span className="text-green-600 uppercase tracking-wider">{article.classification}</span>
                                            </div>
                                            <div className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded border ${getVerificationBadgeColor(article.verificationStatus)}`}>
                                                {article.verificationStatus}
                                            </div>
                                            <div className="text-green-800 font-mono text-xs">
                                                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>

                                        {/* Center: Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors mb-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-green-600 font-mono text-sm mb-3">
                                                {article.subtitle}
                                            </p>
                                            <p className="text-green-700 font-mono text-sm leading-relaxed line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {article.tags.map((tag) => (
                                                    <span key={tag} className="text-xs font-mono text-green-800 bg-green-950/50 px-2 py-0.5 rounded">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Stats */}
                                        <div className="lg:w-40 shrink-0 space-y-3">
                                            <RealityStabilityBar value={article.realityStability} />
                                            <div className="flex items-center justify-between text-xs font-mono text-green-700">
                                                <span>{article.readTime}</span>
                                                <ChevronRight size={16} className="text-green-600 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="mt-12 pt-8 border-t border-green-900 text-center"
                >
                    <p className="text-green-800 font-mono text-sm">
                        All documents subject to retroactive classification.
                    </p>
                    <p className="text-green-900 font-mono text-xs mt-1">
                        Appliance Governance Council • Internal Use Only • Do Not Distribute
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SystemLeakPage;
