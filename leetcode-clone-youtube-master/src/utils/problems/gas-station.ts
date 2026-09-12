import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(gas: number[], cost: number[]): number {
	const n = gas.length;
	let totalSurplus = 0;
	let currSurplus = 0;
	let start = 0;
	for (let i = 0; i < n; i++) {
		const diff = gas[i] - cost[i];
		totalSurplus += diff;
		currSurplus += diff;
		if (currSurplus < 0) {
			start = i + 1;
			currSurplus = 0;
		}
	}
	return totalSurplus >= 0 ? start : -1;
}

export const gasStationHandler = (fn: any) => {
	try {
		const tests: [number[], number[]][] = [
			[
				[1, 2, 3, 4, 5],
				[3, 4, 5, 1, 2],
			],
			[
				[2, 3, 4],
				[3, 4, 3],
			],
			[[5], [4]],
			[
				[3, 1, 1],
				[1, 2, 2],
			],
			[
				[4, 5, 2, 6, 5, 3],
				[3, 2, 7, 3, 2, 9],
			],
		];
		for (const [gas, cost] of tests) {
			const expected = referenceSolution(gas, cost);
			const result = fn(gas, cost);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from gasStationHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeGasStationJS = `function canCompleteCircuit(gas, cost) {
  // Write your code here
};`;

export const gasStation: Problem = {
	id: "gas-station",
	title: "229. Gas Station",
	problemStatement: `<p class='mt-3'>
    There are <code>n</code> gas stations arranged in a circle. You are given two integer arrays <code>gas</code> and <code>cost</code>, where <code>gas[i]</code> is the amount of gas at the <code>i</code>-th station and <code>cost[i]</code> is the amount of gas needed to travel from the <code>i</code>-th station to the next one (<code>(i + 1) % n</code>).
  </p>
  <p class='mt-3'>
    You begin the journey with an empty tank at one of the gas stations. Return <em>the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return </em><code>-1</code>. It is guaranteed that if a solution exists, it is unique.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `gas = [1,2,3,4,5], cost = [3,4,5,1,2]`,
			outputText: `3`,
			explanation: "Starting at station 3, you can travel around the circuit once with fuel to spare.",
		},
		{
			id: 1,
			inputText: `gas = [2,3,4], cost = [3,4,3]`,
			outputText: `-1`,
			explanation: "You can't start at any station and travel around the circuit once.",
		},
		{
			id: 2,
			inputText: `gas = [5], cost = [4]`,
			outputText: `0`,
		},
	],
	constraints: `<li class='mt-2'><code>n == gas.length == cost.length</code></li>
  <li class='mt-2'><code>1 <= n <= 10^5</code></li>
  <li class='mt-2'><code>0 <= gas[i], cost[i] <= 10^4</code></li>`,
	starterCode: starterCodeGasStationJS,
	handlerFunction: gasStationHandler,
	starterFunctionName: "function canCompleteCircuit(",
	order: 229,
};
