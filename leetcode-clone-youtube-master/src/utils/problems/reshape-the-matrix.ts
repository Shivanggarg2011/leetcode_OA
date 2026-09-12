import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(mat: number[][], r: number, c: number): number[][] {
	const m = mat.length;
	const n = mat[0].length;
	if (m * n !== r * c) return mat.map((row) => row.slice());
	const flat: number[] = [];
	for (const row of mat) for (const v of row) flat.push(v);
	const res: number[][] = [];
	for (let i = 0; i < r; i++) res.push(flat.slice(i * c, (i + 1) * c));
	return res;
}

export const reshapeTheMatrixHandler = (fn: any) => {
	try {
		const tests: [number[][], number, number][] = [
			[
				[
					[1, 2],
					[3, 4],
				],
				1,
				4,
			],
			[
				[
					[1, 2],
					[3, 4],
				],
				2,
				4,
			],
			[
				[
					[1, 2, 3],
					[4, 5, 6],
				],
				3,
				2,
			],
			[[[1], [2], [3], [4]], 2, 2],
			[[[1, 2]], 1, 2],
		];
		for (const [mat, r, c] of tests) {
			const expected = referenceSolution(mat, r, c);
			const result = fn(mat, r, c);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from reshapeTheMatrixHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReshapeTheMatrixJS = `function matrixReshape(mat, r, c) {
  // Write your code here
};`;

export const reshapeTheMatrix: Problem = {
	id: "reshape-the-matrix",
	title: "255. Reshape the Matrix",
	problemStatement: `<p class='mt-3'>
    You are given a 2D array <code>mat</code> with <code>m</code> rows and <code>n</code> columns, and two
    integers <code>r</code> and <code>c</code> representing the desired number of rows and columns for a new
    reshaped matrix.
  </p>
  <p class='mt-3'>
    The reshaped matrix should be filled with all the elements of <code>mat</code> in the same left-to-right,
    top-to-bottom row order as the original.
  </p>
  <p class='mt-3'>
    If the reshape operation is impossible (the total number of elements <code>r * c</code> does not equal
    <code>m * n</code>), return the original matrix <code>mat</code> unchanged. Otherwise, return the
    reshaped <code>r x c</code> matrix.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "mat = [[1,2],[3,4]], r = 1, c = 4",
			outputText: "[[1,2,3,4]]",
		},
		{
			id: 1,
			inputText: "mat = [[1,2],[3,4]], r = 2, c = 4",
			outputText: "[[1,2],[3,4]]",
			explanation: "2 * 4 = 8 does not equal the original 2 * 2 = 4 elements, so the matrix is returned unchanged.",
		},
	],
	constraints: `<li class='mt-2'><code>m == mat.length</code>, <code>n == mat[i].length</code></li>
<li class='mt-2'><code>1 <= m, n <= 100</code></li>
<li class='mt-2'><code>-1000 <= mat[i][j] <= 1000</code></li>
<li class='mt-2'><code>1 <= r, c <= 300</code></li>`,
	starterCode: starterCodeReshapeTheMatrixJS,
	handlerFunction: reshapeTheMatrixHandler,
	starterFunctionName: "function matrixReshape(",
	order: 255,
};
