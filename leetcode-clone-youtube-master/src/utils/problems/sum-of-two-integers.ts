import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: native addition is a clearly-correct baseline to
// compare a user's bitwise-carry implementation against.
function referenceGetSum(a: number, b: number): number {
	return a + b;
}

export const sumOfTwoIntegersHandler = (fn: any) => {
	try {
		const tests: Array<[number, number]> = [
			[1, 2],
			[2, 3],
			[-2, 3],
			[-3, -7],
			[0, 0],
			[123, -123],
		];
		for (const [a, b] of tests) {
			const expected = referenceGetSum(a, b);
			const result = fn(a, b);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from sumOfTwoIntegersHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSumOfTwoIntegersJS = `function getSum(a, b) {
  // Write your code here
};`;

export const sumOfTwoIntegers: Problem = {
	id: "sum-of-two-integers",
	title: "266. Sum of Two Integers",
	problemStatement: `<p class='mt-3'>
    Given two integers <code>a</code> and <code>b</code>, return their sum &mdash; but you may
    not use the <code>+</code> or <code>-</code> operators anywhere in your solution.
  </p>
  <p class='mt-3'>
    Instead, use bitwise operations: XOR two numbers to add them without carrying, and AND plus a
    left shift to compute the carry that still needs to be added in. Repeat until there is no
    carry left. Handle negative numbers correctly by working in 32-bit two's complement.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `a = 1, b = 2`,
			outputText: `3`,
		},
		{
			id: 1,
			inputText: `a = 2, b = 3`,
			outputText: `5`,
		},
		{
			id: 2,
			inputText: `a = -2, b = 3`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>-1000 <= a, b <= 1000</code></li>`,
	starterCode: starterCodeSumOfTwoIntegersJS,
	handlerFunction: sumOfTwoIntegersHandler,
	starterFunctionName: "function getSum(",
	order: 266,
};
