import assert from "assert";
import { Problem } from "../types/problem";

function referenceIntToRoman(num: number): string {
	const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

	let result = "";
	let remaining = num;
	for (let i = 0; i < values.length; i++) {
		while (remaining >= values[i]) {
			result += symbols[i];
			remaining -= values[i];
		}
	}
	return result;
}

export const integerToRomanHandler = (fn: any) => {
	try {
		const tests: number[] = [3, 58, 1994, 9, 4, 3999, 1, 444];

		for (const num of tests) {
			const expected = referenceIntToRoman(num);
			const result = fn(num);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from integerToRomanHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIntegerToRomanJS = `// Do not edit function name
function intToRoman(num) {
  // Write your code here
};`;

export const integerToRoman: Problem = {
	id: "integer-to-roman",
	title: "301. Integer to Roman",
	problemStatement: `<p class='mt-3'>
    Roman numerals use seven symbols: <code>I</code> (1), <code>V</code> (5), <code>X</code> (10),
    <code>L</code> (50), <code>C</code> (100), <code>D</code> (500), and <code>M</code> (1000). Values are
    normally written by combining symbols from largest to smallest, left to right.
  </p>
  <p class='mt-3'>
    Six special subtractive pairs are used to avoid four repeated symbols in a row: <code>IV</code> (4),
    <code>IX</code> (9), <code>XL</code> (40), <code>XC</code> (90), <code>CD</code> (400), and <code>CM</code>
    (900).
  </p>
  <p class='mt-3'>
    Given an integer <code>num</code>, convert it to its roman numeral representation.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `num = 3`,
			outputText: `"III"`,
		},
		{
			id: 1,
			inputText: `num = 58`,
			outputText: `"LVIII"`,
			explanation: "L = 50, V = 5, III = 3.",
		},
		{
			id: 2,
			inputText: `num = 1994`,
			outputText: `"MCMXCIV"`,
			explanation: "M = 1000, CM = 900, XC = 90, IV = 4.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= num <= 3999</code></li>`,
	starterCode: starterCodeIntegerToRomanJS,
	handlerFunction: integerToRomanHandler,
	starterFunctionName: "function intToRoman(",
	order: 301,
};
