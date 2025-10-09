import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../Sidebar';
import CampaignHeader from '../CampaignHeader';
import { useAuth } from '../../hooks/useAuth';
import InitialPage from './InitialPage';
import ChatWithPreviewPage from './ChatWithPreviewPage';
import ChatOnlyPage from './ChatOnlyPage';
import FullPreviewPage from './FullPreviewPage';
import type { CampaignData } from './types';
import type { ChatMessage } from './ChatMessages';

type PageState = 'initial' | 'chat-with-preview' | 'chat-only' | 'full-preview';

const CreateCampaign: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageState>('initial');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    title: 'Support Blueacorn Gyeduia DIA Primary School',
    description: 'Lorem ipsum dolor sit amet consectetur. Convallis sed nisl fames iaculis enim. Amet id adipiscing sapibus est euismod. Eget consectetur lacus a congue arcu tincidunt libero sit ac. Ac auctor nunc urna sapien aliquam donec turpis. Aliquam auctor.',
    category: 'Lack of Basic Computers',
    donationTarget: 4000,
    media: [
      { name: 'school-image-1.jpg', url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=african%20primary%20school%20children%20in%20classroom%20learning&image_size=square' },
      { name: 'school-image-2.jpg', url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=african%20primary%20school%20children%20in%20classroom%20learning&image_size=square' },
      { name: 'school-image-3.jpg', url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=african%20primary%20school%20children%20in%20classroom%20learning&image_size=square' },
      { name: 'school-image-4.jpg', url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=african%20primary%20school%20children%20in%20classroom%20learning&image_size=square' }
    ],
    documents: [],
    schoolName: user?.name || '',
    location: ''
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Move to next page after first interaction
      if (currentPage === 'initial') {
        setTimeout(() => setCurrentPage('chat-with-preview'), 1000);
      }
    }, 1500);
  };

  const getAIResponse = (): string => {
    const responses = [
      "That's a great start! Can you tell me more about what specific challenges your school is facing?",
      "I understand. Let me help you create a compelling campaign. What's the main goal you're trying to achieve?",
      "Perfect! Based on what you've shared, I'll help you structure this campaign effectively.",
      "Let's work together to make this campaign as impactful as possible. What else would you like to add?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUploadImage = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setCampaignData(prev => ({
      ...prev,
      media: [...prev.media, { name: file.name, url: previewUrl }]
    }));
  };

  // Handler functions

  const handleTogglePreview = () => {
    setCurrentPage('chat-only');
  };
  const handleShowPreview = () => {
    setCurrentPage('full-preview');
  };

  const handleBackToChat = () => {
    setCurrentPage('chat-with-preview');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'initial':
        return (
          <InitialPage
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onUploadImage={handleUploadImage}
          />
        );
      case 'chat-with-preview':
        return (
          <ChatWithPreviewPage
            messages={messages}
            inputValue={inputValue}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
            campaignData={campaignData}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onTogglePreview={handleTogglePreview}
            onOpenFullPreview={handleShowPreview}
            onOpenChatOnly={handleTogglePreview}
          />
        );
      case 'chat-only':
        return (
          <ChatOnlyPage
            messages={messages}
            inputValue={inputValue}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onShowPreview={handleShowPreview}
          />
        );
      case 'full-preview':
        return (
          <FullPreviewPage
            campaignData={campaignData}
            onBack={handleBackToChat}
          />
        );
      default:
        return (
          <InitialPage
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onUploadImage={handleUploadImage}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#020E05] px-6 overflow-hidden">
      <CampaignHeader title="" />
      
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden bg-[#020E05]">
        {/* Sidebar */}
        <Sidebar />
      
        <div className="flex-1 p-16 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col overflow-hidden"
            >
              {renderCurrentPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;