import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(s: string, p: string): boolean {
	const m = s.length;
	const n = p.length;
	const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
	dp[0][0] = true;
	for (let j = 1; j <= n; j++) {
		if (p[j - 1] === "*") {
			dp[0][j] = dp[0][j - 2];
		}
	}
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (p[j - 1] === "*") {
				dp[i][j] = dp[i][j - 2];
				const prevChar = p[j - 2];
				if (prevChar === "." || prevChar === s[i - 1]) {
					dp[i][j] = dp[i][j] || dp[i - 1][j];
				}
			} else if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = false;
			}
		}
	}
	return dp[m][n];
}

export const regularExpressionMatchingHandler = (fn: any) => {
	try {
		const tests: [string, string][] = [
			["aa", "a"],
			["aa", "a*"],
			["ab", ".*"],
			["aab", "c*a*b"],
			["mississippi", "mis*is*p*."],
			["", "a*"],
		];
		for (const [s, p] of tests) {
			const expected = referenceSolution(s, p);
			const result = fn(s, p);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from regularExpressionMatchingHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRegularExpressionMatchingJS = `function isMatch(s, p) {
  // Write your code here
};`;

export const regularExpressionMatching: Problem = {
	id: "regular-expression-matching",
	title: "224. Regular Expression Matching",
	problemStatement: `<p class='mt-3'>
    Given an input string <code>s</code> and a pattern <code>p</code>, implement regular expression matching that supports <code>'.'</code> and <code>'*'</code> where:
  </p>
  <p class='mt-3'>
    <code>'.'</code> matches any single character, and <code>'*'</code> matches zero or more of the preceding element.
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
			inputText: `s = "aa", p = "a*"`,
			outputText: `true`,
			explanation: `'*' means zero or more of the preceding element 'a', so "a*" can match "aa".`,
		},
		{
			id: 2,
			inputText: `s = "ab", p = ".*"`,
			outputText: `true`,
			explanation: `".*" means "zero or more (*) of any character (.)", which matches "ab".`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 20</code></li>
  <li class='mt-2'><code>1 <= p.length <= 20</code></li>
  <li class='mt-2'><code>s</code> contains only lowercase English letters.</li>
  <li class='mt-2'><code>p</code> contains only lowercase English letters, <code>'.'</code>, and <code>'*'</code>.</li>
  <li class='mt-2'>It is guaranteed for each appearance of the character <code>'*'</code>, there will be a previous valid character to match.</li>`,
	starterCode: starterCodeRegularExpressionMatchingJS,
	handlerFunction: regularExpressionMatchingHandler,
	starterFunctionName: "function isMatch(",
	order: 224,
};
