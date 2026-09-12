import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(matrix: number[][]): number[][] {
	const n = matrix.length;
	const res: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			res[j][n - 1 - i] = matrix[i][j];
		}
	}
	return res;
}

function deepCopy(matrix: number[][]): number[][] {
	return matrix.map((row) => row.slice());
}

export const rotateImageHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			],
			[
				[5, 1, 9, 11],
				[2, 4, 8, 10],
				[13, 3, 6, 7],
				[15, 14, 12, 16],
			],
			[[1]],
			[
				[1, 2],
				[3, 4],
			],
			[
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			].reverse(),
		];
		for (const matrix of tests) {
			const expected = referenceSolution(matrix);
			const result = fn(deepCopy(matrix));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from rotateImageHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRotateImageJS = `function rotate(matrix) {
  // You may rotate the matrix in place if you'd like, but your function must
  // return the resulting n x n matrix rotated 90 degrees clockwise.
  // Write your code here
};`;

export const rotateImage: Problem = {
	id: "rotate-image",
	title: "252. Rotate Image",
	problemStatement: `<p class='mt-3'>
    You are given an <code>n x n</code> 2D array <code>matrix</code> representing an image. Rotate the image
    by <strong>90 degrees clockwise</strong>.
  </p>
  <p class='mt-3'>
    You may rotate <code>matrix</code> in place if you want, but your function must return the resulting
    rotated matrix.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
			outputText: "[[7,4,1],[8,5,2],[9,6,3]]",
		},
		{
			id: 1,
			inputText: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
			outputText: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
		},
	],
	constraints: `<li class='mt-2'><code>n == matrix.length == matrix[i].length</code></li>
<li class='mt-2'><code>1 <= n <= 20</code></li>
<li class='mt-2'><code>-1000 <= matrix[i][j] <= 1000</code></li>`,
	starterCode: starterCodeRotateImageJS,
	handlerFunction: rotateImageHandler,
	starterFunctionName: "function rotate(",
	order: 252,
};
