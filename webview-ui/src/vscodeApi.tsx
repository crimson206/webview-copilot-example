const vscode = (window as any).acquireVsCodeApi
  ? (window as any).acquireVsCodeApi()
  : {
      postMessage: (message: any) => console.log("VS Code API message:", message),
    };

export default vscode;
