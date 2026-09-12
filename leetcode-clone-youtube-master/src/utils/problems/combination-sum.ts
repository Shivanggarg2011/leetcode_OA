import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: standard backtracking that may reuse the current
// candidate (hence the recursive call keeps index i rather than i + 1).
function referenceCombinationSum(candidates: number[], target: number): number[][] {
	const sorted = [...candidates].sort((a, b) => a - b);
	const result: number[][] = [];
	const path: number[] = [];

	function backtrack(start: number, remaining: number) {
		if (remaining === 0) {
			result.push([...path]);
			return;
		}
		for (let i = start; i < sorted.length; i++) {
			if (sorted[i] > remaining) break;
			path.push(sorted[i]);
			backtrack(i, remaining - sorted[i]);
			path.pop();
		}
	}
	backtrack(0, target);
	return result;
}

function normalize(combos: number[][]): number[][] {
	return combos
		.map((combo) => [...combo].sort((a, b) => a - b))
		.sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

export const combinationSumHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[2, 3, 6, 7], 7],
			[[2, 3, 5], 8],
			[[2], 1],
			[[1], 2],
			[[3, 5, 8], 11],
		];

		for (const [candidates, target] of tests) {
			const expected = normalize(referenceCombinationSum(candidates, target));
			const result = normalize(fn([...candidates], target));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from combinationSumHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCombinationSumJS = `function combinationSum(candidates, target) {
  // Write your code here
};`;

export const combinationSum: Problem = {
	id: "combination-sum",
	title: "149. Combination Sum",
	problemStatement: `<p class='mt-3'>
    Given an array of <strong>distinct</strong> positive integers <code>candidates</code> and a
    target integer <code>target</code>, return every unique combination of numbers from
    <code>candidates</code> that add up to <code>target</code>.
  </p>
  <p class='mt-3'>
    The same number may be chosen from <code>candidates</code> an unlimited number of times within
    one combination. Two combinations are considered the same if they use the same numbers the
    same number of times, regardless of order — you may return the combinations (and the numbers
    within each) in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `candidates = [2,3,6,7], target = 7`,
			outputText: `[[2,2,3],[7]]`,
			explanation: "2+2+3 = 7 and 7 = 7 are the only ways to reach the target.",
		},
		{
			id: 1,
			inputText: `candidates = [2,3,5], target = 8`,
			outputText: `[[2,2,2,2],[2,3,3],[3,5]]`,
		},
		{
			id: 2,
			inputText: `candidates = [2], target = 1`,
			outputText: `[]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= candidates.length <= 30</code></li>
  <li class='mt-2'><code>2 <= candidates[i] <= 40</code></li>
  <li class='mt-2'>All elements of <code>candidates</code> are distinct.</li>
  <li class='mt-2'><code>1 <= target <= 40</code></li>`,
	starterCode: starterCodeCombinationSumJS,
	handlerFunction: combinationSumHandler,
	starterFunctionName: "function combinationSum(",
	order: 149,
};
