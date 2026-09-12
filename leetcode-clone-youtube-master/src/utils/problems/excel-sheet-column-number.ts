import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: treat the title as a base-26 number where 'A' = 1.
function referenceTitleToNumber(columnTitle: string): number {
	let result = 0;
	for (let i = 0; i < columnTitle.length; i++) {
		const digit = columnTitle.charCodeAt(i) - "A".charCodeAt(0) + 1;
		result = result * 26 + digit;
	}
	return result;
}

export const excelSheetColumnNumberHandler = (fn: any) => {
	try {
		const tests = ["A", "AB", "ZY", "Z", "AA", "FXSHRXW"];
		for (const columnTitle of tests) {
			const expected = referenceTitleToNumber(columnTitle);
			const result = fn(columnTitle);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from excelSheetColumnNumberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeExcelSheetColumnNumberJS = `function titleToNumber(columnTitle) {
  // Write your code here
};`;

export const excelSheetColumnNumber: Problem = {
	id: "excel-sheet-column-number",
	title: "260. Excel Sheet Column Number",
	problemStatement: `<p class='mt-3'>
    Spreadsheet programs like Excel label their columns using letters: <code>A, B, C, ..., Z,
    AA, AB, ..., AZ, BA, ...</code> and so on.
  </p>
  <p class='mt-3'>
    Given a string <code>columnTitle</code> representing a column's letter label, return the
    corresponding column number (1-indexed).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `columnTitle = "A"`,
			outputText: `1`,
		},
		{
			id: 1,
			inputText: `columnTitle = "AB"`,
			outputText: `28`,
			explanation: "'A' contributes 1 * 26, and 'B' contributes 2, so 26 + 2 = 28.",
		},
		{
			id: 2,
			inputText: `columnTitle = "ZY"`,
			outputText: `701`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= columnTitle.length <= 7</code></li>
  <li class='mt-2'><code>columnTitle</code> consists only of uppercase English letters.</li>
  <li class='mt-2'><code>1 <= columnNumber <= 2^31 - 1</code></li>`,
	starterCode: starterCodeExcelSheetColumnNumberJS,
	handlerFunction: excelSheetColumnNumberHandler,
	starterFunctionName: "function titleToNumber(",
	order: 260,
};
