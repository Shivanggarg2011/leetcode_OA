import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(n: number): number {
	if (n === 0) return 0;
	if (n === 1) return 1;
	let a = 0;
	let b = 1;
	for (let i = 2; i <= n; i++) {
		const c = a + b;
		a = b;
		b = c;
	}
	return b;
}

export const fibonacciNumberHandler = (fn: any) => {
	try {
		const tests = [0, 1, 2, 3, 4, 10, 20];
		for (const n of tests) {
			const expected = referenceSolution(n);
			const result = fn(n);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from fibonacciNumberHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeFibonacciNumberJS = `function fib(n) {
  // Write your code here
};`;

export const fibonacciNumber: Problem = {
	id: "fibonacci-number",
	title: "210. Fibonacci Number",
	problemStatement: `<p class='mt-3'>
    The Fibonacci numbers form a sequence where each number is the sum of the two preceding ones, starting from <code>0</code> and <code>1</code>. That is,
  </p>
  <p class='mt-3'>
    <code>F(0) = 0, F(1) = 1</code>, and <code>F(n) = F(n - 1) + F(n - 2)</code> for <code>n > 1</code>.
  </p>
  <p class='mt-3'>
    Given <code>n</code>, calculate <em><code>F(n)</code></em>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `n = 2`,
			outputText: `1`,
			explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1.",
		},
		{
			id: 1,
			inputText: `n = 3`,
			outputText: `2`,
			explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2.",
		},
		{
			id: 2,
			inputText: `n = 4`,
			outputText: `3`,
			explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3.",
		},
	],
	constraints: `<li class='mt-2'><code>0 <= n <= 30</code></li>`,
	starterCode: starterCodeFibonacciNumberJS,
	handlerFunction: fibonacciNumberHandler,
	starterFunctionName: "function fib(",
	order: 210,
};
