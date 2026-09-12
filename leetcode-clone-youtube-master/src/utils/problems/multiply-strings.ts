import assert from "assert";
import { Problem } from "../types/problem";

// Reference solution: BigInt gives us a clearly-correct baseline for
// arbitrary-precision multiplication to compare a user's digit-by-digit
// implementation against.
function referenceMultiply(num1: string, num2: string): string {
	if (num1 === "0" || num2 === "0") return "0";
	return (BigInt(num1) * BigInt(num2)).toString();
}

export const multiplyStringsHandler = (fn: any) => {
	try {
		const tests: Array<[string, string]> = [
			["2", "3"],
			["123", "456"],
			["0", "52"],
			["999", "999"],
			["123456789", "987654321"],
			["1", "1"],
		];
		for (const [num1, num2] of tests) {
			const expected = referenceMultiply(num1, num2);
			const result = fn(num1, num2);
			assert.equal(result, expected);
		}
		return true;
	} catch (error: any) {
		console.log("Error from multiplyStringsHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMultiplyStringsJS = `function multiply(num1, num2) {
  // Write your code here
};`;

export const multiplyStrings: Problem = {
	id: "multiply-strings",
	title: "258. Multiply Strings",
	problemStatement: `<p class='mt-3'>
    You are given two non-negative integers <code>num1</code> and <code>num2</code>, each
    represented as a string of decimal digits. Return the product of <code>num1</code> and
    <code>num2</code>, also represented as a string.
  </p>
  <p class='mt-3'>
    The numbers can be arbitrarily large, so you should <strong>not</strong> convert the entire
    inputs directly into native numeric types (they may not fit) &mdash; compute the product using
    string/array based digit arithmetic instead.
  </p>`,
	examples: [
		{
			id: 0,
			inputText: `num1 = "2", num2 = "3"`,
			outputText: `"6"`,
		},
		{
			id: 1,
			inputText: `num1 = "123", num2 = "456"`,
			outputText: `"56088"`,
		},
		{
			id: 2,
			inputText: `num1 = "0", num2 = "52"`,
			outputText: `"0"`,
		},
	],
	constraints: `<li class='mt-2'><code>1 <= num1.length, num2.length <= 200</code></li>
  <li class='mt-2'><code>num1</code> and <code>num2</code> consist only of digits.</li>
  <li class='mt-2'>Neither <code>num1</code> nor <code>num2</code> has leading zeros, unless it is exactly <code>"0"</code>.</li>`,
	starterCode: starterCodeMultiplyStringsJS,
	handlerFunction: multiplyStringsHandler,
	starterFunctionName: "function multiply(",
	order: 258,
};
