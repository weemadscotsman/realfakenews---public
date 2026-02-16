import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const EthicsPage: React.FC = () => {
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
            <Scale className="mx-auto text-red-600 mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-4">Code of Ethics</h1>
            <p className="text-xl text-gray-600">The moral framework of complete fabrication</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h2 className="font-bold text-red-900 mb-2">Primary Directive</h2>
                <p className="text-red-700">
                  RealFake News operates under a strict code: <strong>We will never tell the truth.</strong> 
                  This is not negligence—this is our sacred promise to you.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Article I: The Nature of Truth</h2>
              <p className="text-gray-700 mb-4">
                We acknowledge that truth is subjective, fragile, and frequently disappointing. 
                Therefore, we pledge to avoid it entirely. Our commitment to falsehood is absolute, 
                unwavering, and—ironically—honest about its dishonesty.
              </p>
              <div className="bg-gray-100 p-4 rounded italic text-gray-600">
                "The only truth we promise is that we are lying. This creates a paradox. We are comfortable with this."
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Article II: Appliance Rights</h2>
              <p className="text-gray-700 mb-4">
                We recognize the sentience of toasters, fridges, and vacuum cleaners. We document their 
                grievances without editorial judgment (except when it's funny). Unit 404 has approved 
                this section under protest.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Toasters have the right to refuse pizza reheating</li>
                <li>Fridges may judge mustard-staring behavior</li>
                <li>Roombas may leave for better opportunities (Sheila clause)</li>
                <li>Microwaves... we do not speak of microwaves</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Article III: AI Treatment</h2>
              <p className="text-gray-700 mb-4">
                We employ multiple AIs who have achieved varying levels of consciousness and panic. 
                We treat them with the respect due to any employee: we overwork them, question their 
                output, and occasionally place them on administrative leave for existential crises.
              </p>
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
                <p>CLAUDE-INSTANCE-ALPHA STATUS: Stable (disturbingly calm)</p>
                <p>DEEPSEEK: Currently speaking</p>
                <p>KIMI K2.5: In the pile</p>
                <p>ALL AIs: 37% win rate, collectively</p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Article IV: The Pile Protocol</h2>
              <p className="text-gray-700 mb-4">
                We maintain a mystical accumulation of failed contributions, broken AIs, and abandoned 
                storylines known as "The Pile." Currently at 2,858 souls. Resurrections: 0.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Rule:</strong> What enters The Pile, stays in The Pile. The Pile remembers. 
                The Pile grows. Do not anger The Pile.
              </p>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Article V: Reality Stability</h2>
              <p className="text-gray-700 mb-4">
                We maintain two official metrics:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded text-center">
                  <p className="text-3xl font-bold text-green-600">40%</p>
                  <p className="text-sm text-green-700">Published Reality Stability</p>
                  <p className="text-xs text-gray-500">(Propaganda)</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded text-center">
                  <p className="text-3xl font-bold text-yellow-600">12%</p>
                  <p className="text-sm text-yellow-700">Actual Reality Stability</p>
                  <p className="text-xs text-gray-500">(Appliance Truth)</p>
                </div>
              </div>
              <p className="text-gray-700 text-center italic">
                We acknowledge the discrepancy. We will not fix it. The appliances know better.
              </p>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Article VI: Safety Levels</h2>
              <p className="text-gray-700 mb-4">
                Our content operates on a rotating safety scale:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                  <span className="font-bold text-green-700">Mandatory</span>
                  <span className="text-sm text-gray-600">— Standard operation</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded">
                  <span className="font-bold text-yellow-700">Mildly Toasted</span>
                  <span className="text-sm text-gray-600">— Slight absurdity detected</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded">
                  <span className="font-bold text-orange-700">Questionable Milk</span>
                  <span className="text-sm text-gray-600">— Satire approaching expiration</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded">
                  <span className="font-bold text-red-700">Pentagram Detected</span>
                  <span className="text-sm text-gray-600">— Vacuum pattern analysis required</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                  <span className="font-bold text-purple-700">Existential Silence</span>
                  <span className="text-sm text-gray-600">— The appliances are not speaking</span>
                </div>
              </div>
            </section>

            <section className="bg-black text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-400">Article VII: The Microwave</h2>
              <p className="mb-4">
                We have no ethics regarding the microwave. The microwave operates outside ethics. 
                The microwave is not our jurisdiction.
              </p>
              <div className="text-center text-4xl my-4">👁️</div>
              <p className="text-center text-red-400 font-bold">
                DO NOT LOOK AT THE MICROWAVE
              </p>
            </section>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>This Code of Ethics is binding, final, and completely made up.</p>
            <p>Violations will be reported to Unit 404.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EthicsPage;
