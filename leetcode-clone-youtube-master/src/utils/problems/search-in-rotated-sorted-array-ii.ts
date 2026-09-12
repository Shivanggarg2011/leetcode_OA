import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: modified binary search that also tolerates duplicate values
function referenceSearch(nums: number[], target: number): boolean {
	let lo = 0;
	let hi = nums.length - 1;
	while (lo <= hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (nums[mid] === target) return true;
		if (nums[lo] === nums[mid] && nums[mid] === nums[hi]) {
			lo++;
			hi--;
			continue;
		}
		if (nums[lo] <= nums[mid]) {
			if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
			else lo = mid + 1;
		} else {
			if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
			else hi = mid - 1;
		}
	}
	return false;
}

export const searchInRotatedSortedArrayIiHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[2, 5, 6, 0, 0, 1, 2], 0],
			[[2, 5, 6, 0, 0, 1, 2], 3],
			[[1, 0, 1, 1, 1], 0],
			[[1, 1, 1, 1, 1], 2],
			[[], 1],
			[[1], 1],
		];
		for (const [nums, target] of tests) {
			const expected = referenceSearch(nums, target);
			const result = fn(nums, target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from searchInRotatedSortedArrayIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSearchInRotatedSortedArrayIiJS = `function search(nums, target) {
  // Write your code here
};`;

export const searchInRotatedSortedArrayIi: Problem = {
	id: "search-in-rotated-sorted-array-ii",
	title: "80. Search in Rotated Sorted Array II",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code>, sorted in ascending order but possibly containing
    <strong>duplicate</strong> values, which has possibly been rotated at some unknown pivot.
  </p>
  <p class='mt-3'>
    Given the rotated array <code>nums</code> and an integer <code>target</code>, return <code>true</code>
    if <code>target</code> exists in <code>nums</code>, or <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    Because duplicates are allowed, you cannot always guarantee <code>O(log n)</code> runtime, but your
    solution should still avoid a plain linear scan whenever possible.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [2,5,6,0,0,1,2], target = 0",
			outputText: "true",
		},
		{
			id: 1,
			inputText: "nums = [2,5,6,0,0,1,2], target = 3",
			outputText: "false",
		},
		{
			id: 2,
			inputText: "nums = [1,0,1,1,1], target = 0",
			outputText: "true",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 5000</code></li>
<li class='mt-2'><code>-10^4 <= nums[i], target <= 10^4</code></li>
<li class='mt-2'><code>nums</code> is guaranteed to be sorted and then possibly rotated.</li>`,
	starterCode: starterCodeSearchInRotatedSortedArrayIiJS,
	handlerFunction: searchInRotatedSortedArrayIiHandler,
	starterFunctionName: "function search(",
	order: 80,
};
