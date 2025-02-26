// src/chatbot/types.ts

export interface ChatMessage {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: number;
}

export interface ChatHistory {
    messages: ChatMessage[];
}

export interface ChatState {
    currentHistory: ChatHistory;
}