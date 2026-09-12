import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: view the number as an unsigned 32-bit value and count
// the '1' characters in its binary representation.
function referenceHammingWeight(n: number): number {
	return (n >>> 0).toString(2).split("").filter((bit) => bit === "1").length;
}

export const numberOf1BitsHandler = (fn: any) => {
	try {
		const tests = [11, 128, 4294967293, 0, 1, 2147483648];
		for (const n of tests) {
			const expected = referenceHammingWeight(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from numberOf1BitsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeNumberOf1BitsJS = `function hammingWeight(n) {
  // Write your code here
};`;

export const numberOf1Bits: Problem = {
	id: "number-of-1-bits",
	title: "262. Number of 1 Bits",
	problemStatement: `<p class='mt-3'>
    Given an unsigned 32-bit integer <code>n</code>, return the number of <code>1</code> bits it
    has in its binary representation (this is sometimes called the <strong>Hamming
    weight</strong>).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 11`,
			outputText: `3`,
			explanation: "11 in binary is 1011, which has three 1 bits.",
		},
		{
			id: 1,
			inputText: `n = 128`,
			outputText: `1`,
			explanation: "128 in binary is 10000000, which has one 1 bit.",
		},
		{
			id: 2,
			inputText: `n = 4294967293`,
			outputText: `31`,
			explanation: "4294967293 in binary is 11111111111111111111111111111101, which has 31 1 bits.",
		},
	],
	constraints: `<li class='mt-2'>The input is an unsigned 32-bit integer.</li>`,
	starterCode: starterCodeNumberOf1BitsJS,
	handlerFunction: numberOf1BitsHandler,
	starterFunctionName: "function hammingWeight(",
	order: 262,
};
