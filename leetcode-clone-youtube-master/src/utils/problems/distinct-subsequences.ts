import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(s: string, t: string): number {
	const m = s.length;
	const n = t.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
	for (let i = 0; i <= m; i++) dp[i][0] = 1;
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			dp[i][j] = dp[i - 1][j];
			if (s[i - 1] === t[j - 1]) {
				dp[i][j] += dp[i - 1][j - 1];
			}
		}
	}
	return dp[m][n];
}

export const distinctSubsequencesHandler = (fn: any) => {
	try {
		const tests: [string, string][] = [
			["rabbbit", "rabbit"],
			["babgbag", "bag"],
			["abc", "abc"],
			["abc", "d"],
			["", ""],
			["aaaa", "aa"],
		];
		for (const [s, t] of tests) {
			const expected = referenceSolution(s, t);
			const result = fn(s, t);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from distinctSubsequencesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDistinctSubsequencesJS = `function numDistinct(s, t) {
  // Write your code here
};`;

export const distinctSubsequences: Problem = {
	id: "distinct-subsequences",
	title: "221. Distinct Subsequences",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>s</code> and <code>t</code>, return <em>the number of distinct subsequences of </em><code>s</code><em> which equal </em><code>t</code>.
  </p>
  <p class='mt-3'>
    A subsequence of a string is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "rabbbit", t = "rabbit"`,
			outputText: `3`,
			explanation:
				"There are 3 ways you can generate 'rabbit' from 'rabbbit' by choosing which of the three 'b's to keep.",
		},
		{
			id: 1,
			inputText: `s = "babgbag", t = "bag"`,
			outputText: `5`,
		},
		{
			id: 2,
			inputText: `s = "abc", t = "d"`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length, t.length <= 1000</code></li>
  <li class='mt-2'><code>s</code> and <code>t</code> consist of English letters.</li>`,
	starterCode: starterCodeDistinctSubsequencesJS,
	handlerFunction: distinctSubsequencesHandler,
	starterFunctionName: "function numDistinct(",
	order: 221,
};
