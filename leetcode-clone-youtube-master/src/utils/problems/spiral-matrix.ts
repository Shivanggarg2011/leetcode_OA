import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(matrix: number[][]): number[] {
	if (matrix.length === 0 || matrix[0].length === 0) return [];
	const result: number[] = [];
	let top = 0;
	let bottom = matrix.length - 1;
	let left = 0;
	let right = matrix[0].length - 1;
	while (top <= bottom && left <= right) {
		for (let j = left; j <= right; j++) result.push(matrix[top][j]);
		top++;
		for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
		right--;
		if (top <= bottom) {
			for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
			bottom--;
		}
		if (left <= right) {
			for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
			left++;
		}
	}
	return result;
}

export const spiralMatrixHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			],
			[
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
			],
			[[1]],
			[
				[1, 2],
				[3, 4],
			],
			[[1], [2], [3]],
		];
		for (const matrix of tests) {
			const expected = referenceSolution(matrix);
			const result = fn(matrix);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from spiralMatrixHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSpiralMatrixJS = `function spiralOrder(matrix) {
  // Write your code here
};`;

export const spiralMatrix: Problem = {
	id: "spiral-matrix",
	title: "253. Spiral Matrix",
	problemStatement: `<p class='mt-3'>
    Given an <code>m x n</code> 2D array <code>matrix</code>, return all elements of <code>matrix</code> in
    spiral order: starting at the top-left corner, moving right across the top row, down the right column,
    left across the bottom row, up the left column, and spiraling inward until every element has been
    visited.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
			outputText: "[1,2,3,6,9,8,7,4,5]",
		},
		{
			id: 1,
			inputText: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
			outputText: "[1,2,3,4,8,12,11,10,9,5,6,7]",
		},
	],
	constraints: `<li class='mt-2'><code>m == matrix.length</code>, <code>n == matrix[i].length</code></li>
<li class='mt-2'><code>1 <= m, n <= 10</code></li>
<li class='mt-2'><code>-100 <= matrix[i][j] <= 100</code></li>`,
	starterCode: starterCodeSpiralMatrixJS,
	handlerFunction: spiralMatrixHandler,
	starterFunctionName: "function spiralOrder(",
	order: 253,
};
