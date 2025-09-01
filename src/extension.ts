import * as vscode from 'vscode';
import { analyseHtml } from 'a11y-assistant';
import type { CustomViolation } from 'a11y-assistant/types';

export function activate(context: vscode.ExtensionContext) {
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('a11y-assistant');
	context.subscriptions.push(diagnosticCollection);

	vscode.workspace.onDidSaveTextDocument(doc => {
		runA11yAnalysis(doc, diagnosticCollection);
	});

	vscode.workspace.onDidOpenTextDocument(doc => {
		runA11yAnalysis(doc, diagnosticCollection);
	});
}

async function runA11yAnalysis(
	document: vscode.TextDocument,
	diagnosticCollection: vscode.DiagnosticCollection
) {
	const content = document.getText();
	const results = await analyseHtml(content);

	const diagnostics: vscode.Diagnostic[] = results.map((issue: CustomViolation) => {
		const line = issue.nodes?.[0]?.line ?? 1;
		const column = issue.nodes?.[0]?.column ?? 1;

		const range = new vscode.Range(
			new vscode.Position(line - 1, column - 1),
			new vscode.Position(line - 1, column)
		);

		let severity = vscode.DiagnosticSeverity.Warning;

		switch (issue.severity) {
			case 'info':
				severity = vscode.DiagnosticSeverity.Information;
				break;
			case 'error':
				severity = vscode.DiagnosticSeverity.Error;
				break;
			default:
				severity = vscode.DiagnosticSeverity.Warning;
				break;
		}

		const diagnostic = new vscode.Diagnostic(
			range,
			`${issue.message}\n`,
			severity
		);

		diagnostic.source = "a11y-assistant";
		diagnostic.code = {
			value: issue.explanation ?? '',
			target: vscode.Uri.parse(issue.helpUrl ?? '')
		};
		diagnostic.relatedInformation = [
			new vscode.DiagnosticRelatedInformation(
				new vscode.Location(document.uri, range),
				issue.suggestion ?? ''
			)
		];

		return diagnostic;
	});

	diagnosticCollection.set(document.uri, diagnostics);
}

export function deactivate() { }
