import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count valid placements via backtracking.
function referenceTotalNQueens(n: number): number {
	const cols = new Set<number>();
	const diag1 = new Set<number>();
	const diag2 = new Set<number>();
	let count = 0;

	function backtrack(row: number) {
		if (row === n) {
			count++;
			return;
		}
		for (let col = 0; col < n; col++) {
			if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
			cols.add(col);
			diag1.add(row - col);
			diag2.add(row + col);

			backtrack(row + 1);

			cols.delete(col);
			diag1.delete(row - col);
			diag2.delete(row + col);
		}
	}

	backtrack(0);
	return count;
}

export const nQueensIiHandler = (fn: any) => {
	try {
		const tests: number[] = [1, 2, 3, 4, 5, 8];
		for (const n of tests) {
			const expected = referenceTotalNQueens(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from nQueensIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNQueensIiJS = `function totalNQueens(n) {
  // Write your code here
};`;

export const nQueensIi: Problem = {
	id: "n-queens-ii",
	title: "157. N-Queens II",
	problemStatement: `<p class='mt-3'>
    The <strong>n-queens</strong> puzzle asks you to place <code>n</code> chess queens on an
    <code>n x n</code> board so that no two queens attack each other (no shared row, column, or
    diagonal).
  </p>
  <p class='mt-3'>
    Given an integer <code>n</code>, return <em>the number of distinct solutions</em> to the
    n-queens puzzle, without needing to construct the boards themselves.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 4`,
			outputText: `2`,
			explanation: "The two distinct 4-queens solutions.",
		},
		{
			id: 1,
			inputText: `n = 1`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `n = 2`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 9</code></li>`,
	starterCode: starterCodeNQueensIiJS,
	handlerFunction: nQueensIiHandler,
	starterFunctionName: "function totalNQueens(",
	order: 157,
};
