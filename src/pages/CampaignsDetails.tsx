import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileDown } from 'lucide-react';

const CampaignsDetails: React.FC = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const recentDonors = [
    { name: 'John Adams', amount: '$50' },
    { name: 'Jane Smith', amount: '$75' },
    { name: 'Emily Johnson', amount: '$100' },
    { name: 'Michael Brown', amount: '$125' },
    { name: 'Sarah Davis', amount: '$150' }
  ];

  const comments = [
    {
      name: 'John Adams',
      amount: '$50',
      date: 'Aug 15, 2025',
      comment: 'Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. Quam tortor facilisi varius molestie ut quam sit euismod maecenas. Sit fringilla porta consequat ante. Vitae elementum pellentesque amet nulla porttitor ut amet diam purus. Cras enim ultricies quis non pulvinar turpis etiam.'
    },
    {
      name: 'John Adams',
      amount: '$50',
      date: 'Aug 15, 2025',
      comment: 'Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. Quam tortor facilisi varius molestie ut quam sit euismod maecenas. Sit fringilla porta consequat ante. Vitae elementum pellentesque amet nulla porttitor ut amet diam purus. Cras enim ultricies quis non pulvinar turpis etiam.'
    }
  ];

  const reports = [
    { name: 'Project Budget & Estimate', size: '200 KB' },
    { name: 'Impact Report August 2025', size: '560 KB' },
    { name: 'Impact Report April 2025', size: '200 KB' },
    { name: 'Impact Report August 2025', size: '560 KB' }
  ];

  return (
    <div className="min-h-screen bg-[#020E05] stroke-[#000000] opacity-100 text-white">
      <Header />
      
      {/* Back Button */}
      <Link to="/campaigns">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.button 
            className="flex items-center text-white bg-[#132418] rounded-full px-4 py-2 hover:text-green-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>
        </div>
      </Link>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Location and School Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center text-green-400 mb-2">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Cape Coast, Ghana
              </div>
              <h1 className="text-4xl font-bold mb-6">Support Christ is King Primary School</h1>
            </motion.div>

            {/* Campaign Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <img 
                src="/students-happy.jpg" 
                alt="Christ is King Primary School"
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </motion.div>

            {/* Challenge Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 py-8 max-w-xl"
            >
              <button className="bg-[#112517] rounded-full text-xl font-bold py-3 px-6 mb-4">Lack of Basic Computers</button>
              <div className="text-gray-300 leading-relaxed">
                <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
                  Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. Quam tortor facilisi varius molestie ut quam sit euismod maecenas. Sit fringilla porta consequat ante. Vitae elementum pellentesque amet nulla porttitor ut amet diam purus. Cras enim ultricies quis non pulvinar turpis etiam.
                </p>
                {!showFullDescription && (
                  <button 
                    onClick={() => setShowFullDescription(true)}
                    className="text-white opacity-65 mt-2 font-semibold"
                  >
                    Read more
                  </button>
                )}
              </div>
            </motion.div>

            {/* Additional Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 max-w-xl"
            >
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`/students-happy.jpg`}
                    alt={`School image ${i}`}
                    className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 mb-12 max-w-xl"
            >
              <Link to="/donate">
              <button className="w-full bg-[#112416] text-white px-8 py-3 rounded-full font-semibold flex-1 md:flex-none">
                Donate
              </button>
              </Link>
              <button className="w-full bg-[#112416] text-white px-8 py-3 rounded-full font-semibold">
                Share
              </button>
            </motion.div>

            {/* Recent Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-green-400 opacity-85 mb-6">Recent Updates</h2>
              <div className="max-w-xl">
                <div className="flex items-center mb-4">
                  <span className="text-white font-semibold">Yesterday by John Johnson</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. Quam tortor facilisi varius molestie ut quam sit euismod maecenas. Sit fringilla porta consequat ante. Vitae elementum pellentesque amet nulla porttitor ut amet diam purus. Cras enim ultricies quis non pulvinar turpis etiam.
                </p>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`/students-happy.jpg`}
                      alt={`Update image ${i}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ))}
                </div>
                <button className="text-white opacity-65 font-semibold">
                  See older updates
                </button>
              </div>
            </motion.div>

            {/* Reports & Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-green-400 opacity-85 mb-6">Reports & Relevant Document</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                {reports.map((report, index) => (
                  <div key={index} className="bg-[#121F15] rounded-full p-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileDown />
                      <div>
                        <p className="text-white font-semibold">{report.name}</p>
                        <p className="text-gray-400 text-sm">{report.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Comments from Donors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-green-400 mb-6">Comments from Donors</h2>
              <div className="space-y-6 max-w-xl">
                {comments.map((comment, index) => (
                  <div key={index} className="">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-gray-900 font-bold mr-4">
                        {comment.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="text-white font-semibold mr-2">{comment.name}</span>
                          <span className="text-green-400 mr-2">•</span>
                          <span className="text-green-400 font-semibold mr-4">{comment.amount}</span>
                          <span className="text-gray-400 text-sm">{comment.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Organizer - Moved from sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-12"
            >
              <h3 className="text-xl font-bold text-green-400 mb-6">Organizer</h3>
              
              <div className="flex items-center mb-4">
                <div className='flex'>
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-gray-900 font-bold mr-4">
                    JJ
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">John Johnson</h4>
                    <p className="text-gray-400 text-sm">ICT Coordinator</p>
                  </div>
                </div>
              
                <button className="bg-[#121F15] text-white px-4 py-2 rounded-full font-semibold mb-4">
                  Send Message
                  <ArrowRight className="inline-block ml-2" size={16} />
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-sm mb-2">on Behalf of</p>
                <h5 className="text-white font-semibold mb-1">Christ is King Primary School</h5>
                <p className="text-gray-400 text-sm mb-4">Cape Coast, Ghana</p>
                <button className="text-green-400 hover:text-green-300 font-semibold text-sm">
                  View School Profile →
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Donation Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#1F3B26] rounded-lg p-6 mb-8 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white block">$24,839 donated</span>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span>$24,000 Goal</span>
                      <span>•</span>
                      <span>5k donations</span>
                    </div>
                  </div>
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-700"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-green-400"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="40, 100"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-green-400 font-bold text-sm">40%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Link to="/donate">
                  <button className="w-full bg-[#1B3522] text-white px-6 py-3 rounded-full font-semibold">
                    Donate
                  </button>
                </Link>
                <button className="w-full bg-black text-white px-6 py-3 rounded-full font-semibold">
                  Share
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 bg-green-400 rounded-sm flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white text-sm">24 people are already donated</p>
                </div>
                <div className="space-y-3">
                  {recentDonors.map((donor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm">{donor.name}</div>
                        <div className="text-green-400 font-semibold text-sm">{donor.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsDetails;