import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(s1: string, s2: string, s3: string): boolean {
	const m = s1.length;
	const n = s2.length;
	if (m + n !== s3.length) return false;
	const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
	dp[0][0] = true;
	for (let i = 0; i <= m; i++) {
		for (let j = 0; j <= n; j++) {
			if (i === 0 && j === 0) continue;
			let ok = false;
			if (i > 0 && dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ok = true;
			if (!ok && j > 0 && dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]) ok = true;
			dp[i][j] = ok;
		}
	}
	return dp[m][n];
}

export const interleavingStringHandler = (fn: any) => {
	try {
		const tests: [string, string, string][] = [
			["aabcc", "dbbca", "aadbbcbcac"],
			["aabcc", "dbbca", "aadbbbaccc"],
			["", "", ""],
			["a", "", "a"],
			["", "b", "b"],
			["abc", "def", "adbcef"],
		];
		for (const [s1, s2, s3] of tests) {
			const expected = referenceSolution(s1, s2, s3);
			const result = fn(s1, s2, s3);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from interleavingStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeInterleavingStringJS = `function isInterleave(s1, s2, s3) {
  // Write your code here
};`;

export const interleavingString: Problem = {
	id: "interleaving-string",
	title: "220. Interleaving String",
	problemStatement: `<p class='mt-3'>
    Given three strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, determine <em>if </em><code>s3</code><em> is formed by an interleaving of </em><code>s1</code><em> and </em><code>s2</code>.
  </p>
  <p class='mt-3'>
    An interleaving of two strings <code>s</code> and <code>t</code> is a configuration where they are divided into non-empty substrings such that the substrings are concatenated alternately from each string, preserving the original left-to-right order of characters in each of <code>s</code> and <code>t</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"`,
			outputText: `false`,
		},
		{
			id: 2,
			inputText: `s1 = "", s2 = "", s3 = ""`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= s1.length, s2.length <= 100</code></li>
  <li class='mt-2'><code>0 <= s3.length <= 200</code></li>
  <li class='mt-2'><code>s1</code>, <code>s2</code>, and <code>s3</code> consist of lowercase English letters.</li>`,
	starterCode: starterCodeInterleavingStringJS,
	handlerFunction: interleavingStringHandler,
	starterFunctionName: "function isInterleave(",
	order: 220,
};
