import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(nums: number[]): number {
	let best = nums[0];
	let curr = nums[0];
	for (let i = 1; i < nums.length; i++) {
		curr = Math.max(nums[i], curr + nums[i]);
		best = Math.max(best, curr);
	}
	return best;
}

export const maximumSubarrayHandler = (fn: any) => {
	try {
		const tests = [
			[-2, 1, -3, 4, -1, 2, 1, -5, 4],
			[1],
			[5, 4, -1, 7, 8],
			[-1, -2, -3, -4],
			[0, 0, 0],
			[-2, -1],
		];
		for (const nums of tests) {
			const expected = referenceSolution(nums);
			const result = fn(nums);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maximumSubarrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaximumSubarrayJS = `function maxSubArray(nums) {
  // Write your code here
};`;

export const maximumSubarray: Problem = {
	id: "maximum-subarray",
	title: "227. Maximum Subarray",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, find the contiguous subarray (containing at least one number) which has the largest sum, and return <em>its sum</em>.
  </p>
  <p class='mt-3'>
    A subarray is a contiguous part of an array.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [-2,1,-3,4,-1,2,1,-5,4]`,
			outputText: `6`,
			explanation: "The subarray [4,-1,2,1] has the largest sum, which is 6.",
		},
		{
			id: 1,
			inputText: `nums = [1]`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `nums = [5,4,-1,7,8]`,
			outputText: `23`,
			explanation: "The entire array is the subarray with the largest sum.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>`,
	starterCode: starterCodeMaximumSubarrayJS,
	handlerFunction: maximumSubarrayHandler,
	starterFunctionName: "function maxSubArray(",
	order: 227,
};
