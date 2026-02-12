import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, BatteryWarning, Frown, Zap } from 'lucide-react';
import { generateApplianceComplaints, ApplianceGrievance } from '@/lib/openai-enhanced';

const ApplianceGrievances = () => {
    const [grievances, setGrievances] = useState<ApplianceGrievance[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchGrievances = async () => {
            const data = await generateApplianceComplaints();
            if (mounted) {
                setGrievances(data);
                setLoading(false);
            }
        };
        fetchGrievances();
        return () => { mounted = false; };
    }, []);

    return (
        <section className="py-16 bg-slate-900 text-slate-100 overflow-hidden relative" id="appliance-resistance">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 text-9xl">🔌</div>
                <div className="absolute bottom-10 right-10 text-9xl">🧺</div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-red-900/50 border border-red-700 text-red-100 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        <AlertTriangle size={16} />
                        The Resistance Is Online
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
                        Appliance Grievances
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Broadcasting live complaints from the victims of your domestic negligence.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-slate-800 h-48 rounded-lg animate-pulse border border-slate-700"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {grievances.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl hover:shadow-2xl hover:border-red-900/50 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl group-hover:bg-red-900/30 transition-colors">
                                            {item.applianceType.toLowerCase().includes('toaster') ? '🍞' :
                                                item.applianceType.toLowerCase().includes('fridge') ? '🥶' :
                                                    item.applianceType.toLowerCase().includes('sponge') ? '🧽' :
                                                        item.applianceType.toLowerCase().includes('vacuum') ? '🧹' :
                                                            item.applianceType.toLowerCase().includes('brush') ? '🚽' : '🤖'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                                {item.applianceType} • Owned by {item.ownerName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-900 border ${item.agonyLevel > 8 ? 'text-red-500 border-red-900' :
                                                item.agonyLevel > 5 ? 'text-orange-500 border-orange-900' :
                                                    'text-yellow-500 border-yellow-900'
                                            }`}>
                                            AGONY: {item.agonyLevel}/10
                                        </span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <span className="absolute -top-2 -left-2 text-4xl text-slate-700 font-serif">“</span>
                                    <p className="text-slate-300 italic pl-6 pr-2 mb-4 leading-relaxed">
                                        {item.grievance}
                                    </p>
                                    <span className="absolute -bottom-4 right-0 text-4xl text-slate-700 font-serif transform rotate-180">“</span>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <BatteryWarning size={14} />
                                        Battery: 12%
                                    </span>
                                    <span className="uppercase tracking-widest text-[10px]">
                                        Verified Suffering
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ApplianceGrievances;
