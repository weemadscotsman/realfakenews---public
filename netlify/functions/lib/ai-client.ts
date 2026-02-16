import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import OpenAI from 'openai';

export type AIProvider = 'google' | 'openrouter';

interface AIClient {
    generateContent: (options: {
        contents: Array<{ role: string; parts: Array<{ text: string }> }>;
        generationConfig?: {
            temperature?: number;
            responseMimeType?: string;
        };
    }) => Promise<{ response: { text: () => string } }>;
}

// ============================================
// FREE MODELS ONLY - No token costs!
// ============================================
// These models rotate automatically when rate limits are hit
export const FREE_MODELS = [
    // Primary - Gemini 2.0 Flash (fast, good quality)
    'google/gemini-2.0-flash-exp:free',
    
    // Fallbacks - all free tier models
    'z-ai/glm-4.5-air:free',
    'stepfun/step-3.5-flash:free',
    'deepseek/deepseek-r1-0528:free',
    'openai/gpt-oss-120b:free',
    'nvidia/nemotron-nano-12b-v2-vl:free',
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
    
    // Additional free backups
    'meta-llama/llama-3.2-3b-instruct:free',
    'qwen/qwen-2.5-7b-instruct:free',
    'google/gemini-2.0-flash-thinking-exp-01-21:free',
] as const;

// Model display names for logging
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

// Track which models are rate limited and when they reset
const rateLimitedModels = new Map<string, number>();
const RATE_LIMIT_COOLDOWN = 5 * 60 * 1000; // 5 minutes cooldown

// Track current model index for rotation
let currentModelIndex = 0;

/**
 * Get the next available model (skips rate-limited ones)
 */
function getNextAvailableModel(): string {
    const now = Date.now();
    
    // Clean up expired rate limits
    for (const [model, resetTime] of rateLimitedModels.entries()) {
        if (now > resetTime) {
            rateLimitedModels.delete(model);
            console.log(`[AI] Model ${MODEL_NAMES[model] || model} cooled down, available again`);
        }
    }
    
    // Find next available model
    for (let i = 0; i < FREE_MODELS.length; i++) {
        const idx = (currentModelIndex + i) % FREE_MODELS.length;
        const model = FREE_MODELS[idx];
        
        if (!rateLimitedModels.has(model)) {
            currentModelIndex = (idx + 1) % FREE_MODELS.length; // Round-robin
            return model;
        }
    }
    
    // All models rate limited - force use primary anyway
    console.warn('[AI] All models rate limited! Forcing primary...');
    return FREE_MODELS[0];
}

/**
 * Mark a model as rate limited
 */
function markRateLimited(model: string): void {
    rateLimitedModels.set(model, Date.now() + RATE_LIMIT_COOLDOWN);
    console.log(`[AI] Model ${MODEL_NAMES[model] || model} rate limited for 5 minutes`);
}

/**
 * Get the appropriate AI client based on available API keys
 * Priority: OpenRouter (free tier) > Google AI
 */
export function getAIClient(): AIClient | null {
    // Try OpenRouter first (free tier available)
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey && openRouterKey !== 'placeholder-key' && openRouterKey.startsWith('sk-or')) {
        return createOpenRouterClient(openRouterKey);
    }
    
    // Fall back to Google AI
    const googleKey = process.env.GOOGLE_API_KEY;
    if (googleKey && googleKey !== 'placeholder-key' && googleKey.startsWith('AI')) {
        return createGoogleClient(googleKey);
    }
    
    console.warn('[AI] No valid API key found. Set OPENROUTER_API_KEY or GOOGLE_API_KEY.');
    return null;
}

/**
 * Create OpenRouter client with automatic model rotation
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
        async generateContent({ contents, generationConfig }) {
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
            
            // Try models until one works
            let lastError: Error | null = null;
            const maxAttempts = Math.min(3, FREE_MODELS.length); // Try up to 3 models
            
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                const modelName = getNextAvailableModel();
                const displayName = MODEL_NAMES[modelName] || modelName;
                
                console.log(`[AI] Attempt ${attempt + 1}/${maxAttempts} using ${displayName}...`);
                
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
                    
                    console.log(`[AI] Success with ${displayName}!`);
                    
                    return {
                        response: {
                            text: () => text,
                        },
                    };
                    
                } catch (error: any) {
                    lastError = error;
                    console.warn(`[AI] ${displayName} failed:`, error.message);
                    
                    // Check if it's a rate limit error
                    if (error.status === 429 || 
                        error.message?.includes('rate limit') ||
                        error.message?.includes('Rate limit') ||
                        error.message?.includes('exceeded')) {
                        markRateLimited(modelName);
                        continue; // Try next model
                    }
                    
                    // For other errors, also try next model unless it's auth
                    if (error.status === 401 || error.message?.includes('Invalid API key')) {
                        throw error; // Auth error - stop immediately
                    }
                    
                    // Continue to next model for other errors
                    continue;
                }
            }
            
            // All attempts failed
            throw lastError || new Error('All free models exhausted or rate limited');
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
 * Legacy compatibility - returns the model for Google AI
 * @deprecated Use getAIClient() instead
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
    model: string; 
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
    
    if (provider === 'openrouter') {
        return {
            provider: 'openrouter',
            model: 'multi-model-rotation',
            free: true,
            availableModels: FREE_MODELS.length - rateLimitedCount,
            rateLimitedModels: rateLimitedCount,
        };
    }
    
    if (provider === 'google') {
        return {
            provider: 'google',
            model: process.env.GOOGLE_MODEL || 'gemini-2.0-flash',
            free: false,
            availableModels: 1,
            rateLimitedModels: 0,
        };
    }
    
    return { 
        provider: null, 
        model: 'none', 
        free: false,
        availableModels: 0,
        rateLimitedModels: 0,
    };
}

/**
 * Get list of all free models for debugging
 */
export function getFreeModelsList(): string[] {
    return [...FREE_MODELS];
}
