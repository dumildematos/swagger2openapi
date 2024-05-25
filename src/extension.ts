import * as vscode from "vscode";
import * as https from "https";
import { Swagger2OpenAPI } from "./Swagger2OpenAPI";


export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('swagger2openapi.generate', async () => {
        const swaggerJsonUrl = vscode.workspace.getConfiguration().get<string>('swagger2openapi.swaggerJsonUrl') || '';
        const outputPathAndFileName = vscode.workspace.getConfiguration().get<string>('swagger2openapi.outputPathAndFileName') || './swagger.json';

        if (!swaggerJsonUrl) {
            vscode.window.showErrorMessage('Swagger JSON URL is not set.');
            return;
        }

        vscode.window.showInformationMessage('Fetching Swagger JSON...');

        https.get(swaggerJsonUrl, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                Swagger2OpenAPI.createFileOrFolder('file', outputPathAndFileName, data);
            });
        }).on('error', (err) => {
            vscode.window.showErrorMessage(`Failed to fetch Swagger JSON: ${err.message}`);
        });
    });


  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
