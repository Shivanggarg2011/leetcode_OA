import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(costs: number[][]): number {
	const sorted = [...costs].sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
	const n = sorted.length / 2;
	let total = 0;
	for (let i = 0; i < sorted.length; i++) {
		total += i < n ? sorted[i][0] : sorted[i][1];
	}
	return total;
}

export const twoCitySchedulingHandler = (fn: any) => {
	try {
		const tests: number[][][] = [
			[
				[10, 20],
				[30, 200],
				[400, 50],
				[30, 20],
			],
			[
				[259, 770],
				[448, 54],
				[926, 667],
				[184, 139],
				[840, 118],
				[577, 469],
			],
			[
				[1, 2],
				[2, 1],
			],
			[
				[515, 563],
				[451, 713],
				[537, 709],
				[343, 819],
				[855, 779],
				[457, 60],
				[650, 359],
				[631, 42],
			],
			[
				[0, 0],
				[0, 0],
			],
		];
		for (const costs of tests) {
			const expected = referenceSolution(costs);
			const result = fn(costs);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from twoCitySchedulingHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeTwoCitySchedulingJS = `function twoCitySchedCost(costs) {
  // Write your code here
};`;

export const twoCityScheduling: Problem = {
	id: "two-city-scheduling",
	title: "241. Two City Scheduling",
	problemStatement: `<p class='mt-3'>
    A company is flying <code>2n</code> people to two cities, city A and city B, and wants to send exactly
    <code>n</code> people to each city.
  </p>
  <p class='mt-3'>
    The cost of flying the <code>i</code>-th person to city A is <code>costs[i][0]</code>, and to city B is
    <code>costs[i][1]</code>.
  </p>
  <p class='mt-3'>
    Return the minimum total cost to fly everyone so that exactly <code>n</code> people arrive in each city.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "costs = [[10,20],[30,200],[400,50],[30,20]]",
			outputText: "110",
			explanation: "Send people 0 and 1 to city A and people 2 and 3 to city B: 10+30+50+20 = 110.",
		},
		{
			id: 1,
			inputText: "costs = [[1,2],[2,1]]",
			outputText: "3",
		},
	],
	constraints: `<li class='mt-2'><code>2n == costs.length</code>, where <code>n &gt;= 1</code></li>
<li class='mt-2'><code>2 <= costs.length <= 100</code>, and <code>costs.length</code> is even</li>
<li class='mt-2'><code>1 <= costs[i][0], costs[i][1] <= 1000</code></li>`,
	starterCode: starterCodeTwoCitySchedulingJS,
	handlerFunction: twoCitySchedulingHandler,
	starterFunctionName: "function twoCitySchedCost(",
	order: 241,
};
