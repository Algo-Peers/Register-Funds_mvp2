import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import type { Campaign } from '../../hooks/useCampaigns';
import { useCampaigns } from '../../hooks/useCampaigns';
import { useAuth } from '../../hooks/useAuth';

interface EditCampaignProps {
  campaign: Campaign | null;
  onBack: () => void;
  onSave: (campaign: Campaign) => void;
}

const EditCampaign: React.FC<EditCampaignProps> = ({ campaign, onBack, onSave }) => {
  const { user } = useAuth();
  const { updateCampaign } = useCampaigns(user?.id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    donationTarget: 0,
    status: 'draft' as 'draft' | 'active' | 'completed',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        description: campaign.description,
        category: campaign.category,
        donationTarget: campaign.donationTarget,
        status: campaign.status,
      });
    }
  }, [campaign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;

    setLoading(true);
    setError(null);

    try {
      const updatedCampaign = await updateCampaign(campaign.id, {
        title: formData.name,
        description: formData.description,
        category: formData.category,
        donationTarget: formData.donationTarget,
      });
      
      onSave(updatedCampaign);
      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'donationTarget' ? Number(value) : value
    }));
  };

  if (!campaign) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Campaigns</span>
          </motion.button>
        </div>
        <h2 className="text-2xl font-semibold text-white">Edit Campaign</h2>
      </div>

      {/* Form Container */}
      <div className="bg-[#1C2F21] rounded-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-[#0A160D] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter campaign name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-[#0A160D] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Describe your campaign"
              required
            />
          </div>

          {/* Category and Target Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#0A160D] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="education">Education</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="arts">Arts & Culture</option>
                <option value="health">Health & Safety</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Amount ($)
              </label>
              <input
                type="number"
                name="donationTarget"
                value={formData.donationTarget}
                onChange={handleInputChange}
                min="1"
                className="w-full bg-[#0A160D] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Campaign Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full bg-[#0A160D] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditCampaign;