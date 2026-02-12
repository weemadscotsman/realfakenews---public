import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, MessageCircle, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const DARREN_STORY = {
  headline: "Human Falls Into Despair After Falling for Sentient Roomba Called Sheila",
  excerpt: "Witnesses say Sheila held him together. Now he’s a mess. So is the house. Residents of a quiet suburban street were left confused Tuesday after a local man suffered an emotional breakdown following the sudden departure of his vacuum cleaner.",
  category: "Human Interest",
  readTime: 8,
  image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?w=800&q=80",
};

const HeroSection: React.FC = () => {
  const [featuredArticles, setFeaturedArticles] = useState([
    DARREN_STORY,
    {
      headline: "Science Confirms: Your Opinion is Wrong and Here's Why",
      excerpt: "Revolutionary study finds that people who disagree with you are statistically more likely to be misinformed. Experts call it 'The Echo Chamber Effect.'",
      category: "Science",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    },
  ]);

  const [sideStories, setSideStories] = useState([
    {
      headline: "Celebrity Does Thing, World Somehow Survives",
      category: "Entertainment",
    },
    {
      headline: "Sports Team Wins/Loses Game, Fans Overreact Accordingly",
      category: "Sports",
    },
    {
      headline: "Local Man Has Opinion on Everything, Expertise on Nothing",
      category: "Opinion",
    },
    {
      headline: "Sponsored: This Product Will Definitely Fix Your Life",
      category: "Sponsored",
    },
  ]);

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchHeroNews = async () => {
      try {
        const res = await fetch('/.netlify/functions/fetch-live-news?category=latest');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const liveArticles = data.news || [];

        if (liveArticles.length > 0) {
          // Keep Darren as #1, use live for #2
          const newFeatured = [DARREN_STORY];
          if (liveArticles[0]) {
            newFeatured.push({
              headline: liveArticles[0].headline,
              excerpt: liveArticles[0].excerpt,
              category: liveArticles[0].category || 'Latest',
              readTime: liveArticles[0].readTime || 5,
              image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80", // Keep science image or generic
            });
          }
          setFeaturedArticles(newFeatured);

          // Use remaining live articles for side stories
          const newSideStories = liveArticles.slice(1, 5).map((a: any) => ({
            headline: a.headline,
            category: a.category || 'Trending',
          }));

          if (newSideStories.length > 0) {
            setSideStories(newSideStories);
          }
          setIsLive(true);
        }
      } catch (error) {
        console.error("Hero live fetch failed:", error);
      }
    };

    fetchHeroNews();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Bar */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 mb-8 py-4 border-y border-gray-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp size={16} className="text-red-600" />
          <span><strong>2.4M</strong> People Fooled</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MessageCircle size={16} className="text-red-600" />
          <span><strong>847K</strong> Tea Drops</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} className="text-red-600" />
          <span>{isLive ? <span className="text-green-600 font-bold animate-pulse">LIVE NOW</span> : <strong>156K</strong>} Subscribers</span>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to={`/article/${encodeURIComponent(featuredArticles[0].headline)}`}>
            <article className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={featuredArticles[0].image}
                  alt={featuredArticles[0].headline}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 section-header bg-white px-3 flex items-center gap-1">
                  {featuredArticles[0].category}
                  {featuredArticles[0].headline === DARREN_STORY.headline && <Sparkles size={12} className="text-amber-500" />}
                </span>
                <span className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-lg animate-pulse">
                  {featuredArticles[0].headline === DARREN_STORY.headline ? "TOP STORY" : "Read Full Story"}
                </span>
              </div>
              <h2 className="newspaper-headline text-3xl md:text-4xl mb-3 group-hover:text-red-600 transition-colors">
                {featuredArticles[0].headline}
              </h2>
              <p className="article-body text-gray-600 mb-4">
                {featuredArticles[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{featuredArticles[0].readTime} min read</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-red-600 font-medium group-hover:underline">
                  Continue Reading <ArrowRight size={14} />
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
          <article className="group cursor-pointer pb-6 border-b border-gray-200">
            <span className="section-header mb-2">{featuredArticles[1]?.category}</span>
            <h3 className="newspaper-headline text-xl mb-2 group-hover:text-red-600 transition-colors">
              {featuredArticles[1]?.headline}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {featuredArticles[1]?.excerpt}
            </p>
          </article>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 border-b border-gray-100 flex items-center justify-between">
              <span>Trending Now</span>
              {isLive && <span className="text-[10px] bg-red-600 text-white px-1.5 rounded animate-pulse">LIVE</span>}
            </h4>
            <div className="space-y-4">
              {sideStories.map((story, index) => (
                <motion.article
                  key={index}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-xs text-red-600 font-medium uppercase">
                    {story.category}
                  </span>
                  <h5 className="text-sm font-medium group-hover:text-red-600 transition-colors mt-1">
                    {story.headline}
                  </h5>
                </motion.article>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="bg-black text-white p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h4 className="font-bold text-lg mb-2">Think You Can Do Better?</h4>
            <p className="text-sm text-gray-300 mb-4">
              Submit your own fake headlines and let our AI roast you into oblivion.
            </p>
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => document.getElementById('drop-the-tea')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Drop The Tea
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

export default HeroSection;
