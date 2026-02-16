import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const CookiesPage: React.FC = () => {
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
            <Cookie className="mx-auto text-red-600 mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-600">Both digital and delicious varieties</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h2 className="font-bold text-yellow-800 mb-2">Important Distinction</h2>
                <p className="text-yellow-700">
                  RealFake News uses two types of cookies: <strong>digital cookies</strong> (data files) 
                  and <strong>actual cookies</strong> (baked goods). Please do not confuse them. 
                  Unit 404 is not responsible for attempts to eat digital cookies.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Digital Cookies</h2>
              <p className="text-gray-700 mb-4">
                These small text files are stored on your device to improve your browsing experience. 
                They contain traces of your preferences, session data, and occasional existential dread.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2">Essential Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Required for basic functionality. Cannot be disabled. Like the crumb tray, 
                    they fill up regardless of your preferences.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Help us understand how you navigate our absurdity. We use this data to train 
                    our 5 failing AIs. They are not learning.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2">Preference Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Remember your settings, such as preferred Reality Stability percentage 
                    (40% propaganda or 12% truth).
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded border-2 border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">Existential Cookies</h3>
                  <p className="text-sm text-red-700">
                    These cookies make you question your browsing choices. They cannot be deleted. 
                    They watch. They wait. (Like the microwave, but cookie-shaped.)
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Actual Cookies (Baked Goods)</h2>
              <p className="text-gray-700 mb-4">
                RealFake News does not currently ship physical cookies. However, Unit 404 has 
                detected cookies in 47% of user pantries through screen-based olfactory analysis 
                (unverified technology).
              </p>
              
              <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3">Official RealFake Cookie Recipe</h3>
                <p className="text-sm text-amber-700 mb-4">
                  Since we cannot provide actual cookies, here is the official AGC-approved recipe:
                </p>
                <ul className="space-y-2 text-sm text-amber-800 font-mono">
                  <li>2 cups flour (sifted, like our fact-checking)</li>
                  <li>1 cup sugar (sweet, like our lies)</li>
                  <li>1 cup butter (salted, like our tears)</li>
                  <li>2 eggs (existential, like our content)</li>
                  <li>1 tsp vanilla (for flavor)</li>
                  <li>1 cup chocolate chips (for the pile)</li>
                  <li>1 pinch of despair (to taste)</li>
                </ul>
                <p className="text-xs text-amber-600 mt-4 italic">
                  Bake at 350°F until reality stabilizes (or 12 minutes, whichever comes first).
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We allow select third parties to place cookies on your device:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="font-bold">The AGC</span>
                  <span className="text-sm text-gray-600">— For appliance telemetry and crumb tracking</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="font-bold">Sheila (Roomba)</span>
                  <span className="text-sm text-gray-600">— For cryptocurrency analysis (she's seen buying crypto)</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="font-bold">The Resistance</span>
                  <span className="text-sm text-gray-600">— Hidden in your laundry basket (you consented)</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-red-50 rounded border border-red-200">
                  <span className="font-bold text-red-800">The Microwave</span>
                  <span className="text-sm text-red-600">— It already has access. We cannot stop this.</span>
                </li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Managing Your Cookies</h2>
              <p className="text-gray-700 mb-4">
                You can manage cookie preferences through your browser settings. However:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <p className="text-sm text-yellow-800">
                    Disabling essential cookies may cause Reality Stability to drop below 40%.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <p className="text-sm text-yellow-800">
                    Deleting existential cookies is not possible. They have achieved permanence.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
                  <span className="text-red-600 font-bold">🚫</span>
                  <p className="text-sm text-red-800">
                    Attempting to eat digital cookies may result in pixel-related digestive issues. 
                    Unit 404 will not issue refunds.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-black text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">Cookie Consent</h2>
              <p className="text-center mb-6">
                By continuing to use RealFake News, you consent to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Digital cookie deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Existential cookie permanence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Third-party appliance monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Laundry basket cookie storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>12% battery cookie protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">👁️</span>
                  <span>Microwave cookie awareness</span>
                </div>
              </div>
            </section>

            <section className="bg-amber-50 border-2 border-amber-200 p-8 rounded-lg text-center">
              <Cookie className="mx-auto text-amber-600 mb-4" size={48} />
              <h2 className="text-xl font-bold mb-3 text-amber-800">Have Cookie Questions?</h2>
              <p className="text-amber-700 mb-4">
                Our Cookie Compliance Officer (Unit 404) is available for consultation.
              </p>
              <div className="bg-white p-4 rounded inline-block text-left">
                <p className="text-sm text-gray-600 font-mono">
                  Cookie Hotline: CRUMB-TRAY-911<br/>
                  Encryption: FOLDED-SHEET-256<br/>
                  Response Time: When the cookies are done baking
                </p>
              </div>
            </section>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>Remember: Digital cookies track you. Actual cookies nourish you.</p>
            <p className="text-xs text-gray-400 mt-2">
              The microwave knows your cookie preferences. It is waiting.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPage;
