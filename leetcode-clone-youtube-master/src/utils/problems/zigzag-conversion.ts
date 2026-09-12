import assert from "assert";
import { Problem } from "../types/problem";

function referenceConvert(s: string, numRows: number): string {
	if (numRows === 1 || numRows >= s.length) return s;

	const rows: string[] = new Array(numRows).fill("");
	let currentRow = 0;
	let goingDown = false;

	for (const char of s) {
		rows[currentRow] += char;
		if (currentRow === 0 || currentRow === numRows - 1) {
			goingDown = !goingDown;
		}
		currentRow += goingDown ? 1 : -1;
	}

	return rows.join("");
}

export const zigzagConversionHandler = (fn: any) => {
	try {
		const tests: { s: string; numRows: number }[] = [
			{ s: "PAYPALISHIRING", numRows: 3 },
			{ s: "PAYPALISHIRING", numRows: 4 },
			{ s: "A", numRows: 1 },
			{ s: "AB", numRows: 1 },
			{ s: "ABCD", numRows: 2 },
			{ s: "ABCDE", numRows: 4 },
		];

		for (const test of tests) {
			const expected = referenceConvert(test.s, test.numRows);
			const result = fn(test.s, test.numRows);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from zigzagConversionHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeZigzagConversionJS = `// Do not edit function name
function convert(s, numRows) {
  // Write your code here
};`;

export const zigzagConversion: Problem = {
	id: "zigzag-conversion",
	title: "294. Zigzag Conversion",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, write it out in a zigzag pattern across <code>numRows</code> rows: starting
    top-to-bottom down the first column, then diagonally up-and-right to the top of the next column, and so on,
    repeating this down-then-diagonal-up movement across the whole string.
  </p>
  <p class='mt-3'>
    For example, writing <code>"PAYPALISHIRING"</code> with <code>numRows = 3</code> produces:
  </p>
  <p class='mt-3'><code>P&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;H&nbsp;&nbsp;&nbsp;N<br/>A&nbsp;P&nbsp;L&nbsp;S&nbsp;I&nbsp;I&nbsp;G<br/>Y&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;R</code></p>
  <p class='mt-3'>
    Then return the string formed by reading the rows one at a time, from top to bottom, left to right:
    <code>"PAHNAPLSIIGYIR"</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "PAYPALISHIRING", numRows = 3`,
			outputText: `"PAHNAPLSIIGYIR"`,
		},
		{
			id: 1,
			inputText: `s = "PAYPALISHIRING", numRows = 4`,
			outputText: `"PINALSIGYAHRPI"`,
		},
		{
			id: 2,
			inputText: `s = "A", numRows = 1`,
			outputText: `"A"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 1000</code></li>
  <li class='mt-2'><code>s</code> consists of English letters, punctuation, and spaces.</li>
  <li class='mt-2'><code>1 <= numRows <= 1000</code></li>`,
	starterCode: starterCodeZigzagConversionJS,
	handlerFunction: zigzagConversionHandler,
	starterFunctionName: "function convert(",
	order: 294,
};
