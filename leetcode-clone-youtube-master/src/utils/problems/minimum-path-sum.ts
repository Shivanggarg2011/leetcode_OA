import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(grid: number[][]): number {
	const m = grid.length;
	const n = grid[0].length;
	const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (i === 0 && j === 0) {
				dp[i][j] = grid[i][j];
			} else if (i === 0) {
				dp[i][j] = dp[i][j - 1] + grid[i][j];
			} else if (j === 0) {
				dp[i][j] = dp[i - 1][j] + grid[i][j];
			} else {
				dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
			}
		}
	}
	return dp[m - 1][n - 1];
}

export const minimumPathSumHandler = (fn: any) => {
	try {
		const tests = [
			[
				[1, 3, 1],
				[1, 5, 1],
				[4, 2, 1],
			],
			[
				[1, 2, 3],
				[4, 5, 6],
			],
			[[5]],
			[[1, 2], [1, 1]],
		];
		for (const grid of tests) {
			const expected = referenceSolution(grid);
			const result = fn(grid);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minimumPathSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinimumPathSumJS = `function minPathSum(grid) {
  // Write your code here
};`;

export const minimumPathSum: Problem = {
	id: "minimum-path-sum",
	title: "214. Minimum Path Sum",
	problemStatement: `<p class='mt-3'>
    Given an <code>m x n</code> grid filled with non-negative numbers, find a path from the top-left corner to the bottom-right corner which minimizes the sum of all numbers along its path.
  </p>
  <p class='mt-3'>
    You may only move either down or right at any point in time.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `grid = [[1,3,1],[1,5,1],[4,2,1]]`,
			outputText: `7`,
			explanation: "The path 1 -> 3 -> 1 -> 1 -> 1 minimizes the sum.",
		},
		{
			id: 1,
			inputText: `grid = [[1,2,3],[4,5,6]]`,
			outputText: `12`,
		},
	],
	constraints: `<li class='mt-2'><code>m == grid.length</code></li>
  <li class='mt-2'><code>n == grid[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 200</code></li>
  <li class='mt-2'><code>0 <= grid[i][j] <= 100</code></li>`,
	starterCode: starterCodeMinimumPathSumJS,
	handlerFunction: minimumPathSumHandler,
	starterFunctionName: "function minPathSum(",
	order: 214,
};
