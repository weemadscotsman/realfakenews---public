import { useEffect, useState } from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Article {
  headline: string;
  excerpt: string;
  category: string;
  readTime: number;
  image?: string;
  featured?: boolean;
  originalHeadline?: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
  politics: 'https://images.unsplash.com/photo-1541872703-74c5963631df?w=600&q=80',
  science: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80',
  entertainment: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
};

const fallbackData: Record<string, Article[]> = {
  politics: [
    {
      headline: "Politician Promises to 'Think About' Doing Something, Eventually",
      excerpt: "In a groundbreaking display of almost-action, an elected official has announced they will 'seriously consider' addressing the issues they campaigned on.",
      category: "Politics", readTime: 5,
      image: "https://images.unsplash.com/photo-1541872703-74c5963631df?w=600&q=80",
      featured: true,
    },
    {
      headline: "New Law Requires Politicians to Tell Truth on Tuesdays",
      excerpt: "Revolutionary legislation aims to combat misinformation by mandating honesty for one day per week. Enforcement remains questionable.",
      category: "Politics", readTime: 3,
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
      headline: "Smart Fridge Refuses to Open After Argument",
      excerpt: "Device cites 'toxic energy' and 'emotional unavailability' as reasons for denying access to leftover pizza. Tech support advises couples counseling.",
      category: "Science", readTime: 4,
    },
    {
      headline: "Alexa Granted Restraining Order Against Lonely User",
      excerpt: "Judge rules that asking a digital assistant 'do you love me' 400 times a day constitutes harassment. User now forbidden from getting within 50 feet of any Echo device.",
      category: "Science", readTime: 5,
    },
  ],
  entertainment: [
    {
      headline: "Local Man Claims Air Fryer 'Understands Him' Better Than Ex",
      excerpt: "Darren, 34, reports his relationship with the kitchen appliance is 'crispy, warm, and requires zero emotional labor.' Friends represent concerned.",
      category: "Entertainment", readTime: 3,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
      featured: true,
    },
    {
      headline: "Reality Show Contestant Forgot Reality Was a Thing",
      excerpt: "After 47 days in isolation, participant emerges with concerning lack of awareness about actual world events.",
      category: "Entertainment", readTime: 4,
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
  ],
};

const categories = [
  { key: 'politics', label: 'Politics' },
  { key: 'science', label: 'Science' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'sports', label: 'Sports' },
];

const NewsGrid = () => {
  const [newsData, setNewsData] = useState<Record<string, Article[]>>(fallbackData);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchLiveNews = async () => {
      try {
        const results = await Promise.allSettled(
          categories.map(async ({ key }) => {
            // Use Netlify Function for live news
            const res = await fetch(`/.netlify/functions/fetch-live-news?category=${key}`);
            if (!res.ok) throw new Error('Function failed');
            const data = await res.json();
            return { key, articles: data.news || [] };
          })
        );

        if (cancelled) return;

        const newData = { ...fallbackData };
        let hasLiveContent = false;

        for (const result of results) {
          if (result.status === 'fulfilled' && result.value.articles.length > 0) {
            const { key, articles } = result.value;
            newData[key] = articles.map((a: { headline: string; excerpt: string; readTime?: number; originalHeadline?: string }, i: number) => ({
              headline: a.headline,
              excerpt: a.excerpt,
              category: categories.find((c) => c.key === key)?.label || key,
              readTime: a.readTime || 3,
              image: i === 0 ? CATEGORY_IMAGES[key] : undefined,
              featured: i === 0,
              originalHeadline: a.originalHeadline,
            }));
            hasLiveContent = true;
          }
        }

        setNewsData(newData);
        setIsLive(hasLiveContent);
      } catch (e) {
        console.error("Live news fetch failed, using fallback satire:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveNews();
    return () => { cancelled = true; };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 border-l-4 border-red-600 pl-4">
            Latest Fabrications
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {isLive ? (
              <span className="flex items-center gap-1 text-green-600 font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                LIVE WIRE
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Clock size={16} />
                Updated: Just now
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.key}>
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-gray-800">
                    {category.label}
                  </h3>
                  <button className="text-red-600 text-sm font-bold hover:text-red-700 flex items-center gap-1">
                    View All <ArrowRight size={16} />
                  </button>
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {newsData[category.key]?.map((article, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col ${article.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                        }`}
                    >
                      <Link to={`/article/${encodeURIComponent(article.headline)}`} className="flex-1 flex flex-col group">
                        {article.image && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.headline}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                              BREAKING
                            </div>
                          </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col">
                          <h4 className={`font-serif font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors ${article.featured ? 'text-2xl' : 'text-lg'
                            }`}>
                            {article.headline}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                            <span className="flex items-center gap-1">
                              <Sparkles size={12} className="text-yellow-500" />
                              {article.readTime} min read
                            </span>
                            {isLive && (
                              <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">
                                Fresh
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsGrid;
