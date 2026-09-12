import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(hand: number[], groupSize: number): boolean {
	const n = hand.length;
	if (n % groupSize !== 0) return false;
	const counts = new Map<number, number>();
	for (const card of hand) {
		counts.set(card, (counts.get(card) || 0) + 1);
	}
	const sortedKeys = Array.from(counts.keys()).sort((a, b) => a - b);
	for (const key of sortedKeys) {
		const count = counts.get(key);
		if (!count) continue;
		if (count > 0) {
			for (let i = 0; i < groupSize; i++) {
				const curr = key + i;
				const currCount = counts.get(curr) || 0;
				if (currCount < count) return false;
				counts.set(curr, currCount - count);
			}
		}
	}
	return true;
}

export const handOfStraightsHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 2, 3, 6, 2, 3, 4, 7, 8], 3],
			[[1, 2, 3, 4, 5], 4],
			[[1, 1, 2, 2, 3, 3], 3],
			[[8, 10, 12], 3],
			[[1], 1],
			[[3, 2, 1, 2, 3, 4, 3, 4, 5, 9, 10, 11], 3],
		];
		for (const [hand, groupSize] of tests) {
			const expected = referenceSolution(hand, groupSize);
			const result = fn(hand, groupSize);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from handOfStraightsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeHandOfStraightsJS = `function isNStraightHand(hand, groupSize) {
  // Write your code here
};`;

export const handOfStraights: Problem = {
	id: "hand-of-straights",
	title: "230. Hand of Straights",
	problemStatement: `<p class='mt-3'>
    You are given an array of integers <code>hand</code> where <code>hand[i]</code> is the value written on the <code>i</code>-th card, and an integer <code>groupSize</code>.
  </p>
  <p class='mt-3'>
    You want to rearrange the cards into groups so that each group has exactly <code>groupSize</code> cards whose values are consecutive integers, with no gaps.
  </p>
  <p class='mt-3'>
    Return <code>true</code> if it is possible to rearrange all the cards this way, or <code>false</code> otherwise.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `hand = [1,2,3,6,2,3,4,7,8], groupSize = 3`,
			outputText: `true`,
			explanation: "The cards can be rearranged into [1,2,3], [2,3,4], and [6,7,8].",
		},
		{
			id: 1,
			inputText: `hand = [1,2,3,4,5], groupSize = 4`,
			outputText: `false`,
			explanation: "There aren't enough cards to form a group of 4 consecutive values for each group.",
		},
		{
			id: 2,
			inputText: `hand = [8,10,12], groupSize = 3`,
			outputText: `false`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= hand.length <= 10^4</code></li>
  <li class='mt-2'><code>0 <= hand[i] <= 10^9</code></li>
  <li class='mt-2'><code>1 <= groupSize <= hand.length</code></li>`,
	starterCode: starterCodeHandOfStraightsJS,
	handlerFunction: handOfStraightsHandler,
	starterFunctionName: "function isNStraightHand(",
	order: 230,
};
