import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: standard lower-bound binary search
function referenceSearchInsert(nums: number[], target: number): number {
	let lo = 0;
	let hi = nums.length;
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (nums[mid] < target) lo = mid + 1;
		else hi = mid;
	}
	return lo;
}

export const searchInsertPositionHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 3, 5, 6], 5],
			[[1, 3, 5, 6], 2],
			[[1, 3, 5, 6], 7],
			[[1, 3, 5, 6], 0],
			[[], 5],
			[[5], 5],
		];
		for (const [nums, target] of tests) {
			const expected = referenceSearchInsert(nums, target);
			const result = fn([...nums], target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from searchInsertPositionHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSearchInsertPositionJS = `function searchInsert(nums, target) {
  // Write your code here
};`;

export const searchInsertPosition: Problem = {
	id: "search-insert-position",
	title: "89. Search Insert Position",
	problemStatement: `<p class='mt-3'>
    Given a sorted array of distinct integers <code>nums</code> and a target value <code>target</code>,
    return the index of <code>target</code> if it is found in the array.
  </p>
  <p class='mt-3'>
    If <code>target</code> is not found, return the index where it would be inserted to keep
    <code>nums</code> sorted in ascending order.
  </p>
  <p class='mt-3'>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,3,5,6], target = 5",
			outputText: "2",
		},
		{
			id: 1,
			inputText: "nums = [1,3,5,6], target = 2",
			outputText: "1",
		},
		{
			id: 2,
			inputText: "nums = [1,3,5,6], target = 7",
			outputText: "4",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
<li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>
<li class='mt-2'><code>nums</code> contains distinct values sorted in ascending order.</li>
<li class='mt-2'><code>-10^4 <= target <= 10^4</code></li>`,
	starterCode: starterCodeSearchInsertPositionJS,
	handlerFunction: searchInsertPositionHandler,
	starterFunctionName: "function searchInsert(",
	order: 89,
};
