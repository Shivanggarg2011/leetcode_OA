import assert from "assert";
import { Problem } from "../types/problem";

function referenceMaxSlidingWindow(nums: number[], k: number): number[] {
	const result: number[] = [];
	const deque: number[] = []; // stores indices, values decreasing
	for (let i = 0; i < nums.length; i++) {
		while (deque.length > 0 && deque[0] <= i - k) deque.shift();
		while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
		deque.push(i);
		if (i >= k - 1) result.push(nums[deque[0]]);
	}
	return result;
}

export const slidingWindowMaximumHandler = (fn: any) => {
	try {
		const tests: Array<[number[], number]> = [
			[[1, 3, -1, -3, 5, 3, 6, 7], 3],
			[[1], 1],
			[[1, -1], 1],
			[[9, 11], 2],
			[[4, -2], 2],
			[[1, 3, 1, 2, 0, 5], 3],
		];
		for (const [nums, k] of tests) {
			const expected = referenceMaxSlidingWindow(nums, k);
			const result = fn(nums, k);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from slidingWindowMaximumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSlidingWindowMaximumJS = `function maxSlidingWindow(nums, k) {
  // Write your code here
};`;

export const slidingWindowMaximum: Problem = {
	id: "sliding-window-maximum",
	title: "51. Sliding Window Maximum",
	problemStatement: `<p class='mt-3'>
    You are given an array of integers <code>nums</code> and an integer <code>k</code> representing
    the size of a sliding window that moves from the very left of the array to the very right, one
    position at a time.
  </p>
  <p class='mt-3'>Return an array of the maximum value in the window at each position it stops at.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,3,-1,-3,5,3,6,7], k = 3`,
			outputText: `[3,3,5,5,6,7]`,
			explanation: "Window [1,3,-1] -> 3, [3,-1,-3] -> 3, [-1,-3,5] -> 5, and so on.",
		},
		{
			id: 1,
			inputText: `nums = [1], k = 1`,
			outputText: `[1]`,
		},
		{
			id: 2,
			inputText: `nums = [9,11], k = 2`,
			outputText: `[11]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li class='mt-2'><code>1 &lt;= k &lt;= nums.length</code></li>`,
	starterCode: starterCodeSlidingWindowMaximumJS,
	handlerFunction: slidingWindowMaximumHandler,
	starterFunctionName: "function maxSlidingWindow(",
	order: 51,
};
