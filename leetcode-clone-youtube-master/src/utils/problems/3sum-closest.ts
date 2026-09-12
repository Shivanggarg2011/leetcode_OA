import assert from "assert";
import { Problem } from "../types/problem";

export const threeSumClosestHandler = (fn: any) => {
	try {
		function referenceSolution(nums: number[], target: number): number {
			const sorted = [...nums].sort((a, b) => a - b);
			let best = sorted[0] + sorted[1] + sorted[2];
			for (let i = 0; i < sorted.length - 2; i++) {
				let lo = i + 1;
				let hi = sorted.length - 1;
				while (lo < hi) {
					const sum = sorted[i] + sorted[lo] + sorted[hi];
					if (Math.abs(sum - target) < Math.abs(best - target)) {
						best = sum;
					}
					if (sum === target) return sum;
					if (sum < target) lo++;
					else hi--;
				}
			}
			return best;
		}

		const tests: [number[], number][] = [
			[[-1, 2, 1, -4], 1],
			[[0, 0, 0], 1],
			[[1, 1, 1, 0], -100],
			[[-3, -2, -1, 0, 1, 2], 1],
			[[4, 0, 5, -5, 3, 3, 0, -4, -5], -2],
		];

		for (const [nums, target] of tests) {
			const expected = referenceSolution(nums, target);
			const result = fn([...nums], target);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from threeSumClosestHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeThreeSumClosestJS = `function threeSumClosest(nums, target) {
  // Write your code here
};`;

export const threeSumClosest: Problem = {
	id: "3sum-closest",
	title: "34. 3Sum Closest",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> of length <code>n</code> and an integer
    <code>target</code>, find three integers in <code>nums</code> such that their sum is as close as
    possible to <code>target</code>.
  </p>
  <p class='mt-3'>
    Return the sum of those three integers. You may assume that each input has exactly one such sum.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [-1,2,1,-4], target = 1",
			outputText: "2",
			explanation: "The sum closest to the target is 2 (-1 + 2 + 1 = 2).",
		},
		{
			id: 1,
			inputText: "nums = [0,0,0], target = 1",
			outputText: "0",
		},
	],
	constraints: `<li class='mt-2'><code>3 <= nums.length <= 500</code></li>
  <li class='mt-2'><code>-1000 <= nums[i] <= 1000</code></li>
  <li class='mt-2'><code>-10^4 <= target <= 10^4</code></li>`,
	starterCode: starterCodeThreeSumClosestJS,
	handlerFunction: threeSumClosestHandler,
	starterFunctionName: "function threeSumClosest(",
	order: 34,
};
