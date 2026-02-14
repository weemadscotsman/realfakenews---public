import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGameEconomy } from '@/hooks/useGameEconomy';
import { generateRoast, type RoastStyle } from '@/lib/content-engine';
import { ROAST_STYLE_METADATA } from '@/lib/roast-constants';
import {
  createTeaDrop,
  getTeaDrops,
  getTodayChallenge,
  getChallengeEntries,
  getActiveBattles,
  likeTeaDrop
} from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Loader2, Flame, ThumbsUp, Share2, MessageSquare, Zap,
  AlertTriangle, Trophy, Swords, Clock, Crown, Sparkles,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import type { TeaDrop, DailyChallenge, RoastBattle } from '@/types';

const ROAST_STYLE_IDS = Object.keys(ROAST_STYLE_METADATA) as RoastStyle[];

interface DropTheTeaProps {
  onLoginRequired: () => void;
}

const DropTheTea = ({ onLoginRequired }: DropTheTeaProps) => {
  const { user, isAuthenticated } = useAuth();
  const { roastTokens, spendTokens, addXp, level, title, xpProgress, claimDailyReward } = useGameEconomy();

  const [headline, setHeadline] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<RoastStyle>('default');
  const [loading, setLoading] = useState(false);
  const [currentRoast, setCurrentRoast] = useState<TeaDrop | null>(null);
  const [recentDrops, setRecentDrops] = useState<TeaDrop[]>([]);
  const [activeTab, setActiveTab] = useState('roast');

  // Challenge state
  const [todayChallenge, setTodayChallenge] = useState<DailyChallenge | null>(null);
  const [challengeEntries, setChallengeEntries] = useState<TeaDrop[]>([]);
  const [hasEnteredChallenge, setHasEnteredChallenge] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Battle state
  const [activeBattles, setActiveBattles] = useState<RoastBattle[]>([]);

  // Load initial data
  useEffect(() => {
    loadTeaDrops();
    loadChallenge();
    loadBattles();
  }, []);

  // Countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadTeaDrops = async () => {
    try {
      const drops = await getTeaDrops(12);
      setRecentDrops(drops);
    } catch (error) {
      console.error('Failed to load tea drops:', error);
    }
  };

  const loadChallenge = async () => {
    try {
      const challenge = await getTodayChallenge();
      setTodayChallenge(challenge);

      if (challenge) {
        const entries = await getChallengeEntries(challenge.id);
        setChallengeEntries(entries);

        // Check if user has entered
        if (user?.id) {
          setHasEnteredChallenge(entries.some(e => e.user_id === user.id));
        }
      }
    } catch (error) {
      console.error('Failed to load challenge:', error);
    }
  };

  const loadBattles = async () => {
    try {
      const battles = await getActiveBattles();
      setActiveBattles(battles);
    } catch (error) {
      console.error('Failed to load battles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }

    if (!headline.trim()) {
      toast.error('Enter a headline first, genius');
      return;
    }

    const styleCost = ROAST_STYLE_METADATA[selectedStyle]?.cost || 1;

    // Billing Logic (Unlimited for VIPs)
    if (!user?.is_subscribed) {
      const success = await spendTokens(styleCost, `Roast (${selectedStyle})`);
      if (!success) return;
    }

    setLoading(true);

    try {
      const result = await generateRoast(headline, user!.username, selectedStyle);

      // Save to database
      const savedDrop = await createTeaDrop({
        user_id: user!.id,
        username: user!.username,
        headline,
        roast: result.roast,
        roast_intensity: result.intensity,
        roast_style: selectedStyle,
        is_challenge_entry: activeTab === 'challenge' && todayChallenge ? true : false,
        challenge_id: activeTab === 'challenge' && todayChallenge ? todayChallenge.id : undefined,
      } as any);

      setCurrentRoast(savedDrop);
      setRecentDrops(prev => [savedDrop, ...prev]);
      setHeadline('');

      await addXp(styleCost * 10, 'Tea Drop');

      toast.success(user?.is_subscribed ? `Roast delivered! (VIP Unlimited)` : `Roast delivered! +${styleCost * 10} XP`);

      if (activeTab === 'challenge' && todayChallenge) {
        setHasEnteredChallenge(true);
        loadChallenge();
      }
    } catch (error) {
      toast.error('Failed to save roast');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (dropId: string) => {
    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }

    try {
      await likeTeaDrop(dropId, user!.id);
      // Update local state
      setRecentDrops(prev => prev.map(d =>
        d.id === dropId ? { ...d, likes: d.likes + 1 } : d
      ));
      toast.success('Liked!');
    } catch (error) {
      toast.error('Already liked');
    }
  };

  const handleClaimDaily = async () => {
    const result = await claimDailyReward();
    if (result) {
      toast.success(`Daily reward claimed! ${result.tokens} tokens`);
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'mild': return 'text-green-600 bg-green-50';
      case 'spicy': return 'text-orange-600 bg-orange-50';
      case 'nuclear': return 'text-red-600 bg-red-50';
      case 'apocalyptic': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section id="drop-the-tea" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap size={16} />
            AI-Powered Roast Engine v2.0
          </div>
          <h2 className="newspaper-headline text-4xl md:text-5xl mb-4">
            Drop The Tea
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Submit your fake headline. Our AI will absolutely demolish you.
          </p>
        </div>

        {/* User Stats Bar */}
        {isAuthenticated && user && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {level}
                </div>
                <div>
                  <p className="font-bold">{title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Progress value={xpProgress} className="w-24 h-2" />
                    <span>{Math.round(xpProgress)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{roastTokens}</p>
                  <p className="text-xs text-gray-500">Roast Tokens</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{user.streak_days || 0}</p>
                  <p className="text-xs text-gray-500">Day Streak</p>
                </div>
                <Button size="sm" onClick={handleClaimDaily}>
                  <Crown size={16} className="mr-1" />
                  Daily
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Challenge Banner */}
        {todayChallenge && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy size={20} />
                  <span className="font-bold">Daily Challenge</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                    {timeRemaining} left
                  </span>
                </div>
                <p className="text-lg font-bold">{todayChallenge.theme}</p>
                <p className="text-white/80 text-sm">{todayChallenge.description}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{todayChallenge.prize_tokens}</p>
                <p className="text-sm text-white/80">tokens prize</p>
                <p className="text-xs text-white/60">{todayChallenge.participants_count} entered</p>
              </div>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="roast">
              <Flame size={16} className="mr-2" />
              Roast
            </TabsTrigger>
            <TabsTrigger value="challenge">
              <Trophy size={16} className="mr-2" />
              Challenge
            </TabsTrigger>
            <TabsTrigger value="battles">
              <Swords size={16} className="mr-2" />
              Battles
            </TabsTrigger>
          </TabsList>

          {/* Roast Tab */}
          <TabsContent value="roast">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Textarea
                      placeholder={isAuthenticated
                        ? "Enter your fake news headline..."
                        : "Sign in to drop tea and get roasted..."
                      }
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="min-h-[120px] text-lg resize-none"
                      disabled={!isAuthenticated || loading}
                      maxLength={200}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {headline.length}/200
                    </div>
                  </div>

                  {/* Roast Style Selector */}
                  <div className="flex flex-wrap gap-2">
                    {ROAST_STYLE_IDS.map((id) => {
                      const style = ROAST_STYLE_METADATA[id];
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setSelectedStyle(id)}
                          disabled={!isAuthenticated}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${selectedStyle === id
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-gray-300'
                            } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span>{style.icon}</span>
                          <span className="text-sm font-medium">{style.name}</span>
                          <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                            {style.cost}🪙
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary text-lg py-6"
                    disabled={loading || !isAuthenticated}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        The AI is judging you...
                      </>
                    ) : !isAuthenticated ? (
                      'Sign In to Drop Tea'
                    ) : (
                      <>
                        <Flame className="mr-2" size={20} />
                        Roast Me ({ROAST_STYLE_METADATA[selectedStyle]?.cost}🪙)
                      </>
                    )}
                  </Button>
                </form>

                {/* Current Roast Result */}
                {currentRoast && (
                  <div className="mt-8">
                    <div className={`tea-drop-card rounded-xl p-6 roast-${currentRoast.roast_intensity}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getIntensityColor(currentRoast.roast_intensity)}`}>
                            <AlertTriangle size={14} />
                            {currentRoast.roast_intensity?.toUpperCase()}
                          </span>
                          {currentRoast.roast_style && currentRoast.roast_style !== 'default' && (
                            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                              {ROAST_STYLE_METADATA[currentRoast.roast_style as RoastStyle]?.icon} {currentRoast.roast_style}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">Just now</span>
                      </div>

                      <blockquote className="text-lg italic text-gray-800 mb-4">
                        "{currentRoast.headline}"
                      </blockquote>

                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-line">
                          {currentRoast.roast}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Token Shop */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Sparkles size={18} />
                    Need More Tokens?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">10 Tokens</p>
                        <p className="text-sm text-gray-500">Quick roast fix</p>
                      </div>
                      <Button size="sm" variant="outline">$0.99</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium">50 Tokens</p>
                        <p className="text-sm text-yellow-600">Best value</p>
                      </div>
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">$3.99</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Drops */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Recent Carnage</h3>
              {recentDrops.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Flame size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No roasts yet. Be the first!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentDrops.map((drop) => (
                    <div key={drop.id} className={`tea-drop-card rounded-xl p-5 roast-${drop.roast_intensity || 'mild'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getIntensityColor(drop.roast_intensity || 'mild')}`}>
                            {drop.roast_intensity || 'mild'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">@{drop.username}</span>
                      </div>

                      <p className="text-sm font-medium text-gray-800 mb-3 line-clamp-2">
                        "{drop.headline}"
                      </p>

                      <p className="text-sm text-gray-600 line-clamp-4 mb-4">
                        {drop.roast}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button
                          onClick={() => handleLike(drop.id)}
                          className="flex items-center gap-1 hover:text-red-600 transition-colors"
                        >
                          <ThumbsUp size={14} />
                          {drop.likes}
                        </button>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={14} />
                          {drop.comments_count || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 size={14} />
                          {drop.shares_count || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Challenge Tab */}
          <TabsContent value="challenge">
            {todayChallenge ? (
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">{todayChallenge.theme}</h3>
                      <p className="text-gray-600">{todayChallenge.description}</p>
                    </div>
                    <div className="text-center">
                      <Clock size={32} className="mx-auto text-purple-600 mb-2" />
                      <p className="text-2xl font-mono font-bold">{timeRemaining}</p>
                      <p className="text-sm text-gray-500">remaining</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 mb-6">
                    <p className="font-medium mb-2">Example Headlines:</p>
                    <ul className="space-y-2">
                      {todayChallenge.example_headlines?.map((example: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                          <Sparkles size={14} className="text-purple-500" />
                          "{example}"
                        </li>
                      ))}
                    </ul>
                  </div>

                  {hasEnteredChallenge ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <Crown size={32} className="mx-auto text-green-600 mb-2" />
                      <p className="font-bold text-green-800">You've entered!</p>
                      <p className="text-green-600">Vote for your favorites below</p>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 py-6"
                      onClick={() => setActiveTab('roast')}
                    >
                      <Trophy className="mr-2" size={20} />
                      Enter Challenge ({todayChallenge.prize_tokens}🪙 prize)
                    </Button>
                  )}
                </div>

                {/* Challenge Entries */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Today's Entries</h3>
                  {challengeEntries.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Trophy size={48} className="mx-auto mb-4 opacity-30" />
                      <p>No entries yet. Be the first!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {challengeEntries.map((entry) => (
                        <div key={entry.id} className="bg-white rounded-xl p-5 border border-gray-200">
                          <p className="font-medium mb-2">"{entry.headline}"</p>
                          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{entry.roast}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">@{entry.username}</span>
                            <button
                              onClick={() => handleLike(entry.id)}
                              className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                            >
                              <ThumbsUp size={16} />
                              {entry.likes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Trophy size={48} className="mx-auto mb-4 opacity-30" />
                <p>Loading today's challenge...</p>
              </div>
            )}
          </TabsContent>

          {/* Battles Tab */}
          <TabsContent value="battles">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Swords size={24} />
                  Live Roast Battles
                </h3>
                <Button variant="outline" size="sm" disabled>
                  <TrendingUp size={16} className="mr-2" />
                  Coming Soon
                </Button>
              </div>

              {activeBattles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Swords size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No active battles. Challenge someone!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {activeBattles.map((battle) => (
                    <div key={battle.id} className="bg-white rounded-xl border-2 border-red-100 overflow-hidden">
                      <div className="bg-red-50 px-4 py-2 flex items-center justify-between">
                        <span className="font-bold text-red-800 flex items-center gap-2">
                          <Swords size={16} />
                          Roast Battle
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${battle.status === 'voting' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {battle.status === 'voting' ? 'Voting Open' : 'In Progress'}
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-gray-50">
                            <p className="font-bold mb-2">@{battle.challenger_username}</p>
                            {battle.challenger_headline ? (
                              <>
                                <p className="text-sm italic mb-2">"{battle.challenger_headline}"</p>
                                <p className="text-xs text-gray-600 line-clamp-3">{battle.challenger_roast}</p>
                              </>
                            ) : (
                              <p className="text-sm text-gray-400 italic">Waiting...</p>
                            )}
                            <div className="mt-3 text-lg font-bold">{battle.challenger_votes}</div>
                          </div>

                          <div className="p-4 rounded-lg bg-gray-50">
                            <p className="font-bold mb-2">@{battle.opponent_username}</p>
                            {battle.opponent_headline ? (
                              <>
                                <p className="text-sm italic mb-2">"{battle.opponent_headline}"</p>
                                <p className="text-xs text-gray-600 line-clamp-3">{battle.opponent_roast}</p>
                              </>
                            ) : (
                              <p className="text-sm text-gray-400 italic">Waiting...</p>
                            )}
                            <div className="mt-3 text-lg font-bold">{battle.opponent_votes}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DropTheTea;
