import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: classic modified binary search on a rotated sorted array
function referenceSearch(nums: number[], target: number): number {
	let lo = 0;
	let hi = nums.length - 1;
	while (lo <= hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (nums[mid] === target) return mid;
		if (nums[lo] <= nums[mid]) {
			if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
			else lo = mid + 1;
		} else {
			if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
			else hi = mid - 1;
		}
	}
	return -1;
}

export const searchInRotatedSortedArrayHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[4, 5, 6, 7, 0, 1, 2], 0],
			[[4, 5, 6, 7, 0, 1, 2], 3],
			[[1], 0],
			[[1], 1],
			[[5, 1, 3], 5],
			[[3, 1], 1],
		];
		for (const [nums, target] of tests) {
			const expected = referenceSearch(nums, target);
			const result = fn(nums, target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from searchInRotatedSortedArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSearchInRotatedSortedArrayJS = `function search(nums, target) {
  // Write your code here
};`;

export const searchInRotatedSortedArray: Problem = {
	id: "search-in-rotated-sorted-array",
	title: "79. Search in Rotated Sorted Array",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code>, sorted in ascending order with <strong>distinct</strong> values,
    that has possibly been rotated at some unknown pivot.
  </p>
  <p class='mt-3'>
    For example, <code>[0,1,2,4,5,6,7]</code> might become <code>[4,5,6,7,0,1,2]</code> after being rotated.
  </p>
  <p class='mt-3'>
    Given the rotated array <code>nums</code> and an integer <code>target</code>, return the index of
    <code>target</code> if it exists in <code>nums</code>, or <code>-1</code> if it does not. Your
    algorithm should run in <code>O(log n)</code> time.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [4,5,6,7,0,1,2], target = 0",
			outputText: "4",
		},
		{
			id: 1,
			inputText: "nums = [4,5,6,7,0,1,2], target = 3",
			outputText: "-1",
		},
		{
			id: 2,
			inputText: "nums = [1], target = 0",
			outputText: "-1",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 5000</code></li>
<li class='mt-2'>Every value in <code>nums</code> is unique.</li>
<li class='mt-2'><code>nums</code> is an ascending array that has possibly been rotated.</li>
<li class='mt-2'><code>-10^4 <= target, nums[i] <= 10^4</code></li>`,
	starterCode: starterCodeSearchInRotatedSortedArrayJS,
	handlerFunction: searchInRotatedSortedArrayHandler,
	starterFunctionName: "function search(",
	order: 79,
};
