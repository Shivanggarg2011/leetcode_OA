// Parses the "name = literal, name2 = literal2" strings used across every
// problem's example inputText (and typed by users for custom test cases)
// into ordered {name, value} pairs of real JS values.

export type ParsedArg = {
	name: string;
	raw: string;
	value: any;
};

// Splits on top-level commas only, respecting nested [], {}, (), and quotes.
function splitTopLevel(input: string, separator = ","): string[] {
	const parts: string[] = [];
	let depth = 0;
	let quote: string | null = null;
	let current = "";
	for (let i = 0; i < input.length; i++) {
		const ch = input[i];
		if (quote) {
			current += ch;
			if (ch === quote && input[i - 1] !== "\\") quote = null;
			continue;
		}
		if (ch === '"' || ch === "'" || ch === "`") {
			quote = ch;
			current += ch;
			continue;
		}
		if (ch === "[" || ch === "{" || ch === "(") depth++;
		if (ch === "]" || ch === "}" || ch === ")") depth--;
		if (ch === separator && depth === 0) {
			parts.push(current);
			current = "";
			continue;
		}
		current += ch;
	}
	if (current.trim().length > 0) parts.push(current);
	return parts;
}

// Evaluates a JS literal expression (array/object/string/number/boolean/null).
// Trusted for authored example text; for user-typed custom cases this runs
// client-side only, in the same trust boundary as the code editor itself
// (which already executes the submitted solution via `new Function`).
export function evalLiteral(literal: string): any {
	// eslint-disable-next-line no-new-func
	return new Function(`"use strict"; return (${literal});`)();
}

export function parseArgString(inputText: string): ParsedArg[] {
	const segments = splitTopLevel(inputText.trim());
	const args: ParsedArg[] = [];
	for (const segment of segments) {
		const eqIndex = segment.indexOf("=");
		if (eqIndex === -1) continue;
		const name = segment.slice(0, eqIndex).trim();
		const raw = segment.slice(eqIndex + 1).trim();
		args.push({ name, raw, value: evalLiteral(raw) });
	}
	return args;
}
