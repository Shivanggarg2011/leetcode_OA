import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(s: string, p: string): boolean {
	const m = s.length;
	const n = p.length;
	const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
	dp[0][0] = true;
	for (let j = 1; j <= n; j++) {
		if (p[j - 1] === "*") {
			dp[0][j] = dp[0][j - 1];
		}
	}
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (p[j - 1] === "*") {
				dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
			} else if (p[j - 1] === "?" || p[j - 1] === s[i - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = false;
			}
		}
	}
	return dp[m][n];
}

export const wildcardMatchingHandler = (fn: any) => {
	try {
		const tests: [string, string][] = [
			["aa", "a"],
			["aa", "*"],
			["cb", "?a"],
			["adceb", "*a*b"],
			["acdcb", "a*c?b"],
			["", "*"],
		];
		for (const [s, p] of tests) {
			const expected = referenceSolution(s, p);
			const result = fn(s, p);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wildcardMatchingHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWildcardMatchingJS = `function isMatch(s, p) {
  // Write your code here
};`;

export const wildcardMatching: Problem = {
	id: "wildcard-matching",
	title: "225. Wildcard Matching",
	problemStatement: `<p class='mt-3'>
    Given an input string <code>s</code> and a pattern <code>p</code>, implement wildcard pattern matching that supports <code>'?'</code> and <code>'*'</code> where:
  </p>
  <p class='mt-3'>
    <code>'?'</code> matches any single character, and <code>'*'</code> matches any sequence of characters (including the empty sequence).
  </p>
  <p class='mt-3'>
    The matching should cover the <strong>entire</strong> input string (not partial).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "aa", p = "a"`,
			outputText: `false`,
			explanation: `"a" does not match the entire string "aa".`,
		},
		{
			id: 1,
			inputText: `s = "aa", p = "*"`,
			outputText: `true`,
			explanation: `'*' matches any sequence of characters, including the empty sequence and "aa".`,
		},
		{
			id: 2,
			inputText: `s = "cb", p = "?a"`,
			outputText: `false`,
			explanation: `'?' matches 'c', but the second letter 'a' does not match 'b'.`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= s.length, p.length <= 2000</code></li>
  <li class='mt-2'><code>s</code> contains only lowercase English letters.</li>
  <li class='mt-2'><code>p</code> contains only lowercase English letters, <code>'?'</code>, or <code>'*'</code>.</li>`,
	starterCode: starterCodeWildcardMatchingJS,
	handlerFunction: wildcardMatchingHandler,
	starterFunctionName: "function isMatch(",
	order: 225,
};
