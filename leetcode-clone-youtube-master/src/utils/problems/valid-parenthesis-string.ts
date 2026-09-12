import assert from "assert";
import { Problem } from "../types/problem";

function referenceSolution(s: string): boolean {
	let low = 0;
	let high = 0;
	for (const ch of s) {
		if (ch === "(") {
			low++;
			high++;
		} else if (ch === ")") {
			low--;
			high--;
		} else {
			low--;
			high++;
		}
		if (high < 0) return false;
		if (low < 0) low = 0;
	}
	return low === 0;
}

export const validParenthesisStringHandler = (fn: any) => {
	try {
		const tests = ["()", "(*)", "(*))", "(((", "", "(*"];
		for (const s of tests) {
			const expected = referenceSolution(s);
			const result = fn(s);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from validParenthesisStringHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeValidParenthesisStringJS = `function checkValidString(s) {
  // Write your code here
};`;

export const validParenthesisString: Problem = {
	id: "valid-parenthesis-string",
	title: "232. Valid Parenthesis String",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code> containing only the characters <code>'('</code>, <code>')'</code> and
    <code>'*'</code>, determine if <code>s</code> is valid.
  </p>
  <p class='mt-3'>
    A string is considered valid if it is possible to interpret every <code>'*'</code> as either a
    <code>'('</code>, a <code>')'</code>, or an empty string, such that the resulting string is a valid
    parentheses sequence (every open bracket is closed in the correct order).
  </p>`,
	examples: [
		{
			id: 0,
			inputText: "s = \"()\"",
			outputText: "true",
		},
		{
			id: 1,
			inputText: "s = \"(*)\"",
			outputText: "true",
			explanation: "The '*' can be treated as an empty string.",
		},
		{
			id: 2,
			inputText: "s = \"(*))\"",
			outputText: "true",
			explanation: "The '*' can be treated as '(' to balance the extra ')'.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= s.length <= 100</code></li>
<li class='mt-2'><code>s[i]</code> is <code>'('</code>, <code>')'</code> or <code>'*'</code></li>`,
	starterCode: starterCodeValidParenthesisStringJS,
	handlerFunction: validParenthesisStringHandler,
	starterFunctionName: "function checkValidString(",
	order: 232,
};
