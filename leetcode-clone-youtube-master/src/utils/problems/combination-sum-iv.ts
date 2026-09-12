import assert from "assert";
import { Problem } from "../types/problem";

function referenceCombinationSum4(nums: number[], target: number): number {
	const dp: number[] = new Array(target + 1).fill(0);
	dp[0] = 1;
	for (let t = 1; t <= target; t++) {
		for (const n of nums) {
			if (n <= t) dp[t] += dp[t - n];
		}
	}
	return dp[target];
}

export const combinationSumIvHandler = (fn: any) => {
	try {
		const tests: Array<[number[], number]> = [
			[[1, 2, 3], 4],
			[[9], 3],
			[[1], 5],
			[[1, 2], 3],
			[[2, 3, 5], 8],
		];
		for (const [nums, target] of tests) {
			const expected = referenceCombinationSum4(nums, target);
			const result = fn(nums, target);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from combinationSumIvHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCombinationSumIvJS = `function combinationSum4(nums, target) {
  // Write your code here
};`;

export const combinationSumIv: Problem = {
	id: "combination-sum-iv",
	title: "204. Combination Sum IV",
	problemStatement: `<p class='mt-3'>
    Given an array of <b>distinct</b> positive integers <code>nums</code> and a target integer
    <code>target</code>, return the number of possible ordered sequences that add up to
    <code>target</code>. Numbers may be reused as many times as needed.
  </p>
  <p class='mt-3'>Different orderings of the same numbers count as different sequences.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3], target = 4`,
			outputText: `7`,
			explanation: "The sequences are: (1,1,1,1),(1,1,2),(1,2,1),(1,3),(2,1,1),(2,2),(3,1).",
		},
		{
			id: 1,
			inputText: `nums = [9], target = 3`,
			outputText: `0`,
		},
		{
			id: 2,
			inputText: `nums = [1,2], target = 3`,
			outputText: `3`,
			explanation: "The sequences are: (1,1,1), (1,2), (2,1).",
		},
	],
	constraints: `<li class='mt-2'><code>1 &lt;= nums.length &lt;= 200</code></li>
<li class='mt-2'>All elements of <code>nums</code> are distinct positive integers.</li>
<li class='mt-2'><code>1 &lt;= target &lt;= 1000</code></li>`,
	starterCode: starterCodeCombinationSumIvJS,
	handlerFunction: combinationSumIvHandler,
	starterFunctionName: "function combinationSum4(",
	order: 204,
};
