import assert from "assert";
import { Problem } from "../types/problem";

// reference solution: backtracking, only add '(' while open < n and ')' while close < open
function referenceGenerateParenthesis(n: number): string[] {
	const result: string[] = [];

	function backtrack(current: string, open: number, close: number) {
		if (current.length === n * 2) {
			result.push(current);
			return;
		}
		if (open < n) backtrack(current + "(", open + 1, close);
		if (close < open) backtrack(current + ")", open, close + 1);
	}

	backtrack("", 0, 0);
	return result;
}

function normalize(list: string[]): string[] {
	return [...list].sort();
}

export const generateParenthesesHandler = (fn: any) => {
	try {
		const tests: number[] = [1, 2, 3, 4];
		for (const n of tests) {
			const expected = normalize(referenceGenerateParenthesis(n));
			const result = normalize(fn(n));
			assert.deepStrictEqual(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from generateParenthesesHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeGenerateParenthesesJS = `function generateParenthesis(n) {
  // Write your code here
};`;

export const generateParentheses: Problem = {
	id: "generate-parentheses",
	title: "65. Generate Parentheses",
	problemStatement: `<p class='mt-3'>
    Given an integer <code>n</code> representing the number of pairs of parentheses, generate
    <strong>all combinations</strong> of well-formed (balanced) parentheses that can be made with
    exactly <code>n</code> pairs.
  </p>
  <p class='mt-3'>
    You may return the combinations in <strong>any order</strong>.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "n = 3",
			outputText: `["((()))","(()())","(())()","()(())","()()()"]`,
		},
		{
			id: 1,
			inputText: "n = 1",
			outputText: `["()"]`,
		},
		{
			id: 2,
			inputText: "n = 2",
			outputText: `["(())","()()"]`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= n <= 8</code></li>`,
	starterCode: starterCodeGenerateParenthesesJS,
	handlerFunction: generateParenthesesHandler,
	starterFunctionName: "function generateParenthesis(",
	order: 65,
};
