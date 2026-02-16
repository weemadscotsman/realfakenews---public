/**
 * AudioEngine - Handles Text-to-Speech and Glitch Effects
 * Phase 9: Voice Synthesis
 */

interface VoiceConfig {
    locale: string;
    gender: 'male' | 'female';
}

export class AudioEngine {
    private static instance: AudioEngine;
    private synth: SpeechSynthesis;
    private voices: SpeechSynthesisVoice[] = [];
    private initialized = false;

    private constructor() {
        this.synth = window.speechSynthesis;
        if (typeof window !== 'undefined') {
            this.initVoices();
            if (this.synth.onvoiceschanged !== undefined) {
                this.synth.onvoiceschanged = () => this.initVoices();
            }
        }
    }

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    private initVoices() {
        this.voices = this.synth.getVoices();
        this.initialized = true;
        // console.log(`[AudioEngine] Loaded ${this.voices.length} voices.`);
    }

    /**
     * Find the best matching voice for a config request
     */
    private getVoice(config: VoiceConfig): SpeechSynthesisVoice | null {
        if (!this.initialized || this.voices.length === 0) this.initVoices();

        // 1. Precise Match (Locale + Name hints usually indicate gender in WebSpeech)
        const exact = this.voices.find(v =>
            v.lang.startsWith(config.locale) &&
            (config.gender === 'male' ? (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Google US English')) : (v.name.includes('Female') || v.name.includes('Zira')))
        );

        if (exact) return exact;

        // 2. Loose Match (Just Locale)
        const loose = this.voices.find(v => v.lang.startsWith(config.locale));
        return loose || this.voices[0]; // Fallback to system default
    }

    /**
     * Speak text with specific character persona
     */
    public speak(text: string, character: 'clive' | 'zara' = 'clive') {
        if (this.synth.speaking) {
            this.synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);

        // Voice Selection Logic
        if (character === 'clive') {
            utterance.voice = this.getVoice({ locale: 'en-GB', gender: 'male' });
            utterance.pitch = 0.9; // Lower pitch for authority
            utterance.rate = 1.0;
        } else if (character === 'zara') {
            utterance.voice = this.getVoice({ locale: 'en-US', gender: 'female' });
            utterance.pitch = 1.1; // Slightly higher
            utterance.rate = 1.1; // Faster, intense
        }

        this.synth.speak(utterance);
    }

    public stop() {
        this.synth.cancel();
    }
}
