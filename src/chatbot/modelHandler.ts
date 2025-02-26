// src/chatbot/modelHandler.ts

import * as vscode from 'vscode';
import { ChatMessage } from './types';

export class ModelHandler {
    private static async getModel() {
        const [model] = await vscode.lm.selectChatModels({ 
            vendor: 'copilot',
            family: 'gpt-4o' 
        });
        
        if (!model) {
            throw new Error('No language model found. Please make sure GitHub Copilot Chat is installed and enabled.');
        }
        
        return model;
    }

    static async getResponse(userMessage: string, chatHistory: ChatMessage[]): Promise<AsyncIterable<string>> {
        const model = await this.getModel();
        
        // Start with a system message
        const messages = [
            vscode.LanguageModelChatMessage.User(
                'You are a helpful assistant who can discuss coding.'
            ),
        ];

        // Add previous chat history to messages
        for (const msg of chatHistory) {
            if (msg.isUser) {
                messages.push(vscode.LanguageModelChatMessage.User(msg.content));
            } else {
                messages.push(vscode.LanguageModelChatMessage.Assistant(msg.content));
            }

        }

        // Add current user message
        messages.push(vscode.LanguageModelChatMessage.User(userMessage));

        const response = await model.sendRequest(
            messages, 
            {}, 
            new vscode.CancellationTokenSource().token
        );

        return response.text;
    }
}