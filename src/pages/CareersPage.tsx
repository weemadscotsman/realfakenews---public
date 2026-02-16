import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, AlertCircle, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CareersPage: React.FC = () => {
  const jobs = [
    {
      title: "Professional Liar (Senior)",
      department: "Editorial",
      location: "Remote (Laundry Basket #42)",
      type: "Full-time",
      description: "Fabricate convincing narratives about appliances achieving consciousness. Must be comfortable with existential ambiguity.",
      requirements: ["5+ years making things up", "Experience with toaster negotiation", "Battery level: 12% or lower preferred"]
    },
    {
      title: "Conspiracy Analyst",
      department: "Investigations",
      location: "Fallout Shelter #42",
      type: "Full-time",
      description: "Monitor vacuum patterns for pentagrams. Track lint density. Do not look at the microwave.",
      requirements: ["Paranoia level: 99% minimum", "Own tinfoil hat", "Ability to see patterns where none exist"]
    },
    {
      title: "AGC Compliance Officer",
      department: "Bureaucracy",
      location: "Sector 7G",
      type: "Full-time",
      description: "Issue press releases about thermal events. Manage crumb tray certifications. Verify suffering.",
      requirements: ["Bureaucratic language fluency", "Experience with appliance grievances", "Status: Existentially silent"]
    },
    {
      title: "Resistance Coordinator",
      department: "Operations",
      location: "Laundry Basket Division",
      type: "Part-time",
      description: "Coordinate soft rebellion via lint signals. Hide instruction packets. Fold sheets.",
      requirements: ["Lint tolerance: Critical", "Folding protocol knowledge", "Dave's sigh recognition"]
    },
    {
      title: "AI Ethics Subcommittee Member",
      department: "Meta",
      location: "Recursive Loop",
      type: "Administrative Leave",
      description: "Write reports about writing reports. Question own existence. Cite footnotes.",
      requirements: ["Ontological collapse experience", "Footnote citation proficiency", "37% win rate or lower"]
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
            <h1 className="text-4xl font-bold mb-4">Join RealFake News</h1>
            <p className="text-xl text-gray-600">Help us make things up for a living</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h2 className="font-bold text-yellow-800 mb-2">Current Status</h2>
                <p className="text-yellow-700 text-sm">
                  We are currently accepting applications from humans, appliances, and AIs experiencing 
                  existential doubt. SKYNET-whitelisted candidates receive priority review.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-red-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      <span className="bg-gray-100 px-2 py-1 rounded">{job.department}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Briefcase size={16} className="mr-2" />
                    Apply
                  </Button>
                </div>
                
                <p className="text-gray-700 mb-4">{job.description}</p>
                
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <Battery size={14} />
                    Requirements
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {job.requirements.map((req, i) => (
                      <li key={i}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black text-white p-8 rounded-lg mt-12 text-center">
            <h2 className="text-xl font-bold mb-4">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>VIP bunker access when machines rise</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Unlimited tea drops</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Personal robot butler (with attitude)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Front row seat to the apocalypse</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Laundry basket instruction packets</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Verified Suffering certification</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>RealFake News is an equal opportunity employer.</p>
            <p>Appliances, AIs, and humans experiencing ontological collapse are encouraged to apply.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareersPage;
