import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { title, excerpt, content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert content strategist and copywriter. Your task is to enhance a blog post based on its current title, excerpt, and content, while strictly preserving its code blocks.

      **Instructions:**

      1.  **Enhance Title:** Rewrite the title to be more catchy, impressive, and exciting, while still reflecting the content's core message.
      2.  **Enhance Excerpt:** Rewrite the excerpt to be a small, simple, and smooth hook (2-3 sentences).
      3.  **Suggest Tags:** Suggest 3-5 relevant tags as a single comma-separated string.

      4.  **Proofread and Format Content (CRITICAL RULES):**
          -   **Proofread for Errors:** In the main text, correct any spelling mistakes, grammatical errors, and capitalization issues to improve clarity and professionalism. This rule does NOT apply to text inside code blocks.
          -   **Apply Markdown:** Your primary goal is to format the proofread content into proper markdown. Apply standard markdown for headings, subheadings, bold/italic text, and lists where appropriate.
          -   **Code Block Preservation (DO NOT TOUCH):** You MUST identify any existing code blocks (text surrounded by triple backticks) and preserve them EXACTLY as they are. DO NOT change, add, or remove any text inside these blocks. This is the most important rule.
          -   **New Code Blocks:** If you identify any text that looks like code but is NOT already in a code block, you MUST wrap it in triple backticks.
          -   **No New Paragraphs:** Do NOT add new paragraphs or sentences. Your job is to correct and format the existing text, not add to it.

      **Output Format:**
      Return ONLY a single, clean, valid JSON object with four keys: "title", "excerpt", "markdownContent", and "tags". Do not include any other text or markdown formatting around the JSON object.

      **Content to Process:**
      ---
      Title: ${title || 'Untitled'}
      Excerpt: ${excerpt || 'No excerpt provided.'}
      Content: ${content}
      ---
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // The AI's response might include markdown formatting or extra text.
    // We need to extract the raw JSON string.
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("AI Response (No JSON Match):", text);
      throw new Error("No valid JSON object found in the AI response.");
    }

    const jsonString = jsonMatch[0];
    try {
      const data = JSON.parse(jsonString);
      return NextResponse.json(data);
    } catch (error) {
      console.error('Failed to parse JSON. Raw AI response snippet:', jsonString);
      throw new Error('The AI returned a malformed response. Please try again.');
    }
  } catch (error) {
    console.error('Error in /api/enhance-blog:', error);
    return NextResponse.json({ error: error.message || 'Failed to enhance content' }, { status: 500 });
  }
}