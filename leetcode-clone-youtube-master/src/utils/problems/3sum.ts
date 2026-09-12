import assert from "assert";
import { Problem } from "../types/problem";

export const threeSumHandler = (fn: any) => {
	try {
		function referenceSolution(nums: number[]): number[][] {
			const sorted = [...nums].sort((a, b) => a - b);
			const result: number[][] = [];
			for (let i = 0; i < sorted.length - 2; i++) {
				if (i > 0 && sorted[i] === sorted[i - 1]) continue;
				let lo = i + 1;
				let hi = sorted.length - 1;
				while (lo < hi) {
					const sum = sorted[i] + sorted[lo] + sorted[hi];
					if (sum === 0) {
						result.push([sorted[i], sorted[lo], sorted[hi]]);
						while (lo < hi && sorted[lo] === sorted[lo + 1]) lo++;
						while (lo < hi && sorted[hi] === sorted[hi - 1]) hi--;
						lo++;
						hi--;
					} else if (sum < 0) {
						lo++;
					} else {
						hi--;
					}
				}
			}
			return result;
		}

		function normalize(triplets: number[][]): string[] {
			return triplets.map((t) => [...t].sort((a, b) => a - b).join(",")).sort();
		}

		const tests: number[][] = [
			[-1, 0, 1, 2, -1, -4],
			[0, 1, 1],
			[0, 0, 0],
			[0, 0, 0, 0],
			[-2, 0, 1, 1, 2],
			[3, -2, 1, 0],
		];

		for (const nums of tests) {
			const expected = referenceSolution(nums);
			const result = fn([...nums]);
			assert.deepStrictEqual(normalize(result), normalize(expected));
		}
		return true;
	} catch (error: any) {
		console.log("Error from threeSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeThreeSumJS = `function threeSum(nums) {
  // Write your code here
};`;

export const threeSum: Problem = {
	id: "3sum",
	title: "33. 3Sum",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, return all the triplets
    <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and
    <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.
  </p>
  <p class='mt-3'>
    The returned list must not contain duplicate triplets (the order of the triplets, and the order
    within each triplet, does not matter).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [-1,0,1,2,-1,-4]",
			outputText: "[[-1,-1,2],[-1,0,1]]",
		},
		{
			id: 1,
			inputText: "nums = [0,1,1]",
			outputText: "[]",
			explanation: "No triplet sums to 0.",
		},
		{
			id: 2,
			inputText: "nums = [0,0,0]",
			outputText: "[[0,0,0]]",
		},
	],
	constraints: `<li class='mt-2'><code>3 <= nums.length <= 3000</code></li>
  <li class='mt-2'><code>-10^5 <= nums[i] <= 10^5</code></li>`,
	starterCode: starterCodeThreeSumJS,
	handlerFunction: threeSumHandler,
	starterFunctionName: "function threeSum(",
	order: 33,
};
