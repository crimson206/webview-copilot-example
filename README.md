# VS Code Chatbot Extension

This Visual Studio Code extension provides a simple chatbot using WebView and a language model. The chatbot can discuss coding topics and maintains a history of the conversation.

## Features

- Chat with a helpful assistant that can discuss coding topics.
- Maintains a history of the conversation.
- Uses GitHub Copilot Chat for language model responses.

## Installation

1. Run `npm install` in the terminal to install dependencies.
```sh
npm install
```
2. Navigate to the webview-ui folder and install its dependencies.
```sh
cd webview-ui
npm install
```
3. Build the webview UI
```sh
npm run build
```  
4. Return to the root folder:
```sh
cd ..
```

## Running the Extension

1. Open the project in Visual Studio Code.
2. Open the Debug View (Ctrl+Shift+D).
3. Select the `Run Extension` configuration.
4. Press `F5` to start the extension in a new VS Code window.

## Usage

1. Open the Command Palette (Ctrl+Shift+P).
2. Type `Start Chatbot` and select the command.
3. A new WebView panel will open with the chatbot interface.
4. Type your message in the input field and press `Enter` or click the `Send` button to send the message.

## Development

### Project Structure

- `src/`: Contains the source code for the extension.
  - `chatbot/`: Contains the chatbot-related code.
    - `history.ts`: Manages the chat history.
    - `modelHandler.ts`: Handles interactions with the language model.
    - `types.ts`: Defines types used in the chatbot.
    - `webview.ts`: Manages the WebView panel.
  - `extension.ts`: Entry point for the extension.
- `webview-ui/`: Contains the React-based UI for the WebView.
  - `src/`: Contains the source code for the WebView UI.
    - `App.tsx`: Main component for the chat UI.
    - `ChatBubble.tsx`: Component for displaying chat messages.
    - `index.tsx`: Entry point for the WebView UI.
    - `vscodeApi.tsx`: Wrapper for the VS Code API.
  - `public/`: Contains the HTML file for the WebView.
  - `vite.config.ts`: Configuration for Vite.

### Scripts

- `npm run compile`: Compiles the TypeScript code.
- `npm run watch`: Compiles the TypeScript code in watch mode.
- `npm run lint`: Lints the source code using ESLint.
- `npm run test`: Runs the tests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.