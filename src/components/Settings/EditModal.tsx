import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Array<{
    label: string;
    value: string;
    key: string;
    type?: 'text' | 'email' | 'tel' | 'password';
  }>;
  onSave: (data: Record<string, string>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, title, fields, onSave }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: field.value }), {})
  );

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0D180F] rounded-xl p-6 w-full max-w-md border border-[#1B261E]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 mb-6">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-green-400 text-sm mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type || 'text'}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full bg-[#07130A] border border-[#1B261E] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400 transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-[#1B261E] text-gray-400 rounded-lg hover:bg-[#1B261E] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditModal;