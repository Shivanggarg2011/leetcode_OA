import assert from "assert";
import { Problem } from "../types/problem";

export const longestSubstringWithoutRepeatingCharactersHandler = (fn: any) => {
	try {
		function referenceSolution(s: string): number {
			const lastSeen = new Map<string, number>();
			let start = 0;
			let best = 0;
			for (let end = 0; end < s.length; end++) {
				const c = s[end];
				if (lastSeen.has(c) && lastSeen.get(c)! >= start) {
					start = lastSeen.get(c)! + 1;
				}
				lastSeen.set(c, end);
				best = Math.max(best, end - start + 1);
			}
			return best;
		}

		const tests = ["abcabcbb", "bbbbb", "pwwkew", "", " ", "dvdf"];

		for (const s of tests) {
			const expected = referenceSolution(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestSubstringWithoutRepeatingCharactersHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestSubstringWithoutRepeatingCharactersJS = `function lengthOfLongestSubstring(s) {
  // Write your code here
};`;

export const longestSubstringWithoutRepeatingCharacters: Problem = {
	id: "longest-substring-without-repeating-characters",
	title: "47. Longest Substring Without Repeating Characters",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, find the length of the longest substring that does not contain any
    repeated characters.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "abcabcbb"`,
			outputText: "3",
			explanation: `The longest substring without repeats is "abc", which has length 3.`,
		},
		{
			id: 1,
			inputText: `s = "bbbbb"`,
			outputText: "1",
			explanation: `The longest substring without repeats is "b", which has length 1.`,
		},
		{
			id: 2,
			inputText: `s = "pwwkew"`,
			outputText: "3",
			explanation: `The longest substring without repeats is "wke", which has length 3. Note that "pwke" is a subsequence, not a substring.`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= s.length <= 5 * 10^4</code></li>
  <li class='mt-2'><code>s</code> consists of English letters, digits, symbols, and spaces.</li>`,
	starterCode: starterCodeLongestSubstringWithoutRepeatingCharactersJS,
	handlerFunction: longestSubstringWithoutRepeatingCharactersHandler,
	starterFunctionName: "function lengthOfLongestSubstring(",
	order: 47,
};
