import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: count occurrences with a Map and return the value
// that occurs exactly once.
function referenceSingleNumber(nums: number[]): number {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) || 0) + 1);
	for (const [num, count] of counts.entries()) {
		if (count === 1) return num;
	}
	throw new Error("No single element found");
}

export const singleNumberIvHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 2, 1],
			[4, 1, 2, 1, 2],
			[1],
			[-1, -1, -2],
			[0, 1, 0],
			[5, 3, 5, 4, 3],
		];
		for (const nums of tests) {
			const expected = referenceSingleNumber([...nums]);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from singleNumberIvHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeSingleNumberIvJS = `function singleNumber(nums) {
  // Write your code here
};`;

export const singleNumberIv: Problem = {
	id: "single-number-iv",
	title: "270. Single Number IV",
	problemStatement: `<p class='mt-3'>
    You are given a non-empty array of integers <code>nums</code> where every element appears
    <strong>exactly twice</strong>, except for a single element that appears
    <strong>exactly once</strong>. Find and return that element.
  </p>
  <p class='mt-3'>
    Your solution should run in <code>O(n)</code> time while using only <code>O(1)</code> extra
    space &mdash; think about what happens when you XOR every number in the array together.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [2,2,1]`,
			outputText: `1`,
		},
		{
			id: 1,
			inputText: `nums = [4,1,2,1,2]`,
			outputText: `4`,
		},
		{
			id: 2,
			inputText: `nums = [1]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 3 * 10^4</code></li>
  <li class='mt-2'><code>-3 * 10^4 <= nums[i] <= 3 * 10^4</code></li>
  <li class='mt-2'>Every element appears exactly twice except for one element which appears exactly once.</li>`,
	starterCode: starterCodeSingleNumberIvJS,
	handlerFunction: singleNumberIvHandler,
	starterFunctionName: "function singleNumber(",
	order: 270,
};
