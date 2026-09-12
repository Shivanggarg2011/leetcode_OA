import assert from "assert";
import { Problem } from "../types/problem";

function referenceRepeatedSubstringPattern(s: string): boolean {
	const n = s.length;
	for (let len = 1; len <= Math.floor(n / 2); len++) {
		if (n % len !== 0) continue;
		const candidate = s.slice(0, len);
		let repeated = "";
		while (repeated.length < n) {
			repeated += candidate;
		}
		if (repeated === s) return true;
	}
	return false;
}

export const repeatedSubstringPatternHandler = (fn: any) => {
	try {
		const tests: string[] = ["abab", "aba", "abcabcabcabc", "a", "aa", "abaababaab"];

		for (const s of tests) {
			const expected = referenceRepeatedSubstringPattern(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from repeatedSubstringPatternHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRepeatedSubstringPatternJS = `// Do not edit function name
function repeatedSubstringPattern(s) {
  // Write your code here
};`;

export const repeatedSubstringPattern: Problem = {
	id: "repeated-substring-pattern",
	title: "304. Repeated Substring Pattern",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, return <code>true</code> if it can be constructed by taking some substring of
    it and repeating that substring multiple times (two or more) end-to-end to form the whole of <code>s</code>.
    Otherwise return <code>false</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "abab"`,
			outputText: `true`,
			explanation: "\"abab\" is \"ab\" repeated twice.",
		},
		{
			id: 1,
			inputText: `s = "aba"`,
			outputText: `false`,
		},
		{
			id: 2,
			inputText: `s = "abcabcabcabc"`,
			outputText: `true`,
			explanation: "\"abcabcabcabc\" is \"abc\" repeated four times, or \"abcabc\" repeated twice.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10^4</code></li>
  <li class='mt-2'><code>s</code> consists of lowercase English letters.</li>`,
	starterCode: starterCodeRepeatedSubstringPatternJS,
	handlerFunction: repeatedSubstringPatternHandler,
	starterFunctionName: "function repeatedSubstringPattern(",
	order: 304,
};
