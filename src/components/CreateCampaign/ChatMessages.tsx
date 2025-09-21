import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Plus } from 'lucide-react';


interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  fullWidth?: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  inputValue,
  isTyping,
  messagesEndRef,
  fullWidth = false,
  onInputChange,
  // onSendMessage,
  onKeyPress
}) => {
  return (
    <div className={`flex-1 flex flex-col ${fullWidth ? 'max-w-4xl mx-auto' : ''}`}>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-green-600 text-white' 
                : 'bg-[#141D17] text-gray-200'
            }`}>
              <p className="text-sm">{message.content}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}


        <div className="flex items-center justify-between relative max-w-full mxauto w-full rounded-full bg-[#1B3622] border border-[#384F3E] px-4 my-10 py-2">
          <button className="bg-[#334A39] rounded-full p-2 text-gray-300 hover:text-white">
            <Plus size={20} />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Type something..."
            className="w-full px-6 py-1 bg-[#1B3622] rounded-full text-white placeholder-white focus:outline-none pr-16"
          />

          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 hover:bg-green-700 text-white">
            <ArrowUp size={16} />
          </button>
        </div>





      {/* <div className="p-6 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type something..."
              className="w-full px-4 py-3 bg-[#0F1A12] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 pr-12"
            />
            <button
              onClick={onSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-green-500 hover:text-green-400 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ChatMessages;
export type { ChatMessage };