import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: flood-fill (DFS) each unvisited land cell, tracking area.
function referenceMaxAreaOfIsland(grid: number[][]): number {
	const rows = grid.length;
	const cols = grid[0].length;
	const visited = grid.map((row) => row.map(() => false));
	let best = 0;

	function dfs(r: number, c: number): number {
		if (r < 0 || r >= rows || c < 0 || c >= cols) return 0;
		if (visited[r][c] || grid[r][c] === 0) return 0;
		visited[r][c] = true;
		return (
			1 +
			dfs(r + 1, c) +
			dfs(r - 1, c) +
			dfs(r, c + 1) +
			dfs(r, c - 1)
		);
	}

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === 1 && !visited[r][c]) {
				best = Math.max(best, dfs(r, c));
			}
		}
	}

	return best;
}

export const maxAreaOfIslandHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
				[0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
				[0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			],
			[
				[0, 0, 0, 0, 0, 0, 0, 0],
			],
			[[1]],
			[[0]],
			[
				[1, 1],
				[1, 1],
			],
			[
				[1, 0, 0],
				[0, 0, 0],
				[0, 0, 1],
			],
		];
		for (const grid of tests) {
			const gridCopyExpected = grid.map((row) => [...row]);
			const gridCopyResult = grid.map((row) => [...row]);
			const expected = referenceMaxAreaOfIsland(gridCopyExpected);
			const result = fn(gridCopyResult);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maxAreaOfIslandHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaxAreaOfIslandJS = `function maxAreaOfIsland(grid) {
  // Write your code here
};`;

export const maxAreaOfIsland: Problem = {
	id: "max-area-of-island",
	title: "163. Max Area of Island",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> binary grid <code>grid</code> where <code>1</code> represents
    land and <code>0</code> represents water.
  </p>
  <p class='mt-3'>
    An <strong>island</strong> is a group of <code>1</code>s connected horizontally or vertically
    (not diagonally). The <strong>area</strong> of an island is the number of cells it contains.
    Return <em>the maximum area of an island</em> in the grid, or <code>0</code> if there is no
    island.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `grid = [[0,0,1,0],[0,1,1,0],[0,0,0,1]]`,
			outputText: `3`,
			explanation: "The largest island (top-right blob of connected 1s) has area 3.",
		},
		{
			id: 1,
			inputText: `grid = [[0,0,0,0,0,0,0,0]]`,
			outputText: `0`,
		},
		{
			id: 2,
			inputText: `grid = [[1,1],[1,1]]`,
			outputText: `4`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= m, n <= 50</code></li>
  <li class='mt-2'><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>`,
	starterCode: starterCodeMaxAreaOfIslandJS,
	handlerFunction: maxAreaOfIslandHandler,
	starterFunctionName: "function maxAreaOfIsland(",
	order: 163,
};
