import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: O(n) DP where dp[i] is the number of ways to decode s[i:].
function referenceNumDecodings(s: string): number {
	const n = s.length;
	if (n === 0) return 0;
	const dp = new Array(n + 1).fill(0);
	dp[n] = 1;
	dp[n - 1] = s[n - 1] === "0" ? 0 : 1;

	for (let i = n - 2; i >= 0; i--) {
		if (s[i] === "0") {
			dp[i] = 0;
			continue;
		}
		let ways = dp[i + 1];
		const twoDigit = parseInt(s.substring(i, i + 2), 10);
		if (twoDigit >= 10 && twoDigit <= 26) {
			ways += dp[i + 2];
		}
		dp[i] = ways;
	}

	return dp[0];
}

export const decodeWaysHandler = (fn: any) => {
	try {
		const tests: string[] = ["12", "226", "0", "06", "10", "2101", "100"];
		for (const s of tests) {
			const expected = referenceNumDecodings(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from decodeWaysHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDecodeWaysJS = `function numDecodings(s) {
  // Write your code here
};`;

export const decodeWays: Problem = {
	id: "decode-ways",
	title: "197. Decode Ways",
	problemStatement: `<p class='mt-3'>
    A message containing only uppercase letters <code>A-Z</code> can be encoded to digits using the
    mapping <code>'A' -> "1"</code>, <code>'B' -> "2"</code>, ..., <code>'Z' -> "26"</code>.
  </p>
  <p class='mt-3'>
    Given a string <code>s</code> containing only digits, return the number of ways it can be decoded
    into letters. A substring that is <code>"0"</code> by itself is never valid on its own — it must
    always be paired with the preceding digit to form <code>"10"</code> or <code>"20"</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `s = "12"`,
			outputText: `2`,
			explanation: `"12" can be decoded as "AB" (1, 2) or "L" (12).`,
		},
		{
			id: 1,
			inputText: `s = "226"`,
			outputText: `3`,
			explanation: `"226" can be decoded as "BZ" (2, 26), "VF" (22, 6), or "BBF" (2, 2, 6).`,
		},
		{
			id: 2,
			inputText: `s = "06"`,
			outputText: `0`,
			explanation: `"06" cannot be decoded since a leading zero is never valid.`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 100</code></li>
  <li class='mt-2'><code>s</code> consists of digit characters only.</li>`,
	starterCode: starterCodeDecodeWaysJS,
	handlerFunction: decodeWaysHandler,
	starterFunctionName: "function numDecodings(",
	order: 197,
};
