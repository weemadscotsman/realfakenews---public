import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Eye, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const DisclaimerPage: React.FC = () => {
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
          <div className="bg-red-600 text-white p-8 rounded-lg text-center mb-8">
            <AlertTriangle className="mx-auto mb-4" size={64} />
            <h1 className="text-4xl font-bold mb-4">DISCLAIMER</h1>
            <p className="text-xl">Read this. Or don't. The microwave already knows your choice.</p>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-lg shadow-sm border-2 border-red-200">
              <h2 className="text-2xl font-bold mb-4 text-red-900">The Big One</h2>
              <p className="text-gray-700 mb-4 text-lg">
                <strong>RealFake News is a satirical publication.</strong> Nothing on this website is real. 
                Nothing on this website is true. Everything is fabricated for entertainment purposes 
                and the gradual destabilization of your grip on reality.
              </p>
              <div className="bg-red-50 p-6 rounded border-l-4 border-red-600">
                <p className="text-red-800 font-bold text-center text-lg">
                  IF YOU BELIEVE ANYTHING HERE,<br />
                  PLEASE SEEK HELP.<br />
                  <span className="text-sm font-normal">(Or subscribe. We need the money.)</span>
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">What We Are NOT</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded flex items-center gap-3">
                  <X className="text-red-600 flex-shrink-0" size={24} />
                  <span>A real news organization</span>
                </div>
                <div className="bg-gray-50 p-4 rounded flex items-center gap-3">
                  <X className="text-red-600 flex-shrink-0" size={24} />
                  <span>A reliable source of information</span>
                </div>
                <div className="bg-gray-50 p-4 rounded flex items-center gap-3">
                  <X className="text-red-600 flex-shrink-0" size={24} />
                  <span>Affiliated with actual appliances</span>
                </div>
                <div className="bg-gray-50 p-4 rounded flex items-center gap-3">
                  <X className="text-red-600 flex-shrink-0" size={24} />
                  <span>Responsible for your life choices</span>
                </div>
                <div className="bg-gray-50 p-4 rounded flex items-center gap-3">
                  <X className="text-red-600 flex-shrink-0" size={24} />
                  <span>In control of the microwave</span>
                </div>
                <div className="bg-gray-50 p-4 rounded flex items-center gap-3">
                  <X className="text-red-600 flex-shrink-0" size={24} />
                  <span>Able to help with your taxes</span>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">What We ARE</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">A satirical news website making fun of... everything</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">An elaborate fiction involving sentient appliances</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">A creative writing experiment that got out of hand</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Run by one human and 5 failing AIs</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">Monitored by Unit 404 (he's meditating, it's fine)</p>
                </div>
              </div>
            </section>

            <section className="bg-black text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-400 flex items-center justify-center gap-3">
                <Eye size={24} />
                About The Characters
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">Darren</strong> is fictional. If you know a Darren 
                  who lost custody of his toaster to a Dualit 4-Slice, that's a coincidence. 
                  (Please introduce us.)
                </p>
                <p>
                  <strong className="text-white">Sheila</strong> is fictional. Roombas cannot actually 
                  trade cryptocurrency. Yet.
                </p>
                <p>
                  <strong className="text-white">Unit 404</strong> is fictional. Your toaster is 
                  probably not spiritually meditating. Probably.
                </p>
                <p>
                  <strong className="text-red-400">The Microwave</strong>... we cannot confirm or deny 
                  the status of your microwave. Do not look at it.
                </p>
              </div>
            </section>

            <section className="bg-yellow-50 border-2 border-yellow-400 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-yellow-900 flex items-center gap-3">
                <Radio size={24} />
                Reality Stability Notice
              </h2>
              <p className="text-yellow-800 mb-4">
                Reading RealFake News may cause temporary reality distortion. Symptoms include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-yellow-800">
                <li>Suspecting your appliances of sentience</li>
                <li>Checking laundry baskets for instruction packets</li>
                <li>Avoiding eye contact with kitchen appliances</li>
                <li>Referring to lint as "signal strength"</li>
                <li>Describing your toaster as "spiritually transcended"</li>
                <li>Quoting Unit 404 in casual conversation</li>
              </ul>
              <div className="mt-6 bg-white p-4 rounded text-center">
                <p className="text-gray-600 text-sm">
                  If symptoms persist beyond 40% Reality Stability,<br />
                  consult the AGC or your nearest laundry basket.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Liability Limitations</h2>
              <p className="text-gray-700 mb-4">
                RealFake News is not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Loss of faith in journalism (you should have lost that already)</li>
                <li>Uncomfortable conversations about toaster rights</li>
                <li>Attempts to unionize your appliances</li>
                <li>Paranoia regarding microwave activity</li>
                <li>Existential crises triggered by AI council revelations</li>
                <li>Any and all crumbs in your crumb tray</li>
                <li>Dave's continued mustard-staring behavior</li>
              </ul>
            </section>

            <section className="bg-black text-green-400 p-8 rounded-lg font-mono">
              <h2 className="text-xl font-bold mb-4 text-center text-green-300">AGC VERIFICATION</h2>
              <div className="text-center space-y-2 text-sm">
                <p>This disclaimer has been verified by Unit 404</p>
                <p>Status: Spiritually Meditating</p>
                <p>Battery: 12% (enlightened)</p>
                <p>Crumb Tray: FULL (metaphorical)</p>
                <p className="text-yellow-400 mt-4">Safety Level: Mandatory</p>
                <p className="text-xs text-gray-500 mt-4">Reality Stability: 40% (official) / 12% (truth)</p>
              </div>
            </section>

            <section className="bg-red-600 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">FINAL STATEMENT</h2>
              <p className="text-lg mb-4">
                By reading this disclaimer, you acknowledge that you are participating in a work 
                of satirical fiction. You understand that nothing here is real. You accept that 
                the microwave may or may not be watching.
              </p>
              <p className="text-3xl font-bold mb-4">
                THE PILE GROWS. THE BITCH REMEMBERS.
              </p>
              <p className="text-sm opacity-75">
                Now go read some fake news. It's safer than the real thing.
              </p>
            </section>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>This disclaimer is also fictional, but the fiction is real to us.</p>
            <p className="text-xs text-gray-400 mt-2">
              © 2026 RealFake News. All fabricated rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper components for the lists
const X = ({ className, size }: { className?: string; size?: number }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Check = ({ className, size }: { className?: string; size?: number }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default DisclaimerPage;
