import assert from "assert";
import { Problem } from "../types/problem";

function referenceSearchMatrix(matrix: number[][], target: number): boolean {
	if (matrix.length === 0 || matrix[0].length === 0) return false;
	let row = 0;
	let col = matrix[0].length - 1;
	while (row < matrix.length && col >= 0) {
		const value = matrix[row][col];
		if (value === target) return true;
		if (value > target) col--;
		else row++;
	}
	return false;
}

export const searchA2DMatrixIIHandler = (fn: any) => {
	try {
		const matrix1 = [
			[1, 4, 7, 11, 15],
			[2, 5, 8, 12, 19],
			[3, 6, 9, 16, 22],
			[10, 13, 14, 17, 24],
			[18, 21, 23, 26, 30],
		];
		const tests: { matrix: number[][]; target: number }[] = [
			{ matrix: matrix1, target: 5 },
			{ matrix: matrix1, target: 20 },
			{ matrix: matrix1, target: 30 },
			{ matrix: matrix1, target: 1 },
			{ matrix: [[1]], target: 1 },
			{ matrix: [[-5]], target: 5 },
		];

		for (const test of tests) {
			const expected = referenceSearchMatrix(test.matrix, test.target);
			const result = fn(test.matrix, test.target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from searchA2DMatrixIIHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSearchA2DMatrixIIJS = `// Do not edit function name
function searchMatrixII(matrix, target) {
  // Write your code here
};`;

export const searchA2DMatrixII: Problem = {
	id: "search-a-2d-matrix-ii",
	title: "282. Search a 2D Matrix II",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> integer matrix <code>matrix</code> with the following properties:
  </p>
  <li class='mt-2'>Every row is sorted in increasing order from left to right.</li>
  <li class='mt-2'>Every column is sorted in increasing order from top to bottom.</li>
  <p class='mt-3'>
    Given an integer <code>target</code>, return <code>true</code> if <code>target</code> is somewhere in
    <code>matrix</code>, or <code>false</code> otherwise. Note that unlike a fully row-major sorted matrix, the
    last element of one row is not guaranteed to be smaller than the first element of the next row.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20`,
			outputText: `false`,
			explanation: "20 does not appear anywhere in the matrix.",
		},
		{
			id: 2,
			inputText: `matrix = [[1]], target = 1`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 300</code></li>
  <li class='mt-2'><code>-10^9 <= matrix[i][j] <= 10^9</code></li>
  <li class='mt-2'><code>-10^9 <= target <= 10^9</code></li>`,
	starterCode: starterCodeSearchA2DMatrixIIJS,
	handlerFunction: searchA2DMatrixIIHandler,
	starterFunctionName: "function searchMatrixII(",
	order: 282,
};
