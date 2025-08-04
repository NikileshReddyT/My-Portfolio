import { GoogleGenerativeAI } from '@google/generative-ai';


export async function POST(request) {
  try {
    const { name, company, tone = 'professional' } = await request.json();
    
    if (!name?.trim()) {
      return new Response(JSON.stringify({ 
        error: 'Name is required' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      throw new Error('Server configuration error: Missing API key');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
    });

    const generationConfig = {
      temperature: 0.9,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
    };

    const relationship = company ? ` (${company})` : '';
    const role = company ? 
      (company.toLowerCase().includes('professor') ? 'professor' : 
       company.toLowerCase().includes('university') ? 'university peer' : 'colleague') : 
      'friend/acquaintance';

    const prompt = `Write a short, natural testimonial about Nikilesh Reddy for his portfolio. 
      
      **Important**: 
      - Write as ${name} (${role}${relationship ? ` at ${company}` : ''})
      - Keep it 2-3 sentences, conversational and genuine
      - Focus on personal qualities, work ethic, or skills
      - DO NOT mention specific projects or experiences unless explicitly provided
      - Make it sound like a real person wrote it
      
      **Example formats**:
      "I've known Nikilesh for [time] and he's incredibly [quality]. His ability to [skill] is remarkable. [Positive closing]."
      OR
      "Nikilesh is [quality]. I've always been impressed by his [attribute]. [Warm closing]."`;
    
    console.log('Sending prompt to Gemini:', prompt);
    
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig,
    });
    
    const response = await result.response;
    const text = response.text();
    
    console.log('Received response from Gemini:', text);

    return new Response(JSON.stringify({ 
      text 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generating testimonial:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate testimonial. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
