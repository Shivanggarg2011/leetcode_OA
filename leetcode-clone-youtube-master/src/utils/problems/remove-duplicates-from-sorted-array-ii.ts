import assert from "assert";
import { Problem } from "../types/problem";

export const removeDuplicatesFromSortedArrayIiHandler = (fn: any) => {
	try {
		function referenceSolution(nums: number[]): number[] {
			const result: number[] = [];
			for (const n of nums) {
				const len = result.length;
				if (len < 2 || result[len - 1] !== n || result[len - 2] !== n) {
					result.push(n);
				}
			}
			return result;
		}

		const tests: number[][] = [
			[1, 1, 1, 2, 2, 3],
			[0, 0, 1, 1, 1, 1, 2, 3, 3],
			[1, 1],
			[1],
			[1, 1, 1, 1, 1],
		];

		for (const nums of tests) {
			const expected = referenceSolution(nums);
			const numsCopy = [...nums];
			const k = fn(numsCopy);
			assert.equal(k, expected.length);
			assert.deepStrictEqual(numsCopy.slice(0, k), expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from removeDuplicatesFromSortedArrayIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRemoveDuplicatesFromSortedArrayIiJS = `function removeDuplicates(nums) {
  // Write your code here
};`;

export const removeDuplicatesFromSortedArrayIi: Problem = {
	id: "remove-duplicates-from-sorted-array-ii",
	title: "39. Remove Duplicates from Sorted Array II",
	problemStatement: `<p class='mt-3'>
    Given a sorted integer array <code>nums</code>, remove some duplicates <strong>in place</strong> so
    that each unique value appears <strong>at most twice</strong>. The relative order of the elements
    must be kept the same.
  </p>
  <p class='mt-3'>
    Since the array's length cannot change, overwrite the first <code>k</code> slots of
    <code>nums</code> with the final result, where <code>k</code> is the number of elements kept. The
    contents of <code>nums</code> beyond index <code>k</code> do not matter. Return <code>k</code>.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,1,1,2,2,3]",
			outputText: "k = 5, nums = [1,1,2,2,3,_]",
		},
		{
			id: 1,
			inputText: "nums = [0,0,1,1,1,1,2,3,3]",
			outputText: "k = 7, nums = [0,0,1,1,2,3,3,_,_]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>
  <li class='mt-2'><code>nums</code> is sorted in non-decreasing order.</li>`,
	starterCode: starterCodeRemoveDuplicatesFromSortedArrayIiJS,
	handlerFunction: removeDuplicatesFromSortedArrayIiHandler,
	starterFunctionName: "function removeDuplicates(",
	order: 39,
};
