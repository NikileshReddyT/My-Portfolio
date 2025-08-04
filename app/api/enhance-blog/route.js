import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { title, excerpt, content } = await request.json();

    if (!content?.trim()) {
      return new Response(JSON.stringify({ error: 'Content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      throw new Error('Server configuration error: Missing API key');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert content strategist and copywriter. Your task is to enhance a blog post based on its current title, excerpt, and content.

      **Instructions:**

      1.  **Enhance the Title:**
          -   Analyze the provided content and the current title: "${title || 'Untitled'}".
          -   Goal: Rewrite the title to be catchy, impressive, and exciting. It must create a strong pull for the reader while accurately reflecting the core message of the content.

      2.  **Enhance the Excerpt:**
          -   Analyze the provided content and the current excerpt: "${excerpt || ''}".
          -   Goal: Rewrite the excerpt to be small, simple, and smooth. It should be a concise, compelling hook (2-3 sentences) that makes the reader want to continue.

      3.  **Suggest Tags:**
          -   Analyze the content and suggest between 1 and 5 relevant tags.
          -   The tags should be concise and relevant to the main topics of the content.
          -   Format the tags as a single comma-separated string (e.g., "Next.js, Tailwind CSS, AI").

      4.  **Format the Content (DO NOT CHANGE THE TEXT):**
          -   Take the raw text from the 'content' field and apply markdown styling.
          -   Use headings, subheadings, bold/italic text, lists, and code blocks where appropriate to improve readability.
          -   Crucially, you must NOT change the wording, add new information, or remove any text from the content itself.
          -   If the content already appears to be valid markdown, return it as-is.

      **Output Format:**
      Return a single, clean JSON object with four keys: "title", "excerpt", "markdownContent", and "tags". The "tags" value should be a comma-separated string. Do not include any other text or markdown formatting around the JSON object.

      **Content to Process:**
      ---
      Title: ${title || 'Untitled'}
      Excerpt: ${excerpt || 'No excerpt provided.'}
      Content: ${content}
      ---
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response to ensure it's valid JSON
    const cleanedText = text.replace(/```json|```/g, '').trim();
    const jsonResponse = JSON.parse(cleanedText);

    return new Response(JSON.stringify(jsonResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error enhancing blog content:', {
      message: error.message,
      stack: error.stack,
    });

    return new Response(JSON.stringify({
      error: 'Failed to enhance content. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
