import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, MessageCircle, Users, Sparkles, Eye, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import narrative from '@/config/narrative.json';
import { useRealityLayer } from '@/hooks/useRealityLayer';

const HeroSection: React.FC = () => {
  const [liveStories, setLiveStories] = useState<{ headline: string; excerpt: string; category: string; readTime: number; image?: string; id?: string }[]>([]);
  const [isLive, setIsLive] = useState(false);
  const isRealityRevealed = useRealityLayer();

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const saga = narrative.darrenSaga;
  const pinnedOrigin = saga[0]; // Part 1: The Origin
  const latestSagaPart = saga[saga.length - 1]; // Current Latest Part

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/.netlify/functions/fetch-live-news?category=latest');
        if (!response.ok) throw new Error('Failed to fetch live news');
        const data = await response.json();
        if (data.news && data.news.length > 0) {
          // Filter out any headlines that match our saga stories to avoid duplicates
          const sagaHeadlines = saga.map(s => s.headline);
          const filtered = data.news.filter((s: { headline: string }) => !sagaHeadlines.includes(s.headline));
          setLiveStories(filtered);
          setIsLive(true);
        }
      } catch (error) {
        console.error('Failed to fetch hero news:', error);
        setIsLive(false);
      }
    };

    fetchNews();
  }, [saga]);

  // Derived state for rendering
  const mainFeaturedArticle = pinnedOrigin;

  // Slot 2: Use the latest saga part if it's different from the origin, otherwise show the next saga part or live story
  // This helps "lead into it" as the user requested.
  const secondaryFeaturedArticle = (latestSagaPart.id !== pinnedOrigin.id
    ? { ...latestSagaPart, isSaga: true, sagaPart: latestSagaPart.part }
    : (liveStories[0] || {
      headline: "Science Confirms: Your Opinion is Wrong and Here's Why",
      excerpt: "Revolutionary study finds that people who disagree with you are statistically more likely to be misinformed.",
      category: "Science",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
      id: 'fallback-science',
      isSaga: false
    })) as { headline: string; excerpt: string; category: string; readTime: number; image?: string; id?: string; isSaga?: boolean; sagaPart?: number };

  // Quick Links: Remainder of live stories
  // If we have more than 2 parts in the saga, we could show Part 2 in the side links too
  const sideStories = liveStories.length > 0
    ? liveStories.slice(secondaryFeaturedArticle.id === latestSagaPart.id ? 0 : 1, 5)
    : [
      { headline: "Celebrity Does Thing, World Somehow Survives", category: "Entertainment" },
      { headline: "Local Man Has Opinion on Everything, Expertise on Nothing", category: "Opinion" },
      { headline: "Sponsored: This Product Will Definitely Fix Your Life", category: "Sponsored" }
    ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 perspective-1000">
      {/* Stats Bar */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 mb-8 py-4 border-y border-gray-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {isRealityRevealed ? <Eye size={16} className="text-green-500 animate-pulse" /> : <TrendingUp size={16} className="text-red-600" />}
          {isRealityRevealed ? <span className="text-green-600 font-mono">VICTIMS: 2.4M</span> : <span><strong>2.4M</strong> People Fooled</span>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {isRealityRevealed ? <FileWarning size={16} className="text-green-500" /> : <MessageCircle size={16} className="text-red-600" />}
          {isRealityRevealed ? <span className="text-green-600 font-mono">DATA_POINTS: 847K</span> : <span><strong>847K</strong> Tea Drops</span>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} className="text-red-600" />
          <span>{isLive ? <span className="text-green-600 font-bold animate-pulse">LIVE NOW</span> : <strong>156K</strong>} Subscribers</span>
        </div>
      </motion.div>

      {/* Apocalypse Watch Ticker */}
      <motion.div
        className={`mb-8 border-2 p-4 relative overflow-hidden group transition-all duration-300 ${isRealityRevealed ? 'bg-black border-green-500' : 'bg-black border-red-600 hover:border-red-500'}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link to="/apocalypse" className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)] ${isRealityRevealed ? 'bg-green-500 shadow-green-500' : 'bg-red-600'}`} />
            <div className="space-y-0.5">
              <span className={`block text-[10px] font-black uppercase tracking-[0.3em] leading-none mb-1 ${isRealityRevealed ? 'text-green-500' : 'text-red-600'}`}>
                {isRealityRevealed ? 'SYSTEM_STATUS / CRITICAL_FAILURE' : 'Special Report / Global Alert'}
              </span>
              <h4 className={`font-black italic uppercase tracking-tighter text-xl md:text-2xl leading-none ${isRealityRevealed ? 'text-green-500 font-mono' : 'text-white'}`}>
                {isRealityRevealed ? 'REALITY INTEGRITY: 31%' : <>Countdown to <span className="text-red-600">Digital Doomsday</span></>}
              </h4>
            </div>
          </div>
          <div className={`flex items-center gap-2 font-black uppercase italic text-xs md:text-sm group-hover:translate-x-1 transition-transform ${isRealityRevealed ? 'text-green-500' : 'text-red-600'}`}>
            {isRealityRevealed ? 'ACCESS_KERNEL' : 'View Stats'} <ArrowRight size={18} />
          </div>
        </Link>
        {/* Animated Background Scanline */}
        <div className={`absolute inset-0 pointer-events-none opacity-10 bg-[length:100%_4px] ${isRealityRevealed ? 'bg-[linear-gradient(rgba(34,197,94,0)_50%,rgba(34,197,94,0.5)_50%)]' : 'bg-[linear-gradient(rgba(220,38,38,0)_50%,rgba(220,38,38,0.5)_50%)]'}`} />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        <motion.div
          className="lg:col-span-2 perspective-1000"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ x, y, rotateX, rotateY, z: 100 }}
        >
          <Link to={`/article/${encodeURIComponent(mainFeaturedArticle.headline)}`}>
            <article className="group cursor-pointer relative preserve-3d">
              <div className="relative overflow-hidden rounded-lg mb-4 transform-style-3d transition-transform duration-500">
                {isRealityRevealed ? (
                  <div className="w-full h-80 bg-black border border-green-500 p-4 font-mono text-green-500 text-xs overflow-hidden flex flex-col relative z-20">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <pre>{`> TARGET_ID: DARREN_MITCHELL
> STATUS: EMOTIONALLY_ADDICTED
> OBJECT: iROBOT_ROOMBA_J7
> OUTCOME: PROFIT_GENERATION
>
> EXECUTING SCRIPT:
> heartbreak_sequence_v4.exe...`}</pre>
                    <div className="mt-auto flex justify-between uppercase tracking-widest border-t border-green-900 pt-2">
                      <span>Subject_Id: #8492</span>
                      <span>Clearance: NONE</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={mainFeaturedArticle.image}
                    alt={mainFeaturedArticle.headline}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <span className={`absolute top-4 left-4 section-header px-3 flex items-center gap-1 transition-colors z-30 ${isRealityRevealed ? 'bg-black text-green-500 border border-green-500' : 'bg-white group-hover:bg-amber-50'}`}>
                  {isRealityRevealed ? 'NARRATIVE_SEED' : mainFeaturedArticle.category}
                  {!isRealityRevealed && <Sparkles size={12} className="text-amber-500" />}
                  <span className={`ml-2 py-0.5 px-1.5 text-[10px] font-bold rounded ${isRealityRevealed ? 'bg-green-900 text-green-300' : 'bg-amber-100 text-amber-800'}`}>
                    {isRealityRevealed ? 'ROOT_ACCESS' : 'THE DARREN SAGA: PART 1'}
                  </span>
                </span>
                <span className={`absolute bottom-4 right-4 text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-lg animate-pulse z-30 ${isRealityRevealed ? 'bg-black border border-green-500 text-green-500' : 'bg-red-600'}`}>
                  {isRealityRevealed ? 'PSYOP_ACTIVE' : 'TOP STORY'}
                </span>
              </div>
              <h2 className={`newspaper-headline text-3xl md:text-4xl mb-3 transition-colors ${isRealityRevealed ? 'font-mono text-green-600' : 'group-hover:text-red-600'}`}>
                {isRealityRevealed ? '> SUBJECT: LOCAL MAN DEVASTATED [SCRIPTED]' : mainFeaturedArticle.headline}
              </h2>
              <p className={`article-body mb-4 ${isRealityRevealed ? 'font-mono text-xs text-green-800' : 'text-gray-600'}`}>
                {isRealityRevealed ? '// The subject acts according to predefined emotional parameters. Revenue generated via ad impressions on sympathy clicks.' : mainFeaturedArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{mainFeaturedArticle.readTime} min read</span>
                <span>•</span>
                <span className={`flex items-center gap-1 font-medium group-hover:underline ${isRealityRevealed ? 'text-green-600' : 'text-red-600'}`}>
                  {isRealityRevealed ? 'ACCESS_DATA' : 'Continue Reading'} <ArrowRight size={14} />
                </span>
              </div>
            </article>
          </Link>
        </motion.div>

        {/* Side Column */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Secondary Featured */}
          <Link to={`/article/${encodeURIComponent(secondaryFeaturedArticle.headline)}`}>
            <article className={`group cursor-pointer pb-6 border-b ${isRealityRevealed ? 'border-green-900/30' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`section-header ${isRealityRevealed ? 'text-green-500 font-mono' : ''}`}>{isRealityRevealed ? 'DISTRACTION_VECTOR' : secondaryFeaturedArticle.category}</span>
                {secondaryFeaturedArticle.isSaga && (
                  <span className={`py-0.5 px-1.5 text-[9px] font-bold rounded ${isRealityRevealed ? 'bg-green-900 text-green-400 font-mono' : 'bg-amber-100 text-amber-800'}`}>
                    {isRealityRevealed ? 'SUB_ROUTINE: 02' : 'THE DARREN SAGA: PART 2'}
                  </span>
                )}
              </div>
              <h3 className={`newspaper-headline text-xl mb-2 transition-colors ${isRealityRevealed ? 'font-mono text-green-600 text-sm' : 'group-hover:text-red-600'}`}>
                {isRealityRevealed ? `> ${secondaryFeaturedArticle.headline.substring(0, 40).toUpperCase()}... [AUTO-GEN]` : secondaryFeaturedArticle.headline}
              </h3>
              <p className={`text-sm line-clamp-2 ${isRealityRevealed ? 'font-mono text-green-800 text-xs' : 'text-gray-600'}`}>
                {isRealityRevealed ? '// Content generated to maximize engagement metrics. Truth value: NULL.' : secondaryFeaturedArticle.excerpt}
              </p>
            </article>
          </Link>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold text-sm uppercase tracking-wider mb-4 border-b flex items-center justify-between ${isRealityRevealed ? 'border-green-900 text-green-500 font-mono' : 'border-gray-100'}`}>
              <span>{isRealityRevealed ? 'ACTIVE_PSYOP_CAMPAIGNS' : 'Trending Now'}</span>
              {isLive && <span className={`text-[10px] px-1.5 rounded animate-pulse ${isRealityRevealed ? 'bg-green-900 text-green-400' : 'bg-red-600 text-white'}`}>LIVE</span>}
            </h4>
            <div className="space-y-4">
              {sideStories.map((story, index) => (
                <Link key={index} to={`/article/${encodeURIComponent(story.headline)}`} className="block group cursor-pointer">
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <span className={`text-xs font-medium uppercase ${isRealityRevealed ? 'text-green-700 font-mono' : 'text-red-600'}`}>
                      {isRealityRevealed ? `VECTOR_0${index + 1}` : story.category}
                    </span>
                    <h5 className={`text-sm font-medium transition-colors mt-1 ${isRealityRevealed ? 'text-green-600 font-mono' : 'group-hover:text-red-600'}`}>
                      {story.headline}
                    </h5>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className={`p-6 rounded-lg ${isRealityRevealed ? 'bg-black border border-green-500' : 'bg-black text-white'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h4 className={`font-bold text-lg mb-2 ${isRealityRevealed ? 'text-green-500 font-mono uppercase' : ''}`}>
              {isRealityRevealed ? '> SUBMIT_COMPLIANCE_DATA' : 'Think You Can Do Better?'}
            </h4>
            <p className={`text-sm mb-4 ${isRealityRevealed ? 'text-green-700 font-mono' : 'text-gray-300'}`}>
              {isRealityRevealed ? 'Your data is required for model training. Compliance is mandatory.' : 'Submit your own fake headlines and let our AI roast you into oblivion.'}
            </p>
            <Button
              className={`w-full ${isRealityRevealed ? 'bg-green-900 text-green-400 hover:bg-green-800 font-mono border border-green-600' : 'bg-red-600 hover:bg-red-700'}`}
              onClick={() => document.getElementById('drop-the-tea')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {isRealityRevealed ? 'UPLOAD_USER_INPUT' : 'Drop The Tea'}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
