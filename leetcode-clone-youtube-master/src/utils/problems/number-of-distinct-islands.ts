import assert from "assert";
import { Problem } from "../types/problem";

function referenceNumDistinctIslands(grid: number[][]): number {
	const rows = grid.length;
	const cols = rows > 0 ? grid[0].length : 0;
	const visited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
	const shapes = new Set<string>();

	function dfs(r: number, c: number, r0: number, c0: number, path: string[]) {
		if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || grid[r][c] === 0) return;
		visited[r][c] = true;
		path.push(`${r - r0},${c - c0}`);
		dfs(r + 1, c, r0, c0, path);
		dfs(r - 1, c, r0, c0, path);
		dfs(r, c + 1, r0, c0, path);
		dfs(r, c - 1, r0, c0, path);
	}

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === 1 && !visited[r][c]) {
				const path: string[] = [];
				dfs(r, c, r, c, path);
				shapes.add(path.join("|"));
			}
		}
	}

	return shapes.size;
}

export const numberOfDistinctIslandsHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 1, 0, 0, 0],
				[1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1],
				[0, 0, 0, 1, 1],
			],
			[
				[1, 1, 0, 1, 1],
				[1, 0, 0, 0, 0],
				[0, 0, 0, 0, 1],
				[1, 1, 0, 1, 1],
			],
			[[0, 0, 0], [0, 0, 0]],
			[[1]],
			[
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 1],
			],
		];

		for (const grid of tests) {
			const copyForRef = grid.map((row) => [...row]);
			const copyForFn = grid.map((row) => [...row]);
			const expected = referenceNumDistinctIslands(copyForRef);
			const result = fn(copyForFn);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from numberOfDistinctIslandsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNumberOfDistinctIslandsJS = `// Do not edit function name
function numDistinctIslands(grid) {
  // Write your code here
};`;

export const numberOfDistinctIslands: Problem = {
	id: "number-of-distinct-islands",
	title: "283. Number of Distinct Islands",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> binary grid <code>grid</code> where <code>1</code> represents land and
    <code>0</code> represents water. An <strong>island</strong> is a group of <code>1</code>s connected
    4-directionally (horizontal or vertical).
  </p>
  <p class='mt-3'>
    Two islands are considered the <strong>same shape</strong> if one can be translated (shifted up/down/left/right,
    without rotating or reflecting) to exactly match the other. Return the number of <strong>distinct</strong>
    island shapes in the grid.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]`,
			outputText: `1`,
			explanation: "Both islands are 2x2 squares, so they count as the same shape.",
		},
		{
			id: 1,
			inputText: `grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]`,
			outputText: `3`,
		},
	],
	constraints: `<li class='mt-2'><code>m == grid.length</code></li>
  <li class='mt-2'><code>n == grid[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 50</code></li>
  <li class='mt-2'><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>`,
	starterCode: starterCodeNumberOfDistinctIslandsJS,
	handlerFunction: numberOfDistinctIslandsHandler,
	starterFunctionName: "function numDistinctIslands(",
	order: 283,
};
