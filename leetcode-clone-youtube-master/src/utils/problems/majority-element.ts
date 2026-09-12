import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: Boyer-Moore majority vote algorithm. The problem
// guarantees a majority element always exists, so this is safe.
function referenceMajorityElement(nums: number[]): number {
	let candidate = nums[0];
	let count = 0;
	for (const n of nums) {
		if (count === 0) candidate = n;
		count += n === candidate ? 1 : -1;
	}
	return candidate;
}

export const majorityElementHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[3, 2, 3],
			[2, 2, 1, 1, 1, 2, 2],
			[1],
			[6, 5, 5],
			[4, 4, 4, 4, 1, 2, 3],
			[-1, -1, -1, 2, 2],
		];
		for (const test of tests) {
			const expected = referenceMajorityElement(test);
			const result = fn([...test]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from majorityElementHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMajorityElementJS = `function majorityElement(nums) {
  // Write your code here
};`;

export const majorityElement: Problem = {
	id: "majority-element",
	title: "10. Majority Element",
	problemStatement: `<p class='mt-3'>
    Given an array <code>nums</code> of size <code>n</code>, return the <strong>majority element</strong> —
    the value that appears more than <code>⌊n / 2⌋</code> times.
  </p>
  <p class='mt-3'>
    You may assume the majority element always exists in the array.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [3,2,3]`,
			outputText: `3`,
		},
		{
			id: 1,
			inputText: `nums = [2,2,1,1,1,2,2]`,
			outputText: `2`,
		},
		{
			id: 2,
			inputText: `nums = [1]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>n == nums.length</code></li>
  <li class='mt-2'><code>1 <= n <= 5 * 10^4</code></li>
  <li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>`,
	starterCode: starterCodeMajorityElementJS,
	handlerFunction: majorityElementHandler,
	starterFunctionName: "function majorityElement(",
	order: 10,
};
