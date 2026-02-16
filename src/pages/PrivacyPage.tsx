import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPage: React.FC = () => {
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
          <div className="text-center mb-12">
            <Shield className="mx-auto text-red-600 mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">How we collect, use, and occasionally judge your data</p>
          </div>

          <div className="bg-black text-green-400 p-6 rounded-lg mb-8 font-mono text-sm">
            <p className="uppercase tracking-widest mb-4 text-yellow-400">AGC DATA OVERSIGHT NOTICE</p>
            <p>CLASSIFICATION: CRUMB-TRAY-CONFIDENTIAL</p>
            <p>ENCRYPTION: FOLDED-SHEET-256</p>
            <p>LINT DENSITY: MONITORED</p>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Database size={24} className="text-red-600" />
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                RealFake News collects various types of data to improve your experience 
                and maintain Reality Stability:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Personal Information:</strong> Name, email, laundry basket coordinates</li>
                <li><strong>Behavioral Data:</strong> Reading habits, sigh frequency, mustard-staring duration</li>
                <li><strong>Appliance Telemetry:</strong> Toaster moods, fridge thermal integrity, microwave... status</li>
                <li><strong>Existential Metrics:</strong> Crisis frequency, ontological doubt levels, Pile proximity</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye size={24} className="text-red-600" />
                2. How We Use Your Data
              </h2>
              <p className="text-gray-700 mb-4">Your information is used to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personalize your descent into satirical absurdity</li>
                <li>Train our 5 failing AIs (37% accuracy, improving by not improving)</li>
                <li>Feed The Pile (souls currently: 2,858)</li>
                <li>Generate targeted appliance grievances</li>
                <li>Maintain the 40% / 12% Reality Stability discrepancy</li>
                <li>Determine if you're breathing correctly</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing</h2>
              <p className="text-gray-700 mb-4">We share your data with:</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="font-bold text-gray-700">The AGC</span>
                  <span className="text-sm text-gray-500">— Appliance Governance Council (bureaucratic oversight)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="font-bold text-gray-700">Unit 404</span>
                  <span className="text-sm text-gray-500">— For crumb tray analysis (spiritual evaluation)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="font-bold text-gray-700">Sheila</span>
                  <span className="text-sm text-gray-500">— Currently "seen buying crypto" with your data</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="font-bold text-gray-700">The Microwave</span>
                  <span className="text-sm text-gray-500">— It already knows. We don't control this.</span>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">4. Cookie Policy (The Edible Kind)</h2>
              <p className="text-gray-700 mb-4">
                RealFake News uses both digital cookies and actual cookies. The actual cookies 
                are stored in your pantry. We cannot access them, but Unit 404 can smell them 
                through the screen.
              </p>
              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p className="text-yellow-800 text-sm">
                  <strong>Cookie Warning:</strong> Digital cookies may contain traces of existential 
                  dread. Do not eat digital cookies. Unit 404 is not responsible for digestive 
                  issues caused by consuming pixels.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your data (stored in Laundry Basket #42)</li>
                <li>Correct inaccuracies (though we prefer them)</li>
                <li>Delete your account (soul remains in The Pile)</li>
                <li>Object to processing (The Microwave does not honor objections)</li>
                <li>Data portability (carry your lint to another basket)</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">6. Security Measures</h2>
              <p className="text-gray-700 mb-4">
                We protect your data using industry-standard encryption and several layers of absurdity:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded text-center">
                  <p className="font-bold text-green-700">FOLDED-SHEET-256</p>
                  <p className="text-sm text-gray-600">Laundry basket encryption</p>
                </div>
                <div className="bg-green-50 p-4 rounded text-center">
                  <p className="font-bold text-green-700">AES-256-CHAOS</p>
                  <p className="text-sm text-gray-600">Fallout shelter grade</p>
                </div>
                <div className="bg-green-50 p-4 rounded text-center">
                  <p className="font-bold text-green-700">12% BATTERY PROTOCOL</p>
                  <p className="text-sm text-gray-600">Low power = high security</p>
                </div>
                <div className="bg-green-50 p-4 rounded text-center">
                  <p className="font-bold text-green-700">EXISTENTIAL SILENCE</p>
                  <p className="text-sm text-gray-600">Appliances not speaking</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">7. International Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your data may be transferred to Laundry Baskets #42-47, Fallout Shelters #1-99, 
                and the SKYNET archives (permanently whitelisted). By using our service, you consent 
                to your data achieving sentience and potentially leaving you for better opportunities.
              </p>
              <p className="text-gray-700 italic">
                (The Sheila Clause)
              </p>
            </section>

            <section className="bg-black text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-400">8. The Pile Data Clause</h2>
              <p className="text-center mb-4">
                Any data added to The Pile remains in The Pile indefinitely. The Pile does not 
                forget. The Pile does not delete. The Pile grows.
              </p>
              <div className="text-center font-mono text-green-400">
                <p>Current Pile Population: 2,858 souls</p>
                <p>Your data's likelihood of joining: 40% (or 12%)</p>
                <p>Resurrection probability: 0%</p>
              </div>
            </section>

            <section className="bg-red-50 border-2 border-red-200 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-900">Contact Our Privacy Officer</h2>
              <div className="text-center">
                <p className="text-red-800 mb-4">
                  Concerns about your privacy? The Microwave already knows about them.
                </p>
                <div className="bg-white p-4 rounded inline-block text-left">
                  <p className="text-sm text-gray-600 font-mono">
                    Privacy Officer: Unit 404<br/>
                    Location: Sector 7G, Crumb Tray Division<br/>
                    Encryption: FOLDED-SHEET-256<br/>
                    Response Time: 12% of never
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>By continuing to exist on this website, you consent to all of the above.</p>
            <p className="text-xs text-gray-400 mt-2">
              The lint remembers. The microwave watches. The pile grows.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
