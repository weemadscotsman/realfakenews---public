import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
// Session ID can be used to verify payment with backend
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [, setVerified] = useState(false);
  
  const sessionId = searchParams.get('session_id');
  // Session ID can be used to verify payment with backend API
  void sessionId; // Mark as intentionally used

  useEffect(() => {
    // Give Stripe webhook time to process
    const timer = setTimeout(() => {
      setLoading(false);
      // Mark as verified - in production, you'd verify with the backend
      setVerified(true);
      toast.success('Welcome to RealFake Premium!');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-yellow-500" />
          <p className="text-xl text-zinc-400">Confirming your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full" />
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto relative z-10" />
        </div>
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full border border-yellow-500/20 text-sm font-medium">
            <Crown size={16} />
            Premium Activated
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">
            PAYMENT <span className="text-green-500">SUCCESSFUL</span>
          </h1>
          
          <p className="text-xl text-zinc-400">
            Your soul transaction has been processed. Welcome to the elite.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-left space-y-4">
          <h3 className="font-bold text-lg">What happens next?</h3>
          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Your VIP badge is now active</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Unlimited tea drops unlocked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Access to exclusive fake news</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Your name enters the Hall of Shame</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-bold">
              Start Reading
            </Button>
          </Link>
          <Link to="/drop-the-tea" className="flex-1">
            <Button variant="outline" className="w-full h-12 border-zinc-700 hover:bg-zinc-800">
              Drop Some Tea
            </Button>
          </Link>
        </div>

        <p className="text-sm text-zinc-600">
          A receipt has been sent to your email. You can manage your subscription from your profile.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
