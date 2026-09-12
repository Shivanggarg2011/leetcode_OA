import assert from "assert";
import { Problem } from "../types/problem";

// A peak element is strictly greater than both of its (out-of-bounds-safe) neighbors. Since an array
// can have several valid peaks, this checks the returned index actually satisfies the peak property
// rather than comparing against one hardcoded index.
function isPeakIndex(nums: number[], idx: number): boolean {
	if (!Number.isInteger(idx) || idx < 0 || idx >= nums.length) return false;
	const left = idx === 0 ? -Infinity : nums[idx - 1];
	const right = idx === nums.length - 1 ? -Infinity : nums[idx + 1];
	return nums[idx] > left && nums[idx] > right;
}

export const findPeakElementHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 3, 1],
			[1, 2, 1, 3, 5, 6, 4],
			[1],
			[1, 2],
			[2, 1],
			[1, 2, 3, 4, 5],
		];
		for (const nums of tests) {
			const result = fn([...nums]);
			assert.equal(isPeakIndex(nums, result), true);
		}
		return true;
	} catch (error: any) {
		console.log("Error from findPeakElementHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFindPeakElementJS = `function findPeakElement(nums) {
  // Write your code here
};`;

export const findPeakElement: Problem = {
	id: "find-peak-element",
	title: "88. Find Peak Element",
	problemStatement: `<p class='mt-3'>
    A peak element is an element that is strictly greater than both of its neighbors. Given an integer
    array <code>nums</code>, find a peak element and return its index.
  </p>
  <p class='mt-3'>
    If the array contains several peaks, returning the index of <strong>any</strong> one of them is
    fine. You may imagine that <code>nums[-1] = nums[n] = -infinity</code>, so an element at either end
    of the array only needs to beat the single neighbor it has to count as a peak.
  </p>
  <p class='mt-3'>You must write an algorithm that runs in <code>O(log n)</code> time.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,2,3,1]",
			outputText: "2",
			explanation: "3 is a peak element, and index 2 is a valid answer.",
		},
		{
			id: 1,
			inputText: "nums = [1,2,1,3,5,6,4]",
			outputText: "5",
			explanation: "The value 6 at index 5 is a peak (index 1 with value 2 is also a valid peak).",
		},
		{
			id: 2,
			inputText: "nums = [1]",
			outputText: "0",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 1000</code></li>
<li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
<li class='mt-2'><code>nums[i] != nums[i + 1]</code> for all valid <code>i</code>.</li>`,
	starterCode: starterCodeFindPeakElementJS,
	handlerFunction: findPeakElementHandler,
	starterFunctionName: "function findPeakElement(",
	order: 88,
};
