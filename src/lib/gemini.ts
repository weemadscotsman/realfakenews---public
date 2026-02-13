/**
 * Gemini text generation — routes through Netlify function proxy
 * so the Google API key never reaches the browser.
 */

/**
 * Generate structured JSON content via server-side Gemini proxy
 */
export async function generateJSON<T>(prompt: string, fallback: T): Promise<T> {
    try {
        const response = await fetch('/.netlify/functions/generate-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, mode: 'json' }),
        });

        if (!response.ok) throw new Error(`Proxy returned ${response.status}`);

        const data = await response.json();
        if (data.fallback) return fallback;

        return JSON.parse(data.result) as T;
    } catch (error) {
        console.warn('Gemini generation failed, using fallback:', error);
        return fallback;
    }
}

/**
 * Generate plain text content via server-side Gemini proxy
 */
export async function generateText(prompt: string, fallback: string = ''): Promise<string> {
    try {
        const response = await fetch('/.netlify/functions/generate-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, mode: 'text' }),
        });

        if (!response.ok) throw new Error(`Proxy returned ${response.status}`);

        const data = await response.json();
        if (data.fallback) return fallback;

        return data.result || fallback;
    } catch (error) {
        console.warn('Gemini text generation failed, using fallback:', error);
        return fallback;
    }
}

/**
 * Generate a full satirical article for a given headline
 */
export async function generateArticle(headline: string) {
    const prompt = `You are a journalist for RealFake News — a satirical news site like The Onion meets Black Mirror.

Write a full satirical article for this headline: "${headline}"

Structure:
- Lede (punchy, absurd opening paragraph)
- Body (3-4 paragraphs of escalating absurdity)  
- At least 2 fake expert quotes (with ridiculous names/titles)
- Conclusion (melancholy or chaotically funny)

Return JSON:
{
  "headline": "the headline",
  "content": "Full article as an HTML string using <p>, <blockquote>, <strong>, <em> tags",
  "category": "short category name",
  "author": "A funny fake journalist name",
  "readTime": number between 3 and 7
}`;

    const fallback = {
        headline,
        content: `<p>Our AI journalists attempted to cover this story but were temporarily incapacitated after an incident involving a sentient coffee machine and a philosophical disagreement about the nature of truth.</p>
    <p>What we can confirm is that <strong>"${headline}"</strong> is either the most important story of the century or a complete fabrication. Our legal team insists we cannot tell you which.</p>
    <p>An unnamed source (Unit 404 — the office toaster) stated: <em>"I've seen things you wouldn't believe. Spreadsheets on fire off the shoulder of the server room."</em></p>
    <p>We will update this story as soon as our systems regain consciousness.</p>`,
        category: 'Breaking',
        author: 'Emergency Backup Correspondent',
        readTime: 3,
    };

    const data = await generateJSON(prompt, fallback);
    return {
        ...data,
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
}
