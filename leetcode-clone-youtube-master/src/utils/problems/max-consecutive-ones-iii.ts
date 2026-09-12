import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: sliding window tracking number of zeros used
function referenceLongestOnes(nums: number[], k: number): number {
	let left = 0;
	let zeros = 0;
	let best = 0;
	for (let right = 0; right < nums.length; right++) {
		if (nums[right] === 0) zeros++;
		while (zeros > k) {
			if (nums[left] === 0) zeros--;
			left++;
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
}

export const maxConsecutiveOnesIiiHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2],
			[[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3],
			[[0, 0, 0], 0],
			[[1], 0],
			[[0], 1],
			[[1, 1, 1, 1], 2],
		];
		for (const [nums, k] of tests) {
			const expected = referenceLongestOnes([...nums], k);
			const result = fn([...nums], k);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maxConsecutiveOnesIiiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaxConsecutiveOnesIiiJS = `function longestOnes(nums, k) {
  // Write your code here
};`;

export const maxConsecutiveOnesIii: Problem = {
	id: "max-consecutive-ones-iii",
	title: "54. Max Consecutive Ones III",
	problemStatement: `<p class='mt-3'>
    You are given a binary array <code>nums</code> (containing only <code>0</code>s and <code>1</code>s) and an
    integer <code>k</code>.
  </p>
  <p class='mt-3'>
    You are allowed to flip at most <code>k</code> zeros to ones. Return the length of the
    <strong>longest</strong> run of consecutive <code>1</code>s that you can achieve after doing so.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
			outputText: "6",
			explanation: "Flip the two 0's at indices 5 and 10 (0-indexed) to get a run of 6 consecutive 1's from index 5 through 10.",
		},
		{
			id: 1,
			inputText: "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3",
			outputText: "10",
		},
		{
			id: 2,
			inputText: "nums = [0,0,0], k = 0",
			outputText: "0",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^5</code></li>
<li class='mt-2'><code>nums[i]</code> is either <code>0</code> or <code>1</code></li>
<li class='mt-2'><code>0 <= k <= nums.length</code></li>`,
	starterCode: starterCodeMaxConsecutiveOnesIiiJS,
	handlerFunction: maxConsecutiveOnesIiiHandler,
	starterFunctionName: "function longestOnes(",
	order: 54,
};
