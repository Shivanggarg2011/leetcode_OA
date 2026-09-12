import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: a plain map from playerId to score.
class ReferenceLeaderboard {
	private scores: Map<number, number>;

	constructor() {
		this.scores = new Map();
	}

	addScore(playerId: number, score: number): void {
		this.scores.set(playerId, (this.scores.get(playerId) || 0) + score);
	}

	top(K: number): number {
		const sorted = Array.from(this.scores.values()).sort((a, b) => b - a);
		return sorted.slice(0, K).reduce((sum, s) => sum + s, 0);
	}

	reset(playerId: number): void {
		this.scores.set(playerId, 0);
	}
}

export const designALeaderboardHandler = (fn: any) => {
	try {
		const ops = [
			"addScore",
			"addScore",
			"addScore",
			"addScore",
			"addScore",
			"top",
			"reset",
			"reset",
			"addScore",
			"top",
		];
		const args: any[][] = [
			[1, 73],
			[2, 56],
			[3, 39],
			[4, 51],
			[5, 4],
			[1],
			[1],
			[2],
			[2, 51],
			[3],
		];

		const obj = fn();
		const ref = new ReferenceLeaderboard();

		for (let i = 0; i < ops.length; i++) {
			const op = ops[i];
			const arg = args[i];
			const result = (obj as any)[op](...arg);
			const expected = (ref as any)[op](...arg);
			if (op === "top") {
				assert.equal(result, expected);
			}
		}
		return true;
	} catch (error: any) {
		console.log("Error from designALeaderboardHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDesignALeaderboardJS = `function Leaderboard() {
  // Write your code here.
  // Return an object exposing "addScore", "top", and "reset" methods.
  return {
    addScore: function(playerId, score) {

    },
    top: function(K) {

    },
    reset: function(playerId) {

    }
  };
};`;

export const designALeaderboard: Problem = {
	id: "design-a-leaderboard",
	title: "278. Design a Leaderboard",
	problemStatement: `<p class='mt-3'>
    Design a leaderboard that supports the following operations:
  </p>
  <p class='mt-3'>
    <code>addScore(playerId, score)</code> &mdash; if <code>playerId</code> is not on the
    leaderboard yet, adds them with the given <code>score</code>; otherwise adds
    <code>score</code> to their existing total.
  </p>
  <p class='mt-3'>
    <code>top(K)</code> &mdash; returns the sum of the top <code>K</code> scores currently on the
    leaderboard.
  </p>
  <p class='mt-3'>
    <code>reset(playerId)</code> &mdash; resets the score of <code>playerId</code> to
    <code>0</code> (the player must already exist on the leaderboard).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `addScore(1,73); addScore(2,56); addScore(3,39); addScore(4,51); addScore(5,4); top(1); reset(1); reset(2); addScore(2,51); top(3)`,
			outputText: `null, null, null, null, null, 73, null, null, null, 141`,
			explanation: "After the resets and new score, the top 3 scores are 51 (player 2), 51 (player 4), and 39 (player 3), summing to 141.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= playerId, K <= 10^4</code></li>
  <li class='mt-2'><code>1 <= score <= 100</code></li>
  <li class='mt-2'>There will always be at least <code>K</code> players on the leaderboard when <code>top</code> is called.</li>
  <li class='mt-2'>At most <code>1000</code> calls total will be made.</li>`,
	starterCode: starterCodeDesignALeaderboardJS,
	handlerFunction: designALeaderboardHandler,
	starterFunctionName: "function Leaderboard(",
	order: 278,
};
