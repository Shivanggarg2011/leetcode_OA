import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: houses are in a circle, so the first and last house
// can't both be robbed. Run the linear house-robber DP twice, once excluding
// the first house and once excluding the last, and take the better result.
function robLine(nums: number[]): number {
	let prev = 0;
	let curr = 0;
	for (const num of nums) {
		const next = Math.max(curr, prev + num);
		prev = curr;
		curr = next;
	}
	return curr;
}

function referenceRobCircular(nums: number[]): number {
	if (nums.length === 1) return nums[0];
	return Math.max(robLine(nums.slice(1)), robLine(nums.slice(0, -1)));
}

export const houseRobberIiHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[2, 3, 2],
			[1, 2, 3, 1],
			[1, 2, 3],
			[5],
			[8, 7],
			[1, 1, 1, 2],
		];
		for (const nums of tests) {
			const expected = referenceRobCircular(nums);
			const result = fn([...nums]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from houseRobberIiHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeHouseRobberIiJS = `function robCircular(nums) {
  // Write your code here
};`;

export const houseRobberIi: Problem = {
	id: "house-robber-ii",
	title: "194. House Robber II",
	problemStatement: `<p class='mt-3'>
    This is the same robbing game as before, except the houses are arranged in a <strong>circle</strong>:
    the first house and the last house in <code>nums</code> are now adjacent to each other.
  </p>
  <p class='mt-3'>
    Given <code>nums</code>, return the maximum amount of money you can rob tonight without robbing
    two adjacent houses (remembering that the first and last houses count as adjacent).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [2,3,2]`,
			outputText: `3`,
			explanation: "Robbing house 0 and house 2 isn't allowed since they're adjacent in a circle; the best is house 1 alone.",
		},
		{
			id: 1,
			inputText: `nums = [1,2,3,1]`,
			outputText: `4`,
			explanation: "Rob houses 0 and 2 for a total of 4.",
		},
		{
			id: 2,
			inputText: `nums = [1,2,3]`,
			outputText: `3`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 100</code></li>
  <li class='mt-2'><code>0 <= nums[i] <= 1000</code></li>`,
	starterCode: starterCodeHouseRobberIiJS,
	handlerFunction: houseRobberIiHandler,
	starterFunctionName: "function robCircular(",
	order: 194,
};
