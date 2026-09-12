import assert from "assert";
import { Problem } from "../types/problem";

const INF = 2147483647;

// Reference solution: multi-source BFS starting from every gate at once.
function referenceWallsAndGates(rooms: number[][]): number[][] {
	const rows = rooms.length;
	const cols = rooms[0].length;
	const queue: [number, number][] = [];

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (rooms[r][c] === 0) queue.push([r, c]);
		}
	}

	const directions = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];

	let head = 0;
	while (head < queue.length) {
		const [r, c] = queue[head++];
		for (const [dr, dc] of directions) {
			const nr = r + dr;
			const nc = c + dc;
			if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
			if (rooms[nr][nc] !== INF) continue;
			rooms[nr][nc] = rooms[r][c] + 1;
			queue.push([nr, nc]);
		}
	}

	return rooms;
}

export const wallsAndGatesHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[INF, -1, 0, INF],
				[INF, INF, INF, -1],
				[INF, -1, INF, -1],
				[0, -1, INF, INF],
			],
			[[-1]],
			[[0]],
			[[INF]],
			[
				[0, INF],
				[INF, -1],
			],
		];
		for (const rooms of tests) {
			const forExpected = rooms.map((row) => [...row]);
			const forResult = rooms.map((row) => [...row]);
			const expected = referenceWallsAndGates(forExpected);
			fn(forResult);
			assert.deepStrictEqual(forResult, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from wallsAndGatesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeWallsAndGatesJS = `function wallsAndGates(rooms) {
  // Write your code here.
  // Modify rooms in-place; do not return a new grid.
};`;

export const wallsAndGates: Problem = {
	id: "walls-and-gates",
	title: "165. Walls and Gates",
	problemStatement: `<p class='mt-3'>
    You are given an <code>m x n</code> grid <code>rooms</code> where each cell holds one of three
    values:
  </p>
  <ul class='mt-2'>
    <li><code>-1</code>: a wall or obstacle.</li>
    <li><code>0</code>: a gate.</li>
    <li><code>2147483647</code>: an empty room (representing <code>INF</code>).</li>
  </ul>
  <p class='mt-3'>
    Fill every empty room with the distance to its <strong>nearest</strong> gate. If a room cannot
    reach any gate, it should keep the value <code>2147483647</code>. You may only move up, down,
    left, or right, and may not pass through walls. Modify <code>rooms</code> in place; you do not
    need to return anything.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]`,
			outputText: `[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]`,
		},
		{
			id: 1,
			inputText: `rooms = [[-1]]`,
			outputText: `[[-1]]`,
		},
		{
			id: 2,
			inputText: `rooms = [[0]]`,
			outputText: `[[0]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= m, n <= 250</code></li>
  <li class='mt-2'><code>rooms[i][j]</code> is <code>-1</code>, <code>0</code>, or <code>2^31 - 1</code>.</li>`,
	starterCode: starterCodeWallsAndGatesJS,
	handlerFunction: wallsAndGatesHandler,
	starterFunctionName: "function wallsAndGates(",
	order: 165,
};
