import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(n: number): number {
	const dp: number[] = new Array(n + 1).fill(Infinity);
	dp[0] = 0;
	for (let i = 1; i <= n; i++) {
		for (let sq = 1; sq * sq <= i; sq++) {
			dp[i] = Math.min(dp[i], dp[i - sq * sq] + 1);
		}
	}
	return dp[n];
}

export const perfectSquaresHandler = (fn: any) => {
	try {
		const tests = [1, 12, 13, 4, 26, 100];
		for (const n of tests) {
			const expected = referenceSolution(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from perfectSquaresHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePerfectSquaresJS = `function numSquares(n) {
  // Write your code here
};`;

export const perfectSquares: Problem = {
	id: "perfect-squares",
	title: "205. Perfect Squares",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>n</code>, return <em>the fewest number of perfect square numbers that sum up to</em> <code>n</code>.
  </p>
  <p class='mt-3'>
    A perfect square is an integer that is the square of another integer, for example <code>1</code>, <code>4</code>, <code>9</code>, and <code>16</code> are perfect squares while <code>3</code> and <code>11</code> are not.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 12`,
			outputText: `3`,
			explanation: "12 = 4 + 4 + 4.",
		},
		{
			id: 1,
			inputText: `n = 13`,
			outputText: `2`,
			explanation: "13 = 4 + 9.",
		},
		{
			id: 2,
			inputText: `n = 1`,
			outputText: `1`,
			explanation: "1 = 1.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 10^4</code></li>`,
	starterCode: starterCodePerfectSquaresJS,
	handlerFunction: perfectSquaresHandler,
	starterFunctionName: "function numSquares(",
	order: 205,
};
