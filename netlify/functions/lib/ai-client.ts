import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import OpenAI from 'openai';
import { 
    TaskType, 
    getSpecialistModel,
    getTaskTypeForFunction,
    MODEL_PERSONALITIES as SpecialistPersonalities
} from './ai-specialists';

export type AIProvider = 'google' | 'openrouter';

interface AIClient {
    generateContent: (options: {
        contents: Array<{ role: string; parts: Array<{ text: string }> }>;
        generationConfig?: {
            temperature?: number;
            responseMimeType?: string;
        };
    }, taskType?: TaskType) => Promise<{ response: { text: () => string } }>;
}

// ============================================
// ALL 40+ FREE MODELS - The Ultimate Arsenal
// Last Updated: February 2026
// Source: https://openrouter.ai/collections/free-models
// ============================================
export const ALL_FREE_MODELS = [
    // 🧠 REASONING MODELS (Deep thinking, philosophy, roasts)
    'deepseek/deepseek-r1-0528:free',                    // DeepSeek R1 - Best reasoning
    'deepseek/deepseek-chat-v3.1:free',                  // DeepSeek V3.1 - Hybrid reasoning
    'deepseek/deepseek-r1-0528-qwen3-8b:free',           // DeepSeek R1 + Qwen3 8B
    'tngtech/deepseek-r1t2-chimera:free',                // DeepSeek R1T2 Chimera
    'nousresearch/hermes-3-405b-instruct:free',          // Hermes 3 405B - Deep philosophy
    
    // 🔬 RESEARCH MODELS (Agentic search, deep analysis)
    'alibaba/tongyi-deepresearch:free',                  // Tongyi DeepResearch - Agentic search
    
    // 💻 CODE MODELS (Programming humor, agentic coding)
    'kwaipilot/kat-coder-pro-v1:free',                   // KAT Coder Pro - Agentic coding
    'qwen/qwen3-coder:free',                             // Qwen3 Coder 480B
    'mistralai/devstral-small-2505:free',                // Devstral - Agentic
    'moonshotai/kimi-dev-72b:free',                      // Kimi Dev 72B
    
    // ⚡ GOOGLE GEMMA FAMILY (Multi-scale options)
    'google/gemma-3-27b-it:free',                        // Gemma 3 27B - 128K context
    'google/gemma-3-12b-it:free',                        // Gemma 3 12B - 33K context
    'google/gemma-3-4b-it:free',                         // Gemma 3 4B - Compact
    'google/gemma-3n-e4b-it:free',                       // Gemma 3n 4B - Mobile
    'google/gemma-3n-e2b-it:free',                       // Gemma 3n 2B - Ultra-fast
    
    // 🌊 LIQUIDAI EDGE MODELS (Mobile-first reasoning)
    'liquidai/lfm2.5-1.2b-thinking:free',                // LFM2.5 1.2B Thinking - Edge reasoning
    'liquidai/lfm2.5-1.2b-instruct:free',                // LFM2.5 1.2B Instruct - Fast edge
    
    // 🎨 CREATIVE/UNRESTRICTED (Satire, chaos, uncensored)
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free', // Venice Uncensored
    'openai/gpt-oss-120b:free',                          // OpenAI OSS 120B - Creative giant
    'openai/gpt-oss-20b:free',                           // OpenAI OSS 20B - Fast creative
    
    // 📖 STORYTELLING (Narrative masters)
    'z-ai/glm-4.5-air:free',                             // GLM 4.5 Air - Narrative master
    'arcee-ai/trinity-large-preview:free',               // Trinity Large - Creative writing
    'arcee-ai/trinity-mini:free',                        // Trinity Mini - Quick tales
    'moonshotai/kimi-k2:free',                           // Kimi K2 - 256K context
    
    // 🎭 CHARACTER/ROLEPLAY (Personas, voices)
    'meta-llama/llama-3.2-3b-instruct:free',             // Llama 3.2 3B - Multilingual
    'meta-llama/llama-3.3-8b-instruct:free',             // Llama 3.3 8B - Character consistency
    
    // 🔥 ENERGY/DRAMA (Sports, hype)
    'stepfun/step-3.5-flash:free',                       // Step 3.5 Flash - Energetic
    
    // 🔮 VISION/MULTIMODAL (Vision + text)
    'mistralai/mistral-small-3.1-24b-instruct:free',     // Mistral Small 3.1 - Vision + text
    'mistralai/mistral-small-3.2-24b-instruct:free',     // Mistral Small 3.2 - Latest European
    'nvidia/nemotron-nano-12b-v2-vl:free',               // Nemotron Nano 12B VL
    
    // ⚙️ TECH/NUMBERS (Tech satire, dry wit)
    'nvidia/nemotron-nano-9b-v2:free',                   // Nemotron Nano 9B - TechNerd
    
    // 🌐 MULTILINGUAL/EFFICIENT (Quick tasks)
    'qwen/qwen3-4b:free',                                // Qwen3 4B - Tiny giant
    'qwen/qwen3-8b:free',                                // Qwen3 8B - Efficient
    'qwen/qwen3-30b-a3b:free',                           // Qwen3 30B A3B - Balanced
    
    // 🏢 ENTERPRISE/OTHER
    'tencent/hunyuan-a13b-instruct:free',                // Hunyuan A13B - Professional
    'upstage/solar-pro-3:free',                          // Solar Pro 3 - Korean/English/Japanese
    'x-ai/grok-4-fast:free',                             // Grok 4 Fast - xAI humor
    
    // 🎲 SMART ROUTER (Auto-selects best available)
    'openrouter/free',                                   // OpenRouter Free Router
] as const;

