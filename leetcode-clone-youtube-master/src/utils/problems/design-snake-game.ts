import assert from "assert";
import { Problem } from "../types/problem";

// Reference implementation of the snake game used to compute expected outputs.
function createReferenceSnakeGame(width: number, height: number, food: number[][]) {
	let score = 0;
	let foodIndex = 0;
	let body: number[][] = [[0, 0]];
	const occupied = new Set<string>(["0,0"]);

	function move(direction: string): number {
		const [headR, headC] = body[0];
		let r = headR;
		let c = headC;
		if (direction === "U") r -= 1;
		else if (direction === "D") r += 1;
		else if (direction === "L") c -= 1;
		else if (direction === "R") c += 1;

		if (r < 0 || r >= height || c < 0 || c >= width) return -1;

		let ateFood = false;
		if (foodIndex < food.length && food[foodIndex][0] === r && food[foodIndex][1] === c) {
			ateFood = true;
		}

		const tail = body[body.length - 1];
		if (!ateFood) {
			occupied.delete(tail.join(","));
			body.pop();
		}

		const key = `${r},${c}`;
		if (occupied.has(key)) return -1;

		body.unshift([r, c]);
		occupied.add(key);

		if (ateFood) {
			foodIndex++;
			score++;
		}

		return score;
	}

	return { move };
}

export const designSnakeGameHandler = (fn: any) => {
	try {
		const tests: { width: number; height: number; food: number[][]; moves: string[] }[] = [
			{
				width: 3,
				height: 2,
				food: [
					[1, 2],
					[0, 1],
				],
				moves: ["R", "D", "R", "U", "L", "U"],
			},
			{
				width: 2,
				height: 2,
				food: [],
				moves: ["D", "R", "U", "L"],
			},
			{
				width: 1,
				height: 1,
				food: [],
				moves: ["R"],
			},
			{
				width: 4,
				height: 4,
				food: [
					[1, 0],
					[2, 0],
				],
				moves: ["D", "D", "L", "U", "R"],
			},
		];

		for (const test of tests) {
			const refGame = createReferenceSnakeGame(test.width, test.height, test.food);
			const expected = test.moves.map((m) => refGame.move(m));

			const userGame = fn(test.width, test.height, test.food);
			const result = test.moves.map((m) => userGame.move(m));

			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from designSnakeGameHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignSnakeGameJS = `// Do not edit function name
function SnakeGame(width, height, food) {
  // width: number of columns, height: number of rows.
  // food: array of [row, col] pairs, given in the order the snake should eat them.
  // Return an object with a move(direction) method where direction is one of
  // "U", "D", "L", "R". move() should return the current score after moving,
  // or -1 if the move causes the game to end (hits a wall or itself).
  // Write your code here
};`;

export const designSnakeGame: Problem = {
	id: "design-snake-game",
	title: "281. Design Snake Game",
	problemStatement: `<p class='mt-3'>
    Design a Snake game that is played on a grid of <code>width</code> columns and <code>height</code> rows.
    The snake starts at position <code>(0, 0)</code> with a length of 1 cell.
  </p>
  <p class='mt-3'>
    You are given a list of <code>food</code> positions, given as <code>[row, col]</code> pairs, in the order
    they should appear on the board. When the snake's head moves onto a cell containing food, the snake grows
    by one cell (its tail does not move that turn) and its score increases by 1. The next piece of food (if any)
    then appears.
  </p>
  <p class='mt-3'>
    Implement a <code>SnakeGame(width, height, food)</code> factory that returns an object with a single method
    <code>move(direction)</code>, where <code>direction</code> is one of <code>"U"</code>, <code>"D"</code>,
    <code>"L"</code>, or <code>"R"</code>. Calling <code>move</code> should:
  </p>
  <li class='mt-2'>Move the snake's head one cell in the given direction.</li>
  <li class='mt-2'>If the head moves outside the board, or into a cell currently occupied by the snake's own body
    (excluding the tail cell that is vacated this turn, unless the snake just ate), the game is over and
    <code>move</code> should return <code>-1</code>.</li>
  <li class='mt-2'>Otherwise, <code>move</code> should return the current score (number of food items eaten so far).</li>
  `,
	examples: [
		{
			id: 0,
			inputText: `width = 3, height = 2, food = [[1,2],[0,1]]\nmoves = ["R","D","R","U","L","U"]`,
			outputText: `[0,0,1,1,2,-1]`,
			explanation:
				"The snake moves right, down, right (eats food at [1,2], score 1), up, left, then up again which collides with its own body, ending the game.",
		},
		{
			id: 1,
			inputText: `width = 2, height = 2, food = []\nmoves = ["D","R","U","L"]`,
			outputText: `[0,0,0,0]`,
			explanation: "With no food, the snake just moves around the 2x2 board without growing or colliding.",
		},
		{
			id: 2,
			inputText: `width = 1, height = 1, food = []\nmoves = ["R"]`,
			outputText: `[-1]`,
			explanation: "Moving right immediately goes off the 1x1 board.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= width, height <= 50</code></li>
  <li class='mt-2'><code>0 <= food.length <= 50</code></li>
  <li class='mt-2'>Each <code>food[i]</code> is a valid, distinct cell on the board.</li>
  <li class='mt-2'><code>1 <= moves.length <= 1000</code></li>`,
	starterCode: starterCodeDesignSnakeGameJS,
	handlerFunction: designSnakeGameHandler,
	starterFunctionName: "function SnakeGame(",
	order: 281,
};
