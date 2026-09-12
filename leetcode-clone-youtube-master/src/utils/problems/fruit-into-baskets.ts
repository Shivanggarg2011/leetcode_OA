import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: sliding window keeping at most 2 distinct fruit types
function referenceTotalFruit(fruits: number[]): number {
	const count = new Map<number, number>();
	let left = 0;
	let best = 0;
	for (let right = 0; right < fruits.length; right++) {
		count.set(fruits[right], (count.get(fruits[right]) || 0) + 1);
		while (count.size > 2) {
			const leftType = fruits[left];
			count.set(leftType, count.get(leftType)! - 1);
			if (count.get(leftType) === 0) count.delete(leftType);
			left++;
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
}

export const fruitIntoBasketsHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 1],
			[0, 1, 2, 2],
			[1, 2, 3, 2, 2],
			[3, 3, 3, 1, 1, 1, 1, 2, 3, 3, 4],
			[1],
			[1, 1, 1],
		];
		for (const fruits of tests) {
			const expected = referenceTotalFruit([...fruits]);
			const result = fn([...fruits]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from fruitIntoBasketsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFruitIntoBasketsJS = `function totalFruit(fruits) {
  // Write your code here
};`;

export const fruitIntoBaskets: Problem = {
	id: "fruit-into-baskets",
	title: "53. Fruit Into Baskets",
	problemStatement: `<p class='mt-3'>
    You are visiting a row of fruit trees represented by the array <code>fruits</code>, where
    <code>fruits[i]</code> is the type of fruit produced by the <code>i</code>-th tree.
  </p>
  <p class='mt-3'>
    You have exactly two baskets, and each basket can hold an unlimited amount of fruit but only
    <strong>a single type</strong> of fruit each. Starting from any tree of your choice, you must
    pick exactly one piece of fruit from every tree (moving to the right) until you reach a tree that
    produces a fruit type that wouldn't fit in either basket, at which point you must stop.
  </p>
  <p class='mt-3'>
    Return the <strong>maximum</strong> number of fruits you can collect this way.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "fruits = [1,2,1]",
			outputText: "3",
			explanation: "We can collect all 3 fruits.",
		},
		{
			id: 1,
			inputText: "fruits = [0,1,2,2]",
			outputText: "3",
			explanation: "We can collect [1,2,2].",
		},
		{
			id: 2,
			inputText: "fruits = [1,2,3,2,2]",
			outputText: "4",
			explanation: "We can collect [2,3,2,2].",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= fruits.length <= 10^5</code></li>
<li class='mt-2'><code>0 <= fruits[i] < fruits.length</code></li>`,
	starterCode: starterCodeFruitIntoBasketsJS,
	handlerFunction: fruitIntoBasketsHandler,
	starterFunctionName: "function totalFruit(",
	order: 53,
};
