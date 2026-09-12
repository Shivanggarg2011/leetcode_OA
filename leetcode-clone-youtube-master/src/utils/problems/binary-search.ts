import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: classic iterative binary search over a sorted array
function referenceSearch(nums: number[], target: number): number {
	let left = 0;
	let right = nums.length - 1;
	while (left <= right) {
		const mid = left + Math.floor((right - left) / 2);
		if (nums[mid] === target) return mid;
		if (nums[mid] < target) left = mid + 1;
		else right = mid - 1;
	}
	return -1;
}

export const binarySearchHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[-1, 0, 3, 5, 9, 12], 9],
			[[-1, 0, 3, 5, 9, 12], 2],
			[[5], 5],
			[[5], -5],
			[[1, 3, 5, 7, 9, 11, 13], 1],
			[[1, 3, 5, 7, 9, 11, 13], 13],
		];
		for (const [nums, target] of tests) {
			const expected = referenceSearch([...nums], target);
			const result = fn([...nums], target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from binarySearchHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBinarySearchJS = `function search(nums, target) {
  // Write your code here
};`;

export const binarySearch: Problem = {
	id: "binary-search",
	title: "78. Binary Search",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code> sorted in <strong>ascending order</strong>, with
    all elements <strong>distinct</strong>, and an integer <code>target</code>.
  </p>
  <p class='mt-3'>
    Write a function that searches for <code>target</code> in <code>nums</code>. If it exists, return
    its index; otherwise return <code>-1</code>.
  </p>
  <p class='mt-3'>
    You must write an algorithm with <code>O(log n)</code> runtime complexity.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "nums = [-1,0,3,5,9,12], target = 9",
			outputText: "4",
			explanation: "9 exists in nums and its index is 4.",
		},
		{
			id: 1,
			inputText: "nums = [-1,0,3,5,9,12], target = 2",
			outputText: "-1",
			explanation: "2 does not exist in nums, so -1 is returned.",
		},
		{
			id: 2,
			inputText: "nums = [5], target = 5",
			outputText: "0",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
<li class='mt-2'><code>-10^4 < nums[i], target < 10^4</code></li>
<li class='mt-2'>All the integers in <code>nums</code> are unique</li>
<li class='mt-2'><code>nums</code> is sorted in ascending order</li>`,
	starterCode: starterCodeBinarySearchJS,
	handlerFunction: binarySearchHandler,
	starterFunctionName: "function search(",
	order: 78,
};
