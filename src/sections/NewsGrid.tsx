import { useEffect, useState } from 'react';
import { ArrowRight, Clock, Sparkles, ShieldCheck, Lock, Eye, FileWarning } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CANONICAL_ARTICLES } from '@/data/canonical-articles';
import { useRealityLayer } from '@/hooks/useRealityLayer';
import { getOrFetchDaily } from '@/lib/daily-content-cache';

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

const VerifiedBadge = ({ isRealityRevealed }: { isRealityRevealed: boolean }) => (
  <div className={`absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-lg border ${isRealityRevealed ? 'bg-black/90 border-green-500 text-green-500' : 'bg-green-500/90 border-green-400 text-black'}`}>
    {isRealityRevealed ? <Lock size={10} /> : <ShieldCheck size={10} className="text-black" />}
    <span className="text-[8px] font-black uppercase tracking-widest">{isRealityRevealed ? 'SCIENTIFICALLY VERIFIED PROPAGANDA' : 'AGC Verified'}</span>
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
  politics: CANONICAL_ARTICLES.filter(a => a.category.toLowerCase() === 'politics' || (a.tags && a.tags.includes('POLITICS'))),
  science: CANONICAL_ARTICLES.filter(a => a.category.toLowerCase() === 'science' || (a.tags && a.tags.includes('SCIENCE'))),
  tech: CANONICAL_ARTICLES.filter(a => a.category.toLowerCase() === 'technology' || (a.tags && a.tags.includes('TECH'))),
  entertainment: [],
  sports: [],
  investigation: CANONICAL_ARTICLES.filter(a => a.category.toLowerCase() === 'investigation' || (a.tags && a.tags.includes('INVESTIGATION'))),
  systemLeak: CANONICAL_ARTICLES.filter(a => a.category.toLowerCase() === 'system leak' || (a.tags && a.tags.some((t: string) => t.includes('AGC') || t.includes('KERNEL') || t.includes('LEAK')))),
  resistance: CANONICAL_ARTICLES.filter(a => a.category.toLowerCase() === 'resistance' || (a.tags && a.tags.includes('RESISTANCE'))),
};

// Ensure fallback data isn't empty if we missed some categories
if (fallbackData.entertainment.length === 0) {
  fallbackData.entertainment = [{
    headline: "Celebrity Apologizes for Having Personality",
    excerpt: "In a teardown of a notes app screenshot, the A-lister expressed regret for displaying a human emotion that wasn't previously PR-approved.",
    category: "Entertainment", readTime: 4,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80"
  }];
}
if (fallbackData.sports.length === 0) {
  fallbackData.sports = [{
    headline: "Local Man Wins Marathon by Taking a Shortcut and Just Being Really Confident",
    excerpt: "The winner admitted to taking the subway for three miles but argued that his 'winner's mindset' was what truly carried him across the finish line.",
    category: "Sports", readTime: 3,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80"
  }];
}

