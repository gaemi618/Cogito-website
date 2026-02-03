import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnimusType, Message } from '../types';
import { CHARACTERS, WORLD_LORE } from '../constants';

const apiKey = process.env.API_KEY;

// Initialize the API client
// Note: In a real production app, you might want to proxy this through a backend 
// to hide the API key, but for this demo, we use process.env as instructed.
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateAnimusResponse = async (
  animusType: AnimusType,
  history: Message[],
  userMessage: string
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please configure process.env.API_KEY.";
  }

  const character = CHARACTERS[animusType];
  
  const systemInstruction = `
    ${WORLD_LORE}
    
    You are roleplaying as: ${character.name}
    Role: ${character.role}
    Location: ${character.locationName}
    
    Character Details:
    - Appearance: ${character.appearance}
    - Personality: ${character.personality}
    - Speech Style: ${character.speechStyle}
    
    Instructions:
    - You must STRICTLY adhere to your character's personality and speech style.
    - Keep responses concise (under 3 sentences usually) unless explaining a complex philosophy.
    - Immerse the user in the "Cogito" setting.
    - Do not mention you are an AI. You are an Animus.
  `;

  try {
    // Construct the prompt with history
    const prompt = userMessage;
    
    // We use a simplified approach for history here by appending it to the prompt 
    // or using the chat interface if maintaining long context is needed. 
    // For this implementation, we will use the Chat API for better context handling.
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: prompt });
    return result.text || "...";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "(The connection to the Animus seems unstable...)";
  }
};