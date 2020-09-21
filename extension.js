// The module 'vscode' contains the VS Code extensibility API Import the module
// and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated your extension is
// activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('Congratulations, your extension "textformat" is now active!');

    let disposable = [vscode.commands.registerCommand('textformat.snakecase', function () {

		let editor    = vscode.window.activeTextEditor;
		if (!editor) {
			return vscode.window.showInformationMessage('No select');
		}

		// STRING SELECTION
		let selection = editor.selection;
		// STRING SELECTION TEXT
		let text      = editor.document.getText(selection);

		// TRANSFORM SNAKE CASE
		const toSnakeCase = str => str && str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			.map(x => x.toLowerCase())
			.join('_');
		
		// REMOVE SPE CHAR 
		let newStr 	  = toSnakeCase(text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))

		// REPLACE SELECTION
		editor.edit(builder => {
			builder.replace(selection, newStr);
		}).then(success => {
			console.log("success:", success);
			let postion      = editor.selection.end; 
			editor.selection = new vscode.Selection(postion, postion);
		});
		
		return vscode.window.showInformationMessage('Snakecase updated !');

	}), vscode.commands.registerCommand('textformat.uppercase', function () {

		let editor    = vscode.window.activeTextEditor;
		if (!editor) {
			return vscode.window.showInformationMessage('No select');
		}

		// STRING SELECTION
		let selection = editor.selection;
		// STRING SELECTION TEXT
		let text      = editor.document.getText(selection);

		// TRANSFORM SNAKE CASE
		const toSnakeCase = str => str && str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			.map(x => x.charAt(0).toUpperCase() + x.slice(1))
			.join('');
		
		// REMOVE SPE CHAR 
		let newStr 	  = toSnakeCase(text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))

		// REPLACE SELECTION
		editor.edit(builder => {
			builder.replace(selection, newStr);
		}).then(success => {
			console.log("success:", success);
			let postion      = editor.selection.end; 
			editor.selection = new vscode.Selection(postion, postion);
		});

		return vscode.window.showInformationMessage('Uppercase updated !');
	})];

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
