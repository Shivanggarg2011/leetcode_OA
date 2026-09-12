import assert from "assert";
import { Problem } from "../types/problem";

function referenceKthSmallest(matrix: number[][], k: number): number {
	const flat: number[] = [];
	for (const row of matrix) {
		for (const value of row) {
			flat.push(value);
		}
	}
	flat.sort((a, b) => a - b);
	return flat[k - 1];
}

export const kthSmallestElementInASortedMatrixHandler = (fn: any) => {
	try {
		const tests: { matrix: number[][]; k: number }[] = [
			{
				matrix: [
					[1, 5, 9],
					[10, 11, 13],
					[12, 13, 15],
				],
				k: 8,
			},
			{ matrix: [[-5]], k: 1 },
			{
				matrix: [
					[1, 2],
					[1, 3],
				],
				k: 2,
			},
			{
				matrix: [
					[1, 3, 5],
					[6, 7, 12],
					[11, 14, 14],
				],
				k: 5,
			},
		];

		for (const test of tests) {
			const expected = referenceKthSmallest(test.matrix, test.k);
			const result = fn(test.matrix, test.k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from kthSmallestElementInASortedMatrixHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeKthSmallestElementInASortedMatrixJS = `// Do not edit function name
function kthSmallest(matrix, k) {
  // Write your code here
};`;

export const kthSmallestElementInASortedMatrix: Problem = {
	id: "kth-smallest-element-in-a-sorted-matrix",
	title: "287. Kth Smallest Element in a Sorted Matrix",
	problemStatement: `<p class='mt-3'>
    You are given an <code>n x n</code> matrix <code>matrix</code> where each of the rows and columns is sorted in
    ascending order.
  </p>
  <p class='mt-3'>
    Return the <code>k</code>th smallest element in the matrix, counting all <code>n<sup>2</sup></code> elements
    (not just the distinct ones).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8`,
			outputText: `13`,
			explanation: "Sorted, the elements are 1,5,9,10,11,12,13,13,15, so the 8th smallest is 13.",
		},
		{
			id: 1,
			inputText: `matrix = [[-5]], k = 1`,
			outputText: `-5`,
		},
	],
	constraints: `<li class='mt-2'><code>n == matrix.length == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= n <= 300</code></li>
  <li class='mt-2'><code>-10^9 <= matrix[i][j] <= 10^9</code></li>
  <li class='mt-2'>Each row and column of <code>matrix</code> is sorted in ascending order.</li>
  <li class='mt-2'><code>1 <= k <= n^2</code></li>`,
	starterCode: starterCodeKthSmallestElementInASortedMatrixJS,
	handlerFunction: kthSmallestElementInASortedMatrixHandler,
	starterFunctionName: "function kthSmallest(",
	order: 287,
};