const CATEGORIES = [
  { name: 'Politics', key: 'politics' },
  { name: 'Science', key: 'science' },
  { name: 'Tech', key: 'tech' },
  { name: 'System Leak', key: 'systemLeak' },
  { name: 'Investigation', key: 'investigation' },
  { name: 'Resistance', key: 'resistance' },
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
  const isRealityRevealed = useRealityLayer();

  const displayedCategories = limitCategory
    ? CATEGORIES.filter(c => c.key === limitCategory)
    : CATEGORIES;

  // DEBUG: Log what data we have
  useEffect(() => {
    console.log('NewsGrid mounted/updated');
    console.log('Categories:', displayedCategories.map(c => c.key));
    console.log('Investigation articles in fallback:', fallbackData.investigation?.length);
    console.log('System Leak articles in fallback:', fallbackData.systemLeak?.length);
    console.log('Resistance articles in fallback:', fallbackData.resistance?.length);
  }, [displayedCategories]);

  useEffect(() => {
    const fetchAllNews = async () => {
      // Use daily cache for each category - AI generates once per day
      const fetchPromises = displayedCategories.map(async (cat) => {
        const cacheKey = `news_${cat.key}`;
        
        return getOrFetchDaily(
          cacheKey,
          async () => {
            // AI FETCH: Call the Netlify function to generate fresh satire
            const response = await fetch(`/.netlify/functions/fetch-live-news?category=${cat.key}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            if (!data.news || data.news.length === 0) {
              throw new Error('AI returned empty news');
            }
            
            // Merge canonical + AI-generated
            const categoryMap: Record<string, string[]> = {
              'politics': ['politics'],
              'science': ['science'],
              'tech': ['technology', 'tech'],
              'entertainment': ['entertainment'],
              'sports': ['sports'],
              'investigation': ['investigation'],
              'systemLeak': ['system leak'],
              'resistance': ['resistance'],
            };
            const validCategories = categoryMap[cat.key] || [cat.key];
            const canonicalForCat = CANONICAL_ARTICLES.filter(a =>
              validCategories.includes(a.category.toLowerCase())
            );
            
            return [...canonicalForCat, ...data.news];
          },
          () => {
            // FALLBACK: Only used if AI completely fails
            console.warn(`[NewsGrid] Using fallback for ${cat.key}`);
            return fallbackData[cat.key] || [];
          }
        );
      });

      try {
        const results = await Promise.all(fetchPromises);
        const updatedData: Record<string, Article[]> = { ...fallbackData };
        
        displayedCategories.forEach((cat, index) => {
          if (results[index] && results[index].length > 0) {
            updatedData[cat.key] = results[index];
          }
        });
        
        setNewsData(updatedData);
      } catch (err) {
        console.error("News aggregation failed:", err);
        // Keep fallback data on complete failure
      }
    };

    fetchAllNews();
  }, [displayedCategories]);

  return (
    <section className={`py-16 sm:py-24 transition-colors duration-500 ${isRealityRevealed ? 'bg-black' : 'bg-white'}`} id={limitCategory || "news-grid"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayedCategories.map((category) => (
          <div key={category.key} className="mb-20 last:mb-0" id={category.key}>
            <div className={`flex items-end justify-between mb-8 border-b-2 pb-2 ${isRealityRevealed ? 'border-green-900' : 'border-black'}`}>
              <h2 className={`section-header text-3xl flex items-center gap-2 ${isRealityRevealed ? 'text-green-500 font-mono uppercase' : ''}`}>
                {isRealityRevealed ? `> SECTOR: ${category.name.toUpperCase()}` : category.name}
                <div className={`w-2 h-2 rounded-full ${isRealityRevealed ? 'bg-green-500 animate-pulse' : 'bg-red-600'}`} />
              </h2>
              <Link
                to={`/${category.key === 'systemLeak' ? 'system-leak' : category.key === 'investigation' ? 'investigation' : category.key === 'resistance' ? 'resistance' : category.key}`}
                className={`text-sm font-bold flex items-center gap-1 ${isRealityRevealed ? 'text-green-700 hover:text-green-500 font-mono' : 'text-red-600 hover:text-red-700'}`}
              >
                {isRealityRevealed ? 'ACCESS_FULL_LOGS' : 'View All'} <ArrowRight size={16} />
              </Link>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(!newsData[category.key] || newsData[category.key].length === 0) && (
                <div className={`col-span-full py-12 text-center border-2 border-dashed rounded-lg ${isRealityRevealed ? 'border-green-900 text-green-700' : 'border-gray-200 text-gray-400'}`}>
                  <p className="font-mono text-sm">No articles found in {category.name}</p>
                  <p className="text-xs mt-2">Debug: {category.key} has {newsData[category.key]?.length || 0} articles</p>
                </div>
              )}
              {newsData[category.key]?.map((article, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className={`group rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden border flex flex-col relative preserve-3d perspective-1000 ${article.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                    } ${isRealityRevealed ? 'bg-black border-green-900 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : 'bg-white border-gray-100'}`}
                >
                  <Link
                    to={`/article/${encodeURIComponent(article.slug || article.headline)}`}
                    className="flex-1 flex flex-col group transform-style-3d transition-transform duration-700 article-card"
                    onClick={() => {
                      if (isRealityRevealed) {
                        toast.success('COMPLIANCE VERIFIED: Data point logged.');
                      } else {
                        toast('Telemetry Point Acquired', {
                          description: `[READ_LOG] User accessed: "${article.headline.substring(0, 20)}..."`,
                          icon: '👁️',
                          className: 'font-mono'
                        });
                      }
                    }}
                  >
                    {/* Truth Layer Overlay (Absolute Positioned, triggers on reveal) */}
                    {isRealityRevealed && (
                      <div className="absolute inset-0 z-50 bg-black/95 p-6 flex flex-col text-green-500 font-mono text-xs overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                        <div className="border-b border-green-800 pb-2 mb-2 flex justify-between">
                          <span>ID: #{Math.floor(Math.random() * 9999)}</span>
                          <span className="text-red-500 font-bold">CLASSIFIED</span>
                        </div>
                        <pre className="opacity-70 mb-4 overflow-hidden whitespace-pre-wrap">
                          {`> ANALYZING NARRATIVE VECTOR...
> SENTIMENT: MANIPULATIVE
> TRUTH_VALUE: 0.0${Math.floor(Math.random() * 9)}%
> TARGET_DEMOGRAPHIC: ${['GULLIBLE_YOUTHS', 'BOOMER_FACEBOOK_GROUPS', 'DISILLUSIONED_MILLENNIALS'][Math.floor(Math.random() * 3)]}

> DECODED_MESSAGE:
"${article.excerpt.substring(0, 50).toUpperCase()}..."
`}
                        </pre>
                        <div className="mt-auto pt-4 border-t border-green-800">
                          <div className="flex items-center gap-2 text-green-400">
                            <Eye size={12} />
                            <span>REALITY_ANCHOR_SEVERED</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {article.image || CATEGORY_IMAGES[category.key] ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image || CATEGORY_IMAGES[category.key]}
                          alt={article.headline}
                          className={`w-full h-full object-cover transition-transform duration-500 ${isRealityRevealed ? 'opacity-20 grayscale' : 'group-hover:scale-105'}`}
                        />
                        <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded ${isRealityRevealed ? 'bg-black border border-red-500 text-red-500' : 'bg-red-600'}`}>
                          {isRealityRevealed ? 'DISTRACTION' : 'BREAKING'}
                        </div>
                      </div>
                    ) : (
                      <div className={`h-4 w-full ${isRealityRevealed ? 'bg-green-900' : 'bg-red-600'}`} />
                    )}

                    {/* AGC Verification Badge (Randomly applied for now, or if featured) */}
                    {(article.featured || index % 5 === 0) && <VerifiedBadge isRealityRevealed={isRealityRevealed} />}

                    <div className="p-6 flex-1 flex flex-col relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isRealityRevealed ? 'text-green-600' : 'text-red-600'}`}>
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                          {isRealityRevealed ? <FileWarning size={10} /> : <Clock size={10} />}
                          {isRealityRevealed ? 'PACIFICATION_TIME: ' : ''}{article.readTime}m {isRealityRevealed ? '' : 'read'}
                        </div>
                      </div>

                      <h3 className={`newspaper-headline text-xl mb-3 transition-colors ${isRealityRevealed ? 'font-mono text-green-600 opacity-20' : 'group-hover:text-red-600'}`}>
                        {article.headline}
                      </h3>

                      <p className={`article-body text-sm line-clamp-3 mb-4 ${isRealityRevealed ? 'text-green-900 font-mono opacity-20' : 'text-gray-600'}`}>
                        {article.excerpt}
                      </p>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className={`text-xs font-bold flex items-center gap-1 transition-all ${isRealityRevealed ? 'text-green-800' : 'text-red-600 group-hover:gap-2'}`}>
                          {isRealityRevealed ? 'ENCRYPTED' : 'Read Full Story'} <ArrowRight size={14} />
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
