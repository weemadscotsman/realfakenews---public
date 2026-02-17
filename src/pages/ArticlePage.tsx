import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Printer, Flag, MessageSquare, User, Award } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { staticArticles } from '@/config/static-articles';
import { CANONICAL_ARTICLES } from '@/data/canonical-articles';
import { generateArticle as generateArticleGemini, fetchWorldState, logTelemetryEvent } from '@/lib/gemini';
import { QuestDecision } from '@/components/QuestDecision';
import { RansomNote } from '@/components/RansomNote';
import type { WorldState, StoryArc } from '@/lib/gemini';

interface ArticleState {
    headline: string;
    content: string;
    category: string;
    author: string;
    date: string;
    readTime: number;
    arcId?: string;
}

// Helper to find article in canonical data
const findCanonicalArticle = (slug: string): ArticleState | null => {
    // First try exact slug match
    const bySlug = CANONICAL_ARTICLES.find(a => a.slug === slug);
    if (bySlug) {
        return {
            headline: bySlug.headline,
            content: bySlug.content.replace(/\n/g, '<br/>'),
            category: bySlug.category,
            author: bySlug.author,
            date: bySlug.date,
            readTime: bySlug.readTime,
        };
    }
    // Try ID match (some canonical articles use ID as slug)
    const byId = CANONICAL_ARTICLES.find(a => a.id === slug);
    if (byId) {
        return {
            headline: byId.headline,
            content: byId.content.replace(/\n/g, '<br/>'),
            category: byId.category,
            author: byId.author,
            date: byId.date,
            readTime: byId.readTime,
        };
    }
    // Try headline match (for articles linked by headline)
    const decodedHeadline = decodeURIComponent(slug).replace(/-/g, ' ');
    const byHeadline = CANONICAL_ARTICLES.find(a => 
        a.headline.toLowerCase() === decodedHeadline.toLowerCase()
    );
    if (byHeadline) {
        return {
            headline: byHeadline.headline,
            content: byHeadline.content.replace(/\n/g, '<br/>'),
            category: byHeadline.category,
            author: byHeadline.author,
            date: byHeadline.date,
            readTime: byHeadline.readTime,
        };
    }
    return null;
};

const ArticlePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const initialHeadline = decodeURIComponent(slug || '').replace(/-/g, ' ');

    const [article, setArticle] = useState<ArticleState | null>(null);
    const [worldState, setWorldState] = useState<WorldState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticleData = async () => {
            setLoading(true);
            try {
                // 1. Fetch World State for context
                const ws = await fetchWorldState();
                setWorldState(ws);

                // 2. Fetch/Generate Article - Check sources in order:
                //    a) staticArticles (rich HTML content)
                //    b) CANONICAL_ARTICLES (markdown content)  
                //    c) AI Generation (fallback)
                let data: ArticleState;
                if (slug && staticArticles[slug]) {
                    data = staticArticles[slug];
                } else if (slug) {
                    const canonical = findCanonicalArticle(slug);
                    if (canonical) {
                        data = canonical;
                    } else {
                        const generated = await generateArticleGemini(initialHeadline);
                        data = generated as ArticleState;
                    }
                } else {
                    const generated = await generateArticleGemini(initialHeadline);
                    data = generated as ArticleState;
                }

                setArticle(data);

                // 3. Log Telemetry Engagement
                // Identify if this article headline matches an active story
                const activeArc = ws.activeStories?.find((s: StoryArc) =>
                    s.headline && (
                        data.headline.toLowerCase().includes(s.headline.toLowerCase()) ||
                        s.headline.toLowerCase().includes(data.headline.toLowerCase())
                    )
                );

                if (activeArc) {
                    await logTelemetryEvent({
                        type: 'engagement',
                        arcId: activeArc.id,
                        metadata: { headline: data.headline }
                    });
                }
            } catch (error) {
                console.error("Critical article/world-state fetch failure:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticleData();
    }, [initialHeadline, slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center text-center px-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                <h2 className="text-xl font-serif">Fabricating facts...</h2>
                <p className="text-gray-500">Our AI journalists are currently hallucinating sources.</p>
            </div>
        );
    }

    if (!article) return <RansomNote />;

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6 transition-colors font-medium">
                <ArrowLeft size={16} className="mr-1" /> Back to Reality
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide text-xs">
                        {article.category || 'Breaking'}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{article.date}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight mb-6 text-gray-900 border-b-4 border-black pb-6">
                    {article.headline}
                </h1>

                <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User size={20} className="text-gray-500" />
                        </div>
                        <div>
                            <div className="font-bold text-sm text-gray-900">{article.author}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Award size={10} /> Certified Misinformant
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success('Article link copied to clipboard!');
                            }}
                            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors" 
                            title="Share Article"
                        >
                            <Share2 size={18} />
                        </button>
                        <button 
                            onClick={() => window.print()}
                            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors" 
                            title="Print Article"
                        >
                            <Printer size={18} />
                        </button>
                        <button 
                            onClick={() => toast.error('Article reported! Our AI moderators are rolling their eyes at you.')}
                            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors" 
                            title="Report Article"
                        >
                            <Flag size={18} />
                        </button>
                    </div>
                </div>

                <div
                    className="prose prose-lg prose-red max-w-none mb-12 font-serif text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* --- Lore Quest Decisions --- */}
                {worldState?.activeStories && (
                    <QuestDecision
                        activeStories={worldState.activeStories}
                    />
                )}

                {/* Fake Engagement Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <MessageSquare size={18} />
                        Reader Reactions (142)
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                                JD
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm">JohnDoe42</span>
                                    <span className="text-xs text-gray-400">2 mins ago</span>
                                </div>
                                <p className="text-sm text-gray-600">This is obviously fake but also painfully true. I feel attacked.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs shrink-0">
                                AB
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm">AngryBot_v2</span>
                                    <span className="text-xs text-gray-400">5 mins ago</span>
                                </div>
                                <p className="text-sm text-gray-600">FAKE NEWS! The deep state roomba agenda is real!</p>
                            </div>
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => toast.info('More outrage loading... (just kidding, these are all fake comments)')}
                    >
                        Load More Outrage
                    </Button>
                </div>
            </motion.div>
        </article>
    );
};

export default ArticlePage;
