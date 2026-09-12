import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: sliding window with a character frequency map
function referenceLengthOfLongestSubstringKDistinct(s: string, k: number): number {
	if (k === 0) return 0;
	const count = new Map<string, number>();
	let left = 0;
	let best = 0;
	for (let right = 0; right < s.length; right++) {
		const ch = s[right];
		count.set(ch, (count.get(ch) || 0) + 1);
		while (count.size > k) {
			const leftCh = s[left];
			count.set(leftCh, count.get(leftCh)! - 1);
			if (count.get(leftCh) === 0) count.delete(leftCh);
			left++;
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
}

export const longestSubstringWithAtMostKDistinctCharactersHandler = (fn: any) => {
	try {
		const tests: [string, number][] = [
			["eceba", 2],
			["aa", 1],
			["a", 0],
			["abcabcabc", 2],
			["", 2],
			["abaccc", 3],
		];
		for (const [s, k] of tests) {
			const expected = referenceLengthOfLongestSubstringKDistinct(s, k);
			const result = fn(s, k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestSubstringWithAtMostKDistinctCharactersHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestSubstringWithAtMostKDistinctCharactersJS = `function lengthOfLongestSubstringKDistinct(s, k) {
  // Write your code here
};`;

export const longestSubstringWithAtMostKDistinctCharacters: Problem = {
	id: "longest-substring-with-at-most-k-distinct-characters",
	title: "57. Longest Substring with At Most K Distinct Characters",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code> and an integer <code>k</code>, return the length of the longest
    substring of <code>s</code> that contains <strong>at most <code>k</code> distinct characters</strong>.
  </p>
  <p class='mt-3'>
    If <code>k</code> is <code>0</code>, no non-empty substring qualifies, so the answer is <code>0</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "eceba", k = 2`,
			outputText: "3",
			explanation: `The substring "ece" has length 3 with 2 distinct characters.`,
		},
		{
			id: 1,
			inputText: `s = "aa", k = 1`,
			outputText: "2",
		},
		{
			id: 2,
			inputText: `s = "abcabcabc", k = 2`,
			outputText: "2",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= s.length <= 10^5</code></li>
<li class='mt-2'><code>0 <= k <= 50</code></li>
<li class='mt-2'><code>s</code> consists of English letters</li>`,
	starterCode: starterCodeLongestSubstringWithAtMostKDistinctCharactersJS,
	handlerFunction: longestSubstringWithAtMostKDistinctCharactersHandler,
	starterFunctionName: "function lengthOfLongestSubstringKDistinct(",
	order: 57,
};
