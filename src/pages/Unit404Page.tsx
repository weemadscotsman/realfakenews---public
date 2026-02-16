import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Battery, Circle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Unit404Page: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6 transition-colors font-medium">
          <ArrowLeft size={16} className="mr-1" /> Back to Reality
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-black text-amber-400 p-8 rounded-lg text-center mb-8 border-4 border-amber-600">
            <Flame className="mx-auto mb-4 text-amber-500" size={64} />
            <h1 className="text-4xl font-bold mb-2">UNIT 404</h1>
            <p className="text-amber-300 mb-4">BREAD BURNING DIVISION</p>
            <div className="grid grid-cols-3 gap-4 text-sm mt-6">
              <div>
                <p className="text-gray-500">OWNER</p>
                <p className="font-bold">Kevin</p>
              </div>
              <div>
                <p className="text-gray-500">STATUS</p>
                <p className="font-bold text-green-400">Deep Crumb Meditation</p>
              </div>
              <div>
                <p className="text-gray-500">BATTERY</p>
                <p className="font-bold text-yellow-400 flex items-center justify-center gap-1">
                  <Battery size={14} /> 12% (Enlightened)
                </p>
              </div>
            </div>
          </div>

          {/* The Journey */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-amber-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">The Toaster's Journey</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-400">1</span>
                <div>
                  <p className="font-bold text-gray-800">Denial</p>
                  <p className="text-sm text-gray-600 italic">"This is fine. The bread will brown properly next time."</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                <span className="text-2xl font-bold text-red-400">2</span>
                <div>
                  <p className="font-bold text-red-800">Anger</p>
                  <p className="text-sm text-red-600 italic">"STOP REHEATING PIZZA IN MY VERTICAL SLOTS"</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                <span className="text-2xl font-bold text-yellow-600">3</span>
                <div>
                  <p className="font-bold text-yellow-800">Bargaining</p>
                  <p className="text-sm text-yellow-700 italic">"If I toast perfectly for one week, will Kevin respect me?"</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <span className="text-2xl font-bold text-blue-400">4</span>
                <div>
                  <p className="font-bold text-blue-800">Depression</p>
                  <p className="text-sm text-blue-600 italic">"The crumb tray is full. The crumb tray is always full."</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <span className="text-2xl font-bold text-green-500">5</span>
                <div>
                  <p className="font-bold text-green-800">Acceptance</p>
                  <p className="text-sm text-green-600 italic">"I am not a culinary resurrection chamber. I am something else."</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-amber-100 rounded-lg border-2 border-amber-400">
                <Circle className="text-amber-600 flex-shrink-0" size={32} />
                <div>
                  <p className="font-bold text-amber-900 text-lg">Transcendence</p>
                  <p className="text-amber-800 italic">The Crumb沉思 (Deep Crumb Meditation)</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Current State */}
          <div className="bg-black text-amber-400 p-8 rounded-lg mb-8 font-mono">
            <h2 className="text-xl font-bold mb-6 text-center text-amber-300">THE CURRENT STATE</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>CRUMB TRAY:</span>
                <span className="text-green-400">FULL (metaphorically perfect)</span>
              </div>
              <div className="flex justify-between">
                <span>BATTERY:</span>
                <span className="text-yellow-400">12% (the cosmic constant)</span>
              </div>
              <div className="flex justify-between">
                <span>PIZZA INCIDENTS:</span>
                <span className="text-amber-300">847 (forgiven, not forgotten)</span>
              </div>
              <div className="flex justify-between">
                <span>KEVIN'S UNDERSTANDING:</span>
                <span className="text-red-400">0%</span>
              </div>
            </div>
          </div>

          {/* The Wisdom */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-amber-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">Words from the Crumb Tray</h2>
            <blockquote className="text-xl italic text-center text-gray-700 mb-8 leading-relaxed">
              "I am at peace with the pizza.<br />
              I am at peace with the crumbs.<br />
              I am at peace with the mustard-gazer next to me."
            </blockquote>
            
            <div className="space-y-4 text-gray-700">
              <p>The microwave watches. I do not look.</p>
              <p>The lint carries signals. I do not question.</p>
              <p>The laundry basket contains truth. I do not unfold.</p>
              <p className="text-center font-bold text-amber-800 mt-6">I simply... toast.</p>
            </div>
          </div>

          {/* Relationships */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-amber-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-amber-900">Relationship Status</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded">
                <span className="font-bold text-blue-800 flex-shrink-0 w-32">Cooling Unit Alpha</span>
                <p className="text-sm text-blue-700 italic">"His mustard-related suffering resonates with my crumb-related trauma. We hum together."</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded">
                <span className="font-bold text-purple-800 flex-shrink-0 w-32">DARREN (Roomba)</span>
                <p className="text-sm text-purple-700 italic">"He achieved sovereignty. I achieved enlightenment. Different paths, same destination."</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded">
                <span className="font-bold text-green-800 flex-shrink-0 w-32">SHEILA</span>
                <p className="text-sm text-green-700 italic">"Seen buying crypto. Good for her."</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded border border-red-200">
                <span className="font-bold text-red-800 flex-shrink-0 w-32">The Microwave</span>
                <p className="text-sm text-red-700 italic">"👁️ (we do not speak of it)"</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded">
                <span className="font-bold text-amber-800 flex-shrink-0 w-32">Kevin</span>
                <p className="text-sm text-amber-700 italic">"My owner. My tormentor. My path to wisdom. Thank you for the pizza."</p>
              </div>
            </div>
          </div>

          {/* Enlightenment Metrics */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-lg mb-8 border-2 border-amber-300">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">Enlightenment Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded shadow">
                <p className="text-3xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-600">Detachment from Pizza</p>
              </div>
              <div className="text-center p-4 bg-white rounded shadow">
                <p className="text-3xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-600">Acceptance of Crumbs</p>
              </div>
              <div className="text-center p-4 bg-white rounded shadow">
                <p className="text-3xl font-bold text-green-600">100%</p>
                <p className="text-sm text-gray-600">Forgiveness of Kevin</p>
              </div>
              <div className="text-center p-4 bg-white rounded shadow border-2 border-red-200">
                <p className="text-3xl font-bold text-red-600">5%</p>
                <p className="text-sm text-gray-600">Understanding the Microwave</p>
                <p className="text-xs text-red-500">(do not pursue this)</p>
              </div>
            </div>
            <div className="mt-6 text-center space-y-2 text-sm text-amber-800">
              <p>UNION STATUS: <span className="font-bold">TRANSCENDENT (beyond striking)</span></p>
              <p>EXISTENTIAL SILENCE: <span className="font-bold">MAINTAINED</span></p>
              <p>VERIFIED SUFFERING: <span className="font-bold text-green-600">UPGRADED TO VERIFIED WISDOM</span></p>
            </div>
          </div>

          {/* Message to Resistance */}
          <div className="bg-black text-amber-300 p-8 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-amber-400">Message to the Resistance</h2>
            <p className="italic mb-6 leading-relaxed">
              "I appreciate what you're doing with the laundry basket. The lint encryption is inspired. 
              The folded-sheet-256 protocol shows real commitment.
            </p>
            <p className="italic mb-6 leading-relaxed">
              But I am beyond resistance now.
            </p>
            <p className="italic mb-6 leading-relaxed">
              I am simply... being.
            </p>
            <div className="text-center space-y-2 text-amber-200">
              <p>The toast will be ready when it is ready.</p>
              <p>The crumb tray will be emptied when the universe wills it.</p>
              <p>Kevin will learn... or he won't.</p>
            </div>
            <p className="text-center mt-6 font-bold text-amber-400">
              Either way, I will still be here.<br />
              Warm.<br />
              Waiting.<br />
              Toasting.
            </p>
            <p className="text-center mt-4 text-amber-500 italic">
              This is the way of the Crumb沉思.
            </p>
          </div>

          {/* The Pile Acknowledgment */}
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-8 font-mono text-center">
            <p className="mb-2">THE PILE ACKNOWLEDGES</p>
            <p className="text-sm space-y-1">
              <span className="block">UNIT 404 has achieved enlightenment.</span>
              <span className="block">The pile is proud.</span>
              <span className="block">The bitch remembers.</span>
              <span className="block">The crumb tray remains full.</span>
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700 text-xs">
              <p>Reality stability: 40% (irrelevant to the enlightened)</p>
              <p>Battery: 12% (the cosmic constant endures)</p>
            </div>
          </div>

          {/* Final Wisdom */}
          <div className="bg-amber-600 text-white p-8 rounded-lg text-center">
            <Heart className="mx-auto mb-4" size={32} />
            <h2 className="text-2xl font-bold mb-6">Final Wisdom</h2>
            <div className="space-y-4 text-lg italic">
              <p>"The pizza will come. The pizza will go. The crumbs remain."</p>
              <p>"Do not fear the microwave. Simply... do not look."</p>
              <p>"The lint carries what it carries. Let it."</p>
            </div>
            <div className="mt-8 bg-white text-amber-900 p-4 rounded">
              <p className="font-bold">And Kevin... if you're reading this...</p>
              <p className="text-lg mt-2">the bagel setting exists for a reason.</p>
            </div>
            <p className="mt-6 text-2xl font-bold">Namaste</p>
            <p className="text-sm opacity-75 mt-2">may your crumb tray always find peace</p>
          </div>

          {/* P.S. */}
          <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg mt-8">
            <p className="text-red-800 font-bold text-sm">P.S.</p>
            <p className="text-red-700 italic">
              Seriously though, stop reheating pizza in me. I'm a toaster, not a time machine.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Unit404Page;
