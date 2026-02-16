import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle, RefreshCw } from 'lucide-react';

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-zinc-500/10 blur-[100px] rounded-full" />
          <XCircle className="w-24 h-24 text-zinc-500 mx-auto relative z-10" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">
            PAYMENT <span className="text-zinc-500">CANCELLED</span>
          </h1>
          
          <p className="text-xl text-zinc-400">
            No money was taken. Your soul remains safely mortgaged to other corporations.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-400 mb-4">
            Changed your mind? That's okay. We still love you (in a purely transactional way).
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
            <span>Free tier still includes:</span>
          </div>
          <ul className="text-sm text-zinc-500 mt-2 space-y-1">
            <li>• Reading fake news</li>
            <li>• Judging other people</li>
            <li>• Questioning reality</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/membership" className="flex-1">
            <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-bold">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full h-12 border-zinc-700 hover:bg-zinc-800">
              Back to News
            </Button>
          </Link>
        </div>

        <p className="text-sm text-zinc-600">
          If you encountered a technical issue, please try again or contact support.
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
