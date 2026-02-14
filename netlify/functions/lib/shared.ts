import { GoogleGenerativeAI } from '@google/generative-ai';

export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

/**
 * Standardized response for Netlify functions.
 */
export const formatResponse = (statusCode: number, body: any) => ({
    statusCode,
    headers,
    body: JSON.stringify(body),
});

/**
 * Standardized error response.
 */
export const formatError = (statusCode: number, message: string, details?: any) =>
    formatResponse(statusCode, { error: message, details: details ? String(details) : undefined });

/**
 * Initializes Gemini if the API key is present.
 */
export const getGeminiModel = (apiKey: string | undefined) => {
    if (!apiKey) return null;
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
};
