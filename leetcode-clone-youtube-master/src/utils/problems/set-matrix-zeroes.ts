import assert from "assert";
import { Problem } from "../types/problem";

export const setMatrixZeroesHandler = (fn: any) => {
	try {
		function referenceSolution(matrix: number[][]): void {
			const rows = new Set<number>();
			const cols = new Set<number>();
			for (let i = 0; i < matrix.length; i++) {
				for (let j = 0; j < matrix[i].length; j++) {
					if (matrix[i][j] === 0) {
						rows.add(i);
						cols.add(j);
					}
				}
			}
			for (let i = 0; i < matrix.length; i++) {
				for (let j = 0; j < matrix[i].length; j++) {
					if (rows.has(i) || cols.has(j)) {
						matrix[i][j] = 0;
					}
				}
			}
		}

		const tests: number[][][] = [
			[
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			],
			[
				[0, 1, 2, 0],
				[3, 4, 5, 2],
				[1, 3, 1, 5],
			],
			[[1]],
			[[0]],
			[
				[1, 2],
				[3, 4],
			],
		];

		for (const matrix of tests) {
			const expected = matrix.map((row) => [...row]);
			referenceSolution(expected);
			const actual = matrix.map((row) => [...row]);
			fn(actual);
			assert.deepStrictEqual(actual, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from setMatrixZeroesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSetMatrixZeroesJS = `function setMatrixZeroes(matrix) {
  // Modify matrix in place. Do not return anything.
  // Write your code here
};`;

export const setMatrixZeroes: Problem = {
	id: "set-matrix-zeroes",
	title: "31. Set Matrix Zeroes",
	problemStatement: `<p class='mt-3'>
    Given an <code>m x n</code> integer matrix, if an element is <code>0</code>, set its entire row and
    entire column to <code>0</code>.
  </p>
  <p class='mt-3'>You must modify the matrix <strong>in place</strong>.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
			outputText: "[[1,0,1],[0,0,0],[1,0,1]]",
		},
		{
			id: 1,
			inputText: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
			outputText: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
		},
	],
	constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[0].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 200</code></li>
  <li class='mt-2'><code>-2^31 <= matrix[i][j] <= 2^31 - 1</code></li>`,
	starterCode: starterCodeSetMatrixZeroesJS,
	handlerFunction: setMatrixZeroesHandler,
	starterFunctionName: "function setMatrixZeroes(",
	order: 31,
};
