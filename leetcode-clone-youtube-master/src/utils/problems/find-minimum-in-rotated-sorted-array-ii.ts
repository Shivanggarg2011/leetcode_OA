import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: binary search that shrinks the high pointer on ties to handle duplicates
function referenceFindMin(nums: number[]): number {
	let lo = 0;
	let hi = nums.length - 1;
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (nums[mid] > nums[hi]) lo = mid + 1;
		else if (nums[mid] < nums[hi]) hi = mid;
		else hi--;
	}
	return nums[lo];
}

export const findMinimumInRotatedSortedArrayIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 3, 5],
			[2, 2, 2, 0, 1],
			[4, 5, 6, 7, 0, 1, 4],
			[1, 1, 1],
			[3, 1, 3],
			[1],
		];
		for (const nums of tests) {
			const expected = referenceFindMin(nums);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from findMinimumInRotatedSortedArrayIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFindMinimumInRotatedSortedArrayIiJS = `function findMin(nums) {
  // Write your code here
};`;

export const findMinimumInRotatedSortedArrayIi: Problem = {
	id: "find-minimum-in-rotated-sorted-array-ii",
	title: "82. Find Minimum in Rotated Sorted Array II",
	problemStatement: `<p class='mt-3'>
    Suppose an ascending array <code>nums</code>, which may contain <strong>duplicate</strong> values, was
    rotated at some unknown pivot, for example <code>[1,2,2,2,3]</code> could become <code>[2,2,3,1,2]</code>.
  </p>
  <p class='mt-3'>
    Given the rotated array <code>nums</code>, return the minimum element of the array. Try to minimize
    the number of comparisons, though duplicates may force <code>O(n)</code> in the worst case.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,3,5]",
			outputText: "1",
		},
		{
			id: 1,
			inputText: "nums = [2,2,2,0,1]",
			outputText: "0",
		},
		{
			id: 2,
			inputText: "nums = [4,5,6,7,0,1,4]",
			outputText: "0",
		},
	],
	constraints: `<li class='mt-2'><code>n == nums.length</code></li>
<li class='mt-2'><code>1 <= n <= 5000</code></li>
<li class='mt-2'><code>-5000 <= nums[i] <= 5000</code></li>`,
	starterCode: starterCodeFindMinimumInRotatedSortedArrayIiJS,
	handlerFunction: findMinimumInRotatedSortedArrayIiHandler,
	starterFunctionName: "function findMin(",
	order: 82,
};
