import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: sort so duplicates sit together, then backtrack using
// each index at most once, skipping duplicate values at the same recursion
// depth to avoid duplicate combinations.
function referenceCombinationSum2(candidates: number[], target: number): number[][] {
	const sorted = [...candidates].sort((a, b) => a - b);
	const result: number[][] = [];
	const path: number[] = [];

	function backtrack(start: number, remaining: number) {
		if (remaining === 0) {
			result.push([...path]);
			return;
		}
		for (let i = start; i < sorted.length; i++) {
			if (i > start && sorted[i] === sorted[i - 1]) continue;
			if (sorted[i] > remaining) break;
			path.push(sorted[i]);
			backtrack(i + 1, remaining - sorted[i]);
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

export const combinationSumIiHandler = (fn: any) => {
	try {
		const tests: [number[], number][] = [
			[[10, 1, 2, 7, 6, 1, 5], 8],
			[[2, 5, 2, 1, 2], 5],
			[[1, 1, 1, 1], 2],
			[[2, 3, 5], 8],
			[[1], 2],
		];

		for (const [candidates, target] of tests) {
			const expected = normalize(referenceCombinationSum2(candidates, target));
			const result = normalize(fn([...candidates], target));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from combinationSumIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCombinationSumIiJS = `function combinationSum2(candidates, target) {
  // Write your code here
};`;

export const combinationSumIi: Problem = {
	id: "combination-sum-ii",
	title: "150. Combination Sum II",
	problemStatement: `<p class='mt-3'>
    Given a collection of integers <code>candidates</code> (which may contain duplicates) and a
    target integer <code>target</code>, return every unique combination of numbers from
    <code>candidates</code> that add up to <code>target</code>.
  </p>
  <p class='mt-3'>
    Each number in <code>candidates</code> may be used <strong>at most once</strong> per
    combination (each index may be picked only once, even though the same value can appear at
    multiple indices). The result must not contain duplicate combinations — you may return the
    combinations (and the numbers within each) in any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `candidates = [10,1,2,7,6,1,5], target = 8`,
			outputText: `[[1,1,6],[1,2,5],[1,7],[2,6]]`,
		},
		{
			id: 1,
			inputText: `candidates = [2,5,2,1,2], target = 5`,
			outputText: `[[1,2,2],[5]]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= candidates.length <= 100</code></li>
  <li class='mt-2'><code>1 <= candidates[i] <= 50</code></li>
  <li class='mt-2'><code>1 <= target <= 30</code></li>`,
	starterCode: starterCodeCombinationSumIiJS,
	handlerFunction: combinationSumIiHandler,
	starterFunctionName: "function combinationSum2(",
	order: 150,
};
