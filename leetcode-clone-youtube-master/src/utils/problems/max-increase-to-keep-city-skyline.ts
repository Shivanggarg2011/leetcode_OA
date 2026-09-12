import assert from "assert";
import { Problem } from "../types/problem";

function referenceMaxIncreaseKeepingSkyline(grid: number[][]): number {
	const n = grid.length;
	const rowMax = new Array(n).fill(0);
	const colMax = new Array(n).fill(0);

	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			rowMax[r] = Math.max(rowMax[r], grid[r][c]);
			colMax[c] = Math.max(colMax[c], grid[r][c]);
		}
	}

	let total = 0;
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			total += Math.min(rowMax[r], colMax[c]) - grid[r][c];
		}
	}
	return total;
}

export const maxIncreaseToKeepCitySkylineHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[3, 0, 8, 4],
				[2, 4, 5, 7],
				[9, 2, 6, 3],
				[0, 3, 1, 0],
			],
			[[1]],
			[
				[0, 0],
				[0, 0],
			],
			[
				[1, 2],
				[3, 4],
			],
		];

		for (const grid of tests) {
			const expected = referenceMaxIncreaseKeepingSkyline(grid);
			const result = fn(grid);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maxIncreaseToKeepCitySkylineHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaxIncreaseToKeepCitySkylineJS = `// Do not edit function name
function maxIncreaseKeepingSkyline(grid) {
  // Write your code here
};`;

export const maxIncreaseToKeepCitySkyline: Problem = {
	id: "max-increase-to-keep-city-skyline",
	title: "288. Max Increase to Keep City Skyline",
	problemStatement: `<p class='mt-3'>
    You are given an <code>n x n</code> grid <code>grid</code> where <code>grid[r][c]</code> is the height of a
    building located at row <code>r</code> and column <code>c</code>.
  </p>
  <p class='mt-3'>
    The <strong>skyline</strong> of a row (viewed from the left or right side of the grid) is the maximum building
    height in that row. The skyline of a column (viewed from the front or back) is the maximum building height in
    that column.
  </p>
  <p class='mt-3'>
    You may increase the height of any building, but the skyline viewed from any of the four directions must not
    change. Return the maximum total sum by which the heights of all buildings can be increased.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]`,
			outputText: `35`,
		},
		{
			id: 1,
			inputText: `grid = [[1]]`,
			outputText: `0`,
			explanation: "There is only one building, so its height already equals both skylines; nothing can be added.",
		},
	],
	constraints: `<li class='mt-2'><code>n == grid.length == grid[i].length</code></li>
  <li class='mt-2'><code>1 <= n <= 50</code></li>
  <li class='mt-2'><code>0 <= grid[r][c] <= 100</code></li>`,
	starterCode: starterCodeMaxIncreaseToKeepCitySkylineJS,
	handlerFunction: maxIncreaseToKeepCitySkylineHandler,
	starterFunctionName: "function maxIncreaseKeepingSkyline(",
	order: 288,
};
