import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: repeatedly take the two heaviest stones and smash
// them together until at most one stone remains.
function referenceLastStoneWeight(stones: number[]): number {
	const arr = [...stones];
	while (arr.length > 1) {
		arr.sort((a, b) => a - b);
		const y = arr.pop()!;
		const x = arr.pop()!;
		if (y !== x) arr.push(y - x);
	}
	return arr.length ? arr[0] : 0;
}

export const lastStoneWeightHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 7, 4, 1, 8, 1],
			[1],
			[1, 1],
			[1, 2, 3],
			[2, 2],
			[10, 4, 2, 10],
		];

		for (const stones of tests) {
			const expected = referenceLastStoneWeight(stones);
			const result = fn([...stones]);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from lastStoneWeightHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLastStoneWeightJS = `function lastStoneWeight(stones) {
  // Write your code here
};`;

export const lastStoneWeight: Problem = {
	id: "last-stone-weight",
	title: "139. Last Stone Weight",
	problemStatement: `<p class='mt-3'>
    You are given an array of integers <code>stones</code> where each value is the weight of a
    stone. On each turn, pick up the two heaviest stones and smash them together.
  </p>
  <p class='mt-3'>
    Suppose the two smashed stones have weights <code>x</code> and <code>y</code> with
    <code>x <= y</code>. If they are equal, both stones are destroyed. Otherwise, the stone of
    weight <code>x</code> is destroyed and the stone of weight <code>y</code> is replaced by a new
    stone of weight <code>y - x</code>.
  </p>
  <p class='mt-3'>
    Continue until at most one stone remains, and return that stone's weight, or <code>0</code> if
    no stones are left.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `stones = [2,7,4,1,8,1]`,
			outputText: `1`,
			explanation: "Smashing pairs in order of weight eventually leaves a single stone of weight 1.",
		},
		{
			id: 1,
			inputText: `stones = [1]`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `stones = [1,1]`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= stones.length <= 30</code></li>
  <li class='mt-2'><code>1 <= stones[i] <= 1000</code></li>`,
	starterCode: starterCodeLastStoneWeightJS,
	handlerFunction: lastStoneWeightHandler,
	starterFunctionName: "function lastStoneWeight(",
	order: 139,
};
