import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: classic bitmask enumeration of the power set.
function referenceSubsets(nums: number[]): number[][] {
	const n = nums.length;
	const result: number[][] = [];
	for (let mask = 0; mask < 1 << n; mask++) {
		const subset: number[] = [];
		for (let i = 0; i < n; i++) {
			if (mask & (1 << i)) subset.push(nums[i]);
		}
		result.push(subset);
	}
	return result;
}

// Neither the order of the subsets nor the order of elements within a
// subset is meaningful, so normalize both before comparing.
function normalize(subsets: number[][]): number[][] {
	return subsets
		.map((subset) => [...subset].sort((a, b) => a - b))
		.sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

export const subsetsHandler = (fn: any) => {
	try {
		const tests: number[][] = [[1, 2, 3], [0], [1, 2], [], [4, 5, 6, 7]];

		for (const nums of tests) {
			const expected = normalize(referenceSubsets(nums));
			const result = normalize(fn([...nums]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from subsetsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSubsetsJS = `function subsets(nums) {
  // Write your code here
};`;

export const subsets: Problem = {
	id: "subsets",
	title: "147. Subsets",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> of <strong>unique</strong> elements, return every
    possible subset (the power set), including the empty subset and <code>nums</code> itself.
  </p>
  <p class='mt-3'>
    The subsets may be returned in any order, and the elements within each subset may be in any
    order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3]`,
			outputText: `[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]`,
		},
		{
			id: 1,
			inputText: `nums = [0]`,
			outputText: `[[],[0]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10</code></li>
  <li class='mt-2'><code>-10 <= nums[i] <= 10</code></li>
  <li class='mt-2'>All elements of <code>nums</code> are unique.</li>`,
	starterCode: starterCodeSubsetsJS,
	handlerFunction: subsetsHandler,
	starterFunctionName: "function subsets(",
	order: 147,
};
