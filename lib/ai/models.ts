export const DEFAULT_CHAT_MODEL: string = "helia-sun-shield";

interface ChatModel {
  id: string;
  name: string;
  description: string;
  icon?: string; // Emoji icon for each bot
}

export const chatModels: Array<ChatModel> = [
  {
    id: "helia-sun-shield",
    name: "Helia Sun Shield",
    description: "Digital Safety & Awareness",
    icon: "🛡️",
  },
  {
    id: "helia-growth-ray",
    name: "Helia Growth Ray",
    description: "Behavior & Emotional Development",
    icon: "💡",
  },
  {
    id: "helia-sunbeam",
    name: "Helia Sunbeam",
    description: "Confidence & Family Bonding",
    icon: "🎙️",
  },
  {
    id: "helia-inner-dawn",
    name: "Helia Inner Dawn",
    description: "Mindfulness & Relationship Wellness",
    icon: "🧘",
  },
];
