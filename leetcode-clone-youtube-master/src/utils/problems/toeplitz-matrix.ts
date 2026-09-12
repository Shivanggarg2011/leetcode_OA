import assert from "assert";
import { Problem } from "../types/problem";

function referenceIsToeplitzMatrix(matrix: number[][]): boolean {
	const rows = matrix.length;
	const cols = matrix[0].length;
	for (let r = 1; r < rows; r++) {
		for (let c = 1; c < cols; c++) {
			if (matrix[r][c] !== matrix[r - 1][c - 1]) return false;
		}
	}
	return true;
}

export const toeplitzMatrixHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 2, 3, 4],
				[5, 1, 2, 3],
				[9, 5, 1, 2],
			],
			[
				[1, 2],
				[2, 2],
			],
			[[7]],
			[
				[1, 2, 3],
				[4, 1, 2],
				[9, 4, 2],
			],
			[
				[11, 74, -6],
				[19, 11, 74],
			],
		];

		for (const matrix of tests) {
			const expected = referenceIsToeplitzMatrix(matrix);
			const result = fn(matrix);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from toeplitzMatrixHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeToeplitzMatrixJS = `// Do not edit function name
function isToeplitzMatrix(matrix) {
  // Write your code here
};`;

export const toeplitzMatrix: Problem = {
	id: "toeplitz-matrix",
	title: "284. Toeplitz Matrix",
	problemStatement: `<p class='mt-3'>
    A matrix is called a <strong>Toeplitz matrix</strong> if every diagonal that runs from the top-left to the
    bottom-right has the same elements.
  </p>
  <p class='mt-3'>
    Given an <code>m x n</code> matrix <code>matrix</code>, return <code>true</code> if it is a Toeplitz matrix,
    otherwise return <code>false</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]`,
			outputText: `true`,
			explanation: "Every diagonal (e.g. [1,1,1], [2,2], [3,3], [5,5], [9]) has matching values.",
		},
		{
			id: 1,
			inputText: `matrix = [[1,2],[2,2]]`,
			outputText: `false`,
			explanation: "The diagonal [1, 2] is not constant, so matrix[1][1] = 2 does not match matrix[0][0] = 1.",
		},
		{
			id: 2,
			inputText: `matrix = [[7]]`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 20</code></li>
  <li class='mt-2'><code>0 <= matrix[i][j] <= 99</code></li>`,
	starterCode: starterCodeToeplitzMatrixJS,
	handlerFunction: toeplitzMatrixHandler,
	starterFunctionName: "function isToeplitzMatrix(",
	order: 284,
};
