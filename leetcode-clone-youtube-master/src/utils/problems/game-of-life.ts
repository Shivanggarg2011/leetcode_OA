import assert from "assert";
import { Problem } from "../types/problem";

function referenceNextState(board: number[][]): number[][] {
	const rows = board.length;
	const cols = board[0].length;
	const next = Array.from({ length: rows }, () => new Array(cols).fill(0));

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			let liveNeighbors = 0;
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if (dr === 0 && dc === 0) continue;
					const nr = r + dr;
					const nc = c + dc;
					if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === 1) {
						liveNeighbors++;
					}
				}
			}
			if (board[r][c] === 1) {
				next[r][c] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
			} else {
				next[r][c] = liveNeighbors === 3 ? 1 : 0;
			}
		}
	}
	return next;
}

export const gameOfLifeHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[0, 1, 0],
				[0, 0, 1],
				[1, 1, 1],
				[0, 0, 0],
			],
			[
				[1, 1],
				[1, 0],
			],
			[[0, 0], [0, 0]],
			[[1]],
			[
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			],
		];

		for (const original of tests) {
			const boardForRef = original.map((row) => [...row]);
			const boardForFn = original.map((row) => [...row]);
			const expected = referenceNextState(boardForRef);

			fn(boardForFn);

			assert.deepStrictEqual(boardForFn, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from gameOfLifeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeGameOfLifeJS = `// Do not edit function name
// Mutate the board in-place to its next state; no return value is needed.
function gameOfLife(board) {
  // Write your code here
};`;

export const gameOfLife: Problem = {
	id: "game-of-life",
	title: "285. Game of Life",
	problemStatement: `<p class='mt-3'>
    The board is an <code>m x n</code> grid of cells, where each cell is either <strong>live</strong>
    (<code>1</code>) or <strong>dead</strong> (<code>0</code>). Each cell interacts with its up to 8 neighbors
    (horizontal, vertical, diagonal).
  </p>
  <p class='mt-3'>Applying the rules simultaneously to every cell produces the next generation:</p>
  <li class='mt-2'>A live cell with fewer than 2 live neighbors dies (underpopulation).</li>
  <li class='mt-2'>A live cell with 2 or 3 live neighbors stays alive.</li>
  <li class='mt-2'>A live cell with more than 3 live neighbors dies (overpopulation).</li>
  <li class='mt-2'>A dead cell with exactly 3 live neighbors becomes alive (reproduction).</li>
  <p class='mt-3'>
    Given the current state of the board, update <code>board</code> <strong>in-place</strong> to its next state.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]`,
			outputText: `[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]`,
		},
		{
			id: 1,
			inputText: `board = [[1,1],[1,0]]`,
			outputText: `[[1,1],[1,1]]`,
		},
	],
	constraints: `<li class='mt-2'><code>m == board.length</code></li>
  <li class='mt-2'><code>n == board[i].length</code></li>
  <li class='mt-2'><code>1 <= m, n <= 25</code></li>
  <li class='mt-2'><code>board[i][j]</code> is <code>0</code> or <code>1</code>.</li>`,
	starterCode: starterCodeGameOfLifeJS,
	handlerFunction: gameOfLifeHandler,
	starterFunctionName: "function gameOfLife(",
	order: 285,
};
