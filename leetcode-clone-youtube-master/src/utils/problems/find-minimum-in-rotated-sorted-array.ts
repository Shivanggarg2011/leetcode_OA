import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: binary search for the rotation point in a distinct-value rotated array
function referenceFindMin(nums: number[]): number {
	let lo = 0;
	let hi = nums.length - 1;
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (nums[mid] > nums[hi]) lo = mid + 1;
		else hi = mid;
	}
	return nums[lo];
}

export const findMinimumInRotatedSortedArrayHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[3, 4, 5, 1, 2],
			[4, 5, 6, 7, 0, 1, 2],
			[11, 13, 15, 17],
			[1],
			[2, 1],
			[5, 1, 2, 3, 4],
		];
		for (const nums of tests) {
			const expected = referenceFindMin(nums);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from findMinimumInRotatedSortedArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFindMinimumInRotatedSortedArrayJS = `function findMin(nums) {
  // Write your code here
};`;

export const findMinimumInRotatedSortedArray: Problem = {
	id: "find-minimum-in-rotated-sorted-array",
	title: "81. Find Minimum in Rotated Sorted Array",
	problemStatement: `<p class='mt-3'>
    Suppose an ascending, <strong>distinct-valued</strong> array <code>nums</code> was rotated at some
    unknown pivot, for example <code>[0,1,2,4,5,6,7]</code> could become <code>[4,5,6,7,0,1,2]</code>.
  </p>
  <p class='mt-3'>
    Given the rotated array <code>nums</code>, return the minimum element of the array. Your algorithm
    should run in <code>O(log n)</code> time.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [3,4,5,1,2]",
			outputText: "1",
		},
		{
			id: 1,
			inputText: "nums = [4,5,6,7,0,1,2]",
			outputText: "0",
		},
		{
			id: 2,
			inputText: "nums = [11,13,15,17]",
			outputText: "11",
			explanation: "The array was not rotated, so the minimum is the first element.",
		},
	],
	constraints: `<li class='mt-2'><code>n == nums.length</code></li>
<li class='mt-2'><code>1 <= n <= 5000</code></li>
<li class='mt-2'><code>-5000 <= nums[i] <= 5000</code></li>
<li class='mt-2'>All the integers of <code>nums</code> are unique.</li>`,
	starterCode: starterCodeFindMinimumInRotatedSortedArrayJS,
	handlerFunction: findMinimumInRotatedSortedArrayHandler,
	starterFunctionName: "function findMin(",
	order: 81,
};
