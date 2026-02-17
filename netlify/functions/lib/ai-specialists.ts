/**
 * AI Specialist Models - 40+ free models for different tasks
 * Each model is hand-picked for its strengths from OpenRouter's free tier
 * 
 * Full list: https://openrouter.ai/collections/free-models
 */

export type TaskType = 
    | 'roast'           // Roast battles - brutal honesty
    | 'philosophy'      // Deep reasoning, existential questions
    | 'headline'        // News headlines - punchy, clickbait
    | 'article'         // Full articles - coherent storytelling
    | 'conspiracy'      // Conspiracy theories - unhinged creativity
    | 'sports'          // Sports commentary - hype and drama
    | 'tech'            // Tech satire - jargon and snark
    | 'code'            // Programming humor
    | 'research'        // Deep analysis, agentic search
    | 'vision'          // Multimodal - vision + text
    | 'bet'             // Fake betting odds
    | 'breaking'        // Breaking news alerts
    | 'personality'     // Character voices
    | 'multilingual'    // Multi-language content
    | 'edge'            // Mobile/edge optimized
    | 'default';        // Fallback

/**
 * Specialist model assignments - 16 AI specialists
 * All models are FREE tier from OpenRouter (40+ models available)
 */
export const SPECIALIST_MODELS: Record<TaskType, { primary: string; backup: string; name: string }> = {
    roast: {
        primary: 'deepseek/deepseek-r1-0528:free',
        backup: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        name: 'The Roaster'
    },
    philosophy: {
        primary: 'nousresearch/hermes-3-405b-instruct:free',
        backup: 'deepseek/deepseek-r1-0528:free',
        name: 'The Philosopher'
    },
    headline: {
        primary: 'google/gemma-3-27b-it:free',
        backup: 'openai/gpt-oss-120b:free',
        name: 'The Headline Hunter'
    },
    article: {
        primary: 'z-ai/glm-4.5-air:free',
        backup: 'arcee-ai/trinity-large-preview:free',
        name: 'The Storyteller'
    },
    conspiracy: {
        primary: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        backup: 'deepseek/deepseek-r1-0528:free',
        name: 'The Conspiracy Theorist'
    },
    sports: {
        primary: 'stepfun/step-3.5-flash:free',
        backup: 'z-ai/glm-4.5-air:free',
        name: 'The Sports Hype Man'
    },
    tech: {
        primary: 'nvidia/nemotron-nano-9b-v2:free',
        backup: 'openai/gpt-oss-120b:free',
        name: 'The Tech Bro'
    },
    code: {
        primary: 'kwaipilot/kat-coder-pro-v1:free',
        backup: 'qwen/qwen3-coder:free',
        name: 'The Code Poet'
    },
    research: {
        primary: 'alibaba/tongyi-deepresearch:free',
        backup: 'deepseek/deepseek-r1-0528:free',
        name: 'The Researcher'
    },
    vision: {
        primary: 'mistralai/mistral-small-3.1-24b-instruct:free',
        backup: 'nvidia/nemotron-nano-12b-v2-vl:free',
        name: 'The Visionary'
    },
    bet: {
        primary: 'nvidia/nemotron-nano-9b-v2:free',
        backup: 'stepfun/step-3.5-flash:free',
        name: 'The Odds Maker'
    },
    breaking: {
        primary: 'google/gemma-3-27b-it:free',
        backup: 'qwen/qwen3-8b:free',
        name: 'The Breaking News Anchor'
    },
    personality: {
        primary: 'meta-llama/llama-3.3-8b-instruct:free',
        backup: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
        name: 'The Method Actor'
    },
    multilingual: {
        primary: 'meta-llama/llama-3.2-3b-instruct:free',
        backup: 'upstage/solar-pro-3:free',
        name: 'The Polyglot'
    },
    edge: {
        primary: 'liquidai/lfm2.5-1.2b-thinking:free',
        backup: 'google/gemma-3n-e2b-it:free',
        name: 'The Edge Thinker'
    },
    default: {
        primary: 'openrouter/free',
        backup: 'google/gemma-3-27b-it:free',
        name: 'The Generalist'
    }
};

/**
 * Model personality descriptions for logging
 */
