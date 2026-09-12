import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: XOR-ing every element cancels out all pairs,
// leaving only the value that appears once.
function referenceSingleNumber(nums: number[]): number {
	return nums.reduce((acc, val) => acc ^ val, 0);
}

export const singleNumberHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 2, 1],
			[4, 1, 2, 1, 2],
			[1],
			[-1, -1, 5],
			[7, 3, 7, 3, 9],
			[0, 0, 4, 4, 8],
		];
		for (const test of tests) {
			const expected = referenceSingleNumber(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from singleNumberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSingleNumberJS = `function singleNumber(nums) {
  // Write your code here
};`;

export const singleNumber: Problem = {
	id: "single-number",
	title: "13. Single Number",
	problemStatement: `<p class='mt-3'>
    Given a non-empty array of integers <code>nums</code>, every element appears
    <strong>exactly twice</strong> except for one element which appears only once.
  </p>
  <p class='mt-3'>
    Find and return that single element. Your algorithm should run in linear time and use only
    constant extra space.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [2,2,1]`,
			outputText: `1`,
		},
		{
			id: 1,
			inputText: `nums = [4,1,2,1,2]`,
			outputText: `4`,
		},
		{
			id: 2,
			inputText: `nums = [1]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>-3 * 10^4 <= nums[i] <= 3 * 10^4</code></li>
  <li class='mt-2'>Every element appears twice except for one.</li>`,
	starterCode: starterCodeSingleNumberJS,
	handlerFunction: singleNumberHandler,
	starterFunctionName: "function singleNumber(",
	order: 13,
};
