import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: fixed-size sliding window sum
function referenceFindMaxAverage(nums: number[], k: number): number {
	let sum = 0;
	for (let i = 0; i < k; i++) sum += nums[i];
	let best = sum;
	for (let i = k; i < nums.length; i++) {
		sum += nums[i] - nums[i - k];
		best = Math.max(best, sum);
	}
	return best / k;
}

export const maximumAverageSubarrayIHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 12, -5, -6, 50, 3], 4],
			[[5], 1],
			[[0, 4, 0, 3, 2], 1],
			[[-1, -2, -3, -4], 2],
			[[1, 1, 1, 1, 1, 1], 3],
		];
		for (const [nums, k] of tests) {
			const expected = referenceFindMaxAverage([...nums], k);
			const result = fn([...nums], k);
			assert(
				Math.abs(result - expected) < 1e-5,
				`Expected ${expected} but got ${result} for nums=${JSON.stringify(nums)}, k=${k}`
			);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maximumAverageSubarrayIHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaximumAverageSubarrayIJS = `function findMaxAverage(nums, k) {
  // Write your code here
};`;

export const maximumAverageSubarrayI: Problem = {
	id: "maximum-average-subarray-i",
	title: "58. Maximum Average Subarray I",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code> and an integer <code>k</code>.
  </p>
  <p class='mt-3'>
    Find a contiguous subarray of length exactly <code>k</code> whose average value is
    <strong>maximum</strong>, and return that average.
  </p>
  <p class='mt-3'>
    Any answer within <code>10^-5</code> of the true value will be accepted.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,12,-5,-6,50,3], k = 4",
			outputText: "12.75",
			explanation: "The subarray [12,-5,-6,50] has average (12-5-6+50)/4 = 51/4 = 12.75.",
		},
		{
			id: 1,
			inputText: "nums = [5], k = 1",
			outputText: "5.0",
		},
		{
			id: 2,
			inputText: "nums = [0,4,0,3,2], k = 1",
			outputText: "4.0",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= k <= nums.length <= 10^5</code></li>
<li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>`,
	starterCode: starterCodeMaximumAverageSubarrayIJS,
	handlerFunction: maximumAverageSubarrayIHandler,
	starterFunctionName: "function findMaxAverage(",
	order: 58,
};
