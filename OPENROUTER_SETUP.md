# OpenRouter Setup Guide 🚀

## Why OpenRouter?

- **Free tier available** - Use Gemini 2.0 Flash (experimental) for free
- **No credit card required** to get started
- **Rate limits:** 20 requests/minute, 200 requests/day on free tier
- **Fallback options** - If one model is down, easily switch to another
- **Unified API** - Works with OpenAI SDK format

## Quick Setup (2 minutes)

### 1. Get Your Free API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up with GitHub or email
3. Navigate to [Keys](https://openrouter.ai/keys)
4. Click "Create Key"
5. Copy your key (starts with `sk-or-v1-`)

### 2. Set Environment Variables

**For local development:**

Create `.env.local` file:
```bash
OPENROUTER_API_KEY=sk-or-v1-your-key-here
OPENROUTER_MODEL=google/gemini-2.0-flash-exp:free
SITE_URL=http://localhost:5173
```

**For Netlify production:**

Go to Site Settings → Environment Variables:
```
OPENROUTER_API_KEY = sk-or-v1-your-key-here
OPENROUTER_MODEL = google/gemini-2.0-flash-exp:free
SITE_URL = https://your-site.netlify.app
```

### 3. Test It

Start your dev server:
```bash
npm run dev
```

Visit the site and check the console for:
```
AI Info: { provider: 'openrouter', model: 'google/gemini-2.0-flash-exp:free', free: true }
```

## Available Free Models

| Model | ID | Good For |
|-------|-----|----------|
| **Gemini 2.0 Flash** | `google/gemini-2.0-flash-exp:free` | Fast, good quality (RECOMMENDED) |
| **Llama 3.2 3B** | `meta-llama/llama-3.2-3b-instruct:free` | Very fast, lightweight |
| **Qwen 2.5 7B** | `qwen/qwen-2.5-7b-instruct:free` | Good Chinese/English |

## Rate Limits

### Free Tier
- **20 requests per minute**
- **200 requests per day**

### If You Hit Limits
The app will automatically fall back to "Glitch News" mode with entertaining error messages.

## Upgrading (Optional)

If you need more requests:

1. Add credits to OpenRouter (pay-as-you-go)
2. Or switch to Google AI (1,500 free requests/day)
3. Or use both as fallback

### Using Google AI as Backup

Set BOTH keys:
```bash
OPENROUTER_API_KEY=sk-or-v1-your-key  # Tried first
GOOGLE_API_KEY=AIyour-google-key       # Fallback
```

The app will try OpenRouter first, then Google AI.

## Troubleshooting

### "No AI client available"
- Check your API key is set correctly
- Verify key starts with `sk-or-v1-`
- Check Netlify environment variables are deployed

### Rate limit errors
- You're making requests too fast (>20/min)
- Wait a minute and try again
- The app will show "Glitch News" fallback automatically

### 401 Unauthorized
- API key is invalid or revoked
- Create a new key at openrouter.ai/keys

### Model not found
- The `:free` model might be temporarily unavailable
- Try without `:free` suffix (uses credits)
- Or switch to a different model

## Model Comparison

### For Satire Generation (This Project)

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| Gemini 2.0 Flash (free) | ⚡ Fast | ⭐⭐⭐⭐ | FREE | **Default choice** |
| Gemini 2.0 Pro | 🐢 Slow | ⭐⭐⭐⭐⭐ | $ | Longer articles |
| Llama 3.2 3B | ⚡⚡ Very Fast | ⭐⭐⭐ | FREE | Quick responses |

## Code Example

The AI client automatically handles both OpenRouter and Google AI:

```typescript
import { getAIClient, getAIInfo } from './lib/ai-client';

const aiClient = getAIClient();
const info = getAIInfo();

console.log(`Using ${info.provider} with ${info.model}`);
// Using openrouter with google/gemini-2.0-flash-exp:free

const result = await aiClient.generateContent({
    contents: [{ role: 'user', parts: [{ text: 'Generate satire...' }] }],
    generationConfig: { temperature: 0.9, responseMimeType: 'application/json' },
});
```

## Monitoring Usage

Check your OpenRouter dashboard:
- [Usage Stats](https://openrouter.ai/activity)
- [Rate Limit Status](https://openrouter.ai/docs#limits)

## Need Help?

- [OpenRouter Docs](https://openrouter.ai/docs)
- [OpenRouter Discord](https://discord.gg/openrouter)
- Check the app logs in Netlify for AI client errors

---

**Tip:** The `:free` models are rate-limited but perfect for testing and small projects. Start free, upgrade when you need to! 🎉
