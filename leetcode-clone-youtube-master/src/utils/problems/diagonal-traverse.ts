import assert from "assert";
import { Problem } from "../types/problem";

function referenceFindDiagonalOrder(matrix: number[][]): number[] {
	const rows = matrix.length;
	if (rows === 0) return [];
	const cols = matrix[0].length;
	const result: number[] = [];

	for (let d = 0; d < rows + cols - 1; d++) {
		const diagonal: number[] = [];
		let r = d < cols ? 0 : d - cols + 1;
		let c = d < cols ? d : cols - 1;
		while (r < rows && c >= 0) {
			diagonal.push(matrix[r][c]);
			r++;
			c--;
		}
		if (d % 2 === 0) {
			diagonal.reverse();
		}
		result.push(...diagonal);
	}
	return result;
}

export const diagonalTraverseHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			],
			[[1, 2], [3, 4]],
			[[1]],
			[[1, 2, 3, 4]],
			[[1], [2], [3], [4]],
		];

		for (const matrix of tests) {
			const expected = referenceFindDiagonalOrder(matrix);
			const result = fn(matrix);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from diagonalTraverseHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDiagonalTraverseJS = `// Do not edit function name
function findDiagonalOrder(matrix) {
  // Write your code here
};`;

export const diagonalTraverse: Problem = {
	id: "diagonal-traverse",
	title: "286. Diagonal Traverse",
	problemStatement: `<p class='mt-3'>
    Given an <code>m x n</code> matrix <code>matrix</code>, return an array of all the elements visited in a
    diagonal zigzag order.
  </p>
  <p class='mt-3'>
    Start at the top-left corner. Traverse the first diagonal upward toward the top-right, then switch direction
    and traverse the next diagonal downward toward the bottom-left, alternating directions until every diagonal
    (from the top-left to the bottom-right corner) has been visited.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [[1,2,3],[4,5,6],[7,8,9]]`,
			outputText: `[1,2,4,7,5,3,6,8,9]`,
		},
		{
			id: 1,
			inputText: `matrix = [[1,2],[3,4]]`,
			outputText: `[1,2,3,4]`,
		},
	],
	constraints: `<li class='mt-2'><code>m == matrix.length</code></li>
  <li class='mt-2'><code>n == matrix[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 10^4</code></li>
  <li class='mt-2'><code>1 <= m * n <= 10^4</code></li>
  <li class='mt-2'><code>-10^5 <= matrix[i][j] <= 10^5</code></li>`,
	starterCode: starterCodeDiagonalTraverseJS,
	handlerFunction: diagonalTraverseHandler,
	starterFunctionName: "function findDiagonalOrder(",
	order: 286,
};
