import assert from "assert";
import { Problem } from "../types/problem";

export const sortArrayByParityHandler = (fn: any) => {
	try {
		function isValidArrangement(input: number[], result: number[]): boolean {
			if (!Array.isArray(result) || result.length !== input.length) return false;
			const sortedInput = [...input].sort((a, b) => a - b);
			const sortedResult = [...result].sort((a, b) => a - b);
			if (JSON.stringify(sortedInput) !== JSON.stringify(sortedResult)) return false;
			let seenOdd = false;
			for (const n of result) {
				if (n % 2 === 0) {
					if (seenOdd) return false;
				} else {
					seenOdd = true;
				}
			}
			return true;
		}

		const tests: number[][] = [
			[3, 1, 2, 4],
			[0, 1],
			[1, 3, 5],
			[2, 4, 6],
			[4, 2, 5, 7, 6, 1],
		];

		for (const nums of tests) {
			const result = fn([...nums]);
			assert.equal(isValidArrangement(nums, result), true);
		}
		return true;
	} catch (error: any) {
		console.log("Error from sortArrayByParityHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSortArrayByParityJS = `function sortArrayByParity(nums) {
  // Write your code here
};`;

export const sortArrayByParity: Problem = {
	id: "sort-array-by-parity",
	title: "38. Sort Array By Parity",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, rearrange it so that all the even integers appear before
    all the odd integers.
  </p>
  <p class='mt-3'>
    Any arrangement that satisfies this condition is accepted — the relative order of the even numbers
    among themselves, and the relative order of the odd numbers among themselves, does not matter.
  </p>
  `,
	examples: [
		{
			id: 0,
			inputText: "nums = [3,1,2,4]",
			outputText: "[2,4,3,1]",
			explanation: "[4,2,3,1], [2,4,1,3], and other arrangements with all evens first are also accepted.",
		},
		{
			id: 1,
			inputText: "nums = [0,1]",
			outputText: "[0,1]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 5000</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 5000</code></li>`,
	starterCode: starterCodeSortArrayByParityJS,
	handlerFunction: sortArrayByParityHandler,
	starterFunctionName: "function sortArrayByParity(",
	order: 38,
};
