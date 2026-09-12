import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(n: number): number {
	const dp: number[] = new Array(n + 1).fill(0);
	dp[1] = 1;
	for (let i = 2; i <= n; i++) {
		for (let j = 1; j < i; j++) {
			dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
		}
	}
	return dp[n];
}

export const integerBreakHandler = (fn: any) => {
	try {
		const tests = [2, 3, 4, 8, 10, 5];
		for (const n of tests) {
			const expected = referenceSolution(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from integerBreakHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeIntegerBreakJS = `function integerBreak(n) {
  // Write your code here
};`;

export const integerBreak: Problem = {
	id: "integer-break",
	title: "206. Integer Break",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>n</code>, break it into the sum of <strong>at least two</strong> positive integers and maximize the product of those integers.
  </p>
  <p class='mt-3'>
    Return <em>the maximum product you can achieve</em>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 2`,
			outputText: `1`,
			explanation: "2 = 1 + 1, so the maximum product is 1 * 1 = 1.",
		},
		{
			id: 1,
			inputText: `n = 10`,
			outputText: `36`,
			explanation: "10 = 3 + 3 + 4, so the maximum product is 3 * 3 * 4 = 36.",
		},
		{
			id: 2,
			inputText: `n = 8`,
			outputText: `18`,
			explanation: "8 = 2 + 3 + 3, so the maximum product is 2 * 3 * 3 = 18.",
		},
	],
	constraints: `<li class='mt-2'><code>2 <= n <= 58</code></li>`,
	starterCode: starterCodeIntegerBreakJS,
	handlerFunction: integerBreakHandler,
	starterFunctionName: "function integerBreak(",
	order: 206,
};
