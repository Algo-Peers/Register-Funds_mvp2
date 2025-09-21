import React from 'react';
import { Eye } from 'lucide-react';
import ChatMessages from './ChatMessages';
import CampaignPreview from './CampaignPreview';
import type { ChatMessage } from './ChatMessages';
import type { CampaignData } from './types';

interface ChatWithPreviewPageProps {
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  campaignData: CampaignData;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onTogglePreview: () => void;
}

const ChatWithPreviewPage: React.FC<ChatWithPreviewPageProps> = ({
  messages,
  inputValue,
  isTyping,
  messagesEndRef,
  campaignData,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onTogglePreview
}) => {
  return (
    <div className="flex-1 flex bg-[#0E2714] min-h-0">
      {/* Chat Section */}
      <div className="bg-[#07130A] flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 flex items-center justify-between">
          <span className="text-xl p-3 rounded-xl bg-black bg-opacity-30 font-bold text-green-500">Create a Campaign</span>
          <button
            onClick={onTogglePreview}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span className="text-sm">Preview</span>
          </button>
        </div>
        
        <ChatMessages
          messages={messages}
          inputValue={inputValue}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          onInputChange={onInputChange}
          onSendMessage={onSendMessage}
          onKeyPress={onKeyPress}
        />
      </div>
      
      {/* Preview Sidebar */}
      <CampaignPreview campaignData={campaignData} />
    </div>
  );
};

export default ChatWithPreviewPage;