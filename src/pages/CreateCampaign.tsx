import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Bell } from 'lucide-react';
import ChatWithPreview from '../components/CreateCampaign/ChatWithPreview';
import ChatOnly from '../components/CreateCampaign/ChatOnly';
import PreviewOnly from '../components/CreateCampaign/PreviewOnly';
import Sidebar from '../components/Sidebar';
import type { ViewMode } from '../components/CreateCampaign/types';

const CreateCampaign: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('chat-with-preview');

  const getPageTitle = () => {
    switch (viewMode) {
      case 'chat-with-preview':
        return 'Create a Campaign - Chat with Preview';
      case 'chat-only':
        return 'Create a Campaign - Chat only';
      case 'preview-only':
        return 'Create a Campaign - Preview only';
      default:
        return 'Create a Campaign';
    }
  };

  const renderCurrentView = () => {
    switch (viewMode) {
      case 'chat-with-preview':
        return <ChatWithPreview />;
      case 'chat-only':
        return <ChatOnly />;
      case 'preview-only':
        return <PreviewOnly />;
      default:
        return <ChatWithPreview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-medium text-white">{getPageTitle()}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none w-64"
                />
              </div>
              
              {/* User Actions */}
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">J</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* View Mode Navigation (for development) */}
        {import.meta.env.DEV && (
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
            <div className="flex space-x-2">
              {[
                { mode: 'chat-with-preview' as ViewMode, label: 'Chat with Preview' },
                { mode: 'chat-only' as ViewMode, label: 'Chat Only' },
                { mode: 'preview-only' as ViewMode, label: 'Preview Only' }
              ].map(({ mode, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    viewMode === mode
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderCurrentView()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;