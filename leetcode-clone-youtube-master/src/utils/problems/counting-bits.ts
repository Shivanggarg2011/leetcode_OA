import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count set bits of each number directly via its binary
// string representation.
function referenceCountBits(n: number): number[] {
	const result: number[] = [];
	for (let i = 0; i <= n; i++) {
		result.push(i.toString(2).split("").filter((bit) => bit === "1").length);
	}
	return result;
}

export const countingBitsHandler = (fn: any) => {
	try {
		const tests = [2, 5, 0, 1, 10, 16];
		for (const n of tests) {
			const expected = referenceCountBits(n);
			const result = fn(n);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from countingBitsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeCountingBitsJS = `function countBits(n) {
  // Write your code here
};`;

export const countingBits: Problem = {
	id: "counting-bits",
	title: "263. Counting Bits",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>n</code>, return an array <code>ans</code> of length <code>n + 1</code>
    where <code>ans[i]</code> is the number of <code>1</code> bits in the binary representation of
    <code>i</code>, for every <code>i</code> from <code>0</code> to <code>n</code>.
  </p>
  <p class='mt-3'>
    Try to come up with a solution that runs in <code>O(n)</code> total time, ideally by reusing
    previously computed answers instead of recomputing each bit count from scratch.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 2`,
			outputText: `[0,1,1]`,
			explanation: "0 --> 0, 1 --> 1, 2 --> 10, which has one 1 bit.",
		},
		{
			id: 1,
			inputText: `n = 5`,
			outputText: `[0,1,1,2,1,2]`,
			explanation: "0,1,2,3,4,5 in binary are 0,1,10,11,100,101 with 0,1,1,2,1,2 set bits respectively.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= n <= 10^5</code></li>`,
	starterCode: starterCodeCountingBitsJS,
	handlerFunction: countingBitsHandler,
	starterFunctionName: "function countBits(",
	order: 263,
};
