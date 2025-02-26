// src/extension.ts

import * as vscode from 'vscode';
import { ChatWebviewPanel } from './chatbot/webview';

/**
 * Activates the extension and registers the chatbot command
 * @param context The extension context provided by VS Code
 */
export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('chatbot.start', () => {
        ChatWebviewPanel.createOrShow(context);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }