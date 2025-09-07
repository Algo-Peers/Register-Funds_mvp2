import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Settings, FileText } from 'lucide-react';
import type { CampaignData } from './types';

const PreviewOnly: React.FC = () => {
  const [campaignData] = useState<CampaignData>({
    title: 'Support Bisakrom Gyeduaa D/A Primary School',
    description: 'Lorem ipsum dolor sit amet consectetur. Convallis sed nisl fames iaculis enim. Amet id adipiscing sagittis est euismod. Eget condimentum lacus a congue arcu tincidunt libero sit ac. Ac auctor nunc urna sapien aliquam donec turpis. Aliquam auctor.',
    category: 'Lack of Basic Computers',
    donationTarget: 4000,
    media: [],
    documents: [],
    schoolName: 'Bisakrom Gyeduaa D/A Primary School',
    location: 'Ghana'
  });

  return (
    <div className="h-full bg-[]">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Preview Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl font-medium">Campaign Preview</h2>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                Edit Campaign
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Launch Campaign
              </button>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[] rounded-lg p-6 space-y-8"
          >
            {/* Title */}
            <div>
              <h4 className="text-green-400 text-sm font-medium mb-3">TITLE</h4>
              <h3 className="text-white text-xl font-medium">{campaignData.title}</h3>
            </div>
            
            {/* Description */}
            <div>
              <h4 className="text-green-400 text-sm font-medium mb-3">DESCRIPTION</h4>
              <p className="text-gray-300 leading-relaxed">{campaignData.description}</p>
            </div>
            
            {/* Media */}
            <div>
              <h4 className="text-green-400 text-sm font-medium mb-3">MEDIA</h4>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                    <img 
                      src="/students-happy.jpg" 
                      alt={`Media ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Relevant Documents */}
            <div>
              <h4 className="text-green-400 text-sm font-medium mb-3">RELEVANT DOCUMENTS</h4>
              <div className="grid grid-cols-2 gap-4">
                {['Project Budget & Estimate', 'Project Budget & Estimate'].map((doc, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                    <FileText className="w-8 h-8 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{doc}</p>
                      <p className="text-gray-400 text-sm">Document</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PreviewOnly;