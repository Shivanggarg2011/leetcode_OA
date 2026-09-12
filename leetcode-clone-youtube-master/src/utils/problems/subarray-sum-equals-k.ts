import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: track running prefix sums in a frequency map. If
// (prefixSum - k) has occurred before, every one of those occurrences marks
// the start of a subarray ending here that sums to k.
function referenceSubarraySum(nums: number[], k: number): number {
	const prefixCounts = new Map<number, number>();
	prefixCounts.set(0, 1);
	let sum = 0;
	let count = 0;
	for (const n of nums) {
		sum += n;
		count += prefixCounts.get(sum - k) || 0;
		prefixCounts.set(sum, (prefixCounts.get(sum) || 0) + 1);
	}
	return count;
}

export const subarraySumEqualsKHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 1, 1], 2],
			[[1, 2, 3], 3],
			[[1, -1, 0], 0],
			[[3, 4, 7, 2, -3, 1, 4, 2], 7],
			[[1], 0],
			[[-1, -1, 1], 0],
		];
		for (const [nums, k] of tests) {
			const expected = referenceSubarraySum(nums, k);
			const result = fn([...nums], k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from subarraySumEqualsKHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSubarraySumEqualsKJS = `function subarraySum(nums, k) {
  // Write your code here
};`;

export const subarraySumEqualsK: Problem = {
	id: "subarray-sum-equals-k",
	title: "23. Subarray Sum Equals K",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> and an integer <code>k</code>, return the
    <strong>total number</strong> of contiguous subarrays whose elements sum to exactly
    <code>k</code>.
  </p>
  <p class='mt-3'>
    A subarray is a contiguous, non-empty run of elements. Elements can be negative, positive, or
    zero.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,1,1], k = 2`,
			outputText: `2`,
			explanation: "The subarrays [1,1] (indices 0-1) and [1,1] (indices 1-2) both sum to 2.",
		},
		{
			id: 1,
			inputText: `nums = [1,2,3], k = 3`,
			outputText: `2`,
			explanation: "[1,2] and [3] both sum to 3.",
		},
		{
			id: 2,
			inputText: `nums = [1,-1,0], k = 0`,
			outputText: `3`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 2 * 10^4</code></li>
  <li class='mt-2'><code>-1000 <= nums[i] <= 1000</code></li>
  <li class='mt-2'><code>-10^7 <= k <= 10^7</code></li>`,
	starterCode: starterCodeSubarraySumEqualsKJS,
	handlerFunction: subarraySumEqualsKHandler,
	starterFunctionName: "function subarraySum(",
	order: 23,
};
