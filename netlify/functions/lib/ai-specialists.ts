/**
 * AI Specialist Models - Different free models for different tasks
 * Each model is hand-picked for its strengths
 */

export type TaskType = 
    | 'roast'           // Roast battles - needs sass, wit, brutal honesty
    | 'headline'        // News headlines - needs punchy, clickbait style
    | 'article'         // Full articles - needs coherent storytelling
    | 'conspiracy'      // Conspiracy theories - needs unhinged creativity
    | 'sports'          // Sports commentary - needs hype and drama
    | 'tech'            // Tech satire - needs jargon and snark
    | 'bet'             // Fake betting odds - needs numbers and absurdity
    | 'breaking'        // Breaking news alerts - urgency and sensationalism
    | 'personality'     // Character voices (appliances, etc) - distinct personas
    | 'default';        // Fallback for general tasks

/**
 * Specialist model assignments - each task type has a primary and backup model
 * All models are FREE tier from OpenRouter
 */
export const SPECIALIST_MODELS: Record<TaskType, { primary: string; backup: string; name: string }> = {
    roast: {
        // DeepSeek R1 - excellent reasoning for brutal roasts with layers
        primary: 'deepseek/deepseek-r1-0528:free',
        // Dolphin Mistral - uncensored, great for edgy humor
        backup: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        name: 'The Roaster'
    },
    headline: {
        // Gemini Flash - fast, good at punchy concise text
        primary: 'google/gemini-2.0-flash-exp:free',
        // GPT-OSS - creative and surprising
        backup: 'openai/gpt-oss-120b:free',
        name: 'The Headline Hunter'
    },
    article: {
        // GLM 4.5 Air - great at long-form coherent writing
        primary: 'z-ai/glm-4.5-air:free',
        // Gemini Flash Thinking - good reasoning for story structure
        backup: 'google/gemini-2.0-flash-thinking-exp-01-21:free',
        name: 'The Storyteller'
    },
    conspiracy: {
        // Dolphin Mistral - uncensored wild creativity
        primary: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        // DeepSeek R1 - reasoning for layered conspiracy connections
        backup: 'deepseek/deepseek-r1-0528:free',
        name: 'The Conspiracy Theorist'
    },
    sports: {
        // StepFun - energetic and hype
        primary: 'stepfun/step-3.5-flash:free',
        // GLM 4.5 - good at dramatic narrative
        backup: 'z-ai/glm-4.5-air:free',
        name: 'The Sports Hype Man'
    },
    tech: {
        // GPT-OSS - knows tech jargon and startup culture
        primary: 'openai/gpt-oss-120b:free',
        // Nemotron - good at technical explanations mixed with snark
        backup: 'nvidia/nemotron-nano-12b-v2-vl:free',
        name: 'The Tech Bro'
    },
    bet: {
        // Nemotron - good with numbers and probabilities
        primary: 'nvidia/nemotron-nano-12b-v2-vl:free',
        // StepFun - creative absurdity
        backup: 'stepfun/step-3.5-flash:free',
        name: 'The Odds Maker'
    },
    breaking: {
        // Gemini Flash - speed is key for breaking news
        primary: 'google/gemini-2.0-flash-exp:free',
        // Qwen - fast and responsive
        backup: 'qwen/qwen-2.5-7b-instruct:free',
        name: 'The Breaking News Anchor'
    },
    personality: {
        // Llama 3.2 - great at maintaining character voice
        primary: 'meta-llama/llama-3.2-3b-instruct:free',
        // Dolphin Mistral - distinct personas
        backup: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        name: 'The Method Actor'
    },
    default: {
        // Gemini Flash - reliable all-rounder
        primary: 'google/gemini-2.0-flash-exp:free',
        // GLM 4.5 - solid backup
        backup: 'z-ai/glm-4.5-air:free',
        name: 'The Generalist'
    }
};

/**
 * Model personality descriptions for logging
 */
export const MODEL_PERSONALITIES: Record<string, string> = {
    'deepseek/deepseek-r1-0528:free': 'DeepThinker - Brutally honest with layered reasoning',
    'cognitivecomputations/dolphin-mistral-24b-venice-edition:free': 'WildCard - Uncensored chaos engine',
    'google/gemini-2.0-flash-exp:free': 'SpeedDemon - Fast and punchy',
    'openai/gpt-oss-120b:free': 'CreativeGiant - Surprising and original',
    'z-ai/glm-4.5-air:free': 'StoryWeaver - Epic narrative flow',
    'google/gemini-2.0-flash-thinking-exp-01-21:free': 'Analyst - Structured and logical',
    'stepfun/step-3.5-flash:free': 'HypeBeast - Energetic and dramatic',
    'nvidia/nemotron-nano-12b-v2-vl:free': 'TechNerd - Precise with dry wit',
    'meta-llama/llama-3.2-3b-instruct:free': 'CharacterActor - Stays in role perfectly',
    'qwen/qwen-2.5-7b-instruct:free': 'Efficient - Quick and reliable',
};

/**
 * Get the appropriate model for a task type
 */
export function getSpecialistModel(taskType: TaskType): { 
    primary: string; 
    backup: string; 
    specialistName: string;
    primaryPersonality: string;
    backupPersonality: string;
} {
    const specialist = SPECIALIST_MODELS[taskType] || SPECIALIST_MODELS.default;
    
    return {
        primary: specialist.primary,
        backup: specialist.backup,
        specialistName: specialist.name,
        primaryPersonality: MODEL_PERSONALITIES[specialist.primary] || 'Unknown',
        backupPersonality: MODEL_PERSONALITIES[specialist.backup] || 'Unknown',
    };
}

/**
 * Map function names to task types
 */
export function getTaskTypeForFunction(functionName: string): TaskType {
    const mapping: Record<string, TaskType> = {
        'roast-user': 'roast',
        'generate-roast': 'roast',
        'generate-headlines': 'headline',
        'generate-article': 'article',
        'generate-conspiracy': 'conspiracy',
        'generate-sports': 'sports',
        'generate-tech': 'tech',
        'generate-bet': 'bet',
        'generate-breaking': 'breaking',
        'generate-personality': 'personality',
        'appliance-grievance': 'personality',
        'detective-dory': 'personality',
        'parody-news': 'headline',
    };
    
    return mapping[functionName] || 'default';
}

/**
 * Get a rotating model for load balancing
 * Returns different models based on timestamp to distribute load
 */
export function getLoadBalancedModel(taskType: TaskType): string {
    const specialist = SPECIALIST_MODELS[taskType] || SPECIALIST_MODELS.default;
    const hour = new Date().getHours();
    
    // Alternate between primary and backup based on hour
    // This spreads rate limits across time
    return hour % 2 === 0 ? specialist.primary : specialist.backup;
}
