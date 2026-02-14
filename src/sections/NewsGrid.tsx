import { useEffect, useState } from 'react';
import { ArrowRight, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CANONICAL_ARTICLES } from '@/data/canonical-articles';

interface Article {
  headline: string;
  excerpt: string;
  category: string;
  readTime: number;
  image?: string;
  featured?: boolean;
  originalHeadline?: string;
  slug?: string;
  verified?: boolean; // New property for AGC verification
}

const VerifiedBadge = () => (
  <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-green-500/90 text-black px-2 py-0.5 rounded-full backdrop-blur-sm border border-green-400 shadow-lg">
    <ShieldCheck size={10} className="text-black" />
    <span className="text-[8px] font-black uppercase tracking-widest">AGC Verified</span>
  </div>
);

const CATEGORY_IMAGES: Record<string, string> = {
  politics: 'https://images.unsplash.com/photo-1541872703-74c5963631df?w=600&q=80',
  science: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80',
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  entertainment: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
};

const fallbackData: Record<string, Article[]> = {
  politics: CANONICAL_ARTICLES.filter(a => a.category === 'Politics' || (a.tags && a.tags.includes('POLITICS'))),
  science: CANONICAL_ARTICLES.filter(a => a.category === 'Science' || (a.tags && a.tags.includes('SCIENCE'))),
  tech: CANONICAL_ARTICLES.filter(a => a.category === 'Technology' || (a.tags && a.tags.includes('TECH'))),
  entertainment: [],
  sports: [],
  investigation: CANONICAL_ARTICLES.filter(a => a.category === 'Investigation' || (a.tags && a.tags.includes('INVESTIGATION'))),
};

// Ensure fallback data isn't empty if we missed some categories
if (fallbackData.entertainment.length === 0) {
  fallbackData.entertainment = [{
    headline: "Celebrity Apologizes for Having Personality",
    excerpt: "In a teardown of a notes app screenshot, the A-lister expressed regret for displaying a human emotion that wasn't previously PR-approved.",
    category: "Entertainment", readTime: 4,
  }];
}
if (fallbackData.sports.length === 0) {
  fallbackData.sports = [{
    headline: "Local Man Wins Marathon by Taking a Shortcut and Just Being Really Confident",
    excerpt: "The winner admitted to taking the subway for three miles but argued that his 'winner's mindset' was what truly carried him across the finish line.",
    category: "Sports", readTime: 3,
  }];
}

const CATEGORIES = [
  { name: 'Politics', key: 'politics' },
  { name: 'Science', key: 'science' },
  { name: 'Tech', key: 'tech' },
  { name: 'Entertainment', key: 'entertainment' },
  { name: 'Sports', key: 'sports' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

interface NewsGridProps {
  limitCategory?: string;
}

const NewsGrid = ({ limitCategory }: NewsGridProps) => {
  const [newsData, setNewsData] = useState<Record<string, Article[]>>(fallbackData);

  const displayedCategories = limitCategory
    ? CATEGORIES.filter(c => c.key === limitCategory)
    : CATEGORIES;

  useEffect(() => {
    const fetchAllNews = async () => {
      const updatedData: Record<string, Article[]> = { ...fallbackData };

      try {
        const fetchPromises = displayedCategories.map(async (cat) => {
          try {
            const response = await fetch(`/.netlify/functions/fetch-live-news?category=${cat.key}`);
            if (response.ok) {
              const data = await response.json();
              if (data.news && data.news.length > 0) {
                // ALWAYS prepend canonical articles to ensure they appear first
                const canonicalForCat = CANONICAL_ARTICLES.filter(a =>
                  a.category.toLowerCase() === cat.key.toLowerCase() ||
                  (cat.key === 'tech' && a.category === 'Technology')
                );

                // Merge: Canonical first, then Dynamic
                return { key: cat.key, news: [...canonicalForCat, ...data.news] };
              }
            }
          } catch (e) {
            console.warn(`Failed to fetch ${cat.key} news:`, e);
          }
          return { key: cat.key, news: fallbackData[cat.key] || [] };
        });

        const results = await Promise.all(fetchPromises);
        results.forEach(res => {
          if (res.news && res.news.length > 0) {
            updatedData[res.key] = res.news;
          }
        });

        setNewsData(updatedData);
      } catch (err) {
        console.error("News aggregation failed:", err);
      }
    };

    fetchAllNews();
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24" id={limitCategory || "news-grid"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayedCategories.map((category) => (
          <div key={category.key} className="mb-20 last:mb-0" id={category.key}>
            <div className="flex items-end justify-between mb-8 border-b-2 border-black pb-2">
              <h2 className="section-header text-3xl flex items-center gap-2">
                {category.name}
                <div className="w-2 h-2 bg-red-600 rounded-full" />
              </h2>
              <Link
                to={category.key === 'tech' ? '/tech' : `#${category.key}`}
                className="text-red-600 text-sm font-bold hover:text-red-700 flex items-center gap-1"
              >
                {category.key === 'tech' ? 'View Exposé' : 'View All'} <ArrowRight size={16} />
              </Link>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {newsData[category.key]?.map((article, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col ${article.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                    }`}
                >
                  <Link
                    to={`/article/${encodeURIComponent(article.slug || article.headline)}`}
                    className="flex-1 flex flex-col group"
                    onClick={() => {
                      toast('Telemetry Point Acquired', {
                        description: `[READ_LOG] User accessed: "${article.headline.substring(0, 20)}..."`,
                        icon: '👁️',
                        className: 'font-mono'
                      });
                    }}
                  >
                    {article.image || CATEGORY_IMAGES[category.key] ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image || CATEGORY_IMAGES[category.key]}
                          alt={article.headline}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          BREAKING
                        </div>
                      </div>
                    ) : (
                      <div className="h-4 w-full bg-red-600" />
                    )}

                    {/* AGC Verification Badge (Randomly applied for now, or if featured) */}
                    {(article.featured || index % 5 === 0) && <VerifiedBadge />}

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                          <Clock size={10} />
                          {article.readTime}m read
                        </div>
                      </div>

                      <h3 className="newspaper-headline text-xl mb-3 group-hover:text-red-600 transition-colors">
                        {article.headline}
                      </h3>

                      <p className="article-body text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="text-red-600 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read Full Story <ArrowRight size={14} />
                        </span>
                        {article.featured && <Sparkles size={16} className="text-amber-400" />}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
