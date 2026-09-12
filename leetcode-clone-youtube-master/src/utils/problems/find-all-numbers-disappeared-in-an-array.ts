import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: every value from 1..n should appear once; collect
// whichever of those values never showed up in the input.
function referenceFindDisappearedNumbers(nums: number[]): number[] {
	const present = new Set(nums);
	const missing: number[] = [];
	for (let i = 1; i <= nums.length; i++) {
		if (!present.has(i)) missing.push(i);
	}
	return missing;
}

export const findAllNumbersDisappearedInAnArrayHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[4, 3, 2, 7, 8, 2, 3, 1],
			[1, 1],
			[1],
			[2, 2],
			[1, 2, 3, 4, 5],
			[5, 4, 3, 2, 1, 1, 1],
		];
		for (const test of tests) {
			const expected = referenceFindDisappearedNumbers(test);
			const result = fn([...test]);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from findAllNumbersDisappearedInAnArrayHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFindAllNumbersDisappearedInAnArrayJS = `function findDisappearedNumbers(nums) {
  // Write your code here
};`;

export const findAllNumbersDisappearedInAnArray: Problem = {
	id: "find-all-numbers-disappeared-in-an-array",
	title: "12. Find All Numbers Disappeared in an Array",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>nums</code> of <code>n</code> integers where every
    <code>nums[i]</code> is in the range <code>[1, n]</code>, but some values may be repeated and
    others may be missing entirely.
  </p>
  <p class='mt-3'>
    Return an array, sorted in ascending order, of all the integers in the range
    <code>[1, n]</code> that do <strong>not</strong> appear in <code>nums</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [4,3,2,7,8,2,3,1]`,
			outputText: `[5,6]`,
		},
		{
			id: 1,
			inputText: `nums = [1,1]`,
			outputText: `[2]`,
		},
		{
			id: 2,
			inputText: `nums = [1,2,3,4,5]`,
			outputText: `[]`,
			explanation: "Every value from 1 to 5 is present, so nothing is missing.",
		},
	],
	constraints: `<li class='mt-2'><code>n == nums.length</code></li>
  <li class='mt-2'><code>1 <= n <= 10^5</code></li>
  <li class='mt-2'><code>1 <= nums[i] <= n</code></li>`,
	starterCode: starterCodeFindAllNumbersDisappearedInAnArrayJS,
	handlerFunction: findAllNumbersDisappearedInAnArrayHandler,
	starterFunctionName: "function findDisappearedNumbers(",
	order: 12,
};
