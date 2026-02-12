import React from 'react';
import { ArrowRight, TrendingUp, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const featuredArticles = [
    {
      headline: "BREAKING: Government Announces Plan to Fix Everything by Doing Absolutely Nothing",
      excerpt: "In a stunning display of bureaucratic innovation, officials have discovered that ignoring problems makes them disappear. Early results show 0% improvement.",
      category: "Politics",
      readTime: 4,
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    },
    {
      headline: "Science Confirms: Your Opinion is Wrong and Here's Why",
      excerpt: "Revolutionary study finds that people who disagree with you are statistically more likely to be misinformed. Experts call it 'The Echo Chamber Effect.'",
      category: "Science",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    },
  ];

  const sideStories = [
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
  ];

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
          <span><strong>156K</strong> Subscribers</span>
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
          <article className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={featuredArticles[0].image}
                alt={featuredArticles[0].headline}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 section-header bg-white px-3">
                {featuredArticles[0].category}
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
              <span className="flex items-center gap-1 text-red-600 font-medium">
                Read Full Story <ArrowRight size={14} />
              </span>
            </div>
          </article>
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
            <span className="section-header mb-2">{featuredArticles[1].category}</span>
            <h3 className="newspaper-headline text-xl mb-2 group-hover:text-red-600 transition-colors">
              {featuredArticles[1].headline}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {featuredArticles[1].excerpt}
            </p>
          </article>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Trending Now</h4>
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
