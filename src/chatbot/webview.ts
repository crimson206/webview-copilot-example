// src/chatbot/webview.ts

import * as vscode from 'vscode';
import { ChatHistoryManager } from './history';
import { ModelHandler } from './modelHandler';
import * as fs from "fs";
import * as path from "path";

export class ChatWebviewPanel {
    public static currentPanel: ChatWebviewPanel | undefined;
    private static readonly viewType = 'chatView';
    private readonly panel: vscode.WebviewPanel;
    private readonly historyManager: ChatHistoryManager;
    private readonly context: vscode.ExtensionContext;

    private constructor(
        panel: vscode.WebviewPanel,
        context: vscode.ExtensionContext
    ) {
        this.panel = panel;
        this.historyManager = new ChatHistoryManager(context);
        this.context = context;
        this.panel.webview.html = this.getWebviewContent();
        this._setWebviewMessageListener();
        this._loadHistory();
    }

    public static createOrShow(context: vscode.ExtensionContext) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (ChatWebviewPanel.currentPanel) {
            ChatWebviewPanel.currentPanel.panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            ChatWebviewPanel.viewType,
            'Chat Bot',
            column || vscode.ViewColumn.One,
            { enableScripts: true }
        );

        ChatWebviewPanel.currentPanel = new ChatWebviewPanel(panel, context);
    }

    private async _loadHistory() {
        const history = await this.historyManager.getHistory();
        this.panel.webview.postMessage({
            type: 'loadHistory',
            messages: history.messages
        });
    }

    private async _setWebviewMessageListener() {
        this.panel.webview.onDidReceiveMessage(async (message) => {
            switch (message.type) {
                case 'sendMessage':

                    await this.historyManager.saveMessage(message.content, true);
    
                    try {

                        const history = await this.historyManager.getHistory();
                        
                        const response = await ModelHandler.getResponse(
                            message.content,
                            history.messages
                        );
                        
                        let fullResponse = '';
                        for await (const fragment of response) {
                            fullResponse += fragment;
                            this.panel.webview.postMessage({
                                type: 'appendResponse',
                                content: fragment
                            });
                        }
    
                        await this.historyManager.saveMessage(fullResponse, false);
                    } catch (error) {
                        console.error('Error:', error);
                        this.panel.webview.postMessage({
                            type: 'error',
                            content: error instanceof Error ? error.message : 'An error occurred'
                        });
                    }
                    break;
            }
        });
    }
    
    private getWebviewContent(): string {
        const indexPath = path.join(this.context.extensionPath, "out", "webview", "index.html");
        let indexHtml = fs.readFileSync(indexPath, "utf-8");
    
        const scriptUri = this.panel.webview.asWebviewUri(
            vscode.Uri.file(path.join(this.context.extensionPath, "out", "webview", "assets", "index.js"))
        );
    
        indexHtml = indexHtml.replace(
            /<script type="module" src="(.+?)"><\/script>/,
            `<script type="module" src="${scriptUri.toString()}"></script>`
        );
    
        return indexHtml;
    }
}
