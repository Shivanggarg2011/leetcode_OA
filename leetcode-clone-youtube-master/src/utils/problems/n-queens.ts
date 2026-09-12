import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: classic backtracking placing one queen per row.
function referenceSolveNQueens(n: number): string[][] {
	const results: string[][] = [];
	const cols = new Set<number>();
	const diag1 = new Set<number>(); // row - col
	const diag2 = new Set<number>(); // row + col
	const placement: number[] = [];

	function backtrack(row: number) {
		if (row === n) {
			const board = placement.map((colIndex) => {
				const rowStr = new Array(n).fill(".");
				rowStr[colIndex] = "Q";
				return rowStr.join("");
			});
			results.push(board);
			return;
		}
		for (let col = 0; col < n; col++) {
			if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
			cols.add(col);
			diag1.add(row - col);
			diag2.add(row + col);
			placement.push(col);

			backtrack(row + 1);

			cols.delete(col);
			diag1.delete(row - col);
			diag2.delete(row + col);
			placement.pop();
		}
	}

	backtrack(0);
	return results;
}

// Normalize: order of solutions doesn't matter, so sort by joined rows.
function normalizeSolutions(solutions: string[][]): string[] {
	return solutions.map((board) => board.join("\n")).sort();
}

export const nQueensHandler = (fn: any) => {
	try {
		const tests: number[] = [1, 2, 3, 4, 5, 6];
		for (const n of tests) {
			const expected = normalizeSolutions(referenceSolveNQueens(n));
			const result = normalizeSolutions(fn(n));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from nQueensHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNQueensJS = `function solveNQueens(n) {
  // Write your code here
};`;

export const nQueens: Problem = {
	id: "n-queens",
	title: "156. N-Queens",
	problemStatement: `<p class='mt-3'>
    The <strong>n-queens</strong> puzzle asks you to place <code>n</code> chess queens on an
    <code>n x n</code> board so that no two queens attack each other. A queen attacks any other piece
    in the same row, the same column, or along either diagonal.
  </p>
  <p class='mt-3'>
    Given an integer <code>n</code>, return <em>all distinct solutions</em>. Each solution should be
    represented as an array of <code>n</code> strings, one per row, where <code>'Q'</code> marks a
    queen and <code>'.'</code> marks an empty square. You may return the solutions in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 4`,
			outputText: `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`,
			explanation: "There are exactly two ways to place 4 non-attacking queens on a 4x4 board.",
		},
		{
			id: 1,
			inputText: `n = 1`,
			outputText: `[["Q"]]`,
		},
		{
			id: 2,
			inputText: `n = 2`,
			outputText: `[]`,
			explanation: "No placement of 2 queens on a 2x2 board avoids all attacks.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 9</code></li>`,
	starterCode: starterCodeNQueensJS,
	handlerFunction: nQueensHandler,
	starterFunctionName: "function solveNQueens(",
	order: 156,
};
