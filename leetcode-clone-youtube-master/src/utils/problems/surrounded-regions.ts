import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: any 'O' connected to the border survives; mark those
// via flood-fill first, then flip every remaining un-marked 'O' to 'X'.
function referenceSolveSurroundedRegions(board: string[][]): string[][] {
	const rows = board.length;
	const cols = board[0].length;
	const safe = board.map((row) => row.map(() => false));

	function dfs(r: number, c: number) {
		if (r < 0 || r >= rows || c < 0 || c >= cols) return;
		if (safe[r][c] || board[r][c] !== "O") return;
		safe[r][c] = true;
		dfs(r + 1, c);
		dfs(r - 1, c);
		dfs(r, c + 1);
		dfs(r, c - 1);
	}

	for (let r = 0; r < rows; r++) {
		dfs(r, 0);
		dfs(r, cols - 1);
	}
	for (let c = 0; c < cols; c++) {
		dfs(0, c);
		dfs(rows - 1, c);
	}

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (board[r][c] === "O" && !safe[r][c]) board[r][c] = "X";
		}
	}

	return board;
}

export const surroundedRegionsHandler = (fn: any) => {
	try {
		const tests: string[][][] = [
			[
				["X", "X", "X", "X"],
				["X", "O", "O", "X"],
				["X", "X", "O", "X"],
				["X", "O", "X", "X"],
			],
			[["X"]],
			[["O"]],
			[
				["O", "O"],
				["O", "O"],
			],
			[
				["O", "X", "O"],
				["X", "O", "X"],
				["O", "X", "O"],
			],
		];
		for (const board of tests) {
			const forExpected = board.map((row) => [...row]);
			const forResult = board.map((row) => [...row]);
			const expected = referenceSolveSurroundedRegions(forExpected);
			fn(forResult);
			assert.deepStrictEqual(forResult, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from surroundedRegionsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSurroundedRegionsJS = `function solve(board) {
  // Write your code here.
  // Modify board in-place; do not return a new board.
};`;

export const surroundedRegions: Problem = {
	id: "surrounded-regions",
	title: "168. Surrounded Regions",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> board containing the characters <code>'X'</code> and
    <code>'O'</code>. Capture every region of <code>'O'</code>s that is <strong>completely
    surrounded</strong> by <code>'X'</code>s by flipping every cell in that region to
    <code>'X'</code>.
  </p>
  <p class='mt-3'>
    A region of <code>'O'</code>s is <strong>not</strong> captured if it is connected (up, down,
    left, or right) to any <code>'O'</code> on the border of the board -- water can "escape" along
    that chain of connected cells. Modify <code>board</code> in place; you do not need to return
    anything.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]`,
			outputText: `[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]`,
			explanation: "The O's in the middle are enclosed and get flipped. The bottom-left O touches the border, so it survives.",
		},
		{
			id: 1,
			inputText: `board = [["X"]]`,
			outputText: `[["X"]]`,
		},
		{
			id: 2,
			inputText: `board = [["O","O"],["O","O"]]`,
			outputText: `[["O","O"],["O","O"]]`,
			explanation: "Every O touches the border here, so nothing is captured.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= m, n <= 200</code></li>
  <li class='mt-2'><code>board[i][j]</code> is <code>'X'</code> or <code>'O'</code>.</li>`,
	starterCode: starterCodeSurroundedRegionsJS,
	handlerFunction: surroundedRegionsHandler,
	starterFunctionName: "function solve(",
	order: 168,
};
