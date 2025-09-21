import React from 'react';
import { ArrowUp, Plus } from 'lucide-react';

interface InitialPageProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const InitialPage: React.FC<InitialPageProps> = ({
  inputValue,
  onInputChange,
  // onSendMessage,
  onKeyPress
}) => {
  return (
    <div className="flex-1 flex items-center justify-center rounded-xl bg-[#0E2714]">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <span className="text-xl p-2 px-4 rounded-xl bg-black bg-opacity-30 font-bold text-green-500">Create a Campaign</span>
          <h2 className="text-2xl text-gray-300">
            Let's start with describing<br />what your challenge is
          </h2>
        </div>

        
        <div className="flex items-center justify-between relative max-w-lg mx-auto w-full rounded-full bg-[#1B3622] border border-[#384F3E] px-4 py-2">
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
      </div>
    </div>
  );
};

export default InitialPage;