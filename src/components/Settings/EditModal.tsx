import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2 } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Array<{
    label: string;
    value: string;
    key: string;
    type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'textarea';
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
  }>;
  onSave: (data: Record<string, string>) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, title, fields, onSave }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: field.value }), {})
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form data when fields change
  React.useEffect(() => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.key]: field.value }), {}));
  }, [fields]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setError(null);
      onClose();
    }
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
            onClick={handleClose}
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
                  onClick={handleClose}
                  disabled={isLoading}
                  className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Form Fields */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isLoading) handleSave();
                }}
              >
                <div className="space-y-4 mb-6">
                  {fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-green-400 text-sm mb-2">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          disabled={isLoading}
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full bg-[#07130A] border border-[#1B261E] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400 transition-colors disabled:opacity-50"
                        />
                      ) : (
                        <input
                          type={field.type || 'text'}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          disabled={isLoading}
                          placeholder={field.placeholder}
                          min={field.type === 'number' ? field.min : undefined}
                          max={field.type === 'number' ? field.max : undefined}
                          step={field.type === 'number' ? field.step ?? 1 : undefined}
                          inputMode={field.type === 'number' ? 'numeric' : undefined}
                          pattern={field.type === 'number' ? '[0-9]*' : undefined}
                          className="w-full bg-[#07130A] border border-[#1B261E] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400 transition-colors disabled:opacity-50"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-[#1B261E] text-gray-400 rounded-lg hover:bg-[#1B261E] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Update</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditModal;