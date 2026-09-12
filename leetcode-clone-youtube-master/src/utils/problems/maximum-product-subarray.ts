import assert from "assert";
import { Problem } from "../types/problem";

function referenceMaxProduct(nums: number[]): number {
	let maxSoFar = nums[0];
	let curMax = nums[0];
	let curMin = nums[0];
	for (let i = 1; i < nums.length; i++) {
		const n = nums[i];
		if (n < 0) {
			const temp = curMax;
			curMax = curMin;
			curMin = temp;
		}
		curMax = Math.max(n, curMax * n);
		curMin = Math.min(n, curMin * n);
		maxSoFar = Math.max(maxSoFar, curMax);
	}
	return maxSoFar;
}

export const maximumProductSubarrayHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 3, -2, 4],
			[-2, 0, -1],
			[-2],
			[-2, 3, -4],
			[0, 2],
			[2, -5, -2, -4, 3],
		];
		for (const nums of tests) {
			const expected = referenceMaxProduct(nums);
			const result = fn(nums);
			assert.strictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maximumProductSubarrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaximumProductSubarrayJS = `function maxProduct(nums) {
  // Write your code here
};`;

export const maximumProductSubarray: Problem = {
	id: "maximum-product-subarray",
	title: "200. Maximum Product Subarray",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, find a contiguous, non-empty subarray whose product
    is the largest, and return that product.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: `nums = [2,3,-2,4]`,
			outputText: `6`,
			explanation: "The subarray [2,3] has the largest product 6.",
		},
		{
			id: 1,
			inputText: `nums = [-2,0,-1]`,
			outputText: `0`,
			explanation: "The result cannot be 2, because [-2,-1] is not a contiguous subarray.",
		},
		{
			id: 2,
			inputText: `nums = [-2,3,-4]`,
			outputText: `24`,
			explanation: "The whole array multiplies to 24, since the two negatives cancel out.",
		},
	],
	constraints: `<li class='mt-2'><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li class='mt-2'><code>-10 &lt;= nums[i] &lt;= 10</code></li>
<li class='mt-2'>The product of any subarray fits in a 32-bit integer.</li>`,
	starterCode: starterCodeMaximumProductSubarrayJS,
	handlerFunction: maximumProductSubarrayHandler,
	starterFunctionName: "function maxProduct(",
	order: 200,
};
