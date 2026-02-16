import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Youtube, Mail, ShieldCheck, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

const SAFETY_LEVELS = [
  { level: "Mandatory", color: "text-green-500" },
  { level: "Mildly Toasted", color: "text-yellow-500" },
  { level: "Questionable Milk", color: "text-orange-500" },
  { level: "Pentagram Detected", color: "text-red-500" },
  { level: "Existential Silence", color: "text-purple-500" },
  { level: "Crumb Tray Full", color: "text-amber-600" },
  { level: "Microwave Watching", color: "text-red-600" },
];

const Footer: React.FC = () => {
  const [safetyIndex, setSafetyIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSafetyIndex((prev) => (prev + 1) % SAFETY_LEVELS.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const currentSafety = SAFETY_LEVELS[safetyIndex];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribing(true);

    try {
      const response = await fetch('/.netlify/functions/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          preferences: {
            daily_digest: true,
            breaking_news: true,
            promotions: false
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscribed(true);
        setEmail('');
        toast.success(data.message || 'Welcome to the absurdity!');
      } else {
        toast.error(data.error || 'Failed to subscribe. The appliances are being difficult.');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setSubscribing(false);
    }
  };
  const footerLinks = {
    sections: [
      { label: 'Politics', href: '/politics' },
      { label: 'Science', href: '/science' },
      { label: 'Tech', href: '/tech' },
      { label: 'Entertainment', href: '/entertainment' },
      { label: 'Sports', href: '/sports' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Code of Ethics', href: '/ethics' },
      { label: 'Fact Checking Policy', href: '/fact-check' },
      { label: 'Corrections', href: '/corrections' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Real</span>
              <span className="text-red-500 italic">Fake</span>
              <span className="text-white"> News</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              The world's most trusted source of completely fabricated information.
              If you believe anything here, we have a bridge to sell you.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/realfakenews" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com/realfakenews" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/realfakenews" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@realfakenews" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Subscribe on YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Sections</h4>
            <ul className="space-y-2">
              {footerLinks.sections.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get fake news delivered to your inbox daily. Unsubscribe at your own risk.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Check size={16} />
                <span>You're subscribed! Welcome to the absurdity.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={subscribing}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={subscribing || !email}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {subscribing ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Mail size={16} />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} RealFake News. All rights reserved.
              Not responsible for any loss of faith in journalism. <span className="text-gray-700 ml-2">v2.0 - The Sheila Edition</span>
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-gray-500 text-xs text-center">
            <strong>Disclaimer:</strong> RealFake News is a satirical publication.
            Nothing on this website is real. If you believed any of it, please seek help.
            Or subscribe. We need the money.
          </p>
        </div>
      </div>
      {/* AGC Compliance Seal */}
      <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col items-center">
        <a
          href="/admin/surveillance"
          onClick={(e) => {
            if (!confirm('ACCESS RESTRICTED: Authorize Audit?')) {
              e.preventDefault();
            }
          }}
          className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <div className="relative">
            <ShieldCheck size={32} className="text-zinc-600 group-hover:text-green-500 transition-colors" />
            <div className="absolute inset-0 bg-green-500 blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
          <div className="text-center">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-green-500 font-bold">
              Verified by the Appliance Governance Council
            </span>
            <span className={`block text-[8px] uppercase tracking-widest mt-1 transition-colors duration-500 ${currentSafety.color}`}>
              Safety Level: {currentSafety.level}
            </span>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
