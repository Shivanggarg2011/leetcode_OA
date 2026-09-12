import assert from "assert";
import { Problem } from "../types/problem";

export const isSubsequenceHandler = (fn: any) => {
	try {
		function referenceSolution(s: string, t: string): boolean {
			let i = 0;
			for (let j = 0; j < t.length && i < s.length; j++) {
				if (s[i] === t[j]) i++;
			}
			return i === s.length;
		}

		const tests: [string, string][] = [
			["abc", "ahbgdc"],
			["axc", "ahbgdc"],
			["", "ahbgdc"],
			["abc", "abc"],
			["b", "abc"],
			["acb", "ahbgdc"],
		];

		for (const [s, t] of tests) {
			const expected = referenceSolution(s, t);
			const result = fn(s, t);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from isSubsequenceHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIsSubsequenceJS = `function isSubsequence(s, t) {
  // Write your code here
};`;

export const isSubsequence: Problem = {
	id: "is-subsequence",
	title: "45. Is Subsequence",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>s</code> is
    a subsequence of <code>t</code>, or <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    A subsequence of a string is a new string formed by deleting some (possibly zero) characters
    without disturbing the relative order of the remaining characters. For example,
    <code>"ace"</code> is a subsequence of <code>"abcde"</code> while <code>"aec"</code> is not.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "abc", t = "ahbgdc"`,
			outputText: "true",
		},
		{
			id: 1,
			inputText: `s = "axc", t = "ahbgdc"`,
			outputText: "false",
		},
		{
			id: 2,
			inputText: `s = "", t = "ahbgdc"`,
			outputText: "true",
			explanation: "An empty string is a subsequence of every string.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= s.length <= 100</code></li>
  <li class='mt-2'><code>0 <= t.length <= 10^4</code></li>
  <li class='mt-2'><code>s</code> and <code>t</code> consist only of lowercase English letters.</li>`,
	starterCode: starterCodeIsSubsequenceJS,
	handlerFunction: isSubsequenceHandler,
	starterFunctionName: "function isSubsequence(",
	order: 45,
};
