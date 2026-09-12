import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: two lower-bound binary searches to find the first and last occurrence
function lowerBound(nums: number[], target: number): number {
	let lo = 0;
	let hi = nums.length;
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (nums[mid] < target) lo = mid + 1;
		else hi = mid;
	}
	return lo;
}

function referenceSearchRange(nums: number[], target: number): [number, number] {
	const first = lowerBound(nums, target);
	if (first === nums.length || nums[first] !== target) return [-1, -1];
	const last = lowerBound(nums, target + 1) - 1;
	return [first, last];
}

export const findFirstAndLastPositionOfElementInSortedArrayHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[5, 7, 7, 8, 8, 10], 8],
			[[5, 7, 7, 8, 8, 10], 6],
			[[], 0],
			[[1], 1],
			[[2, 2, 2, 2], 2],
			[[1, 2, 3], 3],
		];
		for (const [nums, target] of tests) {
			const expected = referenceSearchRange(nums, target);
			const result = fn([...nums], target);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from findFirstAndLastPositionOfElementInSortedArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFindFirstAndLastPositionOfElementInSortedArrayJS = `function searchRange(nums, target) {
  // Write your code here
};`;

export const findFirstAndLastPositionOfElementInSortedArray: Problem = {
	id: "find-first-and-last-position-of-element-in-sorted-array",
	title: "91. Find First and Last Position of Element in Sorted Array",
	problemStatement: `<p class='mt-3'>
    Given an array of integers <code>nums</code> sorted in ascending order and a value
    <code>target</code>, find the starting and ending index of the given <code>target</code>.
  </p>
  <p class='mt-3'>
    Return <code>[first, last]</code> where <code>first</code> and <code>last</code> are the indices of
    the first and last occurrence of <code>target</code> in <code>nums</code>. If <code>target</code>
    is not present, return <code>[-1, -1]</code>.
  </p>
  <p class='mt-3'>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [5,7,7,8,8,10], target = 8",
			outputText: "[3,4]",
		},
		{
			id: 1,
			inputText: "nums = [5,7,7,8,8,10], target = 6",
			outputText: "[-1,-1]",
		},
		{
			id: 2,
			inputText: "nums = [], target = 0",
			outputText: "[-1,-1]",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= nums.length <= 10^5</code></li>
<li class='mt-2'><code>-10^9 <= nums[i], target <= 10^9</code></li>
<li class='mt-2'><code>nums</code> is sorted in non-decreasing order.</li>`,
	starterCode: starterCodeFindFirstAndLastPositionOfElementInSortedArrayJS,
	handlerFunction: findFirstAndLastPositionOfElementInSortedArrayHandler,
	starterFunctionName: "function searchRange(",
	order: 91,
};
