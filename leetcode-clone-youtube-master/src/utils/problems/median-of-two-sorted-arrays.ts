import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: merge (conceptually) and pick the middle value(s) - not O(log(m+n)) but
// straightforward and clearly correct as a source of truth
function referenceMedian(nums1: number[], nums2: number[]): number {
	const merged = [...nums1, ...nums2].sort((a, b) => a - b);
	const n = merged.length;
	if (n % 2 === 1) return merged[(n - 1) / 2];
	return (merged[n / 2 - 1] + merged[n / 2]) / 2;
}

export const medianOfTwoSortedArraysHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[[1, 3], [2]],
			[[1, 2], [3, 4]],
			[[0, 0], [0, 0]],
			[[], [1]],
			[[2], []],
			[[1, 3, 5], [2, 4, 6]],
		];
		for (const [nums1, nums2] of tests) {
			const expected = referenceMedian(nums1, nums2);
			const result = fn([...nums1], [...nums2]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from medianOfTwoSortedArraysHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMedianOfTwoSortedArraysJS = `function findMedianSortedArrays(nums1, nums2) {
  // Write your code here
};`;

export const medianOfTwoSortedArrays: Problem = {
	id: "median-of-two-sorted-arrays",
	title: "84. Median of Two Sorted Arrays",
	problemStatement: `<p class='mt-3'>
    You are given two sorted arrays <code>nums1</code> and <code>nums2</code> of sizes <code>m</code>
    and <code>n</code> respectively.
  </p>
  <p class='mt-3'>
    Return <em>the median</em> of the two sorted arrays, as if they had been merged into a single sorted
    array. Aim for an overall run time complexity of <code>O(log(m+n))</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums1 = [1,3], nums2 = [2]",
			outputText: "2.0",
			explanation: "The merged array is [1,2,3], and its median is 2.",
		},
		{
			id: 1,
			inputText: "nums1 = [1,2], nums2 = [3,4]",
			outputText: "2.5",
			explanation: "The merged array is [1,2,3,4], and its median is (2 + 3) / 2 = 2.5.",
		},
		{
			id: 2,
			inputText: "nums1 = [], nums2 = [1]",
			outputText: "1.0",
		},
	],
	constraints: `<li class='mt-2'><code>nums1.length == m</code></li>
<li class='mt-2'><code>nums2.length == n</code></li>
<li class='mt-2'><code>0 <= m, n <= 1000</code></li>
<li class='mt-2'><code>1 <= m + n <= 2000</code></li>
<li class='mt-2'><code>-10^6 <= nums1[i], nums2[i] <= 10^6</code></li>`,
	starterCode: starterCodeMedianOfTwoSortedArraysJS,
	handlerFunction: medianOfTwoSortedArraysHandler,
	starterFunctionName: "function findMedianSortedArrays(",
	order: 84,
};
