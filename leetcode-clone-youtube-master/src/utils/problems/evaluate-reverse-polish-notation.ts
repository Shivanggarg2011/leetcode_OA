import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: classic stack-based RPN evaluation with truncation toward zero for division
function referenceEvalRPN(tokens: string[]): number {
	const stack: number[] = [];
	const operators = new Set(["+", "-", "*", "/"]);
	for (const token of tokens) {
		if (operators.has(token)) {
			const b = stack.pop()!;
			const a = stack.pop()!;
			let value: number;
			if (token === "+") value = a + b;
			else if (token === "-") value = a - b;
			else if (token === "*") value = a * b;
			else value = Math.trunc(a / b);
			stack.push(value);
		} else {
			stack.push(parseInt(token, 10));
		}
	}
	return stack[0];
}

export const evaluateReversePolishNotationHandler = (fn: any) => {
	try {
		const tests: string[][] = [
			["2", "1", "+", "3", "*"],
			["4", "13", "5", "/", "+"],
			["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
			["5"],
			["3", "4", "-"],
			["15", "7", "1", "1", "+", "-", "/", "3", "*", "2", "1", "1", "+", "+", "-"],
		];
		for (const tokens of tests) {
			const expected = referenceEvalRPN([...tokens]);
			const result = fn([...tokens]);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from evaluateReversePolishNotationHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeEvaluateReversePolishNotationJS = `function evalRPN(tokens) {
  // Write your code here
};`;

export const evaluateReversePolishNotation: Problem = {
	id: "evaluate-reverse-polish-notation",
	title: "64. Evaluate Reverse Polish Notation",
	problemStatement: `<p class='mt-3'>
    Evaluate the value of an arithmetic expression given in
    <a href='https://en.wikipedia.org/wiki/Reverse_Polish_notation' target='_blank' class='underline'>Reverse Polish Notation</a>.
  </p>
  <p class='mt-3'>
    You are given an array of strings <code>tokens</code> representing the expression, where each
    token is either an integer or one of the operators <code>+</code>, <code>-</code>, <code>*</code>,
    <code>/</code>. Division between two integers should truncate toward zero.
  </p>
  <p class='mt-3'>
    It is guaranteed that the expression is always valid and evaluates to an integer that fits in a
    32-bit signed integer.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `tokens = ["2","1","+","3","*"]`,
			outputText: "9",
			explanation: "(2 + 1) * 3 = 9",
		},
		{
			id: 1,
			inputText: `tokens = ["4","13","5","/","+"]`,
			outputText: "6",
			explanation: "4 + (13 / 5) = 4 + 2 = 6",
		},
		{
			id: 2,
			inputText: `tokens = ["5"]`,
			outputText: "5",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= tokens.length <= 10^4</code></li>
<li class='mt-2'>Each token is either an operator ("+", "-", "*", or "/") or an integer in the range <code>[-200, 200]</code></li>`,
	starterCode: starterCodeEvaluateReversePolishNotationJS,
	handlerFunction: evaluateReversePolishNotationHandler,
	starterFunctionName: "function evalRPN(",
	order: 64,
};
