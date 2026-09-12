import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: backtracking, building increasing-index combinations.
function referenceCombine(n: number, k: number): number[][] {
	const results: number[][] = [];
	const path: number[] = [];

	function backtrack(start: number) {
		if (path.length === k) {
			results.push([...path]);
			return;
		}
		for (let num = start; num <= n; num++) {
			path.push(num);
			backtrack(num + 1);
			path.pop();
		}
	}

	backtrack(1);
	return results;
}

// Order of combinations (and within each, values are always ascending) --
// only the outer order can vary, so sort the outer list by joined contents.
function normalize(combos: number[][]): string[] {
	return combos.map((combo) => combo.join(",")).sort();
}

export const combinationsHandler = (fn: any) => {
	try {
		const tests: [number, number][] = [
			[4, 2],
			[1, 1],
			[5, 1],
			[5, 5],
			[6, 3],
			[3, 2],
		];
		for (const [n, k] of tests) {
			const expected = normalize(referenceCombine(n, k));
			const result = normalize(fn(n, k));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from combinationsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCombinationsJS = `function combine(n, k) {
  // Write your code here
};`;

export const combinations: Problem = {
	id: "combinations",
	title: "159. Combinations",
	problemStatement: `<p class='mt-3'>
    Given two integers <code>n</code> and <code>k</code>, return <em>all possible combinations</em>
    of <code>k</code> distinct numbers chosen from the range <code>[1, n]</code>.
  </p>
  <p class='mt-3'>
    You may return the combinations in any order, and the numbers inside each combination may be in
    any order.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 4, k = 2`,
			outputText: `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`,
		},
		{
			id: 1,
			inputText: `n = 1, k = 1`,
			outputText: `[[1]]`,
		},
		{
			id: 2,
			inputText: `n = 5, k = 5`,
			outputText: `[[1,2,3,4,5]]`,
			explanation: "There is exactly one way to choose all 5 numbers.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 20</code></li>
  <li class='mt-2'><code>1 <= k <= n</code></li>`,
	starterCode: starterCodeCombinationsJS,
	handlerFunction: combinationsHandler,
	starterFunctionName: "function combine(",
	order: 159,
};
