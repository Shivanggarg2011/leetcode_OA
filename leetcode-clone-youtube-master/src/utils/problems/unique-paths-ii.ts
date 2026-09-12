import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(obstacleGrid: number[][]): number {
	const m = obstacleGrid.length;
	const n = obstacleGrid[0].length;
	const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (obstacleGrid[i][j] === 1) {
				dp[i][j] = 0;
				continue;
			}
			if (i === 0 && j === 0) {
				dp[i][j] = 1;
				continue;
			}
			const fromTop = i > 0 ? dp[i - 1][j] : 0;
			const fromLeft = j > 0 ? dp[i][j - 1] : 0;
			dp[i][j] = fromTop + fromLeft;
		}
	}
	return dp[m - 1][n - 1];
}

export const uniquePathsIiHandler = (fn: any) => {
	try {
		const tests = [
			[
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			],
			[
				[0, 1],
				[0, 0],
			],
			[[0, 0]],
			[[1]],
			[[0], [0], [0]],
		];
		for (const grid of tests) {
			const expected = referenceSolution(grid);
			const result = fn(grid);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from uniquePathsIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeUniquePathsIiJS = `function uniquePathsWithObstacles(obstacleGrid) {
  // Write your code here
};`;

export const uniquePathsIi: Problem = {
	id: "unique-paths-ii",
	title: "213. Unique Paths II",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> integer grid <code>obstacleGrid</code> representing a grid where a robot starts at the top-left corner and wants to reach the bottom-right corner. The robot can only move down or right at any point in time.
  </p>
  <p class='mt-3'>
    Some cells contain obstacles, marked as <code>1</code> in the grid, while free cells are marked as <code>0</code>. The robot cannot step onto a cell containing an obstacle.
  </p>
  <p class='mt-3'>
    Return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]`,
			outputText: `2`,
			explanation: "There is one obstacle in the middle of the 3x3 grid, leaving 2 unique paths.",
		},
		{
			id: 1,
			inputText: `obstacleGrid = [[0,1],[0,0]]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>m == obstacleGrid.length</code></li>
  <li class='mt-2'><code>n == obstacleGrid[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 100</code></li>
  <li class='mt-2'><code>obstacleGrid[i][j]</code> is <code>0</code> or <code>1</code>.</li>`,
	starterCode: starterCodeUniquePathsIiJS,
	handlerFunction: uniquePathsIiHandler,
	starterFunctionName: "function uniquePathsWithObstacles(",
	order: 213,
};