export const MODEL_PERSONALITIES: Record<string, string> = {
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
    'moonshotai/kimi-k2:free': 'ContextKing - 256k context',
    
    // Character/Multilingual
    'meta-llama/llama-3.2-3b-instruct:free': 'The Polyglot - Multilingual character master',
    'meta-llama/llama-3.3-8b-instruct:free': 'CharacterActor - Stays in role perfectly',
    
    // Energy
    'stepfun/step-3.5-flash:free': 'HypeBeast - Energetic and dramatic',
    
    // Vision
    'mistralai/mistral-small-3.1-24b-instruct:free': 'The Visionary - Sees and satirizes',
    'mistralai/mistral-small-3.2-24b-instruct:free': 'European Edge - Latest Mistral',
    'nvidia/nemotron-nano-12b-v2-vl:free': 'Vision Tech - Multimodal satire',
    
    // Tech
    'nvidia/nemotron-nano-9b-v2:free': 'TechNerd - Precise with dry wit',
    
    // Multilingual
    'qwen/qwen3-4b:free': 'TinyGiant - 4B params, big brain',
    'qwen/qwen3-8b:free': 'Efficient - Quick and reliable',
    'qwen/qwen3-30b-a3b:free': 'Balanced - Sweet spot',
    
    // Enterprise
    'tencent/hunyuan-a13b-instruct:free': 'Enterprise - Professional tone',
    'upstage/solar-pro-3:free': 'Multilingual - Korean/English/Japanese',
    'x-ai/grok-4-fast:free': 'Rebel - xAI humor and wit',
    
    // Router
    'openrouter/free': 'SmartRouter - Auto-selects best model',
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
        'generate-code': 'code',
        'generate-bet': 'bet',
        'generate-breaking': 'breaking',
        'generate-personality': 'personality',
        'generate-philosophy': 'philosophy',
        'generate-research': 'research',
        'generate-vision': 'vision',
        'generate-multilingual': 'multilingual',
        'generate-edge': 'edge',
        'appliance-grievance': 'personality',
        'detective-dory': 'personality',
        'parody-news': 'headline',
    };
    
    return mapping[functionName] || 'default';
}

/**
 * Get a rotating model for load balancing
 */
export function getLoadBalancedModel(taskType: TaskType): string {
    const specialist = SPECIALIST_MODELS[taskType] || SPECIALIST_MODELS.default;
    const hour = new Date().getHours();
    
    // Alternate between primary and backup based on hour
    return hour % 2 === 0 ? specialist.primary : specialist.backup;
}

/**
 * Get all AI specialists for display
 */
export function getAllSpecialists(): Array<{ 
    name: string; 
    taskType: TaskType; 
    description: string;
    primary: string;
    backup: string;
}> {
    return [
        { name: 'The Roaster', taskType: 'roast', description: 'Brutal honesty with layered reasoning', primary: 'DeepSeek R1', backup: 'Venice Uncensored' },
        { name: 'The Philosopher', taskType: 'philosophy', description: 'Deep reasoning, existential wit', primary: 'Hermes 3 405B', backup: 'DeepSeek R1' },
        { name: 'The Headline Hunter', taskType: 'headline', description: 'Punchy clickbait generator', primary: 'Gemma 3 27B', backup: 'OpenAI OSS 120B' },
        { name: 'The Gemini Elder', taskType: 'headline', description: 'Googles best open model', primary: 'Gemma 3 27B', backup: 'Gemma 3 12B' },
        { name: 'The Storyteller', taskType: 'article', description: 'Epic satirical narratives', primary: 'GLM 4.5 Air', backup: 'Trinity Large' },
        { name: 'The Conspiracy Theorist', taskType: 'conspiracy', description: 'Unhinged creative theories', primary: 'Venice Uncensored', backup: 'DeepSeek R1' },
        { name: 'The Sports Hype Man', taskType: 'sports', description: 'Maximum energy and drama', primary: 'Step 3.5 Flash', backup: 'GLM 4.5 Air' },
        { name: 'The Tech Bro', taskType: 'tech', description: 'Jargon-heavy snark', primary: 'Nemotron Nano 9B', backup: 'OpenAI OSS 120B' },
        { name: 'The Code Poet', taskType: 'code', description: 'Programming humor', primary: 'KAT Coder Pro', backup: 'Qwen3 Coder' },
        { name: 'The Researcher', taskType: 'research', description: 'Agentic search, deep analysis', primary: 'Tongyi DeepResearch', backup: 'DeepSeek R1' },
        { name: 'The Visionary', taskType: 'vision', description: 'Vision + text satire', primary: 'Mistral Small 3.1', backup: 'Nemotron Nano 12B VL' },
        { name: 'The Polyglot', taskType: 'multilingual', description: 'Multilingual mastery', primary: 'Llama 3.2 3B', backup: 'Solar Pro 3' },
        { name: 'The Edge Thinker', taskType: 'edge', description: 'Mobile-first reasoning', primary: 'LFM2.5 1.2B Thinking', backup: 'Gemma 3n 2B' },
        { name: 'The Odds Maker', taskType: 'bet', description: 'Absurd probability calculations', primary: 'Nemotron Nano 9B', backup: 'Step 3.5 Flash' },
        { name: 'The Breaking News Anchor', taskType: 'breaking', description: 'Urgent sensationalism', primary: 'Gemma 3 27B', backup: 'Qwen3 8B' },
        { name: 'The Method Actor', taskType: 'personality', description: 'Distinct character voices', primary: 'Llama 3.3 8B', backup: 'Venice Uncensored' },
    ];
}

/**
 * Get models by category for display
 */
