import assert from "assert";
import { Problem } from "../types/problem";

function referenceCanPartition(nums: number[]): boolean {
	const total = nums.reduce((a, b) => a + b, 0);
	if (total % 2 !== 0) return false;
	const target = total / 2;
	const dp: boolean[] = new Array(target + 1).fill(false);
	dp[0] = true;
	for (const n of nums) {
		for (let sum = target; sum >= n; sum--) {
			if (dp[sum - n]) dp[sum] = true;
		}
	}
	return dp[target];
}

export const partitionEqualSubsetSumHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 5, 11, 5],
			[1, 2, 3, 5],
			[1, 1],
			[2, 2, 3, 5],
			[1, 2, 5],
			[1, 1, 1, 1],
		];
		for (const nums of tests) {
			const expected = referenceCanPartition(nums);
			const result = fn(nums);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from partitionEqualSubsetSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePartitionEqualSubsetSumJS = `function canPartition(nums) {
  // Write your code here
};`;

export const partitionEqualSubsetSum: Problem = {
	id: "partition-equal-subset-sum",
	title: "203. Partition Equal Subset Sum",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, return <code>true</code> if it can be split into two
    subsets whose elements sum to the same value.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,5,11,5]`,
			outputText: `true`,
			explanation: "The array can be split into [1,5,5] and [11], both summing to 11.",
		},
		{
			id: 1,
			inputText: `nums = [1,2,3,5]`,
			outputText: `false`,
			explanation: "The total is 11, which is odd, so it can't be split into two equal halves.",
		},
		{
			id: 2,
			inputText: `nums = [1,1]`,
			outputText: `true`,
		},
	],
	constraints: `<li class='mt-2'><code>1 &lt;= nums.length &lt;= 200</code></li>
<li class='mt-2'><code>1 &lt;= nums[i] &lt;= 100</code></li>`,
	starterCode: starterCodePartitionEqualSubsetSumJS,
	handlerFunction: partitionEqualSubsetSumHandler,
	starterFunctionName: "function canPartition(",
	order: 203,
};
