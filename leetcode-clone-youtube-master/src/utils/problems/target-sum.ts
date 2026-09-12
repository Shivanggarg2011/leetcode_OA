import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(nums: number[], target: number): number {
	const total = nums.reduce((a, b) => a + b, 0);
	if (Math.abs(target) > total) return 0;
	// counts[sum + total] = number of ways to reach that sum
	const size = 2 * total + 1;
	let dp: number[] = new Array(size).fill(0);
	dp[total] = 1; // sum of 0 offset by total
	for (const num of nums) {
		const next: number[] = new Array(size).fill(0);
		for (let s = 0; s < size; s++) {
			if (dp[s] === 0) continue;
			if (s + num < size) next[s + num] += dp[s];
			if (s - num >= 0) next[s - num] += dp[s];
		}
		dp = next;
	}
	const idx = target + total;
	if (idx < 0 || idx >= size) return 0;
	return dp[idx];
}

export const targetSumHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 1, 1, 1, 1], 3],
			[[1], 1],
			[[1], 2],
			[[0, 0, 0, 0, 0], 0],
			[[1, 2, 1], 0],
		];
		for (const [nums, target] of tests) {
			const expected = referenceSolution(nums, target);
			const result = fn(nums, target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from targetSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTargetSumJS = `function findTargetSumWays(nums, target) {
  // Write your code here
};`;

export const targetSum: Problem = {
	id: "target-sum",
	title: "226. Target Sum",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code> and an integer <code>target</code>.
  </p>
  <p class='mt-3'>
    You want to build an expression out of <code>nums</code> by adding one of the symbols <code>'+'</code> or <code>'-'</code> before each integer in <code>nums</code> and then concatenate all the integers.
  </p>
  <p class='mt-3'>
    For example, if <code>nums = [2, 1]</code>, you can add a <code>'+'</code> before <code>2</code> and a <code>'-'</code> before <code>1</code> and concatenate them to build the expression <code>"+2-1"</code>.
  </p>
  <p class='mt-3'>
    Return <em>the number of different expressions that you can build which evaluate to</em> <code>target</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,1,1,1,1], target = 3`,
			outputText: `5`,
			explanation: "There are 5 ways to assign symbols to make the sum of nums equal to 3.",
		},
		{
			id: 1,
			inputText: `nums = [1], target = 1`,
			outputText: `1`,
		},
		{
			id: 2,
			inputText: `nums = [1], target = 2`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 20</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 1000</code></li>
  <li class='mt-2'><code>0 <= sum(nums[i]) <= 1000</code></li>
  <li class='mt-2'><code>-1000 <= target <= 1000</code></li>`,
	starterCode: starterCodeTargetSumJS,
	handlerFunction: targetSumHandler,
	starterFunctionName: "function findTargetSumWays(",
	order: 226,
};