// Model display names for logging
export const MODEL_NAMES: Record<string, string> = {
    // Reasoning
    'deepseek/deepseek-r1-0528:free': 'DeepSeek R1',
    'deepseek/deepseek-chat-v3.1:free': 'DeepSeek V3.1',
    'deepseek/deepseek-r1-0528-qwen3-8b:free': 'DeepSeek R1 + Qwen3 8B',
    'tngtech/deepseek-r1t2-chimera:free': 'DeepSeek R1T2 Chimera',
    'nousresearch/hermes-3-405b-instruct:free': 'Hermes 3 405B',
    
    // Research
    'alibaba/tongyi-deepresearch:free': 'Tongyi DeepResearch',
    
    // Code
    'kwaipilot/kat-coder-pro-v1:free': 'KAT Coder Pro',
    'qwen/qwen3-coder:free': 'Qwen3 Coder',
    'mistralai/devstral-small-2505:free': 'Devstral',
    'moonshotai/kimi-dev-72b:free': 'Kimi Dev 72B',
    
    // Google Gemma
    'google/gemma-3-27b-it:free': 'Gemma 3 27B',
    'google/gemma-3-12b-it:free': 'Gemma 3 12B',
    'google/gemma-3-4b-it:free': 'Gemma 3 4B',
    'google/gemma-3n-e4b-it:free': 'Gemma 3n 4B',
    'google/gemma-3n-e2b-it:free': 'Gemma 3n 2B',
    
    // LiquidAI
    'liquidai/lfm2.5-1.2b-thinking:free': 'LFM2.5 1.2B Thinking',
    'liquidai/lfm2.5-1.2b-instruct:free': 'LFM2.5 1.2B Instruct',
    
    // Creative
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free': 'Venice Uncensored',
    'openai/gpt-oss-120b:free': 'OpenAI OSS 120B',
    'openai/gpt-oss-20b:free': 'OpenAI OSS 20B',
    
    // Storytelling
    'z-ai/glm-4.5-air:free': 'GLM 4.5 Air',
    'arcee-ai/trinity-large-preview:free': 'Trinity Large',
    'arcee-ai/trinity-mini:free': 'Trinity Mini',
    'moonshotai/kimi-k2:free': 'Kimi K2',
    
    // Character
    'meta-llama/llama-3.2-3b-instruct:free': 'Llama 3.2 3B',
    'meta-llama/llama-3.3-8b-instruct:free': 'Llama 3.3 8B',
    
    // Energy
    'stepfun/step-3.5-flash:free': 'Step 3.5 Flash',
    
    // Vision
    'mistralai/mistral-small-3.1-24b-instruct:free': 'Mistral Small 3.1',
    'mistralai/mistral-small-3.2-24b-instruct:free': 'Mistral Small 3.2',
    'nvidia/nemotron-nano-12b-v2-vl:free': 'Nemotron Nano 12B VL',
    
    // Tech
    'nvidia/nemotron-nano-9b-v2:free': 'Nemotron Nano 9B',
    
    // Multilingual
    'qwen/qwen3-4b:free': 'Qwen3 4B',
    'qwen/qwen3-8b:free': 'Qwen3 8B',
    'qwen/qwen3-30b-a3b:free': 'Qwen3 30B A3B',
    
    // Enterprise
    'tencent/hunyuan-a13b-instruct:free': 'Hunyuan A13B',
    'upstage/solar-pro-3:free': 'Solar Pro 3',
    'x-ai/grok-4-fast:free': 'Grok 4 Fast',
    
    // Router
    'openrouter/free': 'OpenRouter Free Router',
};

