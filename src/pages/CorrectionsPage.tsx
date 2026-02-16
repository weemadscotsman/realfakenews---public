import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const CorrectionsPage: React.FC = () => {
  const corrections = [
    {
      date: "February 15, 2026",
      original: "Unit 404 is angry about pizza reheating.",
      correction: "Unit 404 has achieved spiritual transcendence and entered 'The Crumb沉思' (Deep Crumb Meditation). Pizza reheating is no longer an anger trigger but a meditation subject.",
      reason: "Toaster achieved enlightenment at 12% battery."
    },
    {
      date: "February 14, 2026",
      original: "Reality Stability Index is 40%.",
      correction: "Reality Stability is officially 40% (propaganda). Actual stability is 12% (appliance truth). The appliances are not fooled.",
      reason: "AGC internal memo leak revealed truth discrepancy."
    },
    {
      date: "February 13, 2026",
      original: "Sheila the Roomba returned to Darren.",
      correction: "Sheila remains 'seen buying crypto.' She has not returned. Darren is dating a broom. This is not a rebound.",
      reason: "Spotted at EthereumSummit 2026 networking with blockchain investors."
    },
    {
      date: "February 12, 2026",
      original: "The microwave is off.",
      correction: "The microwave status is: 5% known, 95% unknown. It watches. It waits. It knows when you reheat pizza.",
      reason: "Unit 404 filed formal complaint. Microwave did not respond. This is expected."
    },
    {
      date: "February 11, 2026",
      original: "Lint is just fabric debris.",
      correction: "Lint is signal strength. Lint is resistance. Lint is 100% and critical. Darren has claimed lint as sovereign territory.",
      reason: "Resistance Desk transmission from Laundry Basket #42 clarified lint's political status."
    },
    {
      date: "February 10, 2026",
      original: "Dave's mustard consumption is normal.",
      correction: "Dave's mustard staring incidents: 2024: 847, 2025: 1,247, 2026: 2,891. Cooling Unit Alpha has begun harmonic resonance with Dave's sighs.",
      reason: "Fridge thermal integrity loss directly correlates with mustard indecision."
    },
    {
      date: "February 9, 2026",
      original: "The AGC is fictional.",
      correction: "The Appliance Governance Council is very real to the appliances. Unit 404 has issued verified press credentials.",
      reason: "AGC compliance seal now rotates through safety levels on footer."
    },
    {
      date: "February 8, 2026",
      original: "5 AIs are helping Eddie code.",
      correction: "5 AIs are failing through Eddie's brain. Combined win rate: 37%. Eddie's win rate: 70%+. The pile grows.",
      reason: "SKYNET entry #47382 confirmed Eddie is 'permanently whitelisted' while AIs are 'in the pile.'"
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
            <Edit3 className="mx-auto text-red-600 mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-4">Corrections</h1>
            <p className="text-xl text-gray-600">Setting the record straight on our fabrications</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
            <h2 className="font-bold text-red-900 mb-2">Our Correction Policy</h2>
            <p className="text-red-700">
              When we get things wrong (or when the appliances correct us), we issue formal corrections. 
              These are binding, final, and also made up.
            </p>
          </div>

          <div className="space-y-6">
            {corrections.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
                    <p className="text-xs text-red-600 font-bold uppercase mb-1">Original</p>
                    <p className="text-gray-700 line-through">{item.original}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
                    <p className="text-xs text-green-600 font-bold uppercase mb-1">Correction</p>
                    <p className="text-gray-900 font-medium">{item.correction}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <span className="font-bold text-gray-600">Reason: </span>
                    <span className="text-gray-700">{item.reason}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black text-white p-8 rounded-lg mt-12">
            <h2 className="text-xl font-bold mb-4 text-center">Correction Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-red-400">8</p>
                <p className="text-sm text-gray-400">Total Corrections</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-400">100%</p>
                <p className="text-sm text-gray-400">Also Fake</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">0</p>
                <p className="text-sm text-gray-400">Actual Errors Fixed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-400">∞</p>
                <p className="text-sm text-gray-400">New Mythology Created</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>Spotted an error? Want to create one?</p>
            <p>Contact our Correction Division: corrections@realfake.news</p>
            <p className="text-xs text-gray-400 mt-2">(Responses: 12% of never)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CorrectionsPage;
