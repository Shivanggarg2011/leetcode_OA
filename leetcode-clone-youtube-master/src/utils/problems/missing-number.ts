import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: the sum of 0..n minus the sum of the array reveals
// the single missing value.
function referenceMissingNumber(nums: number[]): number {
	const n = nums.length;
	const expectedSum = (n * (n + 1)) / 2;
	const actualSum = nums.reduce((acc, val) => acc + val, 0);
	return expectedSum - actualSum;
}

export const missingNumberHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[3, 0, 1],
			[0, 1],
			[9, 6, 4, 2, 3, 5, 7, 0, 1],
			[0],
			[1],
			[8, 4, 3, 0, 1, 6, 5, 2, 9, 7],
		];
		for (const test of tests) {
			const expected = referenceMissingNumber(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from missingNumberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMissingNumberJS = `function missingNumber(nums) {
  // Write your code here
};`;

export const missingNumber: Problem = {
	id: "missing-number",
	title: "11. Missing Number",
	problemStatement: `<p class='mt-3'>
    Given an array <code>nums</code> containing <code>n</code> distinct numbers taken from the
    range <code>[0, n]</code>, return the one number in that range that is missing from the array.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [3,0,1]`,
			outputText: `2`,
			explanation: "n = 3, so the range is [0,3]. 2 is the only number missing from the array.",
		},
		{
			id: 1,
			inputText: `nums = [0,1]`,
			outputText: `2`,
		},
		{
			id: 2,
			inputText: `nums = [9,6,4,2,3,5,7,0,1]`,
			outputText: `8`,
		},
	],
	constraints: `<li class='mt-2'><code>n == nums.length</code></li>
  <li class='mt-2'><code>1 <= n <= 10^4</code></li>
  <li class='mt-2'>All numbers in <code>nums</code> are unique and in the range <code>[0, n]</code>.</li>`,
	starterCode: starterCodeMissingNumberJS,
	handlerFunction: missingNumberHandler,
	starterFunctionName: "function missingNumber(",
	order: 11,
};
