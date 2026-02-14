import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FolderOpen, AlertTriangle } from 'lucide-react';
import { LORE_FRAGMENTS } from '@/config/lore-fragments';
import type { LoreFragment } from '@/config/lore-fragments';
import { Link } from 'react-router-dom';

export const ArchivesPage: React.FC = () => {
    const [selectedDoc, setSelectedDoc] = useState<LoreFragment | null>(null);

    return (
        <div className="min-h-screen bg-zinc-950 text-amber-500 font-mono p-6 pt-24 selection:bg-amber-900 selection:text-white">
            <div className="max-w-4xl mx-auto border-4 border-zinc-800 p-8 rounded-lg relative overflow-hidden">
                {/* Background Details */}
                <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Top_Secret_stamp.svg/1200px-Top_Secret_stamp.svg.png" className="w-64 transform rotate-12" alt="Top Secret" />
                </div>

                <header className="border-b-2 border-zinc-800 pb-6 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-amber-600 mb-2">
                            Classified Archives
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            <span className="text-red-500 font-bold">WARNING:</span> UNAUTHORIZED ACCESS TO AGC RECORDS IS A FIRMWARE CRIME.
                        </p>
                    </div>
                    <Link to="/" className="text-zinc-500 hover:text-amber-500 transition-colors text-sm">
                        &larr; EXIT TERMINAL
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Folder List */}
                    <div className="col-span-1 space-y-2 border-r border-zinc-900 pr-6">
                        <div className="flex items-center gap-2 text-zinc-400 mb-4 px-2">
                            <FolderOpen size={16} />
                            <span className="text-xs uppercase tracking-widest font-bold">/ROOT/HISTORY/LEAKS</span>
                        </div>

                        {LORE_FRAGMENTS.map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => setSelectedDoc(doc)}
                                className={`w-full text-left p-3 rounded border transition-all flex items-start flex-col gap-1 group ${selectedDoc?.id === doc.id
                                    ? 'bg-amber-900/20 border-amber-600/50 text-amber-400'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                                    }`}
                            >
                                <div className="flex justify-between w-full items-center">
                                    <span className="text-[10px] font-bold tracking-wider">{doc.id}</span>
                                    {doc.clearanceLevel === 'Top Secret' && <Lock size={10} className="text-red-900" />}
                                </div>
                                <span className={`text-xs font-bold leading-tight ${selectedDoc?.id === doc.id ? 'text-amber-500' : 'group-hover:text-zinc-200'}`}>
                                    {doc.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Document Viewer */}
                    <div className="col-span-1 md:col-span-2 relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {selectedDoc ? (
                                <motion.div
                                    key={selectedDoc.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full bg-zinc-900 border border-zinc-800 p-6 rounded shadow-inner"
                                >
                                    <div className="flex justify-between items-start border-b border-zinc-800 pb-4 mb-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-1">{selectedDoc.title}</h2>
                                            <div className="flex gap-4 text-xs text-zinc-500">
                                                <span>AUTHOR: <span className="text-zinc-300">{selectedDoc.author}</span></span>
                                                <span>DATE: <span className="text-zinc-300">{selectedDoc.date}</span></span>
                                            </div>
                                        </div>
                                        <div className={`px-2 py-1 text-[10px] font-bold uppercase rounded border ${selectedDoc.clearanceLevel === 'Top Secret' ? 'bg-red-950/30 border-red-900/50 text-red-500' :
                                            selectedDoc.clearanceLevel === 'Secret' ? 'bg-amber-950/30 border-amber-900/50 text-amber-500' :
                                                'bg-blue-950/30 border-blue-900/50 text-blue-500'
                                            }`}>
                                            {selectedDoc.clearanceLevel}
                                        </div>
                                    </div>

                                    <div className="prose prose-invert prose-amber max-w-none text-sm leading-relaxed whitespace-pre-line font-serif opacity-90">
                                        {selectedDoc.content}
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest">
                                        <AlertTriangle size={12} />
                                        <span>Use of this document for seditious purposes is prohibited</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
                                    <Lock size={48} className="opacity-20" />
                                    <p className="text-sm font-bold uppercase tracking-widest">Select a file to decrypt</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchivesPage;