// Model personality descriptions for logging
const MODEL_PERSONALITIES: Record<string, string> = {
    // Reasoning
    'deepseek/deepseek-r1-0528:free': 'DeepThinker - Brutally honest with layered reasoning',
    'deepseek/deepseek-chat-v3.1:free': 'Hybrid Mind - Reasoning + creativity',
    'deepseek/deepseek-r1-0528-qwen3-8b:free': 'Fusion Brain - R1 logic meets Qwen3',
    'tngtech/deepseek-r1t2-chimera:free': 'Chimera - Beastly reasoning power',
    'nousresearch/hermes-3-405b-instruct:free': 'The Philosopher - Deep reasoning, existential wit',
    
    // Research
    'alibaba/tongyi-deepresearch:free': 'The Researcher - Agentic search, deep analysis',
    
    // Code
    'kwaipilot/kat-coder-pro-v1:free': 'The Code Poet - Agentic coding humor',
    'qwen/qwen3-coder:free': 'CodeMachine - 480B MoE coder',
    'mistralai/devstral-small-2505:free': 'Agent - Tool-using specialist',
    'moonshotai/kimi-dev-72b:free': 'Engineer - Software specialist',
    
    // Google Gemma
    'google/gemma-3-27b-it:free': 'The Gemini Elder - Googles best open model (128K)',
    'google/gemma-3-12b-it:free': 'Gemma Mid - Balanced power (33K)',
    'google/gemma-3-4b-it:free': 'Gemma Compact - Efficient (33K)',
    'google/gemma-3n-e4b-it:free': 'Gemma Mobile - Phone-optimized (8K)',
    'google/gemma-3n-e2b-it:free': 'Gemma Tiny - Ultra-fast (8K)',
    
    // LiquidAI
    'liquidai/lfm2.5-1.2b-thinking:free': 'The Edge Thinker - Mobile-first reasoning',
    'liquidai/lfm2.5-1.2b-instruct:free': 'Edge Speed - Fast mobile AI',
    
    // Creative
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free': 'WildCard - Uncensored chaos engine',
    'openai/gpt-oss-120b:free': 'CreativeGiant - Surprising and original',
    'openai/gpt-oss-20b:free': 'Speedy Creative - Fast imagination',
    
    // Storytelling
    'z-ai/glm-4.5-air:free': 'StoryWeaver - Epic narrative flow',
    'arcee-ai/trinity-large-preview:free': 'Novelist - Long-form master',
    'arcee-ai/trinity-mini:free': 'ShortStory - Quick tales',
    'moonshotai/kimi-k2:free': 'ContextKing - 256k context window',
    
    // Character
    'meta-llama/llama-3.2-3b-instruct:free': 'The Polyglot - Multilingual character master',
    'meta-llama/llama-3.3-8b-instruct:free': 'CharacterActor - Stays in role perfectly',
    
    // Energy
    'stepfun/step-3.5-flash:free': 'HypeBeast - Energetic and dramatic',
    
    // Vision
    'mistralai/mistral-small-3.1-24b-instruct:free': 'The Visionary - Sees and satirizes (Vision+Text)',
    'mistralai/mistral-small-3.2-24b-instruct:free': 'European Edge - Latest Mistral',
    'nvidia/nemotron-nano-12b-v2-vl:free': 'Vision Tech - Multimodal satire',
    
    // Tech
    'nvidia/nemotron-nano-9b-v2:free': 'TechNerd - Precise with dry wit',
    
    // Multilingual
    'qwen/qwen3-4b:free': 'TinyGiant - 4B params, big brain',
    'qwen/qwen3-8b:free': 'Efficient - Quick and reliable',
    'qwen/qwen3-30b-a3b:free': 'Balanced - Sweet spot of speed/power',
    
    // Enterprise
    'tencent/hunyuan-a13b-instruct:free': 'Enterprise - Professional tone',
    'upstage/solar-pro-3:free': 'Multilingual - Korean/English/Japanese',
    'x-ai/grok-4-fast:free': 'Rebel - xAI humor and wit',
    
    // Router
    'openrouter/free': 'SmartRouter - Auto-selects best model',
};

