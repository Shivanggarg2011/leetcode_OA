import assert from "assert";
import { Problem } from "../types/problem";

function referenceRomanToInt(s: string): number {
	const values: Record<string, number> = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};

	let total = 0;
	for (let i = 0; i < s.length; i++) {
		const current = values[s[i]];
		const next = i + 1 < s.length ? values[s[i + 1]] : 0;
		if (current < next) {
			total -= current;
		} else {
			total += current;
		}
	}
	return total;
}

export const romanToIntegerHandler = (fn: any) => {
	try {
		const tests: string[] = ["III", "LVIII", "MCMXCIV", "IX", "IV", "MMXXIV", "LVIII", "DCXXI"];

		for (const s of tests) {
			const expected = referenceRomanToInt(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from romanToIntegerHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRomanToIntegerJS = `// Do not edit function name
function romanToInt(s) {
  // Write your code here
};`;

export const romanToInteger: Problem = {
	id: "roman-to-integer",
	title: "300. Roman to Integer",
	problemStatement: `<p class='mt-3'>
    Roman numerals use seven symbols: <code>I</code> (1), <code>V</code> (5), <code>X</code> (10),
    <code>L</code> (50), <code>C</code> (100), <code>D</code> (500), and <code>M</code> (1000). Symbol values are
    normally added together from left to right (e.g. <code>II</code> is 2, <code>XIII</code> is 13).
  </p>
  <p class='mt-3'>
    As a special case, when a smaller-value symbol appears immediately before a larger-value symbol, its value is
    <strong>subtracted</strong> instead: <code>IV</code> is 4, <code>IX</code> is 9, <code>XL</code> is 40,
    <code>XC</code> is 90, <code>CD</code> is 400, and <code>CM</code> is 900.
  </p>
  <p class='mt-3'>Given a valid roman numeral string <code>s</code>, convert it to its integer value.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "III"`,
			outputText: `3`,
		},
		{
			id: 1,
			inputText: `s = "LVIII"`,
			outputText: `58`,
			explanation: "L = 50, V = 5, III = 3.",
		},
		{
			id: 2,
			inputText: `s = "MCMXCIV"`,
			outputText: `1994`,
			explanation: "M = 1000, CM = 900, XC = 90, IV = 4.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 15</code></li>
  <li class='mt-2'><code>s</code> contains only the characters <code>('I','V','X','L','C','D','M')</code>.</li>
  <li class='mt-2'><code>s</code> is a valid roman numeral representing an integer in the range
    <code>[1, 3999]</code>.</li>`,
	starterCode: starterCodeRomanToIntegerJS,
	handlerFunction: romanToIntegerHandler,
	starterFunctionName: "function romanToInt(",
	order: 300,
};