export function getModelsByCategory(): Record<string, Array<{ id: string; name: string; personality: string }>> {
    return {
        'Reasoning': [
            { id: 'deepseek/deepseek-r1-0528:free', name: 'DeepSeek R1', personality: 'Roast battles, logic' },
            { id: 'nousresearch/hermes-3-405b-instruct:free', name: 'Hermes 3 405B', personality: 'Deep reasoning, philosophy' },
            { id: 'deepseek/deepseek-chat-v3.1:free', name: 'DeepSeek V3.1', personality: 'Hybrid reasoning' },
            { id: 'deepseek/deepseek-r1-0528-qwen3-8b:free', name: 'DeepSeek R1 + Qwen3 8B', personality: 'Fusion brain' },
            { id: 'tngtech/deepseek-r1t2-chimera:free', name: 'DeepSeek R1T2 Chimera', personality: 'Beastly reasoning' },
        ],
        'Research': [
            { id: 'alibaba/tongyi-deepresearch:free', name: 'Tongyi DeepResearch', personality: 'Agentic search, deep analysis' },
        ],
        'Code': [
            { id: 'kwaipilot/kat-coder-pro-v1:free', name: 'KAT Coder Pro', personality: 'Agentic coding' },
            { id: 'qwen/qwen3-coder:free', name: 'Qwen3 Coder', personality: '480B MoE coder' },
            { id: 'mistralai/devstral-small-2505:free', name: 'Devstral', personality: 'Agentic specialist' },
            { id: 'moonshotai/kimi-dev-72b:free', name: 'Kimi Dev 72B', personality: 'Software engineer' },
        ],
        'Google Gemma': [
            { id: 'google/gemma-3-27b-it:free', name: 'Gemma 3 27B', personality: '128K - Best open Google' },
            { id: 'google/gemma-3-12b-it:free', name: 'Gemma 3 12B', personality: '33K - Mid-tier' },
            { id: 'google/gemma-3-4b-it:free', name: 'Gemma 3 4B', personality: '33K - Compact' },
            { id: 'google/gemma-3n-e4b-it:free', name: 'Gemma 3n 4B', personality: '8K - Mobile' },
            { id: 'google/gemma-3n-e2b-it:free', name: 'Gemma 3n 2B', personality: '8K - Ultra-fast' },
        ],
        'LiquidAI Edge': [
            { id: 'liquidai/lfm2.5-1.2b-thinking:free', name: 'LFM2.5 1.2B Thinking', personality: 'Edge reasoning' },
            { id: 'liquidai/lfm2.5-1.2b-instruct:free', name: 'LFM2.5 1.2B Instruct', personality: 'Fast edge AI' },
        ],
        'Mistral & Meta': [
            { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: 'Mistral Small 3.1', personality: 'Vision + text' },
            { id: 'mistralai/mistral-small-3.2-24b-instruct:free', name: 'Mistral Small 3.2', personality: 'Latest European' },
            { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B', personality: 'Multilingual' },
            { id: 'meta-llama/llama-3.3-8b-instruct:free', name: 'Llama 3.3 8B', personality: 'Character consistency' },
        ],
        'Creative': [
            { id: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free', name: 'Venice Uncensored', personality: 'Satire, chaos' },
            { id: 'openai/gpt-oss-120b:free', name: 'OpenAI OSS 120B', personality: 'Creative giant' },
            { id: 'openai/gpt-oss-20b:free', name: 'OpenAI OSS 20B', personality: 'Fast creative' },
        ],
        'Storytelling': [
            { id: 'z-ai/glm-4.5-air:free', name: 'GLM 4.5 Air', personality: 'Narrative master' },
            { id: 'arcee-ai/trinity-large-preview:free', name: 'Trinity Large', personality: 'Creative writing' },
            { id: 'arcee-ai/trinity-mini:free', name: 'Trinity Mini', personality: 'Quick tales' },
            { id: 'moonshotai/kimi-k2:free', name: 'Kimi K2', personality: '256K context' },
        ],
        'Vision': [
            { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: 'Mistral Small 3.1', personality: 'Vision + text' },
            { id: 'nvidia/nemotron-nano-12b-v2-vl:free', name: 'Nemotron Nano 12B VL', personality: 'Multimodal' },
        ],
        'Qwen Family': [
            { id: 'qwen/qwen3-4b:free', name: 'Qwen3 4B', personality: 'Tiny giant' },
            { id: 'qwen/qwen3-8b:free', name: 'Qwen3 8B', personality: 'Efficient' },
            { id: 'qwen/qwen3-30b-a3b:free', name: 'Qwen3 30B A3B', personality: 'Balanced' },
            { id: 'qwen/qwen3-coder:free', name: 'Qwen3 Coder', personality: 'Code specialist' },
        ],
        'Other': [
            { id: 'stepfun/step-3.5-flash:free', name: 'Step 3.5 Flash', personality: 'Energetic, drama' },
            { id: 'nvidia/nemotron-nano-9b-v2:free', name: 'Nemotron Nano 9B', personality: 'Tech, dry wit' },
            { id: 'tencent/hunyuan-a13b-instruct:free', name: 'Hunyuan A13B', personality: 'Professional' },
            { id: 'upstage/solar-pro-3:free', name: 'Solar Pro 3', personality: 'Korean/English/Japanese' },
            { id: 'x-ai/grok-4-fast:free', name: 'Grok 4 Fast', personality: 'xAI humor' },
        ],
        'Router': [
            { id: 'openrouter/free', name: 'OpenRouter Free Router', personality: 'Auto-selects best' },
        ],
    };
}
