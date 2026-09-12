import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(matrix: number[][]): number {
	if (matrix.length === 0 || matrix[0].length === 0) return 0;
	const m = matrix.length;
	const n = matrix[0].length;
	const memo: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
	const dirs = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];

	function dfs(r: number, c: number): number {
		if (memo[r][c] !== 0) return memo[r][c];
		let best = 1;
		for (const [dr, dc] of dirs) {
			const nr = r + dr;
			const nc = c + dc;
			if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
				best = Math.max(best, 1 + dfs(nr, nc));
			}
		}
		memo[r][c] = best;
		return best;
	}

	let result = 0;
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			result = Math.max(result, dfs(r, c));
		}
	}
	return result;
}

export const longestIncreasingPathInAMatrixHandler = (fn: any) => {
	try {
		const tests = [
			[
				[9, 9, 4],
				[6, 6, 8],
				[2, 1, 1],
			],
			[
				[3, 4, 5],
				[3, 2, 6],
				[2, 2, 1],
			],
			[[1]],
			[
				[7, 8, 9],
				[9, 7, 6],
				[7, 2, 3],
			],
		];
		for (const matrix of tests) {
			const expected = referenceSolution(matrix);
			const result = fn(matrix);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestIncreasingPathInAMatrixHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestIncreasingPathInAMatrixJS = `function longestIncreasingPath(matrix) {
  // Write your code here
};`;

export const longestIncreasingPathInAMatrix: Problem = {
	id: "longest-increasing-path-in-a-matrix",
	title: "222. Longest Increasing Path in a Matrix",
	problemStatement: `<p class='mt-3'>
    Given an <code>m x n</code> integer matrix, return <em>the length of the longest strictly increasing path</em>.
  </p>
  <p class='mt-3'>
    From each cell, you may move in any of the four cardinal directions: up, down, left, or right. You may not move diagonally or move outside the boundary of the matrix.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `matrix = [[9,9,4],[6,6,8],[2,1,1]]`,
			outputText: `4`,
			explanation: "The longest increasing path is [1, 2, 6, 9].",
		},
		{
			id: 1,
			inputText: `matrix = [[3,4,5],[3,2,6],[2,2,1]]`,
			outputText: `4`,
			explanation: "The longest increasing path is [3, 4, 5, 6].",
		},
		{
			id: 2,
			inputText: `matrix = [[1]]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 200</code></li>
  <li class='mt-2'><code>0 <= matrix[i][j] <= 2^31 - 1</code></li>`,
	starterCode: starterCodeLongestIncreasingPathInAMatrixJS,
	handlerFunction: longestIncreasingPathInAMatrixHandler,
	starterFunctionName: "function longestIncreasingPath(",
	order: 222,
};
