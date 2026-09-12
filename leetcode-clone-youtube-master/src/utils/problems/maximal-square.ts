import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(matrix: string[][]): number {
	const m = matrix.length;
	const n = matrix[0].length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
	let best = 0;
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (matrix[i - 1][j - 1] === "1") {
				dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
				best = Math.max(best, dp[i][j]);
			}
		}
	}
	return best * best;
}

export const maximalSquareHandler = (fn: any) => {
	try {
		const tests = [
			[
				["1", "0", "1", "0", "0"],
				["1", "0", "1", "1", "1"],
				["1", "1", "1", "1", "1"],
				["1", "0", "0", "1", "0"],
			],
			[
				["0", "1"],
				["1", "0"],
			],
			[["0"]],
			[
				["1", "1"],
				["1", "1"],
			],
		];
		for (const matrix of tests) {
			const expected = referenceSolution(matrix);
			const result = fn(matrix);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maximalSquareHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaximalSquareJS = `function maximalSquare(matrix) {
  // Write your code here
};`;

export const maximalSquare: Problem = {
	id: "maximal-square",
	title: "223. Maximal Square",
	problemStatement: `<p class='mt-3'>
    Given an <code>m x n</code> binary matrix filled with <code>'0'</code>s and <code>'1'</code>s, find the largest square containing only <code>'1'</code>s, and return <em>its area</em>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]`,
			outputText: `4`,
			explanation: "The largest square of 1's has side length 2, so its area is 4.",
		},
		{
			id: 1,
			inputText: `matrix = [["0","1"],["1","0"]]`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `matrix = [["0"]]`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 300</code></li>
  <li class='mt-2'><code>matrix[i][j]</code> is <code>'0'</code> or <code>'1'</code>.</li>`,
	starterCode: starterCodeMaximalSquareJS,
	handlerFunction: maximalSquareHandler,
	starterFunctionName: "function maximalSquare(",
	order: 223,
};
