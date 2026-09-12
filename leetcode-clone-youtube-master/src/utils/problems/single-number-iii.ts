import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: XOR everything together to get a ^ b (the XOR of the
// two unique numbers). Pick any set bit in that XOR to split all numbers
// into two groups - each group will contain exactly one of the unique
// numbers plus pairs that cancel out.
function referenceSingleNumberIII(nums: number[]): number[] {
	const xorAll = nums.reduce((acc, val) => acc ^ val, 0);
	const diffBit = xorAll & -xorAll;
	let a = 0;
	let b = 0;
	for (const n of nums) {
		if (n & diffBit) {
			a ^= n;
		} else {
			b ^= n;
		}
	}
	return [a, b];
}

// The two unique numbers may be returned in either order.
function normalize(pair: number[]): number[] {
	return [...pair].sort((x, y) => x - y);
}

export const singleNumberIiiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 1, 3, 2, 5],
			[-1, 0],
			[1, 2],
			[4, 4, 5, 9, 5, 100],
			[0, 1, 1, 2],
			[10, 3, 3, 7, 10, 11],
		];
		for (const test of tests) {
			const expected = normalize(referenceSingleNumberIII(test));
			const result = normalize(fn([...test]));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from singleNumberIiiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSingleNumberIiiJS = `function singleNumberIII(nums) {
  // Write your code here
};`;

export const singleNumberIii: Problem = {
	id: "single-number-iii",
	title: "15. Single Number III",
	problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> in which exactly <strong>two</strong> elements appear
    only once and every other element appears exactly <strong>twice</strong>, return the two
    elements that appear only once.
  </p>
  <p class='mt-3'>
    You may return the answer in any order, and your algorithm should run in linear time and use
    only constant extra space (not counting the output).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,1,3,2,5]`,
			outputText: `[3,5]`,
			explanation: "3 and 5 are the only elements that appear once.",
		},
		{
			id: 1,
			inputText: `nums = [-1,0]`,
			outputText: `[-1,0]`,
		},
		{
			id: 2,
			inputText: `nums = [1,2]`,
			outputText: `[1,2]`,
		},
	],
	constraints: `<li class='mt-2'><code>2 <= nums.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>-2^31 <= nums[i] <= 2^31 - 1</code></li>
  <li class='mt-2'>Exactly two elements appear once; every other element appears exactly twice.</li>`,
	starterCode: starterCodeSingleNumberIiiJS,
	handlerFunction: singleNumberIiiHandler,
	starterFunctionName: "function singleNumberIII(",
	order: 15,
};
