import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: sort first so duplicate values sit next to each
// other, then backtrack while skipping a duplicate value at the same
// recursion depth to avoid producing the same subset twice.
function referenceSubsetsWithDup(nums: number[]): number[][] {
	const sorted = [...nums].sort((a, b) => a - b);
	const result: number[][] = [];
	const path: number[] = [];

	function backtrack(start: number) {
		result.push([...path]);
		for (let i = start; i < sorted.length; i++) {
			if (i > start && sorted[i] === sorted[i - 1]) continue;
			path.push(sorted[i]);
			backtrack(i + 1);
			path.pop();
		}
	}
	backtrack(0);
	return result;
}

function normalize(subsets: number[][]): number[][] {
	return subsets
		.map((subset) => [...subset].sort((a, b) => a - b))
		.sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

export const subsetsIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 2],
			[0],
			[4, 4, 4, 1, 4],
			[1, 2, 3],
			[5, 5],
		];

		for (const nums of tests) {
			const expected = normalize(referenceSubsetsWithDup(nums));
			const result = normalize(fn([...nums]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from subsetsIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSubsetsIiJS = `function subsetsWithDup(nums) {
  // Write your code here
};`;

export const subsetsIi: Problem = {
	id: "subsets-ii",
	title: "148. Subsets II",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> that may contain duplicate values, return every
    possible subset (the power set), without any subset appearing more than once.
  </p>
  <p class='mt-3'>
    The subsets may be returned in any order, and the elements within each subset may be in any
    order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,2]`,
			outputText: `[[],[1],[2],[1,2],[2,2],[1,2,2]]`,
		},
		{
			id: 1,
			inputText: `nums = [0]`,
			outputText: `[[],[0]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10</code></li>
  <li class='mt-2'><code>-10 <= nums[i] <= 10</code></li>`,
	starterCode: starterCodeSubsetsIiJS,
	handlerFunction: subsetsIiHandler,
	starterFunctionName: "function subsetsWithDup(",
	order: 148,
};
