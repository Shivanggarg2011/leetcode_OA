import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: since the array is sorted, duplicates are always
// adjacent, so keeping only the first occurrence of each run gives the
// unique elements in order.
function referenceRemoveDuplicates(nums: number[]): number[] {
	const result: number[] = [];
	for (const n of nums) {
		if (result.length === 0 || result[result.length - 1] !== n) {
			result.push(n);
		}
	}
	return result;
}

export const removeDuplicatesFromSortedArrayHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 1, 2],
			[0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
			[1],
			[1, 2, 3],
			[1, 1, 1, 1],
			[-3, -3, -1, 0, 0, 0, 5, 5],
		];
		for (const test of tests) {
			const expectedUnique = referenceRemoveDuplicates(test);
			const input = [...test];
			const returnedLength = fn(input);

			// The classic signature returns the new length k and mutates nums
			// in place so its first k elements hold the unique values in order.
			// Also accept an implementation that simply returns the unique array.
			if (Array.isArray(returnedLength)) {
				assert.deepStrictEqual(returnedLength, expectedUnique);
			} else {
				assert.equal(returnedLength, expectedUnique.length);
				assert.deepStrictEqual(input.slice(0, expectedUnique.length), expectedUnique);
			}
		}
		return true;
	} catch (error: any) {
		console.log("Error from removeDuplicatesFromSortedArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRemoveDuplicatesFromSortedArrayJS = `function removeDuplicates(nums) {
  // Write your code here.
  // Modify nums in place so the unique elements (in order) occupy the
  // front of the array, and return the count of unique elements.
};`;

export const removeDuplicatesFromSortedArray: Problem = {
	id: "remove-duplicates-from-sorted-array",
	title: "26. Remove Duplicates from Sorted Array",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> sorted in non-decreasing order, remove the duplicates
    in place so that each unique value appears only once, keeping the relative order of the
    elements.
  </p>
  <p class='mt-3'>
    Since some languages can't resize an array, you should instead move the unique elements to
    the front of <code>nums</code> and return <code>k</code>, the number of unique elements. It
    does not matter what you leave beyond the first <code>k</code> positions.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,1,2]`,
			outputText: `2`,
			explanation: "nums becomes [1,2,...] and the function returns k = 2.",
		},
		{
			id: 1,
			inputText: `nums = [0,0,1,1,1,2,2,3,3,4]`,
			outputText: `5`,
			explanation: "nums becomes [0,1,2,3,4,...] and the function returns k = 5.",
		},
		{
			id: 2,
			inputText: `nums = [1,2,3]`,
			outputText: `3`,
			explanation: "There are no duplicates, so all three elements are kept.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>-100 <= nums[i] <= 100</code></li>
  <li class='mt-2'><code>nums</code> is sorted in non-decreasing order.</li>`,
	starterCode: starterCodeRemoveDuplicatesFromSortedArrayJS,
	handlerFunction: removeDuplicatesFromSortedArrayHandler,
	starterFunctionName: "function removeDuplicates(",
	order: 26,
};
