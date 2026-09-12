import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(nums: number[]): number {
	let jumps = 0;
	let currentEnd = 0;
	let farthest = 0;
	for (let i = 0; i < nums.length - 1; i++) {
		farthest = Math.max(farthest, i + nums[i]);
		if (i === currentEnd) {
			jumps++;
			currentEnd = farthest;
		}
	}
	return jumps;
}

export const jumpGameIiHandler = (fn: any) => {
	try {
		const tests = [
			[2, 3, 1, 1, 4],
			[2, 3, 0, 1, 4],
			[1, 1, 1, 1],
			[0],
			[1, 2, 3],
			[5, 1, 1, 1, 1, 1],
		];
		for (const nums of tests) {
			const expected = referenceSolution(nums);
			const result = fn(nums);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from jumpGameIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeJumpGameIiJS = `function jump(nums) {
  // Write your code here
};`;

export const jumpGameIi: Problem = {
	id: "jump-game-ii",
	title: "211. Jump Game II",
	problemStatement: `<p class='mt-3'>
    You are given a 0-indexed array of integers <code>nums</code> of length <code>n</code>. You are initially positioned at <code>nums[0]</code>.
  </p>
  <p class='mt-3'>
    Each element <code>nums[i]</code> represents the maximum length of a forward jump from index <code>i</code>. In other words, if you are at index <code>i</code>, you can jump to any index <code>i + j</code> where <code>0 <= j <= nums[i]</code> and <code>i + j < n</code>.
  </p>
  <p class='mt-3'>
    Return <em>the minimum number of jumps to reach index </em><code>n - 1</code>. You may assume it is always possible to reach the last index.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [2,3,1,1,4]`,
			outputText: `2`,
			explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
		},
		{
			id: 1,
			inputText: `nums = [2,3,0,1,4]`,
			outputText: `2`,
		},
		{
			id: 2,
			inputText: `nums = [0]`,
			outputText: `0`,
			explanation: "You are already at the last index, so no jumps are needed.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 1000</code></li>
  <li class='mt-2'>It is guaranteed that you can reach <code>nums[n - 1]</code>.</li>`,
	starterCode: starterCodeJumpGameIiJS,
	handlerFunction: jumpGameIiHandler,
	starterFunctionName: "function jump(",
	order: 211,
};
