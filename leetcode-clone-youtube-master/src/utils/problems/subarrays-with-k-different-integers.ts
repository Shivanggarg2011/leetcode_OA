import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: count of subarrays with exactly k distinct = atMost(k) - atMost(k-1)
function countAtMostKDistinct(nums: number[], k: number): number {
	if (k < 0) return 0;
	const count = new Map<number, number>();
	let left = 0;
	let total = 0;
	for (let right = 0; right < nums.length; right++) {
		count.set(nums[right], (count.get(nums[right]) || 0) + 1);
		while (count.size > k) {
			const leftVal = nums[left];
			count.set(leftVal, count.get(leftVal)! - 1);
			if (count.get(leftVal) === 0) count.delete(leftVal);
			left++;
		}
		total += right - left + 1;
	}
	return total;
}

function referenceSubarraysWithKDistinct(nums: number[], k: number): number {
	return countAtMostKDistinct(nums, k) - countAtMostKDistinct(nums, k - 1);
}

export const subarraysWithKDifferentIntegersHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 2, 1, 2, 3], 2],
			[[1, 2, 1, 3, 4], 3],
			[[1, 2, 1, 2, 1], 2],
			[[1], 1],
			[[1, 2, 3], 1],
			[[1, 2, 1, 3, 4], 1],
		];
		for (const [nums, k] of tests) {
			const expected = referenceSubarraysWithKDistinct([...nums], k);
			const result = fn([...nums], k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from subarraysWithKDifferentIntegersHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSubarraysWithKDifferentIntegersJS = `function subarraysWithKDistinct(nums, k) {
  // Write your code here
};`;

export const subarraysWithKDifferentIntegers: Problem = {
	id: "subarrays-with-k-different-integers",
	title: "59. Subarrays with K Different Integers",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> and an integer <code>k</code>, return the number of
    contiguous subarrays that contain <strong>exactly</strong> <code>k</code> different integers.
  </p>
  <p class='mt-3'>
    For example, <code>[1,2,1,2,3]</code> has <code>3</code> good subarrays with exactly <code>1</code>
    different integer: <code>[1]</code>, <code>[2]</code>, <code>[1]</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,2,1,2,3], k = 2",
			outputText: "7",
			explanation: "Subarrays with exactly 2 distinct values: [1,2],[2,1],[1,2],[2,3],[1,2,1],[2,1,2],[1,2,1,2].",
		},
		{
			id: 1,
			inputText: "nums = [1,2,1,3,4], k = 3",
			outputText: "3",
		},
		{
			id: 2,
			inputText: "nums = [1,2,3], k = 1",
			outputText: "3",
			explanation: "Only the single-element subarrays [1], [2], and [3] have exactly 1 distinct value.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 2 * 10^4</code></li>
<li class='mt-2'><code>1 <= nums[i], k <= nums.length</code></li>`,
	starterCode: starterCodeSubarraysWithKDifferentIntegersJS,
	handlerFunction: subarraysWithKDifferentIntegersHandler,
	starterFunctionName: "function subarraysWithKDistinct(",
	order: 59,
};
