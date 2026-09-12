import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(n: number): number {
	const MOD = 1000000007;
	if (n === 1) return 1;
	if (n === 2) return 2;
	const dp: number[] = new Array(n + 1).fill(0);
	dp[0] = 1;
	dp[1] = 1;
	dp[2] = 2;
	for (let i = 3; i <= n; i++) {
		dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
	}
	return dp[n];
}

export const dominoAndTrominoTilingHandler = (fn: any) => {
	try {
		const tests = [1, 2, 3, 4, 5, 30];
		for (const n of tests) {
			const expected = referenceSolution(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from dominoAndTrominoTilingHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDominoAndTrominoTilingJS = `function numTilings(n) {
  // Write your code here
};`;

export const dominoAndTrominoTiling: Problem = {
	id: "domino-and-tromino-tiling",
	title: "208. Domino and Tromino Tiling",
	problemStatement: `<p class='mt-3'>
    You have two types of tiles: a <code>2 x 1</code> domino and an "L" shaped tromino that covers three cells. Both shapes may be rotated.
  </p>
  <p class='mt-3'>
    Given an integer <code>n</code>, return <em>the number of ways to tile a </em><code>2 x n</code><em> board</em> using any number of the two types of tiles. Since the answer may be very large, return it <strong>modulo</strong> <code>10^9 + 7</code>.
  </p>
  <p class='mt-3'>
    In a tiling, every square must be covered exactly once. Two tilings are different if and only if there exist two 4-directionally adjacent cells covered by two different tiles in one tiling but by the same tile in the other.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 3`,
			outputText: `5`,
			explanation: "There are 5 ways to tile a 2 x 3 board.",
		},
		{
			id: 1,
			inputText: `n = 1`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `n = 2`,
			outputText: `2`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 1000</code></li>`,
	starterCode: starterCodeDominoAndTrominoTilingJS,
	handlerFunction: dominoAndTrominoTilingHandler,
	starterFunctionName: "function numTilings(",
	order: 208,
};
