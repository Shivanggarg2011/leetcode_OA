import assert from "assert";
import { Problem } from "../types/problem";

export const backspaceStringCompareHandler = (fn: any) => {
	try {
		function process(s: string): string {
			const stack: string[] = [];
			for (const c of s) {
				if (c === "#") {
					stack.pop();
				} else {
					stack.push(c);
				}
			}
			return stack.join("");
		}

		function referenceSolution(s: string, t: string): boolean {
			return process(s) === process(t);
		}

		const tests: [string, string][] = [
			["ab#c", "ad#c"],
			["ab##", "c#d#"],
			["a#c", "b"],
			["a##c", "#a#c"],
			["y#fo##f", "y#f#o##f"],
			["bxj##tw", "bxo#j##tw"],
		];

		for (const [s, t] of tests) {
			const expected = referenceSolution(s, t);
			const result = fn(s, t);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from backspaceStringCompareHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBackspaceStringCompareJS = `function backspaceCompare(s, t) {
  // Write your code here
};`;

export const backspaceStringCompare: Problem = {
	id: "backspace-string-compare",
	title: "40. Backspace String Compare",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if they would be
    equal when both are typed into empty text editors. The character <code>#</code> represents a
    backspace, which deletes the previous character (if any).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "ab#c", t = "ad#c"`,
			outputText: "true",
			explanation: `Both s and t become "ac".`,
		},
		{
			id: 1,
			inputText: `s = "ab##", t = "c#d#"`,
			outputText: "true",
			explanation: "Both s and t become an empty string.",
		},
		{
			id: 2,
			inputText: `s = "a#c", t = "b"`,
			outputText: "false",
			explanation: `s becomes "c" while t stays "b".`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length, t.length <= 200</code></li>
  <li class='mt-2'><code>s</code> and <code>t</code> only contain lowercase letters and the character <code>#</code>.</li>`,
	starterCode: starterCodeBackspaceStringCompareJS,
	handlerFunction: backspaceStringCompareHandler,
	starterFunctionName: "function backspaceCompare(",
	order: 40,
};
