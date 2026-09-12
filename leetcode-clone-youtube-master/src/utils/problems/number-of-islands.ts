import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: flood-fill (DFS) each unvisited land cell, counting islands.
function referenceNumIslands(grid: string[][]): number {
	const rows = grid.length;
	const cols = grid[0].length;
	const visited = grid.map((row) => row.map(() => false));
	let islands = 0;

	function dfs(r: number, c: number) {
		if (r < 0 || r >= rows || c < 0 || c >= cols) return;
		if (visited[r][c] || grid[r][c] === "0") return;
		visited[r][c] = true;
		dfs(r + 1, c);
		dfs(r - 1, c);
		dfs(r, c + 1);
		dfs(r, c - 1);
	}

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === "1" && !visited[r][c]) {
				islands++;
				dfs(r, c);
			}
		}
	}

	return islands;
}

export const numberOfIslandsHandler = (fn: any) => {
	try {
		const tests: string[][][] = [
			[
				["1", "1", "1", "1", "0"],
				["1", "1", "0", "1", "0"],
				["1", "1", "0", "0", "0"],
				["0", "0", "0", "0", "0"],
			],
			[
				["1", "1", "0", "0", "0"],
				["1", "1", "0", "0", "0"],
				["0", "0", "1", "0", "0"],
				["0", "0", "0", "1", "1"],
			],
			[["0"]],
			[["1"]],
			[
				["1", "0", "1", "0", "1"],
			],
			[
				["1", "1", "1"],
				["0", "1", "0"],
				["1", "1", "1"],
			],
		];
		for (const grid of tests) {
			const gridCopyExpected = grid.map((row) => [...row]);
			const gridCopyResult = grid.map((row) => [...row]);
			const expected = referenceNumIslands(gridCopyExpected);
			const result = fn(gridCopyResult);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from numberOfIslandsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNumberOfIslandsJS = `function numIslands(grid) {
  // Write your code here
};`;

export const numberOfIslands: Problem = {
	id: "number-of-islands",
	title: "162. Number of Islands",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> 2D grid made of the characters <code>'1'</code> (land) and
    <code>'0'</code> (water).
  </p>
  <p class='mt-3'>
    An <strong>island</strong> is a group of adjacent lands connected horizontally or vertically
    (not diagonally). Assume all four edges of the grid are surrounded by water. Return <em>the
    number of islands</em> in the grid.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`,
			outputText: `1`,
		},
		{
			id: 1,
			inputText: `grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`,
			outputText: `3`,
		},
		{
			id: 2,
			inputText: `grid = [["0"]]`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= m, n <= 300</code></li>
  <li class='mt-2'><code>grid[i][j]</code> is <code>'0'</code> or <code>'1'</code>.</li>`,
	starterCode: starterCodeNumberOfIslandsJS,
	handlerFunction: numberOfIslandsHandler,
	starterFunctionName: "function numIslands(",
	order: 162,
};
