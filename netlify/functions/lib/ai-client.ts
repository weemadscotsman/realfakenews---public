import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import OpenAI from 'openai';
import { 
    TaskType, 
    getSpecialistModel, 
    getTaskTypeForFunction,
    MODEL_PERSONALITIES 
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
// ALL FREE MODELS - The Dream Team
// ============================================
export const ALL_FREE_MODELS = [
    'google/gemini-2.0-flash-exp:free',                           // Speed/reliability
    'z-ai/glm-4.5-air:free',                                      // Storytelling
    'stepfun/step-3.5-flash:free',                                // Energy/drama
    'deepseek/deepseek-r1-0528:free',                             // Reasoning/roasts
    'openai/gpt-oss-120b:free',                                   // Creativity
    'nvidia/nemotron-nano-12b-v2-vl:free',                        // Tech/numbers
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free', // Chaos/uncensored
    'meta-llama/llama-3.2-3b-instruct:free',                      // Character voices
    'qwen/qwen-2.5-7b-instruct:free',                             // Fast backup
    'google/gemini-2.0-flash-thinking-exp-01-21:free',            // Analysis
] as const;

// Model display names
export const MODEL_NAMES: Record<string, string> = {
    'google/gemini-2.0-flash-exp:free': 'Gemini 2.0 Flash',
    'z-ai/glm-4.5-air:free': 'GLM 4.5 Air',
    'stepfun/step-3.5-flash:free': 'Step 3.5 Flash',
    'deepseek/deepseek-r1-0528:free': 'DeepSeek R1',
    'openai/gpt-oss-120b:free': 'GPT-OSS 120B',
    'nvidia/nemotron-nano-12b-v2-vl:free': 'Nemotron Nano',
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free': 'Dolphin Mistral',
    'meta-llama/llama-3.2-3b-instruct:free': 'Llama 3.2 3B',
    'qwen/qwen-2.5-7b-instruct:free': 'Qwen 2.5 7B',
    'google/gemini-2.0-flash-thinking-exp-01-21:free': 'Gemini Flash Thinking',
};

// Track rate limited models and their reset times
const rateLimitedModels = new Map<string, number>();
const RATE_LIMIT_COOLDOWN = 3 * 60 * 1000; // 3 minutes cooldown

/**
 * Mark a model as rate limited
 */
function markRateLimited(model: string): void {
    rateLimitedModels.set(model, Date.now() + RATE_LIMIT_COOLDOWN);
    const name = MODEL_NAMES[model] || MODEL_PERSONALITIES[model] || model;
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
        const name = MODEL_NAMES[model] || MODEL_PERSONALITIES[model] || model;
        console.log(`[AI] 🟢 ${name} available again`);
        return false;
    }
    return true;
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
 * Create OpenRouter client with SPECIALIST MODEL routing
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
            const modelsToTry = [specialist.primary, specialist.backup];
            
            // Filter out rate-limited models
            const availableModels = modelsToTry.filter(m => !isRateLimited(m));
            
            // If both specialists are rate limited, try any available model
            if (availableModels.length === 0) {
                console.log(`[AI] Both ${specialist.specialistName} models rate limited, finding backup...`);
                for (const model of ALL_FREE_MODELS) {
                    if (!isRateLimited(model)) {
                        availableModels.push(model);
                        break;
                    }
                }
            }
            
            // Convert Gemini format to OpenAI format
            const messages = contents.map(content => ({
                role: content.role === 'user' ? 'user' : 'assistant' as const,
                content: content.parts.map(part => part.text).join(''),
            }));
            
            // Add JSON mode instruction if needed
            let systemMessage = '';
            if (generationConfig?.responseMimeType === 'application/json') {
                systemMessage = 'You must respond with valid JSON only. No markdown, no explanations.';
            }
            
            const finalMessages = systemMessage 
                ? [{ role: 'system' as const, content: systemMessage }, ...messages]
                : messages;
            
            // Try each available model
            let lastError: Error | null = null;
            
            for (let i = 0; i < availableModels.length; i++) {
                const modelName = availableModels[i];
                const displayName = MODEL_NAMES[modelName] || modelName;
                const personality = MODEL_PERSONALITIES[modelName] || 'Unknown';
                
                console.log(`[AI] 🤖 ${specialist.specialistName} deploying ${displayName} (${personality})...`);
                
                try {
                    const completion = await openai.chat.completions.create({
                        model: modelName,
                        messages: finalMessages,
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
 * Use this in your Netlify functions!
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
} {
    const provider = getActiveProvider();
    
    // Count available vs rate limited
    const now = Date.now();
    let rateLimitedCount = 0;
    for (const resetTime of rateLimitedModels.values()) {
        if (now < resetTime) rateLimitedCount++;
    }
    
    const specialists = [
        'The Roaster (roast battles)',
        'The Headline Hunter (clickbait)',
        'The Storyteller (articles)',
        'The Conspiracy Theorist (wild theories)',
        'The Sports Hype Man (sports drama)',
        'The Tech Bro (tech satire)',
        'The Odds Maker (fake betting)',
        'The Breaking News Anchor (urgent alerts)',
        'The Method Actor (character voices)',
    ];
    
    if (provider === 'openrouter') {
        return {
            provider: 'openrouter',
            specialists,
            free: true,
            availableModels: ALL_FREE_MODELS.length - rateLimitedCount,
            rateLimitedModels: rateLimitedCount,
        };
    }
    
    if (provider === 'google') {
        return {
            provider: 'google',
            specialists: ['General Purpose'],
            free: false,
            availableModels: 1,
            rateLimitedModels: 0,
        };
    }
    
    return { 
        provider: null, 
        specialists: [],
        free: false,
        availableModels: 0,
        rateLimitedModels: 0,
    };
}

// Re-export specialist types for convenience
export { TaskType, getTaskTypeForFunction };
