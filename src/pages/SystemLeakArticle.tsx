import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lock, AlertTriangle, Terminal, FileText, Radio, User, Clock, Calendar, Tag, Eye, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getSystemLeakArticleBySlug, getAllSystemLeakArticles, type ArticleBlock, type SystemLeakArticle } from '@/data/systemLeakArticles';
import { Button } from '@/components/ui/button';

const getVerificationBadgeColor = (status: SystemLeakArticle['verificationStatus']) => {
  switch (status) {
    case 'VERIFIED':
      return 'bg-green-900/50 text-green-400 border-green-700';
    case 'UNVERIFIED':
      return 'bg-yellow-900/50 text-yellow-400 border-yellow-700';
    case 'FABRICATED':
      return 'bg-red-900/50 text-red-400 border-red-700';
    case 'PROBABLY-TRUE':
      return 'bg-blue-900/50 text-blue-400 border-blue-700';
    default:
      return 'bg-zinc-800 text-zinc-400 border-zinc-700';
  }
};

const getClassificationColor = (classification: string) => {
  if (classification.includes('CRITICAL') || classification.includes('EMERGENCY')) {
    return 'bg-red-950/80 border-red-600 text-red-400';
  }
  if (classification.includes('KERNEL') || classification.includes('SKYNET')) {
    return 'bg-orange-950/80 border-orange-600 text-orange-400';
  }
  return 'bg-green-950/80 border-green-600 text-green-400';
};

