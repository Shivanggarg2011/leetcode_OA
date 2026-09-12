import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: fixed-size sliding window with character frequency counts
function referenceFindAnagrams(s: string, p: string): number[] {
	const result: number[] = [];
	if (p.length > s.length) return result;

	const need = new Array(26).fill(0);
	const window = new Array(26).fill(0);
	const base = "a".charCodeAt(0);

	for (const ch of p) need[ch.charCodeAt(0) - base]++;

	for (let i = 0; i < s.length; i++) {
		window[s.charCodeAt(i) - base]++;
		if (i >= p.length) {
			window[s.charCodeAt(i - p.length) - base]--;
		}
		if (i >= p.length - 1) {
			let matches = true;
			for (let j = 0; j < 26; j++) {
				if (window[j] !== need[j]) {
					matches = false;
					break;
				}
			}
			if (matches) result.push(i - p.length + 1);
		}
	}
	return result;
}

export const findAllAnagramsInAStringHandler = (fn: any) => {
	try {
		const tests: [string, string][] = [
			["cbaebabacd", "abc"],
			["abab", "ab"],
			["af", "be"],
			["a", "a"],
			["abc", "d"],
			["baa", "aa"],
		];
		for (const [s, p] of tests) {
			const expected = referenceFindAnagrams(s, p);
			const result = fn(s, p);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from findAllAnagramsInAStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFindAllAnagramsInAStringJS = `function findAnagrams(s, p) {
  // Write your code here
};`;

export const findAllAnagramsInAString: Problem = {
	id: "find-all-anagrams-in-a-string",
	title: "55. Find All Anagrams in a String",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>p</code>, return an array of all the start indices of
    <code>p</code>'s anagrams in <code>s</code>. You may return the answer in <strong>any order</strong>.
  </p>
  <p class='mt-3'>
    An anagram is a rearrangement of the letters of a string that uses every letter exactly once.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "cbaebabacd", p = "abc"`,
			outputText: "[0,6]",
			explanation: `The substring starting at index 0 is "cba" and at index 6 is "bac", both anagrams of "abc".`,
		},
		{
			id: 1,
			inputText: `s = "abab", p = "ab"`,
			outputText: "[0,1,2]",
		},
		{
			id: 2,
			inputText: `s = "af", p = "be"`,
			outputText: "[]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length, p.length <= 3 * 10^4</code></li>
<li class='mt-2'><code>s</code> and <code>p</code> consist of lowercase English letters</li>`,
	starterCode: starterCodeFindAllAnagramsInAStringJS,
	handlerFunction: findAllAnagramsInAStringHandler,
	starterFunctionName: "function findAnagrams(",
	order: 55,
};
