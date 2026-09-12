import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: repeatedly divide by 2; a power of two reduces to 1.
function referenceIsPowerOfTwo(n: number): boolean {
	if (n <= 0) return false;
	let value = n;
	while (value % 2 === 0) value /= 2;
	return value === 1;
}

export const powerOfTwoHandler = (fn: any) => {
	try {
		const tests = [1, 16, 3, 0, -4, 1024];
		for (const n of tests) {
			const expected = referenceIsPowerOfTwo(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from powerOfTwoHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePowerOfTwoJS = `function isPowerOfTwo(n) {
  // Write your code here
};`;

export const powerOfTwo: Problem = {
	id: "power-of-two",
	title: "268. Power of Two",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>n</code>, return <code>true</code> if it is a power of two, and
    <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    An integer <code>n</code> is a power of two if there exists an integer <code>x</code> such
    that <code>n == 2^x</code>. Try to solve this in <code>O(1)</code> time using a bitwise trick
    rather than a loop.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 1`,
			outputText: `true`,
			explanation: "2^0 = 1",
		},
		{
			id: 1,
			inputText: `n = 16`,
			outputText: `true`,
			explanation: "2^4 = 16",
		},
		{
			id: 2,
			inputText: `n = 3`,
			outputText: `false`,
		},
	],
	constraints: `<li class='mt-2'><code>-2^31 <= n <= 2^31 - 1</code></li>`,
	starterCode: starterCodePowerOfTwoJS,
	handlerFunction: powerOfTwoHandler,
	starterFunctionName: "function isPowerOfTwo(",
	order: 268,
};