// Track rate limited models and their reset times
const rateLimitedModels = new Map<string, number>();
const RATE_LIMIT_COOLDOWN = 3 * 60 * 1000; // 3 minutes cooldown

/**
 * Mark a model as rate limited
 */
function markRateLimited(model: string): void {
    rateLimitedModels.set(model, Date.now() + RATE_LIMIT_COOLDOWN);
    const name = MODEL_NAMES[model] || MODEL_PERSONALITIES[model] || SpecialistPersonalities[model] || model;
    console.log(`[AI] 🔴 ${name} rate limited (3min cooldown)`);
}

/**
 * Check if a model is currently rate limited
 */
function isRateLimited(model: string): boolean {
    const resetTime = rateLimitedModels.get(model);
    if (!resetTime) return false;
    
    if (Date.now() > resetTime) {
        rateLimitedModels.delete(model);
        const name = MODEL_NAMES[model] || MODEL_PERSONALITIES[model] || SpecialistPersonalities[model] || model;
        console.log(`[AI] 🟢 ${name} available again`);
        return false;
    }
    return true;
}

/**
 * Get all available (non-rate-limited) models
 */
function getAvailableModels(): string[] {
    return ALL_FREE_MODELS.filter(m => !isRateLimited(m));
}

/**
 * Get the appropriate AI client
 */
export function getAIClient(): AIClient | null {
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey && openRouterKey !== 'placeholder-key' && openRouterKey.startsWith('sk-or')) {
        return createOpenRouterClient(openRouterKey);
    }
    
    const googleKey = process.env.GOOGLE_API_KEY;
    if (googleKey && googleKey !== 'placeholder-key' && googleKey.startsWith('AI')) {
        return createGoogleClient(googleKey);
    }
    
    console.warn('[AI] No valid API key found. Set OPENROUTER_API_KEY or GOOGLE_API_KEY.');
    return null;
}

/**
 * Create OpenRouter client with SMART model selection
 * Uses specialist models first, then ANY available free model
 */
