import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

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
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <motion.button 
          className="flex items-center text-green-400 hover:text-green-300 transition-colors duration-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>
      </div>

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
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Christ is King Primary School"
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </motion.div>

            {/* Challenge Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Lack of Basic Computers</h2>
              <div className="text-gray-300 leading-relaxed">
                <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
                  Lorem ipsum dolor sit amet consectetur. Ac lectus urna cras mattis aliquam. Quam tortor facilisi varius molestie ut quam sit euismod maecenas. Sit fringilla porta consequat ante. Vitae elementum pellentesque amet nulla porttitor ut amet diam purus. Cras enim ultricies quis non pulvinar turpis etiam.
                </p>
                {!showFullDescription && (
                  <button 
                    onClick={() => setShowFullDescription(true)}
                    className="text-green-400 hover:text-green-300 mt-2 font-semibold"
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
              className="mb-8"
            >
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80&sig=${i}`}
                    alt={`School image ${i}`}
                    className="w-full h-20 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 mb-12"
            >
              <button className="bg-green-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-500 transition-all duration-200 flex-1 md:flex-none">
                Donate
              </button>
              <button className="border border-green-400 text-green-400 px-8 py-3 rounded-lg font-semibold hover:bg-green-400 hover:text-gray-900 transition-all duration-200">
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
              <h2 className="text-2xl font-bold text-green-400 mb-6">Recent Updates</h2>
              <div className="bg-gray-800 rounded-lg p-6">
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
                      src={`https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80&sig=${i + 10}`}
                      alt={`Update image ${i}`}
                      className="w-full h-16 object-cover rounded"
                    />
                  ))}
                </div>
                <button className="text-green-400 hover:text-green-300 font-semibold">
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
              <h2 className="text-2xl font-bold text-green-400 mb-6">Reports & Relevant Document</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <svg className="w-8 h-8 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-white font-semibold">{report.name}</p>
                        <p className="text-gray-400 text-sm">{report.size}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
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
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
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
              className="bg-gray-800 rounded-lg p-6 mb-12"
            >
              <h3 className="text-xl font-bold text-green-400 mb-6">Organizer</h3>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-gray-900 font-bold mr-4">
                  JJ
                </div>
                <div>
                  <h4 className="text-white font-semibold">John Johnson</h4>
                  <p className="text-gray-400 text-sm">ICT Coordinator</p>
                </div>
              </div>
              
              <button className="w-full bg-green-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition-all duration-200 mb-4">
                Send Message →
              </button>
              
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
              className="bg-gray-800 rounded-lg p-6 mb-8 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-white">$24,839 donated</span>
                  <span className="text-green-400 font-bold">40%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div className="bg-green-400 h-3 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>$24,000 Goal</span>
                  <span>5k donations</span>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <button className="bg-green-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-all duration-200 flex-1">
                  Donate
                </button>
                <button className="border border-green-400 text-green-400 px-6 py-3 rounded-lg font-semibold hover:bg-green-400 hover:text-gray-900 transition-all duration-200">
                  Share
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-green-400 text-sm mb-4">24 people are already donated</p>
                <div className="space-y-3">
                  {recentDonors.map((donor, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-white text-sm">{donor.name}</span>
                      <span className="text-green-400 font-semibold text-sm">{donor.amount}</span>
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