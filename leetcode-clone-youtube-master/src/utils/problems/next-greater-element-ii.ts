import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: monotonic stack of indices, iterating over the array twice to simulate circularity
function referenceNextGreaterElements(nums: number[]): number[] {
	const n = nums.length;
	const answer = new Array(n).fill(-1);
	const stack: number[] = [];
	for (let i = 0; i < 2 * n; i++) {
		const idx = i % n;
		while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[idx]) {
			answer[stack.pop()!] = nums[idx];
		}
		if (i < n) stack.push(idx);
	}
	return answer;
}

export const nextGreaterElementIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 1],
			[1, 2, 3, 4, 3],
			[5, 5, 5],
			[1],
			[3, 8, 4, 1, 2],
		];
		for (const nums of tests) {
			const expected = referenceNextGreaterElements([...nums]);
			const result = fn([...nums]);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from nextGreaterElementIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNextGreaterElementIiJS = `function nextGreaterElements(nums) {
  // Write your code here
};`;

export const nextGreaterElementIi: Problem = {
	id: "next-greater-element-ii",
	title: "70. Next Greater Element II",
	problemStatement: `<p class='mt-3'>
    Given a <strong>circular</strong> integer array <code>nums</code> (the last element is
    considered adjacent to the first), return an array <code>answer</code> such that
    <code>answer[i]</code> is the <strong>next greater number</strong> for <code>nums[i]</code>.
  </p>
  <p class='mt-3'>
    The next greater number of a value <code>x</code> is the first number greater than <code>x</code>
    found by traversing the array in order, wrapping around to the beginning if needed. If no such
    number exists, <code>answer[i]</code> should be <code>-1</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,2,1]",
			outputText: "[2,-1,2]",
			explanation: "For the first 1, the next greater number is 2. The 2 has no next greater number. For the second 1, wrapping around, the next greater number is 2.",
		},
		{
			id: 1,
			inputText: "nums = [1,2,3,4,3]",
			outputText: "[2,3,4,-1,4]",
		},
		{
			id: 2,
			inputText: "nums = [5,5,5]",
			outputText: "[-1,-1,-1]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
<li class='mt-2'><code>-10^9 <= nums[i] <= 10^9</code></li>`,
	starterCode: starterCodeNextGreaterElementIiJS,
	handlerFunction: nextGreaterElementIiHandler,
	starterFunctionName: "function nextGreaterElements(",
	order: 70,
};