function createOpenRouterClient(apiKey: string): AIClient {
    const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        defaultHeaders: {
            'HTTP-Referer': process.env.SITE_URL || 'https://realfakenews.netlify.app',
            'X-Title': 'RealFake News',
        },
    });
    
    return {
        async generateContent({ contents, generationConfig }, taskType: TaskType = 'default') {
            // Get specialist models for this task
            const specialist = getSpecialistModel(taskType);
            const specialistModels = [specialist.primary, specialist.backup];
            
            // Build list of models to try in order:
            const modelsToTry: string[] = [];
            
            // 1. Add available specialist models first
            specialistModels.forEach(m => {
                if (!isRateLimited(m)) modelsToTry.push(m);
            });
            
            // 2. Add OpenRouter Free Router (smart auto-selection)
            if (!isRateLimited('openrouter/free')) {
                modelsToTry.push('openrouter/free');
            }
            
            // 3. Add ALL other available models as backups
            ALL_FREE_MODELS.forEach(m => {
                if (!modelsToTry.includes(m) && !isRateLimited(m)) {
                    modelsToTry.push(m);
                }
            });
            
            if (modelsToTry.length === 0) {
                throw new Error('All 40+ free models are rate limited! Try again in 3 minutes.');
            }
            
            // Convert Gemini format to OpenAI format
            const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = contents.map(content => ({
                role: content.role === 'user' ? 'user' : 'assistant',
                content: content.parts.map(part => part.text).join(''),
            }));
            
            // Add JSON mode instruction if needed
            if (generationConfig?.responseMimeType === 'application/json') {
                messages.unshift({ role: 'system', content: 'You must respond with valid JSON only. No markdown, no explanations.' });
            }
            
            // Try each available model
            let lastError: Error | null = null;
            
            for (let i = 0; i < modelsToTry.length; i++) {
                const modelName = modelsToTry[i];
                const displayName = MODEL_NAMES[modelName] || modelName;
                const personality = MODEL_PERSONALITIES[modelName] || SpecialistPersonalities[modelName] || '';
                const isSpecialist = specialistModels.includes(modelName);
                
                if (isSpecialist) {
                    console.log(`[AI] 🎯 ${specialist.specialistName} → ${displayName}${personality ? ` (${personality})` : ''}`);
                } else if (modelName === 'openrouter/free') {
                    console.log(`[AI] 🎲 Using OpenRouter Free Router (smart selection)...`);
                } else {
                    console.log(`[AI] 🔄 Fallback → ${displayName}${personality ? ` (${personality})` : ''}`);
                }
                
                try {
                    const completion = await openai.chat.completions.create({
                        model: modelName,
                        messages: messages as any,
                        temperature: generationConfig?.temperature ?? 0.9,
                        max_tokens: 4000,
                    });
                    
                    const text = completion.choices[0]?.message?.content || '';
                    
                    if (!text) {
                        throw new Error('Empty response from model');
                    }
                    
                    console.log(`[AI] ✅ ${displayName} delivered!`);
                    
                    return {
                        response: {
                            text: () => text,
                        },
                    };
                    
                } catch (error: any) {
                    lastError = error;
                    console.warn(`[AI] ⚠️ ${displayName} failed:`, error.message);
                    
                    // Check if it's a rate limit error
                    if (error.status === 429 || 
                        error.message?.includes('rate limit') ||
                        error.message?.includes('Rate limit') ||
                        error.message?.includes('exceeded') ||
                        error.message?.includes('Too Many Requests')) {
                        markRateLimited(modelName);
                        continue; // Try next model
                    }
                    
                    // Auth error - stop immediately
                    if (error.status === 401 || error.message?.includes('Invalid API key')) {
                        throw error;
                    }
                    
                    // For other errors, try next model
                    continue;
                }
            }
            
            // All attempts failed
            throw lastError || new Error('All AI specialists exhausted');
        },
    };
}

/**
 * Create Google AI client (fallback)
 */
function createGoogleClient(apiKey: string): AIClient {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.GOOGLE_MODEL || 'gemini-2.0-flash';
    const model = genAI.getGenerativeModel({ model: modelName });
    
    return {
        async generateContent({ contents, generationConfig }) {
            console.log(`[AI] Using Google ${modelName} (fallback mode)`);
            const result = await model.generateContent({
                contents,
                generationConfig: {
                    temperature: generationConfig?.temperature,
                    responseMimeType: generationConfig?.responseMimeType,
                },
            });
            return result;
        },
    };
}

/**
 * Generate content with specialist routing
 */
