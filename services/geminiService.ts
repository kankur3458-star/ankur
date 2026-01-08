
import { GoogleGenAI } from "@google/genai";

// Woodworking advice service using Gemini 3 Flash
export const getWoodworkAdvice = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional woodworking and carpentry consultant. A customer is asking: "${query}". 
      Provide a concise, helpful, and professional response. Keep it under 100 words. 
      Mention if the task requires a specialist or if it's a DIY project.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });
    
    return response.text || "I'm sorry, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the woodworking AI.";
  }
};

// General Home Maintenance Help using Google Search Grounding
export const getSmartHomeHelp = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User needs help with: "${query}". Research the latest home maintenance tips, local regulations if applicable, or best practices using Google Search. Provide a very concise summary (under 80 words) and direct them on how to proceed.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      text: text || "I couldn't find specific info right now.",
      sources: sources.map((chunk: any) => ({
        title: chunk.web?.title || "Search Result",
        url: chunk.web?.uri || "#"
      })).filter((s: any) => s.url !== "#")
    };
  } catch (error) {
    console.error("Smart Help Error:", error);
    return { text: "Search service is currently unavailable.", sources: [] };
  }
};
