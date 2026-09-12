import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: DFS/backtracking that must step on every non-obstacle
// square exactly once before reaching the end square.
function referenceUniquePathsIii(grid: number[][]): number {
	const rows = grid.length;
	const cols = grid[0].length;
	let startRow = 0;
	let startCol = 0;
	let walkable = 0;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] !== -1) walkable++;
			if (grid[r][c] === 1) {
				startRow = r;
				startCol = c;
			}
		}
	}

	let paths = 0;
	const visited = grid.map((row) => row.map((cell) => cell === -1));

	function dfs(r: number, c: number, steps: number) {
		if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c]) return;
		if (grid[r][c] === 2) {
			if (steps === walkable) paths++;
			return;
		}
		visited[r][c] = true;
		dfs(r + 1, c, steps + 1);
		dfs(r - 1, c, steps + 1);
		dfs(r, c + 1, steps + 1);
		dfs(r, c - 1, steps + 1);
		visited[r][c] = false;
	}

	dfs(startRow, startCol, 1);
	return paths;
}

export const uniquePathsIiiHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 2, -1],
			],
			[
				[1, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 2],
			],
			[
				[0, 1],
				[2, 0],
			],
			[[1, 2]],
			[
				[1, 0, 0, 0],
				[0, 0, 0, -1],
				[0, 0, 0, 2],
			],
			[
				[1, -1],
				[0, 2],
			],
		];
		for (const grid of tests) {
			const gridCopy1 = grid.map((row) => [...row]);
			const gridCopy2 = grid.map((row) => [...row]);
			const expected = referenceUniquePathsIii(gridCopy1);
			const result = fn(gridCopy2);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from uniquePathsIiiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeUniquePathsIiiJS = `function uniquePathsIII(grid) {
  // Write your code here
};`;

export const uniquePathsIii: Problem = {
	id: "unique-paths-iii",
	title: "161. Unique Paths III",
	problemStatement: `<p class='mt-3'>
    You are given a 2D grid of integers with four possible values:
  </p>
  <ul class='mt-2'>
    <li><code>1</code> marks the single starting square.</li>
    <li><code>2</code> marks the single ending square.</li>
    <li><code>0</code> marks a walkable empty square.</li>
    <li><code>-1</code> marks an obstacle that cannot be walked on.</li>
  </ul>
  <p class='mt-3'>
    Starting at the <code>1</code> square, return the number of distinct paths that walk over
    <strong>every non-obstacle square exactly once</strong> and finish on the <code>2</code> square.
    You may move up, down, left, or right, and may never revisit a square or step on an obstacle.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]`,
			outputText: `2`,
			explanation: "There are 2 distinct paths that visit every empty square exactly once and end at the 2.",
		},
		{
			id: 1,
			inputText: `grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]`,
			outputText: `4`,
		},
		{
			id: 2,
			inputText: `grid = [[0,1],[2,0]]`,
			outputText: `0`,
			explanation: "There is no way to walk over the empty square 0 and still end exactly on the 2.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= grid.length, grid[i].length <= 20</code></li>
  <li class='mt-2'><code>grid[i][j]</code> is <code>-1</code>, <code>0</code>, <code>1</code>, or <code>2</code>.</li>
  <li class='mt-2'>There is exactly one starting square and exactly one ending square.</li>`,
	starterCode: starterCodeUniquePathsIiiJS,
	handlerFunction: uniquePathsIiiHandler,
	starterFunctionName: "function uniquePathsIII(",
	order: 161,
};
