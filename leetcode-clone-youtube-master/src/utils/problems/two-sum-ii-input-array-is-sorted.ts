import assert from "assert";
import { Problem } from "../types/problem";

export const twoSumIiInputArrayIsSortedHandler = (fn: any) => {
	try {
		function referenceSolution(numbers: number[], target: number): number[] {
			let lo = 0;
			let hi = numbers.length - 1;
			while (lo < hi) {
				const sum = numbers[lo] + numbers[hi];
				if (sum === target) return [lo + 1, hi + 1];
				if (sum < target) lo++;
				else hi--;
			}
			return [];
		}

		const tests: [number[], number][] = [
			[[2, 7, 11, 15], 9],
			[[2, 3, 4], 6],
			[[-1, 0], -1],
			[[1, 2, 3, 4, 4, 9, 56, 90], 8],
			[[5, 25, 75], 100],
		];

		for (const [numbers, target] of tests) {
			const expected = referenceSolution(numbers, target);
			const result = fn([...numbers], target);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from twoSumIiInputArrayIsSortedHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTwoSumIiInputArrayIsSortedJS = `function twoSum(numbers, target) {
  // Write your code here
};`;

export const twoSumIiInputArrayIsSorted: Problem = {
	id: "two-sum-ii-input-array-is-sorted",
	title: "44. Two Sum II - Input Array Is Sorted",
	problemStatement: `<p class='mt-3'>
    Given a <code>1</code>-indexed array of integers <code>numbers</code> that is already sorted in
    non-decreasing order, find two numbers such that they add up to a specific <code>target</code>
    number.
  </p>
  <p class='mt-3'>
    Return the indices of the two numbers, <code>index1</code> and <code>index2</code>, added by one,
    as an integer array <code>[index1, index2]</code> of length 2, where
    <code>1 <= index1 < index2 <= numbers.length</code>.
  </p>
  <p class='mt-3'>
    You may assume each input has <strong>exactly one solution</strong>, and you may not use the same
    element twice.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "numbers = [2,7,11,15], target = 9",
			outputText: "[1,2]",
			explanation: "numbers[0] + numbers[1] = 2 + 7 = 9, so index1 = 1 and index2 = 2.",
		},
		{
			id: 1,
			inputText: "numbers = [2,3,4], target = 6",
			outputText: "[1,3]",
		},
		{
			id: 2,
			inputText: "numbers = [-1,0], target = -1",
			outputText: "[1,2]",
		},
	],
	constraints: `<li class='mt-2'><code>2 <= numbers.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>-1000 <= numbers[i] <= 1000</code></li>
  <li class='mt-2'><code>numbers</code> is sorted in non-decreasing order.</li>
  <li class='mt-2'>Exactly one valid answer exists.</li>`,
	starterCode: starterCodeTwoSumIiInputArrayIsSortedJS,
	handlerFunction: twoSumIiInputArrayIsSortedHandler,
	starterFunctionName: "function twoSum(",
	order: 44,
};
