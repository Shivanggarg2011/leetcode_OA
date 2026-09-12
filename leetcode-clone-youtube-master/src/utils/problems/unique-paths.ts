import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(m: number, n: number): number {
	const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(1));
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
		}
	}
	return dp[m - 1][n - 1];
}

export const uniquePathsHandler = (fn: any) => {
	try {
		const tests: [number, number][] = [
			[3, 7],
			[3, 2],
			[1, 1],
			[7, 3],
			[3, 3],
		];
		for (const [m, n] of tests) {
			const expected = referenceSolution(m, n);
			const result = fn(m, n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from uniquePathsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeUniquePathsJS = `function uniquePaths(m, n) {
  // Write your code here
};`;

export const uniquePaths: Problem = {
	id: "unique-paths",
	title: "212. Unique Paths",
	problemStatement: `<p class='mt-3'>
    A robot is located at the top-left corner of an <code>m x n</code> grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid.
  </p>
  <p class='mt-3'>
    Given the two integers <code>m</code> and <code>n</code>, return <em>the number of possible unique paths that the robot can take to reach the bottom-right corner</em>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `m = 3, n = 7`,
			outputText: `28`,
		},
		{
			id: 1,
			inputText: `m = 3, n = 2`,
			outputText: `3`,
			explanation:
				"From the top-left corner, there are a total of 3 ways to reach the bottom-right corner: Right -> Down -> Down, Down -> Down -> Right, Down -> Right -> Down.",
		},
		{
			id: 2,
			inputText: `m = 1, n = 1`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= m, n <= 100</code></li>`,
	starterCode: starterCodeUniquePathsJS,
	handlerFunction: uniquePathsHandler,
	starterFunctionName: "function uniquePaths(",
	order: 212,
};
