import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: classic shrinking sliding window
function referenceMinSubArrayLen(target: number, nums: number[]): number {
	let left = 0;
	let sum = 0;
	let best = Infinity;
	for (let right = 0; right < nums.length; right++) {
		sum += nums[right];
		while (sum >= target) {
			best = Math.min(best, right - left + 1);
			sum -= nums[left];
			left++;
		}
	}
	return best === Infinity ? 0 : best;
}

export const minimumSizeSubarraySumHandler = (fn: any) => {
	try {
		const tests: [number, number[]][] = [
			[7, [2, 3, 1, 2, 4, 3, 3]],
			[4, [1, 4, 4]],
			[11, [1, 1, 1, 1, 1, 1, 1, 1]],
			[15, [1, 2, 3, 4, 5]],
			[100, [1, 2, 3]],
			[1, [1]],
		];
		for (const [target, nums] of tests) {
			const expected = referenceMinSubArrayLen(target, [...nums]);
			const result = fn(target, [...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minimumSizeSubarraySumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinimumSizeSubarraySumJS = `function minSubArrayLen(target, nums) {
  // Write your code here
};`;

export const minimumSizeSubarraySum: Problem = {
	id: "minimum-size-subarray-sum",
	title: "52. Minimum Size Subarray Sum",
	problemStatement: `<p class='mt-3'>
    You are given an array of positive integers <code>nums</code> and a positive integer <code>target</code>.
  </p>
  <p class='mt-3'>
    Find the length of the shortest contiguous subarray whose sum is <strong>greater than or equal to</strong>
    <code>target</code>. If no such subarray exists, return <code>0</code> instead.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "target = 7, nums = [2,3,1,2,4,3,3]",
			outputText: "2",
			explanation: "The subarray [4,3] has the minimal length under the problem constraint.",
		},
		{
			id: 1,
			inputText: "target = 4, nums = [1,4,4]",
			outputText: "1",
		},
		{
			id: 2,
			inputText: "target = 11, nums = [1,1,1,1,1,1,1,1]",
			outputText: "0",
			explanation: "The total sum of the array is only 8, which is less than 11.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= target <= 10^9</code></li>
<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
<li class='mt-2'><code>1 <= nums[i] <= 10^4</code></li>`,
	starterCode: starterCodeMinimumSizeSubarraySumJS,
	handlerFunction: minimumSizeSubarraySumHandler,
	starterFunctionName: "function minSubArrayLen(",
	order: 52,
};
