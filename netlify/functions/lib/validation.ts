import { z } from 'zod';

/**
 * Validation schemas for Netlify Functions
 */

// Category must be one of the allowed values
const CategoryEnum = z.enum(['politics', 'tech', 'science', 'entertainment', 'sports', 'conspiracy']);

// Fetch live news query parameters
export const FetchNewsSchema = z.object({
    category: CategoryEnum.optional().default('politics'),
    satire: z.enum(['true', 'false']).optional().default('false'),
    mode: z.enum(['raw', 'satire', 'ai']).optional().default('satire'),
});

// Generate article query parameters
export const GenerateArticleSchema = z.object({
    headline: z.string()
        .min(1, 'Headline is required')
        .max(200, 'Headline too long (max 200 characters)')
        .transform(val => val.trim()),
});

// Vote quest parameters
export const VoteQuestSchema = z.object({
    questId: z.string().min(1, 'Quest ID is required'),
    choice: z.enum(['A', 'B', 'C', 'D']),
    userId: z.string().uuid('Invalid user ID').optional(),
});

// Log telemetry parameters
export const LogTelemetrySchema = z.object({
    event: z.string().min(1).max(100),
    data: z.record(z.unknown()).optional(),
    userId: z.string().uuid().optional(),
});

// Helper function to validate and parse query parameters
export function validateQuery<T extends z.ZodTypeAny>(
    schema: T,
    params: Record<string, string | undefined>
): { success: true; data: z.infer<T> } | { success: false; error: string } {
    const result = schema.safeParse(params);
    
    if (!result.success) {
        const errorMessage = result.error.errors
            .map(err => `${err.path.join('.')}: ${err.message}`)
            .join(', ');
        return { success: false, error: errorMessage };
    }
    
    return { success: true, data: result.data };
}

// Helper function to validate JSON body
export function validateBody<T extends z.ZodTypeAny>(
    schema: T,
    body: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
    const result = schema.safeParse(body);
    
    if (!result.success) {
        const errorMessage = result.error.errors
            .map(err => `${err.path.join('.')}: ${err.message}`)
            .join(', ');
        return { success: false, error: errorMessage };
    }
    
    return { success: true, data: result.data };
}
