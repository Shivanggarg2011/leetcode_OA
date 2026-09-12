import assert from "assert";
import { Problem } from "../types/problem";

export const firstMissingPositiveHandler = (fn: any) => {
	try {
		function referenceSolution(nums: number[]): number {
			const set = new Set(nums);
			let i = 1;
			while (set.has(i)) i++;
			return i;
		}

		const tests: number[][] = [
			[1, 2, 0],
			[3, 4, -1, 1],
			[7, 8, 9, 11, 12],
			[1],
			[],
			[1, 2, 3, 4, 5],
		];

		for (const nums of tests) {
			const expected = referenceSolution(nums);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from firstMissingPositiveHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFirstMissingPositiveJS = `function firstMissingPositive(nums) {
  // Write your code here
};`;

export const firstMissingPositive: Problem = {
	id: "first-missing-positive",
	title: "30. First Missing Positive",
	problemStatement: `<p class='mt-3'>
    Given an unsorted integer array <code>nums</code>, return the smallest missing positive integer
    (that is, the smallest integer greater than <code>0</code> that does not appear anywhere in
    <code>nums</code>).
  </p>
  <p class='mt-3'>
    Try to design an algorithm that runs in <code>O(n)</code> time and uses <code>O(1)</code> extra
    space.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,2,0]",
			outputText: "3",
		},
		{
			id: 1,
			inputText: "nums = [3,4,-1,1]",
			outputText: "2",
		},
		{
			id: 2,
			inputText: "nums = [7,8,9,11,12]",
			outputText: "1",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>`,
	starterCode: starterCodeFirstMissingPositiveJS,
	handlerFunction: firstMissingPositiveHandler,
	starterFunctionName: "function firstMissingPositive(",
	order: 30,
};
