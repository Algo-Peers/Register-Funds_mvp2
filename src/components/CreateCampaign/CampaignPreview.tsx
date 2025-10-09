import React from 'react';
import type { CampaignData } from './types';

interface CampaignPreviewProps {
  campaignData: CampaignData;
  onOpenFullPreview: () => void;
  onOpenChatOnly: () => void;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ campaignData, onOpenFullPreview, onOpenChatOnly }) => {
  return (
    <div className="w-80 lg:w-96 xl:w-80 min-w-[280px] max-w-[400px] scrollbar-hide bg-[#141D17] p-6 m-4 rounded-2 overflow-y-auto h-full flex-shrink-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Campaign Preview</h3>
        <div className="flex items-center space-x-2">
          <button className="" onClick={onOpenFullPreview}>
            <img src="/preview.svg" alt="Open Full Preview" />
          </button>
          <button className="" onClick={onOpenChatOnly}>
            <img src="/chat.svg" alt="Open Chat Only" />
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-green-400 mb-2">TITLE</h4>
          <p className="text-white font-medium">{campaignData.title}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-green-400 mb-2">DESCRIPTION</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{campaignData.description}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-green-400 mb-2">CAMPAIGN CATEGORY</h4>
          <span className="inline-block bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
            {campaignData.category}
          </span>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-green-400 mb-2">DONATION TARGET</h4>
          <p className="text-white font-semibold">${campaignData.donationTarget.toLocaleString()}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-green-400 mb-2">MEDIA</h4>
          <div className="grid grid-cols-2 gap-2">
            {campaignData.media.slice(0, 4).map((media, index) => (
              <div key={index} className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src={media.url} 
                  alt={media.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampaignPreview;