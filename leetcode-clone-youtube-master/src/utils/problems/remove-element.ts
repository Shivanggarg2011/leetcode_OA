import assert from "assert";
import { Problem } from "../types/problem";

export const removeElementHandler = (fn: any) => {
	try {
		function referenceSolution(nums: number[], val: number): number[] {
			return nums.filter((n) => n !== val);
		}

		const tests: [number[], number][] = [
			[[3, 2, 2, 3], 3],
			[[0, 1, 2, 2, 3, 0, 4, 2], 2],
			[[], 1],
			[[4, 4, 4, 4], 4],
			[[1, 2, 3, 4], 10],
			[[7], 7],
		];

		for (const [nums, val] of tests) {
			const numsCopy = [...nums];
			const expected = referenceSolution(nums, val);
			const k = fn(numsCopy, val);
			assert.equal(k, expected.length);
			assert.deepStrictEqual(numsCopy.slice(0, k), expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from removeElementHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRemoveElementJS = `function removeElement(nums, val) {
  // Write your code here
};`;

export const removeElement: Problem = {
	id: "remove-element",
	title: "27. Remove Element",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>nums</code> and an integer <code>val</code>. Remove every occurrence
    of <code>val</code> from <code>nums</code> <strong>in place</strong>, keeping the relative order of
    the remaining elements the same.
  </p>
  <p class='mt-3'>
    Since you cannot change the length of an array in place, overwrite the first <code>k</code> slots of
    <code>nums</code> with the elements that are not equal to <code>val</code>, where <code>k</code> is the
    number of such elements. The contents of <code>nums</code> after index <code>k</code> do not matter.
  </p>
  <p class='mt-3'>Return the integer <code>k</code> after modifying <code>nums</code> in place.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [3,2,2,3], val = 3",
			outputText: "k = 2, nums = [2,2,_,_]",
			explanation: "The two 2's are kept at the front of the array, in their original order.",
		},
		{
			id: 1,
			inputText: "nums = [0,1,2,2,3,0,4,2], val = 2",
			outputText: "k = 5, nums = [0,1,3,0,4,_,_,_]",
			explanation: "All elements not equal to 2 are moved to the front, keeping their relative order.",
		},
		{
			id: 2,
			inputText: "nums = [], val = 1",
			outputText: "k = 0",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= nums.length <= 100</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 50</code></li>
  <li class='mt-2'><code>0 <= val <= 100</code></li>`,
	starterCode: starterCodeRemoveElementJS,
	handlerFunction: removeElementHandler,
	starterFunctionName: "function removeElement(",
	order: 27,
};
