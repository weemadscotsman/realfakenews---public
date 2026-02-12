import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useGameEconomy } from '@/hooks/useGameEconomy';
import { generateStoryArc } from '@/lib/openai-enhanced';
import { createStoryArc, getStoryArcs } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Sparkles, User, Calendar, Eye } from 'lucide-react';
import { toast } from 'sonner';
import type { StoryArc } from '@/types';

const StoryArcs = () => {
  const { user, isAuthenticated } = useAuth();
  const { addXp } = useGameEconomy();
  const [loading, setLoading] = useState(false);
  const [userArcs, setUserArcs] = useState<StoryArc[]>([]);
  const [publicArcs, setPublicArcs] = useState<StoryArc[]>([]);

  useEffect(() => {
    loadStoryArcs();
  }, [user?.id]);

  const loadStoryArcs = async () => {
    try {
      // Load public arcs
      const publicData = await getStoryArcs(undefined, 6);
      setPublicArcs(publicData);

      // Load user's arcs if authenticated
      if (user?.id) {
        const userData = await getStoryArcs(user.id, 10);
        setUserArcs(userData);
      }
    } catch (error) {
      console.error('Failed to load story arcs:', error);
    }
  };

  const generateNewArc = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Sign in to generate your story arc!');
      return;
    }

    setLoading(true);

    try {
      const result = await generateStoryArc(user, userArcs.map(a => a.headline));

      // Save to database
      const savedArc = await createStoryArc(user.id, result.headline, result.content);

      setUserArcs(prev => [savedArc, ...prev]);
      await addXp(50, 'Story Arc Created');

      toast.success('Your story arc has been published! +50 XP');
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate story. Try again!');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Subscriber Exclusive
          </div>
          <h2 className="newspaper-headline text-4xl md:text-5xl mb-4">
            Your Story Arc
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Become part of the news. Our AI writes satirical stories featuring
            you as an &quot;unnamed source.&quot; It&apos;s like being famous, but confusing.
          </p>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-12">
          <Button
            onClick={generateNewArc}
            className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6"
            disabled={loading || !isAuthenticated}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Writing your legend...
              </>
            ) : (
              <>
                <BookOpen className="mr-2" size={20} />
                Generate My Story Arc
              </>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            {isAuthenticated
              ? `You've appeared in ${userArcs.length} stories so far`
              : 'Sign in to unlock your story arc'
            }
          </p>
        </div>

        {/* User's Story Arcs */}
        {userArcs.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <User size={24} />
              Your Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userArcs.map((arc) => (
                <Link key={arc.id} to={`/article/${encodeURIComponent(arc.headline)}`}>
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-colors cursor-pointer group h-full">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded">
                        {arc.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(arc.published_at)}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors">{arc.headline}</h4>
                    <div className="text-gray-300 text-sm whitespace-pre-line line-clamp-4 mb-4">
                      {arc.content}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {arc.read_count} reads
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Public Story Arcs */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Community Story Arcs</h3>
          {publicArcs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>No story arcs yet. Be the first!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publicArcs.map((arc) => (
                <Link key={arc.id} to={`/article/${encodeURIComponent(arc.headline)}`}>
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group h-full">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                        {arc.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(arc.published_at)}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">{arc.headline}</h4>
                    <div className="text-gray-400 text-sm whitespace-pre-line line-clamp-4 mb-4">
                      {arc.content}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {arc.read_count.toLocaleString()} reads
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoryArcs;
