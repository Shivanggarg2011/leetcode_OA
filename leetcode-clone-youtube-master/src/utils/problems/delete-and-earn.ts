import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(nums: number[]): number {
	if (nums.length === 0) return 0;
	const maxVal = Math.max(...nums);
	const totals: number[] = new Array(maxVal + 1).fill(0);
	for (const num of nums) {
		totals[num] += num;
	}
	let prev = 0;
	let curr = 0;
	for (let i = 0; i <= maxVal; i++) {
		const take = totals[i] + prev;
		const skip = Math.max(prev, curr);
		[prev, curr] = [curr, Math.max(take, skip)];
	}
	return curr;
}

export const deleteAndEarnHandler = (fn: any) => {
	try {
		const tests = [
			[3, 4, 2],
			[2, 2, 3, 3, 3, 4],
			[1],
			[1, 1, 1, 1],
			[2, 4, 6, 2, 4, 6],
			[8, 10, 4, 9, 1, 3, 5, 9, 4, 10],
		];
		for (const nums of tests) {
			const expected = referenceSolution(nums);
			const result = fn(nums);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from deleteAndEarnHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDeleteAndEarnJS = `function deleteAndEarn(nums) {
  // Write your code here
};`;

export const deleteAndEarn: Problem = {
	id: "delete-and-earn",
	title: "207. Delete and Earn",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code>. You want to maximize the number of points you get by performing the following operation any number of times:
  </p>
  <p class='mt-3'>
    Pick any <code>nums[i]</code>, add it to your points, then remove <strong>every</strong> element equal to <code>nums[i] - 1</code> and <strong>every</strong> element equal to <code>nums[i] + 1</code> from the array (in addition to removing the chosen element itself).
  </p>
  <p class='mt-3'>
    Return <em>the maximum number of points you can earn by applying this operation some number of times</em>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `nums = [3,4,2]`,
			outputText: `6`,
			explanation: "Pick 4 to earn 4 points, removing the 3. Then pick 2 to earn 2 points. Total: 6.",
		},
		{
			id: 1,
			inputText: `nums = [2,2,3,3,3,4]`,
			outputText: `9`,
			explanation:
				"Pick 3 twice to earn 3 + 3 = 6 points, removing all 2's and 4's. Pick the last 3 to earn 3 more. Total: 9.",
		},
		{
			id: 2,
			inputText: `nums = [1]`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 2 * 10^4</code></li>
  <li class='mt-2'><code>1 <= nums[i] <= 10^4</code></li>`,
	starterCode: starterCodeDeleteAndEarnJS,
	handlerFunction: deleteAndEarnHandler,
	starterFunctionName: "function deleteAndEarn(",
	order: 207,
};
