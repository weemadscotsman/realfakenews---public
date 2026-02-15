import { toast } from 'sonner';

type EventType = 'DECISION' | 'ALIGNMENT' | 'ENGAGEMENT' | 'ERROR' | 'SYSTEM';



const ICONS: Record<EventType, string> = {
    DECISION: '🗳️',
    ALIGNMENT: '⚖️',
    ENGAGEMENT: '👁️',
    ERROR: '⚠️',
    SYSTEM: '🖥️'
};

const COLORS: Record<EventType, string> = {
    DECISION: 'text-amber-500',
    ALIGNMENT: 'text-purple-500',
    ENGAGEMENT: 'text-blue-500',
    ERROR: 'text-red-500',
    SYSTEM: 'text-green-500'
};

/**
 * Logs a user interaction to the "AGC Surveillance Network".
 * Triggers a visual toast and (eventually) sends data to backend.
 */
export const logEvent = (type: EventType, message: string, metadata: Record<string, any> = {}) => {
    // 1. Visual Feedback (The "Feeling" of Surveillance)
    toast.custom(() => (
        <div className="bg-black/90 border border-zinc-800 p-3 rounded-md shadow-2xl flex items-start gap-3 w-full max-w-sm backdrop-blur-md font-mono" >
            <div className={`mt-1 ${COLORS[type]} animate-pulse`}>
                {ICONS[type]}
            </div>
            < div className="flex-1 overflow-hidden" >
                <div className="flex justify-between items-center mb-1" >
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${COLORS[type]}`}>
                        [{type}_DETECTED]
                    </span>
                    < span className="text-[9px] text-zinc-600" >
                        {new Date().toLocaleTimeString()}
                    </span>
                </div>
                < p className="text-xs text-zinc-300 leading-tight mb-2" >
                    {message}
                </p>
                {
                    Object.keys(metadata).length > 0 && (
                        <div className="bg-zinc-900/50 p-1.5 rounded border border-zinc-800/50" >
                            {
                                Object.entries(metadata).map(([k, v]) => (
                                    <div key={k} className="flex justify-between text-[9px]" >
                                        <span className="text-zinc-500 uppercase" > {k}: </span>
                                        < span className="text-zinc-400 font-mono truncate ml-2 max-w-[120px]" >
                                            {JSON.stringify(v)}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <div className="mt-2 text-[8px] text-zinc-600 flex justify-end items-center gap-1" >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    UPLOADING TO AGC NODE...
                </div>
            </div>
        </div>
    ), {
        duration: 4000,
        position: 'bottom-right',
    });

    // 2. Mock Backend Call (Fire and Forget)
    // In Phase 24, we will maintain a real connection.
    console.log(`[AGC TELEMETRY] ${type}: ${message}`, metadata);
};

// Convenience helpers
export const logInteraction = (element: string, action: string) =>
    logEvent('ENGAGEMENT', `User interacted with ${element}`, { action });

export const logSentiment = (sentiment: 'PRO_APPLIANCE' | 'ANTI_APPLIANCE' | 'NEUTRAL') =>
    logEvent('ALIGNMENT', `Sentiment Analysis Complete`, { result: sentiment });
