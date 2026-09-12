import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: repeatedly divide by 4; a power of four reduces to 1.
function referenceIsPowerOfFour(n: number): boolean {
	if (n <= 0) return false;
	let value = n;
	while (value % 4 === 0) value /= 4;
	return value === 1;
}

export const powerOfFourHandler = (fn: any) => {
	try {
		const tests = [16, 5, 1, 0, 64, -4];
		for (const n of tests) {
			const expected = referenceIsPowerOfFour(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from powerOfFourHandler: ", error);
		throw new Error(error);
	}
};

const starterCodePowerOfFourJS = `function isPowerOfFour(n) {
  // Write your code here
};`;

export const powerOfFour: Problem = {
	id: "power-of-four",
	title: "269. Power of Four",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>n</code>, return <code>true</code> if it is a power of four, and
    <code>false</code> otherwise.
  </p>
  <p class='mt-3'>
    An integer <code>n</code> is a power of four if there exists an integer <code>x</code> such
    that <code>n == 4^x</code>. As a bonus challenge, try solving it without using loops or
    recursion, using only bitwise tricks.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 16`,
			outputText: `true`,
			explanation: "4^2 = 16",
		},
		{
			id: 1,
			inputText: `n = 5`,
			outputText: `false`,
		},
		{
			id: 2,
			inputText: `n = 1`,
			outputText: `true`,
			explanation: "4^0 = 1",
		},
	],
	constraints: `<li class='mt-2'><code>-2^31 <= n <= 2^31 - 1</code></li>`,
	starterCode: starterCodePowerOfFourJS,
	handlerFunction: powerOfFourHandler,
	starterFunctionName: "function isPowerOfFour(",
	order: 269,
};
