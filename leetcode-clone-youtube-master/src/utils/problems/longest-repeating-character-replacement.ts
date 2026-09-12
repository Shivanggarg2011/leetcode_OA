import assert from "assert";
import { Problem } from "../types/problem";

export const longestRepeatingCharacterReplacementHandler = (fn: any) => {
	try {
		function referenceSolution(s: string, k: number): number {
			const counts: Record<string, number> = {};
			let start = 0;
			let maxCount = 0;
			let best = 0;
			for (let end = 0; end < s.length; end++) {
				const c = s[end];
				counts[c] = (counts[c] || 0) + 1;
				maxCount = Math.max(maxCount, counts[c]);
				while (end - start + 1 - maxCount > k) {
					counts[s[start]]--;
					start++;
				}
				best = Math.max(best, end - start + 1);
			}
			return best;
		}

		const tests: [string, number][] = [
			["ABAB", 2],
			["AABABBA", 1],
			["AAAA", 2],
			["ABCDE", 1],
			["A", 0],
		];

		for (const [s, k] of tests) {
			const expected = referenceSolution(s, k);
			const result = fn(s, k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestRepeatingCharacterReplacementHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestRepeatingCharacterReplacementJS = `function characterReplacement(s, k) {
  // Write your code here
};`;

export const longestRepeatingCharacterReplacement: Problem = {
	id: "longest-repeating-character-replacement",
	title: "48. Longest Repeating Character Replacement",
	problemStatement: `<p class='mt-3'>
    You are given a string <code>s</code> consisting of uppercase English letters, and an integer
    <code>k</code>. You may change up to <code>k</code> characters of <code>s</code> to any other
    uppercase English letter, any number of times.
  </p>
  <p class='mt-3'>
    Return the length of the longest substring you can obtain that contains only a single repeating
    letter after performing at most <code>k</code> such changes.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "ABAB", k = 2`,
			outputText: "4",
			explanation: `Replace the two 'A's with 'B's (or vice versa) to get "BBBB" or "AAAA".`,
		},
		{
			id: 1,
			inputText: `s = "AABABBA", k = 1`,
			outputText: "4",
			explanation: `Replace one 'A' in the middle to get "AABBBBA", whose longest repeating substring is "BBBB".`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10^5</code></li>
  <li class='mt-2'><code>s</code> consists of only uppercase English letters.</li>
  <li class='mt-2'><code>0 <= k <= s.length</code></li>`,
	starterCode: starterCodeLongestRepeatingCharacterReplacementJS,
	handlerFunction: longestRepeatingCharacterReplacementHandler,
	starterFunctionName: "function characterReplacement(",
	order: 48,
};
