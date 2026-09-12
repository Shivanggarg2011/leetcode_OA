import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: DFS/backtracking from every starting cell, marking
// visited cells temporarily so a path never reuses a cell.
function referenceExist(inputBoard: string[][], word: string): boolean {
	const board = inputBoard.map((row) => [...row]);
	const rows = board.length;
	const cols = board[0].length;

	function dfs(r: number, c: number, i: number): boolean {
		if (i === word.length) return true;
		if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;

		const temp = board[r][c];
		board[r][c] = "#";
		const found =
			dfs(r + 1, c, i + 1) ||
			dfs(r - 1, c, i + 1) ||
			dfs(r, c + 1, i + 1) ||
			dfs(r, c - 1, i + 1);
		board[r][c] = temp;
		return found;
	}

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (dfs(r, c, 0)) return true;
		}
	}
	return false;
}

export const wordSearchHandler = (fn: any) => {
	try {
		const tests: [string[][], string][] = [
			[
				[
					["A", "B", "C", "E"],
					["S", "F", "C", "S"],
					["A", "D", "E", "E"],
				],
				"ABCCED",
			],
			[
				[
					["A", "B", "C", "E"],
					["S", "F", "C", "S"],
					["A", "D", "E", "E"],
				],
				"SEE",
			],
			[
				[
					["A", "B", "C", "E"],
					["S", "F", "C", "S"],
					["A", "D", "E", "E"],
				],
				"ABCB",
			],
			[[["a"]], "a"],
			[[["a", "a"]], "aaa"],
		];

		for (const [board, word] of tests) {
			const expected = referenceExist(board, word);
			const boardCopy = board.map((row) => [...row]);
			const result = fn(boardCopy, word);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wordSearchHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWordSearchJS = `function exist(board, word) {
  // Write your code here
};`;

export const wordSearch: Problem = {
	id: "word-search",
	title: "153. Word Search",
	problemStatement: `<p class='mt-3'>
    Given an <code>m x n</code> grid of characters <code>board</code> and a string
    <code>word</code>, return <code>true</code> if <code>word</code> can be traced out by moving
    between horizontally or vertically adjacent cells, and <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    The same grid cell may not be used more than once within a single word's path.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"`,
			outputText: `true`,
		},
		{
			id: 2,
			inputText: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"`,
			outputText: `false`,
			explanation: "The second 'B' would require reusing the cell already used for the first 'B'.",
		},
	],
	constraints: `<li class='mt-2'><code>m == board.length</code></li>
  <li class='mt-2'><code>n == board[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 6</code></li>
  <li class='mt-2'><code>1 <= word.length <= 15</code></li>
  <li class='mt-2'><code>board</code> and <code>word</code> consist of uppercase and lowercase English letters.</li>`,
	starterCode: starterCodeWordSearchJS,
	handlerFunction: wordSearchHandler,
	starterFunctionName: "function exist(",
	order: 153,
};
