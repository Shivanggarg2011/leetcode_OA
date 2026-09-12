import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a board is valid if no row, column, or 3x3 sub-box
// contains the same digit (1-9) more than once. Empty cells ('.') are ignored.
function referenceIsValidSudoku(board: string[][]): boolean {
	const rows = Array.from({ length: 9 }, () => new Set<string>());
	const cols = Array.from({ length: 9 }, () => new Set<string>());
	const boxes = Array.from({ length: 9 }, () => new Set<string>());

	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			const val = board[r][c];
			if (val === ".") continue;
			const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
			if (rows[r].has(val) || cols[c].has(val) || boxes[boxIndex].has(val)) {
				return false;
			}
			rows[r].add(val);
			cols[c].add(val);
			boxes[boxIndex].add(val);
		}
	}
	return true;
}

function emptyBoard(): string[][] {
	return Array.from({ length: 9 }, () => Array(9).fill("."));
}

export const validSudokuHandler = (fn: any) => {
	try {
		const validBoard = [
			["5", "3", ".", ".", "7", ".", ".", ".", "."],
			["6", ".", ".", "1", "9", "5", ".", ".", "."],
			[".", "9", "8", ".", ".", ".", ".", "6", "."],
			["8", ".", ".", ".", "6", ".", ".", ".", "3"],
			["4", ".", ".", "8", ".", "3", ".", ".", "1"],
			["7", ".", ".", ".", "2", ".", ".", ".", "6"],
			[".", "6", ".", ".", ".", ".", "2", "8", "."],
			[".", ".", ".", "4", "1", "9", ".", ".", "5"],
			[".", ".", ".", ".", "8", ".", ".", "7", "9"],
		];

		const invalidRowBoard = validBoard.map((row) => [...row]);
		invalidRowBoard[0] = ["8", "3", ".", ".", "7", ".", ".", ".", "8"];

		const invalidBoard = [
			["8", "3", ".", ".", "7", ".", ".", ".", "."],
			["6", ".", ".", "1", "9", "5", ".", ".", "."],
			[".", "9", "8", ".", ".", ".", ".", "6", "."],
			["8", ".", ".", ".", "6", ".", ".", ".", "3"],
			["4", ".", ".", "8", ".", "3", ".", ".", "1"],
			["7", ".", ".", ".", "2", ".", ".", ".", "6"],
			[".", "6", ".", ".", ".", ".", "2", "8", "."],
			[".", ".", ".", "4", "1", "9", ".", ".", "5"],
			[".", ".", ".", ".", "8", ".", ".", "7", "9"],
		];

		const columnConflictBoard = emptyBoard();
		columnConflictBoard[0][0] = "5";
		columnConflictBoard[4][0] = "5";

		const boxConflictBoard = emptyBoard();
		boxConflictBoard[0][0] = "4";
		boxConflictBoard[1][1] = "4";

		const allEmptyBoard = emptyBoard();

		const tests: string[][][] = [
			validBoard,
			invalidBoard,
			invalidRowBoard,
			columnConflictBoard,
			boxConflictBoard,
			allEmptyBoard,
		];

		for (const test of tests) {
			const expected = referenceIsValidSudoku(test.map((row) => [...row]));
			const result = fn(test.map((row) => [...row]));
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from validSudokuHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeValidSudokuJS = `function isValidSudoku(board) {
  // Write your code here
};`;

export const validSudoku: Problem = {
	id: "valid-sudoku",
	title: "9. Valid Sudoku",
	problemStatement: `<p class='mt-3'>
    Determine if a <code>9 x 9</code> Sudoku board is valid according to these rules, checked
    only against the filled cells that are currently on the board:
  </p>
  <p class='mt-3'>
    1. Each row must contain the digits <code>1-9</code> without repetition.<br/>
    2. Each column must contain the digits <code>1-9</code> without repetition.<br/>
    3. Each of the nine <code>3 x 3</code> sub-boxes must contain the digits <code>1-9</code>
    without repetition.
  </p>
  <p class='mt-3'>
    The board is given as a 9x9 grid of strings, where empty cells are represented by the
    character <code>'.'</code>. Note that the board does not need to be solvable — you are only
    checking whether the digits currently placed follow the three rules above.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `board with an "8" repeated twice in the top-left 3x3 box`,
			outputText: `false`,
		},
	],
	constraints: `<li class='mt-2'><code>board.length == 9</code> and <code>board[i].length == 9</code></li>
  <li class='mt-2'><code>board[i][j]</code> is a digit <code>1-9</code> or the character <code>.</code></li>`,
	starterCode: starterCodeValidSudokuJS,
	handlerFunction: validSudokuHandler,
	starterFunctionName: "function isValidSudoku(",
	order: 9,
};
