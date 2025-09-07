import React from 'react';
import { motion } from 'framer-motion';
import type { CampaignPreviewProps } from './types';

const CampaignPreview: React.FC<CampaignPreviewProps> = ({
  campaignData,
  onEdit,
  onSaveDraft,
  onLaunch
}) => {
  return (
    <div className="h-full bg-[#0A160D] border-l border-gray-700">
      {/* Preview Header */}
      <div className="p-6 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Campaign Preview</h3>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6 overflow-y-auto h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2">TITLE</h4>
            <p className="text-white text-lg">
              {campaignData.title || 'Support Bleakhorn Gyedua D/A Primary School'}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2">DESCRIPTION</h4>
            <p className="text-gray-300 leading-relaxed">
              {campaignData.description || 'Lorem ipsum dolor sit amet consectetur. Convallis sed nisl fames lacus enim. Amet id adipiscing sagittis est euismod. Eget condimentum lacus a congue arcu tincidunt libero at ac. Ac auctor nunc urna sapien aliquam donec turpis. Aliquam auctor.'}
            </p>
          </div>

          {/* Campaign Category */}
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2">CAMPAIGN CATEGORY</h4>
            <p className="text-gray-300">
              {campaignData.category || 'Lack of Basic Computers'}
            </p>
          </div>

          {/* Donation Target */}
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2">DONATION TARGET</h4>
            <p className="text-gray-300 text-lg font-semibold">
              ${campaignData.donationTarget?.toLocaleString() || '4,000.00'}
            </p>
          </div>

          {/* Media */}
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2">MEDIA</h4>
            <div className="grid grid-cols-2 gap-3">
              {campaignData.media && campaignData.media.length > 0 ? (
                campaignData.media.slice(0, 4).map((file, index) => (
                  <div key={index} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                // Default placeholder images
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src="/students-happy.jpg"
                      alt={`Default ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Relevant Documents */}
          {campaignData.documents && campaignData.documents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-green-400 mb-2">RELEVANT DOCUMENTS</h4>
              <div className="space-y-2">
                {campaignData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-white text-sm font-medium">{doc.name}</p>
                      <p className="text-gray-400 text-xs">{(doc.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex space-x-3">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Edit Campaign
            </button>
          )}
          {onSaveDraft && (
            <button
              onClick={onSaveDraft}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Save as Draft
            </button>
          )}
          {onLaunch && (
            <button
              onClick={onLaunch}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Launch Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;