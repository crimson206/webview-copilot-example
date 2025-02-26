// src/chatbot/history.ts

import * as vscode from 'vscode';
import { ChatMessage, ChatHistory } from './types';

/**
 * Manages chat history persistence using VS Code's extension storage
 */
export class ChatHistoryManager {
    private static STORAGE_KEY = 'chatHistory';

    constructor(private context: vscode.ExtensionContext) {}

    /**
     * Saves a new message to the chat history
     * @param message The message content
     * @param isUser Whether the message is from the user
     * @returns Promise containing the saved message
     */
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

    /**
     * Retrieves the current chat history
     * @returns Promise containing the chat history
     */
    async getHistory(): Promise<ChatHistory> {
        const history = this.context.globalState.get<ChatHistory>(ChatHistoryManager.STORAGE_KEY);
        return history || { messages: [] };
    }

    /**
     * Clears all chat history
     */
    async clearHistory(): Promise<void> {
        await this.context.globalState.update(ChatHistoryManager.STORAGE_KEY, { messages: [] });
    }
}