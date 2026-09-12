import assert from "assert";
import { Problem } from "../types/problem";

function referenceCherryPickup(grid: number[][]): number {
	const n = grid.length;
	const memo = new Map<string, number>();

	function dp(r1: number, c1: number, r2: number): number {
		const c2 = r1 + c1 - r2;
		if (
			r1 >= n ||
			c1 >= n ||
			r2 >= n ||
			c2 >= n ||
			grid[r1][c1] === -1 ||
			grid[r2][c2] === -1
		) {
			return -Infinity;
		}
		if (r1 === n - 1 && c1 === n - 1) {
			return grid[r1][c1];
		}
		const key = `${r1},${c1},${r2}`;
		if (memo.has(key)) return memo.get(key)!;

		let cherries = grid[r1][c1];
		if (r1 !== r2) cherries += grid[r2][c2];

		const best = Math.max(
			dp(r1 + 1, c1, r2 + 1),
			dp(r1 + 1, c1, r2),
			dp(r1, c1 + 1, r2 + 1),
			dp(r1, c1 + 1, r2)
		);

		cherries += best;
		memo.set(key, cherries);
		return cherries;
	}

	return Math.max(dp(0, 0, 0), 0);
}

export const cherryPickupHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[0, 1, -1],
				[1, 0, -1],
				[1, 1, 1],
			],
			[
				[1, 1, -1],
				[1, -1, 1],
				[-1, 1, 1],
			],
			[[1]],
			[
				[1, 1, 1],
				[0, 0, 0],
				[1, 1, 1],
			],
			[
				[0, 0, 0, 0],
				[0, 1, -1, 0],
				[0, -1, 1, 0],
				[0, 0, 0, 0],
			],
		];

		for (const grid of tests) {
			const expected = referenceCherryPickup(grid);
			const result = fn(grid);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from cherryPickupHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCherryPickupJS = `// Do not edit function name
function cherryPickup(grid) {
  // Write your code here
};`;

export const cherryPickup: Problem = {
	id: "cherry-pickup",
	title: "289. Cherry Pickup",
	problemStatement: `<p class='mt-3'>
    You are given an <code>n x n</code> grid <code>grid</code> where each cell has one of three values:
  </p>
  <li class='mt-2'><code>0</code> - an empty cell you can walk through.</li>
  <li class='mt-2'><code>1</code> - a cell containing a cherry that can be picked up.</li>
  <li class='mt-2'><code>-1</code> - a cell containing a thorn that blocks any path.</li>
  <p class='mt-3'>
    Starting at the top-left cell <code>(0, 0)</code>, you make one trip to the bottom-right cell
    <code>(n - 1, n - 1)</code> moving only right or down, collecting any cherries along the way (a cell's cherry
    can only be collected once). Then you make a second trip, moving only left or up, back to
    <code>(0, 0)</code>, again collecting any remaining cherries.
  </p>
  <p class='mt-3'>
    Return the maximum number of cherries that can be collected using both trips combined. If there is no valid
    path from <code>(0, 0)</code> to <code>(n - 1, n - 1)</code> and back, return <code>0</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `grid = [[0,1,-1],[1,0,-1],[1,1,1]]`,
			outputText: `5`,
			explanation: "One trip picks up 4 cherries going down/right, and the return trip picks up 1 more.",
		},
		{
			id: 1,
			inputText: `grid = [[1,1,-1],[1,-1,1],[-1,1,1]]`,
			outputText: `0`,
			explanation: "There is no way to travel from the top-left to the bottom-right corner and back.",
		},
	],
	constraints: `<li class='mt-2'><code>n == grid.length == grid[i].length</code></li>
  <li class='mt-2'><code>1 <= n <= 50</code></li>
  <li class='mt-2'><code>grid[i][j]</code> is <code>-1</code>, <code>0</code>, or <code>1</code>.</li>
  <li class='mt-2'><code>grid[0][0] != -1</code> and <code>grid[n - 1][n - 1] != -1</code>.</li>`,
	starterCode: starterCodeCherryPickupJS,
	handlerFunction: cherryPickupHandler,
	starterFunctionName: "function cherryPickup(",
	order: 289,
};
