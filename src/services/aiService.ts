export interface CampaignGenerationRequest {
  schoolName: string;
  location: string;
  category: string;
  targetAmount?: number;
  additionalInfo?: string;
}

export interface GeneratedCampaign {
  title: string;
  description: string;
  category: string;
  donationTarget: number;
  suggestedMedia: string[];
}

export const aiService = {
  async generateCampaign(request: CampaignGenerationRequest): Promise<GeneratedCampaign> {
    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI generation failed:', error);
      throw new Error('Failed to generate campaign content');
    }
  },

  async chatWithAI(messages: Array<{role: string, content: string}>): Promise<string> {
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('AI chat failed:', error);
      throw new Error('Failed to get AI response');
    }
  }
};