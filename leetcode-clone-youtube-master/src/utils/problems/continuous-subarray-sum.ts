import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: track prefix sums modulo k. If the same remainder is
// seen at two indices at least 2 apart, the subarray between them sums to a
// multiple of k.
function referenceCheckSubarraySum(nums: number[], k: number): boolean {
	const remainderIndex = new Map<number, number>();
	remainderIndex.set(0, -1);
	let sum = 0;
	for (let i = 0; i < nums.length; i++) {
		sum += nums[i];
		const remainder = k === 0 ? sum : sum % k;
		if (remainderIndex.has(remainder)) {
			if (i - remainderIndex.get(remainder)! > 1) return true;
		} else {
			remainderIndex.set(remainder, i);
		}
	}
	return false;
}

export const continuousSubarraySumHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[23, 2, 4, 6, 7], 6],
			[[23, 2, 6, 4, 7], 6],
			[[23, 2, 6, 4, 7], 13],
			[[1, 0], 2],
			[[1, 1], 2],
			[[0, 0], 1],
		];
		for (const [nums, k] of tests) {
			const expected = referenceCheckSubarraySum(nums, k);
			const result = fn([...nums], k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from continuousSubarraySumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeContinuousSubarraySumJS = `function checkSubarraySum(nums, k) {
  // Write your code here
};`;

export const continuousSubarraySum: Problem = {
	id: "continuous-subarray-sum",
	title: "24. Continuous Subarray Sum",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> and an integer <code>k</code>, return <code>true</code>
    if <code>nums</code> has a contiguous subarray of size <strong>at least two</strong> whose
    elements sum to a multiple of <code>k</code>, or <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    A sum that is a multiple of <code>k</code> means there exists an integer <code>n</code> such
    that the subarray's sum equals <code>n * k</code>. Note that <code>n = 0</code> is valid, so a
    subarray summing to <code>0</code> always counts as a multiple of any <code>k</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [23,2,4,6,7], k = 6`,
			outputText: `true`,
			explanation: "[2,4] sums to 6, which is a multiple of 6.",
		},
		{
			id: 1,
			inputText: `nums = [23,2,6,4,7], k = 6`,
			outputText: `true`,
			explanation: "[23,2,6,4,7] sums to 42, which is a multiple of 6, and has length 5 >= 2.",
		},
		{
			id: 2,
			inputText: `nums = [23,2,6,4,7], k = 13`,
			outputText: `false`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 10^9</code></li>
  <li class='mt-2'><code>0 <= sum(nums[i]) <= 2^31 - 1</code></li>
  <li class='mt-2'><code>1 <= k <= 2^31 - 1</code></li>`,
	starterCode: starterCodeContinuousSubarraySumJS,
	handlerFunction: continuousSubarraySumHandler,
	starterFunctionName: "function checkSubarraySum(",
	order: 24,
};
