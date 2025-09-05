import * as vscode from 'vscode';
import { analyseHtml } from 'a11y-assistant';
import type { CustomViolation } from 'a11y-assistant/types';

export function activate(context: vscode.ExtensionContext) {
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('a11y-assistant');
	context.subscriptions.push(diagnosticCollection);

	// Run analysis when an HTML document is saved
	context.subscriptions.push(
		vscode.workspace.onDidSaveTextDocument(doc => {
			if (doc.languageId === "html") {
				runA11yAnalysis(doc, diagnosticCollection);
			}
		})
	);

	// Run analysis when an HTML document is opened
	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(doc => {
			if (doc.languageId === "html") {
				runA11yAnalysis(doc, diagnosticCollection);
			}
		})
	);

	// Run analysis on already opened HTML docs when VS Code starts
	vscode.workspace.textDocuments.forEach(doc => {
		if (doc.languageId === "html") {
			runA11yAnalysis(doc, diagnosticCollection);
		}
	});
}

async function runA11yAnalysis(
	document: vscode.TextDocument,
	diagnosticCollection: vscode.DiagnosticCollection
) {
	const content = document.getText();
	const results = await analyseHtml(content);

	const diagnostics: vscode.Diagnostic[] = results.map((issue: CustomViolation) => {
		const line = Math.max(issue.nodes?.[0]?.line ?? 1, 1); // It will always return greater than 1
		const column = Math.max(issue.nodes?.[0]?.column ?? 1, 1);

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
