import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count how many times each bit position is set across
// all numbers. Since every number except one appears exactly three times,
// any bit whose total count is not a multiple of 3 must belong to the
// single element.
function referenceSingleNumberII(nums: number[]): number {
	let result = 0;
	for (let bit = 0; bit < 32; bit++) {
		let count = 0;
		for (const n of nums) {
			count += (n >>> bit) & 1;
		}
		if (count % 3 !== 0) {
			result |= 1 << bit;
		}
	}
	return result;
}

export const singleNumberIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 2, 3, 2],
			[0, 1, 0, 1, 0, 1, 99],
			[30, 30, 30, 6],
			[5],
			[-2, -2, -2, 7],
			[1, 1, 1, 2, 2, 2, 4, 5, 5, 5],
		];
		for (const test of tests) {
			const expected = referenceSingleNumberII(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from singleNumberIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSingleNumberIiJS = `function singleNumberII(nums) {
  // Write your code here
};`;

export const singleNumberIi: Problem = {
	id: "single-number-ii",
	title: "14. Single Number II",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> where every element appears <strong>exactly three
    times</strong> except for one element which appears only once, find and return that single
    element.
  </p>
  <p class='mt-3'>
    Your algorithm should run in linear time and use only constant extra space.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [2,2,3,2]`,
			outputText: `3`,
		},
		{
			id: 1,
			inputText: `nums = [0,1,0,1,0,1,99]`,
			outputText: `99`,
		},
		{
			id: 2,
			inputText: `nums = [30,30,30,6]`,
			outputText: `6`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
  <li class='mt-2'>Every element appears exactly three times except for one.</li>`,
	starterCode: starterCodeSingleNumberIiJS,
	handlerFunction: singleNumberIiHandler,
	starterFunctionName: "function singleNumberII(",
	order: 14,
};
