import React from 'react';
import { ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react';
import type { CampaignData } from './types';

interface FullPreviewPageProps {
  campaignData: CampaignData;
  onBack: () => void;
}

const FullPreviewPage: React.FC<FullPreviewPageProps> = ({ campaignData, onBack }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Chat</span>
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Campaign Preview Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Campaign Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{campaignData.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
            <span className="bg-gray-700 px-3 py-1 rounded-full">{campaignData.category}</span>
            <span>Target: ${campaignData.donationTarget.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Media Gallery */}
        {campaignData.media.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaignData.media.map((media, index) => (
                <div key={index} className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={media.url} 
                    alt={media.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Campaign Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">About This Campaign</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">{campaignData.description}</p>
          </div>
        </div>
        
        {/* Donation Progress */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Donation Progress</h3>
            <span className="text-green-400 font-medium">0% funded</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">$0</p>
              <p className="text-sm text-gray-400">Raised</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">${campaignData.donationTarget.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Goal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Donors</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Donate Now
          </button>
          <button className="p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPreviewPage;