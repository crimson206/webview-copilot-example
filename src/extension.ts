// src/extension.ts

import * as vscode from 'vscode';
import { ChatWebviewPanel } from './chatbot/webview';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('chatbot.start', () => {
        ChatWebviewPanel.createOrShow(context);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }