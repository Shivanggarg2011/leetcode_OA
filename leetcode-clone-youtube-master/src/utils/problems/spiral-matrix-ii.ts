import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(n: number): number[][] {
	const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
	let top = 0;
	let bottom = n - 1;
	let left = 0;
	let right = n - 1;
	let val = 1;
	while (top <= bottom && left <= right) {
		for (let j = left; j <= right; j++) matrix[top][j] = val++;
		top++;
		for (let i = top; i <= bottom; i++) matrix[i][right] = val++;
		right--;
		if (top <= bottom) {
			for (let j = right; j >= left; j--) matrix[bottom][j] = val++;
			bottom--;
		}
		if (left <= right) {
			for (let i = bottom; i >= top; i--) matrix[i][left] = val++;
			left++;
		}
	}
	return matrix;
}

export const spiralMatrixIiHandler = (fn: any) => {
	try {
		const tests = [1, 2, 3, 4, 5];
		for (const n of tests) {
			const expected = referenceSolution(n);
			const result = fn(n);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from spiralMatrixIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSpiralMatrixIiJS = `function generateMatrix(n) {
  // Write your code here
};`;

export const spiralMatrixIi: Problem = {
	id: "spiral-matrix-ii",
	title: "254. Spiral Matrix II",
	problemStatement: `<p class='mt-3'>
    Given a positive integer <code>n</code>, generate an <code>n x n</code> matrix filled with the numbers
    <code>1</code> to <code>n^2</code> in spiral order: starting at the top-left corner, moving right across
    the top row, down the right column, left across the bottom row, up the left column, and spiraling inward.
  </p>
  <p class='mt-3'>
    Return the generated matrix.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "n = 3",
			outputText: "[[1,2,3],[8,9,4],[7,6,5]]",
		},
		{
			id: 1,
			inputText: "n = 1",
			outputText: "[[1]]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 20</code></li>`,
	starterCode: starterCodeSpiralMatrixIiJS,
	handlerFunction: spiralMatrixIiHandler,
	starterFunctionName: "function generateMatrix(",
	order: 254,
};
