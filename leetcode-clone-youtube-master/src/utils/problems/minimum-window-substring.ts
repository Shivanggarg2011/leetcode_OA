import assert from "assert";
import { Problem } from "../types/problem";

function referenceMinWindow(s: string, t: string): string {
	if (t.length === 0 || s.length < t.length) return "";
	const need: Record<string, number> = {};
	for (const ch of t) need[ch] = (need[ch] || 0) + 1;
	let required = Object.keys(need).length;
	let formed = 0;
	const window: Record<string, number> = {};
	let left = 0;
	let bestLen = Infinity;
	let bestLeft = 0;
	for (let right = 0; right < s.length; right++) {
		const ch = s[right];
		window[ch] = (window[ch] || 0) + 1;
		if (need[ch] !== undefined && window[ch] === need[ch]) formed++;
		while (formed === required) {
			if (right - left + 1 < bestLen) {
				bestLen = right - left + 1;
				bestLeft = left;
			}
			const leftCh = s[left];
			window[leftCh]--;
			if (need[leftCh] !== undefined && window[leftCh] < need[leftCh]) formed--;
			left++;
		}
	}
	return bestLen === Infinity ? "" : s.slice(bestLeft, bestLeft + bestLen);
}

export const minimumWindowSubstringHandler = (fn: any) => {
	try {
		const tests: Array<[string, string]> = [
			["ADOBECODEBANC", "ABC"],
			["a", "a"],
			["a", "aa"],
			["ab", "b"],
			["aa", "aa"],
			["bba", "ab"],
		];
		for (const [s, t] of tests) {
			const expected = referenceMinWindow(s, t);
			const result = fn(s, t);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minimumWindowSubstringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinimumWindowSubstringJS = `function minWindow(s, t) {
  // Write your code here
};`;

export const minimumWindowSubstring: Problem = {
	id: "minimum-window-substring",
	title: "50. Minimum Window Substring",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>t</code>, return the shortest substring of
    <code>s</code> such that every character of <code>t</code> (including repeats) appears in it.
  </p>
  <p class='mt-3'>If there is no such substring, return an empty string <code>""</code>.</p>
  <p class='mt-3'>If there are multiple valid windows of the same shortest length, returning any of them is accepted.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "ADOBECODEBANC", t = "ABC"`,
			outputText: `"BANC"`,
			explanation: "The substring \"BANC\" includes 'A', 'B', and 'C' from string t.",
		},
		{
			id: 1,
			inputText: `s = "a", t = "a"`,
			outputText: `"a"`,
		},
		{
			id: 2,
			inputText: `s = "a", t = "aa"`,
			outputText: `""`,
			explanation: "Both 'a's from t must be included, but s only has one 'a'.",
		},
	],
	constraints: `<li class='mt-2'><code>1 &lt;= s.length, t.length &lt;= 1000</code></li>
<li class='mt-2'><code>s</code> and <code>t</code> consist of English letters.</li>`,
	starterCode: starterCodeMinimumWindowSubstringJS,
	handlerFunction: minimumWindowSubstringHandler,
	starterFunctionName: "function minWindow(",
	order: 50,
};
