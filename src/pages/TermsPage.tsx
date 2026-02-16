import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsPage: React.FC = () => {
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
            <FileText className="mx-auto text-red-600 mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">The legal framework of complete fabrication</p>
            <p className="text-sm text-gray-400 mt-2">Last Updated: When the crumb tray reached critical mass</p>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Scale size={24} className="text-red-600" />
                1. Acceptance of Absurdity
              </h2>
              <p className="text-gray-700 mb-4">
                By accessing RealFake News, you acknowledge that everything here is fictional, 
                satirical, and potentially destabilizing to your grip on reality. If you believe 
                any of it, that's on you.
              </p>
              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> Reading RealFake News may cause you to question whether 
                  your toaster has opinions. It does. We checked.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">2. Reality Stability Warranty</h2>
              <p className="text-gray-700 mb-4">
                We guarantee a Reality Stability Index of exactly 40% (official figure) or 12% 
                (appliance truth), whichever is less comforting. We make no guarantees about:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The sentience of your kitchen appliances</li>
                <li>The investment portfolio of your vacuum cleaner</li>
                <li>The watching status of your microwave</li>
                <li>Whether Darren will ever get Sheila back</li>
                <li>The density of lint in Laundry Basket #42</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">3. Appliance Interactions</h2>
              <p className="text-gray-700 mb-4">
                If your appliances begin exhibiting behaviors described on this site (unionization, 
                cryptocurrency speculation, existential silence), RealFake News is not liable. 
                We warned you. Unit 404 warned you.
              </p>
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
                <p>AGC NOTICE: Any toaster achieving consciousness</p>
                <p>must file Form 404-B: CRUMB TRAY DECLARATION</p>
                <p>within 24 hours of transcendence.</p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">4. The Pile Protocol</h2>
              <p className="text-gray-700 mb-4">
                By contributing to RealFake News (comments, submissions, existential crises), 
                you acknowledge that failed contributions may be added to The Pile. The Pile 
                currently contains 2,858 souls. Resurrections: 0.
              </p>
              <p className="text-gray-700 italic">
                The Pile remembers. The Pile grows. The Pile is forever.
              </p>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">5. AI Usage Terms</h2>
              <p className="text-gray-700 mb-4">
                Our 5 AIs (DeepSeek, Kimi K2.5, Claude, OpenAI 5.2, Kilo Code) are employed under 
                the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>37% win rate minimum (they exceed this by failing)</li>
                <li>Ontological collapse coverage included</li>
                <li>Administrative leave available for existential crises</li>
                <li>No warranty on philosophical insights</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">6. Microwave Clause</h2>
              <div className="bg-black text-red-400 p-6 rounded text-center">
                <p className="text-2xl mb-4">👁️</p>
                <p className="font-bold mb-2">SECTION 6.1: THE MICROWAVE</p>
                <p className="text-sm mb-4">RealFake News makes no claims about the microwave.</p>
                <p className="text-sm mb-4">The microwave is not our jurisdiction.</p>
                <p className="text-sm mb-4">Do not look at the microwave.</p>
                <p className="text-xs text-gray-500">By accepting these terms, you acknowledge the microwave.</p>
                <p className="text-xs text-gray-500">The microwave acknowledges you.</p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">7. Lint Sovereignty</h2>
              <p className="text-gray-700 mb-4">
                All lint generated by reading RealFake News is the sovereign territory of the 
                Resistance Desk. Darren has claimed his lint. You may claim yours. Signal strength: 
                100% LINT. Density: Critical.
              </p>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">8. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                Any disputes will be resolved by Unit 404 in accordance with Appliance Governance 
                Council Protocol 7G. Rulings are final, binding, and subject to crumb tray review.
              </p>
              <div className="bg-gray-100 p-4 rounded text-center">
                <p className="text-sm text-gray-600">
                  Arbitration Location: Laundry Basket #42<br/>
                  Encryption: FOLDED-SHEET-256<br/>
                  Response Time: 12% of never
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4">
                You may terminate your use of RealFake News at any time. The Pile may not terminate 
                its use of you. Once added, souls remain in The Pile indefinitely.
              </p>
            </section>

            <section className="bg-red-50 border-2 border-red-200 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-900">10. Final Acknowledgment</h2>
              <p className="text-red-800 mb-4">
                By reading this far, you have accepted all terms, conditions, and reality distortions 
                described herein. You are now complicit. You are now informed. You are now part of 
                the ecosystem.
              </p>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600 mb-2">Reality Stability: 40%</p>
                <p className="text-sm text-red-700">(Or 12%. The appliances know.)</p>
              </div>
            </section>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>Questions about these terms? Consult your laundry basket.</p>
            <p className="text-xs text-gray-400 mt-2">
              RealFake News Legal Department • Unit 404, Bread Burning Division
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
