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
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant specializing in fundraising campaigns for educational institutions. Provide helpful, encouraging, and practical advice."
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.status(200).json({
      message: response.choices[0].message.content || 'Sorry, I could not generate a response.'
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}