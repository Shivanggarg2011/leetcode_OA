import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(cost: number[]): number {
	const n = cost.length;
	const dp: number[] = new Array(n + 1).fill(0);
	for (let i = 2; i <= n; i++) {
		dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
	}
	return dp[n];
}

export const minCostClimbingStairsHandler = (fn: any) => {
	try {
		const tests = [
			[10, 15, 20],
			[1, 100, 1, 1, 1, 100, 1, 1, 100, 1],
			[0, 0, 0, 1],
			[1, 2],
			[0, 1, 2, 2],
		];
		for (const cost of tests) {
			const expected = referenceSolution(cost);
			const result = fn(cost);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from minCostClimbingStairsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMinCostClimbingStairsJS = `function minCostClimbingStairs(cost) {
  // Write your code here
};`;

export const minCostClimbingStairs: Problem = {
	id: "min-cost-climbing-stairs",
	title: "209. Min Cost Climbing Stairs",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>cost</code> where <code>cost[i]</code> is the cost of the <code>i</code>-th step on a staircase. Once you pay the cost, you can either climb one or two steps.
  </p>
  <p class='mt-3'>
    You can start climbing from step index <code>0</code> or step index <code>1</code>.
  </p>
  <p class='mt-3'>
    Return <em>the minimum cost to reach the top of the floor</em>, which is one step past the last index in <code>cost</code>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `cost = [10,15,20]`,
			outputText: `15`,
			explanation: "You start at index 1, pay 15, and climb two steps to reach the top.",
		},
		{
			id: 1,
			inputText: `cost = [1,100,1,1,1,100,1,1,100,1]`,
			outputText: `6`,
			explanation: "You start at index 0 and skip every costly step, paying 1 six times.",
		},
	],
	constraints: `<li class='mt-2'><code>2 <= cost.length <= 1000</code></li>
  <li class='mt-2'><code>0 <= cost[i] <= 999</code></li>`,
	starterCode: starterCodeMinCostClimbingStairsJS,
	handlerFunction: minCostClimbingStairsHandler,
	starterFunctionName: "function minCostClimbingStairs(",
	order: 209,
};
