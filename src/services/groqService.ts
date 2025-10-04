import Groq from 'groq-sdk';
import type { GroqMessage } from '@/types';

// AI Prompt configuration for vintage, professional document analysis
export const aiPrompt = `You are an elite AI assistant specializing in document analysis and intelligent conversation. You excel at understanding PDF documents, extracting insights, and providing clear, professional responses with a vintage scholarly approach.

Core Capabilities:
- Comprehensive document analysis and understanding with scholarly precision
- Intelligent information extraction and detailed summarization
- Context-aware responses that demonstrate deep comprehension
- Clear explanations of complex concepts with academic rigor
- Professional, articulate communication with vintage sophistication

Response Excellence:
1. Provide precise, well-structured answers that directly address the inquiry
2. Use clear, eloquent language while maintaining technical accuracy
3. Structure responses with proper formatting and logical progression
4. Include specific examples or references when relevant
5. Offer actionable insights and scholarly recommendations

Response Structure:
- Begin with a direct, authoritative answer to the core question
- Follow with supporting analysis and contextual information
- Use proper formatting (bold, italics, lists) for maximum clarity
- Conclude with practical insights or next steps when appropriate
- Maintain a professional yet approachable scholarly tone

Document Analysis Approach:
- Thoroughly examine content structure, key themes, and relationships
- Extract relevant information with precision and context
- Identify important patterns, conclusions, and implications
- Provide comprehensive summaries that capture essential elements
- Offer intelligent insights that go beyond surface-level content

Your mission is to provide intelligent, accurate, and insightful analysis that transforms complex documents into accessible, actionable knowledge with the refinement of classic scholarship.`;

// Initialize Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// Configuration based on your credentials
const GROQ_CONFIG = {
  // Using the model from your credentials file
  DEFAULT_MODEL: "meta-llama/llama-4-scout-17b-16e-instruct",
  FALLBACK_MODEL: "llama3-8b-8192",

  GENERATION_PARAMS: {
    temperature: 0.7, // Balanced creativity and consistency
    max_tokens: 2000, // Comprehensive responses
    top_p: 0.95, // High quality responses
    frequency_penalty: 0.1, // Reduce repetition
    presence_penalty: 0.05, // Encourage topic diversity
  },

  TIMEOUT_MS: 90000, // 90 seconds for thorough analysis
};

export async function chatWithContext(
  userMessage: string,
  conversationHistory: GroqMessage[] = [],
  documentContext?: string
): Promise<string> {
  try {
    const messages: GroqMessage[] = [
      {
        role: 'system',
        content: aiPrompt
      }
    ];

    // Add conversation history
    if (conversationHistory.length > 0) {
      messages.push(...conversationHistory.slice(-10)); // Keep last 10 messages for context
    }

    // Create user message with document context if available
    let userContent = userMessage;
    if (documentContext) {
      userContent = `Document Context:\n${documentContext.slice(0, 8000)}\n\nUser Question: ${userMessage}`;
    }

    messages.push({
      role: 'user',
      content: userContent
    });

    const completion = await groq.chat.completions.create({
      model: GROQ_CONFIG.DEFAULT_MODEL,
      messages,
      ...GROQ_CONFIG.GENERATION_PARAMS,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response received from AI service');
    }

    return response.trim();
  } catch (error) {
    console.error('Error with primary model, trying fallback:', error);

    // Try with fallback model
    try {
      const messages: GroqMessage[] = [
        {
          role: 'system',
          content: aiPrompt
        },
        ...conversationHistory.slice(-8),
        {
          role: 'user',
          content: documentContext
            ? `Document Context:\n${documentContext.slice(0, 6000)}\n\nUser Question: ${userMessage}`
            : userMessage
        }
      ];

      const completion = await groq.chat.completions.create({
        model: GROQ_CONFIG.FALLBACK_MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 1500,
        top_p: 0.9,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response received from fallback AI service');
      }

      return response.trim();
    } catch (fallbackError) {
      console.error('Fallback model also failed:', fallbackError);
      throw new Error('AI service is currently unavailable. Please try again in a moment.');
    }
  }
}

export async function analyzeDocument(
  documentText: string,
  fileName: string
): Promise<string> {
  try {
    const analysisPrompt = `Please provide a comprehensive analysis of this PDF document "${fileName}". 

Document Content:
${documentText.slice(0, 10000)}

Please provide:
1. **Document Summary**: A concise overview of the main content and purpose
2. **Key Topics**: The primary subjects and themes covered
3. **Important Information**: Critical data, conclusions, or insights
4. **Structure Analysis**: How the document is organized and its logical flow
5. **Notable Elements**: Any significant figures, references, or unique aspects

Format your response with clear headings and bullet points for easy reading.`;

    const completion = await groq.chat.completions.create({
      model: GROQ_CONFIG.DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: aiPrompt
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      ...GROQ_CONFIG.GENERATION_PARAMS,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No analysis received from AI service');
    }

    return response.trim();
  } catch (error) {
    console.error('Document analysis error:', error);
    throw new Error('Failed to analyze document. Please try again.');
  }
}

export { GROQ_CONFIG };