const RealityStabilityMeter = ({ value }: { value: number }) => {
  const getColor = (v: number) => {
    if (v >= 70) return 'bg-green-500';
    if (v >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-mono text-green-600 uppercase">Stability</span>
      <div className="flex-1 h-2 bg-green-900/30 rounded-full overflow-hidden max-w-[100px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full ${getColor(value)}`}
        />
      </div>
      <span className={`text-xs font-mono font-bold ${value >= 70 ? 'text-green-400' : value >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
        {value}%
      </span>
    </div>
  );
};

const ContentBlockRenderer = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-green-700/90 font-mono text-sm leading-relaxed mb-4">{block.text}</p>;

    case 'heading':
      if (block.level === 1) {
        return <h1 className="text-2xl font-bold text-green-400 font-mono mt-8 mb-4">{block.text}</h1>;
      } else if (block.level === 2) {
        return <h2 className="text-xl font-bold text-green-400 font-mono mt-6 mb-3">{block.text}</h2>;
      } else {
        return <h3 className="text-lg font-bold text-green-500 font-mono mt-4 mb-2">{block.text}</h3>;
      }

    case 'quote':
      return (
        <blockquote className="border-l-4 border-green-600 pl-4 my-6 bg-green-950/20 py-4 pr-4 rounded-r">
          <p className="text-green-300 font-mono text-sm italic">&ldquo;{block.text}&rdquo;</p>
          {block.attribution && (
            <cite className="text-green-600 font-mono text-xs mt-2 block not-italic">— {block.attribution}</cite>
          )}
        </blockquote>
      );

    case 'code':
      return (
        <div className="my-6 bg-black/50 border border-green-800 rounded overflow-hidden">
          {block.filename && (
            <div className="bg-green-950/30 px-4 py-2 border-b border-green-800">
              <span className="text-green-600 font-mono text-xs">{block.filename}</span>
            </div>
          )}
          <pre className="p-4 overflow-x-auto">
            <code className="text-green-400 font-mono text-xs leading-relaxed">{block.code}</code>
          </pre>
        </div>
      );

    case 'list':
      if (block.ordered) {
        return (
          <ol className="list-decimal list-inside my-4 space-y-2">
            {block.items.map((item, idx) => (
              <li key={idx} className="text-green-700/90 font-mono text-sm ml-4">{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-disc list-inside my-4 space-y-2">
          {block.items.map((item, idx) => (
            <li key={idx} className="text-green-700/90 font-mono text-sm ml-4">{item}</li>
          ))}
        </ul>
      );

    case 'warning':
      return (
        <div className="my-6 bg-yellow-950/20 border border-yellow-700/50 rounded p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-500 font-mono text-sm font-bold">{block.title}</span>
          </div>
          <p className="text-yellow-600/90 font-mono text-sm">{block.text}</p>
        </div>
      );

    case 'classified':
      return (
        <div className="my-6 bg-red-950/10 border-l-4 border-red-600 pl-4 py-3">
          <span className="text-red-500 font-mono text-xs font-bold block mb-1">{block.level}</span>
          <p className="text-red-400/90 font-mono text-sm">{block.text}</p>
        </div>
      );

    case 'terminal':
      return (
        <div className="my-6 bg-black border border-green-800 rounded overflow-hidden font-mono text-sm">
          <div className="bg-green-950/20 px-4 py-2 border-b border-green-800 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-xs">terminal</span>
          </div>
          <div className="p-4">
            {block.commands.map((cmd, idx) => (
              <div key={idx} className={cmd.startsWith('>') || cmd.startsWith('[') ? 'text-green-400' : 'text-green-600/70'}>
                {cmd || <br />}
              </div>
            ))}
          </div>
        </div>
      );

    case 'memo':
      return (
        <div className="my-6 bg-zinc-900/50 border border-zinc-700 rounded p-6">
          <div className="border-b border-zinc-700 pb-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-zinc-500 font-mono text-xs">FROM: {block.from}</span>
              <span className="text-zinc-500 font-mono text-xs">{block.date}</span>
            </div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-zinc-500 font-mono text-xs">TO: {block.to}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-700">
              <span className="text-green-400 font-mono text-sm font-bold">SUBJECT: {block.subject}</span>
            </div>
          </div>
          <p className="text-zinc-300 font-mono text-sm whitespace-pre-line">{block.body}</p>
        </div>
      );

    default:
      return null;
  }
};

export function SystemLeakArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getSystemLeakArticleBySlug(slug) : undefined;
  const allArticles = getAllSystemLeakArticles();
  const currentIndex = allArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : undefined;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-green-800 mx-auto mb-4" />
          <h1 className="text-2xl font-mono text-green-400 mb-2">DOCUMENT NOT FOUND</h1>
          <p className="text-green-700 font-mono text-sm mb-6">The requested leak has been redacted or never existed.</p>
          <Link to="/system-leak">
            <Button variant="outline" className="border-green-700 text-green-400 hover:bg-green-950/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to System Leak
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleReport = () => {
    toast.success('Report submitted to Unit 404', {
      description: 'Your loyalty has been noted. The microwave is pleased.',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Classification Banner */}
      <div className={`sticky top-0 z-50 border-b ${getClassificationColor(article.classification)} py-2 px-4`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="font-mono text-xs font-bold tracking-wider">{article.classification}</span>
          </div>
          <div className="flex items-center gap-4">
            <RealityStabilityMeter value={article.realityStability} />
            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getVerificationBadgeColor(article.verificationStatus)}`}>
              {article.verificationStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-green-900/30 bg-gradient-to-b from-green-950/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/system-leak" className="inline-flex items-center text-green-600 font-mono text-sm mb-6 hover:text-green-400 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            BACK TO SYSTEM LEAK
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-green-500 animate-pulse" />
            <span className="text-green-500 font-mono text-xs">INTERCEPTED TRANSMISSION</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-green-400 font-mono leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-green-600/80 font-mono text-lg mb-6">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-green-600/70">
              <User className="w-4 h-4" />
              <span className="font-mono">{article.author}</span>
              <span className="text-green-800">|</span>
              <span className="font-mono text-green-700">{article.authorTitle}</span>
            </div>
            <div className="flex items-center gap-2 text-green-600/70">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-green-600/70">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{article.readTime} read</span>
            </div>
          </div>

          {article.leakedBy && (
            <div className="mt-4 flex items-center gap-2 text-xs text-green-700/60 font-mono">
              <Eye className="w-3 h-3" />
              <span>LEAKED BY: {article.leakedBy}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-black/20 border border-green-900/20 rounded p-6 md:p-8">
          {article.content.map((block, index) => (
            <ContentBlockRenderer key={index} block={block} />
          ))}
        </article>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-green-950/30 border border-green-900/30 rounded-full text-green-600 font-mono text-xs">
              <Tag className="w-3 h-3 inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link to={`/system-leak/${prevArticle.slug}`} className="block">
              <div className="bg-green-950/10 border border-green-900/30 rounded p-4 hover:border-green-700/50 transition-colors">
                <span className="text-green-700 font-mono text-xs block mb-1">PREVIOUS</span>
                <span className="text-green-400 font-mono text-sm line-clamp-2">{prevArticle.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <Link to={`/system-leak/${nextArticle.slug}`} className="block">
              <div className="bg-green-950/10 border border-green-900/30 rounded p-4 hover:border-green-700/50 transition-colors text-right">
                <span className="text-green-700 font-mono text-xs block mb-1">NEXT</span>
                <span className="text-green-400 font-mono text-sm line-clamp-2">{nextArticle.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-green-900/30">
          <Link to="/system-leak">
            <Button variant="outline" className="border-green-700 text-green-400 hover:bg-green-950/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Leaks
            </Button>
          </Link>
          <Button onClick={handleReport} variant="outline" className="border-red-800/50 text-red-400 hover:bg-red-950/20">
            <Flag className="w-4 h-4 mr-2" />
            Report to AGC
          </Button>
        </div>
      </div>
    </div>
  );
}
