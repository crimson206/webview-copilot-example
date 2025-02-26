// src/chatbot/history.ts

import * as vscode from 'vscode';
import { ChatMessage, ChatHistory } from './types';

export class ChatHistoryManager {
    private static STORAGE_KEY = 'chatHistory';

    constructor(private context: vscode.ExtensionContext) {}

    async saveMessage(message: string, isUser: boolean): Promise<ChatMessage> {
        const history = await this.getHistory();
        
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            content: message,
            isUser,
            timestamp: Date.now()
        };
        
        history.messages.push(newMessage);
        await this.context.globalState.update(ChatHistoryManager.STORAGE_KEY, history);
        
        return newMessage;
    }

    async getHistory(): Promise<ChatHistory> {
        const history = this.context.globalState.get<ChatHistory>(ChatHistoryManager.STORAGE_KEY);
        return history || { messages: [] };
    }

    async clearHistory(): Promise<void> {
        await this.context.globalState.update(ChatHistoryManager.STORAGE_KEY, { messages: [] });
    }
}