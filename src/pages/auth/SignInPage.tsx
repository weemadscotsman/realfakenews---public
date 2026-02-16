import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { GlitchText } from '@/components/GlitchText';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/profile';
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      const from = (location.state as any)?.from?.pathname || '/profile';
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #00ff41 2px,
            #00ff41 4px
          )`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30 mb-4"
          >
            <LogIn className="w-8 h-8 text-[#00ff41]" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            <GlitchText text="CLEARANCE REQUIRED" />
          </h1>
          <p className="text-gray-400">
            Enter your credentials to access the truth
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#111] border border-[#00ff41]/20 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-mono text-[#00ff41] mb-2">
                EMAIL_ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-[#00ff41] focus:outline-none transition-colors font-mono"
                  placeholder="agent@rfns.intel"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-mono text-[#00ff41] mb-2">
                PASSCODE
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-600 focus:border-[#00ff41] focus:outline-none transition-colors font-mono"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00ff41] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-[#00ff41] transition-colors"
              >
                Forgot passcode?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00ff41] hover:bg-[#00ff41]/90 disabled:bg-gray-800 text-black font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 font-mono"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  ACCESS_SYSTEM
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-600 text-sm font-mono">OR</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400 mb-2">Don't have clearance?</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-[#00ff41] hover:text-[#00ff41]/80 font-mono font-bold"
            >
              <Sparkles className="w-4 h-4" />
              REQUEST_ACCESS
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-start gap-3 text-gray-500 text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-yellow-500" />
          <p>
            This is a secure system. Unauthorized access attempts will be logged and
            reported to Unit 404. By signing in, you agree to our{' '}
            <Link to="/terms" className="text-[#00ff41] hover:underline">Terms</Link> and{' '}
            <Link to="/privacy" className="text-[#00ff41] hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
