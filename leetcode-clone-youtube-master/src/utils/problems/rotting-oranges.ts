import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: multi-source BFS from all initially rotten oranges.
function referenceOrangesRotting(grid: number[][]): number {
	const rows = grid.length;
	const cols = grid[0].length;
	const queue: [number, number][] = [];
	let fresh = 0;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === 2) queue.push([r, c]);
			else if (grid[r][c] === 1) fresh++;
		}
	}

	if (fresh === 0) return 0;

	const directions = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];
	let minutes = 0;
	let head = 0;

	while (head < queue.length && fresh > 0) {
		const levelSize = queue.length - head;
		for (let i = 0; i < levelSize; i++) {
			const [r, c] = queue[head++];
			for (const [dr, dc] of directions) {
				const nr = r + dr;
				const nc = c + dc;
				if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
				if (grid[nr][nc] !== 1) continue;
				grid[nr][nc] = 2;
				fresh--;
				queue.push([nr, nc]);
			}
		}
		minutes++;
	}

	return fresh === 0 ? minutes : -1;
}

export const rottingOrangesHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[2, 1, 1],
				[1, 1, 0],
				[0, 1, 1],
			],
			[
				[2, 1, 1],
				[0, 1, 1],
				[1, 0, 1],
			],
			[[0, 2]],
			[[0]],
			[[1]],
			[
				[2, 0, 0, 1],
				[0, 0, 1, 1],
				[0, 0, 1, 0],
			],
		];
		for (const grid of tests) {
			const forExpected = grid.map((row) => [...row]);
			const forResult = grid.map((row) => [...row]);
			const expected = referenceOrangesRotting(forExpected);
			const result = fn(forResult);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from rottingOrangesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRottingOrangesJS = `function orangesRotting(grid) {
  // Write your code here
};`;

export const rottingOranges: Problem = {
	id: "rotting-oranges",
	title: "166. Rotting Oranges",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> grid of integers representing a box of oranges, where
    <code>0</code> is an empty cell, <code>1</code> is a fresh orange, and <code>2</code> is a
    rotten orange.
  </p>
  <p class='mt-3'>
    Every minute, any fresh orange that is adjacent (up, down, left, or right) to a rotten orange
    also becomes rotten. Return the minimum number of minutes that must pass until no fresh orange
    remains. If that is impossible, return <code>-1</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `grid = [[2,1,1],[1,1,0],[0,1,1]]`,
			outputText: `4`,
		},
		{
			id: 1,
			inputText: `grid = [[2,1,1],[0,1,1],[1,0,1]]`,
			outputText: `-1`,
			explanation: "The orange in the bottom-left corner is never reached, since rot cannot spread diagonally.",
		},
		{
			id: 2,
			inputText: `grid = [[0,2]]`,
			outputText: `0`,
			explanation: "There are no fresh oranges to begin with.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= m, n <= 10</code></li>
  <li class='mt-2'><code>grid[i][j]</code> is <code>0</code>, <code>1</code>, or <code>2</code>.</li>`,
	starterCode: starterCodeRottingOrangesJS,
	handlerFunction: rottingOrangesHandler,
	starterFunctionName: "function orangesRotting(",
	order: 166,
};
