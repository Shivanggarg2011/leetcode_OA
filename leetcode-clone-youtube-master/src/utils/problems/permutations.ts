import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: standard backtracking building each permutation by
// swapping elements into the current position.
function referencePermute(nums: number[]): number[][] {
	const result: number[][] = [];
	const arr = [...nums];

	function backtrack(k: number) {
		if (k === arr.length) {
			result.push([...arr]);
			return;
		}
		for (let i = k; i < arr.length; i++) {
			[arr[k], arr[i]] = [arr[i], arr[k]];
			backtrack(k + 1);
			[arr[k], arr[i]] = [arr[i], arr[k]];
		}
	}
	backtrack(0);
	return result;
}

// The order of the permutations themselves doesn't matter, but the order of
// elements *within* a permutation is significant, so only the outer list is
// sorted here.
function normalize(perms: number[][]): number[][] {
	return [...perms].sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

export const permutationsHandler = (fn: any) => {
	try {
		const tests: number[][] = [[1, 2, 3], [0, 1], [1], [4, 5, 6]];

		for (const nums of tests) {
			const expected = normalize(referencePermute(nums));
			const result = normalize(fn([...nums]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from permutationsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePermutationsJS = `function permute(nums) {
  // Write your code here
};`;

export const permutations: Problem = {
	id: "permutations",
	title: "151. Permutations",
	problemStatement: `<p class='mt-3'>
    Given an array of <strong>distinct</strong> integers <code>nums</code>, return every possible
    permutation of it. You may return the permutations in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3]`,
			outputText: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`,
		},
		{
			id: 1,
			inputText: `nums = [0,1]`,
			outputText: `[[0,1],[1,0]]`,
		},
		{
			id: 2,
			inputText: `nums = [1]`,
			outputText: `[[1]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 6</code></li>
  <li class='mt-2'><code>-10 <= nums[i] <= 10</code></li>
  <li class='mt-2'>All elements of <code>nums</code> are unique.</li>`,
	starterCode: starterCodePermutationsJS,
	handlerFunction: permutationsHandler,
	starterFunctionName: "function permute(",
	order: 151,
};
