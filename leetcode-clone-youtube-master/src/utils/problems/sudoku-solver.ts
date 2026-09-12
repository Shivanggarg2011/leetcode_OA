import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: standard constraint-checking backtracking solver.
// Solves the board (an array of 9 arrays of 9 single-character strings,
// '.' for empty) in place and returns it.
function referenceSolveSudoku(board: string[][]): string[][] {
	function isValid(row: number, col: number, value: string): boolean {
		const boxRow = Math.floor(row / 3) * 3;
		const boxCol = Math.floor(col / 3) * 3;
		for (let i = 0; i < 9; i++) {
			if (board[row][i] === value) return false;
			if (board[i][col] === value) return false;
			if (board[boxRow + Math.floor(i / 3)][boxCol + (i % 3)] === value) return false;
		}
		return true;
	}

	function solve(): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col] !== ".") continue;
				for (let digit = 1; digit <= 9; digit++) {
					const value = String(digit);
					if (isValid(row, col, value)) {
						board[row][col] = value;
						if (solve()) return true;
						board[row][col] = ".";
					}
				}
				return false;
			}
		}
		return true;
	}

	solve();
	return board;
}

export const sudokuSolverHandler = (fn: any) => {
	try {
		const solvedBoard = [
			["5", "3", "4", "6", "7", "8", "9", "1", "2"],
			["6", "7", "2", "1", "9", "5", "3", "4", "8"],
			["1", "9", "8", "3", "4", "2", "5", "6", "7"],
			["8", "5", "9", "7", "6", "1", "4", "2", "3"],
			["4", "2", "6", "8", "5", "3", "7", "9", "1"],
			["7", "1", "3", "9", "2", "4", "8", "5", "6"],
			["9", "6", "1", "5", "3", "7", "2", "8", "4"],
			["2", "8", "7", "4", "1", "9", "6", "3", "5"],
			["3", "4", "5", "2", "8", "6", "1", "7", "9"],
		];

		function blank(board: string[][], cells: [number, number][]): string[][] {
			const copy = board.map((row) => [...row]);
			for (const [r, c] of cells) copy[r][c] = ".";
			return copy;
		}

		const tests: string[][][] = [
			// Already fully solved -- solver should leave it unchanged.
			blank(solvedBoard, []),
			// Only two blanks -- a trivial near-complete case.
			blank(solvedBoard, [
				[0, 2],
				[8, 8],
			]),
			// A handful of blanks scattered across different rows/boxes.
			blank(solvedBoard, [
				[0, 2],
				[1, 4],
				[3, 0],
				[5, 8],
				[6, 3],
				[8, 6],
				[8, 8],
				[2, 1],
			]),
			// The classic well-known 30-clue puzzle with a unique solution.
			[
				["5", "3", ".", ".", "7", ".", ".", ".", "."],
				["6", ".", ".", "1", "9", "5", ".", ".", "."],
				[".", "9", "8", ".", ".", ".", ".", "6", "."],
				["8", ".", ".", ".", "6", ".", ".", ".", "3"],
				["4", ".", ".", "8", ".", "3", ".", ".", "1"],
				["7", ".", ".", ".", "2", ".", ".", ".", "6"],
				[".", "6", ".", ".", ".", ".", "2", "8", "."],
				[".", ".", ".", "4", "1", "9", ".", ".", "5"],
				[".", ".", ".", ".", "8", ".", ".", "7", "9"],
			],
		];

		for (const puzzle of tests) {
			const forExpected = puzzle.map((row) => [...row]);
			const forResult = puzzle.map((row) => [...row]);
			const expected = referenceSolveSudoku(forExpected);
			fn(forResult);
			assert.deepStrictEqual(forResult, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from sudokuSolverHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSudokuSolverJS = `function solveSudoku(board) {
  // Write your code here.
  // Modify board in-place; do not return a new board.
};`;

export const sudokuSolver: Problem = {
	id: "sudoku-solver",
	title: "158. Sudoku Solver",
	problemStatement: `<p class='mt-3'>
    Write a function to solve a Sudoku puzzle by filling in the empty cells.
  </p>
  <p class='mt-3'>
    You are given a <code>9 x 9</code> board, represented as an array of 9 arrays of 9
    single-character strings. Digits <code>'1'</code>-<code>'9'</code> are filled-in clues, and
    <code>'.'</code> marks an empty cell.
  </p>
  <p class='mt-3'>
    A solution must satisfy the usual Sudoku rules: each of the digits <code>1</code>-<code>9</code>
    must appear exactly once in every row, every column, and every one of the nine
    <code>3 x 3</code> sub-boxes. You may assume the given puzzle has exactly one solution. Modify
    the <code>board</code> argument in place with the solved values; you do not need to return
    anything.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
			outputText: `[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]`,
			explanation: "Every row, column, and 3x3 box contains the digits 1-9 exactly once.",
		},
	],
	constraints: `<li class='mt-2'><code>board.length == 9</code> and <code>board[i].length == 9</code>.</li>
  <li class='mt-2'><code>board[i][j]</code> is a digit <code>1</code>-<code>9</code> or <code>'.'</code>.</li>
  <li class='mt-2'>It is guaranteed the input board has exactly one solution.</li>`,
	starterCode: starterCodeSudokuSolverJS,
	handlerFunction: sudokuSolverHandler,
	starterFunctionName: "function solveSudoku(",
	order: 158,
};
