import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: pad to a 32-character binary string, reverse it, and
// parse it back as an unsigned 32-bit integer.
function referenceReverseBits(n: number): number {
	const padded = (n >>> 0).toString(2).padStart(32, "0");
	const reversed = padded.split("").reverse().join("");
	return parseInt(reversed, 2) >>> 0;
}

export const reverseBitsHandler = (fn: any) => {
	try {
		const tests = [43261596, 4294967293, 0, 1, 2147483648, 3];
		for (const n of tests) {
			const expected = referenceReverseBits(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from reverseBitsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeReverseBitsJS = `function reverseBits(n) {
  // Write your code here
};`;

export const reverseBits: Problem = {
	id: "reverse-bits",
	title: "264. Reverse Bits",
	problemStatement: `<p class='mt-3'>
    Given a 32-bit unsigned integer <code>n</code>, return the unsigned integer obtained by
    reversing the bits of its 32-bit binary representation.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 43261596`,
			outputText: `964176192`,
			explanation:
				"43261596 is 00000010100101000001111010011100 in binary; reversed it becomes 00111001011110000010100101000000, which is 964176192.",
		},
		{
			id: 1,
			inputText: `n = 4294967293`,
			outputText: `3221225471`,
			explanation: "4294967293 is 11111111111111111111111111111101 in binary; reversing its bits gives 3221225471.",
		},
	],
	constraints: `<li class='mt-2'>The input is a binary string of length exactly <code>32</code> interpreted as an unsigned integer.</li>`,
	starterCode: starterCodeReverseBitsJS,
	handlerFunction: reverseBitsHandler,
	starterFunctionName: "function reverseBits(",
	order: 264,
};
