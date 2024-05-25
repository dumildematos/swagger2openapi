import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

export class Swagger2OpenAPI {
    static createFileOrFolder(taskType: "file" | "folder", relativePath: string, data: string) {
        relativePath = relativePath || "/";
        const projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        
        if (path.resolve(relativePath) === relativePath) {
            relativePath = relativePath.substring(projectRoot.length).replace(/\\/g, "/");
        }

        if (!relativePath.endsWith("/")) {
            relativePath += "/";
        }
        const basepath = projectRoot;

        let fullpath = relativePath;
        try {
            let paths = fullpath.split(">").map((e) => e.trim());
            let targetpath =
                taskType === "file" ? path.dirname(paths[0]) : paths[0];
            paths[0] = taskType === "file" ? path.basename(paths[0]) : "/";
            targetpath = path.join(basepath, targetpath);
            paths = paths.map((e) => path.join(targetpath, e));

            if (taskType === "file") {
                this.makefiles(paths, data);
            } else {
                this.makefolders(paths);
            }

            setTimeout(() => {
                //tiny delay
                if (taskType === "file") {
                    let openPath = paths.find((path) => fs.lstatSync(path).isFile());
                    if (!openPath) return;
                    vscode.workspace.openTextDocument(openPath).then((editor) => {
                        if (!editor) return;
                        vscode.window.showTextDocument(editor);
                    });
                }
            }, 50);
        } catch (error) {
            this.logError(error);
            vscode.window.showErrorMessage(
                "Something went wrong! Please report on GitHub"
            );
        }
    }

    static makefiles(paths: string[], data: string) {
        paths.forEach((path) => {
            fs.writeFile(path, data, { flag: 'w' }, (err) => {
                if (err) {
                    vscode.window.showErrorMessage(`Failed to write file: ${path} `);
                    return;
                }
                vscode.window.showInformationMessage(`File created or replaced: ${path} ✨⭐🌟⭐✨ `);

                // Execute npm command after file is created or replaced
                const npmCommand = vscode.workspace.getConfiguration().get<string>('swagger2openapi.npmCommand') || 'npm run openapi';

                exec(npmCommand,  { cwd: vscode.workspace.rootPath }, (err, stdout, stderr) => {
                    if (err) {
                        vscode.window.showErrorMessage(`Failed to run command: ${npmCommand}`);
                        return;
                    }
                    vscode.window.showInformationMessage(`Command executed successfully: ${npmCommand}`);
                    console.log(stdout);
                    console.error(stderr);
                });
            });
        });
    }

    static makefolders(paths: string[]) {
        paths.forEach((path) => {
            fs.mkdirSync(path);
        });
    }

    static logError(error: any) {
        console.error(error);
        // Log or handle errors here
    }
}