export async function generateWithSpecialist(
    client: AIClient,
    taskType: TaskType,
    prompt: string,
    options: { 
        temperature?: number; 
        jsonMode?: boolean;
        systemPrompt?: string;
    } = {}
): Promise<string> {
    const contents = [
        ...(options.systemPrompt ? [{ role: 'user' as const, parts: [{ text: options.systemPrompt }] }] : []),
        { role: 'user', parts: [{ text: prompt }] }
    ];
    
    const result = await client.generateContent({
        contents,
        generationConfig: {
            temperature: options.temperature ?? 0.9,
            responseMimeType: options.jsonMode ? 'application/json' : undefined,
        }
    }, taskType);
    
    return result.response.text();
}

/**
 * Legacy compatibility
 * @deprecated Use getAIClient() with taskType parameter
 */
export function getGeminiModel(apiKey: string | undefined): GenerativeModel | null {
    if (!apiKey || apiKey === 'placeholder-key') {
        return null;
    }
    
    if (!apiKey.startsWith('AI')) {
        console.warn('[AI] Invalid Google API key format');
        return null;
    }
    
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    } catch (error) {
        console.error('[AI] Failed to initialize Gemini:', error);
        return null;
    }
}

/**
 * Check which AI provider is active
 */
export function getActiveProvider(): AIProvider | null {
    if (process.env.OPENROUTER_API_KEY && !process.env.OPENROUTER_API_KEY.includes('placeholder')) {
        return 'openrouter';
    }
    if (process.env.GOOGLE_API_KEY && !process.env.GOOGLE_API_KEY.includes('placeholder')) {
        return 'google';
    }
    return null;
}

/**
 * Get info about the current AI setup
 */
export function getAIInfo(): { 
    provider: AIProvider | null; 
    specialists: string[];
    free: boolean;
    availableModels: number;
    rateLimitedModels: number;
    totalModels: number;
} {
    const provider = getActiveProvider();
    
    // Count available vs rate limited
    const now = Date.now();
    let rateLimitedCount = 0;
    for (const resetTime of Array.from(rateLimitedModels.values())) {
        if (now < resetTime) rateLimitedCount++;
    }
    
    const specialists = [
        'The Roaster → DeepSeek R1',
        'The Philosopher → Hermes 3 405B',
        'The Headline Hunter → Gemma 3 27B',
        'The Gemini Elder → Gemma 3 27B',
        'The Storyteller → GLM 4.5 Air',
        'The Conspiracy Theorist → Venice Uncensored',
        'The Sports Hype Man → Step 3.5 Flash',
        'The Tech Bro → Nemotron Nano 9B',
        'The Code Poet → KAT Coder Pro',
        'The Researcher → Tongyi DeepResearch',
        'The Visionary → Mistral Small 3.1',
        'The Polyglot → Llama 3.2 3B',
        'The Edge Thinker → LFM2.5 Thinking',
        'The Odds Maker → Nemotron Nano 9B',
        'The Breaking News Anchor → Gemma 3 27B',
        'The Method Actor → Llama 3.3 8B',
    ];
    
    if (provider === 'openrouter') {
        return {
            provider: 'openrouter',
            specialists,
            free: true,
            availableModels: ALL_FREE_MODELS.length - rateLimitedCount,
            rateLimitedModels: rateLimitedCount,
            totalModels: ALL_FREE_MODELS.length,
        };
    }
    
    if (provider === 'google') {
        return {
            provider: 'google',
            specialists: ['General Purpose'],
            free: false,
            availableModels: 1,
            rateLimitedModels: 0,
            totalModels: 1,
        };
    }
    
    return { 
        provider: null, 
        specialists: [],
        free: false,
        availableModels: 0,
        rateLimitedModels: rateLimitedCount,
        totalModels: ALL_FREE_MODELS.length,
    };
}

/**
 * Get a list of all free models with their display names
 */
export function getFreeModelsList(): Array<{ id: string; name: string; personality: string }> {
    return ALL_FREE_MODELS.map(id => ({
        id,
        name: MODEL_NAMES[id] || id,
        personality: MODEL_PERSONALITIES[id] || SpecialistPersonalities[id] || '',
    }));
}

// Re-export specialist types for convenience
export { TaskType, getTaskTypeForFunction };
