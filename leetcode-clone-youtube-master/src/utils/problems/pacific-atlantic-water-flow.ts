import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: BFS inward from each ocean's border cells (water flows
// from a cell to a neighbor only if the neighbor's height is >= its own, so
// flowing "backwards" from the ocean uses the same, but reversed, condition).
function referencePacificAtlantic(heights: number[][]): number[][] {
	const rows = heights.length;
	const cols = heights[0].length;

	function bfs(starts: [number, number][]): boolean[][] {
		const reachable = heights.map((row) => row.map(() => false));
		const queue: [number, number][] = [];
		for (const [r, c] of starts) {
			reachable[r][c] = true;
			queue.push([r, c]);
		}
		const directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];
		let head = 0;
		while (head < queue.length) {
			const [r, c] = queue[head++];
			for (const [dr, dc] of directions) {
				const nr = r + dr;
				const nc = c + dc;
				if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
				if (reachable[nr][nc]) continue;
				if (heights[nr][nc] < heights[r][c]) continue;
				reachable[nr][nc] = true;
				queue.push([nr, nc]);
			}
		}
		return reachable;
	}

	const pacificStarts: [number, number][] = [];
	const atlanticStarts: [number, number][] = [];
	for (let r = 0; r < rows; r++) {
		pacificStarts.push([r, 0]);
		atlanticStarts.push([r, cols - 1]);
	}
	for (let c = 0; c < cols; c++) {
		pacificStarts.push([0, c]);
		atlanticStarts.push([rows - 1, c]);
	}

	const pacificReach = bfs(pacificStarts);
	const atlanticReach = bfs(atlanticStarts);

	const result: number[][] = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (pacificReach[r][c] && atlanticReach[r][c]) result.push([r, c]);
		}
	}
	return result;
}

function normalize(coords: number[][]): string[] {
	return coords.map(([r, c]) => `${r},${c}`).sort();
}

export const pacificAtlanticWaterFlowHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 2, 2, 3, 5],
				[3, 2, 3, 4, 4],
				[2, 4, 5, 3, 1],
				[6, 7, 1, 4, 5],
				[5, 1, 1, 2, 4],
			],
			[[1]],
			[
				[1, 1],
				[1, 1],
			],
			[
				[3, 3, 3],
				[3, 1, 3],
				[3, 3, 3],
			],
			[
				[10, 10, 10],
				[10, 1, 10],
				[10, 10, 10],
			],
		];
		for (const heights of tests) {
			const forExpected = heights.map((row) => [...row]);
			const forResult = heights.map((row) => [...row]);
			const expected = normalize(referencePacificAtlantic(forExpected));
			const result = normalize(fn(forResult));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from pacificAtlanticWaterFlowHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePacificAtlanticWaterFlowJS = `function pacificAtlantic(heights) {
  // Write your code here
};`;

export const pacificAtlanticWaterFlow: Problem = {
	id: "pacific-atlantic-water-flow",
	title: "167. Pacific Atlantic Water Flow",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> grid <code>heights</code> where <code>heights[r][c]</code>
    is the height of the cell at row <code>r</code>, column <code>c</code>. The Pacific ocean
    touches the top and left edges of the grid, and the Atlantic ocean touches the bottom and right
    edges.
  </p>
  <p class='mt-3'>
    Water can flow from a cell to an adjacent cell (up, down, left, right) only if the destination
    cell's height is <strong>less than or equal to</strong> the current cell's height. Return the
    list of coordinates <code>[r, c]</code> from which water can reach <strong>both</strong> oceans.
    You may return the coordinates in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]`,
			outputText: `[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]`,
		},
		{
			id: 1,
			inputText: `heights = [[1]]`,
			outputText: `[[0,0]]`,
			explanation: "The single cell touches both oceans at once.",
		},
		{
			id: 2,
			inputText: `heights = [[3,3,3],[3,1,3],[3,3,3]]`,
			outputText: `[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]`,
			explanation: "The center cell is lower than its surroundings, so water there cannot flow outward to either ocean.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= m, n <= 100</code></li>
  <li class='mt-2'><code>0 <= heights[r][c] <= 10^5</code></li>`,
	starterCode: starterCodePacificAtlanticWaterFlowJS,
	handlerFunction: pacificAtlanticWaterFlowHandler,
	starterFunctionName: "function pacificAtlantic(",
	order: 167,
};
