import assert from "assert";
import { Problem } from "../types/problem";

export const plusOneHandler = (fn: any) => {
	try {
		function referenceSolution(digits: number[]): number[] {
			const result = [...digits];
			for (let i = result.length - 1; i >= 0; i--) {
				if (result[i] < 9) {
					result[i]++;
					return result;
				}
				result[i] = 0;
			}
			result.unshift(1);
			return result;
		}

		const tests: number[][] = [
			[1, 2, 3],
			[4, 3, 2, 1],
			[9],
			[9, 9, 9],
			[0],
			[1, 9, 9],
		];

		for (const digits of tests) {
			const expected = referenceSolution(digits);
			const result = fn([...digits]);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from plusOneHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePlusOneJS = `function plusOne(digits) {
  // Write your code here
};`;

export const plusOne: Problem = {
	id: "plus-one",
	title: "28. Plus One",
	problemStatement: `<p class='mt-3'>
    You are given a non-empty array of integers <code>digits</code> representing a large, non-negative
    integer. Each element holds a single digit, and the digits are ordered from most significant to
    least significant. The integer does not contain any leading zeros, except for the number
    <code>0</code> itself.
  </p>
  <p class='mt-3'>Add one to the number represented by <code>digits</code>, and return the resulting array of digits.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: "digits = [1,2,3]",
			outputText: "[1,2,4]",
			explanation: "The array represents 123, and 123 + 1 = 124.",
		},
		{
			id: 1,
			inputText: "digits = [4,3,2,1]",
			outputText: "[4,3,2,2]",
		},
		{
			id: 2,
			inputText: "digits = [9,9,9]",
			outputText: "[1,0,0,0]",
			explanation: "999 + 1 = 1000, which needs one extra digit.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= digits.length <= 100</code></li>
  <li class='mt-2'><code>0 <= digits[i] <= 9</code></li>
  <li class='mt-2'><code>digits</code> does not contain any leading zero, except for the number 0 itself.</li>`,
	starterCode: starterCodePlusOneJS,
	handlerFunction: plusOneHandler,
	starterFunctionName: "function plusOne(",
	order: 28,
};
