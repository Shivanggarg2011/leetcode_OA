import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: keep every non-zero value in its original relative
// order, then pad the rest of the array with zeroes.
function referenceMoveZeroes(nums: number[]): number[] {
	const nonZero = nums.filter((n) => n !== 0);
	while (nonZero.length < nums.length) nonZero.push(0);
	return nonZero;
}

export const moveZeroesHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[0, 1, 0, 3, 12],
			[0],
			[1, 2, 3],
			[0, 0, 0, 1],
			[4, 0, 5, 0, 0, 6],
			[-1, 0, 2, 0, -3],
		];
		for (const test of tests) {
			const expected = referenceMoveZeroes(test);
			const input = [...test];
			const returned = fn(input);
			const actual = Array.isArray(returned) ? returned : input;
			assert.deepStrictEqual(actual, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from moveZeroesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMoveZeroesJS = `function moveZeroes(nums) {
  // Write your code here.
  // Move nums in place (or return the resulting array).
};`;

export const moveZeroes: Problem = {
	id: "move-zeroes",
	title: "19. Move Zeroes",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code>, move all <code>0</code>'s to the end of it while
    maintaining the relative order of the non-zero elements.
  </p>
  <p class='mt-3'>
    Do this in place without making a copy of the array, and try to minimize the total number of
    operations.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [0,1,0,3,12]`,
			outputText: `[1,3,12,0,0]`,
		},
		{
			id: 1,
			inputText: `nums = [0]`,
			outputText: `[0]`,
		},
		{
			id: 2,
			inputText: `nums = [1,2,3]`,
			outputText: `[1,2,3]`,
			explanation: "There are no zeroes to move.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
  <li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>`,
	starterCode: starterCodeMoveZeroesJS,
	handlerFunction: moveZeroesHandler,
	starterFunctionName: "function moveZeroes(",
	order: 19,
};
