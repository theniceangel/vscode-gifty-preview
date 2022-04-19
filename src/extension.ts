import * as vscode from 'vscode'
import { GiftEditorProvider } from './editor/gift'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(GiftEditorProvider.register(context))
}
