import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: classic O(n) DP tracking the best result including/excluding the current house.
function referenceRob(nums: number[]): number {
	let prev = 0;
	let curr = 0;
	for (const num of nums) {
		const next = Math.max(curr, prev + num);
		prev = curr;
		curr = next;
	}
	return curr;
}

export const houseRobberHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[1, 2, 3, 1],
			[2, 7, 9, 3, 1],
			[5],
			[0, 0],
			[2, 1, 1, 2],
		];
		for (const nums of tests) {
			const expected = referenceRob(nums);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from houseRobberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeHouseRobberJS = `function rob(nums) {
  // Write your code here
};`;

export const houseRobber: Problem = {
	id: "house-robber",
	title: "193. House Robber",
	problemStatement: `<p class='mt-3'>
    You are a professional robber planning to rob houses along a street. Each house has some amount
    of money, given by the array <code>nums</code>. Adjacent houses have connected security systems,
    so you <strong>cannot rob two adjacent houses</strong> on the same night without triggering an
    alarm.
  </p>
  <p class='mt-3'>
    Given <code>nums</code>, return the maximum amount of money you can rob without robbing two
    adjacent houses.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [1,2,3,1]`,
			outputText: `4`,
			explanation: "Rob house 0 (1) and house 2 (3) for a total of 4.",
		},
		{
			id: 1,
			inputText: `nums = [2,7,9,3,1]`,
			outputText: `12`,
			explanation: "Rob houses 0, 2, and 4 for 2 + 9 + 1 = 12.",
		},
		{
			id: 2,
			inputText: `nums = [5]`,
			outputText: `5`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 100</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 400</code></li>`,
	starterCode: starterCodeHouseRobberJS,
	handlerFunction: houseRobberHandler,
	starterFunctionName: "function rob(",
	order: 193,
};
