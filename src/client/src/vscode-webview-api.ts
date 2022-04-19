// Get a reference to the VS Code webview api.
// We use this API to post messages back to our extension.
// @ts-ignore
export const vscodeWebviewAPI = __IN_VSCODE_WEBVIEW__ ? acquireVsCodeApi() : {}
