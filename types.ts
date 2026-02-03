export enum AnimusType {
  HAPPINESS = 'HAPPINESS',
  SADNESS = 'SADNESS',
  ANGER = 'ANGER',
  FEAR = 'FEAR',
  DISGUST = 'DISGUST',
  SURPRISE = 'SURPRISE',
  EGO = 'EGO',
  ID = 'ID',
  SUPEREGO = 'SUPEREGO'
}

export interface AnimusCharacter {
  id: AnimusType;
  name: string;
  role: string; // e.g., 'Happiness', 'Sadness'
  description: string;
  appearance: string;
  personality: string;
  speechStyle: string;
  greeting: string;
  locationName: string; // The specific room name
  themeColor: string; // Tailwind color class suffix e.g., 'yellow-400'
  bgGradient: string; // CSS gradient string
  profileImage: string; // Character portrait URL
  locationImage: string; // Location background URL
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ChatSession {
  animusId: AnimusType;
  messages: Message[];
}