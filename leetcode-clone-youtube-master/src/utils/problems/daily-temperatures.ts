import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: monotonic decreasing stack of indices
function referenceDailyTemperatures(temperatures: number[]): number[] {
	const answer = new Array(temperatures.length).fill(0);
	const stack: number[] = [];
	for (let i = 0; i < temperatures.length; i++) {
		while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
			const prevIndex = stack.pop()!;
			answer[prevIndex] = i - prevIndex;
		}
		stack.push(i);
	}
	return answer;
}

export const dailyTemperaturesHandler = (fn: any) => {
	try {
		const tests: number[][] = [
			[73, 74, 75, 71, 69, 72, 76, 73],
			[30, 40, 50, 60],
			[30, 60, 90],
			[90, 60, 30],
			[55],
			[89, 62, 70, 58, 47, 47, 46, 76, 100, 70],
		];
		for (const temps of tests) {
			const expected = referenceDailyTemperatures([...temps]);
			const result = fn([...temps]);
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from dailyTemperaturesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeDailyTemperaturesJS = `function dailyTemperatures(temperatures) {
  // Write your code here
};`;

export const dailyTemperatures: Problem = {
	id: "daily-temperatures",
	title: "66. Daily Temperatures",
	problemStatement: `<p class='mt-3'>
    Given an array of integers <code>temperatures</code> representing daily temperatures, return an
    array <code>answer</code> such that <code>answer[i]</code> is the number of days you would have to
    wait after day <code>i</code> to get a warmer temperature.
  </p>
  <p class='mt-3'>
    If there is no future day for which this is possible, keep <code>answer[i] === 0</code> instead.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "temperatures = [73,74,75,71,69,72,76,73]",
			outputText: "[1,1,4,2,1,1,0,0]",
		},
		{
			id: 1,
			inputText: "temperatures = [30,40,50,60]",
			outputText: "[1,1,1,0]",
		},
		{
			id: 2,
			inputText: "temperatures = [30,60,90]",
			outputText: "[1,1,0]",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= temperatures.length <= 10^5</code></li>
<li class='mt-2'><code>30 <= temperatures[i] <= 100</code></li>`,
	starterCode: starterCodeDailyTemperaturesJS,
	handlerFunction: dailyTemperaturesHandler,
	starterFunctionName: "function dailyTemperatures(",
	order: 66,
};
