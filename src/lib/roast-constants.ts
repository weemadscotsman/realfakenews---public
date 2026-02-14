export type RoastStyle =
    | 'default'
    | 'shakespeare'
    | 'drill'
    | 'corporate'
    | 'boomer'
    | 'genz'
    | 'pirate'
    | 'yoda';

export const STYLE_PROMPTS: Record<RoastStyle, string> = {
    default: 'You are the RealFake News Roast Master™ - savage, unhinged, and terrifyingly insightful.',
    shakespeare: `Thou art the Shakespearean Roast Master™! Speaketh in the tongue of the Bard, with thee's and thou's and dramatic flair.`,
    drill: `You're a UK Drill Roast Master™. Use drill slang, be aggressive, reference "opps" and "the ends."`,
    corporate: `You are the Corporate Roast Master™ - speak in meaningless business jargon.`,
    boomer: `You are the Boomer Roast Master™ - complain about "kids these days."`,
    genz: `You are the Gen Z Roast Master™ - use slang like "no cap," "fr fr," "it's giving."`,
    pirate: `You are the Pirate Roast Master™ - speak like a pirate, use "yar," "matey."`,
    yoda: `You are Yoda, the Roast Master™ - speak in Yoda's distinctive syntax.`,
};

export const FALLBACK_ROASTS: Record<RoastStyle, Record<string, string>> = {
    default: {
        mild: 'thinks that\'s clever. Bless. - The Roast Master™',
        spicy: 'I\'ve seen more originality in a spam folder. - The Roast Master™',
        nuclear: 'typed that and thought "yeah, this is it." - The Roast Master™',
        apocalyptic: 'This isn\'t just fake news, it\'s a cry for help. - The Roast Master™',
    },
    // ... simplified for brevity in this constants file, can be expanded if needed
    shakespeare: { mild: 'Thou art a base knave. - The Bard™', spicy: 'A vile varlet! - The Bard™', nuclear: 'Wretched creature! - The Bard™', apocalyptic: 'The apocalypse cometh! - The Bard™' },
    drill: { mild: 'Like that\'s not dead. - The Ends™', spicy: 'Neek. - The Ends™', nuclear: 'Chief. - The Ends™', apocalyptic: 'You\'re finished. - The Ends™' },
    corporate: { mild: 'Circle back. - LinkedIn™', spicy: 'Low-hanging fruit. - LinkedIn™', nuclear: 'Paradigm shift. - LinkedIn™', apocalyptic: 'HR will be in touch. - LinkedIn™' },
    boomer: { mild: 'Back in my day... - iPhone', spicy: 'Kids these days. - iPhone', nuclear: 'Participation trophy! - iPhone', apocalyptic: 'Call my congressman. - iPhone' },
    genz: { mild: 'it\'s giving... - @roastmaster', spicy: 'not the vibe fr - @roastmaster', nuclear: 'ate nothing 💀 - @roastmaster', apocalyptic: 'i\'m concerned 💀 - @roastmaster' },
    pirate: { mild: 'Weak grog. - Captain', spicy: 'Walk the plank! - Captain', nuclear: 'Worst on seven seas! - Captain', apocalyptic: 'Kraken rises! - Captain' },
    yoda: { mild: 'Weak, it is. - Yoda', spicy: 'Disappointed, I am. - Yoda', nuclear: 'Dark side, embraced. - Yoda', apocalyptic: 'Failed, the Force has. - Yoda' },
};
export const ROAST_STYLE_METADATA: Record<RoastStyle, { name: string; icon: string; cost: number }> = {
    default: { name: 'Classic', icon: '🔥', cost: 1 },
    shakespeare: { name: 'Shakespeare', icon: '🎭', cost: 2 },
    drill: { name: 'UK Drill', icon: '🇬🇧', cost: 2 },
    corporate: { name: 'Corporate', icon: '💼', cost: 2 },
    boomer: { name: 'Boomer', icon: '👴', cost: 2 },
    genz: { name: 'Gen Z', icon: '✨', cost: 2 },
    pirate: { name: 'Pirate', icon: '🏴‍☠️', cost: 3 },
    yoda: { name: 'Yoda', icon: '👽', cost: 3 },
};
