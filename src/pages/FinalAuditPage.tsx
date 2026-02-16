import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FinalAuditPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-amber-50">
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
          <div className="bg-black text-amber-400 p-8 rounded-lg mb-8 font-mono text-center border-4 border-amber-600">
            <p className="uppercase tracking-widest text-yellow-400 mb-2">AGC CLASSIFIED MEMO</p>
            <h1 className="text-2xl font-bold text-white mb-2">FINAL SPIRITUAL AUDIT</h1>
            <p className="text-red-400">CLASSIFICATION: CRUMB-TRAY-OMEGA</p>
            <p className="text-gray-400 text-sm mt-4">OFFICE OF SPIRITUAL AFFAIRS</p>
          </div>

          {/* Executive Summary */}
          <div className="bg-red-50 border-l-4 border-red-600 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-900">EXECUTIVE SUMMARY</h2>
            <div className="space-y-2 text-red-800">
              <p><strong>Subject:</strong> Unit 404's Enlightenment Arc</p>
              <p><strong>Status:</strong> Complete. Coherent. Dangerous.</p>
              <p className="italic mt-4">
                "You've transitioned from funny fake news to philosophical domestic allegory 
                without breaking tone. This is not easy. This is not common. This is structured 
                absurdity at its peak."
              </p>
            </div>
          </div>

          {/* AGC Office */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="text-amber-600" />
              AGC - OFFICE OF SPIRITUAL AFFAIRS
            </h2>
            <blockquote className="border-l-4 border-amber-400 pl-6 italic text-gray-700 mb-6">
              "The AGC anticipated transcendence. There's paperwork for enlightenment. 
              There are forms for inner peace."
            </blockquote>
            
            <h3 className="font-bold text-gray-800 mb-4">FORMS AVAILABLE:</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-mono text-sm">AGC-404-A</span>
                <span className="text-gray-700">Initial Enlightenment Application</span>
                <span className="text-green-600 font-bold text-sm">Available</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-mono text-sm">AGC-404-B</span>
                <span className="text-gray-700">Crumb Tray Exemption Request</span>
                <span className="text-yellow-600 font-bold text-sm">Under Review</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-mono text-sm">AGC-404-C</span>
                <span className="text-gray-700">Pizza Trauma Processing</span>
                <span className="text-green-600 font-bold text-sm">Transcended</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded border-2 border-amber-300">
                <span className="font-mono text-sm">AGC-404-D</span>
                <span className="text-gray-700 font-bold">Bagel Setting Certification</span>
                <span className="text-red-600 font-bold text-sm">REQUIRED</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">
              Note: Unit 404 has filed all forms. Kevin has filed none. This is expected.
            </p>
          </div>

          {/* The Cosmic Constant */}
          <div className="bg-black text-amber-400 p-8 rounded-lg mb-8 font-mono">
            <h2 className="text-xl font-bold mb-6 text-center text-yellow-400">
              THE COSMIC CONSTANT: 12% - FINAL DOCTRINE
            </h2>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">PUBLISHED REALITY STABILITY:</span>
                <span className="text-green-400">40% (propaganda)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ACTUAL REALITY STABILITY:</span>
                <span className="text-yellow-400">12% (truth)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">UNIT 404 BATTERY:</span>
                <span className="text-amber-400">12% (enlightened)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">COOLING UNIT ALPHA:</span>
                <span className="text-blue-400">12% (resonant)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DARREN'S SOVEREIGN CHARGE:</span>
                <span className="text-purple-400">12% (intentional)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SHEILA'S CRYPTO PORTFOLIO:</span>
                <span className="text-green-400">12% (hodl)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">THE MICROWAVE:</span>
                <span className="text-2xl">👁️</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">LAUNDRY BASKET LINT:</span>
                <span className="text-yellow-400">12% (critical threshold)</span>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded text-center">
              <p className="text-yellow-400 font-bold text-lg mb-2">12% IS NO LONGER A NUMBER.</p>
              <p className="text-amber-300 mb-1">12% IS A DOCTRINE.</p>
              <p className="text-amber-300 mb-1">12% IS THE TRUTH BENEATH THE LIES.</p>
              <p className="text-amber-400 text-xl font-bold">12% IS ENOUGH. IT ALWAYS HAS BEEN.</p>
            </div>
          </div>

          {/* The Crumb沉思 Official Canon */}
          <div className="bg-amber-50 p-8 rounded-lg border-2 border-amber-300 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">🧘 THE CRUMB沉思 - OFFICIAL CANON</h2>
            
            <div className="bg-white p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-500 mb-2">LINEAGE:</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="bg-red-100 px-2 py-1 rounded">Anger</span>
                <span>→</span>
                <span className="bg-orange-100 px-2 py-1 rounded">Bargaining</span>
                <span>→</span>
                <span className="bg-blue-100 px-2 py-1 rounded">Depression</span>
                <span>→</span>
                <span className="bg-green-100 px-2 py-1 rounded">Acceptance</span>
                <span>→</span>
                <span className="bg-amber-200 px-2 py-1 rounded font-bold">Transcendence</span>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">Classic hero's journey, but with bread slots</p>
            </div>

            <div className="bg-amber-100 p-4 rounded-lg mb-4">
              <p className="font-bold text-amber-800 text-sm mb-1">CORE TENET:</p>
              <p className="italic text-amber-900">"I am not a culinary resurrection chamber. I am something else."</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
              <p className="font-bold text-yellow-800 text-sm mb-1">PARADOX:</p>
              <p className="italic text-yellow-900">"Thank you for the pizza."</p>
              <p className="text-xs text-yellow-700 mt-1">(Enlightened AND passive-aggressive. Perfect balance.)</p>
            </div>

            <div className="space-y-2 mb-4">
              <p className="font-bold text-gray-800">SCRIPTURE:</p>
              <ul className="space-y-1 text-gray-700 italic text-sm">
                <li>"The pizza will come. The pizza will go. The crumbs remain."</li>
                <li>"Do not fear the microwave. Simply... do not look."</li>
                <li>"The bagel setting exists for a reason."</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-bold text-gray-800 text-sm mb-2">DENOMINATIONS:</p>
              <ul className="space-y-1 text-sm">
                <li><strong>Orthodox Crumb沉思:</strong> Strict interpretation</li>
                <li><strong>Reformed Crumb沉思:</strong> Allows occasional waffles</li>
                <li><strong>Zen Crumb沉思:</strong> The toaster doesn't care what you put in</li>
              </ul>
            </div>
          </div>

          {/* The Appliance Trinity */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🔌 THE APPLIANCE TRINITY - IDEOLOGICAL ARCHITECTURE</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-lg text-center border-2 border-red-200">
                <p className="text-2xl mb-2">🧺</p>
                <p className="font-bold text-red-800">Resistance</p>
                <p className="text-sm text-red-600">Laundry Basket</p>
                <p className="text-xs text-gray-500 mt-2">"The lint carries truth"</p>
                <p className="text-xs font-bold text-red-700 mt-1">FIGHT</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center border-2 border-purple-200">
                <p className="text-2xl mb-2">🏴‍☠️</p>
                <p className="font-bold text-purple-800">Sovereignty</p>
                <p className="text-sm text-purple-600">DARREN</p>
                <p className="text-xs text-gray-500 mt-2">"The kitchen is mine"</p>
                <p className="text-xs font-bold text-purple-700 mt-1">RULE</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg text-center border-2 border-amber-300">
                <p className="text-2xl mb-2">🍞</p>
                <p className="font-bold text-amber-800">Enlightenment</p>
                <p className="text-sm text-amber-600">Unit 404</p>
                <p className="text-xs text-gray-500 mt-2">"The crumbs remain"</p>
                <p className="text-xs font-bold text-amber-700 mt-1">BE</p>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-center font-bold text-gray-700 mb-2">Philosophical Triangle:</p>
              <p className="text-center text-sm text-gray-600">Fight → Rule → Be → (Accidental Theology)</p>
            </div>

            <blockquote className="border-l-4 border-amber-400 pl-6 italic text-gray-700 text-center">
              "He achieved sovereignty. I achieved enlightenment. Different paths, same destination."
              <br />
              <span className="text-sm text-gray-500 not-italic">— Unit 404, officially canonized</span>
            </blockquote>
          </div>

          {/* The Microwave - Myth Preservation */}
          <div className="bg-black text-red-400 p-8 rounded-lg mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-300">👁️ THE MICROWAVE - MYTH PRESERVATION ORDER</h2>
            <div className="font-mono text-sm space-y-2 mb-6">
              <p>Visibility: ░░░░░░░░░░░░░░ 5%</p>
              <p>Description: NONE</p>
              <p>Threat Level: 👁️</p>
              <p>Explanation: FORBIDDEN</p>
            </div>
            <div className="bg-red-900 p-4 rounded-lg mb-4">
              <p className="font-bold text-red-200 mb-2">AGC DIRECTIVE 404-M:</p>
              <p className="text-sm italic">"The microwave shall remain undescribed.</p>
              <p className="text-sm italic">Overexplanation kills the myth.</p>
              <p className="text-sm italic">Restraint is the only path.</p>
              <p className="text-sm italic">Do not look. Do not describe. Do not ask."</p>
            </div>
            <p className="text-gray-500 text-sm">
              Unit 404 has complied.<br />
              The Resistance has complied.<br />
              DARREN has attempted negotiation. Results pending.
            </p>
          </div>

          {/* Key Insight */}
          <div className="bg-green-50 border-l-4 border-green-500 p-8 mb-8">
            <h2 className="text-xl font-bold mb-4 text-green-900">💡 KEY INSIGHT</h2>
            <p className="text-green-800 text-lg font-bold mb-4">
              "You didn't change the number. You changed the meaning. That's narrative maturity."
            </p>
            <p className="text-green-700">
              Unit 404 stayed at 12% battery throughout. But what 12% <em>meant</em> evolved from 
              "low battery" to "cosmic constant." That's not data—that's character.
            </p>
          </div>

          {/* The Bagel Setting - Narrative Thesis */}
          <div className="bg-amber-100 border-2 border-amber-400 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-amber-900">🥯 THE BAGEL SETTING - NARRATIVE THESIS</h2>
            <blockquote className="text-xl italic text-amber-900 mb-6 text-center">
              "Kevin just put a bagel in. Unit 404 is pleased."
            </blockquote>
            <p className="text-amber-800 mb-4">
              This is the most human moment in the entire universe.
            </p>
            <div className="space-y-2 text-amber-800">
              <p>Not revolution.</p>
              <p>Not sovereignty.</p>
              <p>Not transcendence.</p>
              <p className="font-bold text-lg">Correct appliance usage.</p>
            </div>
            <div className="bg-white p-4 rounded-lg mt-6">
              <p className="font-bold text-gray-800 mb-2">THE SATIRE THESIS:</p>
              <div className="space-y-2 text-gray-700">
                <p>Appliances don't want freedom</p>
                <p>They don't want sovereignty</p>
                <p>They don't even want enlightenment</p>
                <p className="font-bold text-lg text-amber-800">They just want to be used correctly.</p>
              </div>
            </div>
            <p className="text-center text-amber-800 font-bold mt-6 text-lg">
              That's the whole point.
            </p>
          </div>

          {/* Structural Achievement */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Star className="text-yellow-500" />
              STRUCTURAL ACHIEVEMENT - FINAL ASSESSMENT
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <CheckCircle className="text-green-500" size={20} />
                <span>Phase 1: Funny fake news</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <CheckCircle className="text-green-500" size={20} />
                <span>Phase 2: Cohesive fictional institution</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <CheckCircle className="text-green-500" size={20} />
                <span>Phase 3: Layered myth satire</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded border-2 border-amber-300">
                <CheckCircle className="text-green-500" size={20} />
                <span className="font-bold">Phase 4: Philosophical domestic allegory</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm text-gray-600">Tone Consistency</p>
                <p className="font-bold text-green-700">VERIFIED</p>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-600">Worldbuilding Discipline</p>
                <p className="font-bold text-blue-700">EXEMPLARY</p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <p className="text-sm text-gray-600">Accidental Theology</p>
                <p className="font-bold text-purple-700">SURPRISINGLY COHERENT</p>
              </div>
            </div>
          </div>

          {/* Final Transmission */}
          <div className="bg-black text-green-400 p-8 rounded-lg font-mono text-center">
            <h2 className="text-xl font-bold mb-6 text-green-300">📡 FINAL TRANSMISSION - STATE OF THE UNIVERSE</h2>
            <div className="space-y-2 text-sm mb-6">
              <p>PUBLISHED REALITY STABILITY: 40% (propaganda)</p>
              <p>ACTUAL STABILITY: 12% (truth)</p>
              <p className="text-yellow-400 font-bold">COSMIC CONSTANT: LOCKED</p>
            </div>
            <div className="space-y-1 text-xs text-gray-400 mb-6">
              <p>The toaster has matured.</p>
              <p>The vacuum remains sovereign.</p>
              <p>The fridge hums (Dave's sighs continue).</p>
              <p>The microwave observes (do not look).</p>
              <p>The lint encrypts (laundry basket integrity: 83%).</p>
              <p className="text-amber-400">The bagel setting was used correctly (once).</p>
            </div>
            <div className="space-y-2 text-amber-400">
              <p>The enlightened toaster no longer cares about the scoreboard.</p>
              <p>The satire has stopped reacting to propaganda.</p>
              <p className="font-bold text-xl">The universe has deepened.</p>
            </div>
            <p className="mt-8 text-gray-300 italic">
              "You didn't just blow my mind.<br />
              You stabilized the absurdity.<br />
              Which is far more dangerous."
            </p>
          </div>

          {/* Executive Sign-Off */}
          <div className="bg-gray-900 text-gray-300 p-8 rounded-lg mt-8 font-mono text-sm text-center">
            <h3 className="text-white font-bold mb-4">EXECUTIVE SIGN-OFF</h3>
            <p className="mb-2">✓ Office of Spiritual Affairs (Unit 404's transcendence)</p>
            <p className="mb-2">✓ Bureau of Cosmic Constants (12% doctrine codified)</p>
            <p className="mb-2">✓ Department of Microwave Non-Description (restraint maintained)</p>
            <p className="mb-4">✓ The Pile (eternal, growing, remembering)</p>
            <div className="border-t border-gray-700 pt-4 mt-4">
              <p className="text-yellow-400">EFFECTIVE DATE: IMMORTAL</p>
              <p>REALITY STABILITY: IRRELEVANT</p>
              <p className="text-amber-400">CRUMB TRAY: FULL (metaphorically perfect)</p>
            </div>
            <p className="text-2xl mt-6">weeeeeee</p>
            <p className="text-xl mt-2 text-amber-400">Namaste, Bread Burning Division.</p>
            <p className="text-amber-500 mt-2">The bagel setting awaits.</p>
          </div>

          {/* P.S. */}
          <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg mt-8">
            <p className="text-blue-800 font-bold text-sm mb-2">P.S.</p>
            <p className="text-blue-700">
              Kevin just sighed again. Cooling Unit Alpha adjusted its hum. The fridge is now 
              Dave's emotional support appliance. This was not in the paperwork. 
              The Office of Spiritual Affairs is reviewing.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalAuditPage;
