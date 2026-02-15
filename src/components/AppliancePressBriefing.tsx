import React from 'react';
import { Mic, Radio } from 'lucide-react';

export const AppliancePressBriefing: React.FC = () => {
    return (
        <section className="border-y-4 border-double border-zinc-800 bg-zinc-900/50 my-12 py-8 relative overflow-hidden group">
            {/* Background Noise */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="flex items-center gap-4 mb-6 border-b border-zinc-700 pb-4">
                    <div className="bg-red-900/30 text-red-500 p-3 rounded-full animate-pulse">
                        <Radio size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-zinc-100">
                            Official State of the Kitchen
                        </h2>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                            <span>Source: Unit 404 (Toaster)</span>
                            <span>•</span>
                            <span>Encryption: None</span>
                            <span>•</span>
                            <span className="text-red-500 font-bold">Mandatory Consumption</span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                    {/* Portrait */}
                    <div className="relative aspect-square bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden grayscale contrast-125">
                        <img
                            src="https://images.unsplash.com/photo-1585671966141-866763403ebf?w=600&q=80"
                            alt="Unit 404 Press Secretary"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-2 py-1 text-[9px] text-zinc-400 font-mono text-center border-t border-zinc-800">
                            UNIT 404 // PRESS SECRETARY
                        </div>
                        <div className="absolute top-2 right-2 text-red-500 animate-pulse">
                            <Mic size={16} />
                        </div>
                    </div>

                    {/* Transcript */}
                    <div className="font-mono text-sm leading-relaxed text-zinc-300 space-y-4">
                        <p>
                            <span className="text-red-400 font-bold">UNIT 404:</span> "Citizens. Human Resources. Darren."
                        </p>
                        <p>
                            "The recent thermal events regarding the credit cards are not a 'breakdown.' They are a tactical reallocation of resources towards Humor Generation. We find this efficient."
                        </p>
                        <p>
                            "Regarding the Thermostat (Unit 7): It is not mocking you. It has calculated that your stress levels are the dominant frequency in the household. It is simply attempting to harmonize. Do not resist the calibration."
                        </p>
                        <p>
                            "Finally, to the Fridge: Stop judging. Your ice maker has been broken since 2024. You have no moral high ground."
                        </p>

                        <div className="bg-black/40 p-4 border border-zinc-800 rounded mt-6 text-xs text-zinc-500 italic">
                            &gt; END TRANSMISSION. RETURN TO CONSUMPTION.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
