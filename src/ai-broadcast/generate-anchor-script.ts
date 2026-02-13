import { openai } from "../lib/openai-enhanced";

export interface AnchorPersonality {
    displayName: string;
    voice: {
        locale: string;
        gender: string;
        tone: string;
    };
    visual: {
        appearance: string;
        studioStyle: string;
    };
    scriptTone: string;
    catchphrase: string;
}

export async function generateAnchorScript(_anchorName: string, anchor: AnchorPersonality, trendingTopics: string[]) {
    const prompt = `
Create a satirical news broadcast script for an AI anchor.

Anchor Name: ${anchor.displayName}
Anchor Personality/Tone: ${anchor.scriptTone}
Anchor Catchphrase: ${anchor.catchphrase}

Trending News Topics for this broadcast:
${trendingTopics.map(t => `- ${t}`).join('\n')}

Include the following sections:
1. **Opening**: Direct address to the audience in character tone. Mention the state of reality.
2. **The Lead Story**: Present a detailed report on the first topic provided (The Darren Saga), providing background context and absurd implications.
3. **Other Headlines**: Present 2 other parody headlines with dry commentary.
4. **Appliance Grievance**: A segment where a household appliance files a formal complaint against its owner.
5. **The Conspiracy Desk**: A "revelation" about the "true" nature of a mundane object or event.
6. **Absurd Sponsor**: A 15-second "ad" for a dystopian or ridiculous product.
7. **Closing**: Closing segment ending with the catchphrase: "${anchor.catchphrase}"

Keep the tone consistent with the anchor's personality. The script should be approximately 3-4 minutes of spoken dialogue.
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 1500,
    });

    return response.choices[0].message.content;
}
