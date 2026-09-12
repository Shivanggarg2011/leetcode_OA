import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: sliding window with a character frequency map
function referenceLengthOfLongestSubstringTwoDistinct(s: string): number {
	const count = new Map<string, number>();
	let left = 0;
	let best = 0;
	for (let right = 0; right < s.length; right++) {
		const ch = s[right];
		count.set(ch, (count.get(ch) || 0) + 1);
		while (count.size > 2) {
			const leftCh = s[left];
			count.set(leftCh, count.get(leftCh)! - 1);
			if (count.get(leftCh) === 0) count.delete(leftCh);
			left++;
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
}

export const longestSubstringWithAtMostTwoDistinctCharactersHandler = (fn: any) => {
	try {
		const tests: string[] = ["eceba", "ccaabbb", "a", "", "abaccc", "abcabcabc"];
		for (const s of tests) {
			const expected = referenceLengthOfLongestSubstringTwoDistinct(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestSubstringWithAtMostTwoDistinctCharactersHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestSubstringWithAtMostTwoDistinctCharactersJS = `function lengthOfLongestSubstringTwoDistinct(s) {
  // Write your code here
};`;

export const longestSubstringWithAtMostTwoDistinctCharacters: Problem = {
	id: "longest-substring-with-at-most-two-distinct-characters",
	title: "56. Longest Substring with At Most Two Distinct Characters",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, return the length of the longest substring that contains
    <strong>at most two distinct characters</strong>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "eceba"`,
			outputText: "3",
			explanation: `The substring "ece" has length 3 with characters 'e' and 'c'.`,
		},
		{
			id: 1,
			inputText: `s = "ccaabbb"`,
			outputText: "5",
			explanation: `The substring "aabbb" has length 5 with characters 'a' and 'b'.`,
		},
		{
			id: 2,
			inputText: `s = "a"`,
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 10^5</code></li>
<li class='mt-2'><code>s</code> consists of English letters</li>`,
	starterCode: starterCodeLongestSubstringWithAtMostTwoDistinctCharactersJS,
	handlerFunction: longestSubstringWithAtMostTwoDistinctCharactersHandler,
	starterFunctionName: "function lengthOfLongestSubstringTwoDistinct(",
	order: 56,
};
