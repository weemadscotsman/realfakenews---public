/**
 * Shared utilities for Netlify functions
 */

// Re-export everything from ai-client
export {
    getAIClient,
    getGeminiModel,
    getActiveProvider,
    getAIInfo,
    getFreeModelsList,
    MODEL_NAMES,
    ALL_FREE_MODELS,
    type AIProvider,
    type TaskType,
    getTaskTypeForFunction,
    generateWithSpecialist,
} from './ai-client';

// Re-export specialist models
export {
    SPECIALIST_MODELS,
    MODEL_PERSONALITIES,
    getSpecialistModel,
} from './ai-specialists';

export const headers = {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
};

export const formatResponse = (statusCode: number, body: any) => ({
    statusCode,
    headers,
    body: JSON.stringify(body),
});

export const formatError = (statusCode: number, message: string, details?: any) =>
    formatResponse(statusCode, { error: message, details: details ? String(details) : undefined });

/**
 * Safe JSON parser with fallback
 */
export function safeJsonParse<T>(text: string, fallback: T): T {
    try {
        return JSON.parse(text) as T;
    } catch {
        return fallback;
    }
}

/**
 * Sanitize text to prevent prompt injection
 */
export function sanitizePrompt(text: string): string {
    return text
        .replace(/[<>]/g, '')
        .slice(0, 5000);
}

/**
 * Retry a function with exponential backoff
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            
            if (error instanceof Error && 
                (error.message.includes('Invalid API key') || 
                 error.message.includes('PERMISSION_DENIED') ||
                 error.message.includes('401'))) {
                throw error;
            }
            
            const delay = baseDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError || new Error('Max retries exceeded');
}
