import React from 'react';
import { Eye } from 'lucide-react';
import ChatMessages from './ChatMessages';
import type { ChatMessage } from './ChatMessages';

interface ChatOnlyPageProps {
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onShowPreview: () => void;
}

const ChatOnlyPage: React.FC<ChatOnlyPageProps> = ({
  messages,
  inputValue,
  isTyping,
  messagesEndRef,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onShowPreview
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Campaign Chat</h2>
        <button
          onClick={onShowPreview}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">Preview Campaign</span>
        </button>
      </div>
      
      {/* Full Width Chat */}
      <ChatMessages
        messages={messages}
        inputValue={inputValue}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        fullWidth={true}
        onInputChange={onInputChange}
        onSendMessage={onSendMessage}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default ChatOnlyPage;