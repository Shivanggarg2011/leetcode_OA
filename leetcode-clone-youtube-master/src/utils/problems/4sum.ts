import assert from "assert";
import { Problem } from "../types/problem";

export const fourSumHandler = (fn: any) => {
	try {
		function referenceSolution(nums: number[], target: number): number[][] {
			const sorted = [...nums].sort((a, b) => a - b);
			const n = sorted.length;
			const result: number[][] = [];
			for (let i = 0; i < n - 3; i++) {
				if (i > 0 && sorted[i] === sorted[i - 1]) continue;
				for (let j = i + 1; j < n - 2; j++) {
					if (j > i + 1 && sorted[j] === sorted[j - 1]) continue;
					let lo = j + 1;
					let hi = n - 1;
					while (lo < hi) {
						const sum = sorted[i] + sorted[j] + sorted[lo] + sorted[hi];
						if (sum === target) {
							result.push([sorted[i], sorted[j], sorted[lo], sorted[hi]]);
							while (lo < hi && sorted[lo] === sorted[lo + 1]) lo++;
							while (lo < hi && sorted[hi] === sorted[hi - 1]) hi--;
							lo++;
							hi--;
						} else if (sum < target) {
							lo++;
						} else {
							hi--;
						}
					}
				}
			}
			return result;
		}

		function normalize(quads: number[][]): string[] {
			return quads.map((q) => [...q].sort((a, b) => a - b).join(",")).sort();
		}

		const tests: [number[], number][] = [
			[[1, 0, -1, 0, -2, 2], 0],
			[[2, 2, 2, 2, 2], 8],
			[[0, 0, 0, 0], 0],
			[[-3, -2, -1, 0, 0, 1, 2, 3], 0],
			[[1, -2, -5, -4, -3, 3, 3, 5], -11],
		];

		for (const [nums, target] of tests) {
			const expected = referenceSolution(nums, target);
			const result = fn([...nums], target);
			assert.deepStrictEqual(normalize(result), normalize(expected));
		}
		return true;
	} catch (error: any) {
		console.log("Error from fourSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFourSumJS = `function fourSum(nums, target) {
  // Write your code here
};`;

export const fourSum: Problem = {
	id: "4sum",
	title: "35. 4Sum",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> and an integer <code>target</code>, return all unique
    quadruplets <code>[nums[a], nums[b], nums[c], nums[d]]</code> (using four distinct indices
    <code>a</code>, <code>b</code>, <code>c</code>, <code>d</code>) such that
    <code>nums[a] + nums[b] + nums[c] + nums[d] == target</code>.
  </p>
  <p class='mt-3'>
    The returned list must not contain duplicate quadruplets (the order of the quadruplets, and the
    order within each quadruplet, does not matter).
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [1,0,-1,0,-2,2], target = 0",
			outputText: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]",
		},
		{
			id: 1,
			inputText: "nums = [2,2,2,2,2], target = 8",
			outputText: "[[2,2,2,2]]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 200</code></li>
  <li class='mt-2'><code>-10^9 <= nums[i] <= 10^9</code></li>
  <li class='mt-2'><code>-10^9 <= target <= 10^9</code></li>`,
	starterCode: starterCodeFourSumJS,
	handlerFunction: fourSumHandler,
	starterFunctionName: "function fourSum(",
	order: 35,
};
