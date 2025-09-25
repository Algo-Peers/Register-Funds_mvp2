import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { schoolName, location, category, targetAmount, additionalInfo } = req.body;

    const prompt = `
    Create a compelling fundraising campaign for an educational institution:
    
    School: ${schoolName}
    Location: ${location}
    Need Category: ${category}
    Target Amount: $${targetAmount || 5000}
    Additional Context: ${additionalInfo || 'None provided'}

    Generate a professional fundraising campaign with:
    1. Compelling title (max 60 characters)
    2. Detailed description (300-500 words) that includes:
       - Current situation/challenge
       - Impact of donations
       - Specific use of funds
       - Call to action
    3. Refined donation target based on the need
    4. 3-4 suggested image descriptions for campaign media

    Return as JSON with keys: title, description, donationTarget, suggestedMedia (array of strings)
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert fundraising campaign writer specializing in educational causes. Create compelling, authentic, and impactful campaign content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1200
    });

    const generatedContent = JSON.parse(response.choices[0].message.content || '{}');
    
    res.status(200).json(generatedContent);
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: 'Failed to generate campaign content' });
  }
}