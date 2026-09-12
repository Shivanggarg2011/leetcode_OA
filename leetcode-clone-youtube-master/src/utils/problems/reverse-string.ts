import assert from "assert";
import { Problem } from "../types/problem";

export const reverseStringHandler = (fn: any) => {
	try {
		function referenceSolution(s: string[]): string[] {
			return [...s].reverse();
		}

		const tests: string[][] = [
			["h", "e", "l", "l", "o"],
			["H", "a", "n", "n", "a", "h"],
			["a"],
			["a", "b"],
			["a", "b", "c", "d", "e", "f"],
		];

		for (const s of tests) {
			const expected = referenceSolution(s);
			const input = [...s];
			fn(input);
			assert.deepStrictEqual(input, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from reverseStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReverseStringJS = `function reverseString(s) {
  // Modify s in place. Do not return anything.
  // Write your code here
};`;

export const reverseString: Problem = {
	id: "reverse-string",
	title: "42. Reverse String",
	problemStatement: `<p class='mt-3'>
    Write a function that reverses a string. The input string is given as an array of characters
    <code>s</code>.
  </p>
  <p class='mt-3'>
    You must modify the array <strong>in place</strong> using <code>O(1)</code> extra memory, rather
    than returning a new array.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = ["h","e","l","l","o"]`,
			outputText: `["o","l","l","e","h"]`,
		},
		{
			id: 1,
			inputText: `s = ["H","a","n","n","a","h"]`,
			outputText: `["h","a","n","n","a","H"]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10^5</code></li>
  <li class='mt-2'><code>s[i]</code> is a printable ASCII character.</li>`,
	starterCode: starterCodeReverseStringJS,
	handlerFunction: reverseStringHandler,
	starterFunctionName: "function reverseString(",
	order: 42,
};
