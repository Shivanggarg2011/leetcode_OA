import assert from "assert";
import { Problem } from "../types/problem";

function referenceLengthOfLIS(nums: number[]): number {
	const tails: number[] = [];
	for (const n of nums) {
		let lo = 0;
		let hi = tails.length;
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (tails[mid] < n) lo = mid + 1;
			else hi = mid;
		}
		tails[lo] = n;
	}
	return tails.length;
}

export const longestIncreasingSubsequenceHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[10, 9, 2, 5, 3, 7, 101, 18],
			[0, 1, 0, 3, 2, 3],
			[7, 7, 7, 7, 7, 7, 7],
			[4, 10, 4, 3, 8, 9],
			[1],
			[1, 2, 3, 4, 5],
		];
		for (const nums of tests) {
			const expected = referenceLengthOfLIS(nums);
			const result = fn(nums);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from longestIncreasingSubsequenceHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeLongestIncreasingSubsequenceJS = `function lengthOfLIS(nums) {
  // Write your code here
};`;

export const longestIncreasingSubsequence: Problem = {
	id: "longest-increasing-subsequence",
	title: "202. Longest Increasing Subsequence",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, return the length of the longest strictly increasing
    subsequence (elements don't need to be contiguous, but must keep their relative order).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `nums = [10,9,2,5,3,7,101,18]`,
			outputText: `4`,
			explanation: "The longest increasing subsequence is [2,3,7,101] (or [2,3,7,18]), length 4.",
		},
		{
			id: 1,
			inputText: `nums = [0,1,0,3,2,3]`,
			outputText: `4`,
		},
		{
			id: 2,
			inputText: `nums = [7,7,7,7,7,7,7]`,
			outputText: `1`,
			explanation: "The sequence must be strictly increasing, so repeated values don't extend it.",
		},
	],
	constraints: `<li class='mt-2'><code>1 &lt;= nums.length &lt;= 2500</code></li>
<li class='mt-2'><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>`,
	starterCode: starterCodeLongestIncreasingSubsequenceJS,
	handlerFunction: longestIncreasingSubsequenceHandler,
	starterFunctionName: "function lengthOfLIS(",
	order: 202,
};
