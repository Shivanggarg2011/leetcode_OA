import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: JS's built-in Math.pow is a clearly-correct baseline
// to compare a user's fast-exponentiation implementation against.
function referenceMyPow(x: number, n: number): number {
	return Math.pow(x, n);
}

function approxEqual(a: number, b: number): boolean {
	if (!isFinite(a) || !isFinite(b)) return a === b;
	return Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b));
}

export const powHandler = (fn: any) => {
	try {
		const tests: Array<[number, number]> = [
			[2, 10],
			[2.1, 3],
			[2, -2],
			[1, 0],
			[-2, 3],
			[0.5, 5],
		];
		for (const [x, n] of tests) {
			const expected = referenceMyPow(x, n);
			const result = fn(x, n);
			assert.equal(approxEqual(result, expected), true);
		}
		return true;
	} catch (error: any) {
		console.log("Error from powHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePowJS = `function myPow(x, n) {
  // Write your code here
};`;

export const pow: Problem = {
	id: "pow",
	title: "257. Pow(x, n)",
	problemStatement: `<p class='mt-3'>
    Implement a function that computes <code>x</code> raised to the power <code>n</code>
    (i.e. <code>x^n</code>), where <code>x</code> is a floating point number and <code>n</code>
    is an integer that may be negative, zero, or positive.
  </p>
  <p class='mt-3'>
    A negative exponent means the result should be the reciprocal, e.g. <code>x^-2</code> is
    <code>1 / (x*x)</code>. You should avoid a naive approach that multiplies <code>x</code> by
    itself <code>n</code> times, since <code>n</code> can be very large in magnitude.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `x = 2.00000, n = 10`,
			outputText: `1024.00000`,
		},
		{
			id: 1,
			inputText: `x = 2.10000, n = 3`,
			outputText: `9.26100`,
		},
		{
			id: 2,
			inputText: `x = 2.00000, n = -2`,
			outputText: `0.25000`,
			explanation: "2^-2 = 1 / 2^2 = 1/4 = 0.25",
		},
	],
	constraints: `<li class='mt-2'><code>-100.0 < x < 100.0</code></li>
  <li class='mt-2'><code>-2^31 <= n <= 2^31 - 1</code></li>
  <li class='mt-2'><code>n</code> is an integer.</li>
  <li class='mt-2'>Either <code>x</code> is not zero, or <code>n > 0</code>.</li>`,
	starterCode: starterCodePowJS,
	handlerFunction: powHandler,
	starterFunctionName: "function myPow(",
	order: 257,
};
