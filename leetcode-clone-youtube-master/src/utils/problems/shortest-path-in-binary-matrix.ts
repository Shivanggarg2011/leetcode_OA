import assert from "assert";
import { Problem } from "../types/problem";

function referenceShortestPathBinaryMatrix(grid: number[][]): number {
	const n = grid.length;
	if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;

	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	const visited = Array.from({ length: n }, () => new Array(n).fill(false));
	let queue: number[][] = [[0, 0]];
	visited[0][0] = true;
	let steps = 1;

	while (queue.length > 0) {
		const next: number[][] = [];
		for (const [r, c] of queue) {
			if (r === n - 1 && c === n - 1) return steps;
			for (const [dr, dc] of directions) {
				const nr = r + dr;
				const nc = c + dc;
				if (
					nr >= 0 &&
					nr < n &&
					nc >= 0 &&
					nc < n &&
					!visited[nr][nc] &&
					grid[nr][nc] === 0
				) {
					visited[nr][nc] = true;
					next.push([nr, nc]);
				}
			}
		}
		queue = next;
		steps++;
	}

	return -1;
}

export const shortestPathInBinaryMatrixHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[0, 1],
				[1, 0],
			],
			[
				[0, 0, 0],
				[1, 1, 0],
				[1, 1, 0],
			],
			[
				[1, 0, 0],
				[1, 1, 0],
				[1, 1, 0],
			],
			[[0]],
			[
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			],
		];

		for (const grid of tests) {
			const expected = referenceShortestPathBinaryMatrix(grid);
			const result = fn(grid);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from shortestPathInBinaryMatrixHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeShortestPathInBinaryMatrixJS = `// Do not edit function name
function shortestPathBinaryMatrix(grid) {
  // Write your code here
};`;

export const shortestPathInBinaryMatrix: Problem = {
	id: "shortest-path-in-binary-matrix",
	title: "290. Shortest Path in Binary Matrix",
	problemStatement: `<p class='mt-3'>
    Given an <code>n x n</code> binary grid <code>grid</code>, find the length of the shortest
    <strong>clear path</strong> from the top-left cell <code>(0, 0)</code> to the bottom-right cell
    <code>(n - 1, n - 1)</code>.
  </p>
  <p class='mt-3'>
    A clear path consists only of cells with value <code>0</code>, and consecutive cells in the path must be
    connected 8-directionally (horizontally, vertically, or diagonally adjacent). The length of a path is the
    number of visited cells, including the start and end cells.
  </p>
  <p class='mt-3'>
    If the starting cell or ending cell is not <code>0</code>, or no such path exists, return <code>-1</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `grid = [[0,1],[1,0]]`,
			outputText: `2`,
		},
		{
			id: 1,
			inputText: `grid = [[0,0,0],[1,1,0],[1,1,0]]`,
			outputText: `4`,
		},
		{
			id: 2,
			inputText: `grid = [[1,0,0],[1,1,0],[1,1,0]]`,
			outputText: `-1`,
			explanation: "The starting cell (0,0) is blocked, so no path is possible.",
		},
	],
	constraints: `<li class='mt-2'><code>n == grid.length == grid[i].length</code></li>
  <li class='mt-2'><code>1 <= n <= 100</code></li>
  <li class='mt-2'><code>grid[i][j]</code> is <code>0</code> or <code>1</code>.</li>`,
	starterCode: starterCodeShortestPathInBinaryMatrixJS,
	handlerFunction: shortestPathInBinaryMatrixHandler,
	starterFunctionName: "function shortestPathBinaryMatrix(",
	order: 290,
};
