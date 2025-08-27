import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Eye } from 'lucide-react';

const ChatOnly: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Let's start with describing what your challenge is",
      isUser: false,
      timestamp: new Date()
    },
    {
      id: '2', 
      content: 'Lorem ipsum dolor sit amet consectetur. Convallis sed nisl fames iaculis enim. Amet id adipiscing sagittis est euismod. Eget condimentum lacus a congue arcu tincidunt libero sit ac. Ac auctor nunc urna sapien aliquam donec turpis. Aliquam auctor.',
      isUser: true,
      timestamp: new Date()
    },
    {
      id: '3',
      content: "Let's start with describing what your challenge is",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: message,
        isUser: true,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-700 text-center">
          <h2 className="text-green-400 text-lg font-medium mb-2">Create a Campaign</h2>
          <h3 className="text-white text-2xl font-medium">Let's start with describing what your challenge is</h3>
        </div>
        
        {/* Preview Button */}
        <div className="p-4 border-b border-gray-700 flex justify-end">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <span>Preview</span>
            <Eye className="w-4 h-4" />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-2xl ${
                msg.isUser 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300'
              } p-4 rounded-lg`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-end space-x-4 max-w-3xl mx-auto">
            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs">+</span>
              </div>
            </button>
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type something ..."
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 pr-12 resize-none focus:border-green-500 focus:outline-none"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOnly;