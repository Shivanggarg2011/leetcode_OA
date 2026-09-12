import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(word1: string, word2: string): number {
	const m = word1.length;
	const n = word2.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
	for (let i = 0; i <= m; i++) dp[i][0] = i;
	for (let j = 0; j <= n; j++) dp[0][j] = j;
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (word1[i - 1] === word2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}
	return dp[m][n];
}

export const editDistanceHandler = (fn: any) => {
	try {
		const tests: [string, string][] = [
			["horse", "ros"],
			["intention", "execution"],
			["", ""],
			["abc", ""],
			["", "abc"],
			["abc", "abc"],
		];
		for (const [w1, w2] of tests) {
			const expected = referenceSolution(w1, w2);
			const result = fn(w1, w2);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from editDistanceHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeEditDistanceJS = `function minDistance(word1, word2) {
  // Write your code here
};`;

export const editDistance: Problem = {
	id: "edit-distance",
	title: "219. Edit Distance",
	problemStatement: `<p class='mt-3'>
    Given two strings <code>word1</code> and <code>word2</code>, return <em>the minimum number of operations required to convert </em><code>word1</code><em> to </em><code>word2</code>.
  </p>
  <p class='mt-3'>
    You have the following three operations permitted on a word: insert a character, delete a character, or replace a character.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `word1 = "horse", word2 = "ros"`,
			outputText: `3`,
			explanation:
				"horse -> rorse (replace 'h' with 'r'), rorse -> rose (remove 'r'), rose -> ros (remove 'e').",
		},
		{
			id: 1,
			inputText: `word1 = "intention", word2 = "execution"`,
			outputText: `5`,
		},
		{
			id: 2,
			inputText: `word1 = "abc", word2 = "abc"`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= word1.length, word2.length <= 500</code></li>
  <li class='mt-2'><code>word1</code> and <code>word2</code> consist of lowercase English letters.</li>`,
	starterCode: starterCodeEditDistanceJS,
	handlerFunction: editDistanceHandler,
	starterFunctionName: "function minDistance(",
	order: 219,
};
