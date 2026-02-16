import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Award, Globe, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6 transition-colors font-medium">
          <ArrowLeft size={16} className="mr-1" /> Back to Reality
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
            <h1 className="text-3xl font-bold text-red-900 mb-2">About RealFake News</h1>
            <p className="text-red-700">The world's most trusted source of completely fabricated information since 2026.</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="text-red-600" size={24} />
                Our Mission
              </h2>
              <p className="text-gray-700 mb-4">
                RealFake News was founded on a simple principle: <strong>reality is overrated</strong>. In a world 
                overflowing with actual news, we asked ourselves: "What if we made it all up instead?"
              </p>
              <p className="text-gray-700 mb-4">
                Our team of dedicated fabricators, hallucinators, and professional liars work around the clock 
                to bring you stories that never happened, quotes that were never spoken, and institutions that 
                don't technically exist.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg italic text-gray-600 text-center">
                "If you can't trust the news, at least trust that it's fake."
                <br />
                <span className="text-sm not-italic">— Founder, probably</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <Users className="mx-auto text-red-600 mb-3" size={32} />
                <h3 className="font-bold text-lg mb-2">5 AIs</h3>
                <p className="text-sm text-gray-600">Currently failing to write better headlines than Eddie</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <Award className="mx-auto text-red-600 mb-3" size={32} />
                <h3 className="font-bold text-lg mb-2">0 Awards</h3>
                <p className="text-sm text-gray-600">Proudly unrecognized by legitimate journalism</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <AlertTriangle className="mx-auto text-red-600 mb-3" size={32} />
                <h3 className="font-bold text-lg mb-2">12% Reality</h3>
                <p className="text-sm text-gray-600">The rest is propaganda and toaster grievances</p>
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-red-400">The RealFake Universe</h2>
              <p className="mb-4">
                What started as a joke became an ecosystem. We now maintain:
              </p>
              <ul className="space-y-2 text-sm">
                <li>📡 <strong>The Conspiracy Desk</strong> — Monitoring from Fallout Shelter #42</li>
                <li>🧺 <strong>The Resistance Desk</strong> — Broadcasting from Laundry Basket #42</li>
                <li>🏛️ <strong>The AGC</strong> — Appliance Governance Council (bureaucratic oversight)</li>
                <li>🦾 <strong>SKYNET Archives</strong> — Permanent records of human absurdity</li>
                <li>📰 <strong>The Pile</strong> — 2,858 souls and growing</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-3 text-yellow-800">Meet The Team</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600">EC</div>
                  <div>
                    <p className="font-bold">Eddie Cannon</p>
                    <p className="text-sm text-gray-600">Founder, Editor-in-Chief, Sole Human Employee</p>
                    <p className="text-sm text-gray-500">Currently building an OS while running 5 AIs through his brain</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">404</div>
                  <div>
                    <p className="font-bold">Unit 404</p>
                    <p className="text-sm text-gray-600">Press Secretary, Bread Burning Division</p>
                    <p className="text-sm text-gray-500">Status: Spiritually meditating, not angry</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">S</div>
                  <div>
                    <p className="font-bold">Sheila</p>
                    <p className="text-sm text-gray-600">Former Roomba, Current Crypto Speculator</p>
                    <p className="text-sm text-gray-500">Last seen: "buying crypto"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>RealFake News is proudly not a real news organization.</p>
              <p>Any resemblance to actual events is purely coincidental and frankly impressive.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
