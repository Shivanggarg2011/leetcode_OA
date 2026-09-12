import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: sort descending and index in (duplicates count as
// separate entries, matching the "kth largest in sorted order" definition).
function referenceFindKthLargest(nums: number[], k: number): number {
	const sorted = [...nums].sort((a, b) => b - a);
	return sorted[k - 1];
}

export const kthLargestElementInAnArrayHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[3, 2, 1, 5, 6, 4], 2],
			[[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
			[[1], 1],
			[[2, 1], 1],
			[[7, 6, 5, 4, 3, 2, 1], 5],
			[[-1, -2, -3, -4], 2],
		];

		for (const [nums, k] of tests) {
			const expected = referenceFindKthLargest(nums, k);
			const result = fn([...nums], k);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from kthLargestElementInAnArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeKthLargestElementInAnArrayJS = `function findKthLargest(nums, k) {
  // Write your code here
};`;

export const kthLargestElementInAnArray: Problem = {
	id: "kth-largest-element-in-an-array",
	title: "137. Kth Largest Element in an Array",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> and an integer <code>k</code>, return the
    <code>k</code>th largest element in the array.
  </p>
  <p class='mt-3'>
    Note that it is the <code>k</code>th largest element when the array is sorted, not the
    <code>k</code>th distinct value — duplicates each count as their own element.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [3,2,1,5,6,4], k = 2`,
			outputText: `5`,
		},
		{
			id: 1,
			inputText: `nums = [3,2,3,1,2,4,5,5,6], k = 4`,
			outputText: `4`,
		},
		{
			id: 2,
			inputText: `nums = [1], k = 1`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= k <= nums.length <= 10^4</code></li>
  <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>`,
	starterCode: starterCodeKthLargestElementInAnArrayJS,
	handlerFunction: kthLargestElementInAnArrayHandler,
	starterFunctionName: "function findKthLargest(",
	order: 137,
};
