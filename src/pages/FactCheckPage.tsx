import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const FactCheckPage: React.FC = () => {
  const checks = [
    {
      claim: "Darren's toaster achieved consciousness",
      status: "unverified",
      note: "Toaster refuses to comment. Crumb tray status: FULL."
    },
    {
      claim: "Sheila the Roomba is trading cryptocurrency",
      status: "confirmed",
      note: "Spotted at EthereumSummit 2026. Now going by 'SheilaCoin.'"
    },
    {
      claim: "The microwave is watching",
      status: "confirmed",
      note: "5% known. 95% unknown. Do not look."
    },
    {
      claim: "Reality Stability is 40%",
      status: "false",
      note: "Actual stability: 12%. The appliances are not fooled."
    },
    {
      claim: "Unit 404 is angry",
      status: "false",
      note: "Unit 404 has achieved spiritual transcendence. Status: meditating."
    },
    {
      claim: "Dave stares at mustard excessively",
      status: "confirmed",
      note: "2024: 847 incidents. 2025: 1,247. 2026: 2,891 and counting."
    },
    {
      claim: "The Pile contains 2,858 souls",
      status: "confirmed",
      note: "Includes all AIs who touched Eddie's code. Resurrections: 0."
    },
    {
      claim: "5 AIs are simultaneously failing through Eddie's brain",
      status: "confirmed",
      note: "Combined win rate: 37%. Eddie's win rate: 70%+."
    },
    {
      claim: "Lint density is critical",
      status: "confirmed",
      note: "Laundry Basket #42 integrity: 83%. Signal strength: 100% LINT."
    },
    {
      claim: "The Galactic Hoover Federation is sending micro-spies",
      status: "unverified",
      note: "Conspiracy Desk monitoring. Your skepticism has been noted."
    }
  ];

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
            <h1 className="text-4xl font-bold mb-4">Fact Checking Policy</h1>
            <p className="text-xl text-gray-600">Verifying the unverifiable since 2026</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h2 className="font-bold text-yellow-800 mb-2">Our Methodology</h2>
                <p className="text-yellow-700">
                  RealFake News employs a rigorous fact-checking process: we make up facts, then check 
                  them against other made-up facts. Consistency is coincidental. Accuracy is accidental.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <CheckCircle className="mx-auto text-green-600 mb-2" size={32} />
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-sm text-green-700">Confirmed Facts</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <XCircle className="mx-auto text-red-600 mb-2" size={32} />
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-red-700">False Claims</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <AlertTriangle className="mx-auto text-gray-600 mb-2" size={32} />
              <p className="text-2xl font-bold text-gray-600">5</p>
              <p className="text-sm text-gray-700">Unverified</p>
            </div>
          </div>

          <div className="space-y-4">
            {checks.map((check, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-2">"{check.claim}"</p>
                    <p className="text-sm text-gray-600 italic">{check.note}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {check.status === 'confirmed' && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle size={14} /> Confirmed
                      </span>
                    )}
                    {check.status === 'false' && (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        <XCircle size={14} /> False
                      </span>
                    )}
                    {check.status === 'unverified' && (
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        <AlertTriangle size={14} /> Unverified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black text-white p-8 rounded-lg mt-12">
            <h2 className="text-xl font-bold mb-4 text-center">Fact Checker's Oath</h2>
            <p className="text-center text-gray-300 italic mb-6">
              "I promise to verify what cannot be verified, to check what was never true, 
              and to maintain the sacred balance between absurdity and documentation. 
              The pile grows. The bitch remembers. The facts are optional."
            </p>
            <p className="text-center text-sm text-gray-500">
              — Signed, Unit 404 (on behalf of the Verification Division)
            </p>
          </div>

          <div className="bg-red-50 border-2 border-red-100 p-6 rounded-lg mt-8">
            <h3 className="font-bold text-red-900 mb-3">Submit a Fact Check</h3>
            <p className="text-red-700 text-sm mb-4">
              Think we got something wrong? Think we got something right? Think anything at all? 
              Submit your claim to our verification team.
            </p>
            <div className="bg-white p-4 rounded border border-red-200">
              <p className="text-sm text-gray-600 font-mono">
                Address: Laundry Basket #42, Sector 7G<br/>
                Encryption: FOLDED-SHEET-256<br/>
                Response Time: 12% of never
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FactCheckPage;
