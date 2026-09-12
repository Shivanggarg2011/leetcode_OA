import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: expand around each center and count valid palindromes.
function referenceCountSubstrings(s: string): number {
	let count = 0;

	function expand(l: number, r: number) {
		while (l >= 0 && r < s.length && s[l] === s[r]) {
			count++;
			l--;
			r++;
		}
	}

	for (let i = 0; i < s.length; i++) {
		expand(i, i);
		expand(i, i + 1);
	}

	return count;
}

export const palindromicSubstringsHandler = (fn: any) => {
	try {
		const tests: string[] = ["abc", "aaa", "a", "aa", "abba", "racecar"];
		for (const s of tests) {
			const expected = referenceCountSubstrings(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from palindromicSubstringsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePalindromicSubstringsJS = `function countSubstrings(s) {
  // Write your code here
};`;

export const palindromicSubstrings: Problem = {
	id: "palindromic-substrings",
	title: "196. Palindromic Substrings",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, return the number of substrings of <code>s</code> that are
    palindromes (read the same forwards and backwards).
  </p>
  <p class='mt-3'>
    Substrings that occur at different starting or ending positions are counted separately, even if
    the resulting text is the same.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "abc"`,
			outputText: `3`,
			explanation: `"a", "b", "c" are the only palindromic substrings.`,
		},
		{
			id: 1,
			inputText: `s = "aaa"`,
			outputText: `6`,
			explanation: `"a", "a", "a", "aa", "aa", "aaa" — six palindromic substrings in total.`,
		},
		{
			id: 2,
			inputText: `s = "aa"`,
			outputText: `3`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 1000</code></li>
  <li class='mt-2'><code>s</code> consists of lowercase English letters.</li>`,
	starterCode: starterCodePalindromicSubstringsJS,
	handlerFunction: palindromicSubstringsHandler,
	starterFunctionName: "function countSubstrings(",
	order: 196,
};
