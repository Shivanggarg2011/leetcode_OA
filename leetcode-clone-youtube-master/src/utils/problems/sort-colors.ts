import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: there are only three possible values, so counting
// them and rebuilding the array is a simple and clearly-correct approach.
function referenceSortColors(nums: number[]): number[] {
	const counts = [0, 0, 0];
	for (const n of nums) counts[n]++;
	const result: number[] = [];
	for (let color = 0; color < 3; color++) {
		for (let i = 0; i < counts[color]; i++) result.push(color);
	}
	return result;
}

export const sortColorsHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 0, 2, 1, 1, 0],
			[2, 0, 1],
			[0],
			[1],
			[1, 2, 0],
			[0, 0, 0, 1, 1, 2, 2, 2, 2],
		];
		for (const test of tests) {
			const expected = referenceSortColors(test);
			const input = [...test];
			const returned = fn(input);
			// Accept either an in-place mutation of the input array, or a
			// freshly returned sorted array.
			const actual = Array.isArray(returned) ? returned : input;
			assert.deepStrictEqual(actual, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from sortColorsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSortColorsJS = `function sortColors(nums) {
  // Write your code here.
  // Sort nums in place (or return the sorted array).
};`;

export const sortColors: Problem = {
	id: "sort-colors",
	title: "18. Sort Colors",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>nums</code> containing only the values <code>0</code>,
    <code>1</code>, and <code>2</code>, representing the colors red, white, and blue.
  </p>
  <p class='mt-3'>
    Sort the array in place so that objects of the same color are adjacent, in the order red,
    white, then blue (i.e. sort the array in ascending order). Try to solve it in a single pass
    over the array using only constant extra space, without calling a built-in sort function.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [2,0,2,1,1,0]`,
			outputText: `[0,0,1,1,2,2]`,
		},
		{
			id: 1,
			inputText: `nums = [2,0,1]`,
			outputText: `[0,1,2]`,
		},
		{
			id: 2,
			inputText: `nums = [0]`,
			outputText: `[0]`,
		},
	],
	constraints: `<li class='mt-2'><code>n == nums.length</code></li>
  <li class='mt-2'><code>1 <= n <= 300</code></li>
  <li class='mt-2'><code>nums[i]</code> is <code>0</code>, <code>1</code>, or <code>2</code>.</li>`,
	starterCode: starterCodeSortColorsJS,
	handlerFunction: sortColorsHandler,
	starterFunctionName: "function sortColors(",
	order: 18,
};
