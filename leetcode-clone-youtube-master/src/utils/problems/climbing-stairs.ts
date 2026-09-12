import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: bottom-up Fibonacci-style counting.
function referenceClimbStairs(n: number): number {
	if (n <= 2) return n;
	let a = 1;
	let b = 2;
	for (let i = 3; i <= n; i++) {
		const c = a + b;
		a = b;
		b = c;
	}
	return b;
}

export const climbingStairsHandler = (fn: any) => {
	try {
		const tests = [1, 2, 3, 5, 10, 20];
		for (const n of tests) {
			const expected = referenceClimbStairs(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from climbingStairsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeClimbingStairsJS = `function climbStairs(n) {
  // Write your code here
};`;

export const climbingStairs: Problem = {
	id: "climbing-stairs",
	title: "192. Climbing Stairs",
	problemStatement: `<p class='mt-3'>
    You are climbing a staircase that takes <code>n</code> steps to reach the top. Each time you can
    either climb <code>1</code> or <code>2</code> steps.
  </p>
  <p class='mt-3'>In how many distinct ways can you climb to the top?</p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 2`,
			outputText: `2`,
			explanation: "Two ways: 1 step + 1 step, or 2 steps.",
		},
		{
			id: 1,
			inputText: `n = 3`,
			outputText: `3`,
			explanation: "Three ways: 1+1+1, 1+2, or 2+1.",
		},
		{
			id: 2,
			inputText: `n = 1`,
			outputText: `1`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 45</code></li>`,
	starterCode: starterCodeClimbingStairsJS,
	handlerFunction: climbingStairsHandler,
	starterFunctionName: "function climbStairs(",
	order: 192,
};
