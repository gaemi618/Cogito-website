import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnimusType, Message } from '../types';
import { CHARACTERS, WORLD_LORE } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnimusResponse = async (
  animusType: AnimusType,
  history: Message[],
  userMessage: string
): Promise<string> => {
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
    const prompt = userMessage;
    
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
    return "(아니무스와의 연결이 불안정합니다... 잠시 후 다시 시도해주세요.)";
  }
};