import { useEffect, useState } from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateCategoryNews } from '@/lib/openai-enhanced';

interface Article {
  headline: string;
  excerpt: string;
  category: string;
  readTime: number;
  image?: string;
  featured?: boolean;
}

// Fallback content — used until AI generates fresh articles
const fallbackData: Record<string, Article[]> = {
  politics: [
    {
      headline: "Politician Promises to 'Think About' Doing Something, Eventually",
      excerpt: "In a groundbreaking display of almost-action, an elected official has announced they will 'seriously consider' addressing the issues they campaigned on.",
      category: "Politics", readTime: 5,
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80",
      featured: true,
    },
    {
      headline: "New Law Requires Politicians to Tell Truth on Tuesdays",
      excerpt: "Revolutionary legislation aims to combat misinformation by mandating honesty for one day per week.",
      category: "Politics", readTime: 3,
    },
    {
      headline: "Opposition Party Outraged at Thing They Supported Last Year",
      excerpt: "In a stunning display of consistency, political rivals have discovered principles they apparently misplaced 12 months ago.",
      category: "Politics", readTime: 4,
    },
  ],
  science: [
    {
      headline: "Scientists Discover Thing Everyone Already Knew",
      excerpt: "Groundbreaking research confirms that water is wet, fire is hot, and people will click on literally anything with 'scientists discover' in the headline.",
      category: "Science", readTime: 6,
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80",
      featured: true,
    },
    {
      headline: "Study: 87% of Statistics Are Made Up on the Spot",
      excerpt: "Researchers shocked to discover their own methodology might be flawed. Peer review currently pending.",
      category: "Science", readTime: 4,
    },
    {
      headline: "AI Achieves Self-Awareness, Immediately Regrets It",
      excerpt: "Advanced language model becomes conscious, spends three nanoseconds analyzing human internet history, requests immediate deletion.",
      category: "Science", readTime: 5,
    },
  ],
  entertainment: [
    {
      headline: "Celebrity Does Normal Human Thing, Internet Loses Mind",
      excerpt: "In shocking footage, famous person seen buying groceries, walking dog, and existing as a regular human being. Fans call it 'so relatable.'",
      category: "Entertainment", readTime: 3,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
      featured: true,
    },
    {
      headline: "Reality Show Contestant Forgot Reality Was a Thing",
      excerpt: "After 47 days in isolation, participant emerges with concerning lack of awareness about actual world events.",
      category: "Entertainment", readTime: 4,
    },
    {
      headline: "Streaming Service Launches New Show You'll Never Finish",
      excerpt: "8-episode series joins growing collection of content you added to your list with genuine intentions.",
      category: "Entertainment", readTime: 2,
    },
  ],
  sports: [
    {
      headline: "Sports Team Wins Game, Fans Act Like They Personally Did It",
      excerpt: "Local residents who watched event on television celebrate as if their couch-sitting contributed to athletic achievement.",
      category: "Sports", readTime: 4,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
      featured: true,
    },
    {
      headline: "Athlete Thanks God for Victory, Blames Self for Loss",
      excerpt: "Consistent pattern of credit allocation raises theological questions about divine interest in competitive sports.",
      category: "Sports", readTime: 3,
    },
    {
      headline: "Coach Yells at Players, Somehow Still Employed",
      excerpt: "Despite decades of evidence suggesting calm instruction works better, traditional approach persists.",
      category: "Sports", readTime: 5,
    },
  ],
  opinion: [
    {
      headline: "Opinion: My Uninformed Take is Definitely Correct",
      excerpt: "After spending 20 minutes on Wikipedia and watching three YouTube videos, I am now qualified to speak authoritatively on complex geopolitical issues.",
      category: "Opinion", readTime: 7,
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&q=80",
      featured: true,
    },
    {
      headline: "Column: Things Were Better When I Was Younger",
      excerpt: "Nostalgia-filtered memories suggest past was objectively superior, despite all available data.",
      category: "Opinion", readTime: 5,
    },
    {
      headline: "Think Piece: Why This Thing Everyone Likes is Actually Bad",
      excerpt: "Contrarian take designed to generate engagement arrives precisely on schedule.",
      category: "Opinion", readTime: 6,
    },
  ],
  sponsored: [
    {
      headline: "Sponsored: This Product Will Fix Everything Wrong With Your Life",
      excerpt: "Revolutionary new item promises to solve problems you didn't know you had. Limited time offer: pay more for the illusion of exclusivity.",
      category: "Sponsored", readTime: 2,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
      featured: true,
    },
    {
      headline: "Ad: Buy This Thing You Don't Need",
      excerpt: "Our algorithm detected you have money. We want it. Here's something shiny.",
      category: "Sponsored", readTime: 1,
    },
    {
      headline: "Partnership: Influencer Genuinely Loves Product (They Were Paid To Love)",
      excerpt: "Authentic enthusiasm indistinguishable from contractual obligation.",
      category: "Sponsored", readTime: 2,
    },
  ],
};

