import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: rotating right by k is the same as taking the last
// k elements (wrapped) and putting them in front of the rest.
function referenceRotate(nums: number[], k: number): number[] {
	const n = nums.length;
	if (n === 0) return [];
	const shift = ((k % n) + n) % n;
	return [...nums.slice(n - shift), ...nums.slice(0, n - shift)];
}

export const rotateArrayHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 2, 3, 4, 5, 6, 7], 3],
			[[-1, -100, 3, 99], 2],
			[[1, 2], 3],
			[[1], 0],
			[[1, 2, 3, 4], 4],
			[[5, 6, 7, 8, 9, 10], 8],
		];
		for (const [nums, k] of tests) {
			const expected = referenceRotate(nums, k);
			const input = [...nums];
			const returned = fn(input, k);
			const actual = Array.isArray(returned) ? returned : input;
			assert.deepStrictEqual(actual, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from rotateArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeRotateArrayJS = `function rotate(nums, k) {
  // Write your code here.
  // Rotate nums in place (or return the resulting array).
};`;

export const rotateArray: Problem = {
	id: "rotate-array",
	title: "20. Rotate Array",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code>
    steps, where <code>k</code> is non-negative.
  </p>
  <p class='mt-3'>
    For example, rotating right means the last element moves to the front, repeated <code>k</code>
    times. Note that <code>k</code> can be larger than the length of the array, in which case it
    wraps around.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3,4,5,6,7], k = 3`,
			outputText: `[5,6,7,1,2,3,4]`,
		},
		{
			id: 1,
			inputText: `nums = [-1,-100,3,99], k = 2`,
			outputText: `[3,99,-1,-100]`,
		},
		{
			id: 2,
			inputText: `nums = [1,2], k = 3`,
			outputText: `[2,1]`,
			explanation: "Rotating by 3 on a 2-element array is the same as rotating by 1.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
  <li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
  <li class='mt-2'><code>0 <= k <= 10^5</code></li>`,
	starterCode: starterCodeRotateArrayJS,
	handlerFunction: rotateArrayHandler,
	starterFunctionName: "function rotate(",
	order: 20,
};
