import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: binary search on time + BFS/DFS reachability check.
function referenceSwimInWater(grid: number[][]): number {
	const n = grid.length;

	function canReach(t: number): boolean {
		if (grid[0][0] > t) return false;
		const visited = Array.from({ length: n }, () => new Array(n).fill(false));
		const stack: [number, number][] = [[0, 0]];
		visited[0][0] = true;
		while (stack.length) {
			const [r, c] = stack.pop()!;
			if (r === n - 1 && c === n - 1) return true;
			const dirs = [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			];
			for (const [dr, dc] of dirs) {
				const nr = r + dr;
				const nc = c + dc;
				if (
					nr >= 0 &&
					nr < n &&
					nc >= 0 &&
					nc < n &&
					!visited[nr][nc] &&
					grid[nr][nc] <= t
				) {
					visited[nr][nc] = true;
					stack.push([nr, nc]);
				}
			}
		}
		return visited[n - 1][n - 1];
	}

	let lo = 0;
	let hi = n * n - 1;
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (canReach(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
}

export const swimInRisingWaterHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[[0, 2], [1, 3]],
			[
				[0, 1, 2, 3, 4],
				[24, 23, 22, 21, 5],
				[12, 13, 14, 15, 16],
				[11, 17, 18, 19, 20],
				[10, 9, 8, 7, 6],
			],
			[[0]],
			[[3, 2], [0, 1]],
			[[0, 1], [2, 3]],
		];
		for (const grid of tests) {
			const expected = referenceSwimInWater(grid.map((row) => [...row]));
			const result = fn(grid.map((row) => [...row]));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from swimInRisingWaterHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSwimInRisingWaterJS = `function swimInWater(grid) {
  // Write your code here
};`;

export const swimInRisingWater: Problem = {
	id: "swim-in-rising-water",
	title: "184. Swim in Rising Water",
	problemStatement: `<p class='mt-3'>
    You are given an <code>n x n</code> grid where <code>grid[i][j]</code> is the elevation at
    position <code>(i, j)</code>. Rain starts to fall, and at time <code>t</code> the depth of water
    everywhere is <code>t</code>. You may swim from a square to an adjacent 4-directional square only
    if both squares have elevation <code>&lt;= t</code>.
  </p>
  <p class='mt-3'>
    You start at the top-left square <code>(0, 0)</code>. Return the least time <code>t</code> such
    that you can reach the bottom-right square <code>(n - 1, n - 1)</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `grid = [[0,2],[1,3]]`,
			outputText: `3`,
			explanation: "At time 3, every cell has elevation <= 3, allowing a path to the end.",
		},
		{
			id: 1,
			inputText: `grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]`,
			outputText: `16`,
		},
		{
			id: 2,
			inputText: `grid = [[0]]`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 50</code></li>
  <li class='mt-2'><code>0 <= grid[i][j] < n * n</code></li>
  <li class='mt-2'>Each value in <code>grid</code> is unique.</li>`,
	starterCode: starterCodeSwimInRisingWaterJS,
	handlerFunction: swimInRisingWaterHandler,
	starterFunctionName: "function swimInWater(",
	order: 184,
};
