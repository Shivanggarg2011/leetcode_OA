import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(text1: string, text2: string): number {
	const m = text1.length;
	const n = text2.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (text1[i - 1] === text2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}
	return dp[m][n];
}

export const longestCommonSubsequenceHandler = (fn: any) => {
	try {
		const tests: [string, string][] = [
			["abcde", "ace"],
			["abc", "abc"],
			["abc", "def"],
			["", "abc"],
			["bsbininm", "jmjkbkjkv"],
			["abcba", "abcbcba"],
		];
		for (const [a, b] of tests) {
			const expected = referenceSolution(a, b);
			const result = fn(a, b);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestCommonSubsequenceHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestCommonSubsequenceJS = `function longestCommonSubsequence(text1, text2) {
  // Write your code here
};`;

export const longestCommonSubsequence: Problem = {
	id: "longest-common-subsequence",
	title: "215. Longest Common Subsequence",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>text1</code> and <code>text2</code>, return <em>the length of their longest common subsequence</em>. If there is no common subsequence, return <code>0</code>.
  </p>
  <p class='mt-3'>
    A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
  </p>
  <p class='mt-3'>
    A common subsequence of two strings is a subsequence that is common to both strings.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `text1 = "abcde", text2 = "ace"`,
			outputText: `3`,
			explanation: `The longest common subsequence is "ace" and its length is 3.`,
		},
		{
			id: 1,
			inputText: `text1 = "abc", text2 = "abc"`,
			outputText: `3`,
		},
		{
			id: 2,
			inputText: `text1 = "abc", text2 = "def"`,
			outputText: `0`,
			explanation: "There is no such common subsequence, so the result is 0.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= text1.length, text2.length <= 1000</code></li>
  <li class='mt-2'><code>text1</code> and <code>text2</code> consist of only lowercase English characters.</li>`,
	starterCode: starterCodeLongestCommonSubsequenceJS,
	handlerFunction: longestCommonSubsequenceHandler,
	starterFunctionName: "function longestCommonSubsequence(",
	order: 215,
};
