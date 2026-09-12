import assert from "assert";
import { Problem } from "../types/problem";

function referenceWordBreak(s: string, wordDict: string[]): boolean {
	const words = new Set(wordDict);
	const dp: boolean[] = new Array(s.length + 1).fill(false);
	dp[0] = true;
	for (let i = 1; i <= s.length; i++) {
		for (let j = 0; j < i; j++) {
			if (dp[j] && words.has(s.slice(j, i))) {
				dp[i] = true;
				break;
			}
		}
	}
	return dp[s.length];
}

export const wordBreakHandler = (fn: any) => {
	try {
		const tests: Array<[string, string[]]> = [
			["leetcode", ["leet", "code"]],
			["applepenapple", ["apple", "pen"]],
			["catsandog", ["cats", "dog", "sand", "and", "cat"]],
			["a", ["b"]],
			["aaaaaaa", ["aaaa", "aaa"]],
			["cars", ["car", "ca", "rs"]],
		];
		for (const [s, wordDict] of tests) {
			const expected = referenceWordBreak(s, wordDict);
			const result = fn(s, wordDict);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wordBreakHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWordBreakJS = `function wordBreak(s, wordDict) {
  // Write your code here
};`;

export const wordBreak: Problem = {
	id: "word-break",
	title: "201. Word Break",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code> and a list of strings <code>wordDict</code>, return
    <code>true</code> if <code>s</code> can be split into a sequence of one or more words from
    <code>wordDict</code> placed one after another (words may be reused any number of times).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `s = "leetcode", wordDict = ["leet","code"]`,
			outputText: `true`,
			explanation: "\"leetcode\" splits into \"leet\" and \"code\".",
		},
		{
			id: 1,
			inputText: `s = "applepenapple", wordDict = ["apple","pen"]`,
			outputText: `true`,
			explanation: "\"apple\" + \"pen\" + \"apple\", reusing words is allowed.",
		},
		{
			id: 2,
			inputText: `s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]`,
			outputText: `false`,
		},
	],
	constraints: `<li class='mt-2'><code>1 &lt;= s.length &lt;= 300</code></li>
<li class='mt-2'><code>1 &lt;= wordDict.length &lt;= 1000</code></li>
<li class='mt-2'>All strings consist of lowercase English letters.</li>`,
	starterCode: starterCodeWordBreakJS,
	handlerFunction: wordBreakHandler,
	starterFunctionName: "function wordBreak(",
	order: 201,
};
