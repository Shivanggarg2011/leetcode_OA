import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: brute-force AND every number in the inclusive range.
// Test ranges are kept small enough that this is efficient and obviously
// correct.
function referenceRangeBitwiseAnd(left: number, right: number): number {
	let result = left;
	for (let i = left + 1; i <= right; i++) {
		result &= i;
	}
	return result;
}

export const bitwiseAndOfNumbersRangeHandler = (fn: any) => {
	try {
		const tests: Array<[number, number]> = [
			[5, 7],
			[0, 0],
			[1, 2147483647],
			[5, 5],
			[10, 15],
			[0, 1],
		];
		for (const [left, right] of tests) {
			const expected = referenceRangeBitwiseAnd(left, right);
			const result = fn(left, right);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from bitwiseAndOfNumbersRangeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBitwiseAndOfNumbersRangeJS = `function rangeBitwiseAnd(left, right) {
  // Write your code here
};`;

export const bitwiseAndOfNumbersRange: Problem = {
	id: "bitwise-and-of-numbers-range",
	title: "267. Bitwise AND of Numbers Range",
	problemStatement: `<p class='mt-3'>
    Given two integers <code>left</code> and <code>right</code> that represent an inclusive
    range <code>[left, right]</code>, return the bitwise AND of every number in that range.
  </p>
  <p class='mt-3'>
    Since the range can contain up to <code>2^31</code> numbers, computing this by iterating over
    every value can be far too slow for large ranges &mdash; look for a way to determine the
    common binary prefix shared by <code>left</code> and <code>right</code> instead.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `left = 5, right = 7`,
			outputText: `4`,
			explanation: "5 = 101, 6 = 110, 7 = 111. ANDing all three gives 100 = 4.",
		},
		{
			id: 1,
			inputText: `left = 0, right = 0`,
			outputText: `0`,
		},
		{
			id: 2,
			inputText: `left = 1, right = 2147483647`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>0 <= left <= right <= 2^31 - 1</code></li>`,
	starterCode: starterCodeBitwiseAndOfNumbersRangeJS,
	handlerFunction: bitwiseAndOfNumbersRangeHandler,
	starterFunctionName: "function rangeBitwiseAnd(",
	order: 267,
};
