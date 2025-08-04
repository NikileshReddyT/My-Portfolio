import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are a professional and creative blog writer. Your task is to generate a complete, high-quality blog post based on a single idea. The tone should be human, engaging, and authoritative. Get straight to the point and provide value.

      **Idea to expand on:**
      ---
      ${idea}
      ---

      **Instructions:**

      1.  **Title:** Create a short, simple, yet eye-catching title.
      2.  **Excerpt:** Write a smooth, small and concise excerpt that hooks the reader.
      3.  **Content:**
          -   Write a detailed and well-structured blog post of at least 400 words.
          -   Use clear markdown for formatting: headings, subheadings, bold/italic text, lists, and code and text blocks.
          -   If the topic involves steps, explain them clearly.
          -   If it involves code or prompts, use proper markdown code blocks.
          -   Ensure the content feels like it was written by a human expert, not a generic AI.
          -   Generate Content in such a way that it will straightly take you to the point without any extra things and also try to make it feel like written from a person who has correct knowledge about what they are talking.
      4.  **Tags:** Provide 3 to 5 relevant tags as a single comma-separated string (e.g., "Web Development, Next.js, AI").

      **Output Format:**
      You MUST return ONLY a single, valid, and clean JSON object. Do not include any other text, markdown formatting (like \`\`\`json), or explanations around the JSON object.
      The JSON object must have these four keys: "title", "excerpt", "markdownContent", "tags".
      Ensure all string values within the JSON are properly escaped to make the JSON parsable.
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
    console.error('Error in /api/generate-blog:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate blog post' }, { status: 500 });
  }
}