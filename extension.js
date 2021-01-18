// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//Hello world --SB
const vscode = require('vscode');
const nodeDependencies_1 = require("./nodeDependencies");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sidebar-translate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const nodeDependenciesProvider = new nodeDependencies_1.DepNodeProvider(vscode.workspace.workspaceFolders);
	vscode.window.registerTreeDataProvider('sbts', nodeDependenciesProvider);
	vscode.commands.registerCommand('sbts.refreshEntry', () => nodeDependenciesProvider.refresh());
    vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
    vscode.commands.registerCommand('sbts.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
    vscode.commands.registerCommand('sbts.editEntry', (node) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
    vscode.commands.registerCommand('sbts.deleteEntry', (node) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
	let disposable = vscode.commands.registerCommand('sbts.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from sidebar-translate!');
	});
	
	context.subscriptions.push(disposable);
}
// @ts-ignore
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	// @ts-ignore
	activate,
	deactivate
}
