import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface RecommendedExpert {
  name: string;
  title: string;
  specialty: string;
  reason: string;
  slug: string;
}

interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  detectedMood: string | null;
  recommendedExperts: RecommendedExpert[];
  setOpen: (open: boolean) => void;
  toggle: () => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
  setMood: (mood: string) => void;
  setRecommendedExperts: (experts: RecommendedExpert[]) => void;
  reset: () => void;
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  isOpen: false,
  messages: [],
  isTyping: false,
  detectedMood: null,
  recommendedExperts: [],
  setOpen: (open) => set({ isOpen: open }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (typing) => set({ isTyping: typing }),
  setMood: (mood) => set({ detectedMood: mood }),
  setRecommendedExperts: (experts) => set({ recommendedExperts: experts }),
  reset: () =>
    set({
      messages: [],
      isTyping: false,
      detectedMood: null,
      recommendedExperts: [],
    }),
}));
