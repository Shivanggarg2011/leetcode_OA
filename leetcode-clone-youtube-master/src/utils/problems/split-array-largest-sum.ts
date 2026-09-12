import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: binary search the "largest subarray sum" answer, checking feasibility via a
// greedy count of how many contiguous groups are needed to keep every group's sum under a cap
function referenceSplitArray(nums: number[], m: number): number {
	let lo = Math.max(...nums);
	let hi = nums.reduce((a, b) => a + b, 0);
	const groupsNeeded = (cap: number) => {
		let groups = 1;
		let current = 0;
		for (const n of nums) {
			if (current + n > cap) {
				groups++;
				current = n;
			} else {
				current += n;
			}
		}
		return groups;
	};
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (groupsNeeded(mid) <= m) hi = mid;
		else lo = mid + 1;
	}
	return lo;
}

export const splitArrayLargestSumHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[7, 2, 5, 10, 8], 2],
			[[1, 2, 3, 4, 5], 2],
			[[1, 4, 4], 3],
			[[2, 3, 1, 1, 1, 1], 2],
			[[5], 1],
			[[1, 2, 3, 4, 5], 1],
		];
		for (const [nums, m] of tests) {
			const expected = referenceSplitArray(nums, m);
			const result = fn([...nums], m);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from splitArrayLargestSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSplitArrayLargestSumJS = `function splitArray(nums, m) {
  // Write your code here
};`;

export const splitArrayLargestSum: Problem = {
	id: "split-array-largest-sum",
	title: "87. Split Array Largest Sum",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> and an integer <code>m</code>, split <code>nums</code>
    into <code>m</code> non-empty contiguous subarrays.
  </p>
  <p class='mt-3'>
    Design a split that minimizes the largest sum among these <code>m</code> subarrays, and return
    <em>that minimized largest sum</em>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [7,2,5,10,8], m = 2",
			outputText: "18",
			explanation: "Split into [7,2,5] and [10,8]. The largest sum is max(14, 18) = 18, the smallest possible.",
		},
		{
			id: 1,
			inputText: "nums = [1,2,3,4,5], m = 2",
			outputText: "9",
		},
		{
			id: 2,
			inputText: "nums = [1,4,4], m = 3",
			outputText: "4",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 1000</code></li>
<li class='mt-2'><code>0 <= nums[i] <= 10^6</code></li>
<li class='mt-2'><code>1 <= m <= min(50, nums.length)</code></li>`,
	starterCode: starterCodeSplitArrayLargestSumJS,
	handlerFunction: splitArrayLargestSumHandler,
	starterFunctionName: "function splitArray(",
	order: 87,
};
