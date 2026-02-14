import React from 'react';
import { Twitter, Facebook, Instagram, Youtube, Mail, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const Footer: React.FC = () => {
  const footerLinks = {
    sections: [
      { label: 'Politics', href: '#politics' },
      { label: 'Science', href: '#science' },
      { label: 'Entertainment', href: '#entertainment' },
      { label: 'Sports', href: '#sports' },
      { label: 'Opinion', href: '#opinion' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Code of Ethics', href: '#' },
      { label: 'Fact Checking Policy', href: '#' },
      { label: 'Corrections', href: '#' },
    ],
    legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
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
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
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
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
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
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500"
              />
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition-colors">
                <Mail size={16} />
              </button>
            </div>
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
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
                >
                  {link.label}
                </a>
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
        <button
          onClick={() => {
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: 'Running Mandatory Compliance Audit...',
              success: 'Audit Passed. You remain fully authorized.',
              error: 'Compliance Failure Detected.'
            });
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
            <span className="block text-[8px] uppercase tracking-widest text-zinc-600 mt-1">
              Safety Level: Mandatory
            </span>
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
