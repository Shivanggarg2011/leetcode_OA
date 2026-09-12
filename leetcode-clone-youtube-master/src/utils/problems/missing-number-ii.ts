import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: nums has length n and contains n distinct integers
// drawn from the range [1, n + 1] with exactly one value missing. XOR every
// index/value together with every number from 1..n+1 to cancel out pairs,
// leaving only the missing number.
function referenceMissingNumberII(nums: number[]): number {
	const n = nums.length;
	let missing = 0;
	for (let i = 1; i <= n + 1; i++) missing ^= i;
	for (const num of nums) missing ^= num;
	return missing;
}

export const missingNumberIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 4, 5],
			[2, 1],
			[1],
			[1, 3, 4, 5, 6],
			[2, 3, 4, 5, 6, 7, 8, 9, 10],
			[1, 2, 3, 5],
		];
		for (const nums of tests) {
			const expected = referenceMissingNumberII([...nums]);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from missingNumberIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMissingNumberIiJS = `function findMissingNumber(nums) {
  // Write your code here
};`;

export const missingNumberIi: Problem = {
	id: "missing-number-ii",
	title: "265. Missing Number II",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>nums</code> of length <code>n</code> containing <code>n</code>
    <strong>distinct</strong> integers, every one of them taken from the range
    <code>[1, n + 1]</code> (a 1-indexed variant of the classic missing-number setup). Exactly one
    integer from that range is absent from <code>nums</code>.
  </p>
  <p class='mt-3'>
    Return the missing integer. Try to solve it using <code>O(1)</code> extra space with bitwise
    operations, without allocating an auxiliary array or set the size of the range.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,4,5]`,
			outputText: `3`,
			explanation: "n = 4, so the full range is [1,5]. 3 is the only value missing from nums.",
		},
		{
			id: 1,
			inputText: `nums = [2,1]`,
			outputText: `3`,
			explanation: "n = 2, so the full range is [1,3]. 3 is missing.",
		},
		{
			id: 2,
			inputText: `nums = [1]`,
			outputText: `2`,
		},
	],
	constraints: `<li class='mt-2'><code>n == nums.length</code></li>
  <li class='mt-2'><code>1 <= n <= 10^4</code></li>
  <li class='mt-2'><code>1 <= nums[i] <= n + 1</code></li>
  <li class='mt-2'>All values in <code>nums</code> are distinct.</li>`,
	starterCode: starterCodeMissingNumberIiJS,
	handlerFunction: missingNumberIiHandler,
	starterFunctionName: "function findMissingNumber(",
	order: 265,
};
