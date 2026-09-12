import * as acorn from "acorn";

// `new Function(...)` (used to turn the editor's text into a callable) never
// exposes a line number for syntax errors in any browser — V8/Acorn only
// report parse-error positions when you parse the source yourself first.
// So we parse the user's full editor text with acorn *before* attempting to
// build/run it, to catch syntax errors with an exact line number up front.
export function checkSyntaxError(fullCode: string): { line: number; message: string } | null {
	try {
		acorn.parse(fullCode, { ecmaVersion: "latest", allowReturnOutsideFunction: true });
		return null;
	} catch (error: any) {
		return {
			line: error?.loc?.line ?? 1,
			message: String(error?.message ?? "Syntax error").replace(/\s*\(\d+:\d+\)\s*$/, ""),
		};
	}
}

// ECMA-262's CreateDynamicFunction always synthesizes the compiled source as
// "function anonymous(\n) {\n" + body + "\n}" — a spec-guaranteed 2-line
// prefix before the body starts, in every conformant engine.
const FUNCTION_CONSTRUCTOR_LINE_OFFSET = 2;

// Runtime errors thrown while executing the user's function *do* carry a
// line number, but it's relative to the sliced function source handed to
// `new Function`, not to the full editor text. This maps it back.
export function formatRuntimeError(error: any, fullCode: string, sliceStartIndex: number, functionName: string): string {
	const message = error?.message ?? String(error);
	const stackLines: string[] = (error?.stack ?? "").split("\n");
	const topFrame = stackLines.find((line) => line.includes(`at ${functionName} `)) ?? stackLines[1] ?? "";

	const matches = [...topFrame.matchAll(/<anonymous>:(\d+):(\d+)/g)];
	if (matches.length === 0 || !topFrame.includes(functionName)) {
		return message;
	}

	const rawLine = parseInt(matches[matches.length - 1][1], 10);
	const slicedLine = rawLine - FUNCTION_CONSTRUCTOR_LINE_OFFSET;
	if (slicedLine < 1) return message;

	const linesBeforeSlice = fullCode.slice(0, sliceStartIndex).split("\n").length - 1;
	const editorLine = linesBeforeSlice + slicedLine;

	return `Line ${editorLine}: ${message}`;
}
