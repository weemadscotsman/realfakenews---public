# RealFake News 📰🔥

The internet's most trusted source for news that's definitely, probably, maybe not real.

## What Is This?

RealFake News is a satirical news platform with gamification features. Think "The Onion meets a mobile game" — users earn XP, collect achievements, climb leaderboards, and participate in daily challenges while reading hilariously fake news.

### Features

- **Breaking News** — AI-generated satirical headlines that rotate in real-time
- **Drop The Tea** — Submit your own "hot takes" and get roasted by AI
- **Roast Battles** — Challenge other users to wit-based duels
- **Leaderboards** — Compete for the title of Most Gullible Reader
- **Achievements** — Unlock badges for peak fake news consumption
- **Story Arcs** — AI generates personalized satirical stories featuring YOU
- **Daily Challenges** — Fresh content and competitions every day
- **Fake Bets** — AI-generated prediction markets with utterly meaningless fake wagers

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI, Framer Motion
- **Backend:** Supabase (auth, database, functions)
- **AI:** OpenRouter or Google Gemini (satire generation)
- **Hosting:** Netlify
- **Monitoring:** Sentry (error tracking)

## 🔥 FREE AI MODELS - ZERO COST! 🔥

**9 FREE MODELS** with automatic rotation when rate limits hit:

1. **Gemini 2.0 Flash** (Google) - Primary
2. **GLM 4.5 Air** (Z-AI) - Fallback 1
3. **Step 3.5 Flash** (StepFun) - Fallback 2
4. **DeepSeek R1** (DeepSeek) - Fallback 3
5. **GPT-OSS 120B** (OpenAI) - Fallback 4
6. **Nemotron Nano** (NVIDIA) - Fallback 5
7. **Dolphin Mistral** (CogComp) - Fallback 6
8. **Llama 3.2 3B** (Meta) - Fallback 7
9. **Qwen 2.5 7B** (Alibaba) - Fallback 8

**Features:**
- ✅ Auto-rotation when rate limited (5-min cooldown)
- ✅ Round-robin load balancing
- ✅ Up to 180 requests/minute capacity
- ✅ **$0.00 COST - NO CREDIT CARD!**

See [FREE_MODELS_SETUP.md](./FREE_MODELS_SETUP.md) for details.

## Quick Wins Implemented ✅

### Security & Performance

- ✅ **9 FREE AI MODELS** — Auto-rotating, zero cost
- ✅ **Input Validation** — Zod schemas validate all API inputs
- ✅ **Rate Limiting** — Per-IP limits (30 req/min for news, 10 req/min for AI)
- ✅ **Memory Management** — LRU cache eviction prevents memory leaks
- ✅ **Concurrency Control** — p-limit prevents API overload
- ✅ **Request Deduplication** — Merges duplicate in-flight requests
- ✅ **Error Tracking** — Sentry integration for both frontend and backend

See [QUICK_WINS_SUMMARY.md](./QUICK_WINS_SUMMARY.md) for implementation details.

## 🚀 Quick Start (5 minutes)

### 1. Clone & Install

```bash
git clone <your-repo>
cd realfakenews
npm install
```

### 2. Get Free AI API Key (OpenRouter)

**EASIEST OPTION - No credit card required!**

1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up and create a key
3. Copy your key (starts with `sk-or-v1-`)

### 3. Configure Environment

Create `.env.local`:

```bash
# AI (OpenRouter - FREE tier)
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Supabase (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

See [OPENROUTER_SETUP.md](./OPENROUTER_SETUP.md) for detailed setup.

### 4. Run

```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
```

## Environment Variables

### Required

| Variable | Source | Purpose |
|----------|--------|---------|
| `OPENROUTER_API_KEY` | [openrouter.ai](https://openrouter.ai/keys) | **AI generation (FREE)** |
| `VITE_SUPABASE_URL` | Supabase Dashboard | Database connection |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard | Client auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard | Server-side operations |

### Optional

| Variable | Default | Purpose |
|----------|---------|---------|
| `OPENROUTER_MODEL` | `google/gemini-2.0-flash-exp:free` | AI model selection |
| `GOOGLE_API_KEY` | - | Alternative AI provider |
| `SENTRY_DSN` | - | Error tracking |
| `CORS_ORIGIN` | `*` | Production domain restriction |

### AI Provider Priority

1. **OpenRouter** (tried first) - Free tier available
2. **Google AI** (fallback) - 1,500 free requests/day

Set both for redundancy!

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set environment variables in Netlify dashboard
4. Deploy! 🚀

**Important:** Set these in Netlify Site Settings:
```
OPENROUTER_API_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

### Environment Variables in Netlify

Site Settings → Build & Deploy → Environment:

![Environment Variables](https://i.imgur.com/environment-vars-screenshot.png)

## Project Structure

```
├── netlify/
│   └── functions/              # Serverless functions
│       ├── fetch-live-news.ts  # RSS + AI satire
│       ├── generate-article.ts # Full article generation
│       └── lib/
│           ├── ai-client.ts    # OpenRouter/Google AI client
│           ├── config.ts       # Personas, world state, lore
│           ├── validation.ts   # Zod schemas
│           └── shared.ts       # Utilities
├── src/
│   ├── components/             # React components
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities (supabase, sentry)
│   ├── pages/                  # Route components
│   ├── sections/               # Page sections
│   └── types/                  # TypeScript interfaces
└── supabase/
    └── functions/              # Supabase Edge Functions
```

## Monitoring

### With Sentry (Optional)

1. Create account at [sentry.io](https://sentry.io)
2. Add `SENTRY_DSN` to environment variables
3. Automatic error tracking for:
   - JavaScript crashes
   - API failures
   - Performance metrics

### OpenRouter Dashboard

Track usage at [openrouter.ai/activity](https://openrouter.ai/activity)

## Troubleshooting

### "No AI client available"
- Check `OPENROUTER_API_KEY` is set
- Verify key starts with `sk-or-v1-`

### Rate limit errors (429)
- Free tier: 20 req/min, 200 req/day
- Wait a minute or upgrade at OpenRouter

### Build fails
```bash
npm run build
```
Check for TypeScript errors.

## Free Tier Limits

| Service | Free Limit |
|---------|-----------|
| OpenRouter (per model) | 20 req/min, 200 req/day |
| OpenRouter (9 models) | **180 req/min, 1800 req/day** |
| Google AI | 1,500 req/day |
| Supabase | 500MB database, 2GB bandwidth |
| Netlify | 100GB bandwidth, 300 build minutes |

**Total Capacity: 1800 requests/day for FREE!** 🚀

## License

All rights reserved. This is satirical content — please don't sue us.

---

<p align="center">
  <strong>Powered by:</strong><br>
  <img src="https://img.shields.io/badge/OpenRouter-AI-orange" alt="OpenRouter">
  <img src="https://img.shields.io/badge/Gemini-2.0-blue" alt="Gemini">
  <img src="https://img.shields.io/badge/Supabase-Database-green" alt="Supabase">
  <img src="https://img.shields.io/badge/React-19-61DAFB" alt="React">
</p>

<p align="center">
  <em>"Verified by Unit 404. The crumb tray is clean."</em>
</p>
