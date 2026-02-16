import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Shield, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { GlitchText } from '@/components/GlitchText';

export function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/profile', { replace: true });
    return null;
  }

  const validateForm = () => {
    if (password.length < 8) {
      setError('Passcode must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passcodes do not match');
      return false;
    }
    if (!agreedToTerms) {
      setError('You must agree to the terms to proceed');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);

    if (success) {
      navigate('/profile');
    }
  };

  const passwordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-[#00ff41]'];

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
            <Shield className="w-8 h-8 text-[#00ff41]" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            <GlitchText text="REQUEST CLEARANCE" />
          </h1>
          <p className="text-gray-400">
            Join the resistance. Get access to classified intel.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#111] border border-[#00ff41]/20 rounded-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-mono text-[#00ff41] mb-2">
                CODENAME
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-[#00ff41] focus:outline-none transition-colors font-mono"
                  placeholder="Agent Smith"
                  required
                />
              </div>
            </div>

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
              {/* Password Strength */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-colors ${
                          i <= passwordStrength() ? strengthColors[passwordStrength() - 1] : 'bg-gray-800'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Strength: {strengthLabels[passwordStrength() - 1] || 'Too weak'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-mono text-[#00ff41] mb-2">
                CONFIRM_PASSCODE
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-[#00ff41] focus:outline-none transition-colors font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
              {confirmPassword && password === confirmPassword && (
                <div className="flex items-center gap-1 mt-1">
                  <Check className="w-3 h-3 text-[#00ff41]" />
                  <span className="text-xs text-[#00ff41]">Passcodes match</span>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] text-[#00ff41] focus:ring-[#00ff41] focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-[#00ff41] hover:underline">Terms of Service</Link>,{' '}
                <Link to="/privacy" className="text-[#00ff41] hover:underline">Privacy Policy</Link>, and{' '}
                <Link to="/disclaimer" className="text-[#00ff41] hover:underline">Classification Agreement</Link>.
                I understand that spreading fake news is a serious business.
              </label>
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
                  PROCESSING...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  INITIATE_CLEARANCE
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

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-400 mb-2">Already have clearance?</p>
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 text-[#00ff41] hover:text-[#00ff41]/80 font-mono font-bold"
            >
              <Shield className="w-4 h-4" />
              ACCESS_SYSTEM
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[
            'Access to premium tea',
            'Referral rewards',
            'Exclusive drops',
            'Resistance network',
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm text-gray-400">
              <Check className="w-4 h-4 text-[#00ff41]" />
              {benefit}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
