import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: sort first, then backtrack picking one unused index
// at a time, skipping a duplicate value if its identical predecessor hasn't
// been used yet in this branch (the standard way to avoid duplicate
// permutations when the input has repeats).
function referencePermuteUnique(nums: number[]): number[][] {
	const sorted = [...nums].sort((a, b) => a - b);
	const n = sorted.length;
	const used = new Array(n).fill(false);
	const path: number[] = [];
	const result: number[][] = [];

	function backtrack() {
		if (path.length === n) {
			result.push([...path]);
			return;
		}
		for (let i = 0; i < n; i++) {
			if (used[i]) continue;
			if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
			used[i] = true;
			path.push(sorted[i]);
			backtrack();
			path.pop();
			used[i] = false;
		}
	}
	backtrack();
	return result;
}

function normalize(perms: number[][]): number[][] {
	return [...perms].sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

export const permutationsIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [[1, 1, 2], [1, 2, 3], [2, 2, 1, 1], [1]];

		for (const nums of tests) {
			const expected = normalize(referencePermuteUnique(nums));
			const result = normalize(fn([...nums]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from permutationsIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePermutationsIiJS = `function permuteUnique(nums) {
  // Write your code here
};`;

export const permutationsIi: Problem = {
	id: "permutations-ii",
	title: "152. Permutations II",
	problemStatement: `<p class='mt-3'>
    Given an array of integers <code>nums</code> that may contain duplicate values, return every
    possible <strong>unique</strong> permutation of it. You may return the permutations in any
    order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,1,2]`,
			outputText: `[[1,1,2],[1,2,1],[2,1,1]]`,
		},
		{
			id: 1,
			inputText: `nums = [1,2,3]`,
			outputText: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 8</code></li>
  <li class='mt-2'><code>-10 <= nums[i] <= 10</code></li>`,
	starterCode: starterCodePermutationsIiJS,
	handlerFunction: permutationsIiHandler,
	starterFunctionName: "function permuteUnique(",
	order: 152,
};
