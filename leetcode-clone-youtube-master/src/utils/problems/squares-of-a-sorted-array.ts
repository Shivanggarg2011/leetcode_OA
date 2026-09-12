import assert from "assert";
import { Problem } from "../types/problem";

export const squaresOfASortedArrayHandler = (fn: any) => {
	try {
		function referenceSolution(nums: number[]): number[] {
			return nums.map((n) => n * n).sort((a, b) => a - b);
		}

		const tests: number[][] = [
			[-4, -1, 0, 3, 10],
			[-7, -3, 2, 3, 11],
			[0],
			[-5, -3, -2],
			[1, 2, 3],
		];

		for (const nums of tests) {
			const expected = referenceSolution(nums);
			const result = fn([...nums]);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from squaresOfASortedArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSquaresOfASortedArrayJS = `function sortedSquares(nums) {
  // Write your code here
};`;

export const squaresOfASortedArray: Problem = {
	id: "squares-of-a-sorted-array",
	title: "41. Squares of a Sorted Array",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> sorted in non-decreasing order, return an array of the
    squares of each number, itself sorted in non-decreasing order.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [-4,-1,0,3,10]",
			outputText: "[0,1,9,16,100]",
		},
		{
			id: 1,
			inputText: "nums = [-7,-3,2,3,11]",
			outputText: "[4,9,9,49,121]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
  <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>
  <li class='mt-2'><code>nums</code> is sorted in non-decreasing order.</li>`,
	starterCode: starterCodeSquaresOfASortedArrayJS,
	handlerFunction: squaresOfASortedArrayHandler,
	starterFunctionName: "function sortedSquares(",
	order: 41,
};
