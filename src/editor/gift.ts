import * as vscode from 'vscode'
import * as fs from 'fs'
/**
 * Provider for gift image editors.
 *
 * Cat scratch editors are used for `.gifty` files, which are just json files.
 */
export class GiftEditorProvider implements vscode.CustomTextEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new GiftEditorProvider(context)
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      GiftEditorProvider.viewType,
      provider
    )
    return providerRegistration
  }

  private static readonly viewType = 'GiftImagesFile'

  constructor(private readonly context: vscode.ExtensionContext) {}

  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true
    }
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview)

    function updateWebview() {
      webviewPanel.webview.postMessage({
        type: 'update',
        text: document.getText()
      })
    }

    // Hook up event handlers so that we can synchronize the webview with the text document.
    //
    // The text document acts as our model, so we have to sync change in the document to our
    // editor and sync changes in the editor back to the document.
    //
    // Remember that a single text document can also be shared between multiple custom
    // editors (this happens for example when you split a custom editor)

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          updateWebview()
        }
      }
    )

    // Make sure we get rid of the listener when our editor is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose()
    })

    // Receive message from the webview.
    webviewPanel.webview.onDidReceiveMessage((e) => {
      switch (e.command) {
        case 'copy':
          doClipBoard(e.text)
          break

        case 'open':
          doOpenImageInEditor(e.path)
          break
        default:
          break
      }
    })

    const doClipBoard = (text: string) => {
      if (text) {
        vscode.env.clipboard.writeText(text)
        vscode.window.showInformationMessage('已复制到剪贴板')
      }
    }

    const doOpenImageInEditor = (path: string) => {
      if (path && fs.existsSync(path)) {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.file(path))
      } else {
        vscode.window.showErrorMessage('当前图片的路径不存在')
      }
    }

    updateWebview()
  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: vscode.Webview): string {
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vscode.css')
    )
    const styleClientUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'style.css')
    )
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'client.iife.js')
    )

    return /* html */ `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleVSCodeUri}" rel="stylesheet" />
        <link href="${styleClientUri}" rel="stylesheet" />

				<title>图片画廊</title>
			</head>
			<body>
				<div id="app"></div>
				
				<script src="${scriptUri}"></script>
			</body>
			</html>`
  }
}