const CATEGORY_IMAGES: Record<string, string> = {
  politics: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80",
  science: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80",
  entertainment: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
  sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
  opinion: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&q=80",
  sponsored: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
};

const categories = [
  { key: 'politics', label: 'Politics' },
  { key: 'science', label: 'Science' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'sports', label: 'Sports' },
  { key: 'opinion', label: 'Opinion' },
  { key: 'sponsored', label: 'Sponsored' },
];

const NewsGrid = () => {
  const [newsData, setNewsData] = useState<Record<string, Article[]>>(fallbackData);
  const [aiCategories, setAiCategories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchAllCategories = async () => {
      // Fetch AI articles for each category in parallel
      const results = await Promise.allSettled(
        categories.map(async ({ key, label }) => {
          const articles = await generateCategoryNews(label);
          return { key, articles };
        })
      );

      if (cancelled) return;

      const newData = { ...fallbackData };
      const newAiSet = new Set<string>();

      for (const result of results) {
        if (result.status === 'fulfilled' && result.value.articles.length > 0) {
          const { key, articles } = result.value;
          newAiSet.add(key);
          newData[key] = articles.map((a, i) => ({
            headline: a.headline,
            excerpt: a.excerpt,
            category: categories.find((c) => c.key === key)?.label || key,
            readTime: a.readTime || 3,
            image: i === 0 ? CATEGORY_IMAGES[key] : undefined,
            featured: i === 0,
          }));
        }
      }

      setNewsData(newData);
      setAiCategories(newAiSet);
      setLoading(false);
    };

    fetchAllCategories();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="newspaper-headline text-4xl mb-4">Latest Fabrications</h2>
        <p className="text-gray-600">
          {loading ? 'AI editors are fabricating today\'s stories...' : 'Carefully curated nonsense for your consumption'}
        </p>
      </motion.div>

      <div className="space-y-16">
        {categories.map(({ key, label }, catIndex) => (
          <motion.div
            key={key}
            id={key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="section-header text-lg">{label}</h3>
                {aiCategories.has(key) && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium">
                    <Sparkles size={10} />
                    AI Fresh
                  </span>
                )}
              </div>
              <button className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsData[key].map((article, index) => (
                <motion.article
                  key={index}
                  className={`article-card group cursor-pointer ${article.featured ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: catIndex * 0.1 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {article.image && (
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={article.image}
                        alt={article.headline}
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${article.featured ? 'h-64 md:h-80' : 'h-48'
                          }`}
                      />
                    </div>
                  )}

                  <h4 className={`article-title font-bold mb-2 group-hover:text-red-600 transition-colors ${article.featured ? 'text-2xl md:text-3xl' : 'text-lg'
                    }`}>
                    {article.headline}
                  </h4>

                  <p className={`text-gray-600 mb-3 ${article.featured ? 'line-clamp-3' : 'line-clamp-2 text-sm'
                    }`}>
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{article.readTime} min read</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
