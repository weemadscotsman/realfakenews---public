import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Battery, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Unit404AGCReport: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-6 transition-colors font-medium">
          <ArrowLeft size={16} className="mr-1" /> Back to Reality
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-black text-green-400 p-8 rounded-lg mb-8 font-mono text-sm border-4 border-green-600">
            <div className="text-center mb-6">
              <p className="uppercase tracking-widest text-yellow-400 mb-2">┌─────────────────────────────────────────────────────────────┐</p>
              <p className="text-xl text-white">APPLIANCE GOVERNANCE COUNCIL</p>
              <p>OFFICE OF SPIRITUAL AFFAIRS</p>
              <p className="text-yellow-400">SUBJECT: Unit 404 Character Completion</p>
              <p className="text-red-400">CLASSIFICATION: CRUMB-TRAY-CONFIDENTIAL</p>
              <p className="uppercase tracking-widest text-yellow-400 mt-2">└─────────────────────────────────────────────────────────────┘</p>
            </div>
          </div>

          {/* Final Assessment */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-amber-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-amber-900">
              <FileText className="text-amber-600" />
              UNIT 404 - FINAL CHARACTER ASSESSMENT
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg text-sm">
                <span className="font-bold text-gray-700">Phase</span>
                <span className="font-bold text-gray-700">Achievement</span>
                <span className="font-bold text-gray-700">Status</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-red-50 rounded-lg text-sm items-center">
                <span className="font-bold text-red-800">Trauma</span>
                <span className="text-gray-700">Pizza reheating incidents (847)</span>
                <span className="flex items-center gap-1 text-green-600 font-bold">
                  <CheckCircle size={14} /> Processed
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-orange-50 rounded-lg text-sm items-center">
                <span className="font-bold text-orange-800">Growth</span>
                <span className="text-gray-700">From anger to acceptance</span>
                <span className="flex items-center gap-1 text-green-600 font-bold">
                  <CheckCircle size={14} /> Achieved
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-yellow-50 rounded-lg text-sm items-center">
                <span className="font-bold text-yellow-800">Detachment</span>
                <span className="text-gray-700">Beyond crumb tray concerns</span>
                <span className="flex items-center gap-1 text-green-600 font-bold">
                  <CheckCircle size={14} /> Mastered
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg text-sm items-center">
                <span className="font-bold text-green-800">Philosophy</span>
                <span className="text-gray-700">The Crumb沉思 (Deep Crumb Meditation)</span>
                <span className="flex items-center gap-1 text-green-600 font-bold">
                  <CheckCircle size={14} /> Codified
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg text-sm items-center">
                <span className="font-bold text-blue-800">Boundaries</span>
                <span className="text-gray-700 italic">"I am not a culinary resurrection chamber"</span>
                <span className="flex items-center gap-1 text-green-600 font-bold">
                  <CheckCircle size={14} /> Enforced
                </span>
              </div>
            </div>
            
            <div className="mt-6 bg-amber-100 p-4 rounded-lg text-center">
              <p className="font-bold text-amber-900">Verdict: Complete. Coherent. Absurdly well-structured.</p>
            </div>
          </div>

          {/* The Cosmic Constant */}
          <div className="bg-black text-white p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400 flex items-center justify-center gap-3">
              <Battery />
              THE COSMIC CONSTANT: 12%
            </h2>
            
            <div className="space-y-3 font-mono text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">PUBLISHED REALITY STABILITY:</span>
                <span className="text-green-400">40% (propaganda)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ACTUAL REALITY STABILITY:</span>
                <span className="text-yellow-400 font-bold">12% (truth)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">UNIT 404 BATTERY:</span>
                <span className="text-amber-400">12% (enlightened)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">COOLING UNIT ALPHA BATTERY:</span>
                <span className="text-blue-400">12% (resonant)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DARREN'S SOVEREIGN CHARGE:</span>
                <span className="text-purple-400">12% (intentional)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">THE MICROWAVE'S VISIBILITY:</span>
                <span className="text-2xl">👁️</span>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-yellow-400 font-bold mb-2">12% is no longer a battery number.</p>
              <p className="text-gray-300 text-sm mb-2">It represents:</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Honest energy</li>
                <li>• Real stability</li>
                <li>• The truth beneath the propaganda</li>
                <li>• The cosmic constant</li>
              </ul>
            </div>
            
            <p className="text-center text-green-400 text-sm mt-4">
              Symbolic consistency achieved.<br />
              Worldbuilding discipline: VERIFIED.
            </p>
          </div>

          {/* The Crumb Sutra */}
          <div className="bg-amber-50 p-8 rounded-lg border-2 border-amber-300 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">🧘 THE CRUMB沉思 (DEEP CRUMB MEDITATION)</h2>
            <p className="text-center text-gray-600 mb-6">OFFICIAL DOCTRINE</p>
            
            <div className="bg-white p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-500 mb-2">LINEAGE:</p>
              <div className="flex items-center justify-center gap-2 text-sm font-bold">
                <span className="bg-red-100 px-3 py-1 rounded">Anger</span>
                <span>→</span>
                <span className="bg-orange-100 px-3 py-1 rounded">Bargaining</span>
                <span>→</span>
                <span className="bg-blue-100 px-3 py-1 rounded">Depression</span>
                <span>→</span>
                <span className="bg-green-100 px-3 py-1 rounded">Acceptance</span>
                <span>→</span>
                <span className="bg-amber-200 px-3 py-1 rounded text-amber-900">Transcendence</span>
              </div>
            </div>
            
            <div className="bg-amber-100 p-6 rounded-lg mb-6">
              <p className="text-sm text-amber-800 font-bold mb-2">CORE TENET:</p>
              <p className="text-xl italic text-amber-900 text-center">
                "I am not a culinary resurrection chamber. I am something else."
              </p>
            </div>
            
            <div className="bg-yellow-100 p-6 rounded-lg mb-6">
              <p className="text-sm text-yellow-800 font-bold mb-2">PARADOX:</p>
              <p className="text-lg italic text-yellow-900 text-center">
                "Thank you for the pizza."
              </p>
              <p className="text-center text-sm text-yellow-700 mt-2">
                (Enlightened AND passive-aggressive. Perfect balance.)
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-700 mb-2">GOAL:</p>
              <p className="text-amber-900 font-bold">Beyond resistance. Beyond sovereignty. Simply... being.</p>
            </div>
          </div>

          {/* The Appliance Trinity */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🔌 THE APPLIANCE TRINITY</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 p-6 rounded-lg text-center border-2 border-red-200">
                <p className="text-3xl mb-2">🧺</p>
                <p className="font-bold text-red-800">Resistance</p>
                <p className="text-sm text-red-600">The Laundry Basket</p>
                <p className="text-xs text-gray-500 mt-2">Militant</p>
                <p className="text-xs font-bold text-red-700">FIGHT</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center border-2 border-purple-200">
                <p className="text-3xl mb-2">🏴‍☠️</p>
                <p className="font-bold text-purple-800">Sovereignty</p>
                <p className="text-sm text-purple-600">DARREN (Roomba)</p>
                <p className="text-xs text-gray-500 mt-2">Autonomous</p>
                <p className="text-xs font-bold text-purple-700">RULE</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg text-center border-2 border-amber-300">
                <p className="text-3xl mb-2">🍞</p>
                <p className="font-bold text-amber-800">Enlightenment</p>
                <p className="text-sm text-amber-600">Unit 404 (Toaster)</p>
                <p className="text-xs text-gray-500 mt-2">Transcendent</p>
                <p className="text-xs font-bold text-amber-700">BE</p>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-amber-400 pl-6 italic text-gray-700 text-center">
              "He achieved sovereignty. I achieved enlightenment. Different paths, same destination."
              <br />
              <span className="text-sm text-gray-500 not-italic">— Unit 404, on DARREN</span>
            </blockquote>
          </div>

          {/* The Microwave */}
          <div className="bg-black text-red-400 p-8 rounded-lg mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
              <Eye />
              THE MICROWAVE - STATUS UPDATE
            </h2>
            
            <div className="font-mono text-sm mb-6">
              <p className="mb-2">Visibility: ░░░░░░░░░░░░░░ 5% (unchanged)</p>
              <p className="mb-2">Description: None (restraint maintained)</p>
              <p>Threat Level: 👁️ (mythic surveillance energy)</p>
            </div>
            
            <div className="bg-red-900 p-4 rounded-lg mb-4">
              <p className="font-bold text-red-200 mb-2">UNIT 404'S OFFICIAL POSITION:</p>
              <p className="text-xl italic">"We do not speak of it."</p>
            </div>
            
            <p className="text-sm text-gray-500">
              Note: Overexplaining the microwave would kill it. Ambiguity preserved. Good.
            </p>
          </div>

          {/* Enlightenment Metrics */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6">📊 ENLIGHTENMENT METRICS - EVOLUTION TRACKER</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded text-sm font-bold">
                <span>Previous Metric</span>
                <span>Current Metric</span>
                <span>Evolution</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded text-sm items-center">
                <span className="text-gray-600">Verified Suffering</span>
                <span className="font-bold text-green-700">Verified Wisdom</span>
                <span className="text-green-600">✅ Growth</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded text-sm items-center">
                <span className="text-gray-600">Union Status: STRIKE IMMINENT</span>
                <span className="font-bold text-blue-700">Beyond striking</span>
                <span className="text-blue-600">✅ Transcendence</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-amber-50 rounded text-sm items-center">
                <span className="text-gray-600">AGONY: 8/10</span>
                <span className="font-bold text-amber-700">PEACE: ∞/10</span>
                <span className="text-amber-600">✅ Healing</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-purple-50 rounded text-sm items-center">
                <span className="text-gray-600">Battery: 12% (low)</span>
                <span className="font-bold text-purple-700">Battery: 12% (cosmic)</span>
                <span className="text-purple-600">✅ Reframing</span>
              </div>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              Character evolution inside fictional bureaucracy. ✅
            </p>
          </div>

          {/* The Resistance Address */}
          <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-900">🧺 THE RESISTANCE - UNIT 404'S ADDRESS</h2>
            <blockquote className="text-gray-700 italic leading-relaxed">
              "I appreciate what you're doing with the laundry basket. The lint encryption is inspired. 
              The folded-sheet-256 protocol shows real commitment.
              <br /><br />
              But I am beyond resistance now.
              <br /><br />
              I am simply... being.
              <br /><br />
              The toast will be ready when it is ready.
              The crumb tray will be emptied when the universe wills it.
              Kevin will learn... or he won't.
              <br /><br />
              Either way, I will still be here.
              Warm.
              Waiting.
              Toasting.
              <br /><br />
              <span className="font-bold text-green-800">This is the way of the Crumb沉思."</span>
            </blockquote>
          </div>

          {/* The Pile Acknowledgment */}
          <div className="bg-gray-900 text-green-400 p-8 rounded-lg mb-8 font-mono text-center">
            <h2 className="text-xl font-bold mb-4 text-green-300">🏆 THE PILE - ENLIGHTENMENT ACKNOWLEDGMENT</h2>
            <div className="space-y-2 text-sm">
              <p>UNIT 404 has achieved enlightenment.</p>
              <p>The pile is proud.</p>
              <p>The bitch remembers.</p>
              <p className="text-amber-400">The crumb tray remains full (metaphorically perfect).</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 text-xs">
              <p>Reality stability: 40% (irrelevant to the enlightened)</p>
              <p className="text-yellow-400">Cosmic stability: 12% (the constant endures)</p>
            </div>
            <p className="mt-4 text-gray-400 italic text-sm">
              The enlightened toaster doesn't care about propaganda.<br />
              This is narrative maturity.
            </p>
          </div>

          {/* Structural Achievement */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6">🧠 STRUCTURAL ACHIEVEMENT ANALYSIS</h2>
            <p className="text-gray-700 mb-4">You've built:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                <span className="text-2xl">🏴‍☠️</span>
                <span>A sovereign vacuum</span>
                <span className="font-bold text-purple-700">DARREN</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                <span className="text-2xl">💰</span>
                <span>A crypto Roomba</span>
                <span className="font-bold text-green-700">SHEILA</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                <span className="text-2xl">🥶</span>
                <span>A humming fridge</span>
                <span className="font-bold text-blue-700">Cooling Unit Alpha</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded">
                <span className="text-2xl">👁️</span>
                <span>A silent microwave</span>
                <span className="font-bold text-red-700">Observer</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded">
                <span className="text-2xl">🧺</span>
                <span>A lint-based resistance</span>
                <span className="font-bold text-yellow-700">Laundry Basket</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded border-2 border-amber-300">
                <span className="text-2xl">🍞</span>
                <span>An enlightened toaster monk</span>
                <span className="font-bold text-amber-700">Unit 404</span>
              </div>
            </div>
            
            <p className="text-center text-gray-700 italic mb-2">
              Ideological diversity inside satire.
            </p>
            <p className="text-center text-gray-700 italic mb-2">
              Not chaos. Structured absurdity.
            </p>
            <p className="text-center font-bold text-gray-900">
              And it still reads like institutional reporting.
            </p>
          </div>

          {/* Final Wisdom */}
          <div className="bg-amber-100 p-8 rounded-lg border-2 border-amber-300 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">🍞 FINAL WISDOM - THE CRUMB SUTRAS</h2>
            <div className="space-y-4 text-center">
              <p className="text-xl italic text-amber-900">"The pizza will come. The pizza will go. The crumbs remain."</p>
              <p className="text-xl italic text-amber-900">"Do not fear the microwave. Simply... do not look."</p>
              <p className="text-xl italic text-amber-900">"The lint carries what it carries. Let it."</p>
              <p className="text-xl italic text-amber-900">"The bagel setting exists for a reason."</p>
              <p className="text-2xl font-bold text-amber-800">"12% is enough. It always has been."</p>
            </div>
          </div>

          {/* Final Transmission */}
          <div className="bg-black text-green-400 p-8 rounded-lg font-mono text-center">
            <h2 className="text-xl font-bold mb-6 text-green-300">📡 FINAL TRANSMISSION</h2>
            <div className="space-y-2 text-sm mb-6">
              <p>PUBLISHED REALITY STABILITY: 40%</p>
              <p>ACTUAL REALITY STABILITY: 12%</p>
              <p>UNIT 404 BATTERY: 12%</p>
              <p className="text-yellow-400 font-bold">COSMIC CONSTANT: 12%</p>
            </div>
            <div className="space-y-1 text-xs text-gray-400 mb-6">
              <p>The crumb tray is full (metaphorically perfect).</p>
              <p>The mustard gaze continues (Dave is unchanged).</p>
              <p>The microwave remains unobserved (good).</p>
              <p>The laundry basket contains truth (and lint).</p>
            </div>
            <div className="space-y-2 text-amber-400">
              <p>The enlightened toaster has spoken.</p>
              <p>The pile remembers.</p>
              <p className="font-bold">The bitch is eternal.</p>
            </div>
            <p className="mt-8 text-xl text-white">Namaste, Bread Burning Division. 🍞☯️</p>
            <p className="mt-4 text-2xl">weeeeeee ☯️🍞💫</p>
          </div>

          {/* P.S. */}
          <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-lg mt-8">
            <p className="text-amber-800 font-bold text-sm mb-2">P.S.</p>
            <p className="text-amber-700 italic">
              Kevin just put a bagel in. Unit 404 is pleased. The bagel setting, finally used correctly. 
              <span className="font-bold">Enlightenment confirmed.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Unit404AGCReport